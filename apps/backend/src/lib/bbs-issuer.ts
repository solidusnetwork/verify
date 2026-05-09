/**
 * BBS+ credential issuance helper for verify-api.
 *
 * Produces a BBS+ signature over a canonical KYC message vector and submits
 * a `CredentialIssueBbs` transaction to the Solidus chain via the SDK. The
 * resulting record carries the issuer's BBS+ public key on-chain; the
 * signature and message vector live off-chain (returned to the caller for
 * wallet storage).
 *
 * Audit posture: testnet-grade. The issuer's BBS+ secret key is loaded
 * from `BBS_ISSUER_PRIVATE_KEY` env var. Production deployments should
 * move this to encrypted-at-rest per-org storage in `kyc_issuers` (out of
 * scope for this iteration).
 */
import { BbsSecretKey, BBS_MAX_MESSAGE_COUNT, utf8 } from '@solidus/bbs'
import { blake3 } from '@noble/hashes/blake3'
import { config } from '../config.js'

export class BbsUnsupportedError extends Error {
  constructor() {
    super('BBS+ issuance requires BBS_ISSUER_PRIVATE_KEY env var to be set')
    this.name = 'BbsUnsupportedError'
  }
}

/**
 * The fields a Solidus KYC credential signs in BBS+ form. Order is
 * canonical and stable — verifiers reconstruct the message vector
 * positionally.
 */
export interface KycMessageFields {
  /** Subject DID (e.g., `did:solidus:testnet:alice`) */
  subjectDid: string
  /** Verification ID (UUID) — provides uniqueness across credentials */
  verificationId: string
  /** Verification timestamp (RFC 3339) */
  verifiedAt: string
  /** KYC level (1 / 2 / 3) */
  kycLevel: number
  /** Optional: ISO 3166-1 alpha-2 country code (only when collected) */
  country?: string | undefined
  /** Optional: document type (passport / driving_license / national_id / residence_permit) */
  documentType?: string | undefined
  /** Optional: document hash (BLAKE3 of the verified document, hex) */
  documentHash?: string | undefined
  /** Optional: issuer DID (defaults to config.ISSUER_DID) */
  issuerDid?: string | undefined
}

/**
 * Build the canonical 8-message KYC vector. Empty strings are used as
 * fillers when a field is not collected at this KYC level — the position
 * is still meaningful so verifiers can selectively disclose by index.
 *
 * Order (do NOT change without bumping a credential version field):
 * 0. subject_did
 * 1. issuer_did
 * 2. verification_id
 * 3. verified_at
 * 4. kyc_level
 * 5. country
 * 6. document_type
 * 7. document_hash
 */
export function buildKycMessageVector(fields: KycMessageFields): Uint8Array[] {
  const issuerDid = fields.issuerDid ?? config.ISSUER_DID
  const v = [
    utf8(fields.subjectDid),
    utf8(issuerDid),
    utf8(fields.verificationId),
    utf8(fields.verifiedAt),
    utf8(String(fields.kycLevel)),
    utf8(fields.country ?? ''),
    utf8(fields.documentType ?? ''),
    utf8(fields.documentHash ?? ''),
  ]
  if (v.length > BBS_MAX_MESSAGE_COUNT) {
    throw new Error(`KYC message vector too long: ${v.length} > ${BBS_MAX_MESSAGE_COUNT}`)
  }
  return v
}

/**
 * BBS+ header tying the credential to the issuer DID and the
 * verification ID. Verifiers must reconstruct this exact byte sequence.
 */
export function buildHeader(verificationId: string, issuerDid?: string): Uint8Array {
  const did = issuerDid ?? config.ISSUER_DID
  return utf8(`solidus-bbs-credential:${did}:${verificationId}`)
}

/**
 * Lazy-loaded BBS issuer key. Returns null when the env var is unset.
 */
let _issuerSk: BbsSecretKey | null | undefined
async function loadIssuerKey(): Promise<BbsSecretKey | null> {
  if (_issuerSk !== undefined) return _issuerSk
  const hex = config.BBS_ISSUER_PRIVATE_KEY
  if (!hex) {
    _issuerSk = null
    return null
  }
  _issuerSk = BbsSecretKey.fromHex(hex)
  return _issuerSk
}

/**
 * Reset the cached issuer key. For tests only.
 */
export function _resetIssuerKeyForTests(): void {
  _issuerSk = undefined
}

export interface BbsCredentialBundle {
  /** 96-byte BBS+ public key (hex). Pinned on-chain when the credential is issued. */
  bbsPubkeyHex: string
  /** 80-byte BBS+ signature (hex). Stored by the wallet, never on-chain. */
  bbsSignatureHex: string
  /** Number of messages signed. */
  bbsMessageCount: number
  /** Header bytes (hex) used at signing time — verifiers need this. */
  headerHex: string
  /**
   * The canonical message vector that was signed (hex per element).
   * The wallet stores these; selective-disclosure proofs reveal a subset.
   */
  messagesHex: string[]
  /** BLAKE3 hash of a JSON-encoded `fields` view of the credential payload. */
  payloadHash: Uint8Array
}

/**
 * Sign a KYC credential with the issuer's BBS+ key.
 *
 * Throws `BbsUnsupportedError` if `BBS_ISSUER_PRIVATE_KEY` is not configured.
 */
export async function signBbsKycCredential(
  fields: KycMessageFields,
): Promise<BbsCredentialBundle> {
  const sk = await loadIssuerKey()
  if (!sk) throw new BbsUnsupportedError()
  const pk = await sk.publicKey()
  const messages = buildKycMessageVector(fields)
  const header = buildHeader(fields.verificationId, fields.issuerDid)
  const sig = await sk.sign(header, messages)

  // BLAKE3(header || sig.bytes) — used as the on-chain `hash` field. The chain
  // commits to this opaque hash; the actual signature/messages stay off-chain.
  const payloadHash = blake3(concatBytes(header, sig.toBytes()))

  return {
    bbsPubkeyHex: pk.toHex(),
    bbsSignatureHex: sig.toHex(),
    bbsMessageCount: messages.length,
    headerHex: bytesToHex(header),
    messagesHex: messages.map(bytesToHex),
    payloadHash,
  }
}

// ---------- byte utilities ----------

function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const a of arrays) {
    out.set(a, offset)
    offset += a.length
  }
  return out
}

function bytesToHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('hex')
}
