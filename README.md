<p align="center">
  <img src="https://raw.githubusercontent.com/solidusnetwork/.github/main/profile/solidus_icon.png" alt="Solidus Network" height="80" />
</p>

# Solidus Verify

Decentralized KYC verification service. Verify once, use everywhere.

- **Live:** <https://verify.solidus.network>
- **Status:** Live on testnet — issuing real KYC credentials backed by BBS+ selective disclosure
- **Docs:** <https://docs.solidus.network/sdk/solidus-sdk>

## What it does

KYC-as-a-Service for crypto exchanges, DeFi platforms, banks, and fintechs. Users complete
verification once through Solidus Verify and present cryptographic proof to any requesting
service — without resubmitting personal documents, and without the relying party seeing the
underlying PII.

The verified attributes are issued as W3C Verifiable Credentials and the holder presents
**selective disclosure proofs** (BBS+ or SD-JWT VC): e.g. "over 18", "country = US", "tier ≥ 2"
revealed without disclosing the underlying date of birth or address.

## Shipped features

- **Native KYC pipeline** — document OCR (passport / national ID / driver's licence),
  liveness + face match (face-api.js, on-device), address verification, sanction screening
- **BBS+ credential issuance end-to-end** — the issuer publishes a BBS+ public key on chain;
  the holder receives a multi-message credential and can derive zero-knowledge selective
  disclosure proofs locally
- **SD-JWT VC issuance** — EUDI Wallet-compatible reference libraries, includes KB-JWT,
  status-list-2021 revocation, nested-path disclosure
- **OID4VCI issuer endpoint** — pre-authorised code flow, holder proof JWT verified against
  embedded JWK, four endpoints under `/v1/oid4vci/*`
- **Public API** — REST + per-user API keys, webhooks for verification lifecycle events
- **Storage** — Cloudflare R2 for document blobs (encrypted at rest, holder-revocable)

## How it fits the network

```
┌───────────────────────────────┐
│ Solidus Verify                │  ← this repo (KYC issuer)
│   - Document OCR + face match │
│   - BBS+ + SD-JWT issuance    │
│   - R2 storage, OID4VCI       │
└──────────────┬────────────────┘
               │ issues
               ▼
       ┌───────────────┐
       │  did:solidus  │ ◄── Solidus Identity wallet
       │   + VC 2.0    │     (holder, presents proofs)
       └───────────────┘
               │ proves over18 / country / tier
               ▼
       Relying party (exchange, bank, dapp)
```

## Pricing model

- Per-verification fee — disposable single-use tier
- Enterprise subscription — bundled API quota + dedicated webhook channel + SLO
- Free for individuals via the Solidus Identity wallet

## Network

- **Live verifier:** <https://verify.solidus.network>
- **Testnet RPC:** <https://rpc.solidus.network>
- **Explorer:** <https://explorer.solidus.network>
- **Status:** <https://solidus.network>

## License

Apache-2.0.
