-- Google OAuth: add google_id column, make password_hash nullable for social-only accounts
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE;
ALTER TABLE organizations ALTER COLUMN password_hash DROP NOT NULL;
