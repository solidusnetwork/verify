-- Password reset: add reset_token and reset_token_expires_at columns
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS reset_token TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS reset_token_expires_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_organizations_reset_token ON organizations (reset_token) WHERE reset_token IS NOT NULL;
