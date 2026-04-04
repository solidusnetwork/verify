-- Solidus Verify — database schema
-- Raw SQL, no ORM. Run via: node dist/db/migrate.js

-- Organizations (merchant accounts)
CREATE TABLE IF NOT EXISTS organizations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  email               TEXT NOT NULL UNIQUE,
  password_hash       TEXT NOT NULL,
  totp_secret         TEXT,
  totp_enabled        BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id  TEXT,
  trial_ends_at       TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '14 days'),
  free_verifications  INTEGER NOT NULL DEFAULT 1000,
  subscription_tier   TEXT NOT NULL DEFAULT 'trial'
                        CHECK (subscription_tier IN ('trial', 'startup', 'growth', 'enterprise')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- API keys
CREATE TABLE IF NOT EXISTS api_keys (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  key_hash         TEXT NOT NULL UNIQUE,  -- SHA-256 of the raw key, never store raw
  key_prefix       TEXT NOT NULL,         -- e.g. "sk_live_abc1" (first 12 chars shown in UI)
  name             TEXT NOT NULL,
  mode             TEXT NOT NULL CHECK (mode IN ('live', 'sandbox')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at     TIMESTAMPTZ,
  revoked_at       TIMESTAMPTZ
);

-- Verification sessions
CREATE TABLE IF NOT EXISTS verifications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  api_key_id       UUID NOT NULL REFERENCES api_keys(id),
  subject_did      TEXT,
  level            INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 3),
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'expired')),
  sandbox          BOOLEAN NOT NULL DEFAULT false,
  sandbox_outcome  TEXT CHECK (sandbox_outcome IN ('pass', 'fail', 'timeout', 'document_rejected')),
  credential_id    TEXT,
  session_token    TEXT NOT NULL UNIQUE,   -- token in /s/:sessionToken URL
  redirect_url     TEXT,
  metadata         JSONB NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at     TIMESTAMPTZ,
  expires_at       TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours')
);

-- Document uploads (purged after 30 days)
CREATE TABLE IF NOT EXISTS documents (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_id  UUID NOT NULL REFERENCES verifications(id) ON DELETE CASCADE,
  type             TEXT NOT NULL CHECK (type IN ('passport', 'driving_license', 'national_id', 'residence_permit')),
  r2_key           TEXT NOT NULL,   -- Cloudflare R2 object key
  purge_at         TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Webhook endpoints
CREATE TABLE IF NOT EXISTS webhook_endpoints (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  url              TEXT NOT NULL,
  secret_hash      TEXT NOT NULL,   -- SHA-256 of webhook signing secret
  events           TEXT[] NOT NULL DEFAULT '{"verification.completed","credential.issued"}',
  enabled          BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Webhook delivery log
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint_id   UUID NOT NULL REFERENCES webhook_endpoints(id) ON DELETE CASCADE,
  event_type    TEXT NOT NULL,
  payload       JSONB NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'delivered', 'failed')),
  attempts      INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  delivered_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit log (never delete — append only)
CREATE TABLE IF NOT EXISTS audit_log (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  actor            TEXT NOT NULL,   -- 'system', 'api_key:<id>', 'user:<email>'
  action           TEXT NOT NULL,
  resource_type    TEXT,
  resource_id      TEXT,
  ip               TEXT,
  metadata         JSONB NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Idempotency keys (24h window, Redis-backed but also DB for durability)
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key             TEXT PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  response_status INTEGER NOT NULL,
  response_body   JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours')
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_api_keys_org          ON api_keys (organization_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash         ON api_keys (key_hash);
CREATE INDEX IF NOT EXISTS idx_verifications_org     ON verifications (organization_id);
CREATE INDEX IF NOT EXISTS idx_verifications_token   ON verifications (session_token);
CREATE INDEX IF NOT EXISTS idx_verifications_status  ON verifications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verifications_did     ON verifications (subject_did) WHERE subject_did IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_webhooks_org          ON webhook_endpoints (organization_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_endpoint   ON webhook_deliveries (endpoint_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_org         ON audit_log (organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_idempotency_expires   ON idempotency_keys (expires_at);
