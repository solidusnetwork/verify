import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    testTimeout: 20000,
    passWithNoTests: true,
    env: {
      DATABASE_URL: 'postgresql://localhost/solidus_verify_test',
      SOLIDUS_STUB_DB_URL: 'postgresql://localhost/solidus_stub_test',
      REDIS_URL: 'redis://localhost:6379',
      RABBITMQ_URL: 'amqp://localhost:5672',
      SESSION_PRIVATE_KEY: '0000000000000000000000000000000000000000000000000000000000000001',
      ISSUER_PRIVATE_KEY: '0000000000000000000000000000000000000000000000000000000000000002',
      ISSUER_DID: 'did:solidus:stub:00000000-test-test-test-000000000001',
      PORT: '3002',
      HOST: '0.0.0.0',
      NODE_ENV: 'test',
      SOLIDUS_SDK_MODE: 'stub',
      STRIPE_SECRET_KEY: 'sk_test_placeholder',
      STRIPE_WEBHOOK_SECRET: 'whsec_placeholder',
      STORAGE_BACKEND: 'local',
      STORAGE_LOCAL_PATH: '/tmp/solidus-test-uploads',
    },
  },
})
