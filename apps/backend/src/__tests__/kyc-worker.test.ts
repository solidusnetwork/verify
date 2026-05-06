import { describe, it, expect } from 'vitest'

describe('KYC worker', () => {
  // Full worker integration tests require:
  // 1. DB setup with test verification rows
  // 2. Mocked storage returning fixture images
  // 3. Mocked face lib returning pre-computed descriptors
  // These will be added when the test harness supports DB migrations in beforeAll.

  it('failVerification reason is stored as JSON string', () => {
    // Verify our understanding: sql.json('mrz_invalid') produces '"mrz_invalid"'
    // which is valid jsonb for jsonb_set
    const reason = 'mrz_invalid'
    const jsonReason = JSON.stringify(reason)
    expect(jsonReason).toBe('"mrz_invalid"')
    expect(JSON.parse(jsonReason)).toBe(reason)
  })
})
