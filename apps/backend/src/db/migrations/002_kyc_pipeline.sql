-- KYC Pipeline — expand verification status, add liveness + document columns

-- 1. Drain old 'processing' status (prevents constraint violation)
UPDATE verifications
SET status = 'failed',
    metadata = jsonb_set(metadata, '{reason}', '"migration_drain"')
WHERE status = 'processing';

-- 2. Expand verifications.status enum
ALTER TABLE verifications DROP CONSTRAINT IF EXISTS verifications_status_check;
ALTER TABLE verifications ADD CONSTRAINT verifications_status_check
  CHECK (status IN (
    'pending', 'document_uploaded', 'document_processing',
    'awaiting_liveness', 'liveness_uploaded', 'liveness_processing',
    'completed', 'failed', 'expired'
  ));

-- 3. Liveness challenge columns
ALTER TABLE verifications ADD COLUMN IF NOT EXISTS liveness_challenge TEXT
  CHECK (liveness_challenge IN ('blink', 'turn-left', 'turn-right', 'smile'));
ALTER TABLE verifications ADD COLUMN IF NOT EXISTS liveness_challenge_expires_at TIMESTAMPTZ;

-- 4. Expand documents.type to include selfie
ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_type_check;
ALTER TABLE documents ADD CONSTRAINT documents_type_check
  CHECK (type IN ('passport', 'driving_license', 'national_id', 'residence_permit', 'selfie'));

-- 5. Document side
ALTER TABLE documents ADD COLUMN IF NOT EXISTS side TEXT NOT NULL DEFAULT 'front'
  CHECK (side IN ('front', 'back', 'selfie'));
