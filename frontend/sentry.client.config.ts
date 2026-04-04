import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://bb68a4860cd67c1e543b980c4fa3ea2a@o4511137791868928.ingest.us.sentry.io/4511140266573824',
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.05,
  integrations: [
    Sentry.replayIntegration(),
  ],
})
