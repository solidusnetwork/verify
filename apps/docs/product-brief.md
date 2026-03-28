# Verify — Product Brief

## Overview

Solidus Verify (verify.solidus.network) is a B2B KYC verification service and the first revenue-generating product in the Solidus Network ecosystem. It provides a single REST API for email verification, phone verification, and full identity verification (KYC Level 1–3), then issues W3C Verifiable Credentials anchored to the Solidus blockchain. The credential is stored in the user's DID wallet — not on the operator's server — enabling reuse across any Solidus-integrated service at a cost of $0.05 instead of $5–20.

## Target Users

**Primary — Compliance Officers:** Responsible for meeting KYC/AML requirements at crypto exchanges, DeFi protocols, and fintech platforms. They need verifiable audit trails, regulatory certification alignment (GDPR, MiCA, FATF Travel Rule), and a dashboard for managing verification queues and exception handling.

**Secondary — Backend Developers:** Integrating KYC into an existing product. They need a clean REST API, SDKs for JavaScript/Python/Go, sandbox mode, webhook events, and documentation that gets them to a working integration the same day.

**Tertiary — Operations Teams:** Running day-to-day verification queues. They need real-time status views, bulk export, manual review workflows, and alert thresholds for failure rate anomalies.

**End Users (indirect):** The individuals being verified. They interact with the hosted liveness flow at `verify.solidus.network/s/{session_id}`. Their biometric data is never persisted anywhere.

## Core Value Proposition

1. **Verify once, use everywhere.** A credential issued by Solidus Verify travels with the user's DID. Any Solidus-integrated service can verify it instantly — re-verification costs $0.05, not $5–20.
2. **No biometric storage.** Liveness images are processed in-memory and discarded immediately. No facial template is ever written to disk. This eliminates BIPA liability and simplifies GDPR compliance.
3. **On-chain audit trail.** Every credential issuance, revocation, and presentation is anchored to the Solidus blockchain — tamper-evident, signed by validators, auditable without trusting Solidus itself.
4. **95% cheaper than Auth0.** At $0.10–$20.00 per verification vs Auth0's ~$23,000/year per million operations, Solidus changes the unit economics of identity verification for any product with meaningful user volume.
5. **Regulatory alignment from day one.** GDPR-ready architecture, MiCA/FATF credential model, BIPA consent flow, and eIDAS 2-compatible W3C VC format — these are architectural properties, not policy overlays.

## Key Metrics / Goals

| Metric | Target (Phase 1 Launch) | Notes |
|--------|------------------------|-------|
| Integration time (P50) | < 1 day | From API key to first successful verification |
| Verification completion rate | > 89% | Funnel: initiated → credential issued |
| Success rate | > 97% | Verified / (Verified + Failed) |
| Average verification time | < 2s (Email/Phone), < 5 min (KYC L2) | Latency of automated steps |
| Network finality | 1.4s | Solidus Protocol consensus |
| Network throughput | 2,000–10,000 TPS (initial). Target: 50,000+ TPS | Solidus Protocol capacity |
| Webhook delivery success | > 99.5% | Across all configured endpoints |
| Developer docs NPS | > 60 | Survey post-integration |

## Pricing Model

**Pay-as-you-go (default):**

| Verification Type | Price |
|-------------------|-------|
| Basic attestation (identity attribute query) | $0.10 |
| Email verification | $0.10 |
| Phone verification | $0.20 |
| KYC Level 1 (name, DOB, address — no document) | $1.00 |
| KYC Level 2 (government ID + liveness, credential on-chain) | $5.00 |
| KYC Level 3 (full background check + sanctions + PEP) | $20.00 |
| Credential issuance (standalone) | $0.01 |
| Credential re-presentation (cross-service reuse) | $0.05 |

**Subscription plans:**

| Plan | Monthly Price | Annual Price | Quota |
|------|--------------|--------------|-------|
| Startup | $99/month | $79/month | 10,000 queries/month |
| Growth | $499/month | $399/month | 100,000 queries/month |
| Enterprise | Custom | Custom | Unlimited |

All plans include 14-day free trial and first 1,000 verifications free. No credit card required.

**SOLID token stacking tiers** (fee discounts for SOLID holders):
- Tier 1: 10,000 SOLID stacked → 10% discount
- Tier 2: 100,000 SOLID stacked → 25% discount
- Tier 3: 1,000,000 SOLID stacked → 50% discount

**Competitive comparison:** Auth0 charges approximately $23,000/year per 1M operations. Solidus at $1,000/1M is 95% cheaper by design.

## Dependencies (other Solidus products)

| Dependency | Role | Phase |
|------------|------|-------|
| Solidus Protocol | DID resolution, VC issuance, validator consensus, on-chain anchoring | Phase 1 — must be live before Verify |
| Identity (identity.solidus.network) | User's DID wallet where credentials are stored; not required at launch but needed for full "verify once, use everywhere" UX | Phase 2 |
| Dev Portal (dev.solidus.network) | Extended developer documentation, SDK reference, changelog | Phase 2 |
| Explorer (explorer.solidus.network) | Block explorer links referenced in audit log and blockchain anchor UI | Phase 3 |
| Marketing (solidus.network) | Ecosystem portal; links to Verify as first product | Active |

Verify can launch with Protocol only. Identity and Dev Portal extend the experience in Phase 2.

## Development Status

**Phase 1 — current priority.** Verify is being built in parallel with the Solidus Protocol as the first revenue product. Key milestones:

- Figma Make prompts: complete (21 prompts, all screens defined)
- Prototype: defined in `prototype-web.md` (21 screens)
- Competitor research: complete (Sumsub, Onfido, Persona, Stripe Identity, Veriff)
- Backend: not yet started
- Frontend: not yet started
- API: not yet started
- Infrastructure: not yet started

See `.claude/PROGRESS_REPORT.md` for session-by-session work log.
