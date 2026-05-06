import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { z } from 'zod'
import { createSdk } from '@solidus/sdk'
import { config } from '../../config.js'
import { notFound } from '../../plugins/error-handler.js'

// ---------------------------------------------------------------------------
// SDK singleton (lazy — reuse across requests)
// ---------------------------------------------------------------------------

const sdk = createSdk({ mode: config.SOLIDUS_SDK_MODE })

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const VcIdParams = z.object({
  vcId: z.string().min(1),
})

const DidParams = z.object({
  did: z.string().min(1),
})

const VerifyVcJwtBody = z.object({
  vcJwt: z.string().min(1),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

async function publicRoutesPlugin(app: FastifyInstance): Promise<void> {
  // -------------------------------------------------------------------------
  // GET /credentials/:vcId  — verify a credential by ID
  // Public endpoint — no auth required.  Used by relying parties to check
  // credential validity against the Solidus Protocol.
  // -------------------------------------------------------------------------
  app.get('/credentials/:vcId', async (request, reply) => {
    const { vcId } = parseParams(VcIdParams, request.params)

    const result = await sdk.credentials.verify(vcId)

    return reply.send({
      valid: result.valid,
      credentialId: result.credentialId ?? vcId,
      status: result.valid ? 'valid' : 'revoked_or_invalid',
      checks: result.checks,
    })
  })

  // -------------------------------------------------------------------------
  // GET /dids/:did  — resolve a DID document
  // Public endpoint — no auth required.
  // -------------------------------------------------------------------------
  app.get('/dids/:did', async (request, reply) => {
    const { did } = parseParams(DidParams, request.params)

    const doc = await sdk.did.resolve(did)
    if (!doc) {
      throw notFound('DID')
    }

    return reply.send(doc)
  })

  // -------------------------------------------------------------------------
  // POST /credentials/verify  — verify a raw VC JWT
  // Decodes the JWT to extract the credential ID, then delegates to the SDK.
  // -------------------------------------------------------------------------
  app.post('/credentials/verify', async (request, reply) => {
    const { vcJwt } = parseBody(VerifyVcJwtBody, request.body)

    try {
      const parts = vcJwt.split('.')
      if (parts.length !== 3) {
        return reply.status(400).send({ valid: false, error: 'Malformed JWT: expected 3 parts' })
      }
      const payload = JSON.parse(Buffer.from(parts[1]!, 'base64url').toString())
      const vcId: string | undefined = payload.jti ?? payload.vc?.id ?? payload.sub
      if (!vcId) {
        return reply.status(400).send({ valid: false, error: 'JWT payload missing credential identifier (jti, vc.id, or sub)' })
      }

      const result = await sdk.credentials.verify(vcId)
      return reply.send({
        valid: result.valid,
        credentialId: result.credentialId ?? vcId,
        status: result.valid ? 'valid' : 'revoked_or_invalid',
        checks: result.checks,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      return reply.status(400).send({ valid: false, error: message })
    }
  })
}

export const publicRoutes = publicRoutesPlugin
