import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import postgres from 'postgres'
import {
  runMigrations as runSdkMigrations,
  generateKeypair,
  createSdk,
  closeConnection,
} from '@solidus/sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── 1. Create databases ──────────────────────────────────────────────────────

async function createDatabaseIfNotExists(sql: postgres.Sql, dbName: string): Promise<void> {
  const rows = await sql`
    SELECT datname FROM pg_database WHERE datname = ${dbName}
  `
  if (rows.length === 0) {
    // Cannot use parameterized queries for CREATE DATABASE
    await sql.unsafe(`CREATE DATABASE ${dbName}`)
    console.log(`✓ Created database: ${dbName}`)
  } else {
    console.log(`  Database already exists: ${dbName}`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Step 1: Create databases using the system 'postgres' DB
  const systemSql = postgres('postgresql://localhost/postgres', { max: 1 })
  await createDatabaseIfNotExists(systemSql, 'solidus_verify')
  await createDatabaseIfNotExists(systemSql, 'solidus_stub')
  await systemSql.end()

  // Step 2: Run SDK migrations (creates stub_signing_key, stub_dids, etc.)
  // process.env is set directly because getSql() inside runSdkMigrations reads SOLIDUS_STUB_DB_URL at call time
  process.env['SOLIDUS_STUB_DB_URL'] = 'postgresql://localhost/solidus_stub'
  await runSdkMigrations()
  console.log('✓ SDK migrations complete')

  // Step 3: Run verify migrations directly.
  // Cannot import src/db/migrate.ts — it imports config.ts, which calls process.exit(1)
  // at module-load time when required env vars are absent (which is exactly the pre-.env state).
  // Verified: only one migration file exists at src/db/migrations/001_schema.sql.
  // If more migrations are added later, list them here in lexicographic order.
  process.env['DATABASE_URL'] = 'postgresql://localhost/solidus_verify'
  const verifySql = postgres('postgresql://localhost/solidus_verify', { max: 1 })
  const verifyMigrationPath = join(__dirname, '../src/db/migrations/001_schema.sql')
  const verifyMigration = readFileSync(verifyMigrationPath, 'utf-8')
  await verifySql.unsafe(verifyMigration)
  await verifySql.end()
  console.log('✓ Verify migrations complete (001_schema)')

  // Run 002_kyc_pipeline.sql (new connection — previous one was closed)
  const verifySql2 = postgres('postgresql://localhost/solidus_verify', { max: 1 })
  const kycMigrationPath = join(__dirname, '../src/db/migrations/002_kyc_pipeline.sql')
  const kycMigration = readFileSync(kycMigrationPath, 'utf-8')
  await verifySql2.unsafe(kycMigration)
  await verifySql2.end()
  console.log('✓ Verify migrations complete (002_kyc_pipeline)')

  // Run 003_webhook_description.sql
  const verifySql3 = postgres('postgresql://localhost/solidus_verify', { max: 1 })
  const webhookMigrationPath = join(__dirname, '../src/db/migrations/003_webhook_description.sql')
  const webhookMigration = readFileSync(webhookMigrationPath, 'utf-8')
  await verifySql3.unsafe(webhookMigration)
  await verifySql3.end()
  console.log('✓ Verify migrations complete (003_webhook_description)')

  // Step 4: Issuer keypair — read existing or generate new
  const stubSql = postgres('postgresql://localhost/solidus_stub', { max: 1 })
  type KeyRow = { private_key: string; public_key: string }
  const existingKeys = await stubSql<KeyRow[]>`
    SELECT private_key, public_key FROM stub_signing_key ORDER BY created_at ASC LIMIT 1
  `

  let issuerPrivateKey: string
  let issuerPublicKey: string

  if (existingKeys.length > 0) {
    issuerPrivateKey = existingKeys[0]!.private_key
    issuerPublicKey = existingKeys[0]!.public_key
    console.log('  Issuer keypair: reusing existing key from stub_signing_key')
  } else {
    const kp = await generateKeypair()
    issuerPrivateKey = kp.privateKey
    issuerPublicKey = kp.publicKey
    await stubSql`
      INSERT INTO stub_signing_key (private_key, public_key)
      VALUES (${issuerPrivateKey}, ${issuerPublicKey})
    `
    console.log('✓ Issuer keypair: generated and saved to stub_signing_key')
  }

  // Step 5: Register issuer DID — check before creating
  type DidRow = { did: string }
  const existingDid = await stubSql<DidRow[]>`
    SELECT did FROM stub_dids
    WHERE public_key = ${issuerPublicKey} AND deactivated = false
    LIMIT 1
  `
  await stubSql.end()

  let issuerDid: string

  if (existingDid.length > 0) {
    issuerDid = existingDid[0]!.did
    console.log('  Issuer DID: reusing existing DID')
  } else {
    const sdk = createSdk({ mode: 'stub' })
    const didObj = await sdk.did.create(issuerPublicKey)
    issuerDid = didObj.id
    console.log('✓ Issuer DID registered:', issuerDid)
  }
  // Close the SDK connection pool opened by runSdkMigrations() (getSql() singleton)
  await closeConnection()

  // Step 6: Session key (always fresh — rotating is intentional in dev)
  const sessionKp = await generateKeypair()
  const sessionPrivateKey = sessionKp.privateKey

  // Step 7: Print .env block
  const separator = '─'.repeat(50)
  console.log('')
  console.log('⚠️  New SESSION_PRIVATE_KEY generated — any existing browser sessions are now invalid')
  console.log('⚠️  Replace STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET with real Stripe test keys')
  console.log('')
  console.log(`Copy this to verify/apps/backend/.env:`)
  console.log(separator)
  console.log(`SESSION_PRIVATE_KEY=${sessionPrivateKey}`)
  console.log(`ISSUER_PRIVATE_KEY=${issuerPrivateKey}`)
  console.log(`ISSUER_DID=${issuerDid}`)
  console.log(`DATABASE_URL=postgresql://localhost/solidus_verify`)
  console.log(`SOLIDUS_STUB_DB_URL=postgresql://localhost/solidus_stub`)
  console.log(`REDIS_URL=redis://localhost:6379`)
  console.log(`RABBITMQ_URL=amqp://localhost:5672`)
  console.log(`PORT=3000`)
  console.log(`HOST=0.0.0.0`)
  console.log(`NODE_ENV=development`)
  console.log(`SOLIDUS_SDK_MODE=stub`)
  console.log(`STRIPE_SECRET_KEY=sk_test_CHANGE_ME`)
  console.log(`STRIPE_WEBHOOK_SECRET=whsec_CHANGE_ME`)
  console.log(separator)
}

main().catch((err) => {
  console.error('Bootstrap failed:', err)
  process.exit(1)
})
