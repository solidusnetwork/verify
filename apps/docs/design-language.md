# Verify — Design Language

## Visual Personality

**Clinical, institutional, trustworthy.** This is where financial compliance happens. Every element communicates precision. The aesthetic is Stripe Dashboard meets Bloomberg Terminal — data-dense but organized, never overwhelming.

Status colors (green / amber / red) are the primary visual language. Tables are dense by design — compliance teams read tables, not cards. The brand gradient appears only on hero sections and featured cards; everywhere else is structural. No decorative elements without functional purpose.

Two modes:
- **App (authenticated dashboard):** Dark mode. `#0A1628` background. This is where work happens.
- **Marketing (public pages):** Light mode. `#FFFFFF` / `#F2F2F7` alternating sections. This is where trust is established.

## Color Application (product-specific usage of the design system)

### Background hierarchy (app, dark mode)
| Token | Hex | Use |
|-------|-----|-----|
| Background | `#0A1628` | Page background, top bar |
| Surface | `#1A1A2E` | Cards, sidebar, panels |
| Elevated | `#242438` | Table headers, inputs, hover states, secondary cards |
| Border | `#2A2A42` | All dividers, card borders, input borders |

### Text hierarchy
| Token | Hex | Use |
|-------|-----|-----|
| Primary | `#FFFFFF` | Headings, primary values, active nav items |
| Secondary | `#8E8E93` | Labels, captions, inactive nav items, descriptive text |
| Disabled | `#48484F` | Timestamps, placeholder text, truly inactive states |

### Semantic / action colors
| Token | Hex | Use |
|-------|-----|-----|
| CTA Blue | `#0066FF` | Primary buttons, links, active nav indicator, selected state borders |
| Lime | `#A8E600` | Step numbers in marketing, cost/savings callouts, trust chips |
| Cyan | `#00D4FF` | On-chain data (tx hashes, block numbers), live activity indicators |
| Success | `#34C759` | Verified status, positive deltas, delivered webhooks, green checkmarks |
| Warning | `#FF9500` | Pending status, sandbox mode banners, expiry warnings, failing endpoints |
| Error | `#FF3B30` | Failed status, revoked credentials, danger zone actions |

### Brand gradient
`linear-gradient(135deg, #A8E600 0%, #00D4FF 50%, #003366 100%)`
Used exclusively on: hero sections, the `CredentialCard` border-top accent, the `CostSavingsCard` border-top accent. Never on interactive elements or as background fills.

### Marketing light mode additions
| Token | Hex | Use |
|-------|-----|-----|
| Page BG | `#FFFFFF` | Primary marketing page background |
| Section Alt | `#F2F2F7` | Alternating section backgrounds |
| Text Dark | `#0A1628` | Marketing headings, high-contrast body |
| Text Mid | `#666666` | Marketing body text |
| Text Light | `#999999` | Legal captions, footnotes |
| Border Light | `#E0E0E5` | Card borders, dividers on light backgrounds |

### Status badge system
All status badges are pill-shaped (height 24px, horizontal padding 8px, `radius-full`, Caption 12/500):
- **Verified:** `rgba(52,199,89,0.15)` bg / `#34C759` text / `1px rgba(52,199,89,0.30)` border
- **Pending:** `rgba(255,149,0,0.15)` bg / `#FF9500` text / `1px rgba(255,149,0,0.30)` border
- **Failed:** `rgba(255,59,48,0.15)` bg / `#FF3B30` text / `1px rgba(255,59,48,0.30)` border
- **Processing:** `rgba(0,102,255,0.15)` bg / `#0066FF` text / `1px rgba(0,102,255,0.30)` border — spinning loader icon left
- **Revoked:** `rgba(142,142,147,0.15)` bg / `#8E8E93` text / `1px rgba(142,142,147,0.30)` border

## Typography Usage

System font: **Inter Variable** for all UI text. **JetBrains Mono** exclusively for machine-generated data.

### When to use JetBrains Mono
- All DID values (`did:solidus:mainnet:...`)
- Transaction hashes, block numbers
- API keys and secrets
- Monetary values in tables (cost cells)
- Timestamps in event/audit logs
- JSON code blocks in API docs
- Session IDs and reference codes

### Type scale used in product
| Name | Size/Weight | Use |
|------|------------|-----|
| Display | 96/700 | 404 page number only |
| H1 | 48/700 | Marketing hero headlines |
| H1 (app) | 36/700 | KPI card values (count-up animation on load) |
| H2 | 28/600 | Page titles in top bar |
| H2 (marketing) | 36–40/700 | Section headings |
| H3 | 22/600 | Card headings, section sub-titles |
| H3 (small) | 16–18/600 | Card section labels |
| Body | 16/400 | Marketing body text |
| Body (app) | 14/400 | App body text, table data |
| Small | 14/400–500 | Secondary labels, links |
| Caption | 12/400–500 | Timestamps, badges, helper text |
| Label (mono) | 13/400 | DID values, hashes in tables |
| Code | 14/400 | Code blocks (JetBrains Mono) |

### Letter-spacing patterns
- All-caps section labels: `letter-spacing: 0.04em` (table headers, "DEVELOPER" sidebar divider)
- Status labels in sidebar: `letter-spacing: 0.04em` ("SANDBOX" / "PRODUCTION" pill)
- Marketing overline labels: `letter-spacing: 0.08em` ("VERIFY.SOLIDUS.NETWORK", "TRUSTED BY...")

## Iconography Notes

Icon library: **Lucide Icons** at 20px for navigation and primary actions, 16px for inline/secondary actions, 14px for badge icons, 24px for feature grid cards, 48px for empty states.

**Color rules:**
- Active nav icon: `#0066FF`
- Inactive nav icon: `#8E8E93`
- Inline action icon (hover target): `#8E8E93` resting, `#FFFFFF` on row hover
- Empty state icon: `#8E8E93`
- Feature card icon (marketing): `#0066FF`
- Status / compliance icon: matches semantic color (`#34C759`, `#FF9500`, `#FF3B30`)
- On-chain / cyan accent icon: `#00D4FF`

**Key icon → meaning mappings (must be consistent):**
- `shield-check` → KYC Level 2, verification complete, compliance
- `shield-off` → revoke credential, disable
- `award` → credential / verifiable credential
- `key` → API key
- `webhook` → webhook endpoint
- `scroll-text` → audit log
- `bar-chart-2` → analytics
- `scan-face` → KYC Level 3, liveness check
- `user-check` → KYC Level 1
- `external-link` → link to block explorer (always inline, never replaces primary CTA)

## Key Component Patterns (specific to this product)

### Sidebar (240px)
Fixed left. Environment toggle directly below logo — the most important orientation signal in the app. The SANDBOX amber / PRODUCTION green pill must be immediately visible at all times to prevent accidental production actions.

### Status Badge
The most-used UI element in the product. Pill shape, translucent fill, matching text and border. All five states (Verified, Pending, Failed, Processing, Revoked) must be distinguishable in monochrome for accessibility. Processing state has a spinning loader replacing the left text spacing.

### KPICard
Used on Dashboard and Analytics. Always shows: label (all-caps Caption), value (H1 36/700 count-up animation on page load), delta row (arrow + percentage with green/red color), sparkline (80×24px mini area chart, `#0066FF` line). No fill on sparkline — just the line.

### Verification Steps Timeline
Vertical timeline with `2px #242438` connecting line. Each step: completed → `#34C759` circle-check; in-progress → `#0066FF` spinning loader; not-started → `#48484F` empty circle. Step names and timestamps always shown; confidence scores/validator details shown as sub-captions where relevant.

### CredentialCard (featured variant)
`border-top: 2px solid` with the brand gradient applied as a gradient border. `box-shadow: 0 0 24px rgba(0,212,255,0.15)`. Used exclusively for credential display — this is the product's premium UI moment.

### LiveStreamPanel (real-time feed)
8 visible items. New item entry: `translateY(-20px) → 0`, opacity 0→1, 200ms ease-out. Oldest item exits: opacity 1→0, 150ms. StatusDot pulse on the "Live" indicator: 6px circle, opacity 1→0.3→1 infinite 1.8s ease-in-out.

### WebhookDeliveryPanel
Has two states: "All Healthy" (green badge) and "1 Endpoint Failing" (amber badge). The degraded state shows a full-width alert strip inside the card before the table. This component appears on the Dashboard as a summary and has a dedicated full-screen version on `/webhooks`.

### BlockchainAnchorCard
Always uses `#00D4FF` (cyan) for transaction hashes and block explorer links. The `external-link` icon is 12px, inline with the hash text. This color choice uniquely signals "this data is on-chain and independently verifiable."

### Modal step progress indicator
3-step progress: active step = `#0066FF` circle with white number; completed step = `#34C759` circle with white checkmark; upcoming = `#242438` circle with `#48484F` number. Connecting lines: `1px #2A2A42`.

### Filter Bar pattern
Used on Verifications list and Credentials list. Always: search input (flex, max 280px) + dropdown filters (36px height, `#242438` bg, `1px #2A2A42` border) + active filter pills (with × remove) + "Clear all" link. Filter pills appear only when a filter is non-default.

### Table patterns
- Header row: `#242438` bg, Caption 12/500 `#8E8E93` all-caps, `letter-spacing: 0.04em`
- Data rows: `#1A1A2E` bg, `border-bottom: 1px #242438`, row hover → `#242438` bg 150ms
- Row height: 48px (standard), 36px (compact, e.g., webhook delivery log)
- Selected row: `Fill: rgba(0,102,255,0.06)`, `border-left: 3px #0066FF`
- Bulk actions replace the filter bar when ≥1 row selected: `rgba(0,102,255,0.08)` fill, blue border

## Motion & Animation Notes

All transitions in the app are fast and functional — never decorative.

| Interaction | Duration | Easing | Notes |
|-------------|----------|--------|-------|
| Button hover | 150ms | — | Background/color change only |
| Modal open | 220ms | ease-out | scale(0.97)→1.0 + translateY(8px)→0 + overlay fade |
| Modal close | 180ms | ease-in | Reverse of open |
| Panel slide-in (credential detail) | 280ms | ease-out | From right |
| Nav item hover | 150ms | — | Background fade |
| KPI count-up | 800ms | ease-out | Number counts from 0 to value on page load |
| Check-circle success (modal) | 350ms | spring cubic-bezier(0.34,1.56,0.64,1) | scale 0→1.1→1.0 — the one moment of expressiveness |
| Live stream item entry | 200ms | ease-out | translateY(-20px)→0, opacity 0→1 |
| Live stream item exit | 150ms | — | opacity 1→0 |
| Skeleton loader | 1.5s | linear infinite | Shimmer on `#242438` bg before data loads |
| Toast slide-in | 250ms | ease-out | From right |
| Toast auto-dismiss | 4s | — | After 4s, fade out |
| DID validation debounce | 400ms | — | After typing stops |

## Dos and Don'ts

**Do:**
- Use status colors to communicate state — they are the primary visual language
- Show JetBrains Mono for any machine-generated string (DIDs, hashes, keys, amounts)
- Keep the brand gradient to hero sections and featured credential cards
- Use the blockchain anchor card (cyan theme) whenever referencing on-chain data
- Show confidence scores and validator details as sub-captions in the verification timeline — precision matters to compliance teams
- Apply the `box-shadow: 0 0 24px rgba(0,212,255,0.15)` glow only on the credential card — it signals this is the "issued" moment
- Use empty states with functional CTAs ("Add your first webhook →") rather than decorative illustrations
- Keep table density high — compliance teams scan tables; don't add padding just to fill space

**Don't:**
- Don't use the brand gradient as a button background or text fill
- Don't use decorative icons or illustrations without functional purpose
- Don't use Univia Pro anywhere in the UI — it is for the logo only; Inter is the system font
- Don't add animations that delay task completion — every transition should feel instant or near-instant
- Don't use light mode anywhere in the authenticated app — only marketing pages use light mode
- Don't hide status indicators — the environment toggle (sandbox/production) must always be visible in the sidebar; never collapse it
- Don't use monetary values in sans-serif — all dollar amounts in tables use JetBrains Mono
- Don't design empty states as dead ends — always provide one actionable path forward
- Don't use opacity alone to convey disabled state — combine with `cursor: not-allowed` and muted color
