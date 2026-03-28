# Verify — Screens

Layout conventions: App screens use 240px fixed sidebar + 1200px main content, 24px padding, dark mode. Marketing screens use full-width container max 1200px, 120px horizontal padding, light mode. All app screens share the same Sidebar and Top Bar components.

---

## Web Dashboard (verify.solidus.network)

### Authentication

- **Login / Sign In** — Split-screen login with brand panel (left 640px) and form (right 800px)
  - Route: `/login`
  - Key elements: Work email + password inputs; "Sign in to Solidus Verify" form; SSO via Google; "Forgot password?" link; "Don't have an account? Sign up" link; brand panel with hero copy, trust chips (no biometric storage, GDPR compliant, 1-2s verification), footer copyright
  - States: default, loading (button spinner, fields at 60% opacity), error (red field borders + "Invalid email or password" banner, "Locked after 5 failed attempts" note), MFA (6-digit TOTP OTP input after password submit, recovery code link)

---

### App Core

- **Dashboard Overview** — Primary operational view; first screen after login
  - Route: `/dashboard`
  - Key elements: DateRangePicker (last 7 days default); four KPICards (Verifications Today, Pending Review, Success Rate, Revenue This Month) with count-up animation and sparklines; VolumeChartCard (area chart, 7-day, with metric toggle); LiveStreamPanel (real-time 8-item feed with animated item entry); WebhookDeliveryPanel (endpoint health badge, delivery stats strip, 5-row delivery log, degraded state alert); **ReviewQueueCallout** (amber card: pending count, oldest session age, open queue badge, "Open Review Queue →" CTA link); Recent Verifications table (8 rows, pagination, eye action); New Verification button in top bar
  - States: empty (new account — zero KPIs, empty chart with quickstart CTA, "Waiting for first verification" stream caption); sandbox mode (amber full-width banner below top bar: "You are in Sandbox mode — all data is simulated.")

- **Verifications List** — Operational table for managing all verification records
  - Route: `/verifications`
  - Key elements: Filter bar (search by DID/email/reference, Status dropdown, Type dropdown, Date Range dropdown, Country multi-select, **Risk Level dropdown**, active filter pills with clear all); Quick filter tabs (All, Verified, Pending, Failed, Processing, **Flagged** with amber count badge) with counts; main table (DID, Type, Status badge, **RiskScoreBadge** 0–100 Low/Medium/High, Country + flag, Duration, Cost in JetBrains Mono, Timestamp, actions — view + context menu); DID copy-on-hover; bulk action bar replaces filter bar when rows selected (export, revoke, deselect all); pagination ("Showing 1–20 of 1,247", page number pills); Export CSV button in top bar
  - States: empty filtered (icon + "No verifications found" + "Clear filters"); zero-result search ("No results for 'did:solidus:mainnet:0xfff...'"); loading skeleton; bulk selected (blue-tinted bulk bar); flagged view (Risk column promoted to second position, amber left borders on flagged rows)

- **Verification Detail** — Full record for a single verification
  - Route: `/verifications/{session_id}` (e.g., `/verifications/vsn_9f8e7d6c5b4a3291`)
  - Key elements: Breadcrumb (Dashboard / Verifications / session_id); page header (session ID, start/complete/duration timestamps, large status badge, **"Flag for Review" ghost danger button**, "Revoke Credential" danger ghost button); 60/40 two-column layout; left: SubjectCard (DID + copy, reference, credential badges), DocumentCard (document type, issuing country, masked document number + DOB with eye toggle, full name, expiry, nationality, gender, document thumbnails with "Images deleted after processing (GDPR)" caption), VerificationStepsCard (6-step timeline: uploaded → authenticity → liveness → extraction → validator consensus with block # → credential issued); right: CredentialCard (CredentialPreview with W3C VC type, issuer, issued/expiry dates, QR placeholder; Download Credential + View Raw JSON buttons), BlockchainAnchorCard (block #, tx hash in cyan with explorer link, validator), **GeoRiskCard** (IP address + risk pill, IP geolocation, document/IP country match, VPN/proxy/TOR detection, ISP), EventLogCard (8 timestamped events in JetBrains Mono)
  - States: processing (steps 1–3 green, step 4 spinning, steps 5–6 grey, credential card shows locked placeholder); failed (steps 1–3 green, step 3 shows x-circle with failure reason, FailureAnalysisCard in red theme with "Flag for Review" button, no credential card); GeoRiskCard escalated (red border, amber warning rows for country mismatch or VPN detected)

---

### Modals (overlay on any dashboard screen)

- **New Verification Modal** — 3-step wizard launched from "New Verification" button
  - Trigger: "New Verification" button in top bar
  - Key elements: Blurred overlay (backdrop-filter: blur(6px)); 520px modal; step progress indicator (3 circles: Type → Subject → Confirm)
  - Step 1 — Type Selection: 2-column TypeGrid with 5 TypeCards (Email, Phone, KYC L1, KYC L2, KYC L3); each shows icon, name, timing, price; selected state with blue border; SelectedSummary info box; balance display; Cancel + Continue buttons
  - Step 2 — Subject DID: DID input with QR scanner toggle; 400ms debounce validation (resolving / valid / not found states); optional User ID and Reference metadata fields; Back + Start Verification buttons
  - Step 3 — Confirm: ConfirmCard with verification summary (type, DID, estimated time, cost in Lime); RedirectNote explaining user redirect; Cancel + Launch buttons; launch loading → success state (check-circle spring animation, session ID in cyan, View in Dashboard + Launch Another buttons)
  - States: insufficient balance (cost in red, "0 queries" warning, Launch disabled); DID already at target level (re-verification warning appended to SelectedSummary)

---

### Analytics

- **Analytics** — Reporting and compliance analytics view
  - Route: `/analytics`
  - Key elements: DateRangePicker (Last 30 days default); Export PDF button; four KPICards (Total Verifications, Success Rate, Avg. Completion Time, Cost per Verification); Verification Funnel card (trapezoid chart, 5 stages from Initiated to Credential Issued, drop-off percentages, drop-off analysis breakdown by reason); Volume Over Time card (area chart, dual-line: total verifications + successful, 30-day x-axis); Credential Breakdown card (donut chart by verification type with legend); CostSavingsCard (savings vs Auth0, comparison rows, savings percentage bar); **GeoDistributionMap** (world map choropleth — verification volume + success rate by country, top-10 countries table, flag icons); **FraudDetectionCard** (3 metric tiles: flagged sessions, high-risk rate, blocked sessions; trend sparklines; fraud type breakdown bar chart; top contributing signals list); **ScheduledReportsCard** (create/manage scheduled PDF/CSV reports with frequency selector, delivery email list, format options, next delivery countdown); Cohort Quality table (6-month data, re-verification rates, active rates); Compliance Audit Log (10 rows, event badges, validator IDs, block numbers, blockchain attestation note, Download CSV)
  - States: new account (all chart areas show "No data yet" + empty state copy); export triggered (toast: "PDF report ready")

---

### Credentials

- **Credential Management** — Manage all issued credentials
  - Route: `/credentials`
  - Key elements: Issue Credential button in top bar; three stat cards (Active Credentials, Expiring in 30 days, Revoked This Month); filter bar (search by DID, Type dropdown, Status dropdown — Active/Expiring/Expired/Revoked, Expiry date range); credential list table (DID, Type badge, Issued Date, Expiry Date, Status badge, Presentations count, actions); expiring-soon rows show amber expiry date; revoked rows show strikethrough and grey styling; pagination; Expiry Warnings card (amber theme, count, "Send Re-verification Nudge" button)
  - States: credential detail panel (slide-in from right, 480px — CredentialPreview, subject section, issuance section, presentations table, Revoke button); revoke confirmation dialog (480px modal, warning copy, Cancel + Revoke buttons, loading → success → panel closes)

---

### Developer Tools

- **API Keys** — Manage API authentication keys
  - Route: `/api-keys`
  - Key elements: Create New Key button; sandbox mode amber banner (if applicable); API Keys table (Name, masked Key with eye toggle and copy, Environment badge Live/Test, Created date, Last Used, Permissions, actions — copy/rotate/revoke); 3 sample rows; Create Key modal (name, environment radio, permissions checkboxes, expiry dropdown, Cancel + Create); post-creation success: one-time key reveal with amber "Copy this key now" warning; Usage Stats card (progress bars for Verifications, API Calls, Webhooks vs plan quota; billing period note)
  - States: key reveal modal (one-time reveal state); key rotation confirmation; key revocation confirmation

- **Webhooks** — Configure and monitor event delivery endpoints
  - Route: `/webhooks`
  - Key elements: Add Endpoint button; Configured Endpoints section (3 EndpointCards — URL, event subscription pills, health status dot, created/last delivery/success rate, edit/delete actions; failing endpoint shows red border and alert strip with retry count); Delivery Log table (Timestamp, Event, URL truncated, HTTP Status, Latency, Retry Count, expand row for request/response accordion); Add Endpoint modal (URL input, description, event subscription checkbox grid, HMAC secret with Generate button, Test Endpoint button, Save)
  - States: endpoint healthy (green dot, "Active"); endpoint failing (red border, alert strip "4 failed deliveries in the last hour"); no endpoints (empty state with "Add Webhook →" CTA)

- **Developer API Reference** — Embedded API documentation
  - Route: `/docs`
  - Key elements: Full-width 3-column layout (no sidebar); left nav panel (280px, search box, version dropdown, collapsible sections: Authentication, Verifications, Credentials, Webhooks, DIDs, SDKs); center content area (760px, endpoint method badge, parameter table, responses with status code tabs); right code panel (360px, language tabs JS/Python/Go/cURL, code block with syntax highlighting, copy button)
  - States: active nav item with blue indicator; all sections expanded/collapsed independently

- **Developer Quickstart** — Step-by-step integration guide
  - Route: `/docs/quickstart`
  - Key elements: Same 3-column layout as API Reference; 6 sequential steps (Prerequisites, Install, Initialize, Create session, Handle webhook, Verify credential); each step has code block + matching API response in right panel; progress tracked in localStorage with green checkmarks on completed steps; inline hosted flow screenshots (240px preview cards) at Step 4

---

### Administration

- **Audit Log** — Tamper-evident record of all account events
  - Route: `/audit-log`
  - Key elements: Export CSV + Export PDF buttons; filter bar (search by DID/event type/actor email, Event Type dropdown, Date Range, Actor dropdown); Audit Log table (Timestamp, EventBadge in 9 types — API Key Created/Revoked, Webhook Added, Team Member Invited, Billing Updated, Settings Changed, Credential Issued/Revoked, Verification Started; Actor with avatar; Subject DID; Details; IP; Block # in JetBrains Mono); row click → side panel with full event JSON; Blockchain Attestation banner (cyan theme, "All audit events are immutably anchored...")
  - States: side panel open with JSON viewer; filtered view; empty filter result

- **Team Members** — Manage team access and roles
  - Route: `/team`
  - Key elements: Invite Member button; 3 role stat cards (Admins, Operators, Viewers); Team table (Member — avatar + name + email, Role badge — Admin/Operator/Viewer, Status badge — Active/Invited, Last Active in JetBrains Mono, 2FA status icon, actions — edit role/revoke); current user row with blue left border and "You" badge; invited row (greyed, italic email, resend invite link); Invite Member modal (email input, 3 role radio cards with descriptions, Send Invite); Permissions Matrix (expandable section, grid of permissions vs roles)
  - States: invited member row (grey, no last-active); edit role (inline dropdown); revoke confirmation

- **Billing** — Subscription and payment management
  - Route: `/billing`
  - Key elements: Download Invoice button; Current Plan card (plan name, monthly price, feature list, Upgrade Plan button, Cancel link, usage progress bar with period reset date); Upgrade Plan modal (dark-mode plan cards: Startup $99/Growth $499/Enterprise Custom, current plan badge); Payment Method card (masked card number, expiry, Update link); Invoice History table (Date, Invoice # in JetBrains Mono, Amount, Plan, Status badge Paid/Upcoming/Failed, Download icon); 6 rows of invoice history
  - States: upgrade modal (3 plan cards, featured Growth with glow); payment update (Stripe-style card input)

- **Settings** — Account configuration
  - Route: `/settings`
  - Key elements: Secondary vertical nav (200px — Organization, Security, Notifications, Compliance, Integrations, Danger Zone)
  - Settings / Organization: org name, logo upload, industry dropdown, country dropdown, website, Save Changes
  - Settings / Security: 2FA status row with Manage link; enrolled methods list (authenticator app + "Add SMS backup"); Session Management table (device, last active, IP, revoke); "Revoke All Other Sessions" danger ghost button; SSO configuration (toggle + metadata URL)
  - Settings / Notifications: Email notification toggles (5 event types); Alert Thresholds (failure rate %, queue depth); Channels (always-on email, optional Slack webhook, optional PagerDuty key)
  - Settings / Compliance: required KYC level dropdown; AML screening toggle; data retention policy dropdown; automatic credential expiry toggle + days input; geographic restrictions multi-select; require consent toggle; Save Compliance Settings
  - Settings / Danger Zone: Export All Data (ghost danger); Delete Organization (danger red with name-match confirmation modal)

---

### Operations & Configuration

- **Workflow Builder** — Visual drag-and-drop editor for verification decision flows
  - Route: `/workflows`
  - Key elements: Full-width canvas (`#0A1628` bg); left panel 240px (step palette: Verify Email, Verify Phone, KYC L1/L2/L3, AML Screen, Geo Restrict, Webhook, Wait; drag to add); right panel 280px (step inspector: condition builder, thresholds, action config); canvas `WorkflowCanvas` with node boxes (64×64px icons) connected by `1px #2A2A42` arrows; Zoom in/out controls; Save + Activate buttons in top bar; workflow name editable inline; version badge (Draft / Active / Archived); "Test Workflow" button launches a sandbox modal
  - States: empty canvas ("Drag your first step to get started"); step selected (right panel shows config); unsaved changes (amber dot on Save button); active workflow (read-only with "Edit" fork button)

- **Case Management / Review Queue** — Manual review queue for flagged verifications
  - Route: `/cases`
  - Key elements: Summary header (4 stat chips: Open, Assigned to Me, Escalated, Resolved Today); filter bar (status, assigned, priority, date, workflow source); main table (Case ID, DID, Risk Score, Flag Reason, Priority badge, Assigned Agent, Opened, SLA clock in amber when <2h remaining, actions); row click opens case detail side panel (480px) with full verification detail, reviewer notes textarea, resolution action buttons (Approve / Reject / Escalate + reason dropdown); "Assign to Me" quick-claim button; SLA timer
  - States: unassigned queue (all rows show "Unassigned" agent); case detail open (side panel slides in from right); resolved case (greyed row, resolution badge)

- **Supported Documents Config** — Configure which document types are accepted per workflow
  - Route: `/settings/documents`
  - Key elements: Country search + filter bar; document type grid by country (passport, driving license, national ID, residence permit rows per country); toggle switches to enable/disable per document type per country; "Accept All" / "Reject All" per country row; accuracy score badge (%) per document type; last-updated timestamp; Save Changes button; unsaved changes warning toast
  - States: global (show all 180+ countries); filtered by region; unsaved changes

- **Allow / Deny Lists** — Manage identity allowlists and blocklists
  - Route: `/lists`
  - Key elements: Two-tab layout (Allow List / Deny List); "Add Entry" button; table (DID or email or reference, List Type, Reason, Added by, Date, Expires, Remove action); search input; bulk import via CSV (modal: upload zone → preview 10 rows → confirm); export CSV; entry count badges on tabs; deny list row shows `DeniedPill` (red)
  - States: empty list ("No entries yet — add a DID, email, or reference"); entry expiry warning (amber expiry date in < 7 days); bulk import preview (modal with 10-row preview table + conflict warnings)

---

### End-User Hosted Flow

- **Liveness Verification Flow** — End-user-facing page; not the dashboard; mobile-optimized
  - Route: `/s/{session_id}` (e.g., `/s/vsn_9f8e7d6c`)
  - Key elements: Centered single-column (max-width 480px); 3-step progress bar (Document Upload → Liveness Check → Processing/Result); no sidebar; dark mode
  - Step 1 — Document Upload: document type selector (Passport/Driver's License/National ID pills); drag-and-drop upload zone (icon, instructions, file type/size); post-upload thumbnail preview with remove; quality rejection state (red border, feedback + "Try Again"); Continue button
  - Step 2 — Liveness Check: LivenessCamera with 8 states (idle, permission prompt, permission denied, calibrating, guiding, capturing, uploading, result); guide circle overlay; mobile-optimized (full-width feed, 240px guide circle diameter)
  - Step 3 — Processing → Result: CircularProgress (120px, brand gradient spinning ring); live checklist (document → liveness → validators → credential); success state (64px green check-circle with spring animation, "Verification Complete", credential summary, "You can now close this window"); failure state (64px red x-circle, reason text, "Try Again" + "Contact Support" buttons)
  - Viewport: 1440px desktop and 375px mobile both designed

---

### Universal Error / System States

- **404 / Not Found** — displayed when a route does not exist
  - Key elements: Large "404" (Display 96/700 `#242438`); "Page not found"; "Back to Dashboard" primary + "Go to Homepage" ghost
- **Rate Limit Warning** — amber full-width banner when API usage exceeds 80% of plan quota
- **Maintenance Mode** — full-screen overlay with scheduled maintenance message and status page link
- **Session Expired** — undismissable modal with "Sign In Again" primary button

---

## Marketing Pages (Light Mode)

### Public Marketing

- **Homepage** — Primary acquisition and trust-building landing page
  - Route: `/`
  - Key elements: Sticky nav (logo, nav links, Sign In + Start Free); dark hero section (H1 "KYC verification that respects users.", VerifyPreviewCard widget, trust chips, CTA buttons); Live Stats strip (48.7M verifications, 99.4% success rate, 1.4s avg, 180+ countries); Partner Logos (10 logos, desaturated); **CountryDocumentCoverage** (world map + 180+ countries supported, document type grid); **ReusableCredentialSection** (credential reuse explainer with flow diagram and savings calculator); How It Works 4-step flow; **InteractiveProductDemo** (live embedded demo widget — DID input → real-time verification simulation); Feature Grid (6 cards); Industry Verticals tab (Crypto, Fintech, Gaming, Healthcare); Compliance badges (GDPR, SOC 2, BIPA, Open Source); **CaseStudyPreview** (3 customer story cards with metrics); Testimonials (3 cards with metrics); Pricing Preview (pay-as-you-go table + subscription plan toggle); **ROICalculator** (interactive savings vs legacy KYC providers); Developer Quickstart (steps + code block); Email signup CTA; Footer (4 columns)
  - States: stats strip API down (static values, italic timestamp)

- **Pricing** — Full pricing page with comparison table and FAQ
  - Route: `/pricing`
  - Key elements: Header (monthly/annual toggle with "Save 20%" badge); 3 plan cards (Startup $99, Growth $499 featured, Enterprise custom); **VolumeDiscountCalculator** (slider: monthly verification volume → real-time per-unit cost and monthly total); **CompetitorPricingComparison** (table: Solidus vs Sumsub vs Persona vs Stripe Identity — per-verification cost, monthly minimum, credential reuse, open-source columns); **QueryExplainer** (collapsible cards for each query type: what counts as a query, pricing per type, examples); Feature comparison table (7 row groups, check/dash per plan); FAQ accordion (5 questions); Enterprise dark CTA section
  - States: monthly vs annual toggle (price values swap); volume slider (price updates in real-time)

- **Security & Compliance** — Trust center and compliance documentation
  - Route: `/security`
  - Key elements: Hero (H1 "Security & Compliance", architecture philosophy copy); Architecture Diagram (data flow: User Device → API Edge → Validators → Blockchain → DID Wallet, with TLS/hash/signature labels, red annotation "Document images processed + deleted"); Certifications Grid (8 badges: GDPR Current, SOC 2 Planned, ISO 27001 Planned, BIPA Current, MiCA Current, eIDAS 2 Current, FATF Current, PCI-DSS N/A); Privacy Principles (6 cards: Zero Biometric Storage, Data Minimization, User-Controlled Credentials, GDPR Right to Erasure, Consent-First, Open Source); **RegulatoryComplianceDetail** (MiCA, eIDAS 2, GDPR mapping tables with article cross-references, compliance status pills); **AuditReportsCard** (4 downloadable reports: Protocol Security Q1 2026, Open Source Audit Q4 2025, GDPR Assessment, Pen Test Summary — PDF + JSON per report); **BugBountySection** (scope, rewards table, disclosure timeline, HackerOne link, responsible disclosure policy)

- **Use Cases** — Industry-specific use case pages
  - Route: `/use-cases`
  - Key elements: Vertical tab layout (280px industry sidebar + content right); 8 industries; each: H1, metric callout, 3 use cases with icon/title/description/code snippet, customer quote, CTA
  - Industries: Crypto & DeFi (DEX gating, sybil-resistant airdrops, MiCA VASP), Fintech (account opening, PSD2 auth, AML onboarding), Gaming, Healthcare, Marketplaces, Gig Economy, Real Estate, Government

- **Enterprise** — Enterprise-tier product page
  - Route: `/enterprise`
  - Key elements: H1 "Enterprise KYC at any scale"; volume pricing table (1M+, 10M+, 100M+ tiers); white-label API section (branded verification flow screenshot); on-premise deployment architecture diagram; dedicated SLA section; compliance advisory (named advisor + calendar booking); enterprise customer logos grid; **MigrationGuideSection** (4-step migration guide from legacy KYC with effort estimates, code snippets, checklist); **SecurityQuestionnaireSection** (pre-filled enterprise security questionnaire PDF download + inline expandable Q&A for 8 common questions); contact form (name, company, monthly volume dropdown, message)

---

### New Marketing Pages

- **Reusable Credential** — How credential reuse works; developer and user-facing explainer
  - Route: `/reusable-credential`
  - Key elements: Hero (H1 "Verify Once. Use Everywhere.", credential passport visual, key stats); HowReuseWorks (3-step flow: first verification → credential issued → reuse at other apps); ReuseSavings (interactive counter: per-re-verification cost $0.05, savings vs re-doing full KYC); ForUsers section (user benefits: privacy, speed, control); ForDevelopers section (API call example, DID resolver SDK snippet); Consent + Revocation section; LiveReuseDemoCard (input a DID, shows mock credential reuse in 1.2s); CTA — Start Free + Read Docs

- **Changelog** — Product changelog and release notes
  - Route: `/changelog`
  - Key elements: Top bar (search, filter by product area, Subscribe to updates); ChangelogEntries (chronological list — date, version badge, entry type badge: New / Improved / Fixed / Deprecated; title + expanded description; code snippets for breaking changes); BreakingChangesAlert (amber banner pinned if any breaking change in last 30 days); RSSFeedLink; EmailSubscribeSection

- **Supported Documents** — Global document coverage database
  - Route: `/supported-documents`
  - Key elements: Hero (H1 "180+ countries. 12,000+ document types."); search input + region filter + document type filter; CountryGrid (alphabetical, each card: flag, country name, document count badge, click to expand); CountryDetail drawer (lists all accepted documents with accuracy scores, last-updated date, any known limitations); coverage statistics strip (180 countries, 12,000+ docs, 98.9% accuracy); Download Full List (CSV) button

- **Case Studies** — Customer success stories with metrics
  - Route: `/case-studies`
  - Key elements: Featured CaseStudy hero (large card with customer quote, metrics, logo); filter bar (industry, company size, use case); CaseStudyGrid (card per study: logo, customer name, industry badge, headline metric, 2-line summary, "Read Story →" link); each story page: full narrative, challenge/solution/results structure, metrics strip (verification volume, cost reduction %, time to market), CEO/CTO quote, CTA

- **Compliance / Regulatory Atlas** — Jurisdictional compliance guide
  - Route: `/compliance`
  - Key elements: Hero (H1 "Compliance in 180+ Jurisdictions"); JurisdictionSearch (search by country or regulation name); RegulationGrid (GDPR, MiCA, eIDAS 2, FATF, PSD2, BIPA, CCPA — each card: scope, status, how Solidus Verify addresses it); JurisdictionDetail drawer (per-country page: applicable regulations, AML requirements, document acceptance rules, data residency notes); ComplianceChecklist download (PDF per jurisdiction); RegulationUpdates feed (last 6 months of regulation changes)

- **Integrations** — Integration directory for third-party platforms
  - Route: `/integrations`
  - Key elements: Hero (H1 "Connect Solidus Verify to your stack"); search + category filter (CRM, Identity, Compliance, Communication, Analytics); IntegrationGrid (card per integration: logo, name, category badge, "Native" or "Webhook" badge, "Connect" or "Docs" CTA); FeaturedIntegrations row (Salesforce, HubSpot, Segment, Slack, PagerDuty); BuildYourOwn section (webhook + SDK links); IntegrationRequestForm (vote for or request new integrations)

- **Partners** — Partner ecosystem and reseller program
  - Route: `/partners`
  - Key elements: Hero (H1 "Build With Solidus Verify"); PartnerTypes section (3 cards: Technology Partners, Resellers, System Integrators — with criteria and benefits per type); FeaturedPartners grid (logos with tier badges: Platinum / Gold / Silver); PartnerBenefits table (revenue share, co-marketing, sandbox access, SLA priority per tier); ApplyForm (company name, type, monthly volume estimate, message); BecomeAPartner CTA

- **Compare** — Side-by-side comparison vs competitors
  - Route: `/compare`
  - Key elements: Hero (H1 "How does Solidus Verify compare?"); ComparisonTable (Solidus vs Sumsub, Onfido, Persona, Stripe Identity — rows: per-verification cost, monthly minimum, W3C credentials, on-chain anchoring, credential reuse, open-source, GDPR-native, avg completion time, global document coverage); FeatureCallouts (4 deep-dive sections on Solidus advantages); CustomerQuotes (3 migration testimonials); CTABand ("See pricing" + "Start Free")
