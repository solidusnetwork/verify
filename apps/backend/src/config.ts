import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  RABBITMQ_URL: z.string().min(1),

  SESSION_PRIVATE_KEY: z.string().length(64),  // hex-encoded 32-byte Ed25519 private key

  SOLIDUS_STUB_DB_URL: z.string().min(1),
  SOLIDUS_SDK_MODE: z.enum(['stub', 'testnet', 'mainnet']).default('stub'),

  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().default('solidus-verify-documents'),

  STORAGE_BACKEND: z.enum(['local', 's3']).default('local'),
  STORAGE_LOCAL_PATH: z.string().default('data/uploads'),

  ISSUER_PRIVATE_KEY: z.string().length(64),  // hex-encoded Ed25519 private key
  ISSUER_DID: z.string().min(1),           // did:solidus:... of the verify issuer
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('Invalid environment variables:')
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`)
  }
  process.exit(1)
}

export const config = parsed.data
export type Config = typeof config
