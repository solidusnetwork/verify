# Verify — Competitors

## Competitive Landscape Overview

The KYC / identity verification market is dominated by SaaS vendors who charge enterprises tens of thousands of dollars per year to access verification pipelines they neither own nor control. The market is approximately $15–20B annually and growing as regulated industries — crypto exchanges, fintech, DeFi protocols — face mandatory KYC obligations under AML/KYC law in virtually every jurisdiction. Every competitor in this space is a centralized intermediary: they hold the data, set the price, and own the customer relationship.

Solidus Verify enters this market with a structurally different model. It is not another KYC SaaS vendor. It is a credential issuance protocol that uses third-party verification oracles (Sumsub, Jumio, Onfido, Persona) for the biometric/document check, then issues on-chain Verifiable Credentials that are portable across every platform in the Solidus ecosystem. The unit economics are ~95% cheaper than incumbents because validators — not a SaaS company with a sales team and shareholder margins — process the attestations.

---

## Competitors

### Auth0 (Okta)
**Website:** auth0.com
**Type:** Indirect — Auth0 is an authentication platform, not a KYC vendor. Overlaps where enterprises seek a single vendor for both auth and identity verification.
**Founded:** 2013 (acquired by Okta for $6.5B in 2021)
**Funding / Scale:** Part of Okta ($2.3B annual revenue FY2024, 18,000+ customers)

#### What They Do
Auth0 provides authentication-as-a-service: login flows, OAuth/OIDC, MFA, user management, and rules/actions for post-authentication logic. It is the dominant "drop-in auth" vendor for web and mobile applications. Auth0 does not perform KYC verification itself, but it is the system-of-record for user identity in most enterprises — meaning any KYC layer must integrate alongside it.

#### Pricing
Subscription-based. Developer tier free up to 7,500 MAU. B2C plans from $35/month. B2B/enterprise pricing starts at approximately $800/month and scales with MAU. At 1M monthly active users, cost is approximately $23,000/year for the authentication layer alone. KYC verification would be an additional vendor cost on top.

#### Strengths
- Market-leading developer experience; SDKs for every language and framework
- Deep enterprise penetration; security-vetted by Fortune 500 procurement teams
- Extensive rules/actions engine for post-authentication customization
- Okta corporate umbrella provides enterprise SLA, compliance certifications (SOC 2, ISO 27001, FedRAMP)
- Universal Login handles OAuth, OIDC, SAML, and social logins in one flow

#### Weaknesses
- Authentication only — no native KYC/document verification capability; customers must stitch together Auth0 + a separate KYC vendor
- Centralized data model: Auth0 is the single point of failure for every application it powers
- Vendor lock-in through proprietary rules engine, Actions, and directory schema
- No concept of portable identity: credentials issued under Auth0 are confined to Auth0's tenant model
- Pricing scales to enterprise levels that are structurally unaffordable for crypto-native startups and small DeFi protocols

#### How Solidus Differs
- Solidus Verify replaces both Auth0 and a KYC vendor in a single integration — credential issuance covers both authentication and compliance
- On-chain attestation: verification result is an immutable, publicly verifiable record, not a row in Auth0's database
- Cost: ~$1,000/year vs. $23,000/year at scale
- Portable credentials: a Solidus-verified user does not reverify on every platform — verify once, present everywhere
- Open protocol: no vendor lock-in, no proprietary rules engine, no tenant dependency

---

### Okta
**Website:** okta.com
**Type:** Indirect — enterprise workforce identity platform; competes for the same "identity infrastructure" budget
**Founded:** 2009
**Funding / Scale:** Public company (NASDAQ: OKTA); $2.3B revenue FY2024; 18,800+ customers; 73–75% gross margins

#### What They Do
Okta provides enterprise workforce and customer identity: SSO, MFA, lifecycle management (provisioning/deprovisioning), and API access management. Okta Workforce Identity secures employee logins; Okta Customer Identity (CIAM) secures consumer applications. Okta acquired Auth0 specifically to cover the developer/consumer identity segment. Okta does not perform document KYC but is the budget owner enterprises look to for "identity."

#### Pricing
Per-user-per-month subscription. Workforce Identity: $2–15/user/month. CIAM: starts at $0.013/MAU but enterprise contracts run $30,000+/year for 1M active users. All pricing requires sales contact; no self-serve for enterprise tiers.

#### Strengths
- Dominant in enterprise workforce identity; deep Active Directory and LDAP integration
- Extensive compliance certifications: FedRAMP High, HIPAA, PCI-DSS, SOC 2 Type II, ISO 27001
- Universal Directory as a central user store used by thousands of integrations (7,000+ app catalog)
- Investor credibility signal: public company with clean financials

#### Weaknesses
- Extremely expensive; cost structure reflects enterprise SaaS margins, not infrastructure economics
- Complex implementation; typical Okta deployment takes 3–6 months with professional services
- Centralized single point of failure — Okta outages (notably the 2022–2023 breaches) expose all connected systems
- No concept of user-controlled identity; the enterprise controls all identity data, not the individual
- No KYC — still requires a separate verification vendor

#### How Solidus Differs
- Solidus operates at ~95% lower cost through decentralized validator economics
- User-controlled credentials: the individual owns their verification, not the employer or SaaS vendor
- Breach-resistant by design: no centralized user database to compromise
- Purpose-built for crypto/DeFi compliance use cases that Okta's enterprise model cannot address

---

### Sumsub
**Website:** sumsub.com
**Type:** Direct — KYC/KYB verification platform with workflow builder and compliance suite
**Founded:** 2015
**Funding / Scale:** $6M seed (2019), $20M Series A (2021); estimated $50M+ ARR based on disclosed growth

#### What They Do
Sumsub is an end-to-end compliance platform: document verification, liveness checks, KYB (business verification), AML transaction monitoring, sanctions/PEP screening, and a no-code workflow builder. Their "Reusable KYC" product (sumsub.com/reusable-kyc) and "Sumsub ID" consumer app are the closest existing product to Solidus's verify-once model. They serve 2,000+ clients across fintech, crypto, gaming, and marketplaces.

#### Pricing
Volume-based tiers; pricing is not fully public. Estimated $0.50–3.00 per verification depending on check type and volume. Enterprise contracts with annual minimums. No meaningful free tier. Custom pricing for high-volume enterprise.

#### Strengths
- Comprehensive product surface: KYC + KYB + AML + transaction monitoring in one platform
- 11,000+ supported document types across 220+ countries
- No-code workflow builder allows compliance teams to configure verification flows without engineering
- Strong crypto/DeFi client base; understands the regulatory landscape for Web3 companies
- Reusable KYC concept validates the verify-once market
- SOC 2 Type II certified; GDPR compliant

#### Weaknesses
- Centralized: all verification data lives on Sumsub's servers; customers cannot self-host
- Reusable KYC is siloed within the Sumsub ecosystem — portability is limited to platforms that also integrate Sumsub
- Pricing is opaque and scales steeply; no self-serve for startups
- No on-chain attestation: verification records are database entries, not cryptographically verifiable
- Vendor lock-in: switching away from Sumsub means re-verifying all users from scratch
- No user-controlled privacy: users cannot control which attributes are disclosed in each verification

#### How Solidus Differs
- True portability: Solidus credentials work across any integrating platform, not just Sumsub clients
- On-chain attestation: verification record is cryptographically immutable and independently verifiable
- User-controlled disclosure: BBS+ ZK proofs let users share only what is required for each context
- Open protocol: any verification oracle can issue Solidus credentials; no single-vendor dependency
- Cost structure: validator economics vs. SaaS margins

---

### Jumio
**Website:** jumio.com
**Type:** Direct — AI-powered identity verification for regulated industries
**Founded:** 2010
**Funding / Scale:** $150M+ raised; acquired by Centana Growth Partners 2016, then Francisco Partners 2021; $100M+ estimated ARR

#### What They Do
Jumio provides AI-powered document verification and biometric liveness detection for regulated industries: banking, insurance, crypto, healthcare. Their Jumio KYX Platform bundles identity verification, biometric authentication, and risk signals into a compliance workflow. They focus on enterprise contracts with banks and financial institutions, claiming 500+ clients including major European banks.

#### Pricing
Enterprise-only; no public pricing. Per-verification pricing in enterprise contracts, typically $1.50–5.00/verification at scale. Annual minimums common. No developer self-serve.

#### Strengths
- Deep enterprise trust; used by major banks and financial institutions with strict vendor requirements
- Strong regulatory compliance coverage: ISO/IEC 27001, SOC 2 Type II, GDPR, CCPA, PCI-DSS
- AI accuracy claims: published accuracy rates for document verification and liveness
- Global coverage: 200+ countries and territories, 5,000+ document types
- Biometric re-authentication product allows ongoing step-up authentication post-onboarding

#### Weaknesses
- Enterprise-only pricing creates an impenetrable barrier for startups and SMBs
- Fully centralized: data stored in Jumio's infrastructure with limited customer control
- No reusable credential concept: every platform must verify independently
- No blockchain or on-chain record
- Slow integration cycle typical of enterprise vendors; no self-service onboarding
- Closed ecosystem: Jumio results cannot be portably referenced by third parties

#### How Solidus Differs
- Accessible to all: verification fees at protocol cost, not enterprise SaaS margins
- Credential portability: a Jumio-equivalent verification issued as a Solidus VC can be presented to any relying party without re-verification
- On-chain record: tamper-evident attestation vs. a database row
- Self-service: developers can integrate the Solidus SDK in hours, not weeks

---

### Onfido
**Website:** onfido.com
**Type:** Direct — document + biometric verification with no-code orchestration
**Founded:** 2012
**Funding / Scale:** $200M+ raised; acquired by Entrust in 2024 for undisclosed sum (estimated $400M+)

#### What They Do
Onfido provides AI-driven document verification and facial biometrics via their Onfido Studio (visual no-code workflow builder) and SDK. They serve fintech, banking, insurance, gaming, and telecoms. Their passive liveness product (one-photo liveness, no video required) is a headline differentiator. The Entrust acquisition integrates Onfido into a broader digital identity and certificate management ecosystem.

#### Pricing
Contact-gated; no public pricing. Estimated $1.50–3.50/verification for enterprise tiers. Subscription + overage model. Minimum annual contract values apply.

#### Strengths
- Onfido Studio (no-code workflow builder) is a genuine product advantage for non-technical compliance teams
- Passive liveness detection is technically differentiated — reduces user friction
- "Fair AI" bias audits published — important for regulated clients in jurisdictions with AI fairness requirements
- Strong brand in European fintech
- Now part of Entrust: access to enterprise digital certificate and PKI infrastructure

#### Weaknesses
- Fully centralized; no self-sovereign or portable credential model
- No public pricing; creates friction for developer adoption
- Entrust acquisition adds enterprise focus that may reduce innovation velocity
- No on-chain integration; verification results are siloed in Onfido's platform
- No reusable credential — each relying party must perform its own verification

#### How Solidus Differs
- Decentralized architecture eliminates the single-point-of-failure and data concentration risk
- Verification results issued as portable Verifiable Credentials under W3C DID standards
- Public pricing: transparent per-verification fee model
- On-chain attestation: independently auditable by any party

---

### Persona
**Website:** persona.com
**Type:** Direct — self-serve KYC and identity verification with developer-first positioning
**Founded:** 2018
**Funding / Scale:** $225M raised (Series C 2022, $50M); valued at $1.5B+

#### What They Do
Persona is a self-serve identity verification platform targeting developer teams and mid-market companies. Their free starter tier (500 verifications/month) is the lowest entry barrier in the KYC market. They offer document verification, selfie/liveness, database checks (SSN trace), watchlist screening, KYB, case management, and a no-code "Inquiry Templates" builder. Persona positions itself as the "Stripe of identity verification" — API-first, easy to integrate, developer-loved.

#### Pricing
Free tier: 500 verifications/month (full product, no credit card). Growth tier: usage-based, approximately $1.50–2.50/verification after free tier. Enterprise tier: custom pricing. This is the most transparent pricing model among KYC SaaS vendors.

#### Strengths
- Best developer experience in the KYC category: inline docs, free tier, fast API, open changelog
- No-code workflow builder (Inquiry Templates) is polished and genuinely useful for compliance teams
- PII Vault for encrypted document storage is a product differentiator for privacy-conscious clients
- Free tier enables full evaluation without sales contact — removes the #1 friction point for developer adoption
- Transparent per-verification pricing with public rate card

#### Weaknesses
- Fully centralized; Persona holds all verification data
- No portable credentials: verified on Persona = verified on Persona only; no cross-platform portability
- No on-chain attestation; immutability of records is Persona's database guarantee, not cryptographic
- Free tier is a loss-leader strategy — pricing scales steeply for high-volume use cases
- No user-controlled privacy: organizations control all disclosure, users have no ZK selective disclosure

#### How Solidus Differs
- Credentials are portable across the entire Solidus ecosystem and any W3C VC-compatible platform
- User controls disclosure via BBS+ ZK selective disclosure — a capability Persona has no equivalent for
- On-chain attestation: verification record is tamper-evident on the Solidus blockchain
- No centralized PII storage at the protocol level: biometric data stays with verification oracles, not Solidus

---

### Stripe Identity
**Website:** stripe.com/identity
**Type:** Direct — developer-friendly identity verification embedded in Stripe's payment platform
**Founded:** Part of Stripe (founded 2010); Identity product launched ~2021
**Funding / Scale:** Stripe is valued at $65B+ (2024 secondary); Identity is a product line within a payments company

#### What They Do
Stripe Identity provides document verification ($1.50/successful verification) embedded in the Stripe Dashboard. It supports three check types — document (ID scan), id_number (SSN/tax ID lookup), and selfie (liveness) — composable as needed. It is API-first, extremely simple to integrate (under 20 lines of code), and designed for automated pass/fail decisions without case management or analyst workflow.

#### Pricing
$1.50 per successful verification. Flat, public, simple. No free tier for production (sandbox only). No volume discounts publicly listed.

#### Strengths
- Simplest pricing in the market: $1.50 flat, publicly listed
- Zero switching cost for existing Stripe customers: Identity is inside the Stripe Dashboard they already use
- API philosophy: minimal surface, composable check types, Stripe-quality developer experience
- Customer attachment: verification session can be linked to a Stripe Customer ID, giving a unified payment + identity audit trail
- GDPR-safe by default: document images deleted after extraction; only fields retained

#### Weaknesses
- Only useful for Stripe payments customers; no standalone product for non-payment use cases
- No case management; no manual review queue; no workflow builder
- No concept of reusable credentials — every platform using Stripe Identity must run its own verification
- Extremely limited coverage compared to dedicated KYC vendors (fewer document types, fewer countries)
- No AML/sanctions screening, no KYB, no watchlist monitoring
- No on-chain record; verification is a Stripe API call, not a verifiable attestation

#### How Solidus Differs
- Platform-agnostic: not tied to Stripe's payment infrastructure
- Reusable credentials: verify once on any platform, present to all
- Full compliance suite: watchlist screening, VC revocation, ZK selective disclosure
- On-chain attestation provides audit trail that survives vendor relationship

---

### Polygon ID
**Website:** polygon.technology/polygon-id
**Type:** Direct — ZK-based verifiable credential system on Polygon (Ethereum L2)
**Founded:** Part of Polygon Labs (founded 2017); Polygon ID released 2022
**Funding / Scale:** Polygon Labs raised $450M (2022); Polygon ID is a product within the Polygon ecosystem

#### What They Do
Polygon ID is an open-source ZK identity framework built on Polygon PoS and zkEVM. Issuers deploy issuer nodes to publish verifiable credentials (W3C VC format using the iden3 protocol and Circom ZK circuits). Holders receive credentials in the Polygon ID mobile wallet. Verifiers specify ZK queries ("age > 21") and receive proofs without raw attribute values. The system is designed for the Web3 developer ecosystem with heavy focus on DeFi and DAO access control.

#### Pricing
No direct pricing (open-source protocol). Gas fees on Polygon: approximately $0.01–0.05 per on-chain operation. Issuers bear infrastructure costs for running issuer nodes. No fee to receive or present credentials.

#### Strengths
- ZK-native from the ground up: Circom-based proof generation is production-ready
- W3C Verifiable Credential compliant: interoperable with broader SSI ecosystem
- On-chain revocation via Merkle tree smart contracts
- Strong developer mindshare within Ethereum/Polygon ecosystem
- Open-source: no vendor dependency

#### Weaknesses
- Application-layer system: not identity-native at the blockchain protocol level; identity operations are smart contract calls, not protocol primitives
- No KYC compliance out of the box: Polygon ID is a credential framework, not a KYC product; issuers must source their own verification
- Mobile-only holder wallet: no browser or desktop experience for end users
- High issuer setup friction: organizations must run or pay for an issuer node
- Tightly coupled to Ethereum/Polygon ecosystem; limited cross-chain portability
- No consumer-facing credential discovery or marketplace
- No economic model for identity validators (Polygon gas goes to validators who process all Polygon transactions, not specifically identity work)

#### How Solidus Differs
- Identity-native blockchain: DIDs are protocol-level primitives, not contract storage; verification is a precompile, not a contract call
- KYC-first: Solidus Verify combines the verification oracle and credential issuance in one product
- Full consumer UX: browser dashboard, mobile wallet, credential marketplace
- Dedicated validator economics: staking and fees specifically for identity work, not shared with DeFi and gaming
- Broader product: Verify + Identity + Wallet + Protocol in one ecosystem vs. a credential framework

---

## Competitive Positioning Matrix

| Dimension | Auth0/Okta | Sumsub | Persona | Stripe Identity | Polygon ID | Solidus Verify |
|-----------|-----------|--------|---------|-----------------|-----------|----------------|
| KYC / document verification | No (auth only) | Yes | Yes | Yes (limited) | Via partners | Yes |
| Reusable / portable credential | No | Partial (Sumsub ecosystem) | No | No | Yes (within Polygon) | Yes (cross-platform) |
| On-chain attestation | No | No | No | No | Yes (Polygon) | Yes (Solidus chain) |
| ZK selective disclosure | No | No | No | No | Yes (iden3) | Yes (BBS+) |
| Self-sovereign (user-controlled) | No | No | No | No | Partial | Yes |
| Price at 1M verifications | ~$23K/yr (auth) | ~$500K+ | ~$150K | ~$1.5M | ~$1K gas | ~$1K |
| Developer self-serve | Yes | Partial | Yes | Yes | Yes | Yes |
| No-code workflow builder | Partial (Actions) | Yes | Yes | No | No | Yes |
| AML / sanctions screening | No | Yes | Yes | No | No | Via oracle network |
| Open protocol | No | No | No | No | Yes (partially) | Yes |
| W3C DID / VC compliant | No | No | No | No | Yes | Yes |

---

## Solidus Differentiation Summary

Solidus Verify competes across two distinct layers simultaneously. Against the Web2 KYC vendors (Sumsub, Jumio, Onfido, Persona), the primary differentiator is portability plus cost: a user verified once through Solidus holds a credential that is valid across the entire Solidus ecosystem without re-verification, and the underlying economics are ~95% cheaper because validator fees replace SaaS margins. Against the Web3 identity projects (Polygon ID), the primary differentiator is that Solidus is KYC-first and compliance-ready — it is not a credential framework that customers must configure into a KYC product, it is a complete KYC product that happens to issue credentials on a decentralized protocol.

The three angles that define Solidus's position: (1) verify once, use everywhere — true cross-platform portability that no centralized vendor can offer because they have no incentive to let users leave their platform; (2) structural cost advantage — ~$1,000/year vs. $23,000/year because the protocol's economics are fundamentally different from a SaaS company's; (3) user-sovereign disclosure — BBS+ ZK proofs let users prove compliance attributes without revealing raw personal data, a capability that does not exist in any centralized KYC vendor's product.

---

## Risks / Watch Out For

- Sumsub's Reusable KYC product is a direct strategic threat; if Sumsub builds cross-platform portability through industry partnerships, they could neutralize Solidus's main differentiator before launch
- Persona's free tier creates high developer switching costs once integrated — Solidus needs a competitive self-serve entry point
- Stripe Identity's $1.50 flat pricing anchors developer expectations on price; Solidus must meet or beat this for single-verification use cases
- Polygon ID's open-source positioning creates a "why pay Solidus when Polygon ID is free" objection; the answer is KYC compliance-out-of-the-box vs. build-it-yourself
- Auth0/Okta could acquire a KYC vendor and bundle KYC into their platform, eliminating the integration gap Solidus exploits
- Regulatory requirements for KYC data residency (EU data localization, India DPDP) may constrain how Solidus structures its oracle network in specific markets
- eIDAS 2.0 government digital ID wallets (EU mandate, live 2026) could reduce demand for third-party KYC if government IDs become broadly accepted
