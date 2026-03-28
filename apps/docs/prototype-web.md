## Design System
Solidus Network — Inter Variable (UI) + JetBrains Mono (IDs, hashes, code, keys) — dark mode for app, light mode for marketing. See `/projects/DESIGN_SYSTEM_REFERENCE.md` for full token reference.

---

## Frame Setup

Viewport: 1440px wide. App layout: Sidebar 240px fixed left + main content area fills remaining 1200px, 24px padding on all sides. Marketing layout: full-width, container max 1200px, 120px horizontal padding. Mode: dark for all app screens, light for all marketing/landing pages. All cards: `box-shadow: 0 2px 8px rgba(0,0,0,0.32)`. Modals: `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. Brand glow on featured elements: `box-shadow: 0 0 24px rgba(0,212,255,0.15)`.

---

## Product

**verify.solidus.network** — B2B KYC verification service. First product in the Solidus Network ecosystem.

**Audience:** Compliance officers at crypto exchanges and fintechs, backend developers integrating KYC APIs, operations teams running daily verification queues.

**Visual personality:** Clinical, institutional, trustworthy. This is where financial compliance happens. Every element communicates precision. The aesthetic is Stripe Dashboard meets Bloomberg Terminal — data-dense but organized, never overwhelming. Status colors (green / amber / red) are the primary visual language. Tables are dense by design. Brand gradient appears only on hero sections and featured cards. No decorative elements without functional purpose.

**Core value proposition:** Verify a user once via government ID + liveness check. The resulting W3C Verifiable Credential is stored in the user's DID wallet and can be reused across any Solidus-integrated service. Re-verification costs $0.05 instead of $5–20. The user's biometric data is never stored on any server.

**Color tokens (quick reference):**
- Background: `#0A1628` | Surface: `#1A1A2E` | Elevated: `#242438` | Border: `#2A2A42`
- Text primary: `#FFFFFF` | Text secondary: `#8E8E93` | Text disabled: `#48484F`
- CTA blue: `#0066FF` | Lime: `#A8E600` | Cyan: `#00D4FF`
- Success: `#34C759` | Warning: `#FF9500` | Error: `#FF3B30`
- Brand gradient: `linear-gradient(135deg, #A8E600 0%, #00D4FF 50%, #003366 100%)`

---

## Shared Components (used across all app screens)

### Sidebar (240px)
- Background: `#1A1A2E`. Border-right: `1px #2A2A42`.
- Logo area: 64px height, 20px horizontal padding. Solidus "S" `solidus_dark.png` logomark (24px) + "Solidus Verify" wordmark in Body 14/600 white.
- Environment toggle directly below logo: pill toggle, 2 states. Active environment has filled background.
  - Sandbox: `Fill: rgba(255,149,0,0.12)`, `Border: 1px rgba(255,149,0,0.25)`, Caption 11/500 `#FF9500`: "SANDBOX"
  - Production: `Fill: rgba(52,199,89,0.12)`, `Border: 1px rgba(52,199,89,0.25)`, Caption 11/500 `#34C759`: "PRODUCTION"
- Nav items below, each 44px height, 0 16px padding, Horizontal Auto Layout, spacing 10px:
  - Lucide icon 20px + Small 14/400 label
  - Active: `3px left border #0066FF`, icon `#0066FF`, text white
  - Inactive: icon `#8E8E93`, text `#8E8E93`
  - Hover: background `#242438`, 150ms
- Nav items: Dashboard (layout-dashboard), Verifications (shield-check), Analytics (bar-chart-2), Credentials (award), API Keys (key), Webhooks (webhook), Audit Log (scroll-text), Team (users), Billing (credit-card), Settings (settings)
- Section divider between "Verifications / Analytics / Credentials" and "API Keys / Webhooks / Audit Log": `1px #2A2A42`, Caption 10/500 `#48484F` uppercase: "DEVELOPER" left-padded 16px.
- Bottom: user profile row, 56px height, 16px padding. Avatar circle 32px (`#242438` bg, initials Caption white) + Vertical: org name Small 14/600 white (truncate at 140px) + email Caption 12/400 `#8E8E93` (truncate). Chevron-down icon 16px `#8E8E93` right side. Hover: background `#242438`.

### Top Bar (64px)
- Background: `#0A1628`. Border-bottom: `1px #2A2A42`.
- Left: page title H2 28/600 white (changes per page).
- Right: row, gap 8px — `LanguageSwitcher` + `ThemeToggle` + notification bell icon-btn (40×40px, `#242438` bg, bell icon 20px `#8E8E93`; red dot 8px at top-right when alerts present) + "New Verification" primary button `#0066FF` 36px height, padding 0 16px, Body 14/600, plus icon 16px left.
  - **LanguageSwitcher**: Fill `#1A1A2E`, Border `1px #2A2A42`, Corner Radius 6px, Padding `8px 12px`, Height 36px. Trigger: `globe` 18px `#8E8E93` + current code "EN" Caption 12/500 `#8E8E93` + `chevron-down` 12px `#8E8E93`. Hover: Fill `#242438`, border `rgba(255,255,255,0.16)`, text `#FFFFFF`, 150ms. Active: border `#0066FF/60%`. Dropdown: Fill `#1A1A2E`, Border `1px #2A2A42`, 8px radius, min-width 180px, shadow `0 8px 24px rgba(0,0,0,0.48)`. Opens 200ms ease-out scale-y 0.95→1 + opacity 0→1. Language rows 40px: flag + native name Body 14px white + code Caption 11px `#48484F` right. Active row: Fill `rgba(0,102,255,0.10)`, 3px left border `#0066FF`. Hover row: Fill `#242438`. Supported: EN 🇬🇧 · TR 🇹🇷 · DE 🇩🇪 · FR 🇫🇷 · ES 🇪🇸 · JA 🇯🇵 · KO 🇰🇷 · ZH 🇨🇳.
  - **ThemeToggle**: Container 36×36px, Fill `#1A1A2E`, Border `1px #2A2A42`, Corner Radius 6px. Icon: Lucide `sun` (light mode) or `moon` (dark mode), 18px, Fill `#8E8E93`. Hover: Fill `#242438`, icon Fill `#FFFFFF`, 150ms ease-out. Tooltip (400ms delay): "Switch to light/dark mode". Icon crossfade 200ms. Full page color transition: background-color, color, border-color 200ms ease simultaneously.

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

### Status Badge (reusable, pill shape)
- Height 24px, horizontal padding 8px, Caption 12/500, `radius-full`
- Verified: bg `rgba(52,199,89,0.15)`, text `#34C759`, border `1px rgba(52,199,89,0.30)`
- Pending: bg `rgba(255,149,0,0.15)`, text `#FF9500`, border `1px rgba(255,149,0,0.30)`
- Failed: bg `rgba(255,59,48,0.15)`, text `#FF3B30`, border `1px rgba(255,59,48,0.30)`
- Processing: bg `rgba(0,102,255,0.15)`, text `#0066FF`, border `1px rgba(0,102,255,0.30)` — icon/loader 10px spinning left of text
- Revoked: bg `rgba(142,142,147,0.15)`, text `#8E8E93`, border `1px rgba(142,142,147,0.30)`

## New Shared Components (E1–E6)

### E1: `RiskScoreBadge`

Compact inline badge displaying a numerical risk score (0–100) with a human-readable tier label. Appears in Verifications List rows, Verification Detail header, Cases queue table, and Case Detail Panel.

**Container:** Horizontal Auto Layout, spacing 6px, padding 4px 8px, `border-radius: 9999px` (full pill). Height fits content (minimum 22px).

**Score display:** JetBrains Mono 12/600. Always the numeric value: "42" / "89" / "14".

**Separator:** Caption 11/400 `#48484F` " · " (U+00B7 middle dot with spaces).

**Label text:** Caption 11/500. Matches risk tier.

**Tier states:**

- **Low (score 0–30):**
  `Fill: rgba(52,199,89,0.12)`, `border: 1px rgba(52,199,89,0.25)`. Score color: `#34C759`. Label text: "Low" `#34C759`. Example: "14 · Low"

- **Medium (score 31–70):**
  `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.25)`. Score color: `#FF9500`. Label text: "Medium" `#FF9500`. Example: "42 · Medium"

- **High (score 71–100):**
  `Fill: rgba(255,59,48,0.12)`, `border: 1px rgba(255,59,48,0.25)`. Score color: `#FF3B30`. Label text: "High" `#FF3B30`. Example: "89 · High"

**Large variant** (used in Case Detail Panel header): Scale font sizes to JetBrains Mono 15/600 for score, Body 13/500 for label. Height 32px, padding 6px 14px. All tier colors identical.

**Tooltip on hover** (200ms delay): `#242438` bg, 6px radius, padding 8 12, shadow `0 4px 12px rgba(0,0,0,0.32)`. Caption 12/400 `#8E8E93`: "Risk score calculated from: IP reputation, document confidence, liveness score, velocity checks."

---

### E2: `WorkflowCanvas`

Full-screen three-panel drag-and-drop canvas for the Workflow Builder screen (Screen 26). Houses the Step Library panel (left), the canvas area (center), and the Step Config panel (right).

**Outer container:** `width: 100%`, `height: calc(100vh - 56px)` (below toolbar), Horizontal Auto Layout, spacing 0. No scroll on the outer container.

---

**Left sub-component — `StepLibraryPanel` (260px fixed width):**
`Fill: #1A1A2E`, `border-right: 1px #2A2A42`. Vertical Auto Layout, spacing 0. Overflow-y auto.

Header: padding 16 16 8. H3 Caption 12/600 `#8E8E93` uppercase letter-spacing 0.08em: "STEP LIBRARY".

Search input: padding 0 16 12. Input height 32px, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius. icon/search 14px `#48484F` left inside (8px inset). Body 13/400 `#48484F` placeholder "Search steps...". Focus: `border: 1px #0066FF`.

Category sections (each collapsible via chevron-right/down 14px `#8E8E93` right):
- Section header: padding 8 16, Caption 11/600 `#48484F` uppercase letter-spacing 0.06em. e.g. "CHECKS", "LOGIC", "ACTIONS".

`StepLibraryItem` — Horizontal Auto Layout, spacing 10px, padding 8 12, 6px radius. `cursor: grab`. Hover: `Fill: #242438`, 150ms.
- Left: Lucide icon 16px (color per category).
- Center (flex-grow): Vertical Auto Layout, spacing 2px. Body 13/500 white (step name) + Caption 11/400 `#8E8E93` (sub-label or price).
- Right: none (price shown as sub-label).

**CHECKS category:**
1. `EmailCheck` — icon/mail 16px `#0066FF` — "Email Verification" / "$0.10"
2. `PhoneCheck` — icon/smartphone 16px `#0066FF` — "Phone Verification" / "$0.20"
3. `KYCL1Check` — icon/user-check 16px `#0066FF` — "KYC Level 1" / "$1.00"
4. `KYCL2Check` — icon/shield-check 16px `#0066FF` — "KYC Level 2" / "$5.00"
5. `KYCL3Check` — icon/scan-face 16px `#0066FF` — "KYC Level 3" / "$20.00"

**LOGIC category:**
1. `IfCondition` — icon/git-branch 16px `#A8E600` — "If / Else" / "Route by result"
2. `WaitStep` — icon/pause 16px `#A8E600` — "Wait" / "Delay execution"
3. `SetVariable` — icon/variable 16px `#A8E600` — "Set Variable" / "Store result"

**ACTIONS category:**
1. `WebhookAction` — icon/webhook 16px `#00D4FF` — "Fire Webhook" / "Notify endpoint"
2. `IssueCredential` — icon/award 16px `#00D4FF` — "Issue Credential" / "Mint W3C VC"
3. `RevokePrevious` — icon/shield-off 16px `#FF3B30` — "Revoke Previous" / "Invalidate old VC"

Drag interaction: on mousedown, item lifts with `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`, `opacity: 0.9`, cursor changes to `grabbing`. Drop target (canvas area) highlights with `border: 1.5px dashed rgba(0,102,255,0.50)` on drag-over.

---

**Center sub-component — `CanvasArea` (flex-grow, fills remaining width):**
`Fill: #0A1628`. Overflow hidden. Relative position container for absolutely placed nodes.

**Dot grid background:** 1px dots every 24px, `Fill: #1A1A2E`. Implemented as repeating radial-gradient or SVG pattern tile.

**Zoom level:** Displayed in `ZoomControls` — bottom-right corner, 12px inset. Horizontal Auto Layout, spacing 4px. Buttons: 28×28px circle, `Fill: #242438`, `border: 1px #2A2A42`, 14px radius. Icons: icon/minus and icon/plus 14px `#8E8E93`. Center text: Body 13/400 `#8E8E93` "100%". Hover button: `Fill: #2A2A42`. Range: 25%–200%. Scroll to zoom (Ctrl/Cmd + scroll). Space + drag to pan canvas.

**`StartNode`:** 120×56px. `Fill: rgba(0,102,255,0.06)`, `border: 1.5px dashed #0066FF`, 8px radius. Horizontal Auto Layout, center, spacing 8px. icon/play-circle 16px `#0066FF` + Body 13/500 `#0066FF` "Session Created". Not draggable (fixed origin). One output port: 6px circle `#0066FF` centered on right edge.

**`WorkflowStepNode`:** 200×80px. `Fill: #1A1A2E`, `border: 1px #2A2A42`, 8px radius, `box-shadow: 0 2px 8px rgba(0,0,0,0.32)`. Draggable. Padding 14 16.
- Top row: Horizontal Auto Layout, Space Between. Left: step type icon 16px (category color) + Body 14/600 white step name (max 120px truncated). Right: icon/more-horizontal 16px `#48484F` (visible on hover only).
- Bottom row: Caption 11/400 `#8E8E93` sub-label (e.g. "passport + liveness" / "Notify: kyc.completed").
- Status dot: 6px circle absolute bottom-right inset 10px. `#34C759` = active/configured, `#FF9500` = warning, omit if unconfigured.
- **Selected state:** `border: 1px #0066FF`, `box-shadow: 0 0 0 3px rgba(0,102,255,0.25)`. 150ms.
- Input port: 6px circle `#2A2A42` (hover: `#0066FF`) centered on left edge. Output port: same, right edge.

**`ConditionNode`:** 160×72px diamond (CSS `transform: rotate(45deg)` on a square, or SVG polygon). `Fill: #242438`, `border: 1px #2A2A42`. Center text: Caption 11/500 `#8E8E93` "If / Else" (counter-rotated). Input top, 3 output ports: bottom "Pass", right "Review", left "Fail" — each port 6px circle. Port labels Caption 10/500 adjacent: "Pass" `#34C759`, "Fail" `#FF3B30`, "Review" `#FF9500`.

**`EndNode`:** 80×40px. `Fill: #1A1A2E`, `border: 1px #2A2A42`, 20px radius (pill). icon/stop-circle 14px `#48484F` + Caption 11/400 `#8E8E93` "End". Input port left edge, no output port.

**Connector arrows:** SVG `<path>` cubic bezier curves. Stroke 2px, `#2A2A42`. Arrowhead: 8×6px filled polygon, `#2A2A42`. Hover state: stroke `#0066FF`, arrowhead `#0066FF`. Selected connection: stroke `#0066FF`, `filter: drop-shadow(0 0 4px rgba(0,102,255,0.50))`. Branch labels on arrows (Pass / Fail / Review): Caption 10/500 in rounded pill `Fill: #242438`, padding 2 6, color per branch.

---

**Right sub-component — `StepConfigPanel` (280px fixed width):**
`Fill: #1A1A2E`, `border-left: 1px #2A2A42`. Vertical Auto Layout, spacing 0. Overflow-y auto.

**Empty state (no node selected):** Fills full panel height, vertically centered content. icon/mouse-pointer 32px `#8E8E93` + margin-top 12px + Caption 13/400 `#8E8E93` center "Select a step to configure it".

**Populated state (node selected):** padding 16.
- Header: H3 "Step Configuration" 14/600 white + Caption 11/400 `#8E8E93` step type name below. margin-bottom 16px.
- Config fields (each field block: Caption 12/500 `#8E8E93` label, 6px margin-bottom, control, 12px margin-bottom):
  - **Checkbox group:** field label + vertical list. Each row: 16px checkbox `#242438` bg `border: 1px #2A2A42` 3px radius + Body 14/400 white label. Checked: `Fill: #0066FF`, white checkmark icon.
  - **Toggle:** field label + Horizontal row Space Between. Left: Body 14/400 white option name. Right: 36×20px pill toggle. Off: `Fill: #2A2A42`. On: `Fill: #0066FF`. Thumb: 16×16px circle `#FFFFFF`, translate 2px (off) → 18px (on), 200ms ease.
  - **Slider:** field label + 100% width track. Track: 4px height, `#242438` bg, 4px radius. Fill left of thumb: `#0066FF`. Thumb: 16×16px circle `#FFFFFF` border `2px #0066FF`, `box-shadow: 0 1px 4px rgba(0,0,0,0.32)`. Value label: right-aligned Caption 12/500 white "75%".
  - **Dropdown:** field label + Input 36px `Fill: #242438` `border: 1px #2A2A42` 6px radius Body 14/400 white + chevron-down 14px `#8E8E93` right.
  - **Cost display:** field label + Body 14/400 `#A8E600` "$5.00" — lime color denotes variable cost.

- `KYCL2Check` sample config:
  - "Document Types Accepted" checkboxes: Passport ✓, Driver's License ✓, National ID ✓
  - "Liveness Required" toggle: on
  - "Min Confidence Threshold" slider: 75%
  - "Failure Handling" dropdown: "Route to Review Queue"
  - "Cost per run": "$5.00" lime

- Footer of panel (pinned to panel bottom): `border-top: 1px #2A2A42`, padding 12 16. "Delete Step" button — full-width 36px height, `transparent` bg, `border: 1px rgba(255,59,48,0.30)`, Body 14/500 `#FF3B30`. Hover: `Fill: rgba(255,59,48,0.08)`. Only visible when a node is selected.

---

### E3: `NotificationDropdown`

Dropdown panel rendered from the bell icon in the Top Bar. Displays system alerts, pending actions, and account events in priority order.

**Trigger — bell icon button:**
40×40px, `Fill: #242438`, 8px radius. icon/bell 20px `#8E8E93`. Hover: icon `#FFFFFF`, `Fill: #2A2A42`, 150ms. Active (dropdown open): `border: 1px #0066FF`.

**Unread indicator:** 8px circle `Fill: #FF3B30`, `border: 2px #0A1628`, absolute position top-right corner of button (offset 4px inward). Pulsing animation: `scale(1.0)→scale(1.3)→scale(1.0)`, 2s ease-in-out infinite. Hidden when zero unread.

**Dropdown panel:** 360px wide. `Fill: #1A1A2E`, `border: 1px #2A2A42`, 8px radius, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. Position: absolute, top 48px, right-aligned to bell button right edge. Opens 200ms ease-out: `scale-y 0.96→1.0` origin top + `opacity 0→1`. Closes 150ms ease-in reversed.

**Panel header:** padding 16 20. Horizontal Auto Layout, Space Between, Alignment Center. Left: H3 "Notifications" 16/600 white. Right: Caption 12/500 `#0066FF` "Mark all read". Hover "Mark all read": underline. `border-bottom: 1px #242438`.

**Notification list:** `max-height: 400px`, `overflow-y: auto`. Custom scrollbar: `width: 4px`, track `#0A1628`, thumb `#2A2A42`, 2px radius.

`NotificationItem` — padding 12 16. Horizontal Auto Layout, spacing 10px, Alignment flex-start. `border-bottom: 1px #242438`. Hover: `Fill: #242438`, 150ms transition.

- **Left:** icon 20×20px, color per notification type (defined below). Vertically centered to first text line.
- **Center (flex-grow):** Vertical Auto Layout, spacing 3px.
  - Title: Body 14/400 `#FFFFFF`, max 1 line, text-overflow ellipsis.
  - Detail: Caption 12/400 `#8E8E93`, max 2 lines, line-height 1.5.
  - Timestamp: Caption 11/400 `#48484F`.
- **Right:** 6px circle `Fill: #0066FF` (unread indicator dot), vertically centered. Hidden for read items.

**Unread item styling:** `border-left: 3px solid #0066FF`, left padding adjusted to 13px (compensates for 3px border), `Fill: rgba(0,102,255,0.04)`.

**Notification types (5 types, shown in priority order):**

1. **Webhook failure** — icon/alert-triangle 20px `#FF3B30` (unread).
   - Title: "Webhook endpoint failing"
   - Detail: "api.acme.com returning 500 · 4 failed deliveries"
   - Timestamp: "2m ago"

2. **Pending review** — icon/clock 20px `#FF9500` (unread).
   - Title: "38 sessions need review"
   - Detail: "Oldest case waiting 2h 14min"
   - Timestamp: "5m ago"

3. **Billing warning** — icon/credit-card 20px `#FF9500` (unread).
   - Title: "Usage at 88% of monthly quota"
   - Detail: "Consider upgrading your plan"
   - Timestamp: "1h ago"

4. **Credential expiry** — icon/award 20px `#8E8E93` (read).
   - Title: "1,204 credentials expiring soon"
   - Detail: "Within the next 30 days"
   - Timestamp: "6h ago"

5. **Team invite accepted** — icon/user-check 20px `#34C759` (read).
   - Title: "Sarah Johnson accepted your invite"
   - Detail: "Now has Operator access"
   - Timestamp: "1d ago"

**Panel footer:** padding 14 16. `border-top: 1px #242438`. Center-aligned: Caption 12/500 `#0066FF` "View all notifications →". Hover: underline.

**Empty state (zero notifications):** Replace notification list with 80px height vertically centered content. icon/bell-off 32px `#8E8E93` + Caption 13/400 `#8E8E93` "No notifications" below (spacing 8px). Footer still shown.

---

### E4: `GeoMap`

World map SVG heatmap showing cumulative verification sessions by country. Used on Analytics screen and Dashboard Overview (optional widget).

**Container:** `width: 100%`, height 280px. `Fill: #0A1628`, `border-radius: 8px`. `overflow: hidden`. Horizontal Auto Layout (map area + legend panel side by side).

**Map SVG area (flex-grow):** Simplified Mercator world SVG. Each country is a closed `<path>` element with `data-country` ISO code and `data-count` attributes.

Country fill colors — heatmap scale by verification count:
- No data (0): `Fill: #2A2A42`, `stroke: #1A1A2E`, stroke-width 0.5
- Low (1–100): `Fill: rgba(0,102,255,0.20)`, same stroke
- Medium (101–1,000): `Fill: rgba(0,102,255,0.45)`, same stroke
- High (1,001–10,000): `Fill: rgba(0,102,255,0.70)`, same stroke
- Top (10,001+): `Fill: #0066FF`, same stroke

All country fills transition 400ms ease when data updates.

**Country hover state:** `Fill` brightens by +15% opacity. Cursor: `pointer`.

**Hover tooltip:** `Fill: #242438`, 6px radius, padding 8 12, `box-shadow: 0 4px 12px rgba(0,0,0,0.32)`. Positioned 12px above cursor. Content:
- Body 13/600 white country name "United States"
- Caption 12/400 `#8E8E93` "12,847 verifications"
- Caption 11/400 `#48484F` "18.3% of total"

**Bottom-left legend:** absolute position, inset 12px bottom left. Horizontal Auto Layout, spacing 6px, Alignment Center.
- Caption 11/400 `#8E8E93` "Low"
- Gradient bar: 100px wide, 8px height, 4px radius. `background: linear-gradient(90deg, rgba(0,102,255,0.20) 0%, #0066FF 100%)`.
- Caption 11/400 `#0066FF` "High"

**Right panel — top countries list (160px fixed width):** `Fill: rgba(10,22,40,0.72)`, `border-left: 1px #2A2A42`, padding 12 14. Vertical Auto Layout, spacing 0.
- Header: Caption 11/600 `#48484F` uppercase "TOP COUNTRIES" + margin-bottom 10px.
- 5 rows (each 28px height, Horizontal Auto Layout, spacing 8px, Alignment Center, `border-bottom: 1px #242438`):
  - Flag emoji 16px
  - Caption 12/400 `#8E8E93` ISO-2 code (40px fixed)
  - Body 13/500 white count right-aligned (JetBrains Mono)

Sample top 5:
1. 🇺🇸 US · 12,847
2. 🇩🇪 DE · 8,204
3. 🇬🇧 GB · 7,391
4. 🇸🇬 SG · 5,882
5. 🇫🇷 FR · 4,619

---

### E5: `ReviewQueueCard`

Contextual alert card surfaced on the Dashboard Overview when manual review cases are pending. Renders as a full-width card between the stats row and the volume chart row when `pendingCases > 0`.

**Container:** `Fill: #1A1A2E`, `border-radius: 8px`, `border: 1px rgba(255,149,0,0.25)`, `border-left: 4px solid #FF9500`, padding 16 20. Horizontal Auto Layout, Space Between, Alignment Center.

**Left content:** Vertical Auto Layout, spacing 8px.
- Header row: Horizontal Auto Layout, spacing 8px, Alignment Center. icon/clock 20px `#FF9500` + H3 "Review Queue" 16/600 white + count badge — `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.25)`, `border-radius: 9999px`, Caption 11/600 `#FF9500` padding 2px 8px: "38".
- Stats row: Horizontal Auto Layout, spacing 16px, Alignment Baseline. H2 "38 sessions pending" 32/700 `#FF9500` + separator `1px #2A2A42` 20px height vertical + Caption 12/400 `#8E8E93` "Oldest: 2h 14m waiting".
- SLA warning row (shown only when oldest case age > 4h): icon/alert-circle 14px `#FF3B30` + Caption 12/500 `#FF3B30` "SLA at risk — oldest case exceeds 4h threshold". Horizontal Auto Layout, spacing 6px.

**Right content:** "Go to Cases →" button — 36px height, padding 0 20px, `Fill: #FF9500`, Body 14/600 `#0A1628`, 6px radius. Hover: `Fill: #e68600`. Active: `Fill: #cc7a00`. Transition 150ms.

**Animation on mount:** Slide down 8px + fade in, 200ms ease-out. Not shown in empty/no-pending state.

---

### E6: `CredentialReuseBadge`

Inline indicator of how many times a given W3C VC has been presented to third-party verifiers. Used in Credential Management list rows, Credential Detail panel.

**Container:** Horizontal Auto Layout, spacing 4px, padding 4px 8px. `Fill: rgba(0,212,255,0.08)`, `border: 1px rgba(0,212,255,0.20)`, `border-radius: 9999px` (full pill).

**Icon:** icon/repeat 12px `#00D4FF`.

**Text:** Caption 11/500 `#00D4FF`: "Presented 7×" (format: "Presented N×"). "×" is Unicode U+00D7 multiplication sign, not letter x.

**Count values in sample data:** 1× through 24×. At 0×: text changes to "Never presented" `#48484F`, icon `#48484F`, `Fill: rgba(72,72,79,0.08)`, `border: 1px rgba(72,72,79,0.20)`.

**Tooltip on hover** (200ms delay): `#242438` bg, 6px radius, padding 8 12. Caption 12/400 `#8E8E93`: "Last presented: 2026-03-15 · Requesting party: exchange.io".

---

---

## !Screen 1: Login / Sign In

**Route:** `verify.solidus.network/login`
**Mode:** Dark. Background `#0A1628`. No sidebar.

### Layout
Split: left column 640px (visual), right column 800px (form).

**Left column — brand panel:**
- Full-height panel, `Fill: #1A1A2E`, `border-right: 1px #2A2A42`
- Top-left: `solidus_dark.png` Solidus logomark + "Solidus Verify" wordmark, 24px padding
- Center (vertically): Vertical Auto Layout, spacing 32px, padding 0 64px
  - icon/shield-check 56px, `Fill: #00D4FF`
  - H1 36/700 white: "Compliance infrastructure\nfor the next generation\nof finance."
  - Body 16/400 `#8E8E93`: "One API. Every KYC type. Credentials that travel with your users."
  - Three `TrustChip` rows, Horizontal Auto Layout, spacing 12px, margin-top 8px:
    - icon/zap 14px `#A8E600` + Caption 12/400 white: "1-2s verification time"
    - icon/shield 14px `#A8E600` + Caption 12/400 white: "No biometric data stored"
    - icon/lock 14px `#A8E600` + Caption 12/400 white: "GDPR & MiCA compliant"
- Bottom-left (24px padding): Caption 12/400 `#48484F`: "© 2026 Solidus Foundation · Privacy · Terms"

**Right column — form area:**
- Background `#0A1628`, centered vertically, padding 0 96px
- Top-right: "Don't have an account?" Small 14/400 `#8E8E93` + "Sign up →" Small 14/500 `#0066FF` link

**Sign In Form:**
- H2 28/600 white: "Sign in to Solidus Verify"
- Body 14/400 `#8E8E93` margin-bottom 32px: "Enter your credentials to access your dashboard."

Fields (each: label Caption 12/500 `#8E8E93` margin-bottom 6px above input):
1. "Work email" — Input 48px height, `#242438` bg, `1px #2A2A42` border, Focus: `1px #0066FF`. Body 16/400 white. Placeholder `#48484F`: "you@company.com"
2. "Password" — same input specs. Right side of input: icon/eye 16px `#8E8E93` (toggle visibility). Placeholder: "••••••••••••"

Row below password field: "Forgot password?" Small 14/400 `#0066FF` link, right-aligned.

"Sign In" button: full-width, 48px height, `#0066FF` bg, H3 16/600 white. Margin-top 24px.

Divider row: `1px #2A2A42` lines on each side + Caption 12/400 `#48484F` center: "OR"

SSO button: full-width, 48px height, `transparent` bg, `1px #2A2A42` border, 8px radius. Horizontal Auto Layout, center. Google "G" logo 20px + Body 14/400 white: "Continue with Google"

**Loading state:** Sign In button shows 16px spinner (white, 0.6s linear infinite), disabled. Other fields greyed at 60%.

**Error state:** Red `1px #FF3B30` border on both fields + amber banner above button: `Fill: rgba(255,59,48,0.08)`, `Border: 1px rgba(255,59,48,0.20)`, padding 12 16, icon/alert-circle 16px `#FF3B30` + Body 14/400 `#FF3B30`: "Invalid email or password. Please try again." + Caption 12/400 `#8E8E93`: "Locked after 5 failed attempts."

**MFA state (shown after password submit when MFA is enabled):** Form area replaces with: icon/smartphone 40px `#00D4FF` + H3 22/600 white: "Two-factor authentication" + Body 14/400 `#8E8E93`: "Enter the 6-digit code from your authenticator app." + 6-input OTP field (each digit: 48×56px, `#242438` bg, `1px #2A2A42` border, Focus: `1px #0066FF`, JetBrains Mono 24/700 white, auto-advance on digit entry) + "Verify Code" full-width primary button + Caption `#8E8E93`: "Lost access to your authenticator? " + "Use recovery code →" link `#0066FF`

---

## !Screen 2: Dashboard Overview

**Route:** `verify.solidus.network/dashboard`

### Top Bar
- H2 "Dashboard" (28px/600, white) left.
- Right: `DateRangePicker` dropdown — "Last 7 days" with calendar icon, Body 14/400 white, `#242438` bg, `1px #2A2A42` border, 6px radius, 36px height + "New Verification" primary button.

### Stats Cards Row
Four `KPICard` components, equal width, gap 16px.

`KPICard` — `#1A1A2E` bg, 8px radius, padding 20 24, Vertical Auto Layout, spacing 8px:
- Label: Caption 12/500 `#8E8E93`, uppercase, letter-spacing 0.04em
- Value: H1 36/700 white. Count-up animation 800ms ease-out on page load.
- Delta row: Horizontal Auto Layout, spacing 4px — arrow-up or arrow-down 14px + Small 14/400. Positive: `#34C759`. Negative: `#FF3B30`.
- Sparkline: 80×24px mini area chart at card bottom. `#0066FF` line 1.5px, no fill.

Cards (4):
1. "Verifications Today" — "1,247" — "+12.3%" arrow-up `#34C759` — sparkline trending up
2. "Pending Review" — "38" — "-5.1%" arrow-down `#34C759` (fewer pending = good) — sparkline flat
3. "Success Rate" — "97.2%" — "+0.8%" arrow-up `#34C759` — sparkline high/flat
4. "Revenue This Month" — "$4,830" — "+18.7%" arrow-up `#34C759` — sparkline trending up steeply

### Verification Volume Chart + Live Stream (Two-Column Row)

`ChartRow` — Horizontal Auto Layout, gap 16px, margin-top 16px.

**`VolumeChartCard` (flex, fills remaining width):**
`#1A1A2E` bg, 8px radius, padding 20 24.
- Header row: H3 "Verification Volume" (16px/600, white) left + right: metric toggle chips (small pills) "Verifications" (active, `#0066FF` bg, Caption 11/600 white) | "Success Rate" (`transparent`, Caption 11/400 `#8E8E93`) | "Revenue" (same inactive style)
- Chart: area chart, 100% width, 240px height. `#0066FF` line 2px. Gradient fill: `linear-gradient(180deg, rgba(0,102,255,0.22) 0%, rgba(0,102,255,0.0) 100%)`. X-axis: 7 date labels, Caption 11/400 `#8E8E93`. Y-axis: 4 grid lines, `1px dashed #242438`. Chart data: Mon 890, Tue 1,023, Wed 1,148, Thu 1,089, Fri 1,201, Sat 892, Sun 1,247.
- Hover tooltip `TooltipCard`: `#242438` bg, 6px radius, padding 10 14, `drop-shadow: 0 4px 12px rgba(0,0,0,0.32)`. Content: Caption 11/500 `#8E8E93` date "Mar 17, 2026" + H3 18/600 white count "1,247" + Caption 11/400 `#8E8E93` "verifications" + Caption 11/500 `#34C759` "+12.3% vs yesterday". Vertical crosshair: `1px dashed rgba(0,102,255,0.4)`. Dot at hover point: 8px circle `#0066FF` fill, `2px white` border, `drop-shadow: 0 0 8px rgba(0,102,255,0.6)`.

**`LiveStreamPanel` (260px fixed width):**
`#1A1A2E` bg, 8px radius, padding 0 (header and items handle own padding).
- Header: padding 16 20, Horizontal Auto Layout, Space Between. H3 "Live Activity" 14/600 white left. Right: `LiveDot` 6px circle `#34C759` (opacity 1→0.3→1, 1.8s ease-in-out infinite) + Caption 11/400 `#8E8E93` "Real-time".
- Item feed: 8 visible items, vertically scrolling. Each `StreamItem` — padding 10 16, Horizontal Auto Layout, spacing 8px, Alignment Center, `border-bottom: 1px #242438`:
  - `StatusDot` 8px: `#34C759` verified / `#FF9500` pending / `#FF3B30` failed
  - Vertical content: DID JetBrains Mono 11/400 `#8E8E93` "did:solidus:mainnet:4f2e..." (first 20 chars) + Caption 11/500 white "KYC L2" / "Email" / "Phone"
  - Time Caption 11/400 `#48484F` right-aligned: "just now" / "4s ago" / "18s ago" / "1m ago"
- New item entry animation: `translateY(-20px)→translateY(0)`, `opacity 0→1`, 200ms ease-out. Oldest item exits bottom: `opacity 1→0`, 150ms.
- Footer caption: padding 12 16, Caption 11/400 `#48484F` center: "1,247 verifications today" — fades in after 3s of panel inactivity.

### Webhook Delivery Panel

`WebhookDeliveryPanel` — `#1A1A2E` bg, 8px radius, padding 20 24, full width, margin-top 16px.

**Header row** — Horizontal Auto Layout, Space Between, Alignment Center:
- Left: Small 16/600 white "Webhook Delivery" + `HealthBadge` inline 6px gap:
  - Healthy: `Fill: rgba(52,199,89,0.12)`, `Border: 1px rgba(52,199,89,0.25)`, Caption 11/500 `#34C759`: "● All Healthy"
  - Degraded: `Fill: rgba(255,149,0,0.12)`, `Border: 1px rgba(255,149,0,0.25)`, Caption 11/500 `#FF9500`: "● 1 Endpoint Failing"
- Right: Caption 12/400 `#0066FF` "View All →". Hover: underline.

**Stats strip** — Horizontal Auto Layout, padding 10 0, 3 stats separated by `1px #242438` vertical dividers (16px height), 20px padding around each divider:
- "2,494 delivered today" Caption 12/500 white
- "99.7% success rate" Caption 12/500 `#34C759`
- "avg 142ms" Caption 12/500 white

**Degraded alert strip** (shown only when endpoint failing): full-width bar, `Fill: rgba(255,149,0,0.08)`, `border-bottom: 1px rgba(255,149,0,0.20)`, padding 8 0. Space Between: icon/alert-triangle 14px `#FF9500` + Caption 12/400 `#FF9500` "webhook-prod.example.com returning 500 · last success 14 min ago" | "Retry All Failed" Caption 12/500 `#FF9500` underline.

**Delivery log table** — 5 rows, no header row, row height 36px, row hover: `rgba(0,102,255,0.04)` 150ms:

| Column | Width | Spec |
|--------|-------|------|
| Event | 180px | Pill: `Fill: rgba(color,0.12)`, `Border: 1px rgba(color,0.25)`, Caption 11/500. "kyc.completed" `#34C759` / "kyc.failed" `#FF3B30` / "kyc.pending" `#FF9500` / "credential.issued" `#00D4FF` |
| Endpoint | flex | JetBrains Mono 12/400 `#8E8E93`, max 240px truncated "https://api.acme.com/hook..." |
| Status | 100px | 8px dot + Caption 12/400: `#34C759` "Delivered" / `#FF3B30` "Failed" / `#FF9500` "Retrying" (dot replaced by 12px conic-gradient spinner 0.6s linear infinite) |
| Code | 60px | JetBrains Mono 12/400: "200" `#34C759` / "500" `#FF3B30` / "—" `#48484F` |
| Latency | 70px | Caption 12/400 `#8E8E93`: "89ms" / "142ms" / "—" |
| Time | 80px | Caption 12/400 `#48484F`: "just now" / "2m ago" / "8m ago" |
| Actions | 60px | "Retry" Caption 11/500 `#0066FF`, visible only on Failed rows. Click → Retrying state 800ms → resolves Delivered or Failed. |

Sample rows: (1) kyc.completed / api.acme.com/hook / Delivered / 200 / 89ms / just now · (2) credential.issued / api.acme.com/hook / Delivered / 200 / 142ms / 1m ago · (3) kyc.failed / webhook-prod.example.com/... / Failed / 500 / — / 3m ago [Retry] · (4) kyc.completed / api.acme.com/hook / Delivered / 200 / 97ms / 5m ago · (5) kyc.pending / api.acme.com/hook / Delivered / 200 / 61ms / 8m ago.

**Footer** — Space Between, `padding-top 12px`, `border-top: 1px #242438`:
- Caption 12/400 `#48484F` "3 endpoints configured"
- Caption 12/400 `#0066FF` "Configure Webhooks →" Hover: underline.

**Empty state (no webhooks configured):** Replace body with center-aligned 60px height — icon/plug 24px `#8E8E93` + Caption 13/400 `#8E8E93` "No webhooks configured" + Caption 12/500 `#0066FF` "Add Webhook →".

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

### Recent Verifications Table

`#1A1A2E` bg, 8px radius, padding 20 24, full width, margin-top 16px.

Header: H3 "Recent Verifications" 22/600 white left + "View All →" Small 14/400 `#0066FF` right.

Table columns:
- DID: JetBrains Mono 13/400 white, first 18 chars + "..." (max 200px)
- Type: Caption 12/500 `#8E8E93` — "Email" / "Phone" / "KYC L1" / "KYC L2" / "KYC L3"
- Status: Status Badge component
- Country: Flag emoji (16px) + Caption 12/400 `#8E8E93` country code — "🇺🇸 US" / "🇩🇪 DE" / "🇬🇧 GB"
- Duration: Caption 12/400 `#8E8E93`: "1.4s" / "2.1s" / "—"
- Timestamp: Caption 12/400 `#8E8E93` JetBrains Mono: "2026-03-17 14:32"
- Actions: icon-btn eye 20px `#8E8E93`, hover `#FFFFFF`

Table header row: `#242438` bg, Caption 12/500 `#8E8E93` uppercase, `letter-spacing: 0.04em`. Data rows: `#1A1A2E` bg, `border-bottom: 1px #242438`. Row hover: `#242438` bg 150ms.

8 rows of sample data using real-looking DIDs and 2026 timestamps:
1. did:solidus:mainnet:7a3b8c9d2e1f4a6b / KYC L2 / Verified / 🇺🇸 US / 1.8s / 2026-03-17 14:32
2. did:solidus:mainnet:4f2e1a8b3c7d9e0f / Email / Verified / 🇩🇪 DE / 0.3s / 2026-03-17 14:31
3. did:solidus:mainnet:2c9d4f1e8a7b3c6d / KYC L2 / Pending / 🇬🇧 GB / — / 2026-03-17 14:30
4. did:solidus:mainnet:b8a3f6c2e9d1047e / Phone / Verified / 🇧🇷 BR / 0.5s / 2026-03-17 14:28
5. did:solidus:mainnet:3e7c9f2d1b8a4f0e / KYC L3 / Failed / 🇰🇷 KR / 14.2s / 2026-03-17 14:25
6. did:solidus:mainnet:9f1a3d7b2c8e5f04 / KYC L1 / Verified / 🇸🇬 SG / 1.1s / 2026-03-17 14:22
7. did:solidus:mainnet:5b2d8f4e1c9a3e7b / Email / Verified / 🇫🇷 FR / 0.4s / 2026-03-17 14:19
8. did:solidus:mainnet:0e4f9c7a3b1d8e2f / KYC L2 / Processing / 🇯🇵 JP / — / 2026-03-17 14:17

Pagination: Caption 12/400 `#8E8E93` "Showing 1–8 of 1,247" left. Previous (disabled, ghost) + Next (ghost) buttons right. Each button: 32px height, padding 0 12px, `1px #2A2A42` border, Caption 12/400 white.

### Edge States — Dashboard

**New account / empty state:** All KPI values "0". Sparklines flat. Chart area: icon/layout-dashboard 48px `#8E8E93`, H3 22/600 white "No verifications yet", Body 14/400 `#8E8E93` "Complete your integration and your first verification data will appear here." + "View Quickstart →" primary button centered in chart area, 200px wide. Live stream panel shows caption "Waiting for first verification..." Recent Verifications table shows: icon/shield 48px `#8E8E93` centered + Body "No verifications yet" + Caption `#8E8E93` "Verifications will appear here once your integration is live."

**Sandbox mode:** Amber banner pinned below top bar, full-width: `Fill: rgba(255,149,0,0.08)`, `border-bottom: 1px rgba(255,149,0,0.20)`, padding 10 24. icon/flask 16px `#FF9500` + Body 14/400 `#FF9500` "You are in Sandbox mode — all data is simulated." + "Switch to Production →" Caption 12/500 `#FF9500` underline right.

---

## !Screen 3: Verifications List

**Route:** `verify.solidus.network/verifications`

### Top Bar
- H2 "Verifications" left.
- Right: "Export CSV" ghost button (download icon, 36px height) + "New Verification" primary.

### Filter Bar
Full-width `#1A1A2E` card, 8px radius, padding 16 20. Horizontal Auto Layout, spacing 12px, Alignment Center.

- Search input (flex, max 280px): icon/search 16px `#8E8E93` left inside input + Body 14/400 placeholder `#48484F` "Search by DID, email, or reference..." Height 36px.
- "Status" dropdown: 36px height, `#242438` bg, `1px #2A2A42` border, Body 14/400 white "All Statuses ▾". Dropdown options: All / Verified / Pending / Processing / Failed / Revoked.
- "Type" dropdown: "All Types ▾". Options: All / Email / Phone / KYC L1 / KYC L2 / KYC L3.
- "Date Range" dropdown: "Last 30 days ▾". Options: Last 7 days / Last 30 days / Last 90 days / Custom range.
- "Country" dropdown: "All Countries ▾". Options: multi-select with search input, flag icons.
- Right side: `ActiveFiltersRow` — if any filter active, show pill per active filter (Caption 11/500 `#8E8E93` + x 10px to remove), then "Clear all" Caption 11/400 `#0066FF`.

### Verifications Table

Full-width `#1A1A2E` card, 8px radius, padding 0 (table handles padding).

**Table header** — `#242438` bg, height 44px, padding 0 20px. Caption 12/500 `#8E8E93` uppercase, letter-spacing 0.04em. Sortable columns have chevron-up-down 12px `#48484F` inline; active sort: `#0066FF` chevron.

Columns: Checkbox 20px (select all) | DID | Type | Status | Country | Duration | Cost | Timestamp | Actions

**Table rows** — height 48px, padding 0 20px, `border-bottom: 1px #242438`. Hover: `#242438` bg 150ms. Selected: `Fill: rgba(0,102,255,0.06)`, `border-left: 3px #0066FF`.

Checkbox: 16px, `#242438` bg, `1px #2A2A42` border, 3px radius. Checked: `#0066FF` bg, white check icon.

DID cell: JetBrains Mono 13/400 white truncated at 220px + "..." + copy icon 14px `#48484F` (appears on row hover, click copies full DID to clipboard + tooltip "Copied!").

Cost cell: JetBrains Mono 13/400 white "$5.00" / "$1.00" / "$0.10" / "Free". JetBrains Mono applied to all monetary values.

Actions cell: icon/eye 20px `#8E8E93` (view detail) + icon/more-horizontal 20px `#8E8E93` (context menu: Download Credential / Revoke Credential / Copy DID).

**Bulk actions bar** (appears when 1+ rows selected, replaces filter bar): `Fill: rgba(0,102,255,0.08)`, `border: 1px rgba(0,102,255,0.20)`, padding 12 20. "3 verifications selected" Small 14/500 white + "Export Selected" ghost button + "Revoke Selected" ghost danger button + "Deselect All" Caption `#0066FF`.

Show 20 rows per page. Pagination: "Showing 1–20 of 1,247" Caption left. Page number pills (previous, 1, 2, 3, ..., 63, next). Active page: `#0066FF` bg, white text, 28px circle.

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

### Quick Filter Tabs
Above the table card, Horizontal Auto Layout, spacing 4px. `TabPill` × 5:
- "All" (active) / "Verified" / "Pending" / "Failed" / "Processing"
Active tab: `#0066FF` bg, Caption 12/500 white, count badge white. Inactive: `transparent` bg, Caption 12/400 `#8E8E93`, count badge `#48484F`.
Count badges: pill, `#242438` bg, Caption 11/500.

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

### Empty State (filtered, no results)

Centered in table area: icon/search 48px `#8E8E93` + H3 22/600 white "No verifications found" + Body 14/400 `#8E8E93` "Try adjusting your filters or search query." + "Clear filters" ghost button.

### Zero-result Search

Same empty state but copy: "No results for 'did:solidus:mainnet:0xfff...'" + Body `#8E8E93` "Check the DID format or try a partial match."

---

## !Screen 4: Verification Detail

**Route:** `verify.solidus.network/verifications/vsn_9f8e7d6c5b4a3291`

### Breadcrumb
Small 14/400. "Dashboard" `#0066FF` link + "/" `#48484F` + "Verifications" `#0066FF` link + "/" `#48484F` + "vsn_9f8e7d6c" JetBrains Mono 14/400 `#8E8E93`.

### Page Header
Horizontal Auto Layout, Space Between, Alignment Center, margin-bottom 24px.

Left:
- H2 28/600 white "Verification #vsn_9f8e7d6c"
- Below: Small 14/400 `#8E8E93` "Started: 2026-03-17 14:32:08 UTC · Completed: 2026-03-17 14:33:51 UTC · Duration: 1m 43s"

Right: Status badge (large variant, height 32px, padding 0 16px, H3 16/600) — "Verified" green. + ### D4: Flag for Review Button (insert into Screen 4 page header)

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

"Revoke Credential" danger ghost button (icon/shield-off 16px + "Revoke" Body 14/500 `#FF3B30`, `border: 1px rgba(255,59,48,0.30)`).

### Two-Column Layout (60% / 40% gap 16px)

**Left column:**

`SubjectCard` — `#1A1A2E` bg, 8px radius, padding 20 24:
- H3 "Subject" 16/600 white margin-bottom 16px
- "DID" label Caption 12/500 `#8E8E93` + below: JetBrains Mono 16/400 white "did:solidus:mainnet:7a3b8c9d2e1f4a6b" + copy icon 16px `#8E8E93` inline right
- "Reference" Caption 12/500 `#8E8E93` + Body 14/400 white "usr_abc123 · order_xyz8827"
- Credential badges row, gap 8px: Status badge "Email ✓" green + "Phone ✓" green + "KYC L2 ✓" green

`DocumentCard` — `#1A1A2E` bg, 8px radius, padding 20 24:
- H3 "Document Details" 16/600 white margin-bottom 16px
- 2-column grid, gap 16px. Each field: Caption 12/500 `#8E8E93` label + Body 14/400 white value below:
  - Document Type: "Passport" | Issuing Country: "United States 🇺🇸"
  - Document Number: JetBrains Mono "●●●●●●7842" (masked) + icon/eye 14px `#8E8E93` toggle | Expiry: "2028-11-15"
  - Full Name: "JOHN A. SMITH" | Date of Birth: "1989-04-22" (masked by default, icon/eye toggle)
  - Nationality: "American" | Gender: "M"
- `DocumentThumbnails` row: 2 thumbnail cards side by side. Each: 160×104px, `#242438` bg, 6px radius. Front has "FRONT" Caption 10/500 `#8E8E93` badge top-left. Both show blurred/obscured document placeholder image. Caption 11/400 `#8E8E93` below: "Images deleted after processing (GDPR)"

`VerificationStepsCard` — `#1A1A2E` bg, 8px radius, padding 20 24:
- H3 "Verification Steps" 16/600 white
- Vertical timeline, 6 steps, `2px #242438` connecting line left of icons:
  1. icon/circle-check 20px `#34C759` + Small "Document Uploaded" white + Caption `#8E8E93` "2026-03-17 14:32:08"
  2. icon/circle-check 20px `#34C759` + "Document Authenticity Verified" + "2026-03-17 14:32:14" + Caption `#8E8E93` "Confidence: 98.4%"
  3. icon/circle-check 20px `#34C759` + "Liveness Check Passed" + "2026-03-17 14:32:51" + Caption `#8E8E93` "Face similarity: 96.1%"
  4. icon/circle-check 20px `#34C759` + "Data Extraction Complete" + "2026-03-17 14:32:55"
  5. icon/circle-check 20px `#34C759` + "Validator Consensus Reached" + "2026-03-17 14:33:48" + Caption `#8E8E93` "3/5 validators confirmed · Block #4,817,293"
  6. icon/circle-check 20px `#34C759` + "Credential Issued" + "2026-03-17 14:33:51"

Each step row: Horizontal Auto Layout, spacing 12px, padding 12 0, `border-bottom: 1px #242438` (last row no border).

**Right column:**

`CredentialCard` — `#1A1A2E` bg, 8px radius, padding 20 24, `border-top: 2px solid`, border-top-color: `linear-gradient(90deg, #A8E600, #00D4FF)`, `box-shadow: 0 0 24px rgba(0,212,255,0.15)`:
- H3 "Issued Credential" 16/600 white

`CredentialPreview` — `#242438` bg, 8px radius, padding 20, full-width, 200px height:
- Caption 11/500 `#8E8E93` uppercase: "VERIFIABLE CREDENTIAL · W3C VC DATA MODEL 2.0"
- H3 22/600 white: "KYC Level 2"
- Body 14/400 `#0066FF`: "verify.solidus.network"
- 2 rows bottom: "Issued 2026-03-17" Caption 12/400 `#8E8E93` + "Expires 2027-03-17" Caption 12/400 `#8E8E93`
- QR code placeholder: 80×80px `#1A1A2E` bg, 4px radius, bottom-right corner. Simple QR pattern placeholder in `#8E8E93`.

Two buttons below preview, gap 8px:
- "Download Credential" primary 36px, full-width, icon/download 16px left
- "View Raw JSON" ghost 36px, full-width, icon/code 16px left

`BlockchainAnchorCard` — `#1A1A2E` bg, 8px radius, padding 16 20:
- H3 "On-Chain Record" 14/600 `#8E8E93` uppercase, letter-spacing 0.04em
- Row: Caption 12/500 `#8E8E93` "Block" + JetBrains Mono 13/400 white "4,817,293" right
- Row: Caption 12/500 `#8E8E93` "Tx Hash" + JetBrains Mono 12/400 `#00D4FF` "0x4f2e1a8b3c7d9e0f..." (truncated, icon/external-link 12px right — links to block explorer)
- Row: Caption 12/500 `#8E8E93` "Validator" + JetBrains Mono 12/400 white "val-0x7a3b..."

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

`EventLogCard` — `#1A1A2E` bg, 8px radius, padding 20 24:
- H3 "Event Log" 16/600 white
- 8 event rows. Each: Caption 11/400 `#48484F` JetBrains Mono timestamp left (80px col) + Body 14/400 white event description right. `border-bottom: 1px #242438`.
- Events: "14:32:08" "Verification session created" · "14:32:09" "Subject DID resolved" · "14:32:10" "Document upload URL generated" · "14:32:14" "Document received (passport_front.jpg)" · "14:32:51" "Liveness session completed" · "14:32:55" "Data extraction completed" · "14:33:48" "Validator consensus confirmed (21-validator committee)" · "14:33:51" "W3C VC issued to did:solidus:mainnet:7a3b..."

### Edge States — Verification Detail

**Processing state:** Status badge "Processing" amber. Steps 1–3 green check. Step 4 shows icon/loader 20px `#0066FF` spinning + "In progress..." amber text. Steps 5–6: icon/circle 20px `#48484F` + text `#48484F`. Credential card body replaced by: dashed `1px #2A2A42` border rectangle, 200px height, icon/lock 32px `#8E8E93` centered + Caption "Credential will appear when verification completes."

**Failed state:** Status badge "Failed" red. H2 red. Steps 1–3 green. Step 3 shows icon/x-circle 20px `#FF3B30` + "Liveness Check Failed" + Caption "Face similarity below threshold (34%). Possible spoofing attempt." Steps 4–6: `#48484F`. Right column shows `FailureAnalysisCard`: amber `Fill: rgba(255,59,48,0.08)`, `border: 1px rgba(255,59,48,0.20)`, padding 16. H3 "Failure Reason" 14/600 `#FF3B30` + Body 14/400 white "Liveness check failed: face similarity score 34% (threshold: 75%)." + Caption `#8E8E93` "Possible causes: low-quality selfie, lighting conditions, or fraudulent attempt." + "Flag for Review" ghost danger button.

---

## !Screen 5: New Verification Modal

Triggered from "New Verification" button in top bar. Shown as overlay on any dashboard screen.

**Overlay:** `Fill: rgba(10,22,40,0.72)`, `backdrop-filter: blur(6px)`. Fades in simultaneously with modal: overlay 0→0.72 + modal `scale(0.97)→scale(1.0)` + `translateY(8px→0)`, 220ms ease-out.

`NewVerificationModal` — `#1A1A2E` bg, 12px radius, width 520px, `box-shadow: 0 16px 48px rgba(0,0,0,0.56)`. Positioned at viewport center.

**Modal Header** — padding 24, Space Between, Center, `border-bottom: 1px #242438`:
- H3 20/600 white "New Verification"
- icon/x 20px `#8E8E93`, padding 4px, 4px radius. Hover: `#FFFFFF` 150ms. Click: slide down + fade, 180ms ease-in.

**Step progress indicator** — padding 16 24, `border-bottom: 1px #242438`. 3 steps: circles 24px diameter connected by `1px #2A2A42` lines (flex). Active: `#0066FF` bg white number. Completed: `#34C759` bg icon/check 12px white. Upcoming: `#242438` bg `#48484F` number. Labels below circles: Caption 11/400 — "Type" / "Subject" / "Confirm".

### Step 1 — Type Selection

Body content padding 24.

Caption 11/500 `#8E8E93` uppercase letter-spacing 0.06em: "SELECT VERIFICATION TYPE"

`TypeGrid` — 2-column grid, gap 12px, margin-top 12px:

`TypeCard` × 5 — Horizontal Auto Layout, spacing 12px, padding 14 16, `#242438` bg, 8px radius, `border: 1px transparent`, Center:
- Lucide icon 20px `#8E8E93`
- Vertical content (flex-grow): type name Body 14/600 white + detail Caption 11/400 `#8E8E93`
- Radio 16px circle, `Stroke: #556688 1px`. Selected: `#0066FF` fill, 6px inner dot white.

Selected state: `border: 1px #0066FF`, `Fill: rgba(0,102,255,0.06)`, icon → `#0066FF`, 150ms.

Types:
1. icon/mail "Email Verification" — "Instant · Free"
2. icon/smartphone "Phone Verification" — "Instant · $0.20"
3. icon/user-check "KYC Level 1" — "~2 min · $1.00"
4. icon/shield-check "KYC Level 2" — "~5 min · $5.00" — default selected
5. icon/scan-face "KYC Level 3" — "~15 min · $20.00"

`SelectedSummary` (visible once a type selected) — margin-top 16px, padding 10 14, `Fill: rgba(0,102,255,0.08)`, 6px radius, `border: 1px rgba(0,102,255,0.20)`. Horizontal: icon/info 14px `#0066FF` + Body 13/400 white 80%: "KYC Level 2 requires a government-issued ID and a liveness check. Credential is issued on-chain." — text swaps per selection 150ms crossfade.

**Step 1 Footer** — padding 20 24, `border-top: 1px #242438`, Space Between:
- Body 13/400 `#8E8E93`: "Current balance: 3,747 queries remaining"
- Row: "Cancel" ghost button (padding 10 20, 6px radius, `border: 1px rgba(255,255,255,0.15)`, Body 14/500 white) + "Continue →" primary button (padding 10 20, 6px radius, `#0066FF` bg, Body 14/600 white). Primary disabled if no type selected: `#242438` bg, `#48484F` text, `cursor: not-allowed`.

### Step 2 — Subject DID Input

Content cross-fades 150ms. Same header. Step indicator: step 1 completed green, step 2 active blue, step 3 upcoming.

Caption row: icon/arrow-left 12px + Caption 11/400 `#0066FF` "Back" left + Caption 11/500 `#8E8E93` uppercase "ENTER SUBJECT DID" right (space between).

`DIDInputCard` — `#242438` bg, 8px radius, padding 16, margin-top 12px, Vertical, spacing 8px:
- Caption 11/500 `#8E8E93`: "Subject DID"
- `DIDInput` — Horizontal, spacing 8px, padding 10 12, `#1A1A2E` bg, 6px radius, `border: 1px #556688`. Focus: `border: 1px #0066FF`:
  - JetBrains Mono 13/400 white, placeholder `#48484F`: "did:solidus:mainnet:..."
  - icon/scan 16px `#8E8E93` right — opens QR scanner. Hover: `#FFFFFF`.
- Caption 11/400 `#8E8E93`: "Or paste any W3C-compatible DID (did:ethr:, did:key:, did:web:)"

`DIDValidation` — 400ms debounce after typing stops. 3 states:
- Resolving: icon/loader 12px spinning `#0066FF` + Caption "Resolving DID..." `#8E8E93`
- Valid: icon/check-circle 12px `#34C759` + Caption "DID resolved · 2 existing credentials" `#34C759`
- Not found: icon/alert-circle 12px `#FF9500` + Caption "DID not found on Solidus mainnet. A new DID record will be created." `#FF9500`

`MetadataRow` — Horizontal, spacing 12px, margin-top 16px. Two `MetaField` (flex: 1 each):
- Caption 11/500 `#8E8E93` label + Input 36px `#242438` bg, 6px radius, `border: 1px #556688`, Body 14/400 white, placeholder `#48484F`
- "User ID (optional)" / "usr_abc123" + "Reference (optional)" / "order_xyz"

**Step 2 Footer:** same structure. "Start Verification →" primary. Disabled until DID non-empty.

### Step 3 — Confirm & Launch

Step indicator: steps 1–2 green, step 3 active.

Caption + Back row same as step 2. Caption "CONFIRM"

`ConfirmCard` — `#242438` bg, 8px radius, overflow hidden, margin-top 12px:
- Header row: `#1A1A2E` bg, padding 12 16. Caption 12/600 `#8E8E93` uppercase: "VERIFICATION SUMMARY"
- 4 detail rows (padding 12 16, `border-top: 1px #1A1A2E`, Space Between):
  - "Type" / "KYC Level 2 — Passport + liveness" Body 14/400 white
  - "Subject DID" / "did:solidus:mainnet:7a3b..." JetBrains Mono 13/400 white truncated
  - "Estimated time" / "~5 minutes" Body 14/400 white
  - "Cost" / "$5.00" Body 14/600 `#A8E600`

`RedirectNote` — padding 10 16, `Fill: rgba(168,230,0,0.06)`, `border-top: 1px rgba(168,230,0,0.15)`, Center. icon/external-link 12px `#A8E600` + Caption 11/400 `#A8E600`: "The subject will be redirected to complete their document upload and liveness check."

**Step 3 Footer:** "Cancel" ghost + "Launch Verification →" primary `#0066FF`.

**Launch loading state:** Button shows 14px spinner white, disabled. After 800ms: modal body replaces with centered success state: icon/check-circle 40px `#34C759` (scale 0→1.1→1.0, 350ms spring cubic-bezier 0.34,1.56,0.64,1) + H3 18/600 white "Verification launched" + Body 14/400 `#8E8E93` "Session ID:" + JetBrains Mono 13/400 `#00D4FF` "vsn_9f8e7d6c5b4a3291" + 2 full-width buttons: "View in Dashboard" primary + "Launch Another" ghost.

### Modal Edge States

**Insufficient balance:** Step 3 Cost row "$5.00" → `#FF3B30`. New row "Remaining balance" / "0 queries · $0.00" `#FF3B30`. RedirectNote replaced by amber warning: icon/alert-circle 12px `#FF9500` + Caption 11/400 `#FF9500`: "Your plan has no remaining queries." + "Upgrade →" link `#0066FF`. Launch button disabled, ghost style.

**DID already at target level:** DIDValidation: icon/check-circle `#34C759` + "DID already has KYC L2 · credential expires 2027-03-17". SelectedSummary: amber note appended "Re-verification will issue a fresh credential and invalidate the existing one."

---

## !Screen 6: Analytics

**Route:** `verify.solidus.network/analytics`

### Top Bar
- H2 "Analytics" left.
- Right: `DateRangePicker` pill "Last 30 days" with calendar icon + "Export Report" ghost button (download icon + "Export PDF").

### KPI Row
Four `KPICard` (same component as dashboard, count-up animation). Margin-bottom 16px.
1. "Total Verifications" — "48,241" — "+12.3% vs last period" — sparkline up
2. "Success Rate" — "97.4%" — "+0.8%" — sparkline flat/high
3. "Avg. Completion Time" — "1.8s" — "-0.3s" green (improvement)
4. "Cost per Verification" — "$0.42" — "-$0.08" green arrow-down (cheaper = good)

### Verification Funnel (full-width card)

`#1A1A2E` bg, 8px radius, padding 24.

Header: H3 "Verification Funnel" 22/600 white + Caption "30-day cohort" `#8E8E93` inline.

`FunnelChart` — 100% width, 200px height. 5 trapezoid-style stages, narrowing left to right. Each stage has count label above (H3 white) and percentage below (Caption `#8E8E93`). Drop-off label between stages: Caption 12/500 `#FF3B30` e.g. "-5.1%".

Stages:
1. "Initiated" — 52,100 — 100% — `#0066FF`
2. "Document Submitted" — 49,450 — 94.9% — `rgba(0,102,255,0.85)`
3. "Liveness Passed" — 47,230 — 90.7% — `rgba(0,102,255,0.70)`
4. "Validator Consensus" — 46,800 — 89.8% — `rgba(0,102,255,0.55)`
5. "Credential Issued" — 46,340 — 89.0% — `#34C759`

Below funnel: 2-col stats — "Completion Rate: 89.0%" H3 `#34C759` + "Avg. Drop-off: Liveness (Step 3)" H3 white.

Right inset `DropOffAnalysis` card (280px, `#242438` bg, 8px radius, padding 16): H3 "Where Users Drop Off" 14/600 `#8E8E93`. 5 rows: stage name Small white + drop % Caption `#FF3B30` + mini horizontal bar `#FF3B30` proportional width:
Document quality (38%) / Camera permission denied (27%) / Session timeout (18%) / Mobile browser limit (12%) / Other (5%)

### Volume Over Time (full-width card)

`VolumeChart` — `#1A1A2E` bg, 8px radius, padding 24.

Header: H3 "Verification Volume" 22/600 white. Right: metric toggle chips — "Verifications" active `#0066FF` pill + "Success Rate" + "Revenue" inactive `#8E8E93`.

Area chart: 100% width, 260px height. Two lines: "Verifications" `#0066FF` 2px + "Successful" `#34C759` 1.5px. Area below Verifications: `linear-gradient(180deg, rgba(0,102,255,0.22) 0%, rgba(0,102,255,0) 100%)`. X-axis: 30 days, 6-day interval labels Caption 11 `#8E8E93`. Y-axis: 4 grid lines `1px dashed #242438`. Hover tooltip: dark card, date + both line values + success rate.

### Breakdown + Savings (two-column, gap 16px)

**Left 60%: `CredentialBreakdown`** — `#1A1A2E` bg, 8px radius, padding 24.
H3 "By Verification Type" 22/600 white.

`DonutChart` — 180px diameter, left half of card. Center: "48,241" H2 white + "Total" Caption `#8E8E93`.

Segments: KYC L2 44% `#0066FF` / Email 31% `#00D4FF` / KYC L1 15% `#A8E600` / Phone 8% `#FF9500` / KYC L3 2% `#C084FC`.

Legend right half: each row: 12px color circle + type name Body white + count H3 white + percentage Caption `#8E8E93`.

**Right 40%: `CostSavingsCard`** — `#1A1A2E` bg, 8px radius, padding 24, `border-top: 2px solid linear-gradient(90deg, #A8E600, #00D4FF)`, `box-shadow: 0 0 24px rgba(0,212,255,0.15)`.
H3 "Cost Savings vs Auth0" 22/600 white.

`$22,380` H1 48/700 `#A8E600` + Caption "saved this month" `#8E8E93`.

2 comparison rows:
- "Auth0 (estimated)" — "$23,100" Body 16/400 `#FF3B30` strikethrough
- "Your Solidus cost" — "$720" Body 16/600 `#34C759`

Caption `#8E8E93`: "Based on 48,241 verifications × Auth0 $0.479 vs Solidus $0.015 effective rate."

`SavingsBar`: 100% width, 12px height, 4px radius. Total width = $23,100. Solidus portion (3.1%) `#34C759`. Remainder `rgba(255,59,48,0.15)`. Label above: Caption 12/500 white "You are saving 96.9% vs Auth0."

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

### Cohort Quality Table

`#1A1A2E` bg, 8px radius, padding 24. H3 "Verification Cohort Quality" 22/600 white + Caption "KYC Level 2 completions" `#8E8E93`.

Table: full-width. Header `#242438` Caption `#8E8E93`. Columns: Cohort | Verified Users | 30-day Active | Credential Presentations | Avg. Pres./User | Re-verification Rate.

6 months of data (Oct 2025–Mar 2026). Re-verification rates >1.5% highlighted `#FF9500`. Active rates >90% highlighted `#A8E600`. Mar 2026 row shows "— (ongoing)" for active rate in Caption `#48484F`.

Pagination: "Showing 1–6 of 6" + export CSV link.

### Compliance Audit Log

`#1A1A2E` bg, 8px radius, padding 24. H3 "Compliance Audit Log" 22/600 white. Right: "Download CSV" link `#0066FF` (download icon) + "All Events ▾" filter dropdown.

Table — 8 columns: Timestamp JetBrains Mono Caption `#8E8E93` | Event Type pill badge | DID JetBrains Mono 12 truncated | Verification Type | Result | Validator IDs | Block # | IP Region.

10 rows of sample data. Row hover: `rgba(0,102,255,0.04)`.

Event badge types: "Credential Issued" green / "Verification Started" blue / "Liveness Failed" red / "Credential Revoked" amber.

Compliance note below table: Caption 12/400 `#8E8E93`: "All events are immutably recorded on the Solidus blockchain. Audit logs are tamper-evident and cryptographically signed by validators. Export includes W3C-standard event attestations for regulatory submission."

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

### Edge States — Analytics

**New account:** All chart areas — icon/bar-chart-2 48px `#8E8E93` + H3 "No data yet" + Body "Verification data will appear here after your first API call." Each card independently shows this centered in the chart area.

**Export triggered:** "Export Report" button shows 14px spinner. Toast bottom-right: `#1A1A2E` bg, 6px radius, padding 12 16, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. icon/download 16px `#34C759` + Body 14/400 white "PDF report ready" + Caption `#8E8E93` "Check your downloads." Slides in from right, 250ms ease-out. Auto-dismiss 4s.

---

## !Screen 7: Credential Management

**Route:** `verify.solidus.network/credentials`

### Top Bar
H2 "Credentials". Right: "Issue Credential" primary.

### Credential Stats Row (3 cards)
1. "Active Credentials" — "43,821" — green
2. "Expiring in 30 days" — "1,204" — amber
3. "Revoked This Month" — "47" — red

### Credential List Table

Filter bar: Search by DID | "Type" dropdown | "Status" dropdown (Active / Expiring / Expired / Revoked) | "Expiry" range.

Table columns: DID JetBrains Mono 13 | Type Badge (KYC L2 etc.) | Issued Date | Expiry Date | Status Badge | Presentations (count of times credential was presented) | Actions.

Show 20 rows. Sample data: mix of active, expiring-soon (amber expiry date), and revoked (strikethrough, gray row).

### Credential Detail Panel (slide-in right panel, 480px)

Triggered on row click. Slides in from right, 280ms ease-out. Overlay `rgba(0,0,0,0.32)` behind panel but not full-screen.

Panel content:
- Header: H3 "Credential Detail" + X close button
- `CredentialPreview` card (same component as verification detail)
- Subject section: DID + copy + existing badges
- Issuance section: issued date + expiry + block # + tx hash
- Presentations section: table of presentation events (date, verifier service, attribute set disclosed) — key feature demonstrating reusability
- Revoke button (danger ghost, full-width, bottom of panel)

**Revoke confirmation dialog:** appears over the panel. `#1A1A2E` bg, 8px radius, padding 24, 360px wide. H3 "Revoke Credential?" + Body "This credential will be immediately invalidated. The user will need to re-verify to obtain a new credential." + 2 buttons: "Cancel" ghost + "Revoke" danger red. Revoke button: loading state → success state (brief) → panel closes, row updates to "Revoked" badge.

### Expiry Warnings Section

Card below the table: `Fill: rgba(255,149,0,0.06)`, `border: 1px rgba(255,149,0,0.20)`, 8px radius, padding 20 24.

Header: icon/clock `#FF9500` + H3 "1,204 Credentials Expiring Soon" 16/600 `#FF9500` + "Send Re-verification Nudge" primary-amber button right.

Body: "These credentials expire within 30 days. Consider notifying affected users to re-verify before expiry to avoid access disruption." Body 14/400 `#8E8E93`.

---

## !Screen 8: API Keys

**Route:** `verify.solidus.network/api-keys`

### Top Bar
H2 "API Keys". Right: "Create New Key" primary (key icon + text).

### Environment Warning (Sandbox)
If in sandbox mode: amber banner same as dashboard.

### API Keys Table

`#1A1A2E` bg, 8px radius, padding 24.

H3 "API Keys" 22/600 white + Caption `#8E8E93` "Your API keys carry permissions to your account. Store them securely and never expose them in client-side code." margin-bottom 20px.

Table columns:
- Name: Body 14/600 white "Production Main" / "Development" / "CI/CD Pipeline"
- Key: JetBrains Mono 13/400 `#8E8E93`. Masked: "sk_live_••••••••••••••••••4291" with icon/eye 14px toggle. Revealed: full key string `#FFFFFF` with icon/copy 14px.
- Environment: pill badge — "Live" `#34C759` / "Test" `#FF9500`
- Created: Caption 12/400 `#8E8E93` "2026-01-15"
- Last Used: Caption 12/400 `#8E8E93` JetBrains Mono "2026-03-17 09:41"
- Permissions: Caption 12/400 `#8E8E93` "Read + Write" / "Read Only"
- Actions: icon/copy 20px `#8E8E93` + icon/rotate-ccw 20px `#8E8E93` (rotate) + icon/trash-2 20px `#FF3B30` (revoke)

Show 3 sample rows.

### Create Key Modal

Triggered from "Create New Key". Modal 480px width.

- H3 "Create API Key"
- Field "Key Name": input, placeholder "e.g. Production API Key"
- Field "Environment": radio — "Test" selected / "Live"
- Field "Permissions": checkbox group — "Read verifications" (checked) / "Create verifications" (checked) / "Manage webhooks" / "Manage team" / "Manage billing"
- Field "Expiry": dropdown — "Never" / "90 days" / "1 year" / "Custom date"
- Footer: "Cancel" ghost + "Create Key" primary.

**Post-creation success state:** modal body replaces with: icon/check-circle 32px `#34C759` + H3 "API Key Created" + amber warning card: `Fill: rgba(255,149,0,0.08)`, padding 12 16, icon/alert-triangle `#FF9500` + Body 14/400 `#FF9500` "Copy this key now. It will not be shown again." + below: JetBrains Mono 14/400 white full key in `#242438` bg card, padding 12, with copy button right. + "Done" primary button.

### Usage Stats Card

`#1A1A2E` bg, 8px radius, padding 24, below table.

H3 "API Usage" 22/600 white + Caption "Current billing period: Mar 1 – Mar 31, 2026" `#8E8E93`.

3 horizontal bars:
- "Verifications" — 1,247 / 5,000 — bar 25% width `#0066FF` on `#242438` track, 8px height, 4px radius. Labels: count right in Small white + percentage Caption `#8E8E93`.
- "API Calls" — 45,320 / 100,000 — bar 45.3%
- "Webhooks Delivered" — 2,494 / Unlimited — bar shows as a sparkline instead, Caption "Unlimited" right.

Billing note: Caption 12/400 `#8E8E93`: "Plan: Growth · Resets Mar 31, 2026 · " + "Upgrade" link `#0066FF`.

---

## !Screen 9: Webhooks

**Route:** `verify.solidus.network/webhooks`

### Top Bar
H2 "Webhooks". Right: "Add Endpoint" primary (plus icon + text).

### Endpoints List

`#1A1A2E` bg, 8px radius, padding 24.

H3 "Configured Endpoints" 22/600 white. 3 endpoint cards, gap 12px.

`EndpointCard` — `#242438` bg, 8px radius, padding 16 20. Vertical:
- Row 1 (Space Between): URL JetBrains Mono 14/400 white "https://api.acme.com/webhooks/solidus" (truncate at 400px) + Status dot 8px + Caption 12/500: "Active" `#34C759` / "Failing" `#FF3B30`
- Row 2: event pills (4px gap): "kyc.completed" / "kyc.failed" / "credential.issued" each as Caption 11/500 with pill bg opacity tint matching event color
- Row 3 (Space Between): Caption 12/400 `#8E8E93` "Created 2026-01-15 · Last delivery: 2026-03-17 09:41 · 99.7% success rate" | icon-btn: edit (16px) + delete (16px `#FF3B30`)

Endpoint in failing state: `border: 1px rgba(255,59,48,0.25)`, amber alert strip below URL row: Caption 12/400 `#FF3B30` "4 failed deliveries in the last hour · last error: 503 Service Unavailable · " + "View Failures" link `#FF3B30`.

### Delivery Log Table

Below endpoints list. `#1A1A2E` bg, 8px radius, padding 24.

H3 "Delivery Log" 22/600 white. Right: endpoint filter dropdown.

Columns: Timestamp JetBrains Mono | Event | Endpoint URL (truncated) | HTTP Status | Latency | Retry Count | Actions.

Status: "200 OK" `#34C759` / "500 Error" `#FF3B30` / "Pending" `#FF9500`. Retry count: "0" `#8E8E93` / "2" `#FF9500`.

Show 10 rows. Row hover: `rgba(0,102,255,0.04)`. Row click: expands to show full request/response (accordion): request headers + body (JSON, JetBrains Mono 12, `#242438` bg) + response body.

### Add Endpoint Modal

560px wide.
- H3 "Add Webhook Endpoint"
- "Endpoint URL": large input (48px height), placeholder "https://yourdomain.com/webhooks"
- "Description": input (optional), placeholder "e.g. Production CRM webhook"
- "Events to Subscribe": checkbox grid (2 columns). Event types:
  - kyc.completed / kyc.failed / kyc.pending / credential.issued / credential.revoked / session.created / session.expired / review.required
- "Secret" (optional): input with "Generate" button right — auto-fills 32-char hex secret in JetBrains Mono. Caption below: "The secret is used to verify webhook signatures via HMAC-SHA256."
- Footer: "Cancel" ghost + "Save Endpoint" primary.
- "Test Endpoint" button (ghost, full-width, above footer): sends a test `webhook.test` event immediately, shows spinner → "Test event sent!" success inline.

---

## !Screen 10: Audit Log

**Route:** `verify.solidus.network/audit-log`

### Top Bar
H2 "Audit Log". Right: "Export as CSV" ghost + "Export as PDF" ghost.

### Filter Bar
Search (by DID, event type, or actor email) + Event Type dropdown + Date Range + "Actor" dropdown (filter by team member who performed action).

### Audit Log Table

Full-width `#1A1A2E` card.

Columns: Timestamp JetBrains Mono | Event Type pill | Actor (avatar 20px + name Small) | Subject DID JetBrains Mono | Details | IP Address | Block # JetBrains Mono.

`EventBadge` types (beyond verification events):
- "API Key Created" `#00D4FF` / "API Key Revoked" `#FF3B30` / "Webhook Added" `#00D4FF` / "Team Member Invited" `#A8E600` / "Billing Updated" `#FF9500` / "Settings Changed" `#8E8E93` / "Credential Issued" `#34C759` / "Credential Revoked" `#FF3B30` / "Verification Started" `#0066FF`

20 rows visible. Row click: side panel expands showing full event JSON (JetBrains Mono, `#242438` bg) + caption "This event is cryptographically signed and recorded on the Solidus blockchain. Block #4,817,293."

### Blockchain Attestation Banner

Full-width card below table: `Fill: rgba(0,212,255,0.06)`, `border: 1px rgba(0,212,255,0.15)`, padding 16 24. Horizontal: icon/shield-check 20px `#00D4FF` + Body 14/400 `#00D4FF` "All audit events are immutably anchored on the Solidus blockchain. Records are tamper-evident and signed by validators." + "Verify on Explorer →" link `#00D4FF` right.

---

## !Screen 11: Team Members

**Route:** `verify.solidus.network/team`

### Top Bar
H2 "Team". Right: "Invite Member" primary (mail icon + text).

### Role Summary Row (3 stat cards)
Admins: "2" / Operators: "5" / Viewers: "3". Same KPICard component, smaller values, no sparkline.

### Team Table

`#1A1A2E` bg, 8px radius.

Columns: Member (avatar 36px circle + name H3 16/600 white + email Caption `#8E8E93`) | Role pill badge | Status badge (Active / Invited) | Last Active JetBrains Mono Caption | 2FA (icon/shield-check `#34C759` if enabled, icon/shield-off `#FF9500` if not) | Actions (edit role + revoke access).

Role badges: "Admin" `#0066FF` / "Operator" `#FF9500` / "Viewer" `#8E8E93`.

Current user row: subtle `border-left: 3px #0066FF`. "You" Caption 11/500 `#0066FF` badge beside name.

Show 8 members. One "Invited" row (greyed, italic email, no last-active, resend invite link instead of edit).

### Invite Member Modal

- H3 "Invite Team Member"
- "Email Address": input, placeholder "colleague@company.com"
- "Role": radio cards, 3 options. Each: role name H3 + description Body `#8E8E93`:
  - "Admin" — "Full access: manage team, billing, API keys, and all verifications"
  - "Operator" — "Can view and create verifications, manage webhooks. Cannot manage billing or team."
  - "Viewer" — "Read-only access to verifications and analytics."
- "Send Invite" primary. Preview: "An invitation email will be sent to this address."

### Permissions Matrix (expandable section)

Collapsed by default. Toggle: "View permissions matrix" Caption `#0066FF` + chevron. When expanded: grid table — rows = permissions, columns = roles. Checkmark `#34C759` or dash `#48484F` in each cell. Permissions: View Verifications / Create Verifications / Export Data / Manage Webhooks / Manage API Keys / Manage Team / Manage Billing / View Audit Log / Configure Compliance.

---

## !Screen 12: Billing

**Route:** `verify.solidus.network/billing`

### Top Bar
H2 "Billing". Right: "Download Invoice" ghost.

### Current Plan Card

Full-width `#1A1A2E` card, 8px radius, `border-top: 2px solid #0066FF`, padding 24.

2-column layout:
Left: H3 "Growth Plan" 22/600 white + H1 "$499" 48/700 `#0066FF` + Body 16/400 `#8E8E93` "/month". Below: feature list (icon/check-circle 16px `#34C759` + Small 14/400 white): "100,000 verification queries/mo" / "All KYC levels (L1–L3)" / "All SDKs (JS, Python, Go)" / "Priority SLA 99.9%" / "Compliance reporting dashboard".
Right (aligned right): "Upgrade Plan" primary button + Body 14/400 `#8E8E93` "or " + "Cancel subscription" Small 14/400 `#FF3B30` link.

Usage meter below plan: "Verifications Used This Period" — progress bar 100% width, 8px height, 4px radius. Used: `#0066FF`. Unused: `#242438`. Label: "1,247 of 100,000 used (1.2%)". Caption `#8E8E93` right: "Resets Mar 31, 2026."

### Upgrade Plan Modal

560px wide. Same 3-plan pricing structure as PricingSection in landing page but adapted for dark mode. Cards: `#242438` bg, `1px #2A2A42` border. Featured "Growth" card: `border: 1px #0066FF`, `box-shadow: 0 0 24px rgba(0,102,255,0.15)`. Current plan badge: "Current Plan" green pill.

### Payment Method Card

`#1A1A2E` bg, 8px radius, padding 20 24. H3 "Payment Method" 16/600 white.

Row: credit-card icon 24px `#8E8E93` + "Visa ●●●● ●●●● ●●●● 4242" Body 14/400 white + "Expires 12/26" Caption `#8E8E93` + "Update" link `#0066FF` right.

### Invoice History

`#1A1A2E` bg, 8px radius, padding 24.

H3 "Invoice History" 22/600 white. Right: "Download All" link `#0066FF`.

Table: Date | Invoice # (JetBrains Mono) | Amount | Plan | Status | Download.

Status: "Paid" `#34C759` / "Upcoming" `#8E8E93` / "Failed" `#FF3B30`.

6 rows. Download: icon/download 16px `#8E8E93`, hover `#FFFFFF`.

Invoices: Mar 2026 $499 Paid / Feb 2026 $499 Paid / Jan 2026 $499 Paid / Dec 2025 $99 Paid (Startup plan) / Nov 2025 $99 Paid / Oct 2025 $99 Paid.

---

## !Screen 13: Settings

**Route:** `verify.solidus.network/settings`

### Layout
Same app sidebar. Settings content has a secondary vertical nav (200px left col, same sidebar styling but without Solidus branding): Organization / Security / Notifications / Compliance / Integrations / Preferences / Danger Zone. Active item: white text, `3px left border #0066FF`.

### Organization

H2 "Organization" 28/600 white.

`#1A1A2E` card, padding 24:
- "Organization Name": input with current value "Acme Corp"
- "Organization Logo": row with 64px circle upload area (current logo placeholder, "Change" button ghost)
- "Industry": dropdown "Crypto Exchange"
- "Country": dropdown "United States"
- "Website": input "https://acme.com"
- "Save Changes" primary right.

### Security

H2 "Security" 28/600 white.

Section "Two-Factor Authentication": `#1A1A2E` card, padding 24. Row Space Between: "2FA Status" Body white + "Enabled" green badge + "Manage" link `#0066FF`. Below: list of enrolled methods — "Authenticator app (Google Authenticator)" row + "Add SMS backup" link.

Section "Session Management": table of active sessions — Device / Last Active / IP / Actions (revoke button). "Revoke All Other Sessions" danger ghost button at bottom.

Section "SSO Configuration": toggle "Enable SSO" + input "SSO Metadata URL" + "Configure" link.

### Notifications

H2 "Notifications" 28/600 white. `#1A1A2E` card with grouped toggles:

**Email Notifications:**
- "Verification completed" — toggle on
- "Verification failed" — toggle on
- "Daily summary report" — toggle on
- "Webhook delivery failures" — toggle on
- "Team member invited" — toggle on

**Alert Thresholds:**
- "Alert when failure rate exceeds" — input "5%" + "per hour"
- "Alert when queue depth exceeds" — input "100" + "pending verifications"

**Channels:** Email (always on) + Slack webhook input (optional) + PagerDuty integration key (optional).

### Compliance

H2 "Compliance" 28/600 white.

`#1A1A2E` card, padding 24:
- "Require KYC Level" for all users: dropdown "Level 2 (Passport + liveness)"
- "AML Screening": toggle — "Enabled" → all completed KYC L2+ verifications auto-screened against OFAC/EU sanctions list
- "Data Retention Policy": dropdown "90 days (post-expiry)" — options: 30 / 90 / 180 days / 1 year / Indefinite (with GDPR note: indefinite retention requires explicit legal basis)
- "Automatic Credential Expiry": toggle on + input "365" days
- "Geographic Restrictions": multi-select country input with flag icons. Currently: "DPRK 🇰🇵" + "Iran 🇮🇷" blocked.
- "Require Consent Before Verification": toggle on
- "Save Compliance Settings" primary button.

### Integrations

H2 "Integrations" 28/600 white.

`#1A1A2E` card, padding 24.

**Connected Integrations section:** H3 16/600 white "Connected Services".

`IntegrationRow` × 3, each: height 72px, `border-bottom: 1px #242438`, horizontal layout Space Between, padding 0 4px.
- Left: integration logo 40px (`border-radius: 8px`) + Vertical: name Body 14/600 white + status Caption 12/400.
- Right: "Disconnect" ghost danger button (Small 13/500 `#FF3B30`, `border: 1px rgba(255,59,48,0.25)`, 32px height) or "Connect" ghost button (Small 13/500 `#0066FF`, `border: 1px #0066FF`).

Rows:
1. Salesforce logo + "Salesforce CRM" + Caption `#34C759` "Connected · Last synced 2026-03-17" → "Disconnect"
2. Slack logo + "Slack" + Caption `#34C759` "Connected to #compliance-alerts" → "Disconnect"
3. PagerDuty logo + "PagerDuty" + Caption `#8E8E93` "Not connected" → "Connect"

**Available Integrations section:** H3 16/600 white "Available Integrations" margin-top 24px.

3-column grid, gap 16px.

`IntegrationCard` — `#242438` bg, 8px radius, padding 16, `box-shadow: 0 2px 8px rgba(0,0,0,0.32)`:
- Logo 32px `border-radius: 6px` top-left
- H3 14/600 white margin-top 12px
- Body 13/400 `#8E8E93` margin-top 4px line-height 1.5
- "Connect →" link `#0066FF` Caption 12/500 margin-top 12px

Cards:
1. HubSpot — "Sync verified contacts to HubSpot CRM. Auto-tag verified users."
2. Zapier — "Trigger Zaps on kyc.completed and kyc.failed events."
3. Stripe Identity — "Supplement Solidus KYC data with Stripe Identity checks."
4. Datadog — "Stream webhook delivery metrics and verification events."
5. Segment — "Send verification events to Segment for downstream analytics."
6. Notion — "Log compliance events to a Notion database automatically."

**Webhooks note:** Caption 12/400 `#8E8E93` below grid: "All integrations use your existing webhook infrastructure. " + "Manage webhooks →" link `#0066FF`.

### Preferences

H2 "Preferences" 28/600 white.

`#1A1A2E` card, padding 24. Two setting rows, each: Space Between, height 56px, `border-bottom: 1px #242438`.

- **Language**: Body 14/400 white "Display Language" + Caption 12/400 `#8E8E93` "Interface language for the dashboard" → right: `LanguageSwitcher` control (same dark variant as Top Bar). Supported: EN 🇬🇧 · TR 🇹🇷 · DE 🇩🇪 · FR 🇫🇷 · ES 🇪🇸 · JA 🇯🇵 · KO 🇰🇷 · ZH 🇨🇳. Change takes effect immediately, preference persisted to account.
- **Theme**: Body 14/400 white "Interface Theme" + Caption 12/400 `#8E8E93` "Choose light or dark mode" → right: pill toggle (2 states, 120px wide): "Dark" (default active, Fill `#0066FF`) / "Light" (Fill `#242438`). Selecting Light triggers full-page color transition (background-color, color, border-color 200ms ease). Preference persisted to account.

### Danger Zone

H2 "Danger Zone" 28/600 `#FF3B30`.

`#1A1A2E` card, `border: 1px rgba(255,59,48,0.25)`, padding 24.

Two danger actions in rows:
1. "Export All Data" — Body `#8E8E93` "Download a complete archive of all verification records and credentials." + "Export Data" ghost danger right.
2. "Delete Organization" — Body `#8E8E93` "Permanently delete your organization, all verification data, and all API keys. This cannot be undone." + "Delete Organization" danger red button right.

Delete confirmation: modal 480px, red theme. "Type your organization name to confirm: [input]" — delete button only enables when text matches exactly.

---

## !Screen 14: Developer API Reference (Embedded)

**Route:** `verify.solidus.network/docs`

### Layout
No sidebar. Full-width 1440px. Left column: 280px dark nav panel (`#1A1A2E` bg). Center: 760px content area. Right: 360px code example panel (`#111D2E` bg).

### Left Nav Panel

Logo + "API Reference" H3 16/600 white. Version dropdown "v2 (Latest)".

Nav sections with expand/collapse:
- **Authentication** — "API Keys" / "Environments"
- **Verifications** — "Create Session" / "Get Session" / "List Sessions" / "Cancel Session"
- **Credentials** — "Issue Credential" / "Verify Credential" / "Revoke Credential"
- **Webhooks** — "Events Reference" / "Signature Verification" / "Retry Logic"
- **DIDs** — "Resolve DID" / "Register DID"
- **SDKs** — "JavaScript" / "Python" / "Go" / "React Native"

Active item: `3px left border #0066FF`, text white. Inactive: text `#8E8E93`. Hover: `#242438` bg.

Search box at top of nav: 36px height, `#242438` bg, icon/search 14px, placeholder "Search API...".

### Center Content — "Create Verification Session" example

`POST /v2/sessions` — pill badge: `#0066FF` bg, Body 14/700 white "POST" + JetBrains Mono 16/500 `#00D4FF` "/v2/sessions"

H1 32/700 white "Create Verification Session"
Body 16/400 `#8E8E93`: "Creates a new KYC verification session. Returns a session ID and a URL to redirect the user to complete their verification."

**Request Parameters table:** `#242438` bg, 8px radius. Columns: Parameter | Type | Required | Description. Rows:
- `did` | string | Required | "The subject's DID. W3C DID format (did:solidus:, did:ethr:, did:key:)"
- `level` | integer | Required | "Verification level: 1 (basic), 2 (passport + liveness), 3 (enhanced)"
- `redirect_url` | string | Required | "URL to redirect user after verification completes"
- `metadata` | object | Optional | "Arbitrary key-value pairs attached to the session"
- `webhook_url` | string | Optional | "Override endpoint for this session's webhooks"
- `expires_in` | integer | Optional | "Session TTL in seconds (default: 3600)"

**Responses:** H3 "Responses" + tabs: "200 OK" (active) / "400 Bad Request" / "401 Unauthorized" / "422 Unprocessable" / "429 Rate Limited".

200 OK response object in `#242438` bg, JetBrains Mono 13/400, key `#00D4FF`, string value `#A8E600`, number `#FF9500`.

### Right Code Panel

Language tabs (JavaScript active): same `LanguageTabs` component.

Code example:
```
POST https://api.verify.solidus.network/v2/sessions
Authorization: Bearer sk_live_abc123...
Content-Type: application/json

{
  "did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
  "level": 2,
  "redirect_url": "https://app.acme.com/verify/done",
  "metadata": {
    "userId": "usr_abc123",
    "orderId": "ord_xyz8827"
  }
}
```

Response example (200):
```json
{
  "id": "vsn_9f8e7d6c5b4a3291",
  "did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
  "level": 2,
  "status": "pending",
  "url": "https://verify.solidus.network/s/vsn_9f8e7d6c",
  "expires_at": 1742050800,
  "created_at": 1742047200,
  "webhook_url": null,
  "metadata": { "userId": "usr_abc123" }
}
```

Copy button on each code block. `CopyButton` top-right.

---

## !Screen 15: Quickstart / Integration Guide

**Route:** `verify.solidus.network/docs/quickstart`

Same 3-column layout as API Reference but center content is a step-by-step guide.

**Step 0 — Prerequisites:** amber callout card with checklist.

**Step 1 — Install:** `npm install @solidus/verify` in terminal code block with shell prompt `$` in `#A8E600`.

**Step 2 — Initialize:** code snippet showing `SolidusVerify` constructor with API key.

**Step 3 — Create a session:** code snippet (JS) showing `verify.sessions.create()`.

**Step 4 — Redirect user:** code snippet showing how to redirect + expected UI screenshots (inline 240px preview cards showing the hosted verification flow — document upload step and liveness step).

**Step 5 — Handle webhook:** code snippet showing webhook handler with signature verification.

**Step 6 — Verify the credential:** code snippet showing `verify.credentials.verify()` returning the W3C VC.

Side panel shows corresponding API call result for each step. Progress indicator at top: 6 steps, user's progress tracked with green checkmarks on completed steps (persisted in localStorage).

---

## !Marketing Screen 16: Homepage (verify.solidus.network)

**Mode:** Light (exception to dark rule — public pages are light). Background `#FFFFFF` / `#F2F2F7` alternating sections.

### Navigation Bar

Height 72px. Background `#FFFFFF`. `border-bottom: 1px #E0E0E5`. `position: sticky`, `top: 0`, `z-index: 100`.

Left: Solidus "S" logomark + "Solidus Verify" wordmark. Body 16/600 `#0A1628`.

Center nav links (Small 14/400 `#0A1628`, hover `#0066FF` 150ms): "Product" | "Pricing" | "Use Cases" | "Docs" | "Company".

Right: `LanguageSwitcher` (light mode variant) + `ThemeToggle` (light mode variant) + "Sign In" ghost button (Body 14/400 `#0A1628`) + "Start Free" primary button `#0066FF` 36px height. Gap 8px between controls.
- **LanguageSwitcher (light)**: Fill `#F2F2F7`, Border `1px #E0E0E5`, Corner Radius 6px, Padding `8px 12px`, Height 36px. Trigger: `globe` 18px `#8E8E93` + "EN" Caption 12/500 `#8E8E93` + `chevron-down` 12px `#8E8E93`. Dropdown Fill `#FFFFFF`, shadow `0 8px 24px rgba(0,0,0,0.12)`. All other dropdown behavior identical to dark variant. Supported: EN 🇬🇧 · TR 🇹🇷 · DE 🇩🇪 · FR 🇫🇷 · ES 🇪🇸 · JA 🇯🇵 · KO 🇰🇷 · ZH 🇨🇳.
- **ThemeToggle (light)**: Fill `#F2F2F7`, Border `1px #E0E0E5`, Corner Radius 6px, 36×36px. Icon `moon` 18px Fill `#666666`. Hover: icon Fill `#0A1628`, 150ms ease-out. Same tooltip and crossfade behavior.

**Scrolled state:** add `box-shadow: 0 1px 12px rgba(0,0,0,0.08)`.

### Hero Section

Frame: 1440×620px. `Fill: #0A1628` (dark hero exception).

2-column, 64px gap, 120px horizontal padding, vertically centered.

**Left column (600px):**
- Caption 12/600 letter-spacing 0.08em `#A8E600`: "VERIFY.SOLIDUS.NETWORK"
- H1 52/700 white line-height 1.1: "KYC verification\nthat respects users."
- Body 18/400 white 70% max-width 480px: "Verify email, phone, and identity in seconds. Credentials issued on-chain. Biometric data never stored."
- Button row gap 16px: "Start Free →" primary 48px height, padding 0 28px, `#0066FF` + "View Docs →" ghost 48px, `border: 1px rgba(255,255,255,0.25)`, white text.
- `TrustRow` margin-top 32px, gap 24px: 3 chips `Fill: rgba(255,255,255,0.08)`, 20px radius, padding 6 14, Caption 12/500 white 70%:
  - icon/shield-check 14px `#A8E600` + "No biometric storage"
  - icon/lock 14px `#A8E600` + "GDPR compliant"
  - icon/zap 14px `#A8E600` + "1-2s verification"

**Right column (520px):** `VerifyPreviewCard` — simulated verification widget.
- `#1A1A2E` bg, 16px radius, padding 24, `box-shadow: 0 16px 48px rgba(0,0,0,0.48)`, width 480px.
- Window chrome: 3 dots (12px: `#FF5F57`/`#FEBC2E`/`#28C840`, gap 8) + tab "verify.solidus.network/demo" Caption 11 `#8E8E93`.
- 3-step progress (24px circles): "Submit" active `#0066FF` | "Process" upcoming `#2A2A42` | "Credential" upcoming.
- Document upload zone: dashed `1px #2A2A42`, 8px radius, padding 24, center: icon/upload-cloud 32px `#8E8E93` + Body 14/400 `#8E8E93` "Drop passport or ID" + Caption 11/400 `#48484F` "JPG, PNG, PDF · max 10MB".
- Liveness placeholder: 130×160px `#242438` bg, 8px radius, centered face-scan overlay icon `#0066FF`.
- "Submit for Verification" primary button full-width margin-top 16px.

### Dominant Stat Section

Frame: `Fill: #0A1628`. Padding 64 120px. Border-bottom: `1px rgba(255,255,255,0.06)`.

Layout: Vertical Auto Layout, spacing 12, Alignment: Center.

`dominantLabel` — Caption 12/600, Fill: `#4A4A6A`, letter-spacing 0.12em, uppercase, text-align center
- Text: "TOTAL VERIFICATIONS ON THE NETWORK"

`dominantNumber` — Display 80/700, Fill: `#A8E600`, letter-spacing -2px, text-align center, line-height 1.0
- Text: "48,700,000+"
- Inline `LiveDot` 10px `#34C759` pulsing after "+"
- Number morphs upward on first scroll-into-view (see Interaction Patterns)

`dominantSubRow` — Horizontal Auto Layout, spacing 48, Alignment: Center, margin-top 20px
- Vertical dividers: `1px rgba(255,255,255,0.08)` between items
- `MiniStat` × 3 — Vertical Auto Layout, spacing 4, Alignment: Center
  1. H3 28/700 `#FFFFFF` "99.4%" + Caption 12/400 `#8E8E93` "verification success rate"
  2. H3 28/700 `#00D4FF` "1-2s" + Caption 12/400 `#8E8E93` "median finality"
  3. H3 28/700 `#FFFFFF` "180+" + Caption 12/400 `#8E8E93` "countries supported"

### Live Stats Strip (secondary — below dominant stat)

Frame: height 72px. `Fill: #F2F2F7`. Padding 0 120px.

4 stats, equal-width columns, vertically centered:
- "48.7M" H2 28/700 `#0A1628` + "Verifications" Label 12/400 `#666666` + `LiveDot` 6px `#34C759` pulsing
- "99.4%" H2 28/700 `#0A1628` + "Success Rate" Label 12/400 `#666666`
- "$0.001" H2 28/700 `#34C759` + "Per Query" Label 12/400 `#666666`
- "180+" H2 28/700 `#0A1628` + "Countries" Label 12/400 `#666666`

Dividers between stats: `1px #E0E0E5`, 28px height, vertically centered.

### Partner Logos Section

Padding 64 120px. `Fill: #FFFFFF`.

Label 12/600 letter-spacing 0.08em `#999999` center: "TRUSTED BY COMPLIANCE TEAMS AT"

2 rows × 5 logos, gap 48px horizontal, 32px vertical. Each `PartnerLogo`: 160×56px, centered. `Fill: #8E8E93` desaturated. Hover: `Fill: #0A1628` 200ms. Companies: Binance, Kraken, Coinbase, Uniswap, Aave, Compound, Gemini, dYdX, Chainlink, Polygon.

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

### How It Works Section

Padding 80 120px. `Fill: #F2F2F7`.

H2 center 36/700 `#0A1628`: "Verify once. Use everywhere."
Body center 16/400 `#666666` max-width 600px margin auto: "The credential is issued to the user's DID — not stored on your servers. Any Solidus-integrated service can verify it instantly, for $0.05 instead of $5–20."

4-step horizontal flow, gap 16px, margin-top 48px:

`StepCard` × 4 — `#FFFFFF` bg, 12px radius, padding 28, `border: 1px #E0E0E5`, flex-equal:
- Step number: 36px circle `#0066FF` bg, H3 18/700 white centered
- H3 18/600 `#0A1628` margin-top 16px
- Body 14/400 `#666666` line-height 1.6

Steps:
1. "Integrate" — "Add one npm package. One API call starts a KYC session."
2. "Verify" — "User submits document + liveness. Validators confirm on-chain."
3. "Credential Issued" — "A W3C Verifiable Credential goes into the user's DID wallet."
4. "Reuse Anywhere" — "Any Solidus service presents the credential. No re-upload. Ever."

Connecting arrows between steps: icon/arrow-right 24px `#C7C7CC` centered between cards.

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

### Feature Grid Section

Padding 80 120px. `Fill: #FFFFFF`.

H2 center: "Everything your compliance team needs"
Body center `#666666`: "From basic email verification to full KYC with liveness check and on-chain credential issuance."

3-column, 2-row grid, gap 32px, margin-top 48px. 6 `FeatureCard`:
`#FFFFFF` bg, 12px radius, padding 28, `border: 1px #E0E0E5`, hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)` 200ms.

1. icon/mail 24px `#0066FF` + "Email Verification" H3 18/600 `#0A1628` + "Confirm email ownership via one-click link. Instant. Free."
2. icon/smartphone + "Phone Verification" + "SMS OTP. Global carrier coverage. Under 1 second."
3. icon/user-check + "KYC Level 1" + "Name, DOB, address — no document required. $1 per verification."
4. icon/shield-check + "KYC Level 2" + "Government ID + liveness check. Credential issued on-chain. $5."
5. icon/award + "Verifiable Credentials" + "W3C-standard credentials in the user's DID wallet. Present anywhere."
6. icon/code + "REST API + SDKs" + "JavaScript, Python, Go SDKs. Integrate in under an hour."

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

### Industry Verticals Section

Padding 80 120px. `Fill: #F2F2F7`.

H2 center: "Built for your industry"

`IndustryTabBar` — 4 pills, gap 8px, centered:
Active: `#0A1628` bg, white text, 20px radius. Inactive: `#FFFFFF` bg, `#666666` text, `border: 1px #E0E0E5`.
Tabs: "Crypto & DeFi" | "Fintech" | "Gaming" | "Healthcare"

`IndustryPanel` — 2-column, gap 64px, padding-top 48px:

Left (560px): Vertical, spacing 24px:
- H2 28/700 `#0A1628`
- Body 16/400 `#666666` line-height 1.7
- 3 use-case bullet points (icon/check-circle 16px `#0066FF` + Body 14/400 `#0A1628`)
- `ROICallout`: `Fill: rgba(0,102,255,0.06)`, `border: 1px rgba(0,102,255,0.15)`, 8px radius, padding 16: Body 14/400 `#0047B3` with cost comparison numbers in Bold.

Right (440px): `IndustryIllustration` — `Fill: #FFFFFF`, 12px radius, padding 24, `border: 1px #E0E0E5`. Relevant icon 48px `#0066FF` centered + 2 metric chips (pill, `Fill: #F2F2F7`, Body 14/600 `#0A1628`).

**Crypto & DeFi (default active):**
- "MiCA-compliant KYC for DeFi"
- "Verify users without storing passports. FATF Travel Rule via credential attestation. MiCA-compliant from day one."
- DEX access gating (verified country of residence) / Sybil-resistant airdrops (1 human = 1 allocation) / AML compliance via credential flags
- ROI: "At $0.05/verification, 10K monthly verifications cost $500 — vs $1,848 for Auth0."

### Compliance Section

Padding 80 120px. `Fill: #0A1628`.

H2 white center: "Built for regulated industries"
Body white 60% center: "Privacy by architecture, not policy."

4 `ComplianceBadge` components, horizontal row, gap 32px, centered:
`Fill: rgba(255,255,255,0.06)`, 16px radius, padding 28 24, `border: 1px rgba(255,255,255,0.10)`, min-width 200px:
- icon/shield-check 32px `#A8E600` + H3 16/600 white + Label 12/400 white 50%

Badges:
1. icon/shield-check "GDPR Ready" "No personal data stored on-chain"
2. icon/award "SOC 2 Type II" "Planned Year 2 — trust center published"
3. icon/globe "BIPA Compliant" "Written consent flow included"
4. icon/code "Open Source" "Full auditability — protocol on GitHub"

Below: Caption 12/400 white 40% center: "Audit reports at verify.solidus.network/security/audits"

### Testimonials Section

Padding 80 120px. `Fill: #F2F2F7`.

H2 center: "What compliance and engineering teams say"

3-column grid, gap 24px:

`TestimonialCard` — `#FFFFFF` bg, 16px radius, padding 32, `border: 1px #E0E0E5`:
- icon/quote 24px `Fill: rgba(0,102,255,0.12)` top-left
- Body 16/400 `#0A1628` line-height 1.7: quote text
- Metric callout pill (between quote and attribution): `Fill: rgba(0,102,255,0.08)`, `border: 1px rgba(0,102,255,0.20)`, Caption 11/600 `#0066FF`
- Divider `1px #E0E0E5`
- Attribution: avatar 48px circle `#F2F2F7` + right column: Name Label 14/600 `#0A1628` + Role Label 13/400 `#666666` + Company logo 20px height desaturated

Testimonials:
1. "We went from 3 weeks to 2 days for KYC compliance. Solidus is the only API I've integrated where the docs are shorter than the time I've spent on-call with Auth0." — **Tomáš Kovář**, Lead Infrastructure Engineer, Generali DeFi. Metric: "3 weeks → 2 days"
2. "The 'credentials, not copies' model was the only thing our legal team needed to hear. No BIPA exposure. No GDPR audit liability. Contract signed in 48 hours." — **Layla Al-Rashid**, Chief Compliance Officer, Sterling Fintech. Metric: "Signed in 48 hours"
3. "We reduced per-user KYC cost from $8.50 to $0.40. That's 95% — and it changed the unit economics of our entire product." — **Brendan Okafor**, CEO, TrustLayer Exchange. Metric: "$8.50 → $0.40"

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

### Pricing Preview Section

Padding 80 120px. `Fill: #FFFFFF`.

H2 center: "Simple, usage-based pricing"
Body center `#666666`: "Pay per verification. No minimums. Switch plans anytime."

`BillingToggle` — pill toggle: "Pay as you go" | "Subscription plans". Active: `#0A1628` bg white text. Inactive: `#F2F2F7` bg `#666666` text.

**Pay-as-you-go table (default):** centered, max-width 720px, `border: 1px #E0E0E5`, 12px radius, overflow hidden.

Header row: `Fill: #0A1628`, padding 16 24. 3 cols: "Verification Type" / "What's Included" / "Price" — Caption white 60%.

Data rows × 6, alternating `#FFFFFF`/`#F9F9FB`, padding 16 24, hover `#F0F4FF` 150ms:
1. Basic attestation | Identity attribute query | $0.10
2. Email verification | Confirmation link + bounce check | $0.10
3. Phone verification | SMS OTP, global carrier | $0.20
4. KYC Level 1 | Name, DOB, address — no document | $1.00
5. KYC Level 2 | Passport/ID + liveness check, credential issued on-chain | $5.00
6. KYC Level 3 | Full background check + sanctions + PEP screening | $20.00

Footnote row: `#F9F9FB`, Body 13/400 `#8E8E93`: "Credential issuance included in all KYC tiers — $0.01 standalone"

Comparison note below table: Body 14/400 `#8E8E93` center: "Compare: Auth0 charges $23,000 per 1M operations. Solidus: $1,000 per 1M. 95% cheaper by design." — `$23,000` `#FF3B30`, `$1,000` `#34C759`.

**Subscription plans (toggled view):** 3-column card grid, max-width 960px, centered.

Plans:
- **Startup** $99/month — 10,000 queries — ghost CTA
- **Growth** $499/month — 100,000 queries — featured (scale 1.03, `border: 2px #0066FF`, "Most Popular" badge) — primary CTA
- **Enterprise** Custom — Unlimited — ghost CTA "Contact Sales"

Footer Caption `#8E8E93`: "All plans include 14-day free trial and first 1,000 verifications free. No credit card required."

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

### Developer Quickstart Section

Padding 80 120px. `Fill: #0A1628`.

H2 white center: "Integrate in minutes, not weeks"
Body white 60% center: "One npm package. One API call. KYC live in your app the same day."

2-column, gap 64px, max-width 1000px, centered.

Left (480px): 4 quickstart steps (number circle 28px `#0066FF` + content):
1. "Install" — "npm install @solidus/verify. Zero dependencies."
2. "Authenticate" — "One API key. Sandbox mode for testing."
3. "Verify" — "One await call returns a W3C VC."
4. "Go live" — "Change 'testnet' to 'mainnet'. Done."

Right (480px): code block `#111D2E` bg, 12px radius. Window chrome with 3 dots + "integration.js" tab. Code in JetBrains Mono 14/20 with full syntax highlighting. Copy button top-right.

Below code: 3 links Caption 12/500 `#00D4FF` gap 24px: "View full SDK docs →" | "Python SDK →" | "Go SDK →"

### Sign Up CTA Section

Padding 80 120px. `Fill: #FFFFFF`.

H2 center 40/700 `#0A1628`: "Start verifying in minutes."
Body center 18/400 `#666666`: "Free for 1,000 verifications/month. No credit card required."

`SignupForm` — Horizontal, gap 12px, max-width 480px, centered, margin-top 24px:
- Input 48px height, 8px radius, `border: 1px #E0E0E5`, placeholder "Your work email"
- "Get Started →" primary button 48px height

Caption below `#999999`: "By signing up you agree to our Terms of Service and Privacy Policy."

**Email invalid state:** `border: 1px #FF3B30` + inline Caption `#FF3B30` below: "Please enter a valid email address."

**Success state:** form replaced by: icon/check-circle 32px `#34C759` + H3 "Check your inbox" + Body "We've sent login instructions to your email."

### Footer

`Fill: #0A1628`. Padding 64 120px.

4-column grid:

**Col 1 (240px):** Solidus logo + wordmark (white). Body 14/400 white 60% max 200px: "KYC infrastructure for regulated industries." Social icons row: LinkedIn / Twitter/X / GitHub / Discord — each 32×32px `rgba(255,255,255,0.15)` bg, hover `rgba(255,255,255,0.25)`.

**Col 2: Product**
Caption 12/500 `#8E8E93` uppercase: "PRODUCT"
Links: Small 14/400 white 70% hover white: Verifications / API Keys / Webhooks / Analytics / Credential Management / Changelog / Status

**Col 3: Developers**
Caption: "DEVELOPERS"
Links: Documentation / API Reference / SDKs / Quickstart / Webhook Guide / Sample Code / Rate Limits

**Col 4: Company**
Caption: "COMPANY"
Links: About Solidus / Pricing / Security & Trust / Privacy Policy / Terms of Service / GDPR / Contact Us

Bottom bar (padding-top 24px, `border-top: 1px rgba(255,255,255,0.08)`): Caption 12/400 `#48484F` "© 2026 Solidus Foundation. All rights reserved." left + Caption 12/400 `#48484F` right: "verify.solidus.network · v2.4.1"

**Edge states:** Stats strip API down → static values, remove LiveDot, add Caption italic `#8E8E93` "Stats as of 2026-03-15".

---

## !Marketing Screen 17: Pricing Page

**Route:** `verify.solidus.network/pricing`
**Mode:** Light.

### Header Section

Padding 80 120px. `Fill: #FFFFFF`.

H1 center 48/700 `#0A1628`: "Pricing"
Body center 18/400 `#666666`: "Pay per verification. No setup fees. No minimums. Cancel anytime."

`BillingToggle` — monthly/annual toggle. Annual: "Save 20%" badge `#34C759`.

### Plan Cards

3-column grid, gap 24px, max-width 1040px, centered, margin-top 48px.

Anatomy as described in Homepage pricing section. Full detail:

**Startup — $99/month (or $79/month annual):**
- Included: 10,000 verification queries/month
- Features: Email + phone verification / KYC Level 1 & 2 / REST API + JavaScript SDK / Standard SLA 99.5% / 1 team member / Community support
- CTA: "Start Free Trial" ghost button

**Growth — $499/month (or $399/month annual) [FEATURED]:**
- Included: 100,000 queries/month
- Features: Everything in Startup / KYC Level 3 + sanctions screening / All SDKs (JS, Python, Go, Rust) / Priority SLA 99.9% / 10 team members / Compliance reporting dashboard / Webhook delivery logs / Priority email support
- CTA: "Start Free Trial" primary button
- "Most Popular" badge centered top of card

**Enterprise — Custom:**
- Included: Unlimited queries
- Features: Everything in Growth / White-label API + custom branding / Dedicated compliance advisor / On-premise deployment option / Custom SLA + MSA / Dedicated Slack channel / 24/7 phone support
- CTA: "Contact Sales" ghost button

Below cards: Caption center `#8E8E93`: "All plans include 14-day free trial. First 1,000 verifications free. No credit card required to start."

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

### Feature Comparison Table

H2 center 36/700 `#0A1628` margin-top 64px: "Compare plans"

Full-width table, max-width 1040px, centered. 4 columns: Feature | Startup | Growth | Enterprise.

Header: `Fill: #0A1628`. Plan columns: plan name + price.

Row groups with gray section headers `Fill: #F2F2F7`:
- **Verification Types:** Email / Phone / KYC Level 1 / KYC Level 2 / KYC Level 3 / Sanctions + PEP
- **Monthly Quota:** 10K / 100K / Unlimited
- **Team Members:** 1 / 10 / Unlimited
- **SDKs:** JS only / JS, Python, Go / All + Rust
- **SLA:** 99.5% / 99.9% / Custom
- **Compliance:** Basic / Full dashboard + CSV / Custom reports + dedicated advisor
- **Support:** Community / Priority email / Dedicated Slack + phone

Cells: icon/check `#34C759` (included) / icon/minus `#8E8E93` (not included) / text value.

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

### FAQ Section

H2 center 36/700 `#0A1628`: "Frequently asked questions"

5 `FAQItem` accordion (Radix-style): H3 20/600 `#0A1628` question + chevron-down icon right. Expanded: Body 16/400 `#666666` answer below. Divider `1px #E0E0E5`.

Questions:
1. "What counts as a 'verification query'?" — Answer explaining each API call to the /sessions or /credentials endpoints counts as one query.
2. "Can I switch plans mid-month?" — Yes, immediate upgrade; downgrade takes effect at next billing cycle.
3. "What happens if I exceed my plan quota?" — Pay-as-you-go overage at $0.01 per additional query (Startup/Growth). Enterprise: no cap.
4. "Is there a free trial?" — 14-day trial, first 1,000 verifications free, no credit card required.
5. "What's the difference between a 'query' and a 'verification session'?" — One session (a full KYC flow) = one query regardless of how many underlying checks are performed.

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

### Enterprise CTA

Padding 64 120px. `Fill: #0A1628`.

H2 white center: "Need custom volume, white-label, or on-premise?"
Body white 60% center: "We work with regulated institutions who need custom MSAs, dedicated infrastructure, and a compliance advisor on speed dial."
"Contact Enterprise Sales →" primary button 48px height + "View enterprise features" ghost right, gap 16px.

---

## !Marketing Screen 18: Security & Compliance Page

**Route:** `verify.solidus.network/security`
**Mode:** Light.

### Hero

H1 center 48/700 `#0A1628`: "Security & Compliance"
Body center 18/400 `#666666`: "Every architectural decision made with a compliance officer's requirements as the constraint."

### Architecture Diagram Section

Full-width `Fill: #F2F2F7`. Padding 80 120px.

H2: "How we protect your users' data"

Diagram card `#FFFFFF`, 12px radius, padding 40, `border: 1px #E0E0E5`.

Flow diagram (left to right):
User's Device → (TLS 1.3) → Solidus API Edge → (document AI processing, no storage) → Validators (consensus, hash only) → Solidus Blockchain (credential hash anchored) → User's DID Wallet (credential stored by user).

Each node: rounded box with icon + label. Arrows with "TLS 1.3" / "BLAKE3 hash" / "BLS signature" labels. Red annotation at "API Edge": "Document images processed + deleted. No biometric data persisted."

### Certifications Grid

4-column grid, gap 24px, padding 0 120px.

`CertBadge` — `#FFFFFF` bg, 12px radius, padding 28, `border: 1px #E0E0E5`, center:
- Icon 48px `#0066FF`
- H3 20/600 `#0A1628`
- Body 14/400 `#666666`
- Status pill (Current / Planned / N/A)

Certs:
1. GDPR — "No personal data stored on-chain. Right to erasure: supported." — Current
2. SOC 2 Type II — "Audit in progress. Report available post-Year 2." — Planned
3. ISO 27001 — "Information security management system." — Planned
4. BIPA — "Written biometric consent flow. No biometric template stored." — Current
5. MiCA — "Credential attestation satisfies MiCA KYC requirements." — Current
6. eIDAS 2 — "W3C VC credentials compatible with eIDAS 2 wallet standard." — Current
7. FATF Travel Rule — "Credential attestation model satisfies VASP Travel Rule." — Current
8. PCI-DSS — "Not applicable — no card data processed." — N/A

### Privacy Architecture Principles

H2: "Privacy by architecture"

3-column grid, gap 32px:
- "Zero Biometric Storage" — icon/scan-face `#0066FF` — "Liveness images are processed in-memory and discarded. No facial template is ever written to disk."
- "Data Minimization" — icon/minimize-2 `#0066FF` — "Only cryptographic proofs are stored on-chain — never names, passport numbers, or photos."
- "User-Controlled Credentials" — icon/key `#0066FF` — "Credentials live in the user's DID wallet. You cannot access them without the user's consent."
- "GDPR Right to Erasure" — icon/trash-2 `#0066FF` — "Deleting an account removes all off-chain data. The on-chain hash cannot be reversed to PII."
- "Consent-First" — icon/check-square `#0066FF` — "A signed consent transaction is required before any verification begins."
- "Open Source" — icon/github `#0066FF` — "All credential issuance logic is open-source and independently auditable."

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

## !Marketing Screen 19: Use Cases Page

**Route:** `verify.solidus.network/use-cases`
**Mode:** Light.

### Navigation Tabs

`VerticalTabLayout` — left sidebar 280px with industry list + content area right.

Industries: Crypto & DeFi | Fintech / Banking | Gaming | Healthcare | Marketplaces | Gig Economy | Real Estate | Government

Each industry page: H1 + hero metric callout + 3 use cases (each with icon + title + description + code/API snippet showing relevant integration pattern) + customer quote + CTA.

**Crypto & DeFi:**
- "DEX access gating" — on-chain credential check before swap execution
- "Sybil-resistant airdrops" — 1 verified human = 1 allocation, DID proof
- "MiCA VASP compliance" — credential satisfies VASP KYC under MiCA

**Fintech:**
- "Account opening KYC" — L2 KYC on account creation
- "PSD2 strong authentication" — credential for re-auth
- "AML onboarding" — sanctions + PEP check included in L3

---

## !Marketing Screen 20: Enterprise Page

**Route:** `verify.solidus.network/enterprise`
**Mode:** Light.

Hero: H1 "Enterprise KYC at any scale" + "Contact Sales" CTA prominent.

Sections:
- Volume pricing table (custom tiers for 1M+, 10M+, 100M+ monthly verifications)
- White-label API section: screenshot of a branded verification flow with custom logo/colors
- On-premise deployment: architecture diagram showing self-hosted validator nodes
- Dedicated SLA section: 99.99% uptime commitment, dedicated incident response
- Compliance advisory: named advisor + calendar booking widget
- Enterprise customer logos grid
- "Talk to Enterprise Sales" form (name, company, monthly verification volume dropdown, message)

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

---

## !Screen 21: Liveness Verification Flow (User-Facing Hosted Page)

**Route:** `verify.solidus.network/s/vsn_9f8e7d6c` (user redirect from API)
**Mode:** Dark. This is the end-user-facing step, not the dashboard.
**Viewport:** Design for both 1440px desktop and 375px mobile.

### Layout
Centered single-column, max-width 480px, margin auto. Background `#0A1628`. Top: progress bar (3 steps). No sidebar.

### Step 1: Document Upload

H2 center 24/700 white: "Upload your identity document"
Body center 14/400 `#8E8E93`: "A government-issued ID is required to complete verification."

Document type selector (3 pills, gap 8px, centered): "Passport" | "Driver's License" | "National ID". Active: `#0066FF` bg white text.

Upload zone: `#1A1A2E` bg, 8px radius, `dashed border 2px #2A2A42`, padding 40, center:
- icon/upload-cloud 40px `#8E8E93`
- Body 16/400 white "Drag & drop or click to upload"
- Caption 12/400 `#8E8E93` "JPG, PNG or PDF · max 10MB"

**Post-upload:** thumbnail preview card (`#242438` bg, 8px radius, padding 12): thumbnail 60×40px + filename Body 14/400 white + filesize Caption `#8E8E93` + icon/x 16px `#8E8E93` remove.

Document quality rejection: thumbnail gets `border: 2px #FF3B30` + red x-circle badge top-right + Caption `#FF3B30` "Image quality too low" + 3 hints below + "Try Again" button.

"Continue" primary button full-width 48px.

### Step 2: Liveness Check

All 8 `LivenessCamera` states (same as previously defined). Mobile-optimized: full-width camera feed, guide circle 240px diameter (mobile).

### Step 3: Processing → Success / Failure

Center-aligned. `CircularProgress` 120px diameter, brand gradient spinning ring, 800ms linear infinite rotation. H2 center white "Verifying your identity..." + 3-step live checklist.

**Success:** icon/check-circle 64px `#34C759` (spring animation) + H2 "Verification Complete" + credential summary card + Body "You can now close this window. Your verified credential has been issued."

**Failure:** icon/x-circle 64px `#FF3B30` + H2 `#FF3B30` "Verification Unsuccessful" + Body `#8E8E93` reason + "Try Again" primary + "Contact Support" ghost.

---

## !Screen 22: Sign Up

**Route:** `verify.solidus.network/signup`
**Mode:** Dark. Background `#0A1628`. No sidebar.

### Layout
Same split-screen layout as Screen 1 (Login): left brand panel 640px + right form area 800px.

**Left column — brand panel:**
Identical to the Login brand panel (`#1A1A2E` bg, Solidus logo, hero copy, 3 TrustChips, copyright footer).

**Right column — registration form:**
Background `#0A1628`, centered vertically, padding 0 96px.

Top-right: "Already have an account?" Small 14/400 `#8E8E93` + "Sign in →" Small 14/500 `#0066FF` link.

**Registration Form:**
H2 28/600 white: "Create your Solidus Verify account"
Body 14/400 `#8E8E93` margin-bottom 32px: "Start with 1,000 free verifications. No credit card required."

Fields (each: label Caption 12/500 `#8E8E93` margin-bottom 6px):
1. "Work email" — Input 48px height, `#242438` bg, `1px #2A2A42` border, Focus: `1px #0066FF`. Placeholder: "you@company.com"
2. "Full name" — Input, Placeholder: "Jane Smith"
3. "Company name" — Input, Placeholder: "Acme Corp"
4. "Password" — Input with eye-toggle. Placeholder "Create a password". Below: password strength bar (4 segments, 4px height, `#242438` track, fills left-to-right: 1 segment `#FF3B30` Weak / 2 segments `#FF9500` Fair / 3 segments `#FF9500` Good / 4 segments `#34C759` Strong) + Caption 12/400 strength label right.

Checkbox row: 16px checkbox `#242438` bg + Body 14/400 `#8E8E93`: "I agree to the " + "Terms of Service" `#0066FF` + " and " + "Privacy Policy" `#0066FF`.

"Create Account" button: full-width, 48px height, `#0066FF` bg, H3 16/600 white. Disabled until email valid + checkbox checked.

Divider + Google SSO button (same as Login).

**Loading state:** "Create Account" button shows 16px spinner (white), disabled. Fields at 60% opacity.

**Email taken state:** Email field `border: 1px #FF3B30` + error message below field Caption `#FF3B30`: "An account with this email already exists." + "Sign in instead →" link `#0066FF`.

**Email confirmation state (post-submit):** Form replaced by centered confirmation block: icon/mail 48px `#0066FF` + H2 "Check your inbox" + Body 14/400 `#8E8E93` "We've sent a verification link to " + email address in white + ". Click the link to activate your account." + "Resend email" ghost button + Caption `#48484F` "Didn't get it? Check your spam folder."

### Interactions
- "Create Account" button: disabled (40% opacity + `cursor: not-allowed`) until all required fields valid and checkbox checked
- Email field: 400ms debounce → check for existing account → show error inline if taken
- Password strength bar: updates on each keypress, no debounce

---

## !Screen 23: Forgot Password

**Route:** `verify.solidus.network/forgot-password`
**Mode:** Dark. Background `#0A1628`. No sidebar.

### Layout
Centered single-column, max-width 480px, vertically centered in viewport.

Top-left: "← Back to sign in" link Body 14/400 `#0066FF`.

Solidus "S" logomark 32px centered + "Solidus Verify" caption below.

**Forgot Password Form:**
H2 28/600 white center: "Reset your password"
Body 14/400 `#8E8E93` center margin-bottom 32px: "Enter your work email and we'll send you a link to reset your password."

Field: "Work email" label + Input 48px, `#242438` bg, `1px #2A2A42` border, placeholder "you@company.com".

"Send Reset Link" primary button full-width 48px.

**Loading state:** button spinner, field at 60% opacity.

**Success state (email sent):** Form replaced by: icon/mail 64px `#0066FF` (centered, spring animation scale 0→1.1→1.0 350ms) + H2 "Check your inbox" + Body `#8E8E93` "We've sent a password reset link to [email]. The link expires in 15 minutes." + "Resend email" ghost button (enabled after 60s cooldown; before that: Caption `#48484F` "Resend in 58s" countdown) + "← Back to sign in" link centered.

**Email not found state:** Field `border: 1px #FF3B30` + Caption `#FF3B30` below: "No account found with this email address." + "Sign up instead →" link `#0066FF`.

### Interactions
- Button disabled until valid email entered (format check only, no account lookup until submit)
- Resend cooldown timer: 60s countdown shown as Caption, then button re-enables

---

## !Screen 24: Reset Password

**Route:** `verify.solidus.network/reset-password` (token-gated via emailed link)
**Mode:** Dark. Background `#0A1628`. No sidebar.

### Layout
Centered single-column, max-width 480px, vertically centered.

**Valid token state (default):**

Solidus logomark + caption above form.

H2 28/600 white: "Set a new password"
Body 14/400 `#8E8E93` margin-bottom 32px: "Your new password must be at least 8 characters and different from your previous password."

Fields:
1. "New password" — Input 48px with eye-toggle. Password strength bar below (same 4-segment spec as Sign Up).
2. "Confirm new password" — Input 48px with eye-toggle.

"Update Password" primary button full-width 48px. Disabled until both fields filled and match.

**Passwords don't match state:** Confirm field `border: 1px #FF3B30` + Caption `#FF3B30` below: "Passwords do not match."

**Loading state:** button spinner, fields at 60% opacity.

**Success state:** Full area replaced by: icon/check-circle 64px `#34C759` (spring animation scale 0→1.1→1.0) + H2 "Password updated" + Body `#8E8E93` "Your password has been successfully changed." + "Sign in to your dashboard →" primary button full-width.

**Expired/invalid token state (page load with bad token):** icon/x-circle 64px `#FF3B30` + H2 "Link expired" + Body `#8E8E93` "This password reset link has expired or has already been used. Links are valid for 15 minutes." + "Request a new link →" primary button (links to `/forgot-password`).

### Interactions
- "Update Password" disabled until: new password ≥ 8 chars + both fields match
- Token validation happens on page load (not on submit): invalid token shows expired state immediately

---

## !Screen 25: API Reference — Section Active State

**Route:** `verify.solidus.network/docs/:section` (e.g., `/docs/credentials`)
**Mode:** Dark. Same 3-column layout as Screen 14.

This screen spec extends Screen 14 by showing the state when a different left-nav section is active. The layout, header, code panel, and left nav are all identical. Only the active nav item and center content area change.

**Left nav active state — "Credentials" section:**
- "Credentials" section header: text white (was `#8E8E93` when collapsed/inactive), left `3px border #0066FF`.
- Sub-items visible: "Issue Credential" (active, white + blue border) / "Verify Credential" / "Revoke Credential"
- All other sections: collapsed or greyed.

**Center content — "Issue Credential" endpoint:**
`POST /v2/credentials/issue` — Badge `#0066FF` "POST" + JetBrains Mono `#00D4FF` "/v2/credentials/issue"

H1 "Issue Verifiable Credential"
Body `#8E8E93`: "Issues a W3C Verifiable Credential to a subject's DID. Requires a completed verification session at the required level."

**Request Parameters table:**
- `session_id` | string | Required | "Completed verification session ID (vsn_...)"
- `subject_did` | string | Required | "The subject's DID (must match the verified session)"
- `credential_type` | string | Required | "Credential type: email_verified, phone_verified, kyc_l1, kyc_l2, kyc_l3"
- `expires_in` | integer | Optional | "Credential validity in days (default: 365)"
- `metadata` | object | Optional | "Custom key-value pairs attached to the credential"

**Responses tabs:** 201 Created / 400 Bad Request / 401 Unauthorized / 404 Session Not Found / 422 Session Not Complete

**Right code panel:** Shows the corresponding `POST /v2/credentials/issue` request + 201 response example with the full W3C VC JSON structure (context, type, issuer DID, issuanceDate, credentialSubject with kyc_level and verified_at, proof block).

### Section Nav States (show as overlay/annotation on the left nav)
- **Collapsed section** (e.g., "SDKs"): section label `#8E8E93`, chevron-right icon, no sub-items visible
- **Expanded section with active sub-item**: section label white, chevron-down, sub-items listed — active sub-item has `3px left border #0066FF` and white text, inactive sub-items are `#8E8E93`
- **Hover on sub-item**: background `#242438` 150ms

---


## !Screen 26: Workflow Builder

**Route:** `verify.solidus.network/workflows`

Full-screen no-code visual editor for KYC verification flows. Compliance officers define which checks run, in what order, and with what branching logic and fallbacks — without writing code. Each saved workflow can be assigned to an API integration and governs all verification sessions created through that key.

**Layout:** Full-screen 3-panel canvas. Replaces the standard Sidebar + content layout on this route. The application sidebar is hidden. Layout is: fixed top toolbar (56px) + below-toolbar horizontal 3-panel (fills `calc(100vh - 56px)`).

---

### Top Toolbar

Height 56px. `Fill: #1A1A2E`, `border-bottom: 1px #2A2A42`. Padding 0 20px. Horizontal Auto Layout, Space Between, Alignment Center.

**Left group:** Horizontal Auto Layout, spacing 0px, Alignment Center.
- Back link: icon/arrow-left 16px `#0066FF` + Caption 12/400 `#0066FF` "Workflows". Padding 8 12. Hover: `Fill: rgba(0,102,255,0.06)`, 6px radius. Links to `/workflows` list.
- Vertical divider: `1px #2A2A42`, 24px height, margin 0 8px.
- Workflow name field: inline text input, Body 16/600 white. Default value "New Workflow". No visible border at rest — dashed `1px #2A2A42` border on hover, solid `1px #0066FF` on focus. Input width grows with content (min 120px). 6px radius.
- Status pill: margin-left 10px. `border-radius: 9999px`, Caption 11/500, padding 3px 10px.
  - Draft: `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.25)`, text `#FF9500`: "Draft"
  - Published: `Fill: rgba(52,199,89,0.12)`, `border: 1px rgba(52,199,89,0.25)`, text `#34C759`: "Published"
- Unsaved dot: 6px circle `Fill: #FF9500`, margin-left 8px. Visible only when there are unsaved changes. Tooltip "Unsaved changes".

**Right group:** Horizontal Auto Layout, spacing 8px, Alignment Center.
- "Test Flow" — ghost button, 36px height, padding 0 16px, `border: 1px #2A2A42`, Body 14/500 white. icon/play 14px `#8E8E93` left. Hover: `Fill: #242438`.
- "Publish" — primary button, 36px height, padding 0 20px, `Fill: #0066FF`, Body 14/600 white. Hover: `Fill: #0052cc`. Disabled (grey) when workflow has unresolved config errors.
- Overflow — icon/more-horizontal 20px `#8E8E93`, 36×36px, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius. Dropdown on click: "Rename" / "Duplicate" / "Export JSON" / divider / "Delete Workflow" `#FF3B30`.

---

### Left Panel — Step Library (260px)

See `StepLibraryPanel` in `WorkflowCanvas` component spec (E2). Rendered here at full panel height (`calc(100vh - 56px)`).

---

### Center Panel — Canvas Area

See `CanvasArea` in `WorkflowCanvas` component spec (E2). Fills remaining width between Step Library and Step Config panels.

**Sample workflow rendered on canvas: "Standard KYC L2"**

Node positions (approximate, top-to-bottom vertical flow, horizontally centered in canvas):

1. `StartNode` "Session Created" — top center.
2. → `WorkflowStepNode` `KYCL2Check` "KYC Level 2" sub-label "passport + liveness" — below start, connected via arrow.
3. → `ConditionNode` "Check Result" — below KYC L2 step. Three outgoing branches:
   - **Pass branch (right side):** → `WorkflowStepNode` `IssueCredential` "Issue L2 Credential" → `WorkflowStepNode` `WebhookAction` "Notify: kyc.completed" → `EndNode` "End"
   - **Fail branch (left side):** → `WorkflowStepNode` `WebhookAction` "Notify: kyc.failed" → `EndNode` "End"
   - **Review branch (center, lower):** → `WorkflowStepNode` `KYCL3Check` "Escalate to KYC L3" sub-label "extended document review" → `ConditionNode` "L3 Result" → (Pass → IssueCredential → WebhookAction → EndNode) (Fail → WebhookAction → EndNode)

All arrows labeled per branch type. Selected node in sample render: `KYCL2Check` (showing config in right panel).

**Canvas empty state (new workflow):** Single `StartNode` centered. Ghost `WorkflowStepNode` outline with dashed border 3px `rgba(0,102,255,0.25)` below it, with icon/plus 16px `#8E8E93` center + Caption 12/400 `#8E8E93` "Drag a step here". Disappears when first step dropped.

---

### Right Panel — Step Config (280px)

See `StepConfigPanel` in `WorkflowCanvas` component spec (E2). Rendered at full panel height.

**Default render:** `KYCL2Check` is selected. Config panel shows:
- Header: "Step Configuration" + "KYCL2Check" sub-label.
- "Document Types Accepted" checkboxes: Passport ✓, Driver's License ✓, National ID ✓.
- "Liveness Required" toggle: on.
- "Min Confidence Threshold" slider: 75%.
- "Failure Handling" dropdown: "Route to Review Queue".
- "Cost per run": "$5.00" lime.
- Footer: "Delete Step" danger ghost button.

---

### Test Flow Modal

Triggered by "Test Flow" button. Overlay: `Fill: rgba(10,22,40,0.72)`, `backdrop-filter: blur(6px)`.

Modal: `#1A1A2E` bg, 12px radius, 480px wide, `box-shadow: 0 16px 48px rgba(0,0,0,0.56)`. Centered viewport.

Header: padding 24, Space Between. H3 "Test Flow" 18/600 white + X close icon. `border-bottom: 1px #242438`.

Body: padding 24. Vertical Auto Layout, spacing 16px.
- Caption 12/500 `#8E8E93` "TEST SUBJECT" uppercase.
- DID input: 44px height, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius. Placeholder JetBrains Mono 14/400 `#48484F` "did:solidus:mainnet:...". Prefilled with "did:solidus:mainnet:7a3b8c9d2e1f4a6b".
- "Run Test" primary button full-width 44px.

**Execution state (after Run):** DID input + button replaced by execution trace. Each step row: Horizontal, spacing 10px, Alignment Center. Left: 20px step icon (color = status). Center: step name Body 14/400 white. Right: JetBrains Mono 12/400 `#8E8E93` duration "142ms" / "—".

Step status animations:
- Waiting: icon/circle 20px `#48484F`.
- Running: icon/loader 20px `#0066FF` spinning (360° 0.6s linear infinite).
- Passed: icon/check-circle 20px `#34C759`, fade in 200ms.
- Failed: icon/x-circle 20px `#FF3B30`.

Final result banner below trace: `#34C759` or `#FF3B30` bg at 0.08 opacity, matching border at 0.25 opacity. Body 14/600 "Flow passed — Credential would be issued." or "Flow failed at KYC Level 2 — Routed to Review Queue."

---

### Workflow States

**Error state (publish blocked):** Red dot on step node with missing config. Top toolbar "Publish" button disabled, tooltip "Resolve 2 configuration errors before publishing". `ErrorTooltip` appears on hover over node: `Fill: rgba(255,59,48,0.08)`, `border: 1px rgba(255,59,48,0.25)`, padding 8 12, Caption 12/400 `#FF3B30` "Missing: Failure Handling".

**Published state:** Status pill "Published" green. Toolbar "Publish" becomes "Update" with same style. Nodes render with `opacity: 1`. A "Live traffic" caption in canvas bottom-left: Caption 11/400 `#34C759` `●` + " Receiving live sessions".

---

## !Screen 27: Case Management / Review Queue

**Route:** `verify.solidus.network/cases`

Manual review queue for verifications that exceeded uncertainty thresholds, triggered liveness failure fallbacks, or were manually flagged by integration partners. Analysts review evidence and issue binding decisions that govern credential issuance.

---

### Sidebar Navigation Update

"Cases" nav item inserted between "Analytics" and "Credentials". icon/inbox 20px. Label: "Cases" with `countBadge` component inline-right: `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.25)`, `border-radius: 9999px`, Caption 10/600 `#FF9500` "38". Active item: 3px left border `#0066FF`, label white, icon `#0066FF`. Inactive: label + icon `#8E8E93`.

---

### Top Bar

H2 "Cases" 28/600 white left.

Right: Horizontal Auto Layout, spacing 8px, Alignment Center.
- SLA risk pill (shown when any case exceeds 4h): `Fill: rgba(255,59,48,0.12)`, `border: 1px rgba(255,59,48,0.25)`, `border-radius: 9999px`. icon/alert-circle 12px `#FF3B30` + Caption 11/600 `#FF3B30` "6 at risk". Tooltip: "6 cases have exceeded 4h SLA threshold."
- "Export" ghost button — 36px height, `border: 1px #2A2A42`, icon/download 14px `#8E8E93` + Body 14/400 white "Export". Hover: `Fill: #242438`.
- "Assign All" dropdown button — 36px height, `Fill: #242438`, `border: 1px #2A2A42`, Body 14/400 white "Assign All" + chevron-down 14px right. Opens dropdown: "Assign to Me" / "Assign to Team Member..." (opens sub-menu with analyst avatars + names).

---

### Summary Strip

Three `KPICard` components. Equal width, gap 16px. `Fill: #1A1A2E`, 8px radius, padding 20 24.

1. "Pending Review" — value "38" H1 36/700 `#FF9500` — delta "−3 since yesterday" `#34C759` arrow-down (fewer pending = improved) — sparkline trending down.
2. "Resolved Today" — value "12" H1 36/700 `#34C759` — delta "+4 vs yesterday" `#34C759` arrow-up — sparkline trending up.
3. "Avg. Resolution Time" — value "1h 24m" H1 36/700 white — delta "−8m vs last week" `#34C759` — sparkline flat-declining.

---

### Filter Bar

`Fill: #1A1A2E`, 8px radius, padding 14 20, margin-bottom 16px. Horizontal Auto Layout, spacing 12px, Alignment Center.

- Search input (flex, max 300px): icon/search 16px `#48484F` left inside. Body 14/400 placeholder `#48484F` "Search DID, email, or reference…". Height 36px, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius. Focus: `border: 1px #0066FF`.
- "Status" dropdown: "All Statuses ▾". Options: All / Pending / In Review / Escalated / Approved / Rejected.
- "Assignee" dropdown: "All Assignees ▾". Options: All / Me / Unassigned / [list of team members with 24px avatars].
- "Age" dropdown: "All Ages ▾". Options: All / Waiting >1h / Waiting >4h / Waiting >24h.
- Right: active filter pills row (same pattern as Verifications List `ActiveFiltersRow`).

---

### Cases Table

Full-width `#1A1A2E` bg, 8px radius. Table header `#242438` bg, height 44px. Caption 12/500 `#8E8E93` uppercase, letter-spacing 0.04em. Data row height 56px, `border-bottom: 1px #242438`. Hover: `Fill: #242438`, 150ms.

Columns: Checkbox 20px | DID | Type | Risk Score | Reason Flagged | Assigned To | SLA | Age | Actions

**Checkbox:** Same spec as Verifications List.

**DID cell:** JetBrains Mono 13/400 white, max 180px truncated + "…" + copy icon 14px on row hover.

**Type cell:** Caption 12/500 `#8E8E93` — "KYC L2" / "KYC L3" / "KYC L1".

**Risk Score cell:** `RiskScoreBadge` component. Examples: "89 · High" `#FF3B30` / "67 · Medium" `#FF9500` / "42 · Medium" `#FF9500`.

**Reason Flagged cell:** Pill tag with icon. Height 24px, padding 0 10px, `border-radius: 9999px`, Caption 11/500.
- "Liveness Failed": icon/eye-off 12px `#FF3B30`, `Fill: rgba(255,59,48,0.12)`, `border: 1px rgba(255,59,48,0.25)`, text `#FF3B30`.
- "Document Mismatch": icon/file-x 12px `#FF9500`, amber style.
- "High Risk IP": icon/shield-alert 12px `#FF9500`, amber style.
- "Manual Flag": icon/flag 12px `#8E8E93`, `Fill: rgba(142,142,147,0.12)`, `border: 1px rgba(142,142,147,0.25)`, text `#8E8E93`.
- "Escalated from L2": icon/arrow-up-circle 12px `#0066FF`, blue style.

**Assigned To cell:** Horizontal Auto Layout, spacing 6px, Alignment Center. Avatar circle 24px `Fill: #242438`, initials Caption 10/500 white. Body 14/400 white name "Alex C." (truncated). Unassigned: italic Caption 14/400 `#48484F` "Unassigned".

**SLA cell:** Caption 12/400. Timer format "Xh Ym" counting up from when case was created. `#8E8E93` if ≤4h. `#FF3B30` + icon/alert-circle 12px left if >4h. Animation: counter increments every 60s.

**Age cell:** Caption 12/400 `#8E8E93` absolute age since case opened: "2h 14m" / "47m" / "6h 08m".

**Actions cell:** Horizontal Auto Layout, spacing 6px.
- "Review" button: 32px height, padding 0 12px, `border: 1px #2A2A42`, Body 13/500 white. Hover: `Fill: #242438`. Click: opens Case Detail Panel.
- icon/more-horizontal 20px `#8E8E93` (context menu: Assign to Me / Assign to... / Mark as Escalated / Close Without Decision).

**Sample rows (8 rows):**
1. did:solidus:mainnet:7a3b8c9d2e1f4a6b / KYC L2 / 89 · High / Liveness Failed / Alex C. / **2h 14m** / 2h 14m / [Review]
2. did:solidus:mainnet:4f2e1a8b3c7d9e0f / KYC L2 / 67 · Medium / Document Mismatch / Unassigned / 1h 03m / 1h 03m / [Review]
3. did:solidus:mainnet:2c9d4f1e8a7b3c6d / KYC L3 / 91 · High / Escalated from L2 / Sarah J. / **5h 22m** `#FF3B30` / 5h 22m / [Review]
4. did:solidus:mainnet:b8a3f6c2e9d1047e / KYC L2 / 42 · Medium / High Risk IP / Unassigned / 38m / 38m / [Review]
5. did:solidus:mainnet:3e7c9f2d1b8a4f0e / KYC L1 / 55 · Medium / Manual Flag / Alex C. / 52m / 52m / [Review]
6. did:solidus:mainnet:9f1a3d7b2c8e5f04 / KYC L2 / 78 · High / Liveness Failed / Unassigned / **4h 47m** `#FF3B30` / 4h 47m / [Review]
7. did:solidus:mainnet:5b2d8f4e1c9a3e7b / KYC L3 / 83 · High / Document Mismatch / Sarah J. / 1h 19m / 1h 19m / [Review]
8. did:solidus:mainnet:0e4f9c7a3b1d8e2f / KYC L2 / 34 · Medium / High Risk IP / Unassigned / 27m / 27m / [Review]

Pagination: Caption 12/400 `#8E8E93` "Showing 1–8 of 38" left. Previous (disabled) + page pills + Next right.

---

### Case Detail Panel

480px slide-in panel from right edge. Does not replace content — overlays on top of main content with a left-side shadow. Overlay: `Fill: rgba(0,0,0,0.32)` covering main content area (not sidebar). Opens 250ms ease-out: `translateX(480px→0)`. Closes 200ms ease-in.

**Panel container:** `Fill: #1A1A2E`, `border-left: 1px #2A2A42`, `box-shadow: -8px 0 32px rgba(0,0,0,0.40)`. Full height. Vertical Auto Layout, spacing 0. Overflow-y auto.

**Panel header:** padding 20 24, `border-bottom: 1px #2A2A42`. Horizontal Auto Layout, Space Between, Alignment flex-start.
- Left: Vertical Auto Layout, spacing 4px.
  - H3 "Case Review" 16/600 white.
  - JetBrains Mono 12/400 `#8E8E93` "did:solidus:mainnet:7a3b8c9d2e1f4a6b".
- Right: icon/x 20px `#8E8E93`, padding 4px, 4px radius. Hover: `#FFFFFF`. Click: closes panel.

**Risk summary bar:** padding 12 24. `Fill: #242438`, `border-radius: 8px`, margin 16 24 0. Horizontal Auto Layout, Space Between, Alignment Center.
- Left: Horizontal Auto Layout, spacing 12px, Alignment flex-start.
  - `RiskScoreBadge` large variant: "89 · High".
  - Vertical Auto Layout, spacing 3px. Caption 11/500 `#8E8E93` uppercase "RISK FACTORS" + risk factor tags row gap 6px: pill Caption 10/500 each — "Liveness 34%" `#FF3B30` + "IP blacklist match" `#FF9500` + "2 prior fails" `#FF9500`.
- Right: Vertical Auto Layout, spacing 2px, Alignment flex-end. Caption 11/400 `#48484F` "Waiting". Caption 12/600 `#FF9500` "2h 14m". Caption 10/400 `#48484F` "(SLA: 4h)".

**Original verification summary:** padding 16 24, `border-bottom: 1px #242438`. H3 "Verification Summary" 14/600 white + margin-bottom 12px. 2-column grid, gap 8px 16px. Each field: Caption 12/500 `#8E8E93` label + Body 14/400 white value.
- Document Type: "Passport (US)"
- Liveness Score: "34%" `#FF3B30`
- Document Confidence: "92.1%" `#34C759`
- Face Similarity: "34%" `#FF3B30`
- Session Started: "2026-03-17 14:32:08 UTC"
- KYC Level: "L2"

**Why flagged callout card:** padding 16 24, margin-top 0. `Fill: rgba(255,149,0,0.06)`, `border: 1px rgba(255,149,0,0.20)`, 8px radius, margin 0 24.
- Header: icon/alert-triangle 16px `#FF9500` + Body 14/600 `#FF9500` "Why Flagged". Horizontal, spacing 8px.
- Body 13/400 `#8E8E93` margin-top 8px: "Liveness check failed: face similarity score 34% (required threshold: 75%). Session auto-routed for manual review."
- Caption 11/400 `#48484F` margin-top 6px: "Possible causes: low-quality selfie, glasses, glare, or fraudulent attempt (photo/video replay)."

**Analyst Decision section:** padding 16 24. H3 "Decision" 14/600 white + margin-bottom 12px.

Four radio cards, Vertical Auto Layout, spacing 8px. Each `DecisionCard` — Horizontal Auto Layout, spacing 12px, padding 12 16, `Fill: #242438`, `border: 1px #2A2A42`, 8px radius. Alignment flex-start.
- Icon 20×20px
- Vertical content: Body 14/600 white action label + Caption 12/400 `#8E8E93` consequence text.
- Radio circle 18px right-aligned top.

Cards:
1. `ApproveCard` — icon/check-circle 20px `#34C759`. "Approve" / "Verification passes. Credential will be issued." Selected: `border: 1px #34C759`, `Fill: rgba(52,199,89,0.06)`.
2. `RejectCard` — icon/x-circle 20px `#FF3B30`. "Reject" / "Verification fails. No credential will be issued. User may retry with improved document." Selected: `border: 1px #FF3B30`, `Fill: rgba(255,59,48,0.06)`.
3. `EscalateCard` — icon/arrow-up-circle 20px `#FF9500`. "Escalate" / "Send to senior analyst for secondary review." Selected: `border: 1px #FF9500`, `Fill: rgba(255,149,0,0.06)`.
4. `RequestMoreInfoCard` — icon/message-circle 20px `#0066FF`. "Request More Info" / "Prompt user to resubmit with better conditions." Selected: `border: 1px #0066FF`, `Fill: rgba(0,102,255,0.06)`.

Reason input: margin-top 12px. Caption 12/500 `#8E8E93` label "Decision Notes" + asterisk `#FF3B30` (required). Textarea 80px height, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius, Body 14/400, placeholder `#48484F` "Add decision notes for audit trail...". Focus: `border: 1px #0066FF`. Character count Caption 11/400 `#48484F` right-aligned below: "0 / 500".

"Submit Decision" button: margin-top 16px, full-width 44px height, `Fill: #0066FF`, Body 14/600 white. Disabled state (until decision selected AND notes filled): `Fill: #242438`, `border: 1px #2A2A42`, text `#48484F`, cursor not-allowed.

---

### Case Detail States

**"In Review" state:** When analyst opens panel, case row in table updates: "In Review" badge replaces "Pending" in status. Panel header shows below DID: Horizontal row — avatar 20px + Caption 12/400 `#8E8E93` "In review by Alex C." If another analyst opens the same case: banner in panel top — `Fill: rgba(255,149,0,0.08)`, `border: 1px rgba(255,149,0,0.25)`, Caption 12/400 `#FF9500` "Sarah J. is also reviewing this case."

**Post-submit state:** Panel closes 200ms. Table row transitions: status badge → "Approved" `#34C759` / "Rejected" `#FF3B30` / "Escalated" `#FF9500`. Row fades `opacity 1→0.4→removed` 400ms then list re-orders. "Pending Review" KPI card count decrements animated 300ms. Toast notification bottom-right: `Fill: #242438`, `border-left: 4px solid #34C759`, padding 12 16, Body 14/500 white "Decision submitted" + Caption 12/400 `#8E8E93` "Case vsn_9f8e7d6c approved." Auto-dismiss 4s, slide-out right.

---

## !Screen 28: Supported Documents Config

**Route:** `verify.solidus.network/settings/documents`

Document acceptance policy editor. Determines which document types from which countries are accepted as valid identity evidence during KYC verification sessions. Changes are instantaneous and apply to all new sessions.

---

### Settings Secondary Navigation Update

"Documents" nav item added to the Settings section left sub-nav. Inserted after "Compliance". Caption 13/400. Active: `#0066FF`. Inactive: `#8E8E93`. Hover: `#FFFFFF`.

---

### Top Bar

H2 "Accepted Documents" 28/600 white left.
Right: "Save Changes" primary button 36px `Fill: #0066FF` — disabled at rest (enabled when unsaved changes exist). "Export Config" ghost button icon/download 14px.

---

### Intro Card

Full-width. `Fill: #1A1A2E`, 8px radius, padding 20 24, margin-bottom 16px. Horizontal Auto Layout, spacing 16px, Alignment flex-start.

Left: icon/file-check 32px `#0066FF`.

Right: Vertical Auto Layout, spacing 6px.
- H3 "Document Acceptance Policy" 16/600 white.
- Body 14/400 `#8E8E93` "Configure which document types and countries are accepted for KYC verification sessions. Changes take effect immediately — no redeployment required."
- Horizontal row, spacing 16px: icon/zap 12px `#A8E600` + Caption 12/400 `#8E8E93` "Changes apply immediately" + separator `·` `#48484F` + icon/shield 12px `#A8E600` + Caption 12/400 `#8E8E93` "847 document types currently active".

---

### Stats Strip

Three `KPICard` mini variant (40px height, padding 12 20, inline). Horizontal Auto Layout, gap 16px, margin-bottom 16px.

1. "Total Accepted Document Types" — "847" H1 36/700 white — delta "+12 this month" `#34C759`.
2. "Countries Covered" — "183" H1 36/700 white — delta "+2 this month" `#34C759`.
3. "Blocked Document Types" — "24" H1 36/700 `#FF3B30` — delta "+1 this week" `#FF9500` (amber because additions to blocked = more restrictive, not necessarily bad).

---

### Filter Bar

`Fill: #1A1A2E`, 8px radius, padding 14 20, margin-bottom 16px. Horizontal Auto Layout, spacing 12px, Alignment Center.

- Search (flex, max 280px): icon/search 14px `#48484F` inline. Placeholder "Search by country or document type…". Height 36px.
- "Region" dropdown: "All Regions ▾". Options: All / Europe / Americas / APAC / Africa / Middle East.
- "Status" dropdown: "All Statuses ▾". Options: All Accepted / Blocked / Partially Accepted.
- Right: "Add Country Override" primary button 36px, `Fill: #0066FF`, icon/plus 14px + Body 14/600 white "Add Override".

---

### Document Matrix Table

Full-width `Fill: #1A1A2E`, 8px radius. Overflow-x auto (for smaller viewports).

**Table header row:** `Fill: #242438`, height 44px, padding 0 20px. Caption 12/500 `#8E8E93` uppercase, letter-spacing 0.04em.

Columns: Checkbox 20px | Country (220px) | Passport (100px) | National ID (110px) | Driver's License (130px) | Residence Permit (140px) | Bank Statement (130px) | Status (120px)

**Cell icons:**
- Accepted: icon/check-circle 16px `#34C759`
- Blocked: icon/x-circle 16px `#FF3B30`
- Partial: icon/circle 16px `#FF9500` (half-filled visual — Lucide `circle` with adjusted fill, or use a custom half-circle icon)
- No data / N/A: `—` Caption 14/400 `#48484F` centered

**Country cell:** Horizontal Auto Layout, spacing 8px, Alignment Center. Flag emoji 20px + Vertical Auto Layout spacing 1px: Body 14/500 white country name + Caption 12/400 `#8E8E93` ISO-2 code.

**Status cell:** `StatusBadge` per country:
- "Accepted": `Fill: rgba(52,199,89,0.12)`, `border: 1px rgba(52,199,89,0.25)`, Caption 12/500 `#34C759`.
- "Blocked": `Fill: rgba(255,59,48,0.12)`, `border: 1px rgba(255,59,48,0.25)`, Caption 12/500 `#FF3B30`.
- "Partial": `Fill: rgba(255,149,0,0.12)`, `border: 1px rgba(255,149,0,0.25)`, Caption 12/500 `#FF9500`.

**Row height:** 52px. `border-bottom: 1px #242438`. Hover: `Fill: #242438`, 150ms. Cursor: pointer.

**Row click — accordion expand:**
Expanded row height grows to show variant-level detail. Below the flag row, inset 32px left, shows a sub-table. `Fill: rgba(10,22,40,0.40)`, `border-top: 1px #2A2A42`. Sub-rows 36px height: Caption 12/400 `#8E8E93` variant name left + icon 14px status right. Example for 🇺🇸 US expanded:
- "US Passport Book": icon/check-circle 14px `#34C759`
- "US Passport Card": icon/check-circle 14px `#34C759`
- "US Driver's License (all 50 states)": icon/check-circle 14px `#34C759`
- "US Green Card": icon/check-circle 14px `#34C759`
- "US Military ID": icon/circle 14px `#FF9500` (partial — accepted for L1 only)

Expand/collapse animation: `max-height: 0→auto` 200ms ease.

**Sample data rows (10 rows):**
1. 🇺🇸 US — ✓ Passport / ✓ National ID / ✓ Driver's License / — / — / Accepted
2. 🇩🇪 DE — ✓ Passport / ✓ Personalausweis (National ID) / ✓ Führerschein / ✓ Residence Permit / — / Accepted
3. 🇬🇧 GB — ✓ Passport / — / ✓ Driver's License / ✓ BRP (Residence) / — / Accepted
4. 🇸🇬 SG — ✓ Passport / ✓ NRIC (National ID) / — / — / — / Accepted
5. 🇫🇷 FR — ✓ Passport / ✓ Carte Nationale d'Identité / ✓ Permis de Conduire / — / — / Accepted
6. 🇯🇵 JP — ✓ Passport / ✓ My Number Card / ✓ Driver's License / — / — / Accepted
7. 🇧🇷 BR — ✓ Passport / ✓ RG (National ID) / ✓ CNH (Driver's License) / — / — / Partial
8. 🇨🇳 CN — ✓ Passport / ✓ Resident ID / — / — / — / Partial
9. 🇰🇵 DPRK — ✗ / ✗ / ✗ / ✗ / ✗ / Blocked
10. 🇮🇷 IR — ✗ / ✗ / ✗ / ✗ / ✗ / Blocked

**Bulk action bar** (shown when 1+ rows checkbox-selected, appears above table): `Fill: rgba(0,102,255,0.08)`, `border: 1px rgba(0,102,255,0.20)`, 8px radius, padding 12 20, margin-bottom 8px. Horizontal, Space Between. "3 countries selected" Small 14/500 white left. Right: "Accept All Document Types" ghost green + "Block Country" ghost danger `#FF3B30` + "Deselect" Caption `#0066FF`.

---

### Add Country Override Modal

Overlay + modal pattern (same as `NewVerificationModal` spec — 520px wide, `Fill: #1A1A2E`, 12px radius). Triggered by "Add Override" button.

Header: H3 "Add Country Override" + X close. `border-bottom: 1px #242438`.

Body: padding 24.
- Country search: 44px input, icon/search left, `Fill: #242438` `border: 1px #2A2A42` 6px radius. Placeholder "Search country…". Results dropdown: country rows with flag + name + code.
- "Document Types" label Caption 12/500 `#8E8E93`. 2-column checkbox grid: Passport / National ID / Driver's License / Residence Permit / Bank Statement / Military ID. Each row: 16px checkbox + Body 14/400 white label.
- "Policy" toggle row: Horizontal, Space Between. Body 14/500 white "Accept selected types" left. Toggle right (on = accept, off = block). `Fill: #0066FF` on / `Fill: #2A2A42` off.

Footer: "Cancel" ghost + "Save Override" primary. `border-top: 1px #242438`, padding 16 24.

---

## !Screen 29: Allow / Deny Lists

**Route:** `verify.solidus.network/lists`

Explicit allow and deny lists for DIDs and email addresses. Allow list entries skip verification and receive credentials directly (for known-trusted users or enterprise accounts). Deny list entries are blocked from initiating sessions entirely. Custom lists can be created and referenced in Workflow Builder conditions.

---

### Sidebar Navigation Update

"Lists" nav item added under "Cases". icon/list-filter 20px. Label: "Lists". No count badge at rest. Active/inactive/hover states identical to other nav items.

---

### Top Bar

H2 "Lists" 28/600 white left.
Right: "Create List" primary button 36px, `Fill: #0066FF`, icon/plus 14px + Body 14/600 white "Create List".

---

### Summary Strip

Three `KPICard` mini. Horizontal Auto Layout, gap 16px, margin-bottom 16px.

1. "Allow List" — "142 entries" H1 36/700 `#34C759` — icon/check-circle 20px `#34C759` — sparkline.
2. "Deny List" — "38 entries" H1 36/700 `#FF3B30` — icon/x-circle 20px `#FF3B30` — sparkline.
3. "Custom Lists" — "5 lists" H1 36/700 white — icon/layers 20px `#8E8E93` — sparkline.

---

### Tab Navigation

`TabRow` — Horizontal Auto Layout, spacing 0. `border-bottom: 1px #2A2A42`. margin-bottom 16px.

Three `TabItem` components. Each: padding 0 20px, height 44px, Alignment Center. Body 14/500. Active: `border-bottom: 2px solid #0066FF`, text white. Inactive: `border-bottom: 2px solid transparent`, text `#8E8E93`. Hover: text white, 150ms.

Tabs: "Allow List" (default active) | "Deny List" | "Custom Lists"

---

### Allow List Tab

**Description card:** `Fill: rgba(52,199,89,0.06)`, `border: 1px rgba(52,199,89,0.20)`, 8px radius, padding 12 16, margin-bottom 16px. Horizontal Auto Layout, spacing 10px, Alignment flex-start. icon/check-circle 16px `#34C759` + Caption 12/400 `#34C759` "Users on the Allow List bypass verification and receive credentials directly. Use for trusted enterprise accounts or internal users." (max-width fills available space).

**Add entry bar:** `Fill: #1A1A2E`, 8px radius, padding 14 20, margin-bottom 16px. Horizontal Auto Layout, spacing 12px, Alignment Center.
- DID input (flex-grow): 36px height, `Fill: #242438`, `border: 1px #2A2A42`, 6px radius. Placeholder JetBrains Mono 14/400 `#48484F` "did:solidus:mainnet:… or email@example.com". Focus: `border: 1px #0066FF`.
- "Label (optional)" input (200px): same style. Placeholder `#48484F` "e.g. Enterprise Customer".
- "Add to Allow List" primary button 36px, `Fill: #0066FF`, Body 14/600 white. Disabled until DID input non-empty.

**Allow List entries table:** Full-width `Fill: #1A1A2E`, 8px radius.
Header row `Fill: #242438` 44px. Caption 12/500 `#8E8E93` uppercase.

Columns: Checkbox 20px | DID / Email (flex, max 300px) | Label (180px) | Added By (160px) | Date Added (160px) | Actions (80px)

Row height 48px, `border-bottom: 1px #242438`. Hover `Fill: #242438`, 150ms.

DID cell: JetBrains Mono 13/400 white truncated + copy icon on hover.
Label cell: Body 14/400 `#8E8E93`. Empty: `—` `#48484F`.
Added By: avatar 24px + Body 14/400 white name.
Date Added: Caption 12/400 `#8E8E93` JetBrains Mono "2026-03-10".
Actions: icon/trash-2 16px `#8E8E93`. Hover: `#FF3B30`. Confirm-on-click: row highlights `Fill: rgba(255,59,48,0.08)` + "Remove?" + "Yes" / "No" inline 150ms.

**Sample Allow List entries (5 rows):**
1. did:solidus:mainnet:7a3b8c9d2e1f4a6b / "Enterprise — Acme Corp" / Alex Chen / 2026-03-10
2. did:solidus:mainnet:e2f3a4b5c6d78901 / "VIP User" / Sarah J. / 2026-03-12
3. did:solidus:mainnet:f1e2d3c4b5a69807 / "Partner API — exchange.io" / Alex Chen / 2026-03-01
4. kyc@partner.finance / "KYC Partner Bypass" / Alex Chen / 2026-02-28
5. did:solidus:mainnet:1a2b3c4d5e6f7890 / — / Sarah J. / 2026-03-15

Pagination: Caption 12/400 `#8E8E93` "Showing 1–5 of 142" left.

---

### Deny List Tab

**Description card:** `Fill: rgba(255,59,48,0.06)`, `border: 1px rgba(255,59,48,0.20)`, 8px radius, padding 12 16, margin-bottom 16px. icon/x-circle 16px `#FF3B30` + Caption 12/400 `#FF3B30` "Users on the Deny List are permanently blocked from initiating verification sessions. All attempts are rejected with code 403."

**Add entry bar:** Same layout as Allow List add bar. Placeholder updated accordingly. "Add to Deny List" button `Fill: #FF3B30`, hover `Fill: #d42b21`.

**Deny List entries table:** Identical structure to Allow List table. "Reason" column replaces "Label" column. Row-level difference: "Remove" action uses red icon/trash-2 `#FF3B30` by default (not just on hover).

**Sample Deny List entries (5 rows):**
1. did:solidus:mainnet:bad0f1a2c3d4e5b6 / "Fraudulent document attempt" / Alex Chen / 2026-03-16
2. did:solidus:mainnet:c7d8e9f0a1b2c304 / "Identity theft report" / System (auto-flagged) / 2026-03-14
3. fraud@disposable.net / "Confirmed fraud ring" / Alex Chen / 2026-03-11
4. did:solidus:mainnet:deadbeef1234abcd / "OFAC match" / System (auto-flagged) / 2026-03-08
5. did:solidus:mainnet:0bad1cafe2dead3b / "Repeated liveness spoofing" / Sarah J. / 2026-03-05

**"System (auto-flagged)"** Added By cell: no avatar. Caption 12/400 `#8E8E93` italic "System".

---

### Custom Lists Tab

**Header area:** Body 14/400 `#8E8E93` "Custom lists can be referenced as conditions in the Workflow Builder. Use them to route specific DIDs through different verification paths." margin-bottom 16px.

`ListCard` grid — 2-column grid, gap 16px.

`ListCard` — `Fill: #1A1A2E`, 8px radius, `border: 1px #2A2A42`, padding 20. Vertical Auto Layout, spacing 12px. Hover: `border: 1px rgba(0,102,255,0.40)`, `Fill: rgba(0,102,255,0.04)`, 150ms.

**ListCard anatomy:**
- Header row: Horizontal, Space Between, Alignment Center.
  - Left: H3 list name 16/600 white + count badge `Fill: #242438` Caption 11/500 `#8E8E93` "12 entries" inline 8px gap.
  - Right: icon/more-horizontal 20px `#48484F` (hover: `#FFFFFF`). Dropdown: "Edit Name" / "Export" / "Duplicate" / divider / "Delete List" `#FF3B30`.
- Description: Caption 12/400 `#8E8E93`. e.g. "High-value enterprise accounts — expedited onboarding path."
- Type badge: `border-radius: 9999px`, Caption 11/500, padding 2 8.
  - Allow type: `Fill: rgba(52,199,89,0.12)`, `border: 1px rgba(52,199,89,0.25)`, `#34C759` "Allow"
  - Deny type: `Fill: rgba(255,59,48,0.12)`, `border: 1px rgba(255,59,48,0.25)`, `#FF3B30` "Deny"
  - Route type: `Fill: rgba(0,102,255,0.12)`, `border: 1px rgba(0,102,255,0.25)`, `#0066FF` "Route"
- Usage row: icon/git-branch 12px `#48484F` + Caption 12/400 `#48484F` "Used in 2 workflows". If unused: Caption `#48484F` "Not used in any workflow".
- Footer: Horizontal, Space Between. Caption 12/400 `#48484F` "Updated 2026-03-12" + Caption 12/500 `#0066FF` "View Entries →" underline on hover.

**Sample custom lists (5 cards across 3 rows of 2-column grid):**
1. "Enterprise Accounts" — 47 entries — Allow — "Used in 3 workflows" — "Verified enterprise customers for expedited KYC path"
2. "High-Risk Jurisdictions" — 12 entries — Deny — "Used in 1 workflow" — "DIDs associated with high-risk geographies"
3. "Beta Testers" — 31 entries — Route — "Used in 2 workflows" — "Internal QA and integration partners"
4. "Sanctioned Entities" — 8 entries — Deny — "Used in 2 workflows" — "OFAC / EU sanctions cross-reference list"
5. "VIP Fast-Track" — 19 entries — Allow — "Used in 1 workflow" — "Whitelist for pre-verified enterprise onboarding"

---

### Create List Modal

Overlay pattern (same as New Verification Modal). 480px wide.

Header: H3 "Create Custom List" + X close. `border-bottom: 1px #242438`.

Body: padding 24. Vertical Auto Layout, spacing 16px.
- "List Name" field: Input 44px, placeholder "e.g. Trusted Partners".
- "Description (optional)" field: Input 44px, placeholder "What is this list used for?".
- "List Type" label Caption 12/500 `#8E8E93` + 3 type cards (Horizontal Auto Layout, gap 8px). Each `TypeCard` 100% flex, padding 12, `Fill: #242438`, `border: 1px #2A2A42`, 8px radius. icon 16px + type name Body 14/600 + caption Caption 11/400 `#8E8E93`. Selected state matches tab-specific color border and fill.
  - Allow: icon/check-circle `#34C759` + "Allow List" + "Users skip verification"
  - Deny: icon/x-circle `#FF3B30` + "Deny List" + "Users are blocked"
  - Route: icon/git-branch `#0066FF` + "Route List" + "Used in workflow conditions"

Footer: `border-top: 1px #242438`, padding 16 24. "Cancel" ghost + "Create List" primary. Primary disabled until name filled and type selected.

---

## !Universal Edge States (applicable to all app screens)

### Rate Limit Warning
Full-width amber banner when API usage exceeds 80% of plan quota: icon/alert-triangle `#FF9500` + Body "You've used 88% of your monthly quota. " + "Upgrade →" link `#0066FF` + dismiss X right.

### Maintenance Mode
Full-screen overlay (not blur): `#0A1628` bg. Center: icon/tool 48px `#FF9500` + H2 white "Scheduled maintenance" + Body `#8E8E93` "verify.solidus.network is undergoing maintenance. Back online in approximately 45 minutes." + link to status.solidus.network.

### Session Expired
Modal (no dismiss): H3 "Session expired" + Body "Your session has expired for security reasons." + "Sign In Again" primary full-width.

### 404 / Not Found
Centered full-page: Large "404" Display 96/700 `#242438` + H2 white "Page not found" + Body `#8E8E93` "The page you're looking for doesn't exist or has been moved." + "Back to Dashboard" primary + "Go to Homepage" ghost.

### Network Error (connection lost)
Toast bottom-right: icon/wifi-off 16px `#FF9500` + Body 14/400 white "Connection lost" + Caption `#8E8E93` "Reconnecting..." + spinner 12px. Resolves to "Reconnected ✓" toast (green) on recovery.

---


## !Marketing Screen: Reusable Credential

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

## !Marketing Screen: Changelog

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

## !Marketing Screen: Supported Documents

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

## !Marketing Screen: Case Studies

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

## !Marketing Screen: Compliance / Regulatory Atlas

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

## !Marketing Screen: Integrations

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

## !Marketing Screen: Partners

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

## !Marketing Screen: Compare

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

---

## !Sample Data Reference (use across all screens)

**DIDs:**
- `did:solidus:mainnet:7a3b8c9d2e1f4a6b` (primary sample DID)
- `did:solidus:mainnet:4f2e1a8b3c7d9e0f`
- `did:solidus:mainnet:2c9d4f1e8a7b3c6d`
- `did:solidus:mainnet:b8a3f6c2e9d1047e`

**Session IDs (JetBrains Mono throughout):**
- `vsn_9f8e7d6c5b4a3291`
- `vsn_3a1b2c4d5e6f7890`
- `vsn_f2e8d1c4b7a93561`

**API Keys:**
- `sk_live_••••••••••••••••••••34ab` (production, always masked)
- `sk_test_••••••••••••••••••••789f` (test)

**Event IDs:**
- `evt_1a2b3c4d5e6f7890`
- `evt_9f8e7d6c5b4a3291`

**Block numbers:** `#4,817,293` / `#4,817,180` / `#4,816,924`

**Tx hashes (JetBrains Mono):**
- `0x4f2e1a8b3c7d9e0fab2c3d4e5f678901`
- `0x7a3b8c9d2e1f4a6bcd3e4f5a6b7c8d9e`

**Dates and timestamps:** All 2026. Format for timestamps: `2026-03-17 14:32:08 UTC`. Format for dates: `2026-03-17`.

**Org name:** "Acme Corp" | **User:** "Alex Chen" (alex@acmecorp.com) | **Validator IDs:** `val-0x7a3b...` / `val-0x4f2e...` / `val-0x2c9d...`
