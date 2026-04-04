import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { z } from 'zod'
import * as webhookService from './service.js'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const CreateEndpointBody = z.object({
  url: z.string().url(),
  events: z
    .array(z.string().min(1))
    .optional()
    .default(['verification.completed', 'credential.issued']),
  description: z.string().optional(),
})

const PatchEndpointBody = z.object({
  url: z.string().url().optional(),
  events: z.array(z.string().min(1)).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
})

const EndpointIdParams = z.object({
  endpointId: z.string().uuid(),
})

const DeliveryQueryParams = z.object({
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
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
// Plugin
// ---------------------------------------------------------------------------

async function webhookRoutesPlugin(app: FastifyInstance): Promise<void> {
  // -------------------------------------------------------------------------
  // POST /  — create webhook endpoint
  // -------------------------------------------------------------------------
  app.post(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { url, events, description } = parseBody(CreateEndpointBody, request.body)

      const result = await webhookService.createEndpoint(
        request.user.sub,
        url,
        events as string[],
        description,
      )

      return reply.code(201).send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /  — list webhook endpoints
  // -------------------------------------------------------------------------
  app.get(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const endpoints = await webhookService.listEndpoints(request.user.sub)
      return reply.send(endpoints)
    },
  )

  // -------------------------------------------------------------------------
  // DELETE /:endpointId  — delete webhook endpoint
  // -------------------------------------------------------------------------
  app.delete(
    '/:endpointId',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { endpointId } = parseParams(EndpointIdParams, request.params)

      await webhookService.deleteEndpoint(request.user.sub, endpointId)

      return reply.code(204).send()
    },
  )

  // -------------------------------------------------------------------------
  // PATCH /:endpointId  — update webhook endpoint
  // -------------------------------------------------------------------------
  app.patch(
    '/:endpointId',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { endpointId } = parseParams(EndpointIdParams, request.params)
      const patch = parseBody(PatchEndpointBody, request.body)

      const result = await webhookService.updateEndpoint(
        request.user.sub,
        endpointId,
        patch,
      )

      return reply.send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /:endpointId/deliveries  — list delivery logs
  // -------------------------------------------------------------------------
  app.get(
    '/:endpointId/deliveries',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { endpointId } = parseParams(EndpointIdParams, request.params)
      const query = parseParams(DeliveryQueryParams, request.query)

      const result = await webhookService.listDeliveries(
        request.user.sub,
        endpointId,
        query,
      )

      return reply.send(result)
    },
  )
}

export const webhookRoutes = webhookRoutesPlugin
