# Verify — Web Pages

All routes on the `verify.solidus.network` domain.

---

## Public Routes

| Route | Page Name | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | Homepage | Primary marketing and acquisition page. Hero, live stats, partner logos, country/document coverage, reusable credential explainer, how it works, interactive product demo, feature grid, industry verticals, compliance badges, case study preview, ROI calculator, developer quickstart, email signup CTA, footer. | No |
| `/pricing` | Pricing | Full pricing page with pay-as-you-go table, subscription plan cards (Startup/Growth/Enterprise), volume discount calculator, competitor pricing comparison, query explainer, feature comparison table, FAQ accordion, enterprise CTA section. Monthly/annual billing toggle. | No |
| `/security` | Security & Compliance | Trust center. Architecture data-flow diagram, certifications grid (GDPR, SOC 2, ISO 27001, BIPA, MiCA, eIDAS 2, FATF, PCI-DSS), privacy principles (6 cards), regulatory compliance detail (MiCA/eIDAS 2/GDPR mapping), audit reports card (4 downloadable reports), bug bounty & responsible disclosure. | No |
| `/use-cases` | Use Cases | Industry-specific use cases in a vertical tab layout (8 industries: Crypto & DeFi, Fintech, Banking, Gaming, Healthcare, Marketplaces, Gig Economy, Real Estate, Government). Each shows 3 use cases with code snippets and customer quote. | No |
| `/enterprise` | Enterprise | Enterprise tier page. Volume pricing table, white-label API, on-premise deployment, dedicated SLA, compliance advisory, enterprise customer logos, migration guide, security questionnaire section, enterprise contact form. | No |
| `/reusable-credential` | Reusable Credential | Explainer page for credential reuse. How reuse works, savings calculator, developer API example, consent + revocation model, live reuse demo, CTA. | No |
| `/changelog` | Changelog | Product release notes. Chronological entries with version badges, type badges (New/Improved/Fixed/Deprecated), breaking change alerts, RSS feed, email subscribe. | No |
| `/supported-documents` | Supported Documents | Global document coverage database. 180+ countries, 12,000+ document types, accuracy scores. Search + filter by region/type. Per-country document drawer. Download full list CSV. | No |
| `/case-studies` | Case Studies | Customer success stories. Featured case study hero, filterable grid (industry, company size, use case), full story pages with challenge/solution/results structure. | No |
| `/compliance` | Compliance / Regulatory Atlas | Jurisdictional compliance guide. Regulation grid (GDPR, MiCA, eIDAS 2, FATF, PSD2, BIPA, CCPA), jurisdiction detail drawer, compliance checklist PDF downloads, regulation updates feed. | No |
| `/integrations` | Integrations | Integration directory. Search + category filter, integration cards (native + webhook), featured integrations, build-your-own section, integration request form. | No |
| `/partners` | Partners | Partner ecosystem page. Partner types, featured partners grid with tier badges, benefits table, partner application form. | No |
| `/compare` | Compare | Competitor comparison page. Feature comparison table (Solidus vs Sumsub, Onfido, Persona, Stripe Identity), feature callouts, migration testimonials, CTA. | No |
| `/login` | Login / Sign In | Split-screen authentication page. Email + password form, Google SSO, forgot password link, sign-up link. Transitions to MFA step when account has TOTP enabled. | No (entry point) |
| `/signup` | Sign Up | Registration form. Work email input → triggers email confirmation. Referenced from homepage "Start Free" CTA and login "Don't have an account?" link. | No |
| `/forgot-password` | Forgot Password | Password reset request form. Email input, submit sends reset link. | No |
| `/reset-password` | Reset Password | Token-gated password reset. New password + confirm. Accessed from emailed link. | No (token-gated) |

---

## Authenticated Routes

| Route | Page Name | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/dashboard` | Dashboard Overview | Primary app landing screen post-login. KPI cards, volume chart, live activity stream, webhook delivery panel, recent verifications table. Includes sandbox mode banner when environment is set to Sandbox. | Yes |
| `/verifications` | Verifications List | Full filterable, sortable, paginated table of all verification records. Filter bar (search, status, type, date, country), quick filter tabs, bulk selection, Export CSV. | Yes |
| `/verifications/:session_id` | Verification Detail | Full record for a single verification session. Subject card, document details, verification steps timeline, credential card, blockchain anchor, event log. | Yes |
| `/analytics` | Analytics | Reporting dashboard. KPI cards, verification funnel chart, volume over time chart, credential type breakdown, cost savings vs Auth0 panel, cohort quality table, compliance audit log. Date range picker, Export PDF. | Yes |
| `/credentials` | Credential Management | Manage all issued W3C Verifiable Credentials. Stat cards, filter table, credential detail slide-in panel (with presentations log), revoke action, expiry warnings card with re-verification nudge. | Yes |
| `/api-keys` | API Keys | Manage API authentication keys. Key table (masked, environment badge), create key modal with one-time post-creation reveal, API usage stats bars vs plan quota. | Yes |
| `/webhooks` | Webhooks | Configure and monitor webhook endpoints. Endpoint cards (health status, event subscriptions, success rate), add/edit/delete endpoint modal, delivery log with request/response accordion. | Yes |
| `/audit-log` | Audit Log | Tamper-evident event log for all account activity. Filterable by event type, date, actor. Event badges for 9 event types. Row click shows full event JSON. Blockchain attestation banner. Export CSV/PDF. | Yes |
| `/team` | Team Members | Manage team access. Member table with role badges and 2FA status, invite member modal, role description cards, expandable permissions matrix. | Yes (Admin role for mutations) |
| `/billing` | Billing | Subscription and payment management. Current plan card with usage meter, upgrade modal, payment method, invoice history. | Yes (Admin role) |
| `/settings` | Settings — Organization | Settings hub. Secondary vertical nav: Organization tab (default) — org name, logo, industry, country, website. | Yes (Admin role) |
| `/settings/security` | Settings — Security | 2FA management, active session table with revoke, SSO configuration. | Yes (Admin role) |
| `/settings/notifications` | Settings — Notifications | Email notification toggles, alert thresholds (failure rate %, queue depth), Slack and PagerDuty integration channels. | Yes (Admin role) |
| `/settings/compliance` | Settings — Compliance | Required KYC level, AML screening toggle, data retention policy, automatic credential expiry, geographic restrictions, consent requirement. | Yes (Admin role) |
| `/settings/integrations` | Settings — Integrations | Third-party integrations. (Defined in prototype; content TBD — expected: CRM connectors, Salesforce, Slack, PagerDuty deep links.) | Yes (Admin role) |
| `/settings/danger` | Settings — Danger Zone | Export all data, delete organization with name-match confirmation. Styled with red theme. | Yes (Admin role) |
| `/settings/documents` | Supported Documents Config | Configure accepted document types per country per workflow. Toggle per doc type, accuracy scores, last-updated timestamps. | Yes (Admin role) |
| `/workflows` | Workflow Builder | Visual drag-and-drop editor for verification decision flows. Step palette, canvas with connected nodes, step inspector panel, test + activate controls. | Yes |
| `/cases` | Case Management | Manual review queue for flagged verifications. Summary stats, priority queue table, SLA timers, case detail panel with approve/reject/escalate actions. | Yes (Operator+ role) |
| `/lists` | Allow / Deny Lists | Manage identity allowlists and blocklists by DID, email, or reference. Bulk CSV import/export, expiry support, deny list styled with red indicators. | Yes (Operator+ role) |

---

## API / Embed Routes

| Route | Page Name | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/s/:session_id` | Hosted Verification Flow | End-user-facing identity verification page. Centered single-column (max-width 480px), dark mode, mobile-optimized (375px). 3 steps: Document Upload, Liveness Check, Processing + Result. No sidebar. No nav. Accessed via operator-issued redirect URL. | No (session-token-gated via URL) |
| `/docs` | API Reference | Embedded developer documentation. 3-column layout (no sidebar): left nav (API sections), center content (endpoint docs, parameter tables, response tabs), right code panel (language tabs, syntax-highlighted examples). Version dropdown (v2 Latest). | No |
| `/docs/quickstart` | Developer Quickstart | 6-step integration guide with code snippets, inline API response previews, hosted flow screenshots, and localStorage-based progress tracking. Uses same 3-column layout as `/docs`. | No |
| `/docs/:section` | API Reference — Section | Sub-pages of the API docs: Authentication, Verifications (Create/Get/List/Cancel Session), Credentials (Issue/Verify/Revoke), Webhooks (Events/Signature/Retry), DIDs (Resolve/Register), SDKs (JS/Python/Go/React Native). | No |

---

## Notes

- **Marketing pages** (`/`, `/pricing`, `/security`, `/use-cases`, `/enterprise`) use light mode. All other pages use dark mode.
- **Authentication pages** (`/login`, `/signup`, `/forgot-password`, `/reset-password`) use dark mode with no sidebar.
- **`/settings`** defaults to the Organization sub-page. Other sub-pages are addressed via a secondary vertical nav (not separate routes in the prototype; routing strategy TBD in implementation).
- **`/s/:session_id`** sessions are time-limited (default TTL: 3600 seconds). Accessing an expired or already-used session URL shows an informational expiry screen.
- **Status page** is at `status.solidus.network` — external domain, linked from the footer and error states. Not served from the verify subdomain.
- **Block explorer links** in the BlockchainAnchorCard and Audit Log route to `explorer.solidus.network` — a separate Phase 3 product; links should degrade gracefully (open external, fallback to hash display only) until the explorer is live.
- **`/changelog`** is fully defined in the prototype as a marketing page (light mode). Lists product updates with version badges, type tags, breaking change alerts, RSS feed, and email subscribe.
- **`/docs`** routes have no authentication requirement. Developer documentation is fully public. The code examples use placeholder API keys (`sk_live_abc123...`).
