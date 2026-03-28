# Verify — New Marketing Pages (A1–A8)

All pages are public marketing pages. Light mode only. NavBar shared with existing marketing pages.
Viewport: 1440px wide. Container: max-width 1200px, 120px horizontal padding.
Font: Inter Variable. Monospace: JetBrains Mono.

---

## Shared: NavBar (sticky, all 8 pages)

Height 72px. Background `#FFFFFF`. `border-bottom: 1px #E0E0E5`. Position sticky, top 0, z-index 100.

Layout: horizontal, space-between, 120px horizontal padding.

Left: Solidus logomark SVG 24px + "Solidus Verify" wordmark Body 15/600 `#0A1628`.

Center nav links (gap 32px): "Product" / "Pricing" / "Security" / "Docs" — Small 14/400 `#666666`. Hover: `#0A1628`, 150ms. Active page: `#0A1628`, 500 weight.

Right (gap 12px): "Sign In" ghost button — 40px height, `border: 1px #E0E0E5`, 8px radius, Small 14/500 `#0A1628`, padding 0 16px. "Start Free" primary button — 40px height, `#0066FF` bg, white Small 14/600, 8px radius, padding 0 16px.

---

## Shared: Footer (all 8 pages)

Background `#0A1628`. Padding 80px 120px 48px. Color `#FFFFFF`.

Top: 5-column grid. Col 1: Solidus logomark + wordmark + tagline Caption 12/400 `#8E8E93` "The identity layer of the internet." + copyright Caption 12/400 `#48484F` "© 2026 Solidus Foundation."

Col 2 — Product: links to /pricing, /security, /use-cases, /enterprise, /changelog. Col 3 — Developers: /docs, /docs/quickstart, /integrations, GitHub. Col 4 — Company: /partners, /case-studies, /compliance, /compare. Col 5 — Legal: Privacy Policy, Terms of Service, Cookie Policy, DPA.

All footer links: Caption 13/400 `#8E8E93`. Hover: `#FFFFFF`, 150ms.

Divider: `1px #2A2A42` margin-top 48px.

Bottom strip below divider: compliance badges row left (GDPR · SOC 2 · ISO 27001 · MiCA · eIDAS 2 · FATF — each a small pill: `#1A1A2E` bg, `1px #2A2A42` border, Caption 11/400 `#8E8E93`, 4px radius, padding 3px 8px) + right: "Status: Operational" dot + text Caption 12/400 `#34C759`.

---

## Marketing Screen: Reusable Credential

**Route:** `verify.solidus.network/reusable-credential`
**Mode:** Light. Background alternates `#FFFFFF` / `#F2F2F7`.

---

### Section 1: Hero

Background `#0A1628`. Padding 120px 120px 100px. Full width.

Layout: two-column, gap 80px.

**Left column (600px):**

Overline label: Caption 12/500 `#A8E600` letter-spacing 0.08em uppercase: "CORE DIFFERENTIATOR"

H1 56/700 white, line-height 1.1, margin-top 12px:
"One verification.\nA lifetime of trust."

Body 18/400 `#8E8E93` margin-top 20px max-width 520px:
"Verify once with Solidus — your credential travels with you across every integrated service. No re-uploads. No waiting. No paying $15 again."

Metric row margin-top 32px, gap 40px:
- "$0.05" H2 36/700 `#A8E600` + Caption 12/400 `#8E8E93` "per credential reuse"
- "$5.00" H2 36/700 white + Caption 12/400 `#8E8E93` "one-time verification"
- "vs. $5–20" Caption 14/400 `#8E8E93` "traditional re-KYC cost"

CTA row margin-top 40px, gap 12px:
- Primary: "Start Issuing Credentials" `#0066FF` bg, white 14/600, 48px height, 8px radius, padding 0 24px.
- Ghost: "View Technical Docs" `transparent` bg, `border: 1px rgba(255,255,255,0.20)`, white 14/500, same height.

**Right column (520px):**

Credential Portability Diagram — `#1A1A2E` bg, `border: 1px #2A2A42`, 16px radius, padding 32px.

Top node — user avatar circle 48px `#242438` + Small 13/500 white "User verified once" + Caption 11/400 `#8E8E93` "Government ID + Liveness · $5.00" — centered, below: Solidus credential badge pill `rgba(168,230,0,0.15)` bg `#A8E600` text "W3C Verifiable Credential · BBS+ Signed".

Arrow down `#2A2A42` 2px with chain icon `#00D4FF` centered.

Center: DID Wallet node — `#242438` bg 12px radius padding 16px 24px, icon/award 24px `#00D4FF` + Body 14/600 white "DID Wallet" + Caption 12/400 `#8E8E93` "On-chain · Permanent · Yours". Glow: `box-shadow: 0 0 24px rgba(0,212,255,0.15)`.

Arrow down splits into 3 branches (fork lines `#2A2A42` 1px).

Three destination nodes — each `#242438` bg, 8px radius, padding 12px 16px, width ~140px, gap 12px centered:

Node A: icon/bar-chart-2 20px `#0066FF` + Small 13/600 white "DEX Protocol" + Caption 11/400 `#8E8E93` "Credential check" + pill `rgba(52,199,89,0.15)` `#34C759` Caption 11/500 "$0.05 / reuse"

Node B: icon/credit-card 20px `#0066FF` + Small 13/600 white "Fintech App" + Caption 11/400 `#8E8E93` "Account opening" + pill `rgba(52,199,89,0.15)` `#34C759` Caption 11/500 "$0.05 / reuse"

Node C: icon/gamepad-2 20px `#0066FF` + Small 13/600 white "Gaming Platform" + Caption 11/400 `#8E8E93` "Age verification" + pill `rgba(52,199,89,0.15)` `#34C759` Caption 11/500 "$0.05 / reuse"

Crossed-out "$5.00" red `#FF3B30` strikethrough beside each node's price — Caption 11/400 `#8E8E93`: "vs. $5–15 re-KYC"

---

### Section 2: How Credential Portability Works

Background `#F2F2F7`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` letter-spacing 0.08em uppercase: "HOW IT WORKS"

H2 36/700 `#0A1628` margin-top 12px: "Three steps. One credential."

Body 18/400 `#666666` margin-top 12px max-width 560px: "Solidus replaces the repeat-KYC cycle with a portable, cryptographically-verified credential you control."

Steps row: 3-column grid, gap 32px, margin-top 56px.

**Step 1 card** — `#FFFFFF` bg, `border: 1px #E0E0E5`, 12px radius, padding 32px. Top: lime step pill — H3 14/700 `#A8E600` `rgba(168,230,0,0.12)` bg `border: 1px rgba(168,230,0,0.25)` "01". Icon: icon/scan-face 40px `#0066FF`. H3 22/600 `#0A1628` margin-top 16px: "Verify with Solidus". Body 16/400 `#666666` margin-top 8px: "Submit your government-issued ID and complete a 5-second liveness check. One-time process. $5.00 for KYC L2. The system never stores your face scan after processing." Metric chip margin-top 20px: `rgba(0,102,255,0.06)` bg `border: 1px rgba(0,102,255,0.15)` 8px radius padding 8px 12px — icon/clock 14px `#0066FF` + Caption 13/400 `#0A1628`: "~90 seconds to complete"

**Step 2 card** — same styling. Step pill "02". Icon: icon/award 40px `#00D4FF`. H3: "Credential issued to your wallet". Body: "Your identity is cryptographically signed and issued as a W3C Verifiable Credential. It's written to your DID wallet on the Solidus blockchain — permanent, tamper-proof, and controlled only by you." Metric chip: icon/shield-check `#34C759` + "BBS+ signed · on-chain anchor"

**Step 3 card** — same styling. Step pill "03". Icon: icon/zap 40px `#A8E600`. H3: "Present instantly, anywhere". Body: "When any Solidus-integrated service needs to verify you, you present your credential — no re-upload, no waiting, no new forms. The verifying service pays $0.05 per query. You pay nothing." Metric chip: icon/repeat 14px `#A8E600` + Caption 13/400 `#0A1628`: "1-click re-use · $0.05 per presentation"

---

### Section 3: Cost Savings Calculator

Background `#FFFFFF`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em: "COST CALCULATOR"

H2 36/700 `#0A1628`: "See how much you save"

Body 18/400 `#666666` margin-top 12px: "Drag the slider to your monthly re-verification volume and see your projected savings."

Calculator card: `#F2F2F7` bg, `border: 1px #E0E0E5`, 12px radius, padding 40px, margin-top 48px. Max-width 800px, centered.

Slider label row: Small 14/500 `#0A1628` "Monthly re-verifications" + right: current value display H2 28/700 `#0066FF` (dynamic, e.g. "50,000").

Range slider: full-width, 0 to 1,000,000 range, thumb `#0066FF` 20px circle, track `#E0E0E5` 6px height, filled portion `#0066FF`. Labels below: "0" · "250K" · "500K" · "750K" · "1M" — Caption 12/400 `#999999`.

Comparison grid: 2-column, gap 24px, margin-top 32px.

**With Solidus card** — `#FFFFFF` bg `border: 1px rgba(52,199,89,0.30)` 12px radius padding 24px. H3 16/600 `#34C759`: "With Solidus". Row: "Initial verifications" + value Caption `#0A1628`. Row: "Re-verifications @ $0.05" + value `#34C759` Body 16/700. Row divider `1px #E0E0E5`. Row: "Monthly total" + H2 28/700 `#0A1628` (calculated). Row: "Annual total" + Body 16/400 `#666666`.

**Without Solidus card** — `#FFFFFF` bg `border: 1px rgba(255,59,48,0.20)` 12px radius padding 24px. H3 16/600 `#FF3B30`: "Traditional KYC". Row: "Initial verifications" + value `#0A1628`. Row: "Re-verifications @ $12.50 avg." + value `#FF3B30` Body 16/700. Row divider. Row: "Monthly total" + H2 28/700 `#0A1628`. Row: "Annual total" + Body 16/400 `#666666`.

Savings callout — full-width `#0A1628` bg 12px radius padding 24px margin-top 24px. Center: Caption 12/500 `#8E8E93` uppercase "YOU SAVE" + H1 48/700 `#A8E600` "(calculated $)" + Body 16/400 white "per month" + Body 14/400 `#8E8E93` "compared to traditional re-KYC at an average of $12.50 per re-verification."

Footnote Caption 12/400 `#999999` margin-top 16px centered: "Estimates based on industry average re-verification cost of $12.50. Actual savings vary by provider and volume."

---

### Section 4: Technical Architecture

Background `#F2F2F7`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em: "UNDER THE HOOD"

H2 36/700 `#0A1628`: "W3C Verifiable Credentials + BBS+ Signatures"

Body 18/400 `#666666` margin-top 12px max-width 600px: "Solidus credentials follow the W3C VC Data Model 2.0. BBS+ signatures enable selective disclosure — users can prove attributes without revealing everything."

Two-column layout, gap 64px, margin-top 56px.

**Left (580px): Code block**

`#0A1628` bg, `border: 1px #2A2A42`, 12px radius, padding 0. Top bar: `#1A1A2E` bg, `border-bottom: 1px #2A2A42`, padding 12px 20px, flex space-between. Left: 3 macOS-style dots (12px circles: `#FF5F57` / `#FEBC2E` / `#28C840`). Right: Caption 12/400 `#8E8E93` "credential.json". Code body padding 24px, JetBrains Mono 13/400, line-height 1.6:

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://solidus.network/vc/identity/v1"
  ],
  "type": ["VerifiableCredential", "KYCCredential"],
  "issuer": "did:solidus:mainnet:0x7a3f...c291",
  "issuanceDate": "2026-03-17T14:22:00Z",
  "credentialSubject": {
    "id": "did:solidus:mainnet:0xb4e2...9f01",
    "kycLevel": 2,
    "nationality": "DE",
    "ageVerified": true,
    "pepScreened": true
  },
  "proof": {
    "type": "BbsBlsSignature2020",
    "verificationMethod": "did:solidus:mainnet:...",
    "proofValue": "z5...Kw=="
  }
}
```

Syntax highlighting: keys `#00D4FF`, strings `#A8E600`, numbers `#FF9500`, brackets `#8E8E93`.

**Right (520px): Architecture explanation cards**

3 `ExplainCard` components, gap 16px:

Card A — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 20px 24px. icon/layers 20px `#0066FF`. H3 16/600 `#0A1628` "W3C VC Data Model 2.0" margin-top 8px. Body 14/400 `#666666` "Credentials follow the open W3C standard — compatible with any conformant verifier worldwide. Not a proprietary format."

Card B — Same styling. icon/eye-off 20px `#0066FF`. H3 "Selective Disclosure via BBS+". Body "Using BBS+ signatures, users can prove they are over 18 without revealing date of birth — or prove nationality without sharing address. The credential holder chooses what to share."

Card C — Same styling. icon/link 20px `#00D4FF`. H3 "On-Chain Anchor". Body "Every credential issuance event is anchored to the Solidus blockchain with a transaction hash. Verifiers can independently confirm issuance without contacting Solidus."

---

### Section 5: Use Cases

Background `#FFFFFF`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em: "USE CASES"

H2 36/700 `#0A1628`: "Where portable credentials change everything"

3-column grid, gap 24px, margin-top 48px.

**Card: DeFi Re-authentication** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 32px. icon/shuffle 40px `#0066FF` `rgba(0,102,255,0.08)` bg 12px radius padding 10px. H3 20/600 `#0A1628` margin-top 20px: "DeFi Re-authentication". Body 15/400 `#666666` margin-top 8px: "DEX protocols require MiCA-compliant KYC before swaps above €1,000. With Solidus credentials, users who already verified with any partner service pass instantly — no wallet friction, no new KYC forms." Metric chip margin-top 20px: `rgba(168,230,0,0.08)` bg `border: 1px rgba(168,230,0,0.20)` padding 6px 12px 8px radius — Body 13/600 `#A8E600`: "100ms credential check"

**Card: Cross-Exchange KYC Sharing** — same card styling. icon/repeat 40px. H3: "Cross-Exchange KYC Sharing". Body: "A user verified on Exchange A can onboard to Exchange B with a single credential presentation. Exchange B saves $12–18 per user in KYC costs. Both exchanges share FATF Travel Rule compliance data without sharing PII." Metric chip: "96% cost reduction per shared user"

**Card: Fintech Account Linking** — same card styling. icon/link-2 40px. H3: "Fintech Account Linking". Body: "Open banking and PSD2 account aggregation require identity verification at every new service. Portable Solidus credentials satisfy PSD2 SCA requirements while eliminating per-app re-KYC — users link five accounts, verify once." Metric chip: "2–3 day onboarding → 90 seconds"

---

### Section 6: Comparison Table

Background `#F2F2F7`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em: "COMPARISON"

H2 36/700 `#0A1628`: "Reusable credentials vs. traditional repeated KYC"

Full-width table card, margin-top 48px: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius overflow hidden.

Table header row: `#F2F2F7` bg, `border-bottom: 1px #E0E0E5`, height 48px. Columns: Feature (left, 35%) | Traditional KYC (center, 32.5%) | Solidus Reusable (center, 32.5%). Header cells: Caption 12/500 `#666666` uppercase letter-spacing 0.04em. "Solidus Reusable" column header has `#0066FF` text + `rgba(0,102,255,0.04)` column bg.

Rows — each height 52px, `border-bottom: 1px #E0E0E5`, Body 14/400. `#0A1628` feature text, `#666666` value text. Alternating row bg: `#FFFFFF` / `#FAFAFA`. Solidus column has `rgba(0,102,255,0.04)` bg tint throughout.

Row 1 — Cost per re-verification: "~$5–20 per user" `#FF3B30` | "$0.05 per presentation" `#34C759` Body 14/600

Row 2 — User data stored: "Full PII on vendor servers" `#FF3B30` | "Zero biometric data stored" `#34C759`

Row 3 — Re-verification time: "2–5 business days" `#FF9500` | "< 100ms credential check" `#34C759`

Row 4 — GDPR exposure: "High — multiple data processors" `#FF3B30` | "Minimal — user holds credential" `#34C759`

Row 5 — Cross-platform: "Not supported — silo per vendor" `#FF3B30` | "Native — any Solidus integrator" `#34C759`

Row 6 — Standard: "Proprietary, vendor lock-in" `#8E8E93` | "W3C VC Data Model 2.0" `#34C759`

Row 7 — Audit trail: "Vendor-held, opaque" `#8E8E93` | "Blockchain-anchored, independent" `#34C759`

Status icons prefix values: `#34C759` check-circle 14px for Solidus, `#FF3B30` x-circle 14px for Traditional negatives, `#FF9500` alert-triangle 14px for warnings.

---

### Section 7: Developer Integration

Background `#FFFFFF`. Padding 100px 120px.

Section label: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em: "FOR DEVELOPERS"

H2 36/700 `#0A1628`: "Two lines to request a credential presentation"

Body 18/400 `#666666` margin-top 12px max-width 560px: "The Verify SDK handles all credential negotiation, cryptographic verification, and on-chain confirmation. You write the business logic."

Two-column layout, gap 64px, margin-top 48px.

**Left (560px): Code block**

Same code block styling as Section 4. File label: "verify-credential.js"

```javascript
import { VerifyClient } from '@solidus/verify-sdk';

const client = new VerifyClient({ apiKey: process.env.SOLIDUS_API_KEY });

// Request credential presentation from a DID
const result = await client.credentials.present({
  did: 'did:solidus:mainnet:0xb4e2...9f01',
  scope: ['kycLevel', 'nationality', 'ageVerified'],
  minimumLevel: 2
});

if (result.verified) {
  // User is verified — proceed with onboarding
  console.log(`KYC Level: ${result.claims.kycLevel}`);
  console.log(`Cost: $${result.cost}`); // → "$0.05"
}
```

Syntax highlighting: keywords `#00D4FF`, strings `#A8E600`, comments `#48484F`, functions `#0066FF`.

**Right (520px): three feature rows**

`DeveloperFeatureRow` component × 3, gap 16px:

Row A: icon/zap 20px `#0066FF` + H3 16/600 `#0A1628` "< 100ms response time" + Body 14/400 `#666666` "Credential verification resolves in under 100ms — synchronous, in the request lifecycle."

Row B: icon/shield-check 20px `#34C759` + H3 16/600 `#0A1628` "Cryptographic proof, not a database lookup" + Body 14/400 `#666666` "Every verification call validates the BBS+ signature and on-chain anchor. No central authority required."

Row C: icon/code 20px `#0066FF` + H3 16/600 `#0A1628` "SDKs: JavaScript · Python · Go" + Body 14/400 `#666666` "OpenAPI spec available. REST API for any language. Webhooks for async events."

Links row margin-top 32px: "View SDK docs →" Body 14/500 `#0066FF` + separator `·` `#E0E0E5` + "API Reference →" Body 14/500 `#0066FF`

---

### Section 8: CTA

Background `#0A1628`. Padding 100px 120px.

Centered. H2 40/700 white: "Start issuing portable credentials today."

Body 18/400 `#8E8E93` margin-top 16px max-width 520px centered: "Join the identity layer of the internet. Verify users once. Let them reuse their credentials everywhere."

CTA row margin-top 40px, gap 12px, centered: "Start Free Trial" primary `#0066FF` 48px + "Talk to Sales" ghost `border: 1px rgba(255,255,255,0.20)` white 48px.

Trust strip margin-top 40px, gap 32px, centered: Caption 13/400 `#8E8E93`: "No credit card required" · "99.4% success rate" · "180+ countries"

---

## Marketing Screen: Changelog

**Route:** `verify.solidus.network/changelog`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 56px.

Breadcrumb row: Caption 12/400 `#666666` "Docs" + icon/chevron-right 12px `#999999` + "Changelog" `#0A1628`. Margin-bottom 24px.

H1 48/700 `#0A1628`: "Changelog"

Body 18/400 `#666666` margin-top 12px: "What's new in Solidus Verify."

Right-aligned (absolute right 120px, same top line as H1): RSS feed link row — icon/rss 16px `#FF9500` + Small 14/400 `#0066FF` "RSS Feed" — `#FFF9F0` bg `border: 1px rgba(255,149,0,0.25)` 8px radius padding 6px 12px height 32px.

Divider: `1px #E0E0E5` margin-top 48px.

---

### Section 2: Changelog Feed

Background `#FFFFFF`. Padding 0px 120px 80px.

Two-column layout: left sticky sidebar (240px) + main feed (flex-grow, max-width 800px, margin-left 80px).

**Left sidebar (sticky top 88px):**

H3 13/600 `#666666` uppercase letter-spacing 0.06em margin-bottom 16px: "JUMP TO"

Year group: Body 15/600 `#0A1628` "2026" + indent month links: "March" / "February" — each Caption 13/400 `#666666` hover `#0066FF`. Active link: `#0066FF`.

Filter label H3 13/600 `#666666` uppercase margin-top 32px margin-bottom 12px: "FILTER"

Filter pills (wrap): "All" `#0A1628` bg white text (active) / "New Feature" `rgba(0,102,255,0.08)` bg `#0066FF` text / "Improvement" `rgba(52,199,89,0.08)` bg `#34C759` text / "Bug Fix" `rgba(255,149,0,0.08)` bg `#FF9500` text / "Breaking Change" `rgba(255,59,48,0.08)` bg `#FF3B30` text — each pill: 24px height padding 0 10px 6px radius Caption 12/500. Click toggles the filter.

**Right feed:**

`ChangelogEntry` × 5, each separated by `1px #E0E0E5` divider with 40px vertical spacing.

---

**Entry 1 — v2.4.1**

Date badge: Body 14/500 `#0A1628` "March 17, 2026" + below it version pill — JetBrains Mono 12/500 `#F2F2F7` bg `border: 1px #E0E0E5` 6px radius padding 4px 10px: "v2.4.1"

Type tags row (gap 8px): pill "New Feature" — `rgba(0,102,255,0.10)` bg `#0066FF` text `border: 1px rgba(0,102,255,0.20)` 6px radius Caption 12/600 padding 3px 8px.

H3 22/600 `#0A1628` margin-top 12px: "Workflow Builder (Beta)"

Body 16/400 `#666666` margin-top 8px: "Build custom verification flows without writing code. The Workflow Builder is now available in beta for all Growth and Enterprise accounts."

Bullet list (margin-top 12px, gap 8px, Body 15/400 `#666666`, icon/chevron-right 14px `#0066FF` prefix each):
- "Drag-and-drop step sequencing — Document Upload, Liveness, AML screening, custom webhooks"
- "Conditional branching: route users through different verification tiers based on geography or risk score"
- "Live preview mode: simulate the verification experience before deploying to production"
- "Export workflow as YAML for version control and CI/CD integration"

"See docs →" link: Small 14/500 `#0066FF` icon/external-link 14px right, margin-top 16px.

---

**Entry 2 — v2.4.0**

Date/version same pattern — "March 10, 2026" / "v2.4.0". Tag: "New Feature" blue.

H3: "KYC L3 Enhanced Screening: PEP + Adverse Media"

Body: "KYC Level 3 verification now includes Politically Exposed Person (PEP) screening and adverse media analysis across 200+ news sources in 40 languages, powered by real-time data feeds."

Bullets:
- "PEP database covers 1.4M+ individuals across 240 jurisdictions, updated daily"
- "Adverse media screening scans global news, court records, and regulatory announcements"
- "Results surfaced in the verification detail panel with source links and confidence scores"
- "Configurable sensitivity threshold in Settings → Compliance for your risk appetite"
- "FATF Recommendation 12 compliant out of the box"

"See docs →" link.

---

**Entry 3 — v2.3.2**

"February 28, 2026" / "v2.3.2". Tag: "Improvement" — `rgba(52,199,89,0.10)` bg `#34C759` text `border: 1px rgba(52,199,89,0.20)`.

H3: "Liveness Detection Accuracy Improvement"

Body: "Our liveness model has been updated following a six-week retraining cycle on a broader and more demographically diverse dataset."

Bullets:
- "False positive rate reduced from 2.1% to 0.8% — 61% improvement"
- "Performance improvements for users with glasses, facial hair, and varying skin tones"
- "Low-light performance improved: detection now reliable down to 40 lux ambient lighting"
- "No changes to the API or SDK — improvement is automatic"

---

**Entry 4 — v2.3.1**

"February 20, 2026" / "v2.3.1". Tag: "Bug Fix" — `rgba(255,149,0,0.10)` bg `#FF9500` text `border: 1px rgba(255,149,0,0.20)`.

H3: "Webhook Retry Logic Fixed"

Body: "A bug introduced in v2.3.0 caused webhook retries to use a fixed 30-second interval instead of the documented exponential backoff. This has been corrected."

Bullets:
- "Exponential backoff now correctly applied: 30s → 2m → 8m → 32m → 128m → stop"
- "Retry count now displayed accurately in the Webhooks delivery log"
- "Existing failing endpoints will automatically resume correct retry behavior — no action needed"
- "Webhook delivery SLA metrics recalculated retroactively from Feb 15 onward"

---

**Entry 5 — v2.3.0**

"February 14, 2026" / "v2.3.0". Tag: "New Feature" blue.

H3: "Geographic Restrictions in Compliance Settings"

Body: "Compliance teams can now configure per-country blocking directly in the dashboard, without engineering support. Blocked countries return a structured error response to your API."

Bullets:
- "Country multi-select in Settings → Compliance → Geographic Restrictions"
- "Supports allow-list mode (only these countries) and block-list mode (all except these)"
- "Returns HTTP 451 Unavailable For Legal Reasons with structured JSON body including user-visible reason"
- "Audit log records all geographic restriction changes with actor and timestamp"
- "Pre-built OFAC and EU sanctions block-lists available as one-click templates"

"See docs →" link.

---

### Section 3: Subscribe

Background `#F2F2F7`. Padding 80px 120px.

Centered card: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 48px. Max-width 560px.

icon/mail 40px `#0066FF` `rgba(0,102,255,0.08)` bg 12px radius padding 10px — centered.

H2 28/700 `#0A1628` margin-top 20px centered: "Get changelog updates by email"

Body 16/400 `#666666` margin-top 8px centered: "One email per release. No marketing. Unsubscribe any time."

Form margin-top 28px: horizontal row gap 8px, max-width 440px centered. Email input: flex-grow, 48px height, `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 0 16px, Body 15/400 `#0A1628`, placeholder `#999999` "you@company.com", focus `border: 1px #0066FF`. Subscribe button: 48px height `#0066FF` bg white 14/600 8px radius padding 0 24px no-shrink.

Success state (after submit): icon/check-circle 24px `#34C759` + Body 15/500 `#0A1628` "You're subscribed." — replaces form, centered.

Caption 12/400 `#999999` margin-top 12px centered: "We send 1–3 emails per month. Unsubscribe in one click."

---

## Marketing Screen: Supported Documents

**Route:** `verify.solidus.network/supported-documents`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 56px.

H1 48/700 `#0A1628`: "Supported Documents"

Body 18/400 `#666666` margin-top 12px max-width 640px: "Every document type and country we support — with real-time accuracy data for your compliance team."

Stat strip margin-top 32px, horizontal row gap 48px:

Each stat — `#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 16px 24px. H2 32/700 `#0A1628` + Caption 13/400 `#666666` label below.

- "11,000+" / "Document types accepted"
- "183" / "Countries covered"
- "847" / "Document template variants"
- "99.1%" / "Average recognition rate"

---

### Section 2: Filter / Search Bar

Background `#FFFFFF`. Padding 0 120px 32px.

Filter bar: `#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 16px 20px. Horizontal row, gap 12px, align-items center.

Search input (flex-grow max-width 320px): icon/search 16px `#999999` left inside + placeholder `#999999` "Search country or code…" Body 14/400 + right: flag autocomplete dropdown appears as user types — `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius shadow `0 4px 16px rgba(0,0,0,0.08)` — each row: flag emoji 20px + country name Body 14/400 `#0A1628` + ISO code Caption 12/400 `#666666`. Input styling: `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius 40px height padding 0 12px 0 36px.

Document type dropdown: 40px height `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 0 12px, icon/chevron-down 14px right. Body 14/400 `#0A1628` value. Options: "All Document Types" / "Passport" / "National ID" / "Driver's License" / "Residence Permit" / "Bank Statement".

Divider: `1px #E0E0E5` vertical 24px height.

Region pills row (gap 8px): "All" (active: `#0A1628` bg white text) / "Europe" / "Americas" / "APAC" / "Africa" / "Middle East" — inactive: `#FFFFFF` bg `border: 1px #E0E0E5` `#0A1628` text. Each pill: 32px height 8px radius padding 0 14px Body 14/500. Click selects; active pill fills `#0A1628`.

Results count Caption 13/400 `#666666` right end: "Showing 183 countries"

---

### Section 3: Country Grid

Background `#FFFFFF`. Padding 0 120px 80px.

Masonry-like responsive grid: auto-fill, `minmax(160px, 1fr)`, gap 16px.

**CountryCard component** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 16px. Width 160px height 120px. Hover: `border: 1px #0066FF` `box-shadow: 0 2px 8px rgba(0,102,255,0.08)` 150ms. Cursor pointer.

Layout: centered vertically and horizontally. Flag emoji 40px. Country name H3 14/600 `#0A1628` margin-top 8px. Accepted count Caption 12/400 `#666666` margin-top 2px (e.g. "4 types accepted"). Status dot 8px circle bottom-right corner: green `#34C759` (accepted) / amber `#FF9500` (partial) / red `#FF3B30` (blocked).

**Sample country cards:**

🇺🇸 United States · 4 types · green
🇩🇪 Germany · 4 types · green
🇬🇧 United Kingdom · 4 types · green
🇫🇷 France · 3 types · green
🇧🇷 Brazil · 3 types · green
🇯🇵 Japan · 3 types · green
🇦🇺 Australia · 3 types · green
🇮🇳 India · 2 types · green
🇨🇳 China · 2 types · amber
🇮🇳 Indonesia · 2 types · green
🇲🇽 Mexico · 3 types · green
🇰🇷 South Korea · 3 types · green
🇨🇦 Canada · 4 types · green
🇿🇦 South Africa · 2 types · green
🇳🇬 Nigeria · 2 types · amber
🇹🇷 Turkey · 3 types · green
🇦🇪 UAE · 3 types · green
🇸🇦 Saudi Arabia · 2 types · green
🇰🇵 DPRK · Blocked · red dot · card bg `rgba(255,59,48,0.03)` border `rgba(255,59,48,0.20)`, "Blocked" Caption 11/500 `#FF3B30` replaces type count
🇮🇷 Iran · Blocked · same blocked styling

Show "View all 183 countries" text button below grid: Body 14/500 `#0066FF` centered, arrow icon right.

---

### Section 4: Expanded Country Detail

Background `#F2F2F7`. This section appears below the grid when a country card is clicked — it slides in (max-height 0 → content height, 300ms ease-out). Padding 40px 120px.

Top bar: `border: 1px #E0E0E5` `#FFFFFF` bg 12px radius top, padding 16px 24px. Flex space-between. Left: flag emoji 28px + H3 20/600 `#0A1628` country name + Caption 13/400 `#666666` region. Right: icon/x 20px `#999999` close button, hover `#0A1628`.

Content: 4-column grid gap 24px, padding 24px, `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius (bottom corners only).

Col A — "Accepted Document Types": list of document types with icon and spec. Each row: icon/file-text 16px `#0066FF` + Body 14/500 `#0A1628` doc type + Caption 12/400 `#666666` variants count.

Example (Germany):
- Passport · 3 variants (biometric, pre-2017, emergency)
- National ID (Personalausweis) · 2 variants (current, pre-2010)
- Driver's License (Führerschein) · EU format + pre-EU format
- Residence Permit (Aufenthaltstitel) · 4 variants

Col B — "Verification Accuracy": each doc type + accuracy bar. Bar: `#F2F2F7` bg 8px radius height 8px, filled portion `#34C759`. Accuracy % Caption 12/600 `#0A1628` right of bar.
- Passport 99.7%
- National ID 99.4%
- Driver's License 98.1%
- Residence Permit 97.8%

Col C — "Special Requirements": list with icon/alert-circle 16px `#FF9500`:
- "MRZ (machine-readable zone) required"
- "Both sides of national ID required"
- "Document must be valid — no expired docs accepted"

Col D — "Regulations": icon/shield 16px `#0066FF` + regulation pills: "GDPR" · "AMLD6" · "eIDAS 2" · "BaFin". Each pill `rgba(0,102,255,0.08)` bg `#0066FF` text Caption 12/500 8px radius padding 3px 8px.

---

### Section 5: Accuracy by Document Type

Background `#F2F2F7`. Padding 80px 120px.

H2 32/700 `#0A1628`: "Document Verification Accuracy"

Body 16/400 `#666666` margin-top 8px: "Average accuracy rates by document type and region, measured over the last 90 days across 12M+ verification sessions."

Full-width table card: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius overflow hidden. Margin-top 40px.

Header row: `#F2F2F7` bg `border-bottom: 1px #E0E0E5` height 44px. Columns: Document Type | Europe | Americas | APAC | Africa | Middle East | Overall — Caption 12/500 `#666666` uppercase letter-spacing 0.04em.

Rows (height 48px, `border-bottom: 1px #E0E0E5`, alternating `#FFFFFF` / `#FAFAFA`):
- Passport: 99.7% | 99.5% | 99.6% | 98.8% | 99.2% | **99.5%** `#34C759` 14/600
- National ID: 99.4% | 98.9% | 98.7% | 97.2% | 98.6% | **98.9%**
- Driver's License: 98.1% | 98.4% | 97.8% | 96.4% | 97.6% | **97.9%**
- Residence Permit: 97.8% | 97.2% | 97.0% | 95.8% | 96.4% | **96.9%**
- Bank Statement: 95.2% | 94.8% | 94.1% | 92.7% | 93.9% | **94.5%**

Overall column cells: `#34C759` 14/600 weight. Cells below 97%: `#FF9500` color. Body 14/400 `#0A1628` for other cells.

Footer caption: Caption 12/400 `#999999` padding 12px 24px: "Data from 90-day rolling window, March 2026. Accuracy defined as correct data extraction + validity determination."

---

### Section 6: Request a Document Type

Background `#FFFFFF`. Padding 80px 120px.

Two-column layout, gap 80px.

**Left (480px):**

H2 32/700 `#0A1628`: "Don't see your document type?"

Body 16/400 `#666666` margin-top 12px: "We add new document types based on demand. Submit a request and our document engineering team will review it — most requests resolved within 30 days."

Trust chips row margin-top 24px, gap 16px:
- icon/clock 16px `#0066FF` + Body 14/400 `#666666` "30-day average turnaround"
- icon/mail 16px `#0066FF` + Body 14/400 `#666666` "Email confirmation on acceptance"

**Right (560px): Request form card**

`#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 32px.

H3 18/600 `#0A1628` "Request a Document Type"

Form fields (margin-top 24px, gap 16px):

Country: label Caption 12/500 `#666666` + search input (same style as filter bar search, with flag autocomplete).

Document type: label + text input placeholder "e.g. Residence Permit, Military ID, Voter ID".

Use case description: label + textarea 80px height, resize none, same input styling, placeholder "Describe your use case and the countries you serve…".

Your email: label + email input placeholder "you@company.com".

Submit button: full-width 48px height `#0066FF` bg white 14/600 8px radius "Submit Request".

Success state: icon/check-circle 40px `#34C759` centered + H3 18/600 `#0A1628` "Request submitted" + Body 14/400 `#666666` "We'll review your request and email you within 5 business days."

---

## Marketing Screen: Case Studies

**Route:** `verify.solidus.network/case-studies`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 64px.

Overline: Caption 12/500 `#0066FF` letter-spacing 0.08em uppercase "CUSTOMER STORIES"

H1 48/700 `#0A1628` margin-top 12px: "Real teams. Real results."

Body 18/400 `#666666` margin-top 16px max-width 600px: "How compliance and engineering teams across crypto, fintech, gaming, and healthcare are using Solidus Verify to cut costs and ship faster."

Metrics strip margin-top 48px: 4-column grid `#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 28px 0. Each metric centered: H2 36/700 `#0066FF` + Caption 13/400 `#666666`.

- "1B+" / "Verifications processed"
- "96%" / "Average cost reduction"
- "< 2 days" / "Average integration time"
- "0" / "Biometric data breaches" — "0" in `#34C759`

---

### Section 2: Featured Case Study

Background `#FFFFFF`. Padding 0 120px 64px.

`FeaturedCaseCard` — full-width `#0A1628` bg 16px radius padding 48px. Horizontal layout, gap 64px.

**Left (60%):**

Caption 12/500 `#8E8E93` uppercase letter-spacing 0.08em "FEATURED CASE STUDY"

Company nameplate margin-top 16px: `#FFFFFF` bg `border: 1px #2A2A42` 8px radius padding 8px 16px inline-flex — Body 14/600 white "TrustLayer Exchange" + industry pill `rgba(168,230,0,0.15)` `#A8E600` Caption 12/500 "Crypto & DeFi" margin-left 8px.

H2 36/700 white margin-top 24px line-height 1.2: "How TrustLayer Exchange reduced KYC cost by 95%"

Metric callout margin-top 20px: two side-by-side chips.
- Chip A: `rgba(255,59,48,0.10)` bg `border: 1px rgba(255,59,48,0.20)` 8px radius padding 12px 16px. Caption 12/400 `#8E8E93` "Before" + H2 24/700 `#FF3B30` "$8.50" + Caption 12/400 `#8E8E93` "per user KYC cost"
- Arrow icon/arrow-right 20px `#8E8E93`
- Chip B: `rgba(168,230,0,0.10)` bg `border: 1px rgba(168,230,0,0.25)` 8px radius padding 12px 16px. Caption 12/400 `#8E8E93` "After" + H2 24/700 `#A8E600` "$0.40" + Caption 12/400 `#8E8E93` "per user KYC cost"

Quote block margin-top 32px: `border-left: 3px #0066FF` padding-left 20px. Body 18/400 white italic: "We processed 2 million verifications last month and paid less than we used to pay for 100,000. Solidus is the only KYC infrastructure that gets more cost-efficient the more you use it." Attribution row margin-top 12px: Caption 13/500 `#8E8E93` "— Karim Mansour, Head of Compliance, TrustLayer Exchange"

CTA row margin-top 32px: "Read full case study →" Small 14/600 `#0066FF` + icon/arrow-right 14px.

**Right (40%):**

Dashboard mockup card: `#1A1A2E` bg `border: 1px #2A2A42` 12px radius padding 24px. Simulate a cost savings panel — H3 14/600 `#8E8E93` uppercase "COST SAVINGS · THIS MONTH". H1 36/700 `#A8E600` "$4,200,000". Caption 12/400 `#8E8E93` "vs. $88,000,000 traditional KYC". Green area mini-chart placeholder 200×80px `#34C759` 20% opacity line graph. Stat row: "2,000,000 verifications" `#FFFFFF` 14/600 + "$0.40 avg. cost" `#34C759` 14/600.

---

### Section 3: Industries Filter + Case Grid

Background `#F2F2F7`. Padding 64px 120px 80px.

H2 32/700 `#0A1628` margin-bottom 24px: "More customer stories"

Filter tabs row: gap 8px. "All" / "Crypto & DeFi" / "Fintech" / "Gaming" / "Healthcare" / "Marketplaces" — each: 36px height `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 0 16px Body 14/500 `#666666`. Active: `#0A1628` bg white text. Hover: `#F2F2F7` bg.

Grid: 3-column, gap 24px, margin-top 32px.

**`CaseCard` component** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 24px. Hover: `border: 1px #0066FF` `box-shadow: 0 4px 16px rgba(0,102,255,0.08)` 150ms.

Layout: company logo placeholder (32px height max, `#F2F2F7` bg `border: 1px #E0E0E5` 8px radius padding 6px 12px, Body 13/600 `#0A1628` name as fallback) + industry tag pill right-of-logo. H3 18/600 `#0A1628` margin-top 16px. Key metric chip margin-top 8px: `rgba(0,102,255,0.06)` bg `border: 1px rgba(0,102,255,0.12)` 6px radius padding 6px 10px Body 13/600 `#0066FF`. Body 14/400 `#666666` description margin-top 10px (2-3 lines). "Read case study →" link margin-top 16px: Small 14/500 `#0066FF`.

**6 case cards:**

1. **TrustLayer Exchange** — "Crypto & DeFi" · "95% cost reduction" · "Migrated 1.4M existing users in 72 hours. Re-verification costs dropped from $8.50 to $0.40 per user."

2. **Sterling Fintech** — "Fintech" · "Integration in 48 hours" · "From signed contract to first live verification in under two days. Zero compliance blockers."

3. **Generali DeFi** — "Infrastructure" · "3 weeks → 2 days" · "Reduced validator onboarding from 21 days to 2 days by eliminating per-chain re-KYC with portable credentials."

4. **NexusPay** — "Payments" · "2M verifications/month" · "Processing 2 million monthly verifications at $0.05 per re-use, with 99.6% success rate across 47 countries."

5. **ShieldGaming** — "Gaming" · "100% GDPR compliant" · "Age verification at account creation, with zero biometric data stored — critical for COPPA and EU law compliance."

6. **MediVerify** — "Healthcare" · "HIPAA + BIPA compliant" · "Patient identity verification that satisfies both HIPAA identity proofing and Illinois BIPA biometric data law requirements."

---

### Section 4: Submit Story CTA

Background `#FFFFFF`. Padding 80px 120px.

Two-column layout, gap 80px, align-items center.

**Left (480px):**
H2 32/700 `#0A1628` "Building with Solidus Verify?"
Body 16/400 `#666666` margin-top 12px: "Share your story. We'll write the case study, design the assets, and promote your team's work to 40,000+ developers and compliance professionals."

Benefits list margin-top 24px, gap 12px: icon/check-circle 16px `#34C759` + Body 14/400 `#666666` each:
- "Featured on solidus.network/case-studies"
- "LinkedIn feature post from @SolidusNetwork"
- "Co-branded PDF case study for your sales team"
- "Optional: joint press release"

**Right (520px): form card**

`#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 32px.

H3 18/600 `#0A1628` "Tell us about your project"

Fields (gap 16px, margin-top 20px):
- Company name + your name (two 50% columns gap 12px)
- Your role (input)
- Website (input)
- Monthly verifications (dropdown: "< 10K" / "10K–100K" / "100K–1M" / "1M+")
- Key result you'd like to highlight (textarea 80px)
- Email (input)

Submit: full-width 48px `#0066FF` bg white 14/600 "Submit Your Story"

---

## Marketing Screen: Compliance / Regulatory Atlas

**Route:** `verify.solidus.network/compliance`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 64px.

Overline: Caption 12/500 `#0066FF` letter-spacing 0.08em uppercase "REGULATORY COVERAGE"

H1 48/700 `#0A1628` margin-top 12px: "Global KYC Regulatory Atlas"

Body 18/400 `#666666` margin-top 16px max-width 640px: "Country-by-country compliance requirements, how Solidus Verify satisfies them, and what you need to know before going live in each jurisdiction."

Stats row margin-top 40px, gap 32px: 3 inline stat chips `#F2F2F7` bg `border: 1px #E0E0E5` 10px radius padding 12px 20px:
- "183 jurisdictions mapped"
- "9 major regulatory frameworks"
- "Updated March 2026"
Each: icon/globe 16px `#0066FF` left + Caption 13/400 `#0A1628`.

---

### Section 2: Interactive World Map

Background `#F2F2F7`. Padding 64px 120px.

GeoMap card: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 0 overflow hidden.

Map header bar: padding 16px 24px `border-bottom: 1px #E0E0E5`. Flex space-between. Left: H3 16/600 `#0A1628` "Regulatory Complexity by Country". Right: legend row gap 16px — each: 10px circle + Caption 12/400 `#666666`. "Standard KYC" `#34C759` / "Enhanced Due Diligence Required" `#FF9500` / "High-Risk / Restricted" `#FF3B30` / "Blocked / Sanctioned" `#8E8E93`.

SVG world map 500px height, full container width. Country fills:
- Green `rgba(52,199,89,0.25)` with `#34C759` border 0.5px: EU countries, US, CA, AU, GB, JP, KR, SG, NZ, NO, CH
- Amber `rgba(255,149,0,0.25)` with `#FF9500` border: CN, IN, BR, MX, ZA, TR, UAE, SA, EG, NG, ID, PH, VN, UA, RU
- Red `rgba(255,59,48,0.25)` with `#FF3B30` border: AF, SD, SY
- Grey `rgba(142,142,147,0.20)`: KP, IR, CU, VE — blocked

Map interaction states:
- Country hover: fill intensifies (opacity 0.45), cursor pointer, tooltip appears (Caption 13px `#FFFFFF` bg `#0A1628` 6px radius padding 6px 10px shadow): country name + status label
- Country click: selected fill `rgba(0,102,255,0.20)` border `#0066FF` 1.5px → detail panel slides in from right

Control buttons (bottom-right of map, gap 8px): "+" / "−" / reset — each 32px square `#FFFFFF` bg `border: 1px #E0E0E5` 6px radius icon/zoom-in, icon/zoom-out, icon/maximize 16px `#666666`.

---

### Section 3: Country Detail Panel

Slide-in panel: 480px wide, attached to right edge of map card. Animates from right (translateX(480px) → 0, 280ms ease-out). `#FFFFFF` bg `border-left: 1px #E0E0E5`. Full height of map card.

Panel header: padding 20px 24px `border-bottom: 1px #E0E0E5`. Flex space-between. Left: flag emoji 24px + H3 20/600 `#0A1628` country name + Caption 12/400 `#666666` region. Right: icon/x 20px `#999999` close, hover `#0A1628`.

Panel scrollable content (padding 0 24px 24px):

**Example content — Germany:**

Region chip margin-top 20px: `rgba(0,102,255,0.08)` bg Caption 12/500 `#0066FF` "EU / Europe"

Section: "Regulatory Framework" — H3 13/600 `#666666` uppercase letter-spacing 0.06em margin-top 20px. Tags: "AMLD6" · "BaFin" · "eIDAS 2" · "GDPR" — each pill `#F2F2F7` bg `border: 1px #E0E0E5` Caption 12/500 `#0A1628` 6px radius padding 3px 8px. Gap 6px.

Section: "KYC Requirements vs. Solidus Coverage" — mini-table, 2 columns. Header: "Requirement" / "Solidus". Rows (40px height each, `border-bottom: 1px #F2F2F7`):
- Document verification / icon/check-circle 14px `#34C759` "Covered"
- Liveness check / icon/check-circle "Covered"
- PEP screening / icon/check-circle "Covered (L3)"
- Adverse media / icon/check-circle "Covered (L3)"
- Source of funds (>€15K) / icon/alert-circle 14px `#FF9500` "Manual — not automated"
- eIDAS 2 LoA High / icon/check-circle "Credential mapped"

Section: "Special Requirements" — H3 same style. List with icon/alert-circle 14px `#FF9500` prefix:
- "Enhanced Due Diligence required for PEP individuals"
- "Source of funds declaration required for transfers exceeding €15,000"
- "BaFin requires data residency in EU — Solidus EU region satisfies this"

Section: "Accepted Document Types" — pills: "Passport" · "National ID" · "Driver's License" · "Residence Permit" — `rgba(52,199,89,0.08)` bg `#34C759` text Caption 12/500.

"View Solidus implementation →" link Body 14/500 `#0066FF` margin-top 20px.

---

### Section 4: Regulations Directory

Background `#FFFFFF`. Padding 80px 120px.

H2 32/700 `#0A1628`: "Regulatory Frameworks We Support"

Body 16/400 `#666666` margin-top 12px max-width 600px: "How each major KYC and privacy regulation maps to Solidus Verify features."

Accordion component margin-top 40px. Two-level: Region → Regulations. Region headers are large accordion toggles.

**Region: European Union** — header: `#F2F2F7` bg `border: 1px #E0E0E5` 10px radius padding 16px 20px. icon/chevron-down 16px right. H3 18/600 `#0A1628` "European Union" + Caption 13/400 `#666666` "5 frameworks". Expanded: inner padding 0 0 8px.

Within EU, each regulation as `RegulationRow` — `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 16px 20px margin-top 8px:

**GDPR** — left: name H3 15/600 `#0A1628` + Caption 12/400 `#666666` "General Data Protection Regulation · EU · 2018" + status pill `rgba(52,199,89,0.10)` `#34C759` Caption 11/500 "SUPPORTED". Right: expand chevron. Expanded detail: Body 14/400 `#666666` brief description + "Solidus supports:" list of features with check-circle `#34C759` icons: "Zero biometric storage" / "Right to erasure via credential revocation" / "Consent-first verification flow" / "Data minimization by design" / "EU data residency option".

**AMLD6** — same row structure. "Anti-Money Laundering Directive 6 · EU · 2021". Solidus supports: "KYC L2 & L3 for CDD/EDD" / "PEP screening (L3)" / "Beneficial ownership capture" / "Audit trail blockchain-anchored".

**MiCA** — "Markets in Crypto-Assets Regulation · EU · 2024". Solidus supports: "CASP identity verification" / "Travel Rule data capture" / "VASP onboarding flow" / "eIDAS 2 credential compatibility".

**eIDAS 2** — "European Digital Identity · EU · 2024". Solidus supports: "W3C VC credentials mapped to LoA Substantial and High" / "Cross-border credential recognition" / "EUDI wallet compatibility path".

**DORA** — "Digital Operational Resilience Act · EU · 2025". Solidus supports: "ICT incident logging" / "Audit log tamper-evidence" / "SLA reporting for financial entities".

**Region: United States** — same structure. Regulations: BSA/AML (FinCEN, 1970/updated), BIPA (Illinois, 2008), CCPA (California, 2020).

**Region: Global** — FATF Travel Rule (Global, 2019): "FATF Recommendation 16 compliance" / "Originator and beneficiary data capture" / "Threshold detection ($1,000 / €1,000)".

---

### Section 5: Compliance Advisory CTA

Background `#0A1628`. Padding 80px 120px.

Two-column layout, gap 80px.

**Left (520px):**

H2 36/700 white: "Need help mapping regulations to your jurisdiction?"

Body 18/400 `#8E8E93` margin-top 16px: "Our compliance advisory team works with crypto exchanges, fintech platforms, and enterprise customers to document their KYC obligations and configure Solidus Verify accordingly."

Feature list margin-top 28px, gap 16px: icon/check-circle 16px `#A8E600` + Body 15/400 white each:
- "Jurisdiction-specific compliance gap analysis"
- "GDPR, MiCA, and FATF implementation review"
- "Regulatory change monitoring for your markets"
- "Co-sign on compliance documentation for auditors"

CTA row margin-top 36px gap 12px:
- Primary: "Talk to a Compliance Advisor" `#0066FF` bg white 48px 8px radius padding 0 24px Body 14/600.
- Ghost: `border: 1px rgba(255,255,255,0.20)` white 48px "Download Compliance Brief".

**Right (480px): advisory card**

`#1A1A2E` bg `border: 1px #2A2A42` 12px radius padding 32px.

H3 15/600 `#8E8E93` uppercase letter-spacing 0.06em "REQUEST COMPLIANCE GUIDANCE"

Form margin-top 20px, gap 14px:
- Company name + jurisdiction (50% / 50% row, gap 12px)
- Primary regulation concern (dropdown: "GDPR" / "MiCA" / "FATF Travel Rule" / "AML/BSA" / "eIDAS 2" / "BIPA" / "Other")
- Describe your situation (textarea 72px, `#242438` bg `border: 1px #2A2A42` `#FFFFFF` text placeholder `#48484F`)
- Work email (input same styling)

Submit: full-width 44px height `#0066FF` bg white 14/600 8px radius "Get Compliance Guidance"

Caption 12/400 `#48484F` margin-top 12px centered: "Response within 1 business day. Free for all accounts."

---

## Marketing Screen: Integrations

**Route:** `verify.solidus.network/integrations`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 64px.

Overline: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em "INTEGRATIONS"

H1 48/700 `#0A1628` margin-top 12px: "Connect Solidus Verify\nto your existing stack."

Body 18/400 `#666666` margin-top 16px max-width 600px: "Native integrations with the tools your compliance, operations, and engineering teams already use. Set up in minutes, not days."

Stat chips row margin-top 32px, gap 16px: "50+ integrations available" / "No-code setup for most tools" / "Webhook-compatible with any service" — each: `#F2F2F7` bg `border: 1px #E0E0E5` 10px radius padding 8px 16px Caption 13/400 `#0A1628` icon/check 14px `#34C759` left.

---

### Section 2: Category Filter Tabs

Background `#FFFFFF`. Padding 0 120px 32px.

Tab bar: horizontal row gap 8px. "All" / "CRM" / "Analytics" / "SIEM & Security" / "Collaboration" / "Payments" / "Developer Tools" — each: 36px height `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 0 16px Body 14/500 `#666666`. Active: `#0066FF` bg white text `border: 1px #0066FF`. Hover: `#F2F2F7` bg.

Results count Caption 13/400 `#666666` margin-left auto: "Showing 12 integrations"

---

### Section 3: Integrations Grid

Background `#FFFFFF`. Padding 0 120px 80px.

4-column grid, gap 20px.

**`IntegrationCard` component** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 24px. Hover: `border: 1px #0066FF` `box-shadow: 0 4px 16px rgba(0,102,255,0.08)` 150ms.

Layout: logo placeholder 48×48px `#F2F2F7` bg `border: 1px #E0E0E5` 10px radius centered-content (service initial or icon). Category pill right-aligned: Caption 11/500 specific-color. Service name H3 16/600 `#0A1628` margin-top 12px. Description Body 14/400 `#666666` margin-top 6px (1-2 lines). Feature bullets (gap 6px, margin-top 12px, Caption 13/400 `#666666`, icon/check 12px `#34C759` prefix). "Learn More →" Small 13/500 `#0066FF` margin-top 16px.

Category pill colors: CRM `rgba(0,102,255,0.10)` `#0066FF` / Analytics `rgba(168,230,0,0.10)` `#8BB000` / SIEM `rgba(255,59,48,0.10)` `#FF3B30` / Collaboration `rgba(52,199,89,0.10)` `#34C759` / Payments `rgba(0,212,255,0.10)` `#007A99` / Developer `rgba(142,142,147,0.10)` `#666666`.

**12 Integration Cards:**

1. **Salesforce** — CRM — "Automatically sync verified contacts and KYC status to Salesforce CRM objects." Bullets: "KYC level synced to contact record" / "Verification events trigger Salesforce flows" / "Bi-directional — update verification scope from SF"

2. **HubSpot** — CRM — "Push KYC events to HubSpot contact timelines and trigger workflows." Bullets: "Contact property: solidus_kyc_level" / "Deal stage automation on verification" / "Works with HubSpot Workflows"

3. **Zapier** — Developer Tools — "Connect Solidus events to 5,000+ apps without code." Bullets: "Trigger: verification.completed, credential.issued" / "Action: create verification session" / "No-code setup in Zapier dashboard"

4. **Slack** — Collaboration — "Receive real-time compliance alerts and verification summaries in Slack." Bullets: "Configurable channels per alert type" / "Daily digest or real-time mode" / "Alert: failure rate exceeded, webhook down"

5. **PagerDuty** — SIEM & Security — "Page on-call engineers when critical compliance thresholds are breached." Bullets: "Incident creation on webhook failure" / "P1/P2 routing based on severity" / "Auto-resolve on recovery"

6. **Datadog** — Analytics — "Ship webhook delivery metrics, verification volume, and API latency to Datadog." Bullets: "Custom dashboard template included" / "APM traces for verification sessions" / "Alert on success rate degradation"

7. **Segment** — Analytics — "Route KYC events to any analytics destination via Segment." Bullets: "Identity.identify() on verification complete" / "Track() events for each verification step" / "Compatible with Mixpanel, Amplitude, BigQuery"

8. **Stripe** — Payments — "Link Solidus KYC status to Stripe customer objects for compliant payment flows." Bullets: "Customer metadata: solidus_kyc_verified" / "Block payments on KYC expiry" / "Webhook-synced status updates"

9. **GitHub Actions** — Developer Tools — "Integration testing and CI/CD workflows for your KYC implementation." Bullets: "Sandbox environment for test runs" / "Pre-built workflow YAML templates" / "Assert credential issuance in CI"

10. **Notion** — Collaboration — "Sync compliance documentation and audit log summaries to Notion databases." Bullets: "Auto-update compliance runbook" / "Weekly verification summary page" / "Regulation change notes sync"

11. **Twilio** — Collaboration — "Send SMS verification links and KYC status notifications via Twilio Messaging." Bullets: "Templated SMS for verification redirects" / "Status updates to verified users" / "Supports WhatsApp Business"

12. **AWS S3** — Developer Tools — "Automatically back up audit logs and compliance reports to your S3 bucket." Bullets: "Encrypted export: AES-256 at rest" / "Daily/weekly schedule or on-demand" / "WORM-compatible for audit requirements"

---

### Section 4: Build an Integration

Background `#F2F2F7`. Padding 80px 120px.

H2 32/700 `#0A1628`: "Build with the Verify API"

Body 16/400 `#666666` margin-top 12px max-width 560px: "Any service that can receive an HTTP webhook or call a REST endpoint can integrate with Solidus Verify in hours."

3-column grid, gap 20px, margin-top 40px.

**Card: Webhooks** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 28px. icon/webhook 32px `#0066FF` `rgba(0,102,255,0.08)` bg 10px radius padding 8px. H3 18/600 `#0A1628` margin-top 16px "Webhooks". Body 14/400 `#666666` margin-top 8px "Any service that accepts HTTP POST requests can receive Solidus verification events. 20+ event types, HMAC-signed, with automatic retry." Links: "Webhook docs →" `#0066FF` 14/500

**Card: REST API** — icon/code 32px. H3 "REST API". Body "Full programmatic access to every Solidus resource — verifications, credentials, webhooks, team, billing. OpenAPI 3.1 spec available." "API Reference →"

**Card: SDKs** — icon/package 32px. H3 "Official SDKs". Body "First-party SDKs with TypeScript types, async/await, and full error handling." SDK pills: "JavaScript" · "Python" · "Go" · "React Native" — each `#F2F2F7` bg Caption 12/500 `#0A1628`. "SDK docs →"

---

### Section 5: Missing Integration CTA

Background `#FFFFFF`. Padding 64px 120px 80px.

Centered card: `#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 40px. Max-width 640px margin auto.

H2 26/700 `#0A1628` centered: "Don't see your tool?"

Body 15/400 `#666666` margin-top 8px centered: "Submit an integration request. We review requests weekly and prioritize by demand."

Form row margin-top 24px, gap 8px, max-width 480px centered: tool name input (flex-grow, 48px height, `#FFFFFF` bg `border: 1px #E0E0E5` 8px radius padding 0 16px placeholder "Tool or platform name") + "Request Integration" button 48px `#0066FF` bg white 14/600 8px radius padding 0 20px.

Caption 12/400 `#999999` margin-top 12px centered: "Top requests: Salesforce Einstein, Okta, Auth0, Notion AI, Linear"

---

## Marketing Screen: Partners

**Route:** `verify.solidus.network/partners`
**Mode:** Light.

---

### Section 1: Hero (Dark)

Background `#0A1628`. Padding 100px 120px.

Two-column layout, gap 80px.

**Left (580px):**

Overline: Caption 12/500 `#A8E600` letter-spacing 0.08em uppercase "PARTNER PROGRAM"

H1 52/700 white margin-top 12px line-height 1.1: "The Solidus\nPartner Program"

Body 20/400 `#8E8E93` margin-top 20px max-width 480px: "Grow your business by building on the identity layer of the internet. Earn revenue share, get co-marketing support, and gain access to a network of thousands of compliance-first builders."

CTA row margin-top 40px, gap 12px:
- Primary: "Become a Partner" `#0066FF` bg white 14/600 48px 8px radius padding 0 28px.
- Ghost: "View Partner Portal →" `border: 1px rgba(255,255,255,0.20)` white 48px 14/500 padding 0 24px.

Trust row margin-top 40px, gap 32px: icon/users 16px `#8E8E93` + Caption 13/400 `#8E8E93` "50+ active partners" | icon/globe 16px + "24 countries" | icon/trending-up 16px + "Avg. 30% revenue share"

**Right (480px):**

Partner tier preview card: `#1A1A2E` bg `border: 1px #2A2A42` 12px radius padding 32px.

Three tier rows with connecting line `2px dashed #2A2A42`:

Tier row A: icon/award 20px `#8E8E93` + Body 14/600 white "Referral" + Caption 12/400 `#8E8E93` "Silver" + right: "20% rev share" Caption 13/500 `#8E8E93`

Tier row B: icon/award 20px `#A8E600` + Body 14/600 white "Integration" + Caption 12/400 `#8E8E93` "Gold" + right: "30% rev share" Caption 13/500 `#A8E600`

Tier row C: icon/award 20px `#00D4FF` + Body 14/600 white "Strategic" + Caption 12/400 `#8E8E93` "Platinum" + right: "Custom" Caption 13/500 `#00D4FF`

---

### Section 2: Partner Tiers

Background `#F2F2F7`. Padding 100px 120px.

H2 36/700 `#0A1628` centered: "Choose your partnership level"

Body 16/400 `#666666` margin-top 12px max-width 560px centered: "Three tiers designed for different stages of partnership — from first referral to full strategic alliance."

3-column grid, gap 24px, margin-top 48px.

**`PartnerTierCard` component:**

All cards: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 32px.

**Referral (Silver):**
Top: tier badge pill `#F2F2F7` bg `border: 1px #E0E0E5` Caption 12/600 `#666666` "SILVER" padding 4px 10px 6px radius. H3 22/600 `#0A1628` "Referral". Revenue callout `rgba(0,102,255,0.06)` bg `border: 1px rgba(0,102,255,0.12)` 8px radius padding 12px 16px margin-top 12px: Caption 12/400 `#666666` "Revenue Share" + H2 28/700 `#0066FF` "20%" + Caption 12/400 `#666666` "on referred accounts · 12 months".
Benefits list (margin-top 20px, gap 10px): icon/check 14px `#34C759` + Body 14/400 `#0A1628` each:
- "20% revenue share for 12 months on referred accounts"
- "Access to partner marketing kit (logos, copy, case studies)"
- "Listed in Solidus partner directory"
- "Monthly partner newsletter with product updates"
Requirements section: H3 13/600 `#666666` uppercase margin-top 24px "REQUIREMENTS" + Body 14/400 `#666666` "2+ successful customer referrals per quarter"
CTA: "Join as Referral Partner" ghost button full-width 44px `border: 1px #E0E0E5` `#0A1628` 14/500 margin-top 24px.

**Integration (Gold) — featured:**
`border: 2px #0066FF` or `box-shadow: 0 0 0 2px #0066FF`. "Most Popular" pill: `#0066FF` bg white Caption 11/600 right-of-badge.
Tier badge: "GOLD" `rgba(168,230,0,0.12)` bg `#8BB000` text.
H3 "Integration". Revenue: "30%". Benefits:
- "30% revenue share + renewal commissions"
- "Co-marketing: joint blog posts, webinar opportunities"
- "Listed with featured placement in partner directory"
- "Product roadmap input — quarterly partner council"
- "Integration technical support during launch"
Requirements: "Published technical integration + 5+ active customers"
CTA: "Apply for Integration Partnership" primary `#0066FF` bg white 44px.

**Strategic (Platinum):**
Tier badge: "PLATINUM" `rgba(0,212,255,0.12)` bg `#007A99` text.
H3 "Strategic". Revenue callout: Caption 12/400 "Revenue Share" + H2 28/700 `#0A1628` "Custom" + Caption 12/400 `#666666` "negotiated per agreement".
Benefits:
- "Custom revenue share structure"
- "Joint go-to-market strategy and co-selling"
- "Dedicated partner manager — direct line"
- "Joint case studies and press releases"
- "Early access to beta features"
- "Executive business reviews (quarterly)"
Requirements: "By application only — enterprise-scale business"
CTA: "Apply for Strategic Partnership" ghost button full-width 44px.

---

### Section 3: Partner Types

Background `#FFFFFF`. Padding 80px 120px.

H2 32/700 `#0A1628` centered: "Who partners with Solidus?"

3-column grid, gap 24px, margin-top 48px.

**Type Card: Technology Partners** — `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius padding 28px. icon/cpu 40px `#0066FF` `rgba(0,102,255,0.08)` bg 12px radius padding 10px. H3 20/600 `#0A1628` margin-top 16px "Technology Partners". Body 14/400 `#666666` margin-top 8px "SaaS platforms, payments companies, and infrastructure providers that embed Solidus Verify as a native compliance layer for their customers." Requirements margin-top 16px — H3 13/500 `#666666` uppercase "TYPICAL PARTNERS" + Body 14/400 `#666666`: "Fintech SaaS · Crypto exchanges · Payment processors · Wallet providers"

**Type Card: Solution Integrators** — icon/briefcase 40px. H3 "Solution Integrators". Body "Consulting firms, compliance advisory practices, and system integrators that implement Solidus Verify for their clients and earn referral or project-based revenue." TYPICAL PARTNERS: "Big 4 consulting · RegTech advisors · Compliance agencies · Law firms"

**Type Card: Resellers** — icon/globe 40px. H3 "Regional Resellers". Body "Regional distributors and local market specialists who resell Solidus Verify to customers in markets where local presence and language support matter." TYPICAL PARTNERS: "APAC distributors · LATAM resellers · MENA compliance firms"

---

### Section 4: Current Partners

Background `#F2F2F7`. Padding 80px 120px.

H2 32/700 `#0A1628` centered "Trusted by teams building the future of compliance"

Partner logos grid: 4-column, gap 32px, margin-top 48px. Max-width 900px centered. Each logo: 120×48px container, `filter: grayscale(100%) opacity(0.5)`, hover `filter: none opacity(1)`, transition 200ms. Show 8 partner logo placeholders as `#E0E0E5` bg rounded rectangles with small centered Caption 12/400 `#999999` text: "Partner Logo".

---

### Section 5: Benefits Matrix

Background `#FFFFFF`. Padding 80px 120px.

H2 32/700 `#0A1628`: "What you get at each tier"

Full-width table card: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius overflow hidden margin-top 40px.

Header row: `#F2F2F7` bg `border-bottom: 1px #E0E0E5` height 52px. Columns: Benefit (left 40%) | Referral (Silver) (20%) | Integration (Gold) (20%) | Strategic (Platinum) (20%). Gold column header has `rgba(168,230,0,0.06)` bg tint.

Rows (52px height, `border-bottom: 1px #E0E0E5`, `#0A1628` feature name 14/400 left): alternating bg `#FFFFFF` / `#FAFAFA`. Center checkmark cells: icon/check-circle 16px `#34C759` for included, icon/minus 16px `#E0E0E5` for not included.

- Revenue share: 20% | 30% | Custom (text cells, not check/x)
- Co-marketing: ✗ | ✓ | ✓
- Product roadmap input: ✗ | ✓ | ✓
- Joint case studies: ✗ | ✗ | ✓
- Dedicated partner manager: ✗ | ✗ | ✓
- Partner directory listing: ✓ | Featured | Featured + priority
- Technical certification: ✗ | ✓ | ✓
- Executive business reviews: ✗ | ✗ | ✓ (quarterly)
- Early feature access: ✗ | Limited | Full

---

### Section 6: Application CTA

Background `#0A1628`. Padding 100px 120px.

Two-column layout, gap 80px.

**Left (480px):**

H2 36/700 white: "Ready to partner with Solidus?"

Body 16/400 `#8E8E93` margin-top 16px: "Applications are reviewed within 3 business days. We'll match you with the right tier and walk you through the onboarding process."

Quotes row margin-top 32px: `#1A1A2E` bg `border: 1px #2A2A42` 12px radius padding 24px. icon/quote 16px `#0066FF`. Body 14/400 white italic margin-top 8px: "Joining the Solidus Partner Program was the fastest enterprise sales motion we've ever run. First check arrived 3 weeks after signing." Caption 12/400 `#8E8E93` margin-top 12px "— Clara Mäkinen, CEO, RegStar Nordic"

**Right (560px): Application form card**

`#1A1A2E` bg `border: 1px #2A2A42` 12px radius padding 32px.

H3 18/600 white "Apply to Partner Program"

Form fields (gap 14px, margin-top 20px). All inputs: 44px height `#242438` bg `border: 1px #2A2A42` 8px radius padding 0 14px Body 14/400 white placeholder `#48484F`. Focus: `border: 1px #0066FF`.

- Company name + Website (50/50 row, gap 12px)
- Your name + title (50/50 row)
- Partner type radio group: 3 pill options "Referral" / "Integration" / "Strategic" — inactive: `#242438` bg `border: 1px #2A2A42` white text Caption 13/500; active: `#0066FF` bg/border white text; gap 8px.
- Annual revenue dropdown: "< $1M" / "$1M–$10M" / "$10M–$100M" / "$100M+"
- Description textarea 80px: placeholder "Tell us about your business and how you'd like to work with Solidus"
- Work email input

Submit: full-width 48px `#0066FF` bg white 14/600 "Submit Application"

Caption 12/400 `#48484F` margin-top 12px centered: "We review every application personally. Response within 3 business days."

---

## Marketing Screen: Compare

**Route:** `verify.solidus.network/compare`
**Mode:** Light.

---

### Section 1: Header

Background `#FFFFFF`. Padding 80px 120px 48px.

Overline: Caption 12/500 `#0066FF` uppercase letter-spacing 0.08em "COMPETITIVE COMPARISON"

H1 48/700 `#0A1628` margin-top 12px: "Solidus Verify vs. the competition"

Body 18/400 `#666666` margin-top 16px max-width 660px: "An honest, side-by-side comparison of Solidus Verify against Sumsub, Stripe Identity, Persona, and Onfido — including pricing, technology, compliance coverage, and privacy model."

Disclaimer caption margin-top 12px: icon/info 14px `#999999` + Caption 12/400 `#999999` "Competitor data sourced from public pricing pages and documentation as of March 2026. Subject to change."

---

### Section 2: Quick Navigation Tab Bar

Background `#FFFFFF`. Padding 0 120px 32px.

Tab bar: `#F2F2F7` bg `border: 1px #E0E0E5` 12px radius padding 6px. Inline-flex, gap 4px.

Tabs: "vs. Sumsub" | "vs. Stripe Identity" | "vs. Persona" | "vs. Onfido" | "vs. Veriff"

Each tab: 40px height, 8px radius, padding 0 18px, Body 14/500 `#666666`. Active: `#FFFFFF` bg `box-shadow: 0 1px 4px rgba(0,0,0,0.08)` `#0A1628` text. Hover: `rgba(255,255,255,0.60)` bg. Clicking scrolls to that competitor's section in the migration guide (Section 4), or filters the table to highlight that column.

---

### Section 3: Detailed Comparison Table

Background `#FFFFFF`. Padding 0 120px 80px.

H2 32/700 `#0A1628` margin-bottom 32px: "Full feature comparison"

Table card: `#FFFFFF` bg `border: 1px #E0E0E5` 12px radius overflow hidden.

**Sticky table header (position sticky top 72px z-index 10):**

Row height 56px. Column widths: Feature (24%) | Solidus Verify (19%) | Sumsub (19%) | Stripe Identity (19%) | Persona (19%).

"Solidus Verify" column header: `#0066FF` text Caption 12/600 uppercase + `rgba(0,102,255,0.06)` column bg tint throughout. Other headers: Caption 12/500 `#666666` uppercase. Veriff squeezed — show "Veriff" as a 5th column added when viewport allows or as a footnote row.

**Row group headers** — full-width row `#F2F2F7` bg `border-bottom: 1px #E0E0E5` height 36px padding 0 24px Body 13/600 `#0A1628` uppercase letter-spacing 0.04em.

---

**Row Group: PRICING**

Row — KYC L2 cost (52px height `border-bottom: 1px #E0E0E5`, alternating bg):
- Feature: "KYC L2 Verification" Body 14/400 `#0A1628`
- Solidus: JetBrains Mono 14/600 `#34C759` "$5.00" with chip `rgba(52,199,89,0.08)` bg 4px radius padding 2px 6px
- Sumsub: JetBrains Mono 14/400 `#0A1628` "~$12–20" + Caption 11/400 `#999999` "volume dep."
- Stripe Identity: JetBrains Mono 14/400 `#0A1628` "$1.50" + Caption 11/400 `#999999` "doc check only"
- Persona: JetBrains Mono 14/400 `#0A1628` "$3–8" + Caption 11/400 `#999999` "tier dep."
- Veriff: Body 14/400 `#999999` "Contact sales"

Row — Re-verification cost:
- Feature: "Re-verification cost"
- Solidus: JetBrains Mono 14/700 `#34C759` "$0.05" + Caption 11/500 `#34C759` "per presentation"
- Sumsub: Body 14/400 `#FF3B30` "Same as initial" + icon/x-circle 12px `#FF3B30`
- Stripe Identity: Body 14/400 `#FF3B30` "Same as initial"
- Persona: Body 14/400 `#FF3B30` "Same as initial"
- Veriff: Body 14/400 `#FF3B30` "Same as initial"

Row — Free tier:
- Solidus: icon/check-circle 14px `#34C759` + Body 14/400 `#0A1628` "100 verifications/month"
- Sumsub: icon/check-circle `#34C759` "Sandbox only"
- Stripe Identity: icon/check-circle `#34C759` "Test mode"
- Persona: icon/minus 14px `#E0E0E5` "No free tier"
- Veriff: icon/minus "No free tier"

Row — Enterprise pricing transparency:
- Solidus: icon/check-circle `#34C759` "Public volume table"
- Sumsub: icon/x-circle `#FF3B30` "Sales call required"
- Stripe Identity: icon/check-circle `#34C759` "Public page"
- Persona: icon/x-circle `#FF3B30` "Quote only"
- Veriff: icon/x-circle `#FF3B30` "Quote only"

---

**Row Group: TECHNOLOGY**

Row — On-chain credentials:
- Solidus: icon/check-circle `#34C759` "Native — Solidus chain"
- Sumsub: icon/x-circle `#FF3B30` "Not supported"
- Stripe Identity: icon/x-circle "Not supported"
- Persona: icon/x-circle "Not supported"
- Veriff: icon/x-circle "Not supported"

Row — W3C VC standard:
- Solidus: icon/check-circle `#34C759`
- Others: icon/x-circle `#FF3B30`

Row — BBS+ selective disclosure:
- Solidus: icon/check-circle `#34C759`
- Others: icon/x-circle `#FF3B30`

Row — Biometric data storage:
- Solidus: icon/check-circle `#34C759` "Zero — processed and deleted"
- Sumsub: icon/alert-triangle 14px `#FF9500` "Retained per contract"
- Stripe Identity: icon/alert-triangle `#FF9500` "Retained per policy"
- Persona: icon/alert-triangle `#FF9500` "Retained per policy"
- Veriff: icon/alert-triangle `#FF9500` "Retained per contract"

Row — Open source protocol:
- Solidus: icon/check-circle `#34C759` "Apache 2.0"
- Others: icon/x-circle `#FF3B30`

---

**Row Group: COMPLIANCE**

Rows: GDPR / SOC 2 / ISO 27001 / MiCA / eIDAS 2 / FATF Travel Rule

For each — Solidus always: icon/check-circle `#34C759`.

GDPR: All vendors have `#34C759` (all are GDPR-compliant as EU-serving businesses).

SOC 2: Sumsub `#34C759` / Stripe `#34C759` / Persona `#34C759` / Veriff `#34C759` / Solidus icon/alert-triangle `#FF9500` "Planned 2026"

ISO 27001: Sumsub `#34C759` / Stripe `#34C759` / Persona `#34C759` / Veriff `#34C759` / Solidus icon/alert-triangle `#FF9500` "Planned 2026"

MiCA: Solidus `#34C759` / Sumsub icon/alert-triangle `#FF9500` "Partial" / Stripe icon/x-circle `#FF3B30` / Persona icon/x-circle `#FF3B30` / Veriff icon/alert-triangle `#FF9500` "Partial"

eIDAS 2: Solidus `#34C759` / All others icon/x-circle `#FF3B30`

FATF Travel Rule: Solidus `#34C759` / Sumsub `#34C759` / Stripe icon/x-circle / Persona icon/alert-triangle / Veriff `#34C759`

---

**Row Group: FEATURES**

Rows: Workflow builder / Case management / Document types / Countries / API-first / SDK languages

Workflow builder: Solidus icon/check-circle `#34C759` "No-code, in beta" / Sumsub `#34C759` / Stripe icon/x-circle / Persona `#34C759` / Veriff icon/x-circle

Case management: All `#34C759`

Document types: Solidus "11,000+" `#34C759` / Sumsub "6,000+" / Stripe "33 countries" / Persona "5,000+" / Veriff "9,000+"

Countries: Solidus "183" `#34C759` / Sumsub "220" `#34C759` / Stripe "~35" / Persona "200+" / Veriff "190+"

API-first: All `#34C759`

SDK languages: Solidus "JS, Python, Go, React Native" / Sumsub "JS, iOS, Android" / Stripe "7 languages" / Persona "JS, iOS, Android" / Veriff "JS, iOS, Android"

---

**Row Group: PRIVACY**

Zero biometric storage: Solidus `#34C759` / All others `#FF3B30`

User-controlled credentials: Solidus `#34C759` / All others `#FF3B30`

Right to erasure: Solidus `#34C759` "Credential revocation" / All others icon/alert-triangle `#FF9500` "Process-based"

GDPR consent flow: All `#34C759`

---

Footnote row below table: `#F2F2F7` bg padding 12px 24px. Caption 11/400 `#999999`: "✓ Confirmed from public documentation · ~ Partial implementation · ✗ Not supported as of March 2026. This comparison is provided for informational purposes and may not reflect the latest product updates from competitors."

---

### Section 4: Migration Guides

Background `#F2F2F7`. Padding 80px 120px.

H2 32/700 `#0A1628` "Switching from another provider?"

Body 16/400 `#666666` margin-top 12px max-width 560px: "Migration is straightforward. Most teams are live within 2–3 days. Our team helps with data mapping, credential backfill, and cutover strategy."

Accordion: 5 items, margin-top 40px. Each item: `#FFFFFF` bg `border: 1px #E0E0E5` 10px radius. Collapsed: padding 20px 24px flex space-between — H3 16/600 `#0A1628` + icon/chevron-down 16px `#999999`. Expanded: border-bottom `1px #E0E0E5` + content padding 24px.

**Item: Migrating from Sumsub**

Timeline: "2–3 days to full cutover."

Content sections:

Migration overview — Body 14/400 `#666666`: "Sumsub stores verification records in their dashboard. You'll need to export existing user KYC status and decide whether to trust-migrate (carry forward Sumsub approvals) or re-verify all users on Solidus."

Steps list (gap 8px, icon/circle-dot 14px `#0066FF` prefix, Body 14/400 `#666666`):
1. "Export user list and KYC status from Sumsub dashboard (CSV export)"
2. "Map Sumsub approval levels to Solidus KYC levels (L1/L2/L3)"
3. "Use Solidus Bulk Import API to create credential records for trust-migrated users"
4. "Swap API endpoint in your backend from Sumsub → Solidus"
5. "Run parallel for 48 hours to confirm parity, then remove Sumsub"

Data format note: `#F2F2F7` bg `border: 1px #E0E0E5` 8px radius padding 12px 16px margin-top 12px: icon/file-text 14px `#0066FF` + Body 13/400 `#666666` "Sumsub exports in JSON and CSV. Solidus Bulk Import accepts both formats with a field mapping config."

Cost comparison example: two-row mini-table. "Current (Sumsub)" | "$15.00/user avg." vs "Solidus" | "$5.00 initial + $0.05/reuse" `#34C759`.

"Contact migration support →" link Body 14/500 `#0066FF`.

**Item: Migrating from Stripe Identity** — Timeline: "1 day." Note that Stripe Identity only supports document-only verification (no liveness), so migrating typically means an upgrade in verification depth. Steps parallel to above, noting Stripe's limited export options.

**Item: Migrating from Persona** — Timeline: "2–3 days." Note Persona's workflow system — export existing flows as reference for rebuilding in Solidus Workflow Builder.

**Item: Migrating from Onfido** — Timeline: "2–3 days." Note Onfido's SDK integration — Solidus SDK drop-in replacement with equivalent method signatures for common operations.

**Item: Migrating from Veriff** — Timeline: "1–2 days." Veriff uses session-based flows similar to Solidus — most direct migration path.

---

### Section 5: Independent Assessment

Background `#FFFFFF`. Padding 64px 120px.

Callout card: `#0A1628` bg 12px radius padding 40px. Max-width 820px centered.

icon/quote 28px `#0066FF` margin-bottom 16px.

H2 24/600 white italic line-height 1.5: "Solidus is the first KYC provider to treat credential portability as a first-class feature rather than an afterthought. The combination of W3C VC compliance, BBS+ selective disclosure, and on-chain anchoring puts it in a category of one."

Attribution row margin-top 20px: Caption 13/500 `#8E8E93` "— Compliance Technology Review, Q1 2026" + right: `#1A1A2E` bg `border: 1px #2A2A42` 6px radius padding 4px 10px Caption 11/500 `#8E8E93` "Independent Research"

---

### Section 6: Final CTA

Background `#F2F2F7`. Padding 80px 120px.

Centered. H2 40/700 `#0A1628`: "Ready to switch?"

Body 18/400 `#666666` margin-top 16px max-width 520px centered: "Join 1,000+ teams that chose portable, privacy-respecting KYC over repeated re-verification costs."

CTA row margin-top 40px, gap 12px, centered:
- "Start Free Trial" primary `#0066FF` bg white 48px 8px radius padding 0 28px Body 14/600. Note: "100 free verifications — no credit card".
- "Talk to Sales" ghost `border: 1px #E0E0E5` `#0A1628` 48px 14/500 padding 0 24px.

Trust chips margin-top 32px, gap 32px, centered: Caption 13/400 `#666666`: "No credit card required" · "Migration support included" · "99.4% success rate" · "180+ countries"
