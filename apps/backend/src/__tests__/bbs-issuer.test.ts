/**
 * BBS+ issuer helper tests.
 *
 * The default test environment has no BBS_ISSUER_PRIVATE_KEY, so the helper
 * throws BbsUnsupportedError. Where we exercise the happy path, we override
 * the env var via `vi.stubEnv` and reset the cached issuer key before each
 * test.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  BbsUnsupportedError,
  buildHeader,
  buildKycMessageVector,
  signBbsKycCredential,
  _resetIssuerKeyForTests,
} from '../lib/bbs-issuer.js'

const FIXED_SK_HEX = '363ef9668e4e1cf86b5f2092c51f7c056d6841cec69920cc5d887f68c6cab6d1'

beforeEach(() => {
  _resetIssuerKeyForTests()
})

afterEach(() => {
  vi.unstubAllEnvs()
  _resetIssuerKeyForTests()
})

describe('buildKycMessageVector', () => {
  it('produces an 8-element vector in canonical order', () => {
    const v = buildKycMessageVector({
      subjectDid: 'did:solidus:testnet:alice',
      verificationId: 'verif-123',
      verifiedAt: '2026-05-09T00:00:00Z',
      kycLevel: 2,
      issuerDid: 'did:solidus:testnet:issuer',
      country: 'GB',
      documentType: 'passport',
      documentHash: 'aabbccdd',
    })
    expect(v.length).toBe(8)
    expect(new TextDecoder().decode(v[0])).toBe('did:solidus:testnet:alice')
    expect(new TextDecoder().decode(v[1])).toBe('did:solidus:testnet:issuer')
    expect(new TextDecoder().decode(v[2])).toBe('verif-123')
    expect(new TextDecoder().decode(v[3])).toBe('2026-05-09T00:00:00Z')
    expect(new TextDecoder().decode(v[4])).toBe('2')
    expect(new TextDecoder().decode(v[5])).toBe('GB')
    expect(new TextDecoder().decode(v[6])).toBe('passport')
    expect(new TextDecoder().decode(v[7])).toBe('aabbccdd')
  })

  it('uses empty strings for unset optional fields', () => {
    const v = buildKycMessageVector({
      subjectDid: 'did:solidus:testnet:alice',
      verificationId: 'verif-123',
      verifiedAt: '2026-05-09T00:00:00Z',
      kycLevel: 1,
      issuerDid: 'did:solidus:testnet:issuer',
    })
    expect(v.length).toBe(8)
    expect(new TextDecoder().decode(v[5])).toBe('')
    expect(new TextDecoder().decode(v[6])).toBe('')
    expect(new TextDecoder().decode(v[7])).toBe('')
  })
})

describe('buildHeader', () => {
  it('binds issuer DID and verification ID', () => {
    const h = buildHeader('verif-123', 'did:solidus:testnet:issuer')
    expect(new TextDecoder().decode(h)).toBe(
      'solidus-bbs-credential:did:solidus:testnet:issuer:verif-123',
    )
  })
})

describe('signBbsKycCredential', () => {
  it('throws BbsUnsupportedError when BBS_ISSUER_PRIVATE_KEY is unset', async () => {
    // The default test env has no BBS_ISSUER_PRIVATE_KEY.
    await expect(
      signBbsKycCredential({
        subjectDid: 'did:solidus:testnet:alice',
        verificationId: 'verif-123',
        verifiedAt: '2026-05-09T00:00:00Z',
        kycLevel: 2,
        issuerDid: 'did:solidus:testnet:issuer',
      }),
    ).rejects.toThrow(BbsUnsupportedError)
  })

  it('produces a self-consistent BBS bundle when the issuer key is set', async () => {
    vi.stubEnv('BBS_ISSUER_PRIVATE_KEY', FIXED_SK_HEX)
    _resetIssuerKeyForTests()

    // Re-import after stubEnv so the config + issuer key pick up the new env.
    vi.resetModules()
    const { signBbsKycCredential: sign } = await import('../lib/bbs-issuer.js')
    const { BbsPublicKey, BbsSignature } = await import('@solidus/bbs')

    const bundle = await sign({
      subjectDid: 'did:solidus:testnet:alice',
      verificationId: 'verif-bbs-test',
      verifiedAt: '2026-05-09T12:00:00Z',
      kycLevel: 2,
      issuerDid: 'did:solidus:testnet:issuer',
      country: 'GB',
      documentType: 'passport',
      documentHash: 'deadbeef',
    })

    expect(bundle.bbsPubkeyHex).toMatch(/^[0-9a-f]{192}$/)
    expect(bundle.bbsSignatureHex).toMatch(/^[0-9a-f]{160}$/)
    expect(bundle.bbsMessageCount).toBe(8)
    expect(bundle.headerHex.length).toBeGreaterThan(0)
    expect(bundle.messagesHex.length).toBe(8)
    expect(bundle.payloadHash.length).toBe(32)

    // Round-trip: the signature should verify with the same pk + header + messages.
    const pk = BbsPublicKey.fromHex(bundle.bbsPubkeyHex)
    const sig = BbsSignature.fromHex(bundle.bbsSignatureHex)
    const header = new Uint8Array(Buffer.from(bundle.headerHex, 'hex'))
    const messages = bundle.messagesHex.map(
      (h) => new Uint8Array(Buffer.from(h, 'hex')),
    )
    const valid = await sig.verify(pk, header, messages)
    expect(valid).toBe(true)
  })

  it('produces deterministic outputs for the same inputs (same SK, same fields)', async () => {
    vi.stubEnv('BBS_ISSUER_PRIVATE_KEY', FIXED_SK_HEX)
    _resetIssuerKeyForTests()

    vi.resetModules()
    const { signBbsKycCredential: sign } = await import('../lib/bbs-issuer.js')

    const fields = {
      subjectDid: 'did:solidus:testnet:alice',
      verificationId: 'verif-deterministic',
      verifiedAt: '2026-05-09T12:00:00Z',
      kycLevel: 2,
      issuerDid: 'did:solidus:testnet:issuer',
    }
    const a = await sign(fields)
    const b = await sign(fields)
    // Same SK + same messages + same header → same signature (BBS sign is
    // deterministic in zkryptium; verify the wrapped JS lib agrees).
    expect(a.bbsPubkeyHex).toBe(b.bbsPubkeyHex)
    expect(a.bbsSignatureHex).toBe(b.bbsSignatureHex)
  })
})
