# Verify — Competitor Page Structures

Research date: 2026-03-17. Sources: live site fetch (Sumsub), training knowledge (Onfido, Persona, Stripe Identity, Veriff). Used to inform Figma Make prompt scope — not a marketing document.

---

## Sumsub (sumsub.com)

### Navigation / Routes

**Top nav items:**
- `/` — Homepage
- `/pricing/` — Pricing
- Products (mega menu, see below)
- Solutions (mega menu, see below)
- Resources (mega menu, see below)
- Company (mega menu, see below)

**Products — Screening:**
- Email & Phone Verification
- Device Intelligence
- Questionnaires
- Watchlists and PEPs (sanctions/PEP screening)

**Products — Verification:**
- `/user-verification/` — User Verification (primary KYC product)
- `/alldocs/` — AllDocs (document coverage tool)
- `/business-verification/` — KYB
- `/id-verification/` — ID document check
- `/document-verification/` — Document authenticity
- `/liveness/` — Liveness/biometric check
- `/biometric-verification/` — Face match
- `/non-doc-verification/` — Database-based KYC (no document)
- `/address-verification/` — Address proof
- `/database-validation/` — Data cross-check
- `/reusable-kyc/` — One-time verify, reuse everywhere
- `/sumsub-id/` — Consumer-facing verified identity app
- `/video-identification/` — Video KYC (agent-assisted)
- `/qes/` — Qualified Electronic Signature

**Products — Monitoring:**
- `/transaction-monitoring/` — TM
- `/crypto-monitoring/` — Crypto address screening
- `/travel-rule/` — VASP Travel Rule compliance

**Products — Platform:**
- `/case-management/` — Compliance case workflow
- `/workflow-orchestration/` — No-code verification workflow builder
- `/risk-scoring/` — Dynamic risk engine
- `/customizable-analytics/` — Reporting dashboard
- `/marketplaces/` — Marketplace-specific onboarding

**Solutions — Compliance:**
- `/kyc/` — KYC Compliance
- `/aml-transaction-monitoring/` — AML
- `/kyb/` — Business verification
- `/aml-compliance/` — AML compliance
- `/age-verification/` — Age gating
- `/travel-rule-protocols/` — Travel Rule

**Solutions — Fraud Prevention:**
- `/fraud-prevention/`
- `/account-fraud-prevention/`
- `/payment-fraud-prevention/`
- `/bank-account-verification/`
- `/account-takeover/`

**Solutions — Industries:**
- `/industries/financial-services/`
- `/industries/payments/`
- `/industries/trading/`
- `/industries/crypto/`
- `/industries/igaming/`
- `/industries/mobility/`
- `/industries/marketplaces/`

**Resources:**
- `/blog/` — The Sumsuber (media hub)
- `/news/` — Press / newsroom
- `/webinars/` — On-demand webinars
- `/guides/` — Guides & reports
- `/events/` — Offline events
- `/success-stories/` — Customer case studies
- `/product-tours/` — Interactive product demos
- `/academy/` — Compliance education
- `/supported-documents/` — Country × document type matrix
- `docs.sumsub.com` — Developer documentation (external)
- `developers.sumsub.com/reference` — API reference (external)
- `status.sumsub.com` — Service status (external)
- Release notes (external)

**Company:**
- `/about/` — About
- `/newsroom/` — Press
- `/journey/` — Company history
- `/careers/` — Jobs
- `/partners/` — Partner program
- `/contacts/` — Contact
- `/trust-center/` — Security & trust
- `/government/` — Sumsub for Government
- `/technologies/` — Tech stack transparency
- `/ai/` — AI at Sumsub

### App / Dashboard Pages (inferred from product surface)

- **Dashboard Overview** — verification volume metrics, success rates, active cases
- **Applicant List** — filterable table of verified users (ID, status, risk score, date)
- **Applicant Detail** — full verification record with document scans, extracted data, liveness result, risk flags
- **Workflow Builder** — visual no-code editor for verification flows (which checks run, in which order, with what fallbacks)
- **Case Management** — queue of flagged/manual-review applicants; analyst assignment
- **Risk Scoring Config** — rule editor for dynamic risk levels
- **Transaction Monitoring** — alert queue, transaction graph, case notes
- **Analytics Dashboard** — verifications by type, country, outcome; funnel; time series
- **Settings / API Keys** — create, rotate, revoke keys
- **Webhooks** — endpoint config, delivery log, retry
- **Supported Documents Matrix** — per-country document acceptance config
- **Team / Users** — invite, roles, access levels
- **Billing** — plan, quota, invoices

### Key UX Patterns Observed

- **Mega menu navigation** — Products grouped into Screening / Verification / Monitoring / Platform, not a flat list
- **Applicant-centric data model** — core entity is "Applicant," not "Verification" — an applicant can have many verifications
- **Risk score as a first-class UI element** — every applicant row shows a risk score number with color band (green/amber/red)
- **No-code workflow builder** — drag-and-drop step sequencing is a major differentiator; compliance team can configure without dev
- **Supported documents matrix** — dedicated page listing 11,000+ document types by country — trust-building content
- **Academy content** — compliance certification courses embedded on site (learning LMS pattern)
- **Quote / ROI calculator** on homepage — shows cost vs. building in-house
- **App available on both App Store and Play Store** for mobile onboarding flows
- **Trust center** as a dedicated page (SOC 2, GDPR, certifications)
- **Industry-specific landing pages** rather than generic use-case pages
- **Country-specific KYC compliance pages** (30+ countries) — heavy SEO play

---

## Onfido (onfido.com)

### Navigation / Routes

**Top nav:**
- `/` — Homepage
- `/products/` — Products overview
- `/solutions/` — Solutions by industry / use case
- `/pricing/` — Pricing (contact-gated)
- `/resources/` — Resources hub
- `/company/` — About

**Products:**
- `/products/document-verification/` — AI-powered document check
- `/products/biometric-verification/` — Face biometrics + liveness
- `/products/passive-liveness/` — One-shot liveness (no selfie video)
- `/products/motion/` — Facial motion capture liveness
- `/products/watchlist-screening/` — Sanctions, PEP, adverse media
- `/products/address-verification/` — POA document check
- `/products/database-verification/` — Credit bureau / data source checks
- `/products/onfido-studio/` — No-code orchestration (their workflow builder)
- `/products/fraud-signals/` — Device + behavioral fraud intelligence
- `/products/kyb/` — Business verification
- `/products/smart-capture/` — SDK capture quality improvement (auto-crop, glare detection)

**Solutions — By Use Case:**
- `/solutions/onboarding/` — User onboarding
- `/solutions/kyc-aml/` — KYC/AML compliance
- `/solutions/age-verification/` — Age verification
- `/solutions/account-recovery/` — Re-authentication

**Solutions — By Industry:**
- `/solutions/financial-services/`
- `/solutions/crypto/`
- `/solutions/fintech/`
- `/solutions/insurance/`
- `/solutions/gaming/`
- `/solutions/sharing-economy/`
- `/solutions/telecoms/`

**Resources:**
- `/resources/guides/` — Guides and whitepapers
- `/resources/blog/` — Editorial blog
- `/resources/webinars/` — Webinar library
- `/resources/case-studies/` — Customer stories
- `/resources/events/` — Industry events
- `/resources/regulation/` — Regulatory updates tracker
- `developers.onfido.com` — Developer docs (external)
- `developers.onfido.com/reference` — API reference (external)
- `status.onfido.com` — Service status

**Company:**
- `/company/about/`
- `/company/leadership/`
- `/company/press/`
- `/company/careers/`
- `/company/partners/`
- `/company/trust/` — Trust and security (SOC 2, ISO 27001, GDPR)

### App / Dashboard Pages (inferred from Onfido Studio surface)

- **Studio** — Visual workflow editor (the main product; each workflow is a decision tree of identity checks)
- **Applicant Inbox** — List of pending / completed applicants with status filter
- **Applicant Profile** — Document images, extracted fields, biometric comparison score, liveness result, fraud signals
- **Check Results** — Granular breakdown of each check within a verification (document authenticity score, face match confidence, watchlist hits)
- **Watchlist Matches** — Queue of potential sanctions/PEP matches for analyst review
- **Reports** — Downloadable compliance reports by time range, applicant cohort
- **API Explorer** — Test API calls in-browser (sandbox)
- **Webhooks** — Configure, test, view delivery history
- **API Tokens** — Create and manage tokens
- **Team** — Members, roles, permissions
- **Billing / Usage** — Plan details, verification consumption meter
- **Settings** — Branding (hosted flow customization), compliance rules

### Key UX Patterns Observed

- **Onfido Studio** as the anchor product — the studio frame (left panel = step library, canvas = workflow, right panel = step config) is shown prominently in hero screenshots
- **Check confidence scores** rather than binary pass/fail — every document and biometric check exposes a confidence percentage (e.g., "Facial similarity: 89%")
- **Passive liveness as a marketing differentiator** — one-photo liveness (no video, no movement instructions) is a headline feature
- **Regulated industry certification grid** — GDPR, ISO 27001, SOC 2, eIDAS, PSD2, DORA, PCI-DSS listed in one trust page
- **"Fair AI" documentation** — Onfido publishes bias audit reports for their facial recognition models (a competitive differentiator for regulated clients)
- **SDK for hosted vs. embedded flows** — two integration modes always listed: "hosted" (redirect to Onfido URL) vs. "embedded" (SDK drop-in)
- **No public pricing** — all tiers require sales contact; pricing page is lead capture

---

## Persona (persona.com)

### Navigation / Routes

**Top nav:**
- `/` — Homepage
- `/product/` — Product overview
- `/use-cases/` — Use cases
- `/solutions/` — Solutions by industry
- `/pricing/` — Pricing
- `/docs/` — Developer docs (embedded, not external subdomain)
- `/blog/` — Blog
- `/company/` — About

**Product:**
- `/product/identity-verification/` — Core ID + selfie check
- `/product/database-verification/` — SSN trace, address history, phone lookup
- `/product/government-id-verification/` — Document AI
- `/product/selfie-verification/` — Liveness + face match
- `/product/watchlist-screening/` — Sanctions, PEP, adverse media
- `/product/business-verification/` — KYB (ownership graph)
- `/product/device-fingerprinting/` — Device signals
- `/product/phone-verification/` — Phone carrier lookup
- `/product/email-verification/` — Email risk scoring
- `/product/workflows/` — Visual workflow builder ("Inquiry Templates")
- `/product/lists/` — Custom allow/deny lists
- `/product/cases/` — Case management with analyst workflow
- `/product/reports/` — Compliance reporting
- `/product/vault/` — Encrypted PII storage (Persona-managed)
- `/product/audit-trail/` — Immutable event log per user

**Use Cases:**
- `/use-cases/kyc-aml/`
- `/use-cases/age-verification/`
- `/use-cases/fraud-prevention/`
- `/use-cases/account-takeover/`
- `/use-cases/gig-economy/`
- `/use-cases/marketplace-trust/`
- `/use-cases/lending/`

**Solutions — By Industry:**
- `/solutions/fintech/`
- `/solutions/crypto/`
- `/solutions/marketplaces/`
- `/solutions/healthcare/`
- `/solutions/insurance/`
- `/solutions/gaming/`
- `/solutions/real-estate/`

**Pricing:**
- `/pricing/` — Three tiers: Starter (free, 500 verifications), Growth (usage-based), Enterprise (custom)

**Docs:**
- `/docs/` — API documentation
- `/docs/api/` — REST API reference
- `/docs/sdks/` — SDKs (iOS, Android, JS, React Native)
- `/docs/webhooks/` — Webhook event reference
- `/docs/inquiry-templates/` — Workflow configuration guide
- `/docs/lists/` — List management
- `/changelog/` — Product changelog

### App / Dashboard Pages (heavily featured in site screenshots)

- **Dashboard Home** — "Inquiries" count, completion rate, drop-off stage, recent alerts
- **Inquiries List** — filterable by status (pending / completed / failed / expired), type, date range; search by name, email, or phone
- **Inquiry Detail** — Full timeline: each verification step with timestamp, confidence score, extracted fields, document images (front/back), selfie frame, watchlist check result, IP + device signals
- **Cases** — Manual review queue; analyst can approve, deny, escalate, or request more info
- **Templates / Workflow Builder** — Drag-and-drop inquiry template editor; each step configurable (what to collect, what to check, pass/fail criteria)
- **Lists** — Create and manage allow-lists (trusted users), deny-lists (blocked users), custom lists for routing logic
- **Reports** — Downloadable compliance reports; scheduled delivery to email
- **Vault** — Encrypted document storage viewer; access log per document
- **API Keys** — Create, test, manage keys; environment toggle (sandbox / production)
- **Webhooks** — Event subscriptions, test webhook delivery, delivery log
- **Audit Trail** — Per-user immutable event log exportable as CSV
- **Team** — Member list, role assignment (Admin, Developer, Analyst, Read-Only)
- **Billing** — Usage meter, plan, invoices
- **Settings** — Branding (logo, colors for hosted flow), email templates, compliance rules

### Key UX Patterns Observed

- **"Inquiry" as the core entity** — Persona uses "Inquiry" rather than "Verification" or "Check" — each inquiry bundles all the steps for one user
- **Template Library** — Pre-built inquiry templates for common use cases (US KYC, crypto onboarding, gig economy) lower time-to-first-verification
- **Vault for PII** — Encrypted document storage is a standalone product feature, not just a byproduct; compliance teams can control retention and deletion schedules
- **Free tier with 500 verifications** — lowest barrier to entry of all competitors; developers can fully evaluate without a sales call
- **Granular analyst workflow** — Cases can be tagged, annotated, assigned to specific analysts; SLA timers visible on each case
- **Hosted + embedded + API** — three integration modes listed; the flexibility is a developer marketing point
- **Inline docs** — API documentation lives at persona.com/docs not a subdomain; likely to be indexed and drive SEO
- **Changelog** as content strategy — public changelog at persona.com/changelog; shows active development pace

---

## Stripe Identity (stripe.com/identity)

### Navigation / Routes

**Top nav (Stripe global):**
- `/` — Stripe homepage
- `/payments/` — Payments
- `/billing/` — Billing
- `/identity/` — Identity (this product)
- `/connect/` — Connect
- `/terminal/` — Terminal
- `/radar/` — Radar (fraud)
- `/docs/` — Documentation
- `/pricing/` — Pricing

**Identity-specific pages:**
- `/identity/` — Product homepage
- `/identity/how-it-works/` — Verification flow explanation
- `/docs/identity/` — Identity developer docs
- `/docs/identity/verify-users/` — Integration quickstart
- `/docs/identity/access-verification-results/` — Retrieving results
- `/docs/identity/handle-verification-outcomes/` — Webhook handling
- `/docs/identity/testing/` — Test mode guide
- `/docs/identity/id-numbers/` — ID number formats by country
- `/docs/identity/supported-countries/` — Coverage matrix
- `/pricing/` — Identity pricing is on Stripe's main pricing page ($1.50 per successful verification)

**Developer docs structure (stripe.com/docs/identity/*):**
- Overview
- Quickstart
- Session types (document, id_number, selfie)
- SDK reference (JS, iOS, Android, React Native)
- API reference
- Webhooks (identity.verification_session.verified, etc.)
- Dashboard guide
- Testing

### App / Dashboard Pages (Stripe Dashboard, identity section)

- **Identity Overview** — Count of sessions today/this month, success rate
- **Verification Sessions List** — Table with session ID, type (document/id_number/selfie), status (verified/requires_input/processing/canceled), created date, last event
- **Session Detail** — Shows collected data fields, document images (redacted), risk signals, linked Customer/PaymentIntent if applicable
- **Reports** — Export verification data for compliance
- **Settings / Privacy** — Data retention policy, what fields to collect

*(Note: Identity is embedded inside the broader Stripe Dashboard, not a standalone product console)*

### Key UX Patterns Observed

- **Stripe Dashboard integration** — Identity lives inside the existing Stripe Dashboard; no separate login for existing Stripe customers — the lowest possible switching cost
- **$1.50 flat per successful verification** — the simplest pricing in the market; no tiers, no volume negotiation for most customers
- **"Verification Session" as the core entity** — maps directly to Stripe's objects-as-primitives API philosophy; a session has a status, a type enum, and a result object
- **Three check types, not products** — document (ID scan), id_number (SSN/tax ID lookup), selfie (liveness) — composable rather than bundled
- **Connected to Stripe Customers** — a verification session can be attached to an existing Stripe Customer ID, giving a single audit trail per user across payments + identity
- **Redacted images by default** — documents are processed and then the raw images are deleted; only extracted fields (name, DOB, address) are retained — strong GDPR story
- **Extremely concise docs** — quickstart is ~20 lines of code; docs show Stripe's philosophy of minimizing API surface
- **No workflow builder** — Stripe Identity does not have a no-code workflow UI; it's API-first and developer-first; compliance officers do not use it directly
- **No case management** — no manual review queue in Identity; designed for automated pass/fail decisions only
- **Pricing on public page** — $1.50/verification disclosed on pricing page; exceptional transparency vs. competitors

---

## Veriff (veriff.com)

### Navigation / Routes

**Top nav:**
- `/` — Homepage
- `/products/` — Products
- `/solutions/` — Solutions by industry
- `/pricing/` — Pricing (contact-gated, calculator visible)
- `/resources/` — Resources
- `/company/` — About

**Products:**
- `/products/identity-verification/` — Core document + biometric check
- `/products/biometric-authentication/` — Reusable face-based re-auth (post-onboarding)
- `/products/knowledge-based-authentication/` — KBA (security questions from public record)
- `/products/document-verification/` — Document-only check (no selfie)
- `/products/business-verification/` — KYB
- `/products/aml-screening/` — Sanctions, PEP, adverse media
- `/products/fraud-prevention/` — Device + behavioral signals
- `/products/age-estimation/` — AI-based age estimate (no document required)
- `/products/proof-of-address/` — Utility bill / bank statement check

**Solutions — By Industry:**
- `/solutions/fintech/`
- `/solutions/crypto/`
- `/solutions/banking/`
- `/solutions/insurance/`
- `/solutions/gaming/`
- `/solutions/mobility/`
- `/solutions/healthcare/`
- `/solutions/p2p-marketplaces/`

**Solutions — By Use Case:**
- `/solutions/kyc/`
- `/solutions/aml-compliance/`
- `/solutions/fraud-prevention/`
- `/solutions/onboarding/`
- `/solutions/age-verification/`

**Resources:**
- `/blog/` — Editorial blog
- `/guides/` — Compliance guides
- `/case-studies/` — Customer stories
- `/webinars/` — Webinar library
- `/events/` — Industry events
- `/regulatory-atlas/` — Country-by-country KYC regulation map
- `developers.veriff.com` — Developer documentation (external)
- `status.veriff.com` — Service status
- `/trust/` — Security & compliance certifications

**Company:**
- `/company/about/`
- `/company/leadership/`
- `/company/press/`
- `/company/careers/`
- `/company/partners/`
- `/company/contact/`

### App / Dashboard Pages (inferred from product and demo surfaces)

- **Dashboard Home** — Sessions today, success rate, top drop-off reason, queue depth for manual review
- **Sessions List** — Table: session ID, user name (if captured), country, document type, status, date, decision
- **Session Detail** — Document scans (front/back), selfie, extracted fields, biometric score, fraud signals, decision reason, event log
- **Manual Review Queue** — Analyst queue for sessions that hit uncertainty threshold; SLA countdown per item
- **Decision Rules** — Configure auto-approve/auto-decline thresholds and fraud rule triggers
- **Analytics** — Volume over time, by country, by document type, pass rate trend, fraud catch rate
- **Integrations** — Webhook setup, API key management, pre-built connectors (Salesforce, Jumio migration)
- **Team** — Members, roles
- **Billing** — Usage, invoices
- **Settings** — Branding for hosted flow, compliance data retention rules

### Key UX Patterns Observed

- **Biometric Authentication as a second product** — Veriff explicitly markets reusable face-based re-auth as a standalone product post-KYC; this is closest to Solidus's "verify once, use everywhere" model
- **Regulatory Atlas** — A dedicated interactive map showing KYC requirements per country; strong SEO content play and genuine compliance tool
- **Video-based by default** (historically) — Veriff's original tech captured a short video during verification rather than a static selfie; this is now shifting toward passive liveness
- **"Human-in-the-loop" as a brand position** — Veriff emphasizes that their manual review team is available 24/7; positioned as a quality guarantee, not a cost center
- **Decision engine configurability** — Customers can tune auto-approve thresholds for their risk tolerance; not just pass/fail
- **Age Estimation** product — estimate age from a selfie without any document; unusual product that targets age-gating for gaming / adult content
- **Proof of Address** as a standalone check — utility bill / bank statement analysis is a separate SKU
- **No free tier** — all pricing requires contact with sales; minimum commitment implied
- **SOC 2 Type II, ISO 27001, GDPR, PSD2, eIDAS listed** on trust page

---

## Cross-Competitor Patterns Summary

### Pages every competitor has

| Page / Section | Sumsub | Onfido | Persona | Stripe | Veriff |
|---|---|---|---|---|---|
| Homepage with hero | Yes | Yes | Yes | Yes | Yes |
| Products / Features overview | Yes | Yes | Yes | Yes | Yes |
| Industry-specific pages | Yes | Yes | Yes | No | Yes |
| Pricing page (public) | Yes | No | Yes | Yes | No |
| Developer docs (API reference) | External | External | Inline | Inline | External |
| Security / Trust / Compliance page | Yes | Yes | Yes | Yes | Yes |
| Case studies / customers | Yes | Yes | Yes | Yes | Yes |
| Blog / Content hub | Yes | Yes | Yes | Yes | Yes |
| Service status page | Yes | Yes | Yes | Yes | Yes |
| No-code workflow builder | Yes | Yes | Yes | No | No |
| Manual review / Case management | Yes | Yes | Yes | No | Yes |
| Analytics dashboard | Yes | Yes | Yes | Limited | Yes |
| Audit log | Yes | Yes | Yes | Limited | Yes |
| Reusable credential / re-auth | Partial | No | No | No | Yes |

### Dashboard app: common information architecture

1. **Left sidebar:** Logo + nav items (Dashboard, Verifications/Sessions/Inquiries, Cases/Review, Analytics, Settings/Config, API/Developer)
2. **Top bar:** Org name + environment toggle (Sandbox / Production) + notification bell + user menu
3. **Core list view:** Filterable, sortable table of verifications — the primary operational tool
4. **Detail view:** Full verification record with document images, extracted data, decision timeline, event log
5. **Analytics:** Time series charts + funnel + geographic breakdown
6. **Developer settings:** API keys + webhooks + SDK downloads
7. **Compliance settings:** Data retention, geographic restrictions, required fields
8. **Team management:** Member list + invite + roles

### Pricing models in market

- **Pay-per-verification** (Stripe: $1.50 flat; Persona: usage-based post-free-tier; Sumsub: volume tiers)
- **Subscription + overage** (Onfido, Veriff: contract-based)
- **Free tier** (Persona: 500 free/month; Stripe: first $X free in sandbox)
- **Enterprise custom** (all five have enterprise tiers)

### UX patterns worth incorporating in Solidus Verify

- **Environment toggle** (Sandbox / Production) — visible in top bar; prevents accidental production actions
- **Verification funnel chart** — every analytics page has a step-by-step funnel showing where users drop off
- **Risk score / confidence score per verification** — not just pass/fail; show a score to help compliance analysts make manual decisions
- **No-code workflow builder** — Sumsub, Onfido, and Persona all have this; it's table stakes for non-developer users
- **Regulatory Atlas or compliance pages by country** — strong SEO play, genuine utility
- **Trust center as a dedicated page** — dedicated SOC 2 / GDPR / ISO page with downloadable reports
- **Reusable credential / re-auth product page** — Veriff is the only competitor with this; it's Solidus's core differentiator — needs dedicated marketing page
- **Public changelog** — Persona's changelog is a developer trust signal
- **Audit log with blockchain attestation note** — unique to Solidus; competitors have logs but not tamper-evident on-chain records
