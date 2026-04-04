import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
}

export default withSentryConfig(nextConfig, {
  org: 'solidusnetwork',
  project: 'verify',
  silent: true,
  disableLogger: true,
  sourcemaps: { disable: true },
})
