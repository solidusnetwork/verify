## Insertions Into Existing Pages — verify.solidus.network

This file contains new sections to be inserted into existing pages. Organized by destination page and insertion position. All app screens follow dark mode conventions. All marketing pages follow light mode conventions. Design tokens, component specs, and interaction patterns follow the same standards as `prototype-web.md`.

---

## PART D: Dashboard Screen Modifications

---

### D1: Risk Score Column — Verifications List (insert into Screen 3 table columns)

**Insertion point:** Insert `RiskScoreBadge` as a new column between the "Status" column and the "Country" column in the Verifications table in Screen 3.

#### New Column Spec

| Column | Width | Spec |
|--------|-------|------|
| Risk | 100px | `RiskScoreBadge` component — score integer 0–100 + text label "Low" / "Medium" / "High" |

#### RiskScoreBadge Component

`RiskScoreBadge` — Horizontal Auto Layout, spacing 6px, Alignment Center. Height 24px, horizontal padding 8px, `radius-full`.

Score color tiers:
- **Low (0–30):** `Fill: rgba(52,199,89,0.12)`, `Border: 1px rgba(52,199,89,0.25)`, Caption 11/600 `#34C759`. Example: "Low 12"
- **Medium (31–70):** `Fill: rgba(255,149,0,0.12)`, `Border: 1px rgba(255,149,0,0.25)`, Caption 11/600 `#FF9500`. Example: "Medium 64"
- **High (71–100):** `Fill: rgba(255,59,48,0.12)`, `Border: 1px rgba(255,59,48,0.25)`, Caption 11/600 `#FF3B30`. Example: "High 87"

Layout inside badge: score number Caption 11/700 (the number) + space + label Caption 11/500 ("Low" / "Medium" / "High"). Single pill. No icon.

#### Updated Sample Row Data (8 rows — add risk scores)

Add one `RiskScoreBadge` value per row, inserted between Status and Country in the existing 8-row sample dataset:

1. did:solidus:mainnet:7a3b... / KYC L2 / Verified / **Low 12** / 🇺🇸 US / 1.8s / $5.00 / 2026-03-17 14:32
2. did:solidus:mainnet:4f2e... / Email / Verified / **Low 8** / 🇩🇪 DE / 0.3s / $0.10 / 2026-03-17 14:31
3. did:solidus:mainnet:2c9d... / KYC L2 / Pending / **Medium 64** / 🇬🇧 GB / — / $5.00 / 2026-03-17 14:30
4. did:solidus:mainnet:b8a3... / Phone / Verified / **Low 5** / 🇧🇷 BR / 0.5s / $0.20 / 2026-03-17 14:28
5. did:solidus:mainnet:3e7c... / KYC L3 / Failed / **High 87** / 🇰🇷 KR / 14.2s / $20.00 / 2026-03-17 14:25
6. did:solidus:mainnet:9f1a... / KYC L1 / Verified / **Low 19** / 🇸🇬 SG / 1.1s / $1.00 / 2026-03-17 14:22
7. did:solidus:mainnet:5b2d... / Email / Verified / **Low 23** / 🇫🇷 FR / 0.4s / $0.10 / 2026-03-17 14:19
8. did:solidus:mainnet:0e4f... / KYC L2 / Processing / **High 91** / 🇯🇵 JP / — / — / 2026-03-17 14:17

High-risk rows (87, 91): apply `border-left: 3px solid #FF3B30` on the row to draw the eye.

#### Risk Level Filter (insert into Filter Bar)

Add a fifth dropdown to the Filter Bar in Screen 3, after the "Country" dropdown:

`RiskLevelDropdown` — 36px height, `#242438` bg, `1px #2A2A42` border, Body 14/400 white. Label: "All Levels ▾".

Dropdown options:
- All Levels (default)
- Low (0–30) — Caption 12/400 `#34C759` tint on option row
- Medium (31–70) — Caption 12/400 `#FF9500` tint on option row
- High (71–100) — Caption 12/400 `#FF3B30` tint on option row

When a risk level filter is active, an `ActiveFilterPill` appears in the `ActiveFiltersRow` on the right: Caption 11/500 `#8E8E93` e.g. "Risk: High" + icon/x 10px to remove. "Clear all" Caption 11/400 `#0066FF` resets all filters including risk level.

---

### D2: Flagged Tab — Verifications List

**Insertion point:** Add a 6th tab to the `Quick Filter Tabs` row above the Verifications table in Screen 3. Insert after the "Processing" tab.

#### Flagged Tab Spec

`FlaggedTab` — same `TabPill` component as existing tabs. Label: "Flagged". Count badge value: "12".

**Inactive state:** `transparent` bg, Caption 12/400 `#8E8E93` text, count badge: `Fill: rgba(255,149,0,0.15)`, Caption 11/500 `#FF9500` "12". Not the standard `#48484F` badge — Flagged always uses amber badge even when inactive, to signal actionable items.

**Active state:** `border-bottom: 2px solid #FF9500` (replaces the `#0066FF` used by other active tabs). Caption 12/500 `#FF9500` text. Count badge: `Fill: rgba(255,149,0,0.20)`, Caption 11/600 `#FF9500` "12".

#### Flagged Tab Table Behavior

When the Flagged tab is active, the Verifications table filters to show only sessions that meet either condition:
- Risk score >70 (auto-flagged by system)
- Manually flagged via the "Flag for Review" button on a Verification Detail page (see D4)

Each row in the Flagged view: `border-left: 3px solid #FF9500` on the row. `RiskScoreBadge` column shows High score in `#FF3B30` or — if manually flagged with no risk score — shows a `FlaggedPill`: `Fill: rgba(255,149,0,0.12)`, `Border: 1px rgba(255,149,0,0.25)`, icon/flag 10px `#FF9500` + Caption 11/500 `#FF9500` "Flagged" (no score shown for manually flagged).

**Empty state (0 flagged):** icon/flag 48px `#8E8E93` centered in table area + H3 22/600 white "No flagged verifications" + Body 14/400 `#8E8E93` "Sessions with a risk score above 70 or flagged for manual review will appear here." Count badge on tab: "0" in muted `#48484F` style (no amber) when empty.

**Column order note:** In the Flagged view, the "Risk" column is promoted to immediately after the "DID" column (before "Type") to make the signal prominent.

---

### D3: IP & Geo Risk Signals Panel (insert into right column of Screen 4)

**Insertion point:** Insert `GeoRiskCard` in the right column of Screen 4 (Verification Detail), between `BlockchainAnchorCard` and `EventLogCard`.

#### GeoRiskCard — Default (clean) State

`GeoRiskCard` — `#1A1A2E` bg, 8px radius, padding 20 24.

**Header:** H3 "Risk Signals" 16/600 white, margin-bottom 16px.

**Data rows** — each row is a Horizontal Auto Layout, Space Between, Alignment Center, row height 36px, `border-bottom: 1px #242438` (last row no border):

Row 1 — IP Address:
- Left: Caption 12/500 `#8E8E93` "IP Address"
- Right: Horizontal, spacing 8px — JetBrains Mono 13/400 white "185.220.101.47" + `StatusPill` height 20px, padding 0 8px, `Fill: rgba(52,199,89,0.12)`, `Border: 1px rgba(52,199,89,0.25)`, Caption 11/500 `#34C759` "Risk: Low"

Row 2 — Geolocation:
- Left: Caption 12/500 `#8E8E93` "IP Location"
- Right: Body 14/400 white "🇺🇸 United States · New York, NY"

Row 3 — Country Match:
- Left: Caption 12/500 `#8E8E93` "Document Country"
- Right: Horizontal, spacing 8px — Body 14/400 white "🇺🇸 United States" + icon/check-circle 14px `#34C759` + Caption 12/500 `#34C759` "Match"

Row 4 — VPN / Proxy Detection:
- Left: Caption 12/500 `#8E8E93` "Proxy Detection"
- Right: Horizontal, spacing 8px — Body 14/400 white "No proxy detected" + icon/check 14px `#34C759`

Row 5 — Device:
- Left: Caption 12/500 `#8E8E93` "Device"
- Right: Body 14/400 white "Desktop · Chrome 122 · macOS 14"

**Risk Summary Row** — margin-top 12px. Horizontal Auto Layout, spacing 8px, Alignment Center, `Fill: #242438`, 6px radius, padding 8 12:
- icon/shield-check 16px `#34C759`
- Caption 12/400 `#34C759` "No risk signals detected"

#### GeoRiskCard — Escalated (mismatch) State

Triggered when IP geolocation country does not match the document-issuing country.

Card-level: add `border: 1px rgba(255,149,0,0.25)` to the card container. Card H3 "Risk Signals" unchanged.

Row 2 (IP Location) shows the foreign IP: Body 14/400 white "🇷🇺 Russia · Moscow, RU"

Row 3 (Document Country) escalated — Right side changes:
- Body 14/400 white "🇺🇸 United States" (document country, unchanged)
- icon/alert-triangle 14px `#FF9500`
- Caption 12/500 `#FF9500` "Country mismatch"

Row 4 (Proxy Detection) — if VPN also detected: Body white "VPN/Proxy detected" + icon/alert-triangle 14px `#FF9500`.

**Risk Summary Row (escalated):** `Fill: rgba(255,149,0,0.10)`, `border: 1px rgba(255,149,0,0.20)`:
- icon/alert-triangle 16px `#FF9500`
- Caption 12/400 `#FF9500` "IP country doesn't match document issuing country. Manual review recommended."

Below risk summary row (escalated only): "Flag for Review" inline link — Caption 12/500 `#FF9500` underline, margin-top 8px. Clicking triggers D4's confirmation popover.

---

### D4: Flag for Review Button (insert into Screen 4 page header)

**Insertion point:** Insert `FlagForReviewButton` in the Page Header of Screen 4 (Verification Detail), in the right-side button group — between the large status badge and the "Revoke Credential" danger ghost button.

#### FlagForReviewButton — Default State

`FlagForReviewButton` — ghost button, height 36px, padding 0 16px, `border: 1px rgba(255,149,0,0.30)`, 6px radius. Horizontal Auto Layout, spacing 6px, Alignment Center:
- icon/flag 16px `#FF9500`
- Body 14/500 `#FF9500` "Flag for Review"

Hover: `Fill: rgba(255,149,0,0.08)` 150ms ease-out. Border: `rgba(255,149,0,0.50)` on hover.

#### Confirmation Popover (on click)

On click, a popover (not a modal) appears anchored below the button, right-aligned to button's right edge. Does not block interaction with the rest of the page.

`FlagConfirmPopover` — `#242438` bg, 8px radius, padding 16, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`, width 280px, `border: 1px #2A2A42`. Opens 200ms ease-out (opacity 0→1, translateY -4px→0). Closes on Escape or click outside.

Content:
- H3 "Flag for Review" 14/600 white, margin-bottom 8px
- Body 13/400 `#8E8E93` "Add this verification to the manual review queue." margin-bottom 12px
- Reason input: height 32px, `#1A1A2E` bg, `1px #2A2A42` border, 4px radius, Body 13/400 white, placeholder `#48484F` "Reason (optional)"
- Button row margin-top 12px, gap 8px, Space Between:
  - "Cancel" ghost button: height 28px, padding 0 12px, `border: 1px rgba(255,255,255,0.15)`, Caption 12/500 `#8E8E93`. Hover: `#FFFFFF`.
  - "Confirm" amber button: height 28px, padding 0 16px, `Fill: rgba(255,149,0,0.15)`, `border: 1px rgba(255,149,0,0.35)`, Caption 12/600 `#FF9500`. Hover: `Fill: rgba(255,149,0,0.25)`. Loading state: 12px spinner `#FF9500`.

#### Confirmed State

After confirm (800ms loading → resolved):

1. `FlagForReviewButton` is removed from the header. In its place: `InReviewBadge` — non-interactive pill, height 32px, padding 0 16px, `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.30)`, 6px radius. Horizontal: icon/inbox 14px `#FF9500` + Caption 12/600 `#FF9500` "In Review Queue".
2. The large status badge gains an amber dot: 8px circle `#FF9500`, `border: 2px #1A1A2E`, position absolute top-right of badge. Badge text unchanged ("Verified" / "Pending" / etc.).
3. Session appears in the Cases screen (see separate Cases spec if applicable).
4. Toast bottom-right: `#1A1A2E` bg, 6px radius, padding 12 16, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. icon/check-circle 16px `#FF9500` + Body 14/400 white "Flagged for review" + Caption `#8E8E93` "Session added to review queue." Auto-dismiss 4s.

**Already-flagged state (if session was previously flagged):** `FlagForReviewButton` is not rendered at all. Only `InReviewBadge` is shown. No re-flag option available from this view.

---

### D5: Geographic Distribution Map (insert into Screen 6 — Analytics)

**Insertion point:** Insert `GeoDistributionCard` after the `Breakdown + Savings` two-column row and before the `Cohort Quality Table` in Screen 6.

#### GeoDistributionCard

`GeoDistributionCard` — `#1A1A2E` bg, 8px radius, padding 24, full-width, margin-top 16px.

**Header row** — Horizontal Auto Layout, Space Between, Alignment Center, margin-bottom 24px:
- Left: H3 "Verifications by Country" 22/600 white
- Right: Caption 12/400 `#8E8E93` "Top 10"

**Two-column layout** — Horizontal Auto Layout, gap 24px:

**Left (70%): `GeoMap`**
Dark variant. Base map tiles in `#0F1A2B`. Country borders `1px #2A2A42`. Countries with no verification data: `Fill: #1A1A2E`. Countries with data: heatmap gradient from `rgba(0,102,255,0.20)` (low volume, e.g. <500) through `rgba(0,102,255,0.60)` (mid, e.g. 1K–5K) to `#0066FF` solid (high, e.g. 10K+). Top country (US 14,821): full `#0066FF` fill. Map height 320px, 8px radius.

Hover tooltip on country: `TooltipCard` — `#242438` bg, 6px radius, padding 10 14, `drop-shadow: 0 4px 12px rgba(0,0,0,0.32)`. Content: flag emoji + H3 16/600 white country name + H2 22/700 white count + Caption 11/400 `#8E8E93` percentage of total.

**Right (30%): Top Countries List**
Vertical stack of 10 rows. Each `CountryRow` — Horizontal Auto Layout, Space Between, Alignment Center, height 36px, `border-bottom: 1px #242438` (row 10: no border):
- Left cluster: Horizontal, spacing 6px — rank number Caption 12/500 `#48484F` (right-aligned in 20px column) + flag emoji 16px + Body 14/400 white country name (flex-grow, truncate at 100px)
- Right cluster: Horizontal, spacing 8px — H3 16/600 white count + Caption 12/400 `#8E8E93` percentage

Sample data (10 rows):
1. 🇺🇸 United States — 14,821 — 30.7%
2. 🇩🇪 Germany — 7,236 — 15.0%
3. 🇬🇧 United Kingdom — 5,142 — 10.7%
4. 🇧🇷 Brazil — 3,908 — 8.1%
5. 🇰🇷 South Korea — 2,441 — 5.1%
6. 🇸🇬 Singapore — 2,187 — 4.5%
7. 🇫🇷 France — 1,943 — 4.0%
8. 🇯🇵 Japan — 1,821 — 3.8%
9. 🇦🇺 Australia — 1,654 — 3.4%
10. 🌐 Other — 7,088 — 14.7%

Row 10 "Other": no flag, `#8E8E93` text color instead of white for both name and count.

---

### D6: Fraud Detection Metrics (insert into Screen 6 — Analytics)

**Insertion point:** Insert `FraudMetricsCard` immediately after `GeoDistributionCard` (D5) and before the `Cohort Quality Table` in Screen 6.

#### FraudMetricsCard

`FraudMetricsCard` — `#1A1A2E` bg, 8px radius, padding 24, full-width, margin-top 16px.

**Header row** — Horizontal Auto Layout, Space Between, Alignment Center, margin-bottom 24px:
- Left: H3 "Fraud & Risk Detection" 22/600 white
- Right: `DateRangePicker` pill — same component as Screen 6 top bar, 32px height, `#242438` bg. Mirrors the page-level date range selection.

**3-column stats grid** — gap 16px, margin-bottom 24px.

`FraudStatCard` × 3 — each: `#242438` bg, 8px radius, padding 16, Vertical Auto Layout, spacing 8px:

Card 1 — Flagged Sessions:
- icon/shield-alert 24px `#FF9500`
- H2 36/700 `#FF9500` "47" — count-up animation 600ms ease-out on scroll into view
- Caption 12/400 `#8E8E93` "3.8% flag rate"
- Caption 12/400 `#34C759` "↓ vs. 4.2% industry avg" — below the flag rate, Horizontal spacing 4px: icon/arrow-down 12px `#34C759` + text

Card 2 — Spoofing Attempts:
- icon/scan-face 24px `#FF3B30`
- H2 36/700 `#FF3B30` "12" — count-up
- Caption 12/400 `#8E8E93` "0.1% of verifications"
- Caption 12/400 `#8E8E93` "Liveness + document" (secondary descriptor)

Card 3 — Watchlist Hits:
- icon/list-x 24px `#FF3B30`
- H2 36/700 `#FF3B30` "3" — count-up
- Caption 12/400 `#8E8E93` "AML + PEP screening"
- Caption 12/400 `#8E8E93` "0 sanctions matches" (tertiary note, `#48484F`)

**`RiskTrendChart`** — 100% width, 120px height, `#242438` bg, 8px radius, padding 12 16.

Header inside chart area: Caption 12/500 `#8E8E93` "Flagged Sessions %" left + Caption 11/400 `#48484F` "30-day trend" right.

Line chart: `#FF9500` line 1.5px, no fill. Dotted reference line at "4.2%" — `1px dashed #48484F` — labeled Caption 10/400 `#48484F` "Industry avg 4.2%" at right end. Chart data: 30 data points representing daily flag rate. Trend: starts at ~4.5%, drops to 3.5%, stabilizes around 3.8%. X-axis: 5 date labels Caption 10 `#48484F`. Y-axis: 3 labels (3%, 4%, 5%) Caption 10 `#48484F`.

Hover tooltip on chart: `#242438` bg, 6px radius, padding 8 12. Date Caption + flag rate H3 `#FF9500` + vs-industry Caption `#8E8E93`. Vertical crosshair `1px dashed rgba(255,149,0,0.3)`. Dot at hover point: 6px `#FF9500`.

---

### D7: Scheduled Report Delivery (insert into Screen 6 — Analytics)

**Insertion point:** Insert `ScheduledReportsCard` at the bottom of Screen 6, after the `Compliance Audit Log` section. This is the final card in the Analytics view.

#### ScheduledReportsCard

`ScheduledReportsCard` — `#1A1A2E` bg, 8px radius, padding 24, full-width, margin-top 16px.

**Header row** — Horizontal Auto Layout, Space Between, Alignment Center, margin-bottom 20px:
- Left: H3 "Scheduled Reports" 22/600 white
- Right: `AddScheduleButton` — ghost button, height 32px, padding 0 14px, `border: 1px rgba(255,255,255,0.15)`, 6px radius. Horizontal: icon/plus 14px `#8E8E93` + Caption 12/500 `#8E8E93` "Add Schedule". Hover: `#FFFFFF` icon and text, `border: rgba(255,255,255,0.30)`, 150ms.

#### Empty State (no schedules configured)

Center-aligned content, padding 40 0, Vertical Auto Layout, spacing 12px:
- icon/calendar 40px `#8E8E93`
- H3 "No scheduled reports" 18/600 white
- Caption 14/400 `#8E8E93` "Auto-deliver compliance reports to your inbox or Slack on a recurring schedule."
- "Add Schedule →" primary button, height 36px, padding 0 20px, margin-top 4px

#### With Schedules: ScheduleRow List

Vertical stack of `ScheduleRow` components, each: Horizontal Auto Layout, Space Between, Alignment Center, padding 14 0, `border-bottom: 1px #242438` (last row: no border).

`ScheduleRow` anatomy:

Left: Horizontal Auto Layout, spacing 12px, Alignment Center:
- icon/calendar 16px `#0066FF`
- Vertical Auto Layout, spacing 3px:
  - H3 "Weekly KYC Summary" 14/600 white
  - Caption 12/400 `#8E8E93` "Every Monday 09:00 UTC · PDF + CSV · alex@acmecorp.com"

Right: Horizontal Auto Layout, spacing 8px, Alignment Center:
- `StatusPill` height 22px, padding 0 8px, `Fill: rgba(52,199,89,0.12)`, `Border: 1px rgba(52,199,89,0.25)`, Caption 11/500 `#34C759` "Active" (or `#FF9500` "Paused")
- "Pause" ghost button: height 28px, padding 0 10px, `border: 1px rgba(255,255,255,0.15)`, Caption 11/500 `#8E8E93`. Hover: `#FFFFFF` 150ms. If already paused: shows "Resume" instead.
- icon/trash-2 16px `#FF3B30` icon button (delete). Hover: `rgba(255,59,48,0.10)` bg 150ms.

Sample schedule rows (2):
1. "Weekly KYC Summary" — Every Monday 09:00 UTC · PDF + CSV · alex@acmecorp.com — Active
2. "Monthly Compliance Export" — 1st of month 06:00 UTC · CSV · compliance@acmecorp.com + Slack: #compliance — Active

#### Add Schedule Modal

`AddScheduleModal` — triggered from "Add Schedule" button or "Add Schedule →" in empty state. Overlay + modal, same patterns as existing modals in Screen 5. Width 480px, `#1A1A2E` bg, 12px radius, `box-shadow: 0 16px 48px rgba(0,0,0,0.56)`.

**Modal Header** — padding 24, Space Between, `border-bottom: 1px #242438`:
- H3 20/600 white "New Scheduled Report"
- icon/x 20px `#8E8E93` close. Hover: `#FFFFFF` 150ms.

**Form body** — padding 24, Vertical Auto Layout, spacing 20px:

Field 1: "Report type" — Caption 12/500 `#8E8E93` label + dropdown 36px height, `#242438` bg, `1px #2A2A42` border, Body 14/400 white. Options: KYC Summary / Compliance Audit Log / Fraud & Risk Report / Full Export.

Field 2: "Frequency" — Caption + row of 3 radio-pill options (Daily / Weekly / Monthly). Each: `#242438` bg, 6px radius, padding 6 14, Caption 12/500. Selected: `#0066FF` bg, white text.

Field 3 (conditional, shown when Weekly selected): "Day" dropdown — Mon / Tue / Wed / Thu / Fri / Sat / Sun. Shown inline with "at" + "Time" dropdown (06:00 / 09:00 / 12:00 / 18:00 / 00:00 UTC).

Field 3 (conditional, shown when Monthly): "Day of month" — number input 1–28, 36px height.

Field 4: "Format" — Caption + checkbox row: "PDF" (checked) + "CSV" (unchecked by default). Each checkbox: 16px, `#242438` bg, `1px #2A2A42` border, 3px radius. Checked: `#0066FF` bg + white check.

Field 5: "Email recipient" — Caption + input 36px, placeholder "you@company.com".

Field 6: "Slack webhook (optional)" — Caption + input 36px, placeholder "https://hooks.slack.com/...".

**Modal Footer** — padding 20 24, `border-top: 1px #242438`, Horizontal Auto Layout, Space Between:
- Body 13/400 `#8E8E93`: "First delivery: calculated from next occurrence"
- Row: "Cancel" ghost + "Create Schedule" primary. Primary disabled if no type or frequency selected.

---

### D8: Review Queue Callout (insert into Screen 2 — Dashboard Overview)

**Insertion point:** Insert `ReviewQueueCard` in Screen 2, after the `WebhookDeliveryPanel` section and immediately before the `### Recent Verifications Table` section.

#### ReviewQueueCard

`ReviewQueueCard` — `#1A1A2E` bg, 8px radius, `border: 1px rgba(255,149,0,0.25)`, `border-left: 4px solid #FF9500`, padding 20 24, full-width, margin-top 16px. Horizontal Auto Layout, Space Between, Alignment Center.

**Left side** — Horizontal Auto Layout, spacing 16px, Alignment Center:
- icon/inbox 24px `#FF9500`
- Vertical Auto Layout, spacing 4px:
  - Horizontal Auto Layout, spacing 8px, Alignment Center:
    - H3 "Cases Awaiting Review" 16/600 white
    - Count badge: height 20px, padding 0 8px, `radius-full`, `Fill: rgba(255,149,0,0.15)`, `Border: 1px rgba(255,149,0,0.30)`, Caption 11/600 `#FF9500` "38"
  - Caption 12/400 `#8E8E93` "Oldest waiting: 2h 14m · SLA: 4h per case"

**Right side** — Horizontal Auto Layout, spacing 8px, Alignment Center:

`SLAWarning` (conditional — shown only when at least one case has waited >4 hours):
- Horizontal Auto Layout, spacing 4px, Alignment Center: icon/alert-triangle 14px `#FF3B30` + Caption 12/500 `#FF3B30` "6 cases at SLA risk"

"Go to Cases →" button: height 36px, padding 0 16px, 6px radius, `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.30)`. Horizontal Auto Layout, spacing 6px: icon/arrow-right 14px `#FF9500` + Body 14/600 `#FF9500` "Go to Cases →". Hover: `Fill: rgba(255,149,0,0.20)`, 150ms ease-out.

**Hidden state:** when the review queue count is 0 (no pending cases), `ReviewQueueCard` is not rendered. No empty-state placeholder. The vertical gap between `WebhookDeliveryPanel` and `Recent Verifications Table` reverts to `margin-top 16px` on the table header, as if the card never existed.

**Count zero → nonzero animation:** when the queue count transitions from 0 to 1+ (e.g. after a verification is flagged), the card appears with a slide-down entrance: `translateY(-8px)→translateY(0)` + `opacity 0→1`, 250ms ease-out.

---

### D9: Notification Bell Dropdown (add to Shared Components — Top Bar)

**Insertion point:** Add `NotificationDropdown` spec to the Top Bar Shared Component definition, immediately after the notification bell icon-button description. The bell icon behavior in the existing spec gains a dropdown panel on click.

#### Bell Icon — Extended States

Existing bell icon button (40×40px, `#242438` bg, bell icon 20px). Extended state spec:

- **No unread notifications:** icon `#8E8E93`, no badge, bg `#242438`
- **Has unread notifications:** red dot 8px `#FF3B30`, `border: 2px #0A1628`, position absolute top-right at (26px, 6px) of icon button. Bell icon `#FFFFFF`. Bg `#242438`.
- **Dropdown open:** bg `#1A1A2E` (pressed state). `border: 1px #2A2A42`, 6px radius.
- Click toggles dropdown open/closed.

#### NotificationDropdown Panel

`NotificationDropdown` — 360px wide. `#1A1A2E` bg, `border: 1px #2A2A42`, 8px radius, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. Positioned `absolute`, `top: 48px`, `right: 0` relative to bell button container. Z-index: 200.

Open animation: `opacity 0→1` + `translateY(-4px→0)`, 200ms ease-out. Close: `opacity 1→0` + `translateY(0→-4px)`, 150ms ease-in. Closes on: click outside panel, Escape key, navigation to new page.

**Panel Header** — padding 16 20, Horizontal Auto Layout, Space Between, Alignment Center, `border-bottom: 1px #2A2A42`:
- H3 "Notifications" 16/600 white
- "Mark all read" Caption 12/500 `#0066FF`. Hover: underline. Click: transitions all unread items to read state 200ms stagger.

**`NotificationList`** — max-height 400px, overflow-y auto. Custom scrollbar: 2px width, track `#2A2A42`, thumb `#0066FF`, border-radius 1px.

**`NotificationItem`** — padding 14 16, `border-bottom: 1px #242438`, Horizontal Auto Layout, spacing 10px, Alignment Start. Hover: `Fill: #242438` bg 150ms. Cursor: pointer.

Unread item: `border-left: 3px solid #0066FF`, `Fill: rgba(0,102,255,0.04)`. Read item: no left border, `Fill: transparent`.

Item anatomy:

Left: `NotifIcon` — 36×36px, `#242438` bg, 8px radius, flex-shrink 0. Lucide icon 18px centered.

Center (flex-grow): Vertical Auto Layout, spacing 2px:
- Title: Body 14/600 white, max 1 line, `text-overflow: ellipsis`
- Detail: Caption 12/400 `#8E8E93`, max 2 lines, `-webkit-line-clamp: 2`
- Time: Caption 11/400 `#48484F`

Right: Unread dot — 6px circle `#0066FF`, `border: 2px #1A1A2E`, position absolute, top 12px, right 14px. Hidden on read items.

**5 Notification Types (sample data):**

1. **Webhook failure** (unread):
   - `NotifIcon`: icon/alert-triangle 18px `#FF3B30`, on `Fill: rgba(255,59,48,0.10)` bg
   - Title: "Webhook endpoint failing"
   - Detail: "api.acme.com returning 500 · 4 failed deliveries in last 10 min"
   - Time: "2m ago"
   - Right: unread dot `#0066FF`

2. **Review queue** (unread):
   - `NotifIcon`: icon/inbox 18px `#FF9500`, on `Fill: rgba(255,149,0,0.10)` bg
   - Title: "38 sessions need review"
   - Detail: "Oldest case: 2h 14m · SLA: 4h per case"
   - Time: "5m ago"
   - Right: unread dot `#0066FF`

3. **Usage warning** (unread):
   - `NotifIcon`: icon/bar-chart-2 18px `#FF9500`, on `Fill: rgba(255,149,0,0.10)` bg
   - Title: "Usage at 88% of quota"
   - Detail: "You've used 88,000 of 100,000 queries this month. Consider upgrading."
   - Time: "1h ago"
   - Right: unread dot `#0066FF`

4. **Credential expiry** (read):
   - `NotifIcon`: icon/award 18px `#8E8E93`, on `Fill: #2A2A42` bg (neutral, read state)
   - Title: "1,204 credentials expiring"
   - Detail: "Within 30 days. Send re-verification nudge from Credentials."
   - Time: "6h ago"
   - No unread dot

5. **Team member** (read):
   - `NotifIcon`: icon/user-check 18px `#34C759`, on `Fill: rgba(52,199,89,0.10)` bg
   - Title: "Sarah Johnson joined"
   - Detail: "Now has Operator access. Invited by alex@acmecorp.com."
   - Time: "1d ago"
   - No unread dot

**Panel Footer** — padding 14 16, `border-top: 1px #2A2A42`, center. "View all notifications →" Caption 12/500 `#0066FF`. Hover: underline.

**Empty state (0 notifications):** replaces list + footer. Center, padding 40 16, Vertical Auto Layout, spacing 8px:
- icon/bell 32px `#8E8E93`
- Caption 14/400 `#8E8E93` "You're all caught up"

---

## PART B: Marketing Page Section Insertions

---

### B1: ROI Calculator Section (insert into Screen 16 — Homepage)

**Insertion point:** Insert `ROICalculatorSection` into the Homepage (Screen 16) after `PricingPreviewSection` and before `DeveloperQuickstartSection`.

#### ROICalculatorSection

Full-width section. Padding 80 120px. `Fill: #F2F2F7`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 48px:
- H2 center 36/700 `#0A1628`: "See how much you'll save"
- Body center 16/400 `#666666` max-width 560px, margin auto: "Enter your verification volume and see your cost with Solidus vs. the market average."

#### ROICalculator Card

`ROICalculator` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32, max-width 800px, margin 0 auto. `box-shadow: 0 4px 16px rgba(0,0,0,0.06)`. 2-column layout, gap 48px, `border-right: 1px #E0E0E5` on left column.

**Left column:**

H3 "Your monthly KYC volume" 18/600 `#0A1628`, margin-bottom 20px.

`VolumeSlider` — range input 0 to 1,000,000, default value 50,000:
- Track: 100% width, height 6px, 6px radius. Filled portion (left of thumb): `Fill: #0066FF`. Unfilled portion: `Fill: #E0E0E5`.
- Thumb: 20px circle, `Fill: #0066FF`, `box-shadow: 0 2px 8px rgba(0,102,255,0.40)`. Hover: `box-shadow: 0 2px 12px rgba(0,102,255,0.60)`.
- Value updates live as thumb moves. No debounce — both columns update in real time.

Current value display — Horizontal Auto Layout, spacing 4px, Alignment Baseline, margin-top 12px:
- H2 40/700 `#0066FF` (dynamic count formatted with commas) e.g. "50,000"
- Caption 14/400 `#8E8E93` "/month" aligned to baseline

Preset pills — Horizontal Auto Layout, spacing 8px, margin-top 12px. 5 pills, each: `#F2F2F7` bg, `border: 1px #E0E0E5`, 20px radius, padding 6 14, Caption 12/500 `#666666`. Label: "1K" / "10K" / "50K" / "100K" / "500K". Click: sets slider to that value with 300ms ease smooth transition. Active (current value matches preset): `Fill: rgba(0,102,255,0.10)`, `border: 1px rgba(0,102,255,0.30)`, Caption 12/600 `#0066FF`.

**Right column — `SavingsBreakdown`:**

Vertical Auto Layout, spacing 20px.

Comparison row 1 — Market average:
- Caption 12/500 `#999999` uppercase letter-spacing 0.06em: "MARKET AVERAGE (SUMSUB / ONFIDO)"
- H3 24/700 `#FF3B30` `text-decoration: line-through` dynamic "$X/mo" — calculated as volume × $0.25 (market average per verification, KYC L2)
- Caption 13/400 `#8E8E93` "~$0.25/verification average"

Comparison row 2 — Solidus:
- Caption 12/500 `#999999` uppercase: "SOLIDUS VERIFY"
- H3 24/700 `#34C759` dynamic "$X/mo" — calculated as volume × $5.00 per KYC L2 (or volume × $0.001 per query if in query mode)
- Caption 13/400 `#8E8E93` "$0.001/query · $5.00 per KYC L2 session"

Divider `1px #E0E0E5`, full-width.

`SavingsCallout` — `Fill: rgba(168,230,0,0.08)`, `border: 1px rgba(168,230,0,0.20)`, 8px radius, padding 16, Vertical Auto Layout, spacing 4px:
- H2 32/700 `#34C759` dynamic "You save $X/month" — formatted with commas
- Caption 14/400 `#666666` dynamic "That's X% less than the market average." — percentage calculated (savings ÷ market cost × 100), formatted to 1 decimal place

Disclaimer — Caption 11/400 `#999999`, margin-top 4px: "Estimates based on KYC L2 verification pricing. Actual savings vary by verification mix and negotiated enterprise rates."

**Below calculator:** "Start Free →" primary button, height 48px, padding 0 32px, `#0066FF` bg, H3 16/600 white. Centered, margin-top 32px.

---

### B2: Reusable Credential Section (insert into Screen 16 — Homepage)

**Insertion point:** Insert `ReusableCredentialSection` after `HowItWorksSection` and before `FeatureGridSection` in the Homepage (Screen 16).

#### ReusableCredentialSection

Full-width section. Padding 80 120px. `Fill: #0A1628`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 48px:
- Caption 12/600 letter-spacing 0.08em `#A8E600` center: "THE SOLIDUS ADVANTAGE"
- H2 center 40/700 white: "Verify once. Present anywhere."
- Body center 16/400 `rgba(255,255,255,0.60)` max-width 600px, margin auto: "Traditional KYC forces users to re-upload documents every time. Solidus issues a W3C Verifiable Credential stored in the user's DID wallet — presented instantly for $0.05 instead of $5–20."

#### CredentialFlowDiagram

Centered, max-width 900px, margin-top 48px. Horizontal Auto Layout, Alignment Center, gap 0 (spacing handled by arrow elements).

**Left node — `VerifyOnceNode`:** `#1A1A2E` bg, 12px radius, padding 24, width 200px. Vertical Auto Layout, spacing 8px, Alignment Center:
- icon/shield-check 32px `#A8E600`
- H3 "Verify Once" 16/600 white
- Caption 14/400 `#8E8E93` "Full KYC L2"
- H3 "–" (em dash spacer) hidden / H2 "$5.00" 20/700 `#A8E600`

**Arrow 1** — flex: 1. Center: icon/arrow-right 20px `#48484F`. Below arrow: Caption 11/400 `#48484F` center "W3C VC issued\nto DID wallet" (2-line, text-align center).

**Center node — `CredentialNode`:** width 160px, height 160px, `#242438` bg, 12px radius, `border: 2px solid`, border-image: `linear-gradient(135deg, #A8E600, #00D4FF) 1`. `box-shadow: 0 0 32px rgba(0,212,255,0.20)`. Vertical Auto Layout, Alignment Center, justify-content center, gap 6px:
- icon/award 40px `#A8E600`
- H3 "KYC L2\nCredential" 14/600 white, text-align center
- Caption 12/400 `#8E8E93` "DID wallet"

**Arrow 2** — splits into 3 downward arrows. Horizontal: flex: 1, height 160px. Shows vertical line from center node right edge → 3 branching lines to each of the 3 service nodes. Color: `#2A2A42`. Label on main stem: Caption 11/400 `#A8E600` center "$0.05 per\npresentation".

**Right — 3 service nodes** stacked vertically, gap 12px, Vertical Auto Layout:

`ServiceNode` × 3 — each: `#1A1A2E` bg, 8px radius, padding 12 16, width 180px. Horizontal Auto Layout, spacing 10px, Alignment Center:
- icon 16px `#00D4FF`: icon/currency-dollar / icon/building-2 / icon/gamepad-2
- Vertical: Body 13/600 white (flex) + Caption 11/400 `#8E8E93` "$0.05 reuse"

Services:
1. icon/currency-dollar "DeFi Protocol"
2. icon/building-2 "Fintech App"
3. icon/gamepad-2 "Gaming Platform"

**`SavingsPill`** — centered, margin-top 40px. Horizontal Auto Layout, spacing 8px, Alignment Center, padding 12 24, 24px radius, `Fill: rgba(168,230,0,0.10)`, `border: 1px rgba(168,230,0,0.20)`:
- icon/trending-down 18px `#A8E600`
- H3 18/600 `#A8E600` "96% cheaper for repeat verifications"

---

### B3: Country & Document Coverage (insert into Screen 16 — Homepage)

**Insertion point:** Insert `CoverageSection` between `PartnerLogosSection` and `HowItWorksSection` in the Homepage (Screen 16).

#### CoverageSection

Full-width section. Padding 64 120px. `Fill: #FFFFFF`.

**Coverage Stats Strip** — `border: 1px #E0E0E5`, 12px radius, overflow hidden, max-width 1200px, margin 0 auto. Horizontal Auto Layout, no gap (dividers are borders).

`CoverageStat` × 4 — each: flex 1, padding 24 32, `border-right: 1px #E0E0E5` (last stat: no right border). Vertical Auto Layout, spacing 6px, Alignment Center:

1. H2 40/700 `#0A1628` "183" + Caption 12/400 `#666666` "countries supported"
2. H2 40/700 `#0A1628` "11,000+" + Caption 12/400 `#666666` "document types accepted"
3. H2 40/700 `#0066FF` "99.4%" + Caption 12/400 `#666666` "verification accuracy"
4. H2 40/700 `#0A1628` "1–2s" + Caption 12/400 `#666666` "average verification time"

Hover on each stat: `Fill: #F9F9FB` bg 200ms. No other interaction.

**Footer link** — centered, margin-top 20px: Body 14/500 `#0066FF` "View all supported documents →". icon/arrow-right 14px `#0066FF` inline right, 6px gap. Hover: underline, icon nudges 2px right 150ms.

---

### B4: Interactive Product Demo (insert into Screen 16 — Homepage)

**Insertion point:** Insert `ProductDemoSection` between `FeatureGridSection` and `IndustryVerticalsSection` in the Homepage (Screen 16).

#### ProductDemoSection

Full-width section. Padding 80 120px. `Fill: #F2F2F7`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 40px:
- H2 center 36/700 `#0A1628`: "See it in action"
- Body center 16/400 `#666666` max-width 480px, margin auto: "Take a self-guided tour of the Solidus Verify dashboard."

#### DemoCard

`DemoCard` — `#0A1628` bg, 16px radius, max-width 900px, margin 0 auto, padding 32, `box-shadow: 0 16px 48px rgba(0,0,0,0.12)`, `border: 1px rgba(255,255,255,0.08)`.

**Tab Bar** — Horizontal Auto Layout, gap 4px, margin-bottom 24px. 4 `DemoTab` pills:
- Inactive: `transparent` bg, `border: 1px rgba(255,255,255,0.12)`, 20px radius, padding 8 20, Caption 13/500 `#8E8E93`
- Active: `Fill: #0066FF`, `border: 1px #0066FF`, 20px radius, padding 8 20, Caption 13/600 white

Tabs: "Dashboard" (default active) | "Verifications" | "Analytics" | "Credentials"

**Demo Viewport** — `#1A1A2E` bg, 12px radius, overflow hidden, position relative. Height 360px.

Content per active tab: static dashboard screenshot mockup — a simplified/stylized rendering of the relevant screen at 75% fidelity (no real data density, readable key elements). Displayed as a `Fill` image-placeholder card at full card width.

`AnnotationBubble` × 2–3 per tab: white pill, 6px radius, padding 6 12, `box-shadow: 0 2px 8px rgba(0,0,0,0.20)`. Caption 12/600 `#0A1628` annotation text + a 6px triangular arrow pointer pointing to the annotated element. Position: absolute over the viewport.

Annotations per tab:
- **Dashboard:** Bubble 1 — near KPI cards — "Live verification metrics". Bubble 2 — near live stream — "Real-time feed".
- **Verifications:** Bubble 1 — near filter bar — "Filter by country, type, status". Bubble 2 — near status badges — "One-click review".
- **Analytics:** Bubble 1 — near funnel chart — "See where users drop off". Bubble 2 — near cost savings card — "Real-time cost comparison".
- **Credentials:** Bubble 1 — near presentations column — "Track credential reuse". Bubble 2 — near expiry section — "Proactive expiry alerts".

Tab transitions: cross-fade 200ms ease-out. Annotations enter with `opacity 0→1` + `scale(0.96→1.0)` 200ms, staggered 80ms apart.

**Below DemoCard** — Horizontal Auto Layout, gap 16px, Alignment Center, Justify Center, margin-top 24px:
- "Book a live demo →" ghost button: height 44px, padding 0 24px, `border: 1px #0A1628`, 8px radius, Body 15/500 `#0A1628`. Hover: `Fill: #0A1628`, white text, 200ms.
- "Start Free Trial →" primary button: height 44px, padding 0 24px, `Fill: #0066FF`, 8px radius, Body 15/600 white.

---

### B5: Case Study Preview (insert into Screen 16 — Homepage)

**Insertion point:** Insert `CaseStudyPreviewSection` between `TestimonialsSection` and `PricingPreviewSection` in the Homepage (Screen 16).

#### CaseStudyPreviewSection

Full-width section. Padding 80 120px. `Fill: #FFFFFF`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 48px:
- H2 center 36/700 `#0A1628`: "Proof, not promises"

**3-column card grid** — Horizontal Auto Layout, gap 24px, max-width 1080px, margin 0 auto.

#### CaseStudyPreviewCard

`CaseStudyPreviewCard` × 3 — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, overflow hidden, Vertical Auto Layout:

Top band: height 8px, `Fill: #0066FF` (all 3 cards same accent color).

Body: padding 24, Vertical Auto Layout, spacing 16px:

- Industry pill: height 24px, padding 0 10px, `radius-full`, `Fill: rgba(0,102,255,0.08)`, `border: 1px rgba(0,102,255,0.15)`, Caption 11/500 uppercase `#0066FF`. Letter-spacing 0.06em.

- H3 headline 18/600 `#0A1628`

- `MetricCallout` — `Fill: rgba(168,230,0,0.08)`, `border: 1px rgba(168,230,0,0.20)`, 6px radius, padding 10 14. Horizontal Auto Layout, spacing 8px, Alignment Baseline:
  - H2 28/700 `#34C759` metric value
  - Caption 13/400 `#666666` metric label

- Body 14/400 `#666666` line-height 1.7: 2-line preview text (capped with `-webkit-line-clamp: 2`)

- Divider `1px #E0E0E5`

- Attribution row — Horizontal Auto Layout, spacing 10px, Alignment Center:
  - Avatar: 32px circle, `Fill: #F2F2F7`, initials Caption 12/600 `#0A1628`
  - Vertical Auto Layout, spacing 2px: Name Caption 13/600 `#0A1628` + Role Caption 12/400 `#666666`

3 cards:

**Card 1 — TrustLayer Exchange:**
- Pill: "CRYPTO EXCHANGE"
- H3: "95% reduction in KYC operational cost"
- Metric: "95%" + "cost reduction"
- Preview: "TrustLayer moved from Onfido at $8.50/user to Solidus at $0.40. Their compliance team now processes the same volume with no additional headcount."
- Attribution: Brendan Okafor · CEO, TrustLayer Exchange

**Card 2 — Sterling Fintech:**
- Pill: "FINTECH / BANKING"
- H3: "GDPR and BIPA compliance — signed in 48 hours"
- Metric: "48h" + "procurement to go-live"
- Preview: "Sterling's legal team required zero BIPA exposure and full GDPR right-to-erasure support. Both requirements were met out of the box. No negotiation required."
- Attribution: Layla Al-Rashid · Chief Compliance Officer, Sterling Fintech

**Card 3 — Generali DeFi:**
- Pill: "DEFI PROTOCOL"
- H3: "From 3-week integration to 2-day deploy"
- Metric: "3 weeks → 2 days" + "time to production"
- Preview: "Tomáš and his team replaced a 14-step Auth0 KYC pipeline with a single Solidus API call. The credential model eliminated their document storage liability entirely."
- Attribution: Tomáš Kovář · Lead Infrastructure Engineer, Generali DeFi

**Footer link** — centered, margin-top 32px. Body 14/500 `#0066FF` "Read all case studies →". Hover: underline.

---

### B6: Volume Discount Calculator (insert into Screen 17 — Pricing Page)

**Insertion point:** Insert `VolumeCalculatorSection` between the plan cards and the `Feature Comparison Table` in Screen 17 (Pricing Page).

#### VolumeCalculatorSection

Full-width section. Padding 48 120px. `Fill: #F2F2F7`.

**Section header** — Vertical Auto Layout, spacing 8px, Alignment Center, margin-bottom 32px:
- H2 center 36/700 `#0A1628`: "Calculate your cost"

#### VolumeCalculator Card

`VolumeCalculator` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32, max-width 720px, margin 0 auto, `box-shadow: 0 4px 16px rgba(0,0,0,0.06)`. Vertical Auto Layout, spacing 24px.

H3 "Monthly verifications" 18/600 `#0A1628`.

`VolumeSlider` — same spec as B1 (range 0–1,000,000, `#0066FF` fill, default 50,000). Value display: H2 36/700 `#0066FF` dynamic count + Caption "/month" `#8E8E93` baseline-aligned.

Preset pills — same spec as B1: 1K / 10K / 50K / 100K / 500K.

**Results Panel** — `#F9F9FB` bg, 8px radius, padding 20 24. Vertical Auto Layout, spacing 0.

Results rows × 3:

`ResultRow` anatomy: padding 12 0, `border-bottom: 1px #E0E0E5` (last row: no border). Horizontal Auto Layout, Space Between, Alignment Center:
- Left: Vertical: Caption 12/500 `#666666` plan name + Caption 12/400 `#999999` included quota
- Right: Horizontal, spacing 8px: H3 20/600 `#0A1628` monthly cost + savings badge (conditional)

`SavingsBadge` (shown on row only when that plan is cheaper than pay-as-you-go at current volume): height 22px, padding 0 8px, `radius-full`, `Fill: rgba(52,199,89,0.10)`, `border: 1px rgba(52,199,89,0.25)`, Caption 11/600 `#34C759` "Save $X/mo"

Row 1 — Pay-as-you-go:
- Plan name: "Pay-as-you-go" + quota: "No commitment"
- Cost: calculated as volume × $0.001 (query rate), formatted "$X/mo"
- No savings badge (baseline)

Row 2 — Startup:
- Plan name: "Startup" + quota: "10,000 queries/mo included"
- Cost: "$99/mo" fixed + overage if volume >10,000 at $0.001/extra query
- If cheaper than pay-as-you-go: show savings badge

Row 3 — Growth:
- Plan name: "Growth" + quota: "100,000 queries/mo included"
- Cost: "$499/mo" fixed
- If cheaper than pay-as-you-go or Startup: show savings badge

**`PlanRecommendation`** — shown below results rows, margin-top 16px. Conditional rendering:

If volume ≤ 10,000: `Fill: rgba(0,102,255,0.06)`, `border: 1px rgba(0,102,255,0.20)`, 6px radius, padding 12 16. icon/info 14px `#0066FF` + Caption 13/400 `#0066FF` "Pay-as-you-go is the most economical at this volume."

If volume 10,001–100,000: same callout style. "Startup plan ($99/mo) saves you $X/mo vs pay-as-you-go."

If volume 100,001–500,000: "Growth plan ($499/mo) saves you $X/mo vs pay-as-you-go."

If volume >500,000: amber callout — `Fill: rgba(255,149,0,0.08)`, `border: 1px rgba(255,149,0,0.25)`. icon/alert-triangle 14px `#FF9500` + Caption 13/400 `#FF9500` "Your volume exceeds the Growth plan quota. " + "Contact Enterprise Sales →" inline link `#FF9500` underline.

---

### B7: Competitor Pricing Comparison (insert into Screen 17 — Pricing Page)

**Insertion point:** Insert `CompetitorPricingSection` after the `Feature Comparison Table` (after the `### Feature Comparison Table` section) in Screen 17.

#### CompetitorPricingSection

Full-width section. Padding 80 120px. `Fill: #FFFFFF`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 48px:
- H2 center 36/700 `#0A1628`: "How we compare"
- Body center 16/400 `#666666` max-width 600px, margin auto: "KYC providers rarely publish pricing. Here's an honest market comparison based on public information and analyst estimates."

#### Comparison Table

Container: full-width, max-width 1040px, margin 0 auto, 12px radius, `border: 1px #E0E0E5`, overflow hidden.

**Table header row** — `Fill: #0A1628`, padding 16 24. Horizontal, 5 columns:
- "Verification Type" — 220px — Caption 12/500 `rgba(255,255,255,0.60)` left-aligned
- "Solidus Verify" — flex — Caption 12/500 white bold, center. Column has `Fill: rgba(168,230,0,0.06)` tint applied to entire column.
- "Stripe Identity" — flex — Caption 12/500 `rgba(255,255,255,0.60)` center
- "Sumsub (est.)" — flex — Caption 12/500 `rgba(255,255,255,0.60)` center
- "Persona" — flex — Caption 12/500 `rgba(255,255,255,0.60)` center
- "Veriff" — flex — Caption 12/500 `rgba(255,255,255,0.60)` center

Note: Table has 6 columns total (type + 5 providers). Adjust "5 columns" above to 6.

**Table rows** — 5 data rows. Alternating `#FFFFFF` / `#F9F9FB`. Row height 56px. Padding 0 24px. `border-bottom: 1px #E0E0E5`. Hover: `Fill: #F0F4FF` 150ms.

Row anatomy: Horizontal, Alignment Center:
- Type cell (220px): Body 14/500 `#0A1628` left-aligned
- Solidus cell (flex): `Fill: rgba(168,230,0,0.06)` bg tint. Body 14/600 `#0A1628` center. Featured prices in `#34C759`.
- Competitor cells (flex): Body 14/400 `#666666` center

Data:

Row 1 — Email verification:
- Solidus: Body 14/600 `#34C759` "$0.10"
- Stripe: "$0.30"
- Sumsub: "N/A"
- Persona: "$0.30"
- Veriff: "N/A"

Row 2 — Phone verification:
- Solidus: "$0.20"
- Stripe: "$0.50"
- Sumsub: "N/A"
- Persona: "$0.40"
- Veriff: "N/A"

Row 3 — KYC L2 (doc + liveness):
- Solidus: Body 14/600 `#34C759` "$5.00"
- Stripe: "$1.50" + below: Caption 11/400 `#999999` "doc only, no credential" (2-line cell, row height 64px for this row)
- Sumsub: "~$15–20" + Caption `#999999` "estimate"
- Persona: "$3–8"
- Veriff: Body 14/400 italic `#666666` "Contact sales"

Row 4 — Re-verification (credential reuse):
- Solidus: H3 14/700 `#34C759` "$0.05" — row gets subtle `Fill: rgba(168,230,0,0.04)` tint full-width
- Stripe: Body 14/400 `#666666` "Same as initial"
- Sumsub: "Same"
- Persona: "Same"
- Veriff: "Same"

Row 5 — Credential issuance:
- Solidus: "$0.01 standalone"
- Stripe: Body 14/400 `#999999` italic "Not included"
- Sumsub: Body 14/400 `#999999` italic "Not included"
- Persona: Body 14/400 `#999999` italic "Not included"
- Veriff: Body 14/400 `#999999` italic "Not included"

**Footnote** — padding 16 24, `Fill: #F9F9FB`, `border-top: 1px #E0E0E5`. Caption 11/400 `#999999`: "Market estimates based on public pricing pages and third-party analyst reports as of Q1 2026. Sumsub and Veriff pricing requires direct sales contact. Actual pricing varies by contract volume and region. Solidus pricing as per verify.solidus.network/pricing."

---

### B8: Query Explainer (insert into Screen 17 — Pricing Page)

**Insertion point:** Insert `WhatIsAQuerySection` after the `FAQ Section` in Screen 17 (Pricing Page). This is the final content section before the Enterprise CTA.

#### WhatIsAQuerySection

Full-width section. Padding 48 120px. `Fill: #F2F2F7`.

**Section header** — Vertical Auto Layout, spacing 8px, Alignment Center, margin-bottom 32px:
- H2 center 36/700 `#0A1628`: "What counts as a query?"

#### QueryExplainerCard

`QueryExplainerCard` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32, max-width 720px, margin 0 auto.

**3 scenario rows** — Vertical Auto Layout, spacing 0. Each `ScenarioRow`: Horizontal Auto Layout, spacing 20px, Alignment Start, padding 20 0, `border-bottom: 1px #E0E0E5` (last: no border).

Row 1 — Email Verification:
- Icon area: 40×40px, `Fill: rgba(0,102,255,0.08)`, `border: 1px rgba(0,102,255,0.15)`, 8px radius. icon/mail 20px `#0066FF` centered.
- Content — Vertical Auto Layout, spacing 6px, flex-grow:
  - H3 "Email Verification" 16/600 `#0A1628`
  - Body 14/400 `#666666` "User clicks a confirmation link. Instant. No document required."
  - H3 "$0.10 · 1 query" 14/600 `#0A1628`

Row 2 — KYC Level 2:
- Icon area: `Fill: rgba(0,102,255,0.08)`. icon/shield-check 20px `#0066FF`.
- H3 "KYC Level 2 Session" 16/600 `#0A1628`
- Body 14/400 `#666666` "User uploads passport, completes liveness check, validators confirm on-chain. Credential issued and anchored to the Solidus blockchain. All steps within a single session = 1 query."
- H3 "$5.00 · 1 query" 14/600 `#0A1628`

Row 3 — Credential Re-presentation:
- Icon area: `Fill: rgba(168,230,0,0.08)`, `border: 1px rgba(168,230,0,0.20)`. icon/repeat 20px `#A8E600` (lime icon).
- H3 "Credential Re-presentation" 16/600 `#0A1628`
- Body 14/400 `#666666` "User's existing KYC credential is presented to a new service. No re-upload. No new liveness check. No new validation session."
- H3 `#34C759` "$0.05 · NOT a query — flat fee only" 14/700

**Highlighted callout** — margin-top 24px. `Fill: rgba(168,230,0,0.08)`, `border: 1px rgba(168,230,0,0.20)`, 8px radius, padding 16. Horizontal Auto Layout, spacing 12px, Alignment Start:
- icon/info 16px `#A8E600`, flex-shrink 0, margin-top 2px
- Body 14/400 `#0A1628` "Re-presentations are never queries. They are charged at a flat $0.05 regardless of how many times the credential is reused across different services."

---

### B9: Regulatory Compliance Detail (insert into Screen 18 — Security Page)

**Insertion point:** Insert `RegulatoryDetailSection` after the `Privacy Architecture Principles` section and before the `Audit Reports Section` in Screen 18.

#### RegulatoryDetailSection

Full-width section. Padding 80 120px. `Fill: #FFFFFF`.

**Section header** — Vertical Auto Layout, spacing 12px, Alignment Center, margin-bottom 48px:
- H2 center 36/700 `#0A1628`: "Regulatory compliance, mapped"

**Accordion — 5 regulations.** Each `RegAccordionItem`: `#FFFFFF` bg, `border: 1px #E0E0E5`, 8px radius, overflow hidden, margin-bottom 12px.

Collapsed state: padding 20 24. Horizontal Auto Layout, Space Between, Alignment Center. H3 20/600 `#0A1628` regulation name + right cluster: jurisdiction badge + icon/chevron-down 18px `#8E8E93`.

Jurisdiction badge: height 24px, padding 0 10px, `radius-full`, `Fill: #F2F2F7`, `border: 1px #E0E0E5`, Caption 11/600 `#666666`.

Expanded state: header stays, `border-bottom: 1px #E0E0E5`. Body: padding 0 24 24. Animated: `max-height: 0→auto` + `opacity 0→1`, 200ms ease-out.

Expanded body contains a 2-column table: `border: 1px #E0E0E5`, 8px radius, overflow hidden. Header row: `Fill: #F2F2F7`, padding 10 16. Caption 12/600 `#666666` "Requirement" (50%) + "Solidus Implementation" (50%). Data rows: alternating `#FFFFFF`/`#F9F9FB`, padding 14 16, `border-top: 1px #E0E0E5`. Caption 13/500 `#0A1628` (requirement) + Body 13/400 `#666666` (implementation), Alignment Start.

---

**Accordion Item 1 — GDPR (EU)**
- Header: "GDPR" + badge "European Union" + badge "Current"
- Rows:
  1. "Article 5(1)(e) — Storage limitation" | "Biometric data deleted immediately after processing. Verification result stored as BLAKE3 hash only. No PII persisted post-session."
  2. "Article 17 — Right to erasure" | "Account deletion removes all off-chain data within 24 hours. The on-chain hash is a one-way cryptographic proof and cannot be reversed to recover PII."
  3. "Article 25 — Privacy by design" | "Zero-knowledge architecture. No personal data stored on the Solidus protocol layer. Compliance is architectural, not policy-dependent."
  4. "Article 32 — Security of processing" | "TLS 1.3 in transit. BLAKE3 hashing for verification results. BLS signatures for validator consensus. FIPS-validated key management."

**Accordion Item 2 — MiCA (EU)**
- Header: "MiCA" + badge "European Union" + badge "Current"
- Rows:
  1. "Article 68 — KYC for VASP operators" | "KYC Level 2 satisfies MiCA Article 68 identity verification requirements for crypto-asset service providers operating in the EU."
  2. "FATF Travel Rule (via MiCA)" | "Credential attestation model is compatible with FATF Travel Rule originator/beneficiary identification via W3C VC metadata fields."

**Accordion Item 3 — eIDAS 2 (EU)**
- Header: "eIDAS 2" + badge "European Union" + badge "Current"
- Rows:
  1. "EU Digital Identity Wallet (EUDIW) compatibility" | "W3C VC credentials issued by Solidus are structurally compatible with the EU Digital Identity Wallet (EUDIW) standard. No format conversion required."
  2. "Electronic Attestation of Attributes (EAA)" | "Solidus credentials qualify as Electronic Attestation of Attributes under eIDAS 2, enabling their use in EU-regulated identity workflows."

**Accordion Item 4 — FATF Travel Rule**
- Header: "FATF Travel Rule" + badge "Global" + badge "Current"
- Rows:
  1. "VASP originator/beneficiary identification" | "Solidus credentials include VASP-identifiable fields compliant with FATF Recommendation 16 Travel Rule requirements for virtual asset transfers."
  2. "Counterparty VASP lookup" | "Credential attestation model supports counterparty VASP discovery without exposing raw PII in the transaction flow."

**Accordion Item 5 — BIPA (Illinois, USA)**
- Header: "BIPA" + badge "Illinois, USA" + badge "Current"
- Rows:
  1. "Written informed consent (740 ILCS 14/15(b))" | "A signed consent transaction is required on-chain before any biometric processing begins. Consent is cryptographically verifiable and timestamped."
  2. "Biometric data retention prohibition" | "Facial biometrics are processed in memory only. No facial template, biometric identifier, or biometric information is written to any storage medium."
  3. "Destruction schedule" | "As no biometric data is retained, no retention schedule is required. BIPA §15(e) satisfied by architectural non-retention."

---

### B10: Bug Bounty & Responsible Disclosure (insert into Screen 18 — Security Page)

**Insertion point:** Insert `BugBountySection` after the `Audit Reports Section` in Screen 18. This is the final content section on the Security page.

#### BugBountySection

Full-width section. Padding 64 120px. `Fill: #F2F2F7`.

#### BugBountyCard

`BugBountyCard` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32, max-width 900px, margin 0 auto. 2-column layout, gap 48px, Horizontal Auto Layout, Alignment Start.

**Left column** — Vertical Auto Layout, spacing 20px, flex: 1:
- icon/bug 48px `#0066FF`
- H2 28/600 `#0A1628` "Responsible Disclosure"
- Body 16/400 `#666666` line-height 1.7: "We take security seriously. If you discover a vulnerability in Solidus Verify, report it responsibly. We commit to acknowledging reports within 24 hours and resolving critical issues within 7 days. We will not pursue legal action against good-faith security researchers."
- List — Vertical Auto Layout, spacing 10px, margin-top 4px:
  - 3 `ListItem` — Horizontal, spacing 10px: icon/check-circle 16px `#34C759` + Body 14/400 `#0A1628`
  - "24-hour acknowledgment guaranteed"
  - "7-day resolution target for critical issues"
  - "No legal action against responsible researchers"

**Right column** — Vertical Auto Layout, spacing 16px, flex: 1:

Reward tiers table — `#F2F2F7` bg, 8px radius, padding 20, `border: 1px #E0E0E5`. Vertical Auto Layout, spacing 0.

Table header row — padding 10 16, `border-bottom: 1px #E0E0E5`. Horizontal, Space Between. Caption 12/600 `#666666` "Severity" + Caption 12/600 `#666666` "Reward".

4 severity rows — each: padding 14 16, `border-bottom: 1px #E0E0E5` (last: no border). Horizontal, Space Between, Alignment Center:

- Critical (RCE, auth bypass): Caption 13/600 `#FF3B30` "Critical" + small descriptor Caption 11/400 `#8E8E93` "(RCE, auth bypass)" below (Vertical in left cell) | H3 16/600 `#34C759` "Up to $10,000"
- High (data exposure, priv escalation): Caption 13/600 `#FF9500` "High" + Caption `#8E8E93` "(data exposure, privilege escalation)" | H3 16/600 `#0A1628` "$2,500"
- Medium (CSRF, stored XSS): Caption 13/500 `#0A1628` "Medium" + Caption `#8E8E93` "(CSRF, stored XSS)" | H3 16/600 `#0A1628` "$500"
- Low (info disclosure): Caption 13/500 `#8E8E93` "Low" + Caption `#8E8E93` "(information disclosure)" | Body 14/400 `#666666` "Acknowledgment"

"Submit Report" primary button — full-width, height 44px, `Fill: #0066FF`, 8px radius, Body 15/600 white. Margin-top 16px.

Caption 11/400 `#666666` margin-top 8px: "Security reports: security@solidus.network · PGP key available on request · Response within 24 hours"

---

### B11: Downloadable Audit Reports Expansion (expand existing Audit Reports in Screen 18)

**Modification:** Replace the simple `Audit Reports Section` table in Screen 18 with the full `AuditReportsCard` spec below.

#### AuditReportsCard

`AuditReportsCard` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32, max-width 1040px, margin 0 auto.

**Header** — H2 28/600 `#0A1628` "Audit Reports & Certifications", margin-bottom 24px.

**2-column grid** — gap 20px. 4 `ReportCard` total (2 per row).

`ReportCard` — `#F2F2F7` bg, 8px radius, padding 20, `border: 1px #E0E0E5`. Horizontal Auto Layout, Space Between, Alignment Start.

Left: Horizontal Auto Layout, spacing 14px, Alignment Start, flex-grow:
- Icon 32×32px: `Fill: rgba(color,0.10)`, 8px radius. Icon 18px centered. (icon and color per report below)
- Vertical Auto Layout, spacing 4px:
  - H3 16/600 `#0A1628` report name
  - Body 14/400 `#666666` scope description
  - Caption 12/400 `#8E8E93` date

Right: Vertical Auto Layout, spacing 6px, Alignment End:
- Horizontal Auto Layout, gap 6px:
  - "PDF" ghost button: height 28px, padding 0 10px, `border: 1px #E0E0E5`, 4px radius, Caption 11/600 `#0A1628`. Hover: `Fill: #E8EDF5`, 150ms.
  - "JSON" ghost button: same spec.
- If notes: Caption 11/400 `#8E8E93` max-width 140px, text-align right (e.g. "Summary only")

4 Reports:

**Report 1 — Protocol Security Audit Q1 2026:**
- Icon: icon/shield-check 18px `#0066FF`, bg `rgba(0,102,255,0.10)`
- Name: "Protocol Security Audit Q1 2026"
- Scope: "Credential issuance + validator consensus mechanisms"
- Date: "January 2026"
- Downloads: PDF + JSON

**Report 2 — Open Source Audit Q4 2025:**
- Icon: icon/code 18px `#A8E600`, bg `rgba(168,230,0,0.10)`
- Name: "Open Source Audit Q4 2025"
- Scope: "Protocol smart contracts + validator node software"
- Date: "November 2025"
- Downloads: PDF + JSON

**Report 3 — GDPR Compliance Assessment:**
- Icon: icon/globe 18px `#00D4FF`, bg `rgba(0,212,255,0.10)`
- Name: "GDPR Compliance Assessment"
- Scope: "Data processing mapping, Article 25 privacy-by-design audit"
- Date: "February 2026"
- Downloads: PDF + JSON

**Report 4 — Penetration Test Summary 2026:**
- Icon: icon/file-text 18px `#8E8E93`, bg `rgba(142,142,147,0.10)`
- Name: "Penetration Test Summary 2026"
- Scope: "API surface, authentication layer, webhook endpoints"
- Date: "March 2026"
- Downloads: PDF only (JSON not available)
- Note: Caption 11/400 `#8E8E93` "Summary only · Full report on NDA request"

**Footer note** — centered, margin-top 20px. Caption 12/400 `#666666` center: "Independent security audits commissioned quarterly. All reports published in full unless noted. Next scheduled audit: May 2026."

---

### B12: Migration Guide Section (insert into Screen 20 — Enterprise Page)

**Insertion point:** Insert `MigrationGuideSection` after `EnterpriseCustomersLogos` (the enterprise customer logos grid) and before `ContactForm` in Screen 20.

#### MigrationGuideSection

Full-width section. Padding 80 120px. `Fill: #F2F2F7`.

**Section header** — Vertical Auto Layout, spacing 12px, max-width 600px, margin 0 auto, Alignment Center, margin-bottom 48px:
- H2 36/700 `#0A1628`: "Migrating from another provider?"
- Body 16/400 `#666666` line-height 1.7: "We make it easy. Our team handles the migration planning — you focus on your product. Typical migrations complete in 48–72 hours with zero downtime."

**3-column card row** — Horizontal Auto Layout, gap 24px, margin-bottom 48px.

`MigrationCard` × 3 — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 24, Vertical Auto Layout, spacing 16px, flex: 1. Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)` 200ms.

Card anatomy:
- Provider header row — Horizontal Auto Layout, spacing 10px, Alignment Center:
  - icon/arrow-right 24px `#0066FF`
  - H3 20/600 `#0A1628` "From [Provider]"
- Body 14/400 `#666666` line-height 1.7 migration description
- "Migration guide →" link — Body 14/500 `#0066FF`. Hover: underline + icon/arrow-right nudge 2px right 150ms.

3 cards:

**Card 1 — From Sumsub:**
- "From Sumsub"
- "Export your applicant list via the Sumsub Management API. Solidus ingests verified user records and re-issues equivalent W3C VCs. All new verifications run through Solidus from day one. 48–72 hours typical migration window."

**Card 2 — From Stripe Identity:**
- "From Stripe Identity"
- "Export verification records via the Stripe API. Solidus maps verified sessions to DID-based credentials. Your existing webhook endpoints remain unchanged — only the payload format updates. 24–48 hours typical."

**Card 3 — From Onfido:**
- "From Onfido"
- "Export applicant data and check results from Onfido's reporting API. Solidus reissues credentials for verified users without requiring re-verification. Integration layer takes 1–2 days. Users never see a disruption."

#### MigrationTimeline

`MigrationTimeline` — `#FFFFFF` bg, 12px radius, `border: 1px #E0E0E5`, padding 32. Horizontal Auto Layout, gap 0. Full-width, max-width 100%.

4 `TimelineStep` — each: flex 1, padding 0 24px, `border-right: 1px #E0E0E5` (last: no border). Vertical Auto Layout, spacing 10px, Alignment Center:
- Step circle: 36×36px, `Fill: #0066FF`, `radius-full`. H3 16/700 white step number centered.
- H3 "Day X — [Title]" 15/600 `#0A1628` text-align center
- Caption 13/400 `#666666` text-align center description (max 2 lines)
- Connector: the `border-right` between steps serves as visual separator. No additional arrow.

Steps:
1. Day 1 — "Export data" — "We export your applicant records from your existing provider using their API."
2. Day 2 — "API integration" — "Solidus integration added alongside your existing provider in shadow mode."
3. Day 3 — "Shadow mode test" — "Run both systems in parallel. Compare outputs. Validate parity."
4. Day 5 — "Cutover" — "Existing provider decommissioned. Solidus is live. Migration complete."

**Contact prompt** — centered, margin-top 32px. Horizontal Auto Layout, gap 12px, Alignment Center, Justify Center:
- Body 15/400 `#666666` "Need a custom migration plan?"
- "Talk to an Engineer" ghost button: height 40px, padding 0 20px, `border: 1px #0A1628`, 8px radius, Body 14/500 `#0A1628`. Hover: `Fill: #0A1628`, white text, 200ms.

---

### B13: Security Questionnaire Section (insert into Screen 20 — Enterprise Page)

**Insertion point:** Insert `SecurityQuestionnaireSection` after `MigrationGuideSection` (B12) and immediately before `ContactForm` in Screen 20.

#### SecurityQuestionnaireSection

Full-width section. Padding 64 120px. `Fill: #FFFFFF`.

2-column layout — Horizontal Auto Layout, gap 64px, max-width 1000px, margin 0 auto, Alignment Start.

**Left column** — Vertical Auto Layout, spacing 20px, flex: 1:
- icon/file-check 48px `#0066FF`
- H2 32/600 `#0A1628` "Security Questionnaire & RFP Support"
- Body 16/400 `#666666` line-height 1.7: "Enterprise procurement teams require security questionnaires before onboarding any vendor. We've pre-filled the most common formats so your security team doesn't start from scratch. Download, verify, sign."

`CheckList` — Vertical Auto Layout, spacing 12px, margin-top 4px. 4 `CheckItem` — Horizontal Auto Layout, spacing 10px, Alignment Start:
- icon/check-circle 16px `#0066FF`, flex-shrink 0, margin-top 2px
- Body 14/400 `#0A1628`

Items:
1. "SIG Lite questionnaire (pre-filled PDF)"
2. "SOC 2 bridge letter (covers Year 1 controls)"
3. "GDPR Article 28 Data Processing Agreement template"
4. "MSA template with security addendum"

**Right column** — flex: 1.

`DownloadCard` — `#F2F2F7` bg, 12px radius, `border: 1px #E0E0E5`, padding 24. Vertical Auto Layout, spacing 0.

H3 "Available Documents" 16/600 `#0A1628`, margin-bottom 16px.

4 `DownloadRow` — each: Horizontal Auto Layout, Space Between, Alignment Center, padding 14 0, `border-bottom: 1px #E0E0E5` (last: no border):

Left: Vertical Auto Layout, spacing 2px:
- Body 14/500 `#0A1628` document name
- Caption 12/400 `#8E8E93` format + file size

Right: Horizontal Auto Layout, spacing 8px, Alignment Center:
- Optional badge (when applicable): height 20px, padding 0 8px, `radius-full`, `Fill: rgba(52,199,89,0.10)`, `border: 1px rgba(52,199,89,0.25)`, Caption 10/600 `#34C759`
- "Download" ghost button: height 28px, padding 0 12px, `border: 1px #E0E0E5`, 4px radius, Caption 12/500 `#0A1628`, icon/download 12px `#666666` left 4px gap. Hover: `Fill: #E8EDF5` 150ms. Variant: "Request" for gated documents.

4 rows:
1. "SIG Lite — Security Questionnaire" + "PDF · 2.4 MB" | "Download"
2. "GDPR Article 28 DPA Template" + "DOCX · 186 KB" | "Download"
3. "SOC 2 Bridge Letter" + "PDF · 340 KB" | badge "Updated Q1 2026" + "Download"
4. "Sample MSA + Security Addendum" + "DOCX · 420 KB" | "Request" (not download — requires email verification)

Note below `DownloadCard` — Caption 12/400 `#666666` margin-top 12px: "Need to share a full architecture diagram or vulnerability disclosure history under NDA? " + "Contact Enterprise Sales →" Caption 12/500 `#0066FF` underline inline.
