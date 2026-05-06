import type { FastifyInstance, FastifyRequest } from 'fastify'
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

const ForgotPasswordBody = z.object({
  email: z.string().email(),
})

const ResetPasswordBody = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
})

// ---------------------------------------------------------------------------
// JWT payload type
// ---------------------------------------------------------------------------

interface JwtPayload {
  sub: string
  email: string
}

// FastifyRequest augmentation so request.user is typed as JwtPayload
declare module 'fastify' {
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
  // GET /google — redirect to Google OAuth consent screen
  // -------------------------------------------------------------------------
  app.get('/google', async (_request, reply) => {
    const url = authService.getGoogleAuthUrl()
    return reply.redirect(url)
  })

  // -------------------------------------------------------------------------
  // GET /google/callback — handle Google OAuth callback
  // -------------------------------------------------------------------------
  app.get('/google/callback', async (request, reply) => {
    const { code, error: oauthError } = request.query as { code?: string; error?: string }

    if (oauthError || !code) {
      return reply.redirect('https://verify.solidus.network/login?error=google_auth_failed')
    }

    try {
      const result = await authService.handleGoogleCallback(code)

      const token = await app.signToken(
        { sub: result.organizationId, email: result.email, type: 'access' },
        { expiresIn: '24h' },
      )

      return reply.redirect(`https://verify.solidus.network/google-callback?token=${encodeURIComponent(token)}`)
    } catch (err) {
      app.log.error({ err }, 'Google OAuth callback failed')
      return reply.redirect('https://verify.solidus.network/login?error=google_auth_failed')
    }
  })

  // -------------------------------------------------------------------------
  // GET /github — redirect to GitHub OAuth consent screen
  // -------------------------------------------------------------------------
  app.get('/github', async (_request, reply) => {
    const url = authService.getGitHubAuthUrl()
    return reply.redirect(url)
  })

  // -------------------------------------------------------------------------
  // GET /github/callback — handle GitHub OAuth callback
  // -------------------------------------------------------------------------
  app.get('/github/callback', async (request, reply) => {
    const { code, error: oauthError } = request.query as { code?: string; error?: string }

    if (oauthError || !code) {
      return reply.redirect('https://verify.solidus.network/login?error=github_auth_failed')
    }

    try {
      const result = await authService.handleGitHubCallback(code)

      const token = await app.signToken(
        { sub: result.organizationId, email: result.email, type: 'access' },
        { expiresIn: '24h' },
      )

      return reply.redirect(`https://verify.solidus.network/github-callback?token=${encodeURIComponent(token)}`)
    } catch (err) {
      app.log.error({ err }, 'GitHub OAuth callback failed')
      return reply.redirect('https://verify.solidus.network/login?error=github_auth_failed')
    }
  })

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
  // POST /forgot-password
  // -------------------------------------------------------------------------
  app.post('/forgot-password', async (request, reply) => {
    const { email } = parseBody(ForgotPasswordBody, request.body)

    await authService.forgotPassword(email)

    // Always return ok — don't reveal whether the email exists
    return reply.send({ ok: true })
  })

  // -------------------------------------------------------------------------
  // POST /reset-password
  // -------------------------------------------------------------------------
  app.post('/reset-password', async (request, reply) => {
    const { token, password } = parseBody(ResetPasswordBody, request.body)

    await authService.resetPassword(token, password)

    return reply.send({ ok: true })
  })

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
