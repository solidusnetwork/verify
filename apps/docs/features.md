# Verify — Features

## P1: MVP Features (launch-blocking)

These features must be complete before any production traffic is accepted.

### Verification Types
- **Email verification** — confirm email ownership via one-click link; instant; includes bounce check
- **Phone verification** — SMS OTP with global carrier coverage; < 1 second
- **KYC Level 1** — name, DOB, address; database check; no document upload required; ~2 min
- **KYC Level 2** — government-issued ID (passport, driver's license, national ID) + liveness check; ~5 min; credential issued on-chain
- **KYC Level 3** — full background check + sanctions screening (OFAC/EU) + PEP screening; ~15 min

### Credential Issuance
- **W3C Verifiable Credential issuance** — issued to the subject's DID after successful KYC L1/L2/L3; W3C VC Data Model 2.0 compliant
- **On-chain credential anchoring** — credential hash anchored to Solidus blockchain; signed by validator consensus (21-validator committee); 1.4s finality
- **Credential revocation** — operator can revoke a credential instantly; revocation status anchored on-chain
- **Credential download** — operator can download the raw W3C VC JSON for a verified subject
- **Credential expiry** — configurable automatic expiry (default 365 days); expiry date embedded in VC

### Hosted Verification Flow (user-facing)
- **Document upload step** — passport / driver's license / national ID; JPG, PNG, PDF; max 10MB; quality check with inline feedback
- **Liveness camera step** — 8 states: idle, permission prompt, permission denied, calibrating, guiding, capturing, uploading, result (pass/fail)
- **Processing step** — live checklist (document → liveness → validator consensus → credential issued)
- **Success/failure result screen** — credential summary on success; reason + retry on failure
- **Mobile-responsive** — 375px mobile and 1440px desktop layouts

### Dashboard (authenticated)
- **Login** — email + password; SSO via Google; MFA via authenticator app (TOTP); recovery codes; forgot password flow
- **Dashboard overview** — KPI cards (verifications today, pending review, success rate, revenue); volume area chart; live activity stream; webhook delivery panel; recent verifications table
- **Sandbox/production environment toggle** — visible in sidebar; amber banner when in sandbox mode
- **Verifications list** — filterable by status, type, date range, country; searchable by DID/email/reference; sortable; pagination; bulk selection; export CSV
- **Verification detail** — subject DID, document details (masked), verification steps timeline, issued credential card, blockchain anchor record, event log; processing/failed states
- **New verification modal** — 3-step: select type → enter subject DID + metadata → confirm & launch; DID validation with debounce; QR scanner for DID input
- **Analytics** — KPI cards; verification funnel chart with drop-off analysis; volume over time (dual-line: total + successful); credential type breakdown (donut chart); cost savings vs Auth0; cohort quality table; compliance audit log
- **Credential management** — active/expiring/revoked credential stats; credential list with filter; credential detail slide-in panel; revoke with confirmation; expiry warning section with bulk re-verification nudge
- **API keys** — list keys (masked, toggleable); create new key (name, environment, permissions, expiry); post-creation one-time reveal; usage stats (verifications, API calls, webhook deliveries vs plan quota)
- **Webhooks** — endpoint list with health status; add/edit/delete endpoint; event subscription selection; HMAC-SHA256 secret; test endpoint delivery; delivery log with request/response accordion
- **Audit log** — full tamper-evident event log (verification events + admin actions); filterable; blockchain attestation for each row; export CSV/PDF; blockchain attestation banner
- **Team management** — member list with roles (Admin, Operator, Viewer); invite via email; role description cards; 2FA status per member; permissions matrix
- **Billing** — current plan card with usage meter; upgrade plan modal (dark-mode plan cards); payment method management; invoice history with download
- **Settings / Organization** — org name, logo, industry, country, website
- **Settings / Security** — 2FA management; active session list with revoke; SSO configuration
- **Settings / Notifications** — email notification toggles; alert thresholds (failure rate, queue depth); Slack and PagerDuty integration
- **Settings / Compliance** — required KYC level; AML screening toggle; data retention policy; automatic credential expiry; geographic restrictions; consent requirement toggle
- **Settings / Danger Zone** — export all data; delete organization with name-match confirmation

### API & Developer
- **REST API v2** — create session, get session, list sessions, cancel session; issue credential, verify credential, revoke credential; resolve DID, register DID
- **API authentication** — Bearer token (API key); sandbox vs production key environments
- **Webhook events** — kyc.completed, kyc.failed, kyc.pending, credential.issued, credential.revoked, session.created, session.expired, review.required, webhook.test
- **Webhook signature verification** — HMAC-SHA256 with configurable secret; documented in quickstart
- **Rate limiting** — 429 response with retry-after; usage warnings at 80% quota
- **Embedded API docs** — `/docs` route; 3-column layout (nav / content / code); language tabs (JS, Python, Go, cURL); version dropdown
- **Quickstart guide** — `/docs/quickstart`; 6-step guide with code snippets and inline API response previews; localStorage progress tracking

### Marketing / Public Pages
- **Homepage** (`/`) — hero, live stats strip, partner logos, how it works, feature grid, industry verticals, compliance badges, testimonials, pricing preview, developer quickstart, email signup CTA, footer
- **Pricing page** (`/pricing`) — pay-as-you-go table, subscription plan cards, feature comparison table, FAQ accordion, enterprise CTA
- **Security page** (`/security`) — architecture diagram, certifications grid, privacy principles, audit report downloads
- **Use cases page** (`/use-cases`) — industry tab layout (Crypto & DeFi, Fintech, Gaming, Healthcare, Marketplaces, Gig Economy, Real Estate, Government)
- **Enterprise page** (`/enterprise`) — volume pricing, white-label API, on-premise deployment, SLA, enterprise contact form

### Infrastructure
- **Sandbox mode** — all verification flows fully simulatable without real document processing; simulated webhook delivery
- **Error states** — rate limit banner; maintenance mode overlay; session expiration modal; 404 page; network error toast

## P2: v1.0 Features (first quarter post-launch)

These features ship after the initial production launch, based on early customer feedback.

- **No-code workflow builder** — drag-and-drop verification step sequencing; configure which checks run, in what order, with what fallbacks; required for non-developer compliance buyers (currently a gap vs Sumsub, Onfido, Persona)
- **Manual review queue / case management** — analyst queue for verifications that hit uncertainty thresholds; assignment, annotation, SLA timers; approve/deny/escalate actions
- **Risk scoring** — numeric risk score per verification (not just pass/fail); configurable thresholds for auto-approve and auto-decline; surfaced in list view and detail
- **KYC Level 1 (database check)** — full database verification against credit bureau / government data sources for name, DOB, address confirmation (Level 1 currently defined but data source integrations needed)
- **AML screening integration** — OFAC, EU, UN sanctions lists; PEP screening; adverse media monitoring; surfaced in L3 verifications and configurable in compliance settings
- **Supported documents matrix** — public page listing accepted document types per country (11,000+ document types); also surfaced in dashboard configuration
- **Re-verification notifications** — automated email/webhook to operators when credentials approach expiry; configurable lead time
- **Changelog** — public at `/changelog`; developer trust signal; shows active development pace
- **Service status page** — `status.solidus.network` integration; linked from footer and error states
- **SOLID token stacking** — fee discount tiers (10K/100K/1M SOLID) integrated into billing; requires Protocol token launch
- **Mobile SDK** — React Native SDK for embedding the liveness flow inside native mobile apps (iOS + Android)
- **Passive liveness** — one-photo liveness (no video, no movement instructions) as an alternative to the active camera flow; reduces mobile drop-off

## P3: Future Roadmap

These features are planned for Year 2 and beyond, pending Protocol maturity and customer demand.

- **Sign in with Solidus** — OIDC-compatible SSO using a Solidus credential as the authentication factor; operators can allow users to authenticate using their existing KYC L2 credential
- **Selective disclosure** — W3C BBS+ credential presentations; users prove specific attributes (e.g., "age > 18") without revealing full identity; requires Identity product (Phase 2)
- **White-label API** — fully branded hosted verification flow with custom logo, colors, and domain; targeted at Enterprise tier
- **On-premise deployment** — self-hosted validator nodes and API edge for regulated institutions that cannot send data off-premises
- **SOC 2 Type II certification** — formal audit; targeted for Year 2 completion
- **ISO 27001 certification** — information security management system; Year 2
- **KYB (business verification)** — KYC for organizations: UBO identification, registry checks, sanctions screening for legal entities
- **Video KYC** — agent-assisted identity verification for high-risk use cases (government, financial services); human-in-the-loop review
- **Regulatory Atlas** — interactive country-by-country KYC regulation map; SEO content play and genuine compliance tool
- **Proof of address** — utility bill / bank statement analysis as a standalone verification type
- **Age estimation** — AI-based age estimate from selfie without document; targets age-gating for gaming / adult content platforms
- **Data marketplace integration** — consent-based data sharing with `data.solidus.network`; Phase 4 ecosystem dependency
- **Pay gateway integration** — accept SOLID tokens for verification fees via `pay.solidus.network`; Phase 4
