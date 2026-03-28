import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { z } from 'zod'
import * as authService from './service.js'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const RegisterBody = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(120),
})

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  totpCode: z.string().optional(),
})

const TotpEnableBody = z.object({
  secret: z.string().min(1),
  totpCode: z.string().length(6).regex(/^\d{6}$/),
})

// ---------------------------------------------------------------------------
// JWT payload type
// ---------------------------------------------------------------------------

interface JwtPayload {
  sub: string
  email: string
}

// Augment FastifyInstance so TypeScript knows about app.authenticate, signToken, verifyToken
// and FastifyRequest so request.user is typed as JwtPayload
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    signToken(payload: import('@solidus/jwt').JWTPayload, options?: import('@solidus/jwt').SignOptions): Promise<string>
    verifyToken(token: string): Promise<import('@solidus/jwt').JWTPayload>
  }
  interface FastifyRequest {
    user: JwtPayload
  }
}

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

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

async function authRoutesPlugin(app: FastifyInstance): Promise<void> {
  // authenticate decorator is now defined in buildApp() — available to all plugins

  // -------------------------------------------------------------------------
  // POST /register
  // -------------------------------------------------------------------------
  app.post('/register', async (request, reply) => {
    const { email, password, name } = parseBody(RegisterBody, request.body)

    const { organizationId } = await authService.register(email, password, name)

    const token = await app.signToken(
      { sub: organizationId, email, type: 'access' },
      { expiresIn: '24h' },
    )

    return reply.code(201).send({ token })
  })

  // -------------------------------------------------------------------------
  // POST /login
  // -------------------------------------------------------------------------
  app.post('/login', async (request, reply) => {
    const { email, password, totpCode } = parseBody(LoginBody, request.body)

    const result = await authService.login(email, password, totpCode)

    if ('requiresTotp' in result) {
      return reply.send({ requiresTotp: true })
    }

    const token = await app.signToken(
      { sub: result.organizationId, email: result.email, type: 'access' },
      { expiresIn: '24h' },
    )

    return reply.send({ token })
  })

  // -------------------------------------------------------------------------
  // GET /me  (requires JWT)
  // -------------------------------------------------------------------------
  app.get(
    '/me',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const org = await authService.getOrg(request.user.sub)
      return reply.send(org)
    },
  )

  // -------------------------------------------------------------------------
  // POST /totp/setup  (requires JWT)
  // -------------------------------------------------------------------------
  app.post(
    '/totp/setup',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const org = await authService.getOrg(request.user.sub)
      const secret = authService.generateTotpSecret()
      const otpAuthUrl =
        `otpauth://totp/Solidus%20Verify:${encodeURIComponent(org.email)}` +
        `?secret=${secret}&issuer=Solidus`

      return reply.send({ secret, otpAuthUrl })
    },
  )

  // -------------------------------------------------------------------------
  // POST /totp/enable  (requires JWT)
  // -------------------------------------------------------------------------
  app.post(
    '/totp/enable',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { secret, totpCode } = parseBody(TotpEnableBody, request.body)

      await authService.enableTotp(request.user.sub, totpCode, secret)

      return reply.code(204).send()
    },
  )
}

export const authRoutes = authRoutesPlugin
