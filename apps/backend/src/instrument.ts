import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: 'https://9691925c53ac27504899e18f8547b682@o4511137791868928.ingest.us.sentry.io/4511140266770432',
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV ?? 'development',
})
