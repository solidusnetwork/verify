import { randomBytes, createHmac, createHash, createCipheriv, createDecipheriv } from 'node:crypto'
import type postgres from 'postgres'
import { getSql } from '../../db/index.js'
import { config } from '../../config.js'
import { notFound } from '../../plugins/error-handler.js'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WebhookEndpointRow {
  id: string
  organization_id: string
  url: string
  secret_encrypted: string
  events: string[]
  enabled: boolean
  description: string
  created_at: Date
  updated_at: Date
}

interface WebhookDeliveryRow {
  id: string
  endpoint_id: string
  event_type: string
  payload: Record<string, unknown>
  status: string
  attempts: number
  last_attempt_at: Date | null
  delivered_at: Date | null
  created_at: Date
}

// ---------------------------------------------------------------------------
// Encryption helpers (AES-256-GCM, key derived from JWT_SECRET)
// ---------------------------------------------------------------------------

// Derive a 32-byte key from SESSION_PRIVATE_KEY via a fixed label so the
// webhook encryption key is domain-separated from JWT signing usage.

function deriveEncryptionKey(): Buffer {
  return createHash('sha256')
    .update('solidus-webhook-signing-key:')
    .update(config.SESSION_PRIVATE_KEY)
    .digest()
}

/**
 * Encrypt plaintext with AES-256-GCM.
 * Returns `iv:authTag:ciphertext` as a single base64url-safe hex string.
 */
function encrypt(plaintext: string): string {
  const key = deriveEncryptionKey()
  const iv = randomBytes(12) // 96-bit IV for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()
  // Encode as hex segments joined by colons for easy splitting
  return [iv.toString('hex'), authTag.toString('hex'), encrypted.toString('hex')].join(':')
}

/**
 * Decrypt a value produced by `encrypt`.
 */
function decrypt(stored: string): string {
  const parts = stored.split(':')
  if (parts.length !== 3) throw new Error('Invalid encrypted secret format')
  const [ivHex, authTagHex, ciphertextHex] = parts as [string, string, string]

  const key = deriveEncryptionKey()
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const ciphertext = Buffer.from(ciphertextHex, 'hex')

  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString('utf8')
}

// ---------------------------------------------------------------------------
// Webhook signature
//
// Solidus Webhook Signature Scheme:
//   1. Construct the signed string: `t=<unix_ts>\n<json_payload>`
//   2. Compute HMAC-SHA256 over the signed string using the endpoint's raw
//      signing secret (stored AES-256-GCM encrypted in the DB).
//   3. Send header: `Solidus-Signature: t=<unix_ts>,v1=<hex_hmac>`
//
// Recipients verify by recomputing the HMAC and doing a constant-time
// comparison.  This matches the widely-understood Stripe webhook scheme.
// ---------------------------------------------------------------------------

function signPayload(rawSecret: string, unixTs: number, body: string): string {
  const signedString = `t=${unixTs}\n${body}`
  return createHmac('sha256', rawSecret).update(signedString).digest('hex')
}

// ---------------------------------------------------------------------------
// createEndpoint
// ---------------------------------------------------------------------------

export async function createEndpoint(
  organizationId: string,
  url: string,
  events: string[],
  description?: string,
): Promise<{ id: string; url: string; secret: string; warning: string }> {
  const sql = getSql()

  // Generate a human-readable signing secret: whsec_ + 32 random hex bytes
  const rawSecret = `whsec_${randomBytes(32).toString('hex')}`

  // Encrypt the raw secret for storage — we need to be able to sign future
  // deliveries, so we cannot store only a hash.
  const secretEncrypted = encrypt(rawSecret)

  const rows = await sql<{ id: string }[]>`
    INSERT INTO webhook_endpoints (organization_id, url, secret_hash, events, description)
    VALUES (
      ${organizationId},
      ${url},
      ${secretEncrypted},
      ${sql.array(events.length > 0 ? events : ['verification.completed', 'credential.issued'])},
      ${description ?? ''}
    )
    RETURNING id
  `

  const row = rows[0]
  if (!row) throw new Error('INSERT returned no row')

  return {
    id: row.id,
    url,
    secret: rawSecret,
    warning: 'Store this secret securely — it will not be shown again.',
  }
}

// ---------------------------------------------------------------------------
// listEndpoints
// ---------------------------------------------------------------------------

export async function listEndpoints(
  organizationId: string,
): Promise<
  Array<{
    id: string
    url: string
    events: string[]
    enabled: boolean
    description: string
    createdAt: string
    updatedAt: string
  }>
> {
  const sql = getSql()

  const rows = await sql<WebhookEndpointRow[]>`
    SELECT id, url, events, enabled, description, created_at, updated_at
    FROM webhook_endpoints
    WHERE organization_id = ${organizationId}
    ORDER BY created_at DESC
  `

  return rows.map((row) => ({
    id: row.id,
    url: row.url,
    events: row.events,
    enabled: row.enabled,
    description: row.description,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }))
}

// ---------------------------------------------------------------------------
// deleteEndpoint
// ---------------------------------------------------------------------------

export async function deleteEndpoint(
  organizationId: string,
  endpointId: string,
): Promise<void> {
  const sql = getSql()

  const rows = await sql<{ id: string }[]>`
    DELETE FROM webhook_endpoints
    WHERE id = ${endpointId}
      AND organization_id = ${organizationId}
    RETURNING id
  `

  if (rows.length === 0) {
    throw notFound('Webhook endpoint')
  }
}

// ---------------------------------------------------------------------------
// updateEndpoint
// ---------------------------------------------------------------------------

export async function updateEndpoint(
  organizationId: string,
  endpointId: string,
  patch: {
    url?: string | undefined
    events?: string[] | undefined
    description?: string | undefined
    enabled?: boolean | undefined
  },
): Promise<{
  id: string
  url: string
  events: string[]
  enabled: boolean
  description: string
  createdAt: string
  updatedAt: string
}> {
  const sql = getSql()

  // Verify ownership first
  const check = await sql<{ id: string }[]>`
    SELECT id FROM webhook_endpoints
    WHERE id = ${endpointId} AND organization_id = ${organizationId}
    LIMIT 1
  `
  if (check.length === 0) throw notFound('Webhook endpoint')

  // Build dynamic update
  const sets: string[] = ['updated_at = now()']
  if (patch.url !== undefined) sets.push(`url = '${patch.url.replace(/'/g, "''")}'`)
  if (patch.description !== undefined) sets.push(`description = '${patch.description.replace(/'/g, "''")}'`)
  if (patch.enabled !== undefined) sets.push(`enabled = ${patch.enabled}`)

  // Use unsafe for dynamic SQL, but parameterize the events array separately
  if (patch.events !== undefined) {
    await sql`
      UPDATE webhook_endpoints
      SET events = ${sql.array(patch.events)}, updated_at = now()
      WHERE id = ${endpointId}
    `
  }

  if (sets.length > 1 || patch.events === undefined) {
    await sql.unsafe(`
      UPDATE webhook_endpoints SET ${sets.join(', ')} WHERE id = '${endpointId}'
    `)
  }

  // Fetch and return updated row
  const rows = await sql<WebhookEndpointRow[]>`
    SELECT id, url, events, enabled, description, created_at, updated_at
    FROM webhook_endpoints WHERE id = ${endpointId} LIMIT 1
  `
  const row = rows[0]!

  return {
    id: row.id,
    url: row.url,
    events: row.events,
    enabled: row.enabled,
    description: row.description,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }
}

// ---------------------------------------------------------------------------
// listDeliveries
// ---------------------------------------------------------------------------

export async function listDeliveries(
  organizationId: string,
  endpointId: string,
  params: { status?: string | undefined; limit?: number | undefined; offset?: number | undefined },
): Promise<{
  data: Array<{
    id: string
    endpointId: string
    eventType: string
    payload: Record<string, unknown>
    status: string
    attempts: number
    lastAttemptAt: string | null
    deliveredAt: string | null
    createdAt: string
  }>
  total: number
}> {
  const sql = getSql()

  // Verify endpoint exists and belongs to org
  const check = await sql<{ id: string }[]>`
    SELECT id FROM webhook_endpoints
    WHERE id = ${endpointId} AND organization_id = ${organizationId}
    LIMIT 1
  `
  if (check.length === 0) throw notFound('Webhook endpoint')

  const limit = Math.min(params.limit ?? 20, 100)
  const offset = params.offset ?? 0

  const rows = await sql<(WebhookDeliveryRow & { total_count: string })[]>`
    SELECT
      id, endpoint_id, event_type, payload, status,
      attempts, last_attempt_at, delivered_at, created_at,
      COUNT(*) OVER () AS total_count
    FROM webhook_deliveries
    WHERE endpoint_id = ${endpointId}
      ${params.status ? sql`AND status = ${params.status}` : sql``}
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  const total = rows.length > 0 ? parseInt(rows[0]!.total_count, 10) : 0

  return {
    data: rows.map((row) => ({
      id: row.id,
      endpointId: row.endpoint_id,
      eventType: row.event_type,
      payload: row.payload,
      status: row.status,
      attempts: row.attempts,
      lastAttemptAt: row.last_attempt_at?.toISOString() ?? null,
      deliveredAt: row.delivered_at?.toISOString() ?? null,
      createdAt: row.created_at.toISOString(),
    })),
    total,
  }
}

// ---------------------------------------------------------------------------
// deliverWebhook
// ---------------------------------------------------------------------------

export async function deliverWebhook(
  endpointId: string,
  event: { type: string; payload: unknown },
): Promise<void> {
  const sql = getSql()

  // Fetch the endpoint
  const rows = await sql<
    {
      id: string
      url: string
      secret_hash: string
      enabled: boolean
    }[]
  >`
    SELECT id, url, secret_hash, enabled
    FROM webhook_endpoints
    WHERE id = ${endpointId}
    LIMIT 1
  `

  const endpoint = rows[0]
  if (!endpoint) throw notFound('Webhook endpoint')

  // Skip if disabled — record as failed so callers know
  if (!endpoint.enabled) {
    await sql`
      INSERT INTO webhook_deliveries (endpoint_id, event_type, payload, status, attempts)
      VALUES (${endpointId}, ${event.type}, ${sql.json(event.payload as postgres.JSONValue)}, 'failed', 0)
    `
    return
  }

  // Decrypt raw secret and sign the payload
  let rawSecret: string
  try {
    rawSecret = decrypt(endpoint.secret_hash)
  } catch {
    // Encryption key mismatch or corrupted data — fail delivery
    await sql`
      INSERT INTO webhook_deliveries (endpoint_id, event_type, payload, status, attempts, last_attempt_at)
      VALUES (${endpointId}, ${event.type}, ${sql.json(event.payload as postgres.JSONValue)}, 'failed', 1, now())
    `
    return
  }

  const body = JSON.stringify({ type: event.type, payload: event.payload })
  const unixTs = Math.floor(Date.now() / 1000)
  const signature = signPayload(rawSecret, unixTs, body)
  const signatureHeader = `t=${unixTs},v1=${signature}`

  // Create a pending delivery record first
  const deliveryRows = await sql<{ id: string }[]>`
    INSERT INTO webhook_deliveries (endpoint_id, event_type, payload, status, attempts, last_attempt_at)
    VALUES (${endpointId}, ${event.type}, ${sql.json(event.payload as postgres.JSONValue)}, 'pending', 1, now())
    RETURNING id
  `
  const deliveryId = deliveryRows[0]?.id

  let success = false
  try {
    const response = await fetch(endpoint.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Solidus-Signature': signatureHeader,
      },
      body,
      signal: AbortSignal.timeout(10_000), // 10s timeout
    })

    success = response.ok
  } catch {
    // Network error — success stays false
  }

  if (deliveryId) {
    if (success) {
      await sql`
        UPDATE webhook_deliveries
        SET status = 'delivered', delivered_at = now()
        WHERE id = ${deliveryId}
      `
    } else {
      await sql`
        UPDATE webhook_deliveries
        SET status = 'failed'
        WHERE id = ${deliveryId}
      `
    }
  }
}
