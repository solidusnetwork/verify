-- GitHub OAuth: add github_id column for social-only accounts
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS github_id TEXT UNIQUE;
