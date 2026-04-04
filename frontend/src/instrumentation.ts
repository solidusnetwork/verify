const SENTRY_DSN = 'https://bb68a4860cd67c1e543b980c4fa3ea2a@o4511137791868928.ingest.us.sentry.io/4511140266573824'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.1 })
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.1 })
  }
}
