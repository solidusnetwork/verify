import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from '../app.js'
import type { FastifyInstance } from 'fastify'

describe('KYC endpoint routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await buildApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /:verificationId/documents', () => {
    it('route is registered (not 404)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/verifications/00000000-0000-0000-0000-000000000000/documents',
        headers: { authorization: 'Bearer sk_test_placeholder' },
      })
      // 500 = route exists but DB not set up; 401/404 = auth/not found
      // NOT 404 means the route is registered
      expect(response.statusCode).not.toBe(404)
    })
  })

  describe('GET /:verificationId/liveness-challenge', () => {
    it('route is registered (not 404)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/v1/verifications/00000000-0000-0000-0000-000000000000/liveness-challenge',
        headers: { authorization: 'Bearer sk_test_placeholder' },
      })
      expect(response.statusCode).not.toBe(404)
    })
  })

  describe('POST /:verificationId/liveness', () => {
    it('route is registered (not 404)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/verifications/00000000-0000-0000-0000-000000000000/liveness',
        headers: { authorization: 'Bearer sk_test_placeholder' },
      })
      expect(response.statusCode).not.toBe(404)
    })
  })

  describe('existing routes', () => {
    it('health check responds 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      })
      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toHaveProperty('status', 'ok')
    })

    it('POST /v1/verifications/ is registered (create session)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/verifications/',
        headers: { authorization: 'Bearer sk_test_placeholder' },
      })
      expect(response.statusCode).not.toBe(404)
    })
  })
})
