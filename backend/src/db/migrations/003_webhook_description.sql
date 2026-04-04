-- Add description column to webhook_endpoints
ALTER TABLE webhook_endpoints ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
