# Dashboard Additions — New Shared Components & Screens

Additions to `prototype-web.md` for verify.solidus.network. Add new shared components E1–E6 to the Shared Components section. Add Screens 26–29 after the existing screen list.

---

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

## Screen 26: Workflow Builder

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

## Screen 27: Case Management / Review Queue

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

## Screen 28: Supported Documents Config

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

## Screen 29: Allow / Deny Lists

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
