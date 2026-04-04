import { randomBytes } from 'node:crypto'
import { URL } from 'node:url'
import type postgres from 'postgres'
import { Queue } from 'bullmq'
import { getSql } from '../../db/index.js'
import { config } from '../../config.js'
import { createSdk } from '@solidus/sdk'
import { publish } from '@solidus/events'
import type { CredentialIssuedEvent } from '@solidus/events'
import { notFound, conflict } from '../../plugins/error-handler.js'
import type { SandboxOutcome } from '@solidus/types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VerificationRow {
  id: string
  organizationId: string
  status: string
  level: number
  sandbox: boolean
  credentialId: string | null
  sessionToken: string
  subjectDid: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  expiresAt: string
}

interface VerificationDbRow {
  id: string
  organization_id: string
  status: string
  level: number
  sandbox: boolean
  credential_id: string | null
  session_token: string
  subject_did: string | null
  created_at: Date
  updated_at: Date
  completed_at: Date | null
  expires_at: Date
  metadata: Record<string, unknown>
  sandbox_outcome: string | null
}

// ---------------------------------------------------------------------------
// BullMQ Queue (lazy singleton)
// ---------------------------------------------------------------------------

let _kycQueue: Queue | null = null

function getKycQueue(): Queue {
  if (!_kycQueue) {
    const redisUrl = new URL(config.REDIS_URL)
    _kycQueue = new Queue('verify-kyc', {
      connection: {
        host: redisUrl.hostname,
        port: parseInt(redisUrl.port || '6379', 10),
      },
    })
  }
  return _kycQueue
}

// ---------------------------------------------------------------------------
// SDK singleton (lazy)
// ---------------------------------------------------------------------------

const sdk = createSdk({ mode: config.SOLIDUS_SDK_MODE })

const HOSTED_BASE = 'https://verify.solidus.network'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapRow(row: VerificationDbRow): VerificationRow {
  return {
    id: row.id,
    organizationId: row.organization_id,
    status: row.status,
    level: row.level,
    sandbox: row.sandbox,
    credentialId: row.credential_id,
    sessionToken: row.session_token,
    subjectDid: row.subject_did,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    completedAt: row.completed_at ? row.completed_at.toISOString() : null,
    expiresAt: row.expires_at.toISOString(),
  }
}

// ---------------------------------------------------------------------------
// createSession
// ---------------------------------------------------------------------------

export async function createSession(params: {
  organizationId: string
  apiKeyId: string
  level: 1 | 2 | 3
  sandbox: boolean
  sandboxOutcome?: SandboxOutcome
  subjectDid?: string
  redirectUrl?: string
  metadata?: Record<string, unknown>
}): Promise<{ id: string; sessionToken: string; hostedUrl: string }> {
  const sql = getSql()
  const sessionToken = randomBytes(32).toString('hex')
  const hostedUrl = `${HOSTED_BASE}/s/${sessionToken}`

  const rows = await sql<{ id: string }[]>`
    INSERT INTO verifications (
      organization_id,
      api_key_id,
      level,
      sandbox,
      sandbox_outcome,
      subject_did,
      redirect_url,
      metadata,
      session_token
    ) VALUES (
      ${params.organizationId},
      ${params.apiKeyId},
      ${params.level},
      ${params.sandbox},
      ${params.sandboxOutcome ?? null},
      ${params.subjectDid ?? null},
      ${params.redirectUrl ?? null},
      ${sql.json((params.metadata ?? {}) as postgres.JSONValue)},
      ${sessionToken}
    )
    RETURNING id
  `

  const row = rows[0]
  if (!row) throw new Error('INSERT returned no row')

  // Enqueue sandbox simulation if outcome is specified
  if (params.sandbox && params.sandboxOutcome) {
    await getKycQueue().add(
      'sandbox-complete',
      { verificationId: row.id },
      { delay: 2000 },
    )
  }

  return { id: row.id, sessionToken, hostedUrl }
}

// ---------------------------------------------------------------------------
// getSession
// ---------------------------------------------------------------------------

export async function getSession(
  organizationId: string,
  verificationId: string,
): Promise<VerificationRow> {
  const sql = getSql()

  const rows = await sql<VerificationDbRow[]>`
    SELECT
      id, organization_id, status, level, sandbox, credential_id,
      session_token, subject_did, created_at, updated_at,
      completed_at, expires_at, metadata, sandbox_outcome
    FROM verifications
    WHERE id = ${verificationId}
      AND organization_id = ${organizationId}
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Verification')

  return mapRow(row)
}

// ---------------------------------------------------------------------------
// listSessions
// ---------------------------------------------------------------------------

export async function listSessions(
  organizationId: string,
  params: {
    status?: string
    limit?: number
    offset?: number
  },
): Promise<{ data: VerificationRow[]; total: number }> {
  const sql = getSql()
  const limit = Math.min(params.limit ?? 20, 100)
  const offset = params.offset ?? 0

  const rows = await sql<(VerificationDbRow & { total_count: string })[]>`
    SELECT
      id, organization_id, status, level, sandbox, credential_id,
      session_token, subject_did, created_at, updated_at,
      completed_at, expires_at, metadata, sandbox_outcome,
      COUNT(*) OVER () AS total_count
    FROM verifications
    WHERE organization_id = ${organizationId}
      ${params.status ? sql`AND status = ${params.status}` : sql``}
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  const total = rows.length > 0 ? parseInt(rows[0]!.total_count, 10) : 0

  return {
    data: rows.map(mapRow),
    total,
  }
}

// ---------------------------------------------------------------------------
// processCompletion
// ---------------------------------------------------------------------------

export async function processCompletion(verificationId: string): Promise<void> {
  const sql = getSql()

  // Fetch the verification
  const rows = await sql<VerificationDbRow[]>`
    SELECT
      id, organization_id, status, level, sandbox, credential_id,
      session_token, subject_did, created_at, updated_at,
      completed_at, expires_at, metadata, sandbox_outcome
    FROM verifications
    WHERE id = ${verificationId}
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Verification')

  // Issue a KYC Verifiable Credential
  // subjectDid falls back to a placeholder if not set (e.g. anonymous flow)
  const subjectDid = row.subject_did ?? `did:solidus:subject:${row.id}`

  const vc = await sdk.credentials.issue({
    subjectDid,
    issuerDid: config.ISSUER_DID,
    issuerPrivateKey: config.ISSUER_PRIVATE_KEY,
    type: ['VerifiableCredential', 'KYCCredential'],
    claims: {
      kycLevel: row.level,
      verificationId: row.id,
      verifiedAt: new Date().toISOString(),
    },
    expiresInDays: 365,
    network: config.SOLIDUS_SDK_MODE,
  })

  // Update verification to completed with credential reference
  await sql`
    UPDATE verifications
    SET
      status = 'completed',
      completed_at = now(),
      updated_at = now(),
      credential_id = ${vc.id}
    WHERE id = ${verificationId}
  `

  // Publish credential.issued event
  await publish<CredentialIssuedEvent>(
    'verify-backend',
    'credential.issued',
    {
      payload: {
        credentialId: vc.id,
        subjectDid,
        issuerDid: config.ISSUER_DID,
        credentialType: vc.type,
        organizationId: row.organization_id,
      },
    },
  )

  // Enqueue webhook delivery for all enabled endpoints of this org
  const endpoints = await sql<{ id: string }[]>`
    SELECT id
    FROM webhook_endpoints
    WHERE organization_id = ${row.organization_id}
      AND enabled = true
      AND 'verification.completed' = ANY(events)
  `

  const webhookQueue = getKycQueue()
  for (const endpoint of endpoints) {
    await webhookQueue.add('deliver-webhook', {
      endpointId: endpoint.id,
      event: {
        type: 'verification.completed',
        payload: {
          verificationId: row.id,
          organizationId: row.organization_id,
          subjectDid,
          level: row.level,
          credentialId: vc.id,
        },
      },
    })
  }
}

// ---------------------------------------------------------------------------
// processSandbox
// ---------------------------------------------------------------------------

export async function processSandbox(verificationId: string): Promise<void> {
  const sql = getSql()

  const rows = await sql<{ sandbox_outcome: string | null }[]>`
    SELECT sandbox_outcome
    FROM verifications
    WHERE id = ${verificationId}
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Verification')

  const outcome = row.sandbox_outcome as SandboxOutcome | null

  switch (outcome) {
    case 'pass':
      await processCompletion(verificationId)
      break

    case 'fail':
      await sql`
        UPDATE verifications
        SET status = 'failed', updated_at = now()
        WHERE id = ${verificationId}
      `
      break

    case 'timeout':
      await sql`
        UPDATE verifications
        SET
          status = 'failed',
          updated_at = now(),
          metadata = jsonb_set(metadata, '{reason}', '"timeout"')
        WHERE id = ${verificationId}
      `
      break

    case 'document_rejected':
      await sql`
        UPDATE verifications
        SET
          status = 'failed',
          updated_at = now(),
          metadata = jsonb_set(metadata, '{reason}', '"document_rejected"')
        WHERE id = ${verificationId}
      `
      break

    default:
      // No outcome set — nothing to do
      break
  }
}

// ---------------------------------------------------------------------------
// uploadDocument
// ---------------------------------------------------------------------------

export async function uploadDocument(params: {
  verificationId: string
  organizationId: string
  file: Buffer
  side: 'front' | 'back'
  type: 'passport' | 'driving_license' | 'national_id' | 'residence_permit'
  final: boolean
}): Promise<{ id: string; status: string }> {
  const sql = getSql()

  // State guard
  const rows = await sql<{ id: string; status: string }[]>`
    SELECT id, status FROM verifications
    WHERE id = ${params.verificationId}
      AND organization_id = ${params.organizationId}
    LIMIT 1
  `
  const row = rows[0]
  if (!row) throw notFound('Verification')
  if (row.status !== 'pending' && row.status !== 'document_uploaded') {
    throw conflict(`Expected status 'pending' or 'document_uploaded', got '${row.status}'`)
  }

  // Upload to storage
  const { getStorage } = await import('../../lib/storage.js')
  const storage = getStorage()
  const timestamp = Date.now()
  const key = `verifications/${params.verificationId}/doc-${params.side}-${timestamp}.jpg`

  await storage.uploadFile(key, params.file)

  // Insert document row (only after upload succeeds)
  await sql`
    INSERT INTO documents (verification_id, type, side, r2_key, purge_at)
    VALUES (
      ${params.verificationId},
      ${params.type},
      ${params.side},
      ${key},
      now() + INTERVAL '30 days'
    )
  `

  // Update status
  await sql`
    UPDATE verifications
    SET status = 'document_uploaded', updated_at = now()
    WHERE id = ${params.verificationId}
  `

  // If final, enqueue processing
  if (params.final) {
    await getKycQueue().add('process-document', {
      verificationId: params.verificationId,
    }, { attempts: 3, backoff: { type: 'exponential', delay: 5000 } })
  }

  return { id: params.verificationId, status: 'document_uploaded' }
}

// ---------------------------------------------------------------------------
// getLivenessChallenge
// ---------------------------------------------------------------------------

const LIVENESS_CHALLENGES = ['blink', 'turn-left', 'turn-right', 'smile'] as const

export async function getLivenessChallenge(
  verificationId: string,
  organizationId: string,
): Promise<{ challenge: string; expiresAt: string }> {
  const sql = getSql()

  const rows = await sql<{
    status: string
    liveness_challenge: string | null
    liveness_challenge_expires_at: Date | null
  }[]>`
    SELECT status, liveness_challenge, liveness_challenge_expires_at
    FROM verifications
    WHERE id = ${verificationId}
      AND organization_id = ${organizationId}
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Verification')
  if (row.status !== 'awaiting_liveness') {
    throw conflict(`Expected status 'awaiting_liveness', got '${row.status}'`)
  }

  // Idempotent: return existing challenge if still valid
  if (
    row.liveness_challenge &&
    row.liveness_challenge_expires_at &&
    row.liveness_challenge_expires_at > new Date()
  ) {
    return {
      challenge: row.liveness_challenge,
      expiresAt: row.liveness_challenge_expires_at.toISOString(),
    }
  }

  // Generate new challenge
  const challenge = LIVENESS_CHALLENGES[Math.floor(Math.random() * LIVENESS_CHALLENGES.length)]!
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  await sql`
    UPDATE verifications
    SET liveness_challenge = ${challenge},
        liveness_challenge_expires_at = ${expiresAt.toISOString()},
        updated_at = now()
    WHERE id = ${verificationId}
  `

  return { challenge, expiresAt: expiresAt.toISOString() }
}

// ---------------------------------------------------------------------------
// uploadLiveness
// ---------------------------------------------------------------------------

export async function uploadLiveness(params: {
  verificationId: string
  organizationId: string
  frames: Buffer[]
}): Promise<{ id: string; status: string; challenge: string }> {
  const sql = getSql()

  const rows = await sql<{
    status: string
    liveness_challenge: string | null
    liveness_challenge_expires_at: Date | null
  }[]>`
    SELECT status, liveness_challenge, liveness_challenge_expires_at
    FROM verifications
    WHERE id = ${params.verificationId}
      AND organization_id = ${params.organizationId}
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Verification')
  if (row.status !== 'awaiting_liveness') {
    throw conflict(`Expected status 'awaiting_liveness', got '${row.status}'`)
  }
  if (!row.liveness_challenge) {
    throw conflict('Liveness challenge not yet issued — call GET /liveness-challenge first')
  }
  if (row.liveness_challenge_expires_at && row.liveness_challenge_expires_at < new Date()) {
    throw conflict('Liveness challenge expired — call GET /liveness-challenge to get a new one')
  }

  // Upload ALL frames to storage first — if any fail, return 502 with no DB rows
  const { getStorage } = await import('../../lib/storage.js')
  const storage = getStorage()
  const timestamp = Date.now()

  const uploadedKeys: string[] = []
  for (let i = 0; i < params.frames.length; i++) {
    const key = `verifications/${params.verificationId}/liveness-${i}-${timestamp}.jpg`
    await storage.uploadFile(key, params.frames[i]!)
    uploadedKeys.push(key)
  }

  // All uploads succeeded — now insert DB rows
  for (const key of uploadedKeys) {
    await sql`
      INSERT INTO documents (verification_id, type, side, r2_key, purge_at)
      VALUES (
        ${params.verificationId},
        'selfie',
        'selfie',
        ${key},
        now() + INTERVAL '30 days'
      )
    `
  }

  // Update status and enqueue processing
  await sql`
    UPDATE verifications
    SET status = 'liveness_uploaded', updated_at = now()
    WHERE id = ${params.verificationId}
  `

  await getKycQueue().add('process-liveness', {
    verificationId: params.verificationId,
  }, { attempts: 3, backoff: { type: 'exponential', delay: 5000 } })

  return {
    id: params.verificationId,
    status: 'liveness_uploaded',
    challenge: row.liveness_challenge,
  }
}

// ---------------------------------------------------------------------------
// resolveSessionToken — for public hosted flow (no API key required)
// ---------------------------------------------------------------------------

export async function resolveSessionToken(
  sessionToken: string,
): Promise<{ verificationId: string; organizationId: string }> {
  const sql = getSql()

  const rows = await sql<{ id: string; organization_id: string }[]>`
    SELECT id, organization_id FROM verifications
    WHERE session_token = ${sessionToken}
      AND expires_at > now()
    LIMIT 1
  `

  const row = rows[0]
  if (!row) throw notFound('Session')

  return { verificationId: row.id, organizationId: row.organization_id }
}

// ---------------------------------------------------------------------------
// Public wrappers — authenticate by session token, delegate to existing funcs
// ---------------------------------------------------------------------------

export async function publicUploadDocument(params: {
  sessionToken: string
  file: Buffer
  side: 'front' | 'back'
  type: 'passport' | 'driving_license' | 'national_id' | 'residence_permit'
  final: boolean
}): Promise<{ id: string; status: string }> {
  const { verificationId, organizationId } = await resolveSessionToken(params.sessionToken)
  return uploadDocument({
    verificationId,
    organizationId,
    file: params.file,
    side: params.side,
    type: params.type,
    final: params.final,
  })
}

export async function publicGetLivenessChallenge(
  sessionToken: string,
): Promise<{ challenge: string; expiresAt: string }> {
  const { verificationId, organizationId } = await resolveSessionToken(sessionToken)
  return getLivenessChallenge(verificationId, organizationId)
}

export async function publicUploadLiveness(params: {
  sessionToken: string
  frames: Buffer[]
}): Promise<{ id: string; status: string; challenge: string }> {
  const { verificationId, organizationId } = await resolveSessionToken(params.sessionToken)
  return uploadLiveness({
    verificationId,
    organizationId,
    frames: params.frames,
  })
}
