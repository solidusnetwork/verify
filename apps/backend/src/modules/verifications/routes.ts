import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { z } from 'zod'
import { resolveApiKey } from '../api-keys/service.js'
import { unauthorized, notFound, badRequest, conflict } from '../../plugins/error-handler.js'
import { getSql } from '../../db/index.js'
import * as verificationService from './service.js'

// ---------------------------------------------------------------------------
// Module augmentation — add apiKey to FastifyRequest
// ---------------------------------------------------------------------------

declare module 'fastify' {
  interface FastifyRequest {
    apiKey: {
      organizationId: string
      mode: 'live' | 'sandbox'
      keyId: string
    }
  }
}

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const CreateSessionBody = z.object({
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  sandbox: z.boolean().optional().default(false),
  sandboxOutcome: z
    .enum(['pass', 'fail', 'timeout', 'document_rejected'])
    .optional(),
  subjectDid: z.string().optional(),
  redirectUrl: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
})

const ListSessionsQuery = z.object({
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
})

const VerificationIdParams = z.object({
  verificationId: z.string().uuid(),
})

const SessionTokenParams = z.object({
  sessionToken: z.string().min(1),
})

const DocumentUploadFields = z.object({
  side: z.enum(['front', 'back']),
  type: z.enum(['passport', 'driving_license', 'national_id', 'residence_permit']),
  final: z.enum(['true', 'false']).transform((v) => v === 'true').default('false'),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseBody<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body)
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), {
      validation: true,
    })
  }
  return result.data
}

function parseQuery<T>(schema: z.ZodType<T>, query: unknown): T {
  const result = schema.safeParse(query)
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), {
      validation: true,
    })
  }
  return result.data
}

function parseParams<T>(schema: z.ZodType<T>, params: unknown): T {
  const result = schema.safeParse(params)
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), {
      validation: true,
    })
  }
  return result.data
}

// ---------------------------------------------------------------------------
// requireApiKey preHandler
// ---------------------------------------------------------------------------

async function requireApiKey(
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  const authHeader = request.headers['authorization']
  const raw =
    typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null

  if (!raw) {
    throw unauthorized('Invalid API key')
  }

  const resolved = await resolveApiKey(raw)
  if (!resolved) {
    throw unauthorized('Invalid API key')
  }

  request.apiKey = {
    organizationId: resolved.organizationId,
    mode: resolved.mode,
    keyId: resolved.keyId,
  }
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

async function verificationRoutesPlugin(app: FastifyInstance): Promise<void> {
  // -------------------------------------------------------------------------
  // POST /  — create verification session
  // -------------------------------------------------------------------------
  app.post(
    '/',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const body = parseBody(CreateSessionBody, request.body)

      const result = await verificationService.createSession({
        organizationId: request.apiKey.organizationId,
        apiKeyId: request.apiKey.keyId,
        level: body.level,
        sandbox: body.sandbox ?? false,
        ...(body.sandboxOutcome !== undefined && { sandboxOutcome: body.sandboxOutcome }),
        ...(body.subjectDid !== undefined && { subjectDid: body.subjectDid }),
        ...(body.redirectUrl !== undefined && { redirectUrl: body.redirectUrl }),
        ...(body.metadata !== undefined && { metadata: body.metadata }),
      })

      return reply.code(201).send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /  — list verification sessions
  // -------------------------------------------------------------------------
  app.get(
    '/',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const query = parseQuery(ListSessionsQuery, request.query)

      const result = await verificationService.listSessions(
        request.apiKey.organizationId,
        {
          ...(query.status !== undefined && { status: query.status }),
          ...(query.limit !== undefined && { limit: query.limit }),
          ...(query.offset !== undefined && { offset: query.offset }),
        },
      )

      return reply.send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /:verificationId  — get a single session (API key auth)
  // Must be registered before /s/:sessionToken to avoid route conflicts
  // -------------------------------------------------------------------------
  app.get(
    '/:verificationId',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const { verificationId } = parseParams(
        VerificationIdParams,
        request.params,
      )

      const session = await verificationService.getSession(
        request.apiKey.organizationId,
        verificationId,
      )

      return reply.send(session)
    },
  )

  // -------------------------------------------------------------------------
  // GET /s/:sessionToken  — public hosted flow (no auth)
  // Returns minimal public data; never exposes org info
  // -------------------------------------------------------------------------
  app.get(
    '/s/:sessionToken',
    async (request, reply) => {
      const { sessionToken } = parseParams(SessionTokenParams, request.params)
      const sql = getSql()

      const rows = await sql<
        {
          id: string
          level: number
          status: string
          session_token: string
        }[]
      >`
        SELECT id, level, status, session_token
        FROM verifications
        WHERE session_token = ${sessionToken}
        LIMIT 1
      `

      const row = rows[0]
      if (!row) throw notFound('Session')

      const hostedUrl = `https://verify.solidus.network/s/${row.session_token}`

      return reply.send({
        id: row.id,
        level: row.level,
        status: row.status,
        hostedUrl,
      })
    },
  )

  // =========================================================================
  // PUBLIC session-token-authed endpoints (for hosted verification flow)
  // No API key required — session token acts as auth
  // =========================================================================

  // -------------------------------------------------------------------------
  // POST /s/:sessionToken/documents  — public document upload
  // -------------------------------------------------------------------------
  app.post(
    '/s/:sessionToken/documents',
    async (request, reply) => {
      const { sessionToken } = parseParams(SessionTokenParams, request.params)

      const data = await request.file()
      if (!data) throw badRequest('No file uploaded')

      const fileBuffer = await data.toBuffer()
      if (fileBuffer.length > 10 * 1024 * 1024) {
        throw badRequest('File too large (max 10MB)')
      }

      const fields: Record<string, string> = {}
      for (const [key, field] of Object.entries(data.fields)) {
        if (field && typeof field === 'object' && 'value' in field) {
          fields[key] = (field as { value: string }).value
        }
      }

      const parsed = DocumentUploadFields.safeParse(fields)
      if (!parsed.success) {
        throw badRequest(`Invalid fields: ${parsed.error.issues.map((i) => `${i.path}: ${i.message}`).join('; ')}`)
      }

      const result = await verificationService.publicUploadDocument({
        sessionToken,
        file: fileBuffer,
        side: parsed.data.side,
        type: parsed.data.type,
        final: parsed.data.final,
      })

      return reply.code(202).send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /s/:sessionToken/liveness-challenge  — public liveness challenge
  // -------------------------------------------------------------------------
  app.get(
    '/s/:sessionToken/liveness-challenge',
    async (request, reply) => {
      const { sessionToken } = parseParams(SessionTokenParams, request.params)

      const result = await verificationService.publicGetLivenessChallenge(sessionToken)

      return reply.send(result)
    },
  )

  // -------------------------------------------------------------------------
  // POST /s/:sessionToken/liveness  — public liveness upload
  // -------------------------------------------------------------------------
  app.post(
    '/s/:sessionToken/liveness',
    async (request, reply) => {
      const { sessionToken } = parseParams(SessionTokenParams, request.params)

      const parts = request.parts()
      const frames: Buffer[] = []

      for await (const part of parts) {
        if (part.type === 'file') {
          const buf = await part.toBuffer()
          if (buf.length > 2 * 1024 * 1024) {
            throw badRequest('Frame too large (max 2MB per frame)')
          }
          frames.push(buf)
          if (frames.length > 5) {
            throw badRequest('Too many frames (max 5)')
          }
        }
      }

      if (frames.length < 3) {
        throw badRequest('At least 3 frames required')
      }

      const result = await verificationService.publicUploadLiveness({
        sessionToken,
        frames,
      })

      return reply.code(202).send(result)
    },
  )

  // =========================================================================
  // API-key-authed endpoints (for SDK/programmatic access)
  // =========================================================================

  // -------------------------------------------------------------------------
  // POST /:verificationId/documents  — upload document image
  // -------------------------------------------------------------------------
  app.post(
    '/:verificationId/documents',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const { verificationId } = parseParams(VerificationIdParams, request.params)

      const data = await request.file()
      if (!data) throw badRequest('No file uploaded')

      const fileBuffer = await data.toBuffer()
      if (fileBuffer.length > 10 * 1024 * 1024) {
        throw badRequest('File too large (max 10MB)')
      }

      // Parse fields from multipart
      const fields: Record<string, string> = {}
      for (const [key, field] of Object.entries(data.fields)) {
        if (field && typeof field === 'object' && 'value' in field) {
          fields[key] = (field as { value: string }).value
        }
      }

      const parsed = DocumentUploadFields.safeParse(fields)
      if (!parsed.success) {
        throw badRequest(`Invalid fields: ${parsed.error.issues.map((i) => `${i.path}: ${i.message}`).join('; ')}`)
      }

      const result = await verificationService.uploadDocument({
        verificationId,
        organizationId: request.apiKey.organizationId,
        file: fileBuffer,
        side: parsed.data.side,
        type: parsed.data.type,
        final: parsed.data.final,
      })

      return reply.code(202).send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /:verificationId/liveness-challenge
  // -------------------------------------------------------------------------
  app.get(
    '/:verificationId/liveness-challenge',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const { verificationId } = parseParams(VerificationIdParams, request.params)

      const result = await verificationService.getLivenessChallenge(
        verificationId,
        request.apiKey.organizationId,
      )

      return reply.send(result)
    },
  )

  // -------------------------------------------------------------------------
  // POST /:verificationId/liveness  — upload liveness frames
  // -------------------------------------------------------------------------
  app.post(
    '/:verificationId/liveness',
    { preHandler: [requireApiKey] },
    async (request, reply) => {
      const { verificationId } = parseParams(VerificationIdParams, request.params)

      const parts = request.parts()
      const frames: Buffer[] = []

      for await (const part of parts) {
        if (part.type === 'file') {
          const buf = await part.toBuffer()
          if (buf.length > 2 * 1024 * 1024) {
            throw badRequest('Frame too large (max 2MB per frame)')
          }
          frames.push(buf)
          if (frames.length > 5) {
            throw badRequest('Too many frames (max 5)')
          }
        }
      }

      if (frames.length < 3) {
        throw badRequest('At least 3 frames required')
      }

      const result = await verificationService.uploadLiveness({
        verificationId,
        organizationId: request.apiKey.organizationId,
        frames,
      })

      return reply.code(202).send(result)
    },
  )
}

// Not using fp() — routes are self-contained and don't need to share
// decorators with the parent scope. fp() causes POST / conflicts in Fastify v5
// when multiple prefixed plugins each declare POST /.
export const verificationRoutes = verificationRoutesPlugin
