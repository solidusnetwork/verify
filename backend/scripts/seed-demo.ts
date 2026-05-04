/**
 * seed-demo.ts — Create the shared demo/showcase org account for verify.solidus.network
 *
 * Usage:
 *   DATABASE_URL=postgresql://localhost/solidus_verify pnpm exec tsx scripts/seed-demo.ts
 *
 * Idempotent — skips silently if the account already exists.
 */
import { scrypt as scryptCb, randomBytes } from 'node:crypto'
import postgres from 'postgres'

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 } as const
const SCRYPT_KEYLEN = 64

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await new Promise<Buffer>((resolve, reject) =>
    scryptCb(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  )
  return `$scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL is required')
    process.exit(1)
  }

  const sql = postgres(databaseUrl)

  const EMAIL    = 'demo@solidus.network'
  const PASSWORD = '1q2w3e4r5t!A'
  const NAME     = 'Solidus Demo'
  const TIER     = 'enterprise'

  try {
    const existing = await sql<{ id: string }[]>`
      SELECT id FROM organizations WHERE email = ${EMAIL} LIMIT 1
    `
    if (existing.length > 0) {
      console.log(`[verify] Demo account already exists — ${EMAIL} (id: ${existing[0]!.id})`)
      return
    }

    const passwordHash = await hashPassword(PASSWORD)
    const rows = await sql<{ id: string }[]>`
      INSERT INTO organizations (email, name, password_hash, subscription_tier, trial_ends_at)
      VALUES (
        ${EMAIL},
        ${NAME},
        ${passwordHash},
        ${TIER},
        '2099-12-31 00:00:00+00'
      )
      RETURNING id
    `
    console.log(`[verify] Created demo account (id: ${rows[0]!.id})`)
    console.log(`         Email:    ${EMAIL}`)
    console.log(`         Password: ${PASSWORD}`)
    console.log(`         Tier:     ${TIER}`)
  } finally {
    await sql.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
