import { randomBytes, createHash } from 'node:crypto'
import { getSql } from '../../db/index.js'
import { notFound } from '../../plugins/error-handler.js'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ApiKeyRow {
  id: string
  organization_id: string
  name: string
  mode: 'live' | 'sandbox'
  key_prefix: string
  created_at: Date
  last_used_at: Date | null
  revoked_at: Date | null
}

// ---------------------------------------------------------------------------
// Key generation
// ---------------------------------------------------------------------------

export function generateApiKey(mode: 'live' | 'sandbox'): {
  raw: string
  hash: string
  prefix: string
} {
  const secret = randomBytes(32).toString('hex')
  const raw = `sk_${mode}_${secret}`
  const hash = createHash('sha256').update(raw).digest('hex')
  const prefix = raw.slice(0, 16)
  return { raw, hash, prefix }
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function createApiKey(
  organizationId: string,
  name: string,
  mode: 'live' | 'sandbox',
): Promise<{ id: string; rawKey: string; prefix: string; mode: string; createdAt: string }> {
  const sql = getSql()
  const { raw, hash, prefix } = generateApiKey(mode)

  const rows = await sql<{ id: string; created_at: Date }[]>`
    INSERT INTO api_keys (organization_id, name, mode, key_hash, key_prefix)
    VALUES (${organizationId}, ${name}, ${mode}, ${hash}, ${prefix})
    RETURNING id, created_at
  `

  const row = rows[0]
  if (!row) throw new Error('INSERT returned no row')

  return {
    id: row.id,
    rawKey: raw,
    prefix,
    mode,
    createdAt: row.created_at.toISOString(),
  }
}

export async function listApiKeys(
  organizationId: string,
): Promise<
  Array<{
    id: string
    name: string
    mode: string
    prefix: string
    createdAt: string
    lastUsedAt: string | null
    revoked: boolean
  }>
> {
  const sql = getSql()

  const rows = await sql<ApiKeyRow[]>`
    SELECT id, name, mode, key_prefix, created_at, last_used_at, revoked_at
    FROM api_keys
    WHERE organization_id = ${organizationId}
    ORDER BY created_at DESC
  `

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    mode: row.mode,
    prefix: row.key_prefix,
    createdAt: row.created_at.toISOString(),
    lastUsedAt: row.last_used_at ? row.last_used_at.toISOString() : null,
    revoked: row.revoked_at !== null,
  }))
}

export async function revokeApiKey(
  organizationId: string,
  keyId: string,
): Promise<void> {
  const sql = getSql()

  const rows = await sql<{ id: string }[]>`
    UPDATE api_keys
    SET revoked_at = now()
    WHERE id = ${keyId}
      AND organization_id = ${organizationId}
      AND revoked_at IS NULL
    RETURNING id
  `

  if (rows.length === 0) {
    throw notFound('API key')
  }
}

export async function resolveApiKey(
  rawKey: string,
): Promise<{ organizationId: string; mode: 'live' | 'sandbox'; keyId: string } | null> {
  const sql = getSql()
  const hash = createHash('sha256').update(rawKey).digest('hex')

  const rows = await sql<{ id: string; organization_id: string; mode: 'live' | 'sandbox' }[]>`
    SELECT id, organization_id, mode
    FROM api_keys
    WHERE key_hash = ${hash}
      AND revoked_at IS NULL
    LIMIT 1
  `

  const row = rows[0]
  if (!row) return null

  // Fire-and-forget: update last_used_at without blocking the caller
  sql`
    UPDATE api_keys
    SET last_used_at = now()
    WHERE id = ${row.id}
  `.catch(() => {
    // Intentionally swallowed — last_used_at is best-effort
  })

  return {
    organizationId: row.organization_id,
    mode: row.mode,
    keyId: row.id,
  }
}
