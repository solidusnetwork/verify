import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHmac } from 'node:crypto'
import type { BinaryLike, ScryptOptions } from 'node:crypto'
import { getSql } from '../../db/index.js'
import { ApiError, unauthorized, conflict, notFound } from '../../plugins/error-handler.js'

function scrypt(password: BinaryLike, salt: BinaryLike, keylen: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scryptCb(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key)))
  )
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 } as const
const SCRYPT_KEYLEN = 64

// Base32 alphabet: A–Z then 2–7 (RFC 4648)
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

const TOTP_STEP_SECONDS = 30
const TOTP_DIGITS = 6
const TOTP_WINDOW = 1  // ±1 step tolerance

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = (await scrypt(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS)) as Buffer
  return `$scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$')
  // expected format: '' '$scrypt' '<salt_hex>' '<hash_hex>'  (leading empty from split)
  if (parts.length !== 4 || parts[0] !== '' || parts[1] !== 'scrypt') {
    return false
  }
  const saltHex = parts[2]
  const hashHex = parts[3]

  if (!saltHex || !hashHex) return false

  const salt = Buffer.from(saltHex, 'hex')
  const expected = Buffer.from(hashHex, 'hex')

  let actual: Buffer
  try {
    actual = (await scrypt(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS)) as Buffer
  } catch {
    return false
  }

  if (actual.length !== expected.length) return false
  return timingSafeEqual(actual, expected)
}

// ---------------------------------------------------------------------------
// TOTP
// ---------------------------------------------------------------------------

/**
 * Encode a Buffer as a base32 string (RFC 4648, no padding).
 */
function base32Encode(buf: Buffer): string {
  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < buf.length; i++) {
    value = (value << 8) | buf[i]!
    bits += 8
    while (bits >= 5) {
      bits -= 5
      output += BASE32_ALPHABET[(value >>> bits) & 0x1f]
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f]
  }

  return output
}

/**
 * Decode a base32 string (RFC 4648) to a Buffer, case-insensitive.
 * Silently skips padding characters ('=').
 */
function base32Decode(input: string): Buffer {
  const str = input.toUpperCase().replace(/=+$/, '')
  const bytes: number[] = []
  let bits = 0
  let value = 0

  for (const char of str) {
    const idx = BASE32_ALPHABET.indexOf(char)
    if (idx === -1) throw new ApiError(400, 'Invalid TOTP secret encoding')
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) {
      bits -= 8
      bytes.push((value >>> bits) & 0xff)
    }
  }

  return Buffer.from(bytes)
}

/** Returns the 6-digit TOTP code for a given secret and time step counter. */
function computeTotp(secretBuf: Buffer, counter: bigint): string {
  // HOTP per RFC 4226
  const counterBuf = Buffer.alloc(8)
  counterBuf.writeBigUInt64BE(counter)

  const hmac = createHmac('sha1', secretBuf)
  hmac.update(counterBuf)
  const digest = hmac.digest()

  const offset = digest[19]! & 0x0f
  const code =
    ((digest[offset]! & 0x7f) << 24) |
    ((digest[offset + 1]! & 0xff) << 16) |
    ((digest[offset + 2]! & 0xff) << 8) |
    (digest[offset + 3]! & 0xff)

  return String(code % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, '0')
}

export function generateTotpSecret(): string {
  return base32Encode(randomBytes(20))
}

export function verifyTotp(secret: string, token: string): boolean {
  if (!/^\d{6}$/.test(token)) return false

  let secretBuf: Buffer
  try {
    secretBuf = base32Decode(secret)
  } catch {
    return false
  }

  const step = BigInt(Math.floor(Date.now() / 1000 / TOTP_STEP_SECONDS))

  for (let delta = -TOTP_WINDOW; delta <= TOTP_WINDOW; delta++) {
    const expected = computeTotp(secretBuf, step + BigInt(delta))
    // Constant-time comparison of the 6-digit strings
    const expectedBuf = Buffer.from(expected, 'utf8')
    const tokenBuf = Buffer.from(token, 'utf8')
    if (
      expectedBuf.length === tokenBuf.length &&
      timingSafeEqual(expectedBuf, tokenBuf)
    ) {
      return true
    }
  }

  return false
}

// ---------------------------------------------------------------------------
// Database row types (internal)
// ---------------------------------------------------------------------------

interface OrgRow {
  id: string
  email: string
  name: string
  password_hash: string
  totp_secret: string | null
  totp_enabled: boolean
  subscription_tier: string
  trial_ends_at: Date
}

// ---------------------------------------------------------------------------
// Auth service functions
// ---------------------------------------------------------------------------

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<{ organizationId: string }> {
  const sql = getSql()
  const passwordHash = await hashPassword(password)

  let rows: { id: string }[]
  try {
    rows = await sql<{ id: string }[]>`
      INSERT INTO organizations (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id
    `
  } catch (err: unknown) {
    // postgres unique_violation code = '23505'
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === '23505'
    ) {
      throw conflict('An account with that email address already exists')
    }
    throw err
  }

  const row = rows[0]
  if (!row) throw new Error('INSERT returned no row')

  return { organizationId: row.id }
}

export async function login(
  email: string,
  password: string,
  totpCode?: string,
): Promise<{ organizationId: string; email: string; name: string } | { requiresTotp: true }> {
  const sql = getSql()

  const rows = await sql<OrgRow[]>`
    SELECT id, email, name, password_hash, totp_secret, totp_enabled
    FROM organizations
    WHERE email = ${email}
    LIMIT 1
  `
  const org = rows[0]

  // Use a constant-time-equivalent path: always hash even on miss to prevent
  // timing-based user enumeration.
  if (!org) {
    await hashPassword(password) // burn time, discard result
    throw unauthorized('Invalid email or password')
  }

  const valid = await verifyPassword(password, org.password_hash)
  if (!valid) {
    throw unauthorized('Invalid email or password')
  }

  if (org.totp_enabled) {
    if (!totpCode) {
      return { requiresTotp: true as const }
    }
    if (!org.totp_secret || !verifyTotp(org.totp_secret, totpCode)) {
      throw unauthorized('Invalid TOTP code')
    }
  }

  return { organizationId: org.id, email: org.email, name: org.name }
}

export async function enableTotp(
  organizationId: string,
  totpCode: string,
  secret: string,
): Promise<void> {
  if (!verifyTotp(secret, totpCode)) {
    throw unauthorized('Invalid TOTP code — please try again')
  }

  const sql = getSql()
  await sql`
    UPDATE organizations
    SET totp_secret = ${secret},
        totp_enabled = true,
        updated_at = now()
    WHERE id = ${organizationId}
  `
}

export async function getOrg(organizationId: string): Promise<{
  id: string
  email: string
  name: string
  subscriptionTier: string
  trialEndsAt: string
}> {
  const sql = getSql()

  const rows = await sql<OrgRow[]>`
    SELECT id, email, name, subscription_tier, trial_ends_at
    FROM organizations
    WHERE id = ${organizationId}
    LIMIT 1
  `
  const org = rows[0]
  if (!org) throw notFound('Organization')

  return {
    id: org.id,
    email: org.email,
    name: org.name,
    subscriptionTier: org.subscription_tier,
    trialEndsAt: org.trial_ends_at.toISOString(),
  }
}
