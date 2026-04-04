import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import multipart from '@fastify/multipart'
import sensible from '@fastify/sensible'
import * as ed from '@noble/ed25519'
import { sign as solidusJwtSign, verify as solidusJwtVerify } from '@solidus/jwt'
import type { JWTPayload, SignOptions } from '@solidus/jwt'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { config } from './config.js'
import { errorHandlerPlugin } from './plugins/error-handler.js'
import { authRoutes } from './modules/auth/routes.js'
import { apiKeyRoutes } from './modules/api-keys/routes.js'
import { verificationRoutes } from './modules/verifications/routes.js'
import { webhookRoutes } from './modules/webhooks/routes.js'
import { publicRoutes } from './modules/public/routes.js'
import { dashboardRoutes } from './modules/dashboard/routes.js'

declare module 'fastify' {
  interface FastifyInstance {
    signToken(payload: JWTPayload, options?: SignOptions): Promise<string>
    verifyToken(token: string): Promise<JWTPayload>
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>
  }
}

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.NODE_ENV === 'test' ? 'silent' : 'info',
      redact: ['req.headers.authorization', 'req.body.password', 'req.body.totpCode'],
    },
  })

  // Core plugins
  await app.register(sensible)
  await app.register(cors, {
    origin: config.NODE_ENV === 'production'
      ? ['https://verify.solidus.network']
      : true,
    credentials: true,
  })
  const sessionPrivateKey = new Uint8Array(Buffer.from(config.SESSION_PRIVATE_KEY, 'hex'))
  const sessionPublicKey = await ed.getPublicKeyAsync(sessionPrivateKey)

  app.decorate(
    'signToken',
    (payload: JWTPayload, options?: SignOptions) =>
      solidusJwtSign(payload, sessionPrivateKey, options),
  )
  app.decorate(
    'verifyToken',
    (token: string) => solidusJwtVerify(token, sessionPublicKey),
  )
  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const auth = request.headers.authorization
      if (!auth?.startsWith('Bearer ')) {
        return reply.code(401).send({ error: 'Unauthorized' })
      }
      try {
        const payload = await app.verifyToken(auth.slice(7))
        ;(request as FastifyRequest & { user: { sub: string; email: string } }).user = {
          sub: payload.sub,
          email: payload['email'] as string,
        }
      } catch {
        return reply.code(401).send({ error: 'Invalid or expired token' })
      }
    },
  )

  await app.register(rateLimit, {
    global: false, // rate limits are applied per-route
    redis: undefined, // configured per-route where needed
  })
  await app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max document upload
  })

  // Error handler
  await app.register(errorHandlerPlugin)

  // Health check (no auth)
  app.get('/health', async () => ({ status: 'ok', ts: new Date().toISOString() }))

  // API routes
  await app.register(authRoutes, { prefix: '/v1/auth' })
  await app.register(apiKeyRoutes, { prefix: '/v1/api-keys' })
  await app.register(verificationRoutes, { prefix: '/v1/verifications' })
  await app.register(webhookRoutes, { prefix: '/v1/webhooks' })
  await app.register(dashboardRoutes, { prefix: '/v1/dashboard' })
  await app.register(publicRoutes, { prefix: '/v1' })   // /v1/credentials/:id, /v1/dids/:did

  return app
}
