import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { z } from 'zod'
import * as apiKeyService from './service.js'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const CreateApiKeyBody = z.object({
  name: z.string().min(1).max(120),
  mode: z.enum(['live', 'sandbox']),
})

const RevokeApiKeyParams = z.object({
  keyId: z.string().uuid(),
})

// ---------------------------------------------------------------------------
// Helper: parse & validate a Zod schema, throw 400 on failure
// ---------------------------------------------------------------------------

function parseBody<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body)
  if (!result.success) {
    const detail = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), { validation: true })
  }
  return result.data
}

function parseParams<T>(schema: z.ZodType<T>, params: unknown): T {
  const result = schema.safeParse(params)
  if (!result.success) {
    const detail = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), { validation: true })
  }
  return result.data
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

async function apiKeyRoutesPlugin(app: FastifyInstance): Promise<void> {
  // -------------------------------------------------------------------------
  // POST /  — create a new API key
  // -------------------------------------------------------------------------
  app.post(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { name, mode } = parseBody(CreateApiKeyBody, request.body)

      const result = await apiKeyService.createApiKey(request.user.sub, name, mode)

      return reply.code(201).send({
        id: result.id,
        rawKey: result.rawKey,
        prefix: result.prefix,
        mode: result.mode,
        createdAt: result.createdAt,
        warning: 'Store this key securely. It will not be shown again.',
      })
    },
  )

  // -------------------------------------------------------------------------
  // GET /  — list all API keys for the org
  // -------------------------------------------------------------------------
  app.get(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const keys = await apiKeyService.listApiKeys(request.user.sub)
      return reply.send(keys)
    },
  )

  // -------------------------------------------------------------------------
  // DELETE /:keyId  — revoke an API key
  // -------------------------------------------------------------------------
  app.delete(
    '/:keyId',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { keyId } = parseParams(RevokeApiKeyParams, request.params)

      await apiKeyService.revokeApiKey(request.user.sub, keyId)

      return reply.code(204).send()
    },
  )
}

export const apiKeyRoutes = apiKeyRoutesPlugin
