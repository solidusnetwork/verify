<!-- ============================================================
REFERENCE DOCUMENTS — embedded for self-contained prototyping
Source files: DESIGN_SYSTEM_REFERENCE.md, VISUAL_EFFECTS_REFERENCE.md,
INTERACTION_PATTERNS_REFERENCE.md, design-language.md, screens.md, web-pages.md
============================================================ -->

# Ref: Global Design System

# Solidus Network — Figma Make Design System Reference

All Figma Make prompts in this repository reference this document for shared values. Use these exact values — do not invent alternates.

---

## Brand Identity

**Name:** Solidus Network
**Tagline:** The Last Authentication System
**Aesthetic:** Modern fintech — trust, clarity, technical precision
**Font stack:** Inter Variable (UI), JetBrains Mono (code, addresses, hashes, numbers)

---

## Logo Usage

Three logo assets. Use the correct one based on background. Never substitute.

| Asset | File | Use when |
|-------|------|----------|
| Full wordmark — white | `solidus_dark.png` | Dark backgrounds (`#0A1628`, `#1A1A2E`, `#242438`, any dark surface) |
| Full wordmark — dark | `solidus_light.png` | Light backgrounds (`#FFFFFF`, `#F2F2F7`, any light surface) |
| Icon mark (S only) | `solidus_icon.png` | Mobile app headers, favicons, collapsed sidebars, avatar fallback, any space < 120px wide |

### Rules

- **NavBar on dark products** (`#0A1628`/`#1A1A2E` bg): use `solidus_dark.png` (white wordmark)
- **NavBar on light products** (marketing, light mode): use `solidus_light.png` (dark wordmark)
- **NavBar in dark-mode toggle state** (products switching to dark): use `solidus_dark.png`
- **NavBar in light-mode toggle state** (products switching to light): use `solidus_light.png`
- **Mobile app top bar**: use `solidus_icon.png` — the full wordmark is too wide for a 375px header
- **Desktop sidebar** (collapsed to 64px icon-only mode): use `solidus_icon.png`
- **Favicon / PWA icon**: use `solidus_icon.png`
- **Email headers / notifications**: use `solidus_light.png` (email backgrounds are typically white)
- Never resize the icon below 24px. Never resize the wordmark below 80px width.
- Logo files live at: `brand/solidus_dark.png`, `brand/solidus_light.png`, `brand/solidus_icon.png`

---

## Color Tokens

### Dark Mode (default for all product UIs)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0A1628` | Page background |
| `surface` | `#1A1A2E` | Cards, panels, sidebar |
| `elevated` | `#242438` | Nested cards, table headers, input fills |
| `border` | `#2A2A42` | Dividers, input borders, table row dividers |
| `text-primary` | `#FFFFFF` | Headings, primary labels |
| `text-secondary` | `#8E8E93` | Secondary labels, captions, timestamps |
| `text-disabled` | `#48484F` | Disabled states |

### Light Mode (marketing pages only)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#FFFFFF` | Page background |
| `surface` | `#F2F2F7` | Section alternation, card backgrounds |
| `elevated` | `#FFFFFF` | Cards on light gray sections |
| `border` | `#E0E0E5` | Dividers, input borders |
| `text-primary` | `#0A1628` | Headings |
| `text-secondary` | `#666666` | Body text, captions |

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `lime` | `#A8E600` | Gradient start, positive indicators |
| `cyan` | `#00D4FF` | Gradient mid, link highlights |
| `deep-blue` | `#003366` | Gradient end, dark accents |
| `cta` | `#0066FF` | Primary buttons, links, active states |
| `success` | `#34C759` | Verified status, positive values |
| `warning` | `#FF9500` | Pending status, warnings |
| `error` | `#FF3B30` | Failed status, destructive actions |
| `bitcoin` | `#F7931A` | Bitcoin-specific elements |
| `ethereum` | `#627EEA` | Ethereum-specific elements |
| `usdc` | `#2775CA` | USDC-specific elements |

### Brand Gradient

```
linear-gradient(135deg, #A8E600 0%, #00D4FF 50%, #003366 100%)
```

**Usage rules:**
- Full gradient: hero backgrounds, major CTAs, onboarding screens
- Lime-only accent (`#A8E600`): positive data, success animations
- Cyan-only accent (`#00D4FF`): interactive highlights, focus rings
- Gradient as text: reserved for display-size headings only
- Gradient border: 2px top/left accent on featured cards
- Gradient at opacity: `rgba` overlays at 8-15% for background tinting
- **Never** use the full gradient on body text, icons, or interactive form elements

---

## Typography

Font: **Inter Variable** — load all weights 300–700
Mono: **JetBrains Mono** — addresses, hashes, code, numeric data

| Scale | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 48px | 700 | 56px | Hero numbers, empty state primary text |
| H1 | 36px | 700 | 44px | Page titles |
| H2 | 28px | 600 | 36px | Section headings |
| H3 | 22px | 600 | 30px | Card titles, subsection headings |
| Body | 16px | 400 | 24px | Paragraph text, form labels |
| Small | 14px | 400 | 20px | Secondary labels, metadata |
| Caption | 12px | 500 | 16px | Table headers, badge text, timestamps |
| Mono-body | 14px JetBrains Mono | 400 | 20px | Addresses, hashes, API keys |
| Mono-caption | 12px JetBrains Mono | 400 | 16px | Truncated DIDs, tx hashes |

---

## Spacing Scale

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon-label gap, tight element pairs |
| `space-2` | 8px | Internal card gap, list item padding |
| `space-3` | 12px | List row vertical padding |
| `space-4` | 16px | Card padding (mobile), input height padding |
| `space-5` | 20px | Card padding (standard) |
| `space-6` | 24px | Card padding (spacious), section gap (mobile) |
| `space-8` | 32px | Section gap (desktop) |
| `space-12` | 48px | Large section breaks |
| `space-16` | 64px | Page-level section breaks |
| `space-20` | 80px | Hero vertical padding |
| `space-24` | 96px | Marketing section padding |

---

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 2px 8px rgba(0,0,0,0.32)` | Default card elevation on dark bg |
| `shadow-elevated` | `0 8px 24px rgba(0,0,0,0.48)` | Modals, dropdowns, popovers |
| `shadow-brand` | `0 0 24px rgba(0,212,255,0.15)` | Brand-accented elements, featured cards |
| `shadow-inset` | `inset 0 1px 3px rgba(0,0,0,0.4)` | Input fields, pressed states |
| `shadow-light-card` | `0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)` | Cards on light mode backgrounds |

**No heavy borders** — use shadow depth instead of thick border lines for card elevation.

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Input fields, small chips, inline badges |
| `radius-md` | 6px | Buttons, small cards |
| `radius-lg` | 8px | Standard cards, panels, modals |
| `radius-xl` | 12px | Large modal overlays, QR frames |
| `radius-full` | 9999px | Pill badges, avatar circles, toggle switches |

---

## Grid Specs

### Desktop (1440px)
- Container max-width: 1200px
- Horizontal padding: 120px each side (at 1440px)
- Columns: 12
- Gutter: 24px
- Sidebar layouts: sidebar 240px fixed + fluid main content

### Tablet (768px)
- Container: full-width with 32px horizontal padding
- Columns: 8
- Gutter: 16px

### Mobile (375px)
- Container: full-width with 16px horizontal padding
- Columns: 4
- Gutter: 12px
- Bottom safe area: 34px (iPhone home indicator)
- Top safe area: 44px (status bar)
- Bottom tab bar height: 56px + 34px safe area = 90px total reserved

---

## Component Patterns

### Status Badge (reusable component, 4 variants)
```
success:  background #34C759/15%, text #34C759, border 1px #34C759/30%
warning:  background #FF9500/15%, text #FF9500, border 1px #FF9500/30%
error:    background #FF3B30/15%, text #FF3B30, border 1px #FF3B30/30%
neutral:  background #8E8E93/15%, text #8E8E93, border 1px #8E8E93/30%
info:     background #0066FF/15%, text #0066FF, border 1px #0066FF/30%
```
Size: height 24px, horizontal padding 8px, Caption text (12px/500), radius-full, no fill background — use opacity tint

### Buttons
```
primary:   background #0066FF, text white, radius-md (6px), padding 12px 20px
secondary: background transparent, border 1px #2A2A42, text white, same padding
danger:    background transparent, border 1px #FF3B30, text #FF3B30
ghost:     background transparent, text #0066FF, no border — text link style
icon-btn:  40px × 40px, radius-md, background elevated (#242438), icon 20px
```
Hover: primary → `#0052CC`. All others → 8% white overlay.
Focus: 2px cyan (`#00D4FF`) outline, 2px offset.
Disabled: 40% opacity on all button types.

### Cards
```
Standard card:
  background: surface (#1A1A2E)
  shadow: shadow-card
  radius: radius-lg (8px)
  padding: space-5 (20px) or space-6 (24px)

Elevated card (featured, modal):
  background: elevated (#242438)
  shadow: shadow-elevated
  radius: radius-lg (8px)

Brand card (highlight, featured):
  background: surface (#1A1A2E)
  shadow: shadow-brand
  border-top: 2px solid gradient (#A8E600 → #00D4FF)
  radius: radius-lg (8px)
```

### Table
```
Header row: background elevated (#242438), Caption text (#8E8E93 uppercase, letter-spacing 0.5px)
Data row: background surface (#1A1A2E), Body/Small text
Alt row: no alternating — use bottom divider (#2A2A42, 1px) between rows
Hover row: background elevated (#242438)
Selected row: background #0066FF/10%, left border 3px #0066FF
```

### Inputs
```
Background: elevated (#242438)
Border: 1px border (#2A2A42)
Focus border: 1px #00D4FF (cyan)
Text: white, Body (16px/400)
Placeholder: text-secondary (#8E8E93)
Error border: 1px #FF3B30
Error message: Caption (#FF3B30) below the field
Height: 40px (standard), 48px (large/mobile)
Padding: 0 12px
Radius: radius-sm (4px)
```

### Sidebar (desktop, reusable component)
```
Width: 240px expanded / 72px collapsed
Background: surface (#1A1A2E)
Border-right: 1px border (#2A2A42)
Logo area: 64px height, 20px padding
Nav item height: 44px
Nav item padding: 0 16px
Active item: #0066FF left border (3px) + icon #0066FF + text white
Inactive item: icon #8E8E93 + text #8E8E93
Hover item: background elevated (#242438)
```

### Top Bar (web)
```
Height: 64px
Background: surface (#1A1A2E) or bg (#0A1628) depending on product
Border-bottom: 1px border (#2A2A42)
Padding: 0 24px
Logo: left-aligned, 32px height
Nav links: center or right, Small text (14px/400)
Actions: right-aligned, gap 12px
```

### Mobile Status Bar
```
Height: 44px (rendered at top, content below)
Time: left, Caption white
Signal/WiFi/Battery: right, Caption white
Background: matches page bg (#0A1628)
```

### Mobile Bottom Tab Bar
```
Height: 56px + safe area (34px) = 90px total reserved space
Background: surface (#1A1A2E)
Border-top: 1px border (#2A2A42)
Tab count: 4-5 tabs equally spaced
Active: icon #0066FF + label #0066FF (Caption 12px/500)
Inactive: icon #8E8E93 + label #8E8E93 (Caption 12px/500)
Icon size: 24px
Touch target: minimum 44px × 44px per tab
```

---

## Iconography

Library: **Lucide Icons** (outlined style only)
Default size: 24px
Stroke: 1.5px
Small contexts: 16px or 20px
Large contexts: 32px or 48px
Never fill Lucide icons — they are outline-only.

Common icon mappings:
- DID / Identity: `fingerprint`, `shield-check`, `user-check`
- Verification: `scan-face`, `shield`, `check-circle`
- Wallet: `wallet`, `coins`, `credit-card`
- Transaction: `arrow-up-right` (send), `arrow-down-left` (receive), `repeat` (swap)
- Status: `check-circle` (success), `clock` (pending), `x-circle` (error), `alert-triangle` (warning)
- Developer: `code`, `terminal`, `key`, `webhook`
- Governance: `vote`, `gavel`, `users`, `bar-chart`

---

## Animation Reference

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover state | 150ms | ease-out |
| Button press | 100ms | ease-in |
| Dropdown/popover open | 200ms | ease-out |
| Dropdown/popover close | 150ms | ease-in |
| Modal open | 250ms | ease-out (with scale from 0.96 to 1.0) |
| Modal close | 200ms | ease-in |
| Page transition | 300ms | ease-in-out |
| Toast/notification | 250ms slide-in | ease-out |
| Skeleton shimmer | 1500ms | linear, infinite |
| Loading spinner | 800ms | linear, infinite rotation |
| Success checkmark | 400ms | ease-out (draw animation) |
| Brand gradient glow pulse | 2000ms | ease-in-out, infinite |

---

## Edge State Patterns

### Empty State (no data)
```
Icon: relevant Lucide icon, 48px, text-secondary (#8E8E93)
Heading: H3 (22px/600, white) — describe what's missing
Subtext: Body (16px/400, text-secondary) — explain why and what to do
CTA: primary button (if there's an action to take)
Layout: centered vertically in the empty area
```

### Error State (failed operation)
```
Icon: alert-triangle or x-circle, 48px, error color (#FF3B30)
Heading: H3 — describe what failed (not "Error" — be specific)
Subtext: Body — what to do / try again
CTA: "Try Again" primary button
Layout: centered, same positioning as empty state
```

### Loading / Skeleton State
```
Cards: Replace text content with rounded gray rectangles (#242438), animating with shimmer
  - Heading: 70% width, 20px height, radius-sm
  - Body text: 100% then 85% then 60% (3 lines), 14px height
  - Avatar: circle, appropriate diameter
Shimmer: highlight moves left-to-right, 1500ms linear infinite
Chart areas: solid #242438 rectangle with shimmer overlay
Tables: skeleton rows, 5-7 rows, alternating opacity (100%, 80%, 60%)
```

### Connection Error
```
Icon: wifi-off or cloud-off, 48px, warning (#FF9500)
Heading: "Connection Lost" or similar
Subtext: "Check your connection and try again."
CTA: "Reconnect" primary button
Badge: amber dot in the top-right of the affected widget
```

---

## Shadow Values Quick Reference

Copy-paste ready for Figma Make prompts:

```
Card shadow:     box-shadow: 0 2px 8px rgba(0,0,0,0.32)
Elevated shadow: box-shadow: 0 8px 24px rgba(0,0,0,0.48)
Brand glow:      box-shadow: 0 0 24px rgba(0,212,255,0.15)
Inset:           box-shadow: inset 0 1px 3px rgba(0,0,0,0.40)
Light card:      box-shadow: 0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)
```

---

## Global UI Controls

These two components appear in every product's NavBar/TopBar. They are not optional. Every prototype must include them.

---

### ThemeToggle

Switches between dark and light mode. Persisted to `localStorage` (web) or device preferences (native). Initialized from `prefers-color-scheme` on first visit.

**Web (NavBar/TopBar — all products):**
```
Container: 36×36px, Fill #1A1A2E, Border 1px #2A2A42, Corner radius 6px
Icon: Lucide `sun` (light mode active) or `moon` (dark mode active), 18px, Fill #8E8E93
Hover: Fill #242438, icon Fill #FFFFFF, transition 150ms ease-out
Active press: scale 0.94, 100ms ease-in
Tooltip (on hover, 400ms delay): "Switch to light mode" / "Switch to dark mode"
  Tooltip: #242438 fill, 6px radius, Caption 12px/400 white, 8px padding, shadow-elevated
Toggle transition: icon crossfades at 200ms ease — old icon fades out (opacity 0), new icon fades in (opacity 1)
Page color transition: background-color, color, border-color all at 200ms ease simultaneously
```

**Light mode variant (marketing navbar — white background):**
```
Container: 36×36px, Fill #F2F2F7, Border 1px #E0E0E5, Corner radius 6px
Icon: `moon` 18px, Fill #666666
Hover: Fill #E8E8ED, icon Fill #0A1628
```

**NavBar position:** Second from right in the actions cluster — `[LanguageSwitcher] [ThemeToggle] [Auth/Avatar]`

**Mobile native (Settings > Appearance):**
```
Row: full-width, 52px height, horizontal layout
Left: `sun-moon` Lucide 20px #8E8E93 + Label "Theme" 16px/400 white, gap 12px
Right: SegmentedControl 2 options — "Light" | "Dark" (auto follows system if not overridden)
SegmentedControl: 140px wide, 32px height, #1A1A2E fill, 1px #2A2A42 border, 6px radius
Active segment: #0066FF fill, white label; Inactive: transparent, #8E8E93 label
```

**Desktop (Electron — Settings > Appearance or title bar menu):**
```
Same SegmentedControl as mobile native. Additionally exposed in app menu: View > Toggle Theme (⌘Shift+T)
```

---

### LanguageSwitcher

Switches the UI locale. Persisted to `localStorage` / user profile. Changes take effect immediately without page reload.

**Supported languages (all products):**
| Code | Native Name | Flag |
|------|-------------|------|
| EN | English | 🇬🇧 |
| TR | Türkçe | 🇹🇷 |
| RU | Русский | 🇷🇺 |
| DE | Deutsch | 🇩🇪 |
| FR | Français | 🇫🇷 |
| ES | Español | 🇪🇸 |
| JA | 日本語 | 🇯🇵 |
| KO | 한국어 | 🇰🇷 |
| ZH | 中文 | 🇨🇳 |

**Web (NavBar/TopBar — dark mode products):**
```
Trigger: [globe icon 18px #8E8E93] [current code "EN" Caption 12px/500 #8E8E93] [chevron-down 12px #8E8E93]
Container: Fill #1A1A2E, Border 1px #2A2A42, Corner radius 6px, Padding 8px 12px, gap 6px, height 36px
Hover: Fill #242438, border rgba(255,255,255,0.16), all text #FFFFFF, transition 150ms ease-out
Active (open): border #0066FF/60%, Fill #1A1A2E

Dropdown panel:
  Fill #1A1A2E, Border 1px #2A2A42, Corner radius 8px, min-width 180px
  Shadow: 0 8px 24px rgba(0,0,0,0.48)
  Padding: 4px 0
  Opens: downward, right-aligned to trigger, 200ms ease-out scale-y from 0.95 + opacity 0→1
  Closes: 150ms ease-in

Language row (per option, 40px height):
  Padding: 8px 16px, Horizontal layout, gap 10px
  Left: flag emoji 18px + native name Body 14px/400 #FFFFFF
  Right: language code Caption 11px/400 #48484F
  Active: Fill #0066FF/10%, left border 3px solid #0066FF, code text #0066FF
  Hover: Fill #242438, transition 150ms
  Current language shows active state even before hover
```

**Web (NavBar — light mode, marketing):**
```
Trigger: same layout, Fill #F2F2F7, Border 1px #E0E0E5
Text: #666666 for code and icon. Hover: Fill #E8E8ED, text #0A1628
Dropdown: Fill #FFFFFF, Border 1px #E0E0E5, shadow: 0 8px 24px rgba(0,0,0,0.12)
Language row active: Fill #0066FF/8%, left border #0066FF
```

**NavBar position:** Third from right — `[LanguageSwitcher] [ThemeToggle] [Auth/Avatar]`

**Mobile native (Settings > Language):**
```
Full-screen modal sheet, 390px wide
SearchBar at top: 44px height, #1A1A2E fill, placeholder "Search language..."
Language list: 8 rows, 56px height each
  Row: flag emoji 24px + native name Body 16px/400 white + code Caption 12px #8E8E93 right
  Active: #0066FF/10% row bg + checkmark-circle 20px #34C759 far right
  Tap: closes sheet, switches language, haptic (selection pattern)
Header: "Language" H3 + dismiss X button
```

**Desktop (Electron — Settings > Appearance):**
```
Dropdown select, full-width, 44px height, same styling as web dark dropdown
Label: "Language" Small 14px/500 white above
```

---

## Usage in Figma Make Prompts

Figma Make prompt files in `projects/*/figma-make-prompt*.md` should:
1. Open with a compressed 3-line design system reference (brand + font + mode)
2. Declare a `## Frame Setup` section with viewport dimensions and grid
3. List `## Shared Components` relevant to that product
4. Describe each screen with measured, specific values — no "subtle"
5. Include `### Empty State` and `### Error State` subsections for data-driven screens
6. Use the shadow/animation values from this reference document by name
7. Set sample data dates to 2026

# Ref: Visual Effects

# Solidus Network — Visual Effects Reference

All Figma Make prompts reference this document for card depth, glow effects, background treatments, chart styling, and other visual details. Use exact values — do not invent alternates.

---

## Card Depth System

Solidus uses a 4-level depth hierarchy on dark backgrounds. Elevation is expressed through fill and shadow, not border weight.

| Level | Fill | Shadow | Usage |
|-------|------|--------|-------|
| Base (page) | `#0A1628` | none | Page background |
| Surface | `#1A1A2E` | `0 2px 8px rgba(0,0,0,0.32)` | Cards, panels, sidebar, popovers |
| Elevated | `#242438` | `0 8px 24px rgba(0,0,0,0.48)` | Modals, dropdowns, nested cards, code blocks |
| Featured | `#1A1A2E` | `0 0 24px rgba(0,212,255,0.15)` | Brand-highlighted cards, featured plans, active items |

### Nesting Rules

- Never place a Surface card on a Surface card. Nest Elevated (#242438) inside Surface (#1A1A2E).
- Never nest more than 3 levels deep.
- Featured cards (brand glow) appear at Surface level only — they are not a depth level, they are an accent.
- On light mode backgrounds (#FFFFFF, #F2F2F7), use `0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)` as the card shadow.

### Gradient Accent Border

Featured and selected cards receive a 2px gradient top border:
```
border-top: 2px solid;
border-image: linear-gradient(90deg, #A8E600 0%, #00D4FF 100%) 1;
```
This is the *only* place the full brand gradient is used on a border element.

---

## Glow Effects

Glow is used sparingly — maximum 1-2 glowing elements per screen.

### Brand Glow (Cyan)
```
box-shadow: 0 0 24px rgba(0,212,255,0.15)
```
Used on: featured metric cards, highlighted chart lines, active badges on dark backgrounds.

### Lime Accent Glow
```
box-shadow: 0 0 16px rgba(168,230,0,0.20)
```
Used on: positive confirmation states (credential issued, verification success), APY indicators.

### CTA Button Glow
```
box-shadow: 0 4px 16px rgba(0,102,255,0.35)
```
Used on: primary CTAs on dark sections only. Never use on light backgrounds.

### Error Glow
```
box-shadow: 0 0 12px rgba(255,59,48,0.25)
```
Used on: error state icons, critical alert indicators. Never pulsed — static only.

### Orb Glow (Hero Backgrounds Only)
Large, blurred radial gradients that create the dark hero atmosphere:
```
Orb 1 (cyan): radial-gradient, 800px diameter, rgba(0,212,255,0.15), centered ~50% 40%, blur 160px
Orb 2 (lime): radial-gradient, 500px diameter, rgba(168,230,0,0.10), centered ~30% 60%, blur 120px
Orb 3 (blue): radial-gradient, 300px diameter, rgba(0,102,255,0.08), centered ~75% 70%, blur 100px
```
Rules: Orbs appear only in hero sections and the marketing page CTA band. Never in body sections, sidebars, or dashboards.

---

## Background Treatments

### Dark Page (product UIs)
- Fill: `#0A1628` — solid, no texture
- No gradient orbs outside of hero sections
- Subtle noise: 1% opacity white noise texture on hero backgrounds only
- Section alternation: `#0A1628` (default) / `#1A1A2E` (section breaks within the page) — never alternate at the card level on dark backgrounds

### Light Page (marketing only)
- Fill: `#FFFFFF` — primary sections
- Fill: `#F2F2F7` — alternating sections
- Hero override: `#0A1628` with orbs (the only dark section on light pages)
- No gradient orbs in body sections — clean white space is the premium signal
- Dividers between sections: implicit via background alternation, not explicit lines

### Glassmorphism (dark dashboards only)
Used on modal overlays and floating panels in dark product UIs:
```
Background: rgba(26, 26, 46, 0.80)    /* #1A1A2E at 80% */
backdrop-filter: blur(16px) saturate(120%)
border: 1px solid rgba(255,255,255,0.06)
```
**Never use glassmorphism on light backgrounds.** Light backgrounds use solid cards.

### Sidebar Background
```
Background: #1A1A2E
Border-right: 1px solid #2A2A42
```
No blur, no gradient — solid surface. The sidebar is infrastructure, not decoration.

---

## Chart Styling

### Line Chart
```
Line color: #0066FF
Line width: 2px
Fill (area beneath): linear-gradient(180deg, rgba(0,102,255,0.20) 0%, rgba(0,102,255,0.00) 100%)
Grid lines: horizontal only, 1px #2A2A42, 50% opacity
Axis labels: Caption (12px/500), color: #8E8E93
```
Hover state: vertical crosshair line (1px dashed #2A2A42) + tooltip card:
```
Background: #0A1628
Border: 1px solid #2A2A42
Border-radius: 8px
Padding: 8px 12px
Content: date in Caption + value in Body/600 white
Shadow: 0 2px 8px rgba(0,0,0,0.32)
```

### Area Chart (portfolio, large data)
Same as line chart, with the fill area prominent (up to 30% opacity at peak).
Use a clipping mask so the fill never extends beyond the chart bounds.

### Bar Chart
```
Bar fill: linear-gradient(180deg, #A8E600 0%, #00D4FF 100%)  — brand gradient on featured charts
         OR #0066FF — standard charts
Bar width: 60-75% of available column width (leave visual breathing room)
Bar radius: 4px top-left, 4px top-right (rounded tops only)
Track background: #242438
```
Negative bars (losses, downtrends):
```
Fill: #FF3B30 (solid, no gradient)
```

### Horizontal Bar (usage meters)
```
Track: #242438, height 8px, radius-full
Fill: #0066FF, animates from 0% to actual value on first render (600ms ease-out)
Danger zone (>80%): fill transitions to #FF9500 (warning) or #FF3B30 (critical)
```

### Sparkline (inline, table cells)
```
Height: 40px, width: 80px
Line: 1.5px stroke, color matches trend (positive: #34C759, negative: #FF3B30, neutral: #8E8E93)
No axes, no labels, no fill — line only
```

### Donut / Ring Chart
```
Track: #242438
Fill arc: #0066FF (or status color for status-specific rings)
Width: 6-8px stroke for small rings (48px), 10-12px for large (96px+)
Center text: value in H2 or Display, white
Gap between track and fill: none
```

### Heatmap (activity grid, GitHub-style)
```
Cell size: 10px × 10px
Cell gap: 2px
Cell border-radius: 2px
Empty cell: #1A1A2E (bg level)
Level 1 (1-5): rgba(0,102,255,0.20)
Level 2 (6-15): rgba(0,102,255,0.50)
Level 3 (16+): #0066FF
```

---

## Loading & Skeleton States

### Skeleton Shimmer Pattern
```
Base fill: #242438
Shimmer: linear-gradient(90deg,
  rgba(255,255,255,0.00) 0%,
  rgba(255,255,255,0.04) 40%,
  rgba(255,255,255,0.08) 50%,
  rgba(255,255,255,0.04) 60%,
  rgba(255,255,255,0.00) 100%)
Animation: translateX(-100%) → translateX(100%), 1500ms linear infinite
```

### Skeleton Shape Rules
| Element | Skeleton Dimensions |
|---------|---------------------|
| Heading (H1-H3) | 60-80% width of container, 20px height, radius-sm |
| Body text (line 1) | 100% width, 14px height, radius-sm |
| Body text (line 2) | 85% width, 14px height, radius-sm |
| Body text (line 3) | 60% width, 14px height, radius-sm |
| Avatar (circle) | Match intended size, radius-full |
| Button | Match button dimensions, radius-md |
| Badge | 60px × 24px, radius-full |
| Stat number | 80px × 36px, radius-sm |
| Chart area | Full card width, full chart height, radius-sm |
| Table row | Full width, 48px height, no internal detail |

Skeleton → real content crossfade: 300ms ease-out, triggered when data arrives.

---

## Verification & Identity Visual Language

These visual elements appear across verify, identity, and wallet products.

### Credential Card
Design a physical ID card feel within the digital surface:
```
Dimensions: typically 340-420px wide, 200-260px tall
Background: #1A1A2E
Border-radius: 12px
Shadow: 0 8px 24px rgba(0,0,0,0.48)
Gradient accent: 2px top border (lime → cyan gradient)
Holographic watermark: subtle geometric pattern at 4% white opacity (bottom-right quadrant)
QR code: 80×80px, white modules on #242438 background, bottom-right corner
```

### Verification Step Indicator
```
Circle diameter: 28-32px
Active step: Fill #0066FF, white number (Body/600)
Completed step: Fill #34C759, icon/check-circle (white)
Upcoming step: Fill #242438, text-secondary number
Connecting line: 1px solid #2A2A42
Animation: step completion triggers circle fill morph (300ms ease-out)
```

### DID Display
```
Font: JetBrains Mono 14/400
Color: white (#FFFFFF)
Truncation: show first 16 + "..." + last 6 chars for abbreviated view; full string for detail view
Copy icon: icon/copy 16px, Fill: #8E8E93; hover → #FFFFFF; click → icon/check #34C759 (200ms, reverts 2s)
Monospace pill background: #242438, padding: 8 12, radius-md
```

### Trust Score Ring
```
Size: 48px diameter
Track: #242438, 5px stroke
Fill: arc from 12 o'clock, clockwise
Fill color scale:
  0-60%: #FF3B30 (low trust)
  61-79%: #FF9500 (medium)
  80-94%: #34C759 (good)
  95-100%: #A8E600 (excellent)
Center: score number in H3/700, white
Animation: arc draws from 0 to actual value on mount (600ms ease-out)
```

---

## Status Indicator System

### Status Dot (inline)
```
Size: 8px circle
Active/Online: #34C759
Warning/Degraded: #FF9500
Error/Offline: #FF3B30
Unknown: #8E8E93
Pulsing variant (live/active): scale 1.0 → 1.3 → 1.0, 2000ms ease-in-out infinite, opacity 0.6 → 1.0 → 0.6
```

### Live Data Indicator
```
Dot: 6px, #34C759, pulsing animation
Label: Caption 12/400, #8E8E93: "Live" or "Updated just now"
Placement: beside the section or stat heading it annotates
```

### Network Health Bar (full-width)
```
Height: 4px, positioned at very top of page
Good: #34C759
Degraded: #FF9500
Down: #FF3B30
Maintenance: #0066FF (pulsing)
Transition: 800ms ease-in-out on status change
```

---

## Isometric Illustrations

Used in empty states, feature sections, and hero side content (marketing and onboarding).

### Style Rules
- Pure isometric projection (30° angle, equal-width tiles)
- Line art only — no gradients inside the illustration shapes
- Stroke: 1.5px (matching Lucide icon weight)
- Fill: flat blocks of brand colors or neutrals
- Shadow: single-direction dark fill block (simulated isometric shadow)
- Max size for empty states: 120 × 120px
- Max size for hero/feature illustrations: 320 × 320px

### Color Palette for Illustrations
```
Primary block: #1A1A2E (surface)
Accent block: #0066FF (CTA blue)
Highlight face: #242438 (elevated)
Shadow face: #0A1628 (darkest)
Brand accent: #A8E600 (lime) — used sparingly on 1 element per illustration
```

---

## Photography Treatment

Photography appears only on marketing pages (hero backgrounds, testimonial avatars, use case sections).

### Dark Overlay
All photography receives a dark overlay to maintain legibility:
```
overlay: rgba(10, 22, 40, 0.50)     /* #0A1628 at 50% */
```
Increase to 65% for hero backgrounds where text sits directly on the image.

### Color Treatment
Photos are converted to a high-contrast treatment:
- Desaturate to 60-80% saturation (not full B&W — retain some warmth)
- Increase contrast by 15-20%
- Blend with brand color overlay at 5-8% opacity (#0066FF tint for tech/identity contexts)

### Testimonial Avatars
- Circular crop, 40-48px for inline contexts, 64px for featured testimonials
- If no real photo available: gradient avatar (unique per person) — `linear-gradient(135deg, [color1], [color2])` where colors are drawn from the brand palette

---

## Dark Mode Accessibility Overrides

These override standard design system rules in specific contexts:

### Biometric / Face Scan Overlay
```
Scan frame: 1px dashed #0066FF, not a solid border
Corner brackets: 3px thick, 20px long, #0066FF, only the 4 corners (not a full border)
Scanning line: 2px horizontal, #0066FF, animates top → bottom → top, 1800ms linear infinite
Background: #0A1628 (full screen) — no surface card
```

### Code Block (dark)
```
Background: #0D1F38 (darker than surface, creates terminal feel)
Border: 1px solid rgba(255,255,255,0.06)
Padding: 20px 24px
Border-radius: 12px
Shadow: 0 8px 24px rgba(0,0,0,0.48)
```

Syntax highlighting palette:
```
keywords:       #0066FF  (blue — import, const, async, return)
strings:        #A8E600  (lime — "value", 'text')
comments:       #556688  (muted blue-gray — // comment)
types/classes:  #00D4FF  (cyan — TypeScript types, class names)
numbers:        #FF9500  (orange — 42, 3.14)
functions:      #C084FC  (purple — functionName())
variables:      #C8D6E5  (light blue-gray — default text)
line numbers:   #556688  (muted, 40px left column)
```

### Window Chrome (code block header)
```
3 dots (12px circles, 4px gap): #FF5F57 (red), #FEBC2E (yellow), #28C840 (green)
Tab label: JetBrains Mono 13/400, #8E8E93
Background: #0A1628 (slightly darker than code area), height: 40px
Border-bottom: 1px solid rgba(255,255,255,0.06)
```


---

# Ref: Interaction Patterns

# Solidus Network — Interaction Patterns Reference

All Figma Make prompts reference this document for hover states, focus indicators, transitions, gestures, and micro-interaction patterns. Use exact values — do not invent alternates.

---

## Core Timing Scale

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `instant` | 0ms | — | Color fill, no animation needed |
| `fast` | 150ms | ease-out | Hover states, icon swaps |
| `normal` | 200ms | ease-out | Dropdown open, tab switch, toggle |
| `slow` | 300ms | ease-in-out | Page elements entering, modals closing |
| `enter` | 250ms | ease-out | Modals/sheets opening (with scale) |
| `exit` | 200ms | ease-in | Modals/sheets closing |
| `transition` | 300ms | ease-in-out | Page-level transitions |
| `count` | 400ms | ease-out | Number count-up animations |
| `draw` | 600ms | ease-out | Arc draws, progress fills, chart lines |
| `breathing` | 2000ms | ease-in-out infinite | Pulsing indicators, live status dots |

**Reduced motion:** When `prefers-reduced-motion: reduce` is active, all durations collapse to 0ms or 1ms. Animations that convey information (e.g., progress fill) remain visible as their final state instantly.

---

## Hover States

### Card Hover (dark mode)
```
Default:   background #1A1A2E, shadow: 0 2px 8px rgba(0,0,0,0.32), border: none
Hover:     background #1D1D34, shadow: 0 4px 16px rgba(0,0,0,0.40)
Transition: 150ms ease-out on background + shadow
Cursor: pointer (if the card is clickable)
```

For interactive product cards (link cards, nav cards):
```
Hover: border 1px solid #0066FF (appears), shadow: 0 4px 12px rgba(0,102,255,0.12)
Transition: border and shadow, 150ms ease-out
```

### Card Hover (light mode, marketing)
```
Default:   background #FFFFFF, border 1px solid #E0E0E5, shadow: 0 1px 4px rgba(0,0,0,0.08)
Hover:     background #FFFFFF, border 1px solid #0066FF, shadow: 0 4px 12px rgba(0,102,255,0.10)
Transition: 200ms ease-out
```

### Table Row Hover
```
Default:   background transparent (on surface card)
Hover:     background #242438
Transition: 150ms ease-out
Show on hover: action icons (copy, external-link, chevron-right) — opacity 0 → 1, 150ms ease-out
```

### Button Hover
```
Primary (#0066FF):    → #0052CC, Transition: 150ms ease-out
Secondary (border):   → 8% white overlay on bg, Transition: 150ms ease-out
Ghost (text):         → underline + icon shift 2px right, Transition: 150ms ease-out
Icon button:          → background #2A2A42 (slightly elevated), Transition: 150ms ease-out
Danger (#FF3B30):     → #CC2B20, Transition: 150ms ease-out
```

### Nav Item Hover
```
Sidebar inactive item: background #242438 (elevated fill), Transition: 150ms ease-out
Tab inactive: text #FFFFFF (from #8E8E93), Transition: 150ms ease-out
Top nav link:  underline slides in from left (width 0 → 100%, 200ms ease-out)
```

### Icon Hover
```
Standalone icon (e.g., copy, settings, close): opacity 0.60 → 1.0, 150ms ease-out
Colored icon on hover: color #8E8E93 → #FFFFFF, 150ms ease-out
Action icons in table rows: revealed from opacity 0 on row hover
```

---

## Focus Indicators

All interactive elements must have a visible focus indicator for keyboard navigation.

### Standard Focus Ring
```
outline: 2px solid #00D4FF
outline-offset: 2px
border-radius: matches the element's border-radius
```
Applied to: buttons, inputs, links, checkboxes, radios, toggle switches, selects, tab items.

### Input Focus
```
Default border: 1px solid #2A2A42
Focus border: 1px solid #00D4FF (replaces default)
Glow: 0 0 0 3px rgba(0,212,255,0.15)
Transition: 150ms ease-out
```

### Focus Visible Only
Focus rings appear only on keyboard navigation (`:focus-visible`). Mouse clicks do not show the ring. This keeps the interface clean for mouse users while remaining fully accessible to keyboard users.

---

## Click / Press Feedback

### Button Press
```
Active (mousedown): scale 0.97, Transition: 100ms ease-in
Release (mouseup):  scale 1.0, Transition: 150ms ease-out
```

### Icon Button Press
```
Active: scale 0.90, background opacity +20%, 100ms ease-in
Release: scale 1.0, 150ms ease-out
```

### Toggle / Checkbox Press
```
Active: scale 0.92 on the toggle thumb, 100ms ease-in
Settle: scale 1.0, 200ms ease-out (with slight overshoot — spring: tension 300, friction 30)
```

---

## Dropdown & Popover Patterns

### Dropdown Open
```
Origin: top-left of trigger element (or bottom-left for below-trigger dropdowns)
Enter: opacity 0 → 1, translateY(-4px) → translateY(0), 200ms ease-out
```

### Dropdown Close
```
Exit: opacity 1 → 0, translateY(0) → translateY(-4px), 150ms ease-in
```

### Dropdown Appearance
```
Background: #1A1A2E (surface)
Border: 1px solid #2A2A42
Border-radius: 8px
Shadow: 0 8px 24px rgba(0,0,0,0.48)
Min-width: match trigger width
Max-height: 320px with overflow-y: auto (custom scrollbar, 4px wide, #242438 track)
```

### Dropdown Item Hover
```
Background: #242438
Transition: 100ms ease-out
```

### Dropdown Item Active (selected)
```
Background: rgba(0,102,255,0.15)
Text: #0066FF
Icon/checkmark: icon/check 16px, #0066FF
```

### Popover (tooltip-style)
```
Background: #0A1628
Border: 1px solid #2A2A42
Border-radius: 6px
Shadow: 0 4px 16px rgba(0,0,0,0.48)
Padding: 8px 12px
Max-width: 240px
Text: Body 14/400, white
Arrow: 6px triangle, matching background
Enter: opacity 0 → 1, 150ms ease-out (no translate — appears in place)
Exit: opacity 1 → 0, 150ms ease-in
Delay: 400ms hover delay before appearing (prevents accidental triggering)
```

---

## Form Validation Animations

### Input — Valid State (on blur)
```
Border: 1px solid #34C759 (replaces default border)
Icon: icon/check-circle 16px, #34C759 — appears right of input, opacity 0 → 1 (200ms ease-out)
Transition: 200ms ease-out
```

### Input — Invalid State (on blur / on submit)
```
Border: 1px solid #FF3B30
Icon: icon/x-circle 16px, #FF3B30 — appears right of input
Shake: translateX animation — 0px → 4px → -4px → 4px → -2px → 0px, 300ms, 2 oscillations
Error message: Caption (#FF3B30) slides in below input, opacity 0 → 1 + translateY(4px → 0), 200ms ease-out
```

### Form Submit — Loading State
```
Button: text hidden, loading spinner (white, 16px) centered, 800ms linear infinite rotation
Button: disabled (50% opacity), cursor: not-allowed
Input fields: pointer-events: none (prevent editing during submit)
```

### Form Submit — Success (inline replacement)
```
Entire form area crossfades to success content (300ms ease-out):
  icon/check-circle 32px, #34C759
  Heading: H3, white
  Subtext: Body, text-secondary
```

### Shake Animation (error feedback)
```
@keyframes shake {
  0%, 100%: translateX(0)
  20%: translateX(-4px)
  40%: translateX(4px)
  60%: translateX(-4px)
  80%: translateX(2px)
}
Duration: 300ms, timing: ease-in-out, fill-mode: forwards
```

---

## Modal Patterns

### Modal Open Sequence
```
1. Overlay: opacity 0 → 0.72 (rgba(0,0,0,0.72) + backdrop-filter: blur(8px)), 250ms ease-out
2. Modal card: simultaneously — opacity 0 → 1, scale 0.96 → 1.0, translateY(8px → 0), 250ms ease-out
3. First focusable element inside modal receives focus
```

### Modal Close Sequence
```
1. Modal card: opacity 1 → 0, scale 1.0 → 0.96, translateY(0 → 8px), 200ms ease-in
2. Overlay: opacity 0.72 → 0, 200ms ease-in (simultaneous with modal)
3. Focus returns to the trigger element that opened the modal
```

### Focus Trap
While a modal is open:
- Tab cycles only through focusable elements within the modal
- Shift+Tab cycles in reverse
- Escape key closes the modal (triggers close sequence)
- Clicking the overlay closes the modal

### Bottom Sheet (mobile)
```
Enter: translateY(100%) → translateY(0), 300ms ease-out
Exit: translateY(0) → translateY(100%), 250ms ease-in
Overlay: same as modal overlay, but behind the sheet
Drag handle: 36px × 4px, #242438, radius-full, centered at top of sheet (8px margin above content)
```
Drag-to-dismiss: if user drags handle down > 40% of sheet height, auto-dismiss (complete exit animation).

---

## Toast / Notification Patterns

### Toast Appearance
```
Position: top-right of viewport, 24px from top and right edges
Width: 360px
Background: #1A1A2E
Border: 1px solid (color matches type — see below)
Border-left: 4px solid (color matches type)
Border-radius: 8px
Shadow: 0 8px 24px rgba(0,0,0,0.48)
Padding: 16px 20px
```

### Toast Enter/Exit
```
Enter: translateX(120%) → translateX(0), 250ms ease-out
Exit: translateX(0) → translateX(120%), 200ms ease-in (also used for auto-dismiss)
```

### Toast Types
```
success: border-color #34C759, icon/check-circle #34C759
error:   border-color #FF3B30, icon/x-circle #FF3B30
warning: border-color #FF9500, icon/alert-triangle #FF9500
info:    border-color #0066FF, icon/info #0066FF
```

### Toast Anatomy
```
Icon: 20px (type-specific color), left-aligned
Title: Body 14/600, white
Message: Body 14/400, text-secondary (#8E8E93)
Close button: icon/x 16px, #8E8E93, hover → #FFFFFF, top-right of toast
```

### Toast Auto-Dismiss
```
Success: 4000ms
Info: 6000ms
Warning: 8000ms
Error: never auto-dismiss (user must close)
Progress indicator: thin 2px line at bottom of toast depletes from 100% → 0% over auto-dismiss duration
```

### Toast Stacking
Multiple toasts stack vertically (new toast pushes previous ones down). Maximum 3 toasts visible; oldest auto-dismissed when limit exceeded.

---

## Copy-to-Clipboard Pattern

Used for DID strings, API keys, transaction hashes, addresses, code snippets.

### States
```
Default: icon/copy 16px, Fill: #8E8E93
Hover: icon/copy 16px, Fill: #FFFFFF, Transition: 150ms ease-out
Clicked (copying): icon/check 16px, Fill: #34C759, Transition: 150ms ease-out
```

### Post-Copy Feedback
- Icon changes to icon/check, Fill: #34C759 (150ms ease-out)
- Tooltip: "Copied!" — appears above/below, Caption style, Fill: #34C759, background: #1A1A2E, 150ms ease-out
- Auto-reverts to default icon after 2000ms (no transition — instant swap back)

### Code Block Copy Button
```
Position: top-right corner of code block, 8px margin
Background: rgba(255,255,255,0.08)
Border: 1px solid rgba(255,255,255,0.08)
Border-radius: 6px
Padding: 4px 8px
Label: Caption "Copy" (hidden on mobile) + icon/copy 14px
On copy success: label changes to "Copied ✓", Fill: #34C759, reverts after 2s
```

---

## Tab Switch Pattern

### Underline Tabs (navigation)
```
Active indicator: 2px solid #0066FF underline
Indicator transition: left position animates to new tab (200ms ease-out) — sliding indicator
Text transition: active → white, inactive → #8E8E93 (150ms ease-out)
```

### Pill Tabs (segment control)
```
Active pill: Fill: #0066FF (or white on dark #0A1628 container), color: white
Active pill: slides to new position (200ms ease-out — the pill itself moves)
Inactive: Fill: transparent
Container: Fill: #242438, Corner Radius: 8px, padding: 4px
```

### Content Crossfade (on tab switch)
```
Old content: opacity 1 → 0, 150ms ease-in
New content: opacity 0 → 1, 150ms ease-out
Sequence: old fades out first, then new fades in (total: 300ms)
```

---

## Scroll Animations

### Fade-in on Scroll (scroll-triggered)
```
Initial state: opacity 0, translateY(20px)
Triggered state: opacity 1, translateY(0)
Threshold: element is 50% visible in viewport
Duration: 400ms ease-out
Trigger: fires once — does not reverse on scroll up
```

### Stagger Pattern (for grids and lists)
When multiple items enter together (grid cards, step list), stagger each:
```
Card 1: delay 0ms
Card 2: delay 50ms
Card 3: delay 100ms
Card 4: delay 150ms
(cap at 300ms total delay — do not stagger beyond 6 items)
```

### Counter Animation (number count-up)
```
Start: 0 (or nearest round number)
End: target value
Duration: 400ms ease-out
Number format: maintain decimal places and formatting throughout the count
Trigger: fires when element is 50% visible in viewport, fires once
```

### Parallax (hero section only)
```
Gradient orbs: move at 50% of scroll speed (transform: translateY(scrollY * 0.5))
Hero text: moves at 30% of scroll speed (slower than orbs — creates depth)
Implementation: only active for scroll within the hero section height
```

### Sticky Navigation (scroll threshold)
```
NavBar (desktop): becomes sticky + gains shadow at 64px scroll:
  shadow added: 0 1px 4px rgba(0,0,0,0.06) (light mode) or 0 2px 8px rgba(0,0,0,0.32) (dark mode)
  Transition: shadow 200ms ease-out
```

---

## Progress Indicators

### Circular Progress Ring
```
Track: #242438, stroke-width: 6-10px
Fill arc: #0066FF (or status color), animated from 0° → final angle (600ms ease-out)
Rotation origin: 12 o'clock (−90° offset)
Center: percentage or label text
```

### Linear Progress Bar (step progress)
```
Track: #242438, height: 4-6px, border-radius: full
Fill: #0066FF, animates from 0% → current value (600ms ease-out)
Segments (for step progress): divide track into equal segments, each fills when step completes
```

### Step Circle (wizard/flow progress)
```
Circle diameter: 32px
States:
  Upcoming: Fill: #242438, text-secondary number
  Active: Fill: #0066FF, white number, outer ring: 2px solid rgba(0,102,255,0.30) at 4px offset
  Complete: Fill: #34C759, icon/check white
Connecting line: 1px #2A2A42 between circles (fills #34C759 when step completes)
Step completion animation: circle fill morphs from #0066FF → #34C759 (300ms ease-out), number → check icon (crossfade 200ms)
```

---

## Mobile-Specific Gestures

### Pull-to-Refresh
```
Threshold: 80px of overscroll triggers refresh
Visual: circular arrow icon (40px) at top of scroll area, rotates continuously while loading
Release before threshold: snaps back (300ms ease-in)
Release after threshold: triggers refresh + loading spinner replaces arrow
Success: icon/check 40px, #34C759, fades out (300ms), content updates
```

### Swipe-to-Dismiss (toast, bottom sheet)
```
Swipe right > 40% of element width: auto-dismiss (complete slide-out animation)
Swipe right < 40%: snap back (200ms ease-out spring)
```

### Long Press (context menu)
```
Delay: 500ms hold
Visual feedback: subtle scale 0.97 after 200ms hold (early haptic suggestion)
Release before 500ms: no action, scale returns to 1.0 (150ms ease-out)
After 500ms: context menu appears (bottom sheet or popover)
```

### Swipe between tabs (mobile)
```
Full-width swipe gesture switches between tab content
Swipe velocity > 0.3px/ms: immediate tab switch
Swipe velocity < 0.3px/ms: rubber-band back if < 50% through, commit if ≥ 50%
Content follows finger position (1:1 tracking during gesture)
Tab indicator follows proportionally during the swipe
```

---

## Skeleton → Content Transition

For any data-loaded screen (dashboards, lists, tables):

### Loading Sequence
```
1. Skeleton renders immediately (no delay)
2. Real data arrives → crossfade skeleton → content (300ms ease-out per section)
3. Sections with independent data: stagger crossfades by 50ms
4. Charts: draw animation triggers after crossfade completes (600ms ease-out)
5. Number stats: count-up animation triggers after crossfade (400ms ease-out)
```

### Refresh Sequence (user-initiated or auto-update)
```
1. Do NOT replace content with skeleton — content stays visible
2. Show a subtle loading indicator: top-of-card 2px progress bar (#0066FF) animating
3. New content fades in over old content (200ms ease-out crossfade)
4. Updated values: animate from old → new (number morph, 200ms)
```

---

## Number Morph Animation

Used when a displayed value changes (price update, stat refresh, calculator result).

```
Old value: opacity 1 → 0, translateY(0 → -8px), 150ms ease-in
New value: opacity 0 → 1, translateY(8px → 0), 150ms ease-out
Sequence: old exits, then new enters (total ~300ms)
```

For real-time price feeds (wallet, explorer), the morph fires per-update. If updates arrive faster than 300ms, queue them — never interrupt a running morph.

---

## Input Autocomplete / Search Dropdown

### Behavior
```
Trigger: first keypress (not on focus alone)
Debounce: 300ms after last keypress before querying
Minimum characters: 2
```

### Dropdown Appearance
```
Same popover/dropdown styles as above
Max items shown: 6 (scroll if more)
Each item: 44px height (minimum tap target), 16px horizontal padding
Match highlight: matched text in Body/600 #0066FF
```

### States
```
Loading: spinner (16px) in dropdown center while querying
No results: icon/search 20px #8E8E93 + Body "No results" in dropdown
Error: icon/alert-triangle 20px #FF9500 + Caption "Search unavailable"
```

### Keyboard Navigation
```
Arrow Down / Arrow Up: moves selection highlight through results
Enter: confirms selection
Escape: closes dropdown, preserves typed text
```

---

## Specific Product Interaction Notes

### Verification Flow (verify, identity)
- Each step transition: slide-left exit (old step) + slide-right enter (new step), 300ms ease-in-out
- Back navigation: reverse direction — slide-right exit + slide-left enter
- Step completion: brief success micro-animation (icon/check draws in, 400ms) before advancing

### Credential Card Flip (identity)
- Tapping a credential card (compact view) expands to full detail: card grows from compact (100px tall) to full height (300px+), content crossfades, 300ms ease-out
- The card stays in place (no navigation change) — surrounding cards shift to accommodate the height change

### Wallet Send Flow
- Asset selector opens as a full-width dropdown with search
- Amount input: numbers only, live USD conversion below updates on each keypress (no debounce — feels instant)
- Fee selector (Slow/Normal/Fast): clicking a different fee option updates the summary card values with number morph (200ms)

### Code Block Tab Switch (developer pages)
- Language tab: active indicator slides (200ms ease-out)
- Code content: old crossfades out (150ms), new crossfades in (150ms) — sequential, not simultaneous

### Staking Amount Input (wallet staking)
- Typing: live preview of "Estimated monthly rewards" updates with number morph (200ms)
- MAX button: fills input to max available, triggers number morph on rewards preview

### Explorer Chart Range Switch (1D / 1W / 1M)
- Old chart line: fades out (150ms)
- New chart line: draws from left edge to right (600ms ease-out draw animation on the stroke)
- Y-axis: rescales with transition (300ms ease-out on tick positions)


---

# Ref: Product Design Language

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
- All DID values (`did:solidus:0x...`)
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


---

# Ref: All Screens

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
  - Key elements: DateRangePicker (last 7 days default); four KPICards (Verifications Today, Pending Review, Success Rate, Revenue This Month) with count-up animation and sparklines; VolumeChartCard (area chart, 7-day, with metric toggle); LiveStreamPanel (real-time 8-item feed with animated item entry); WebhookDeliveryPanel (endpoint health badge, delivery stats strip, 5-row delivery log, degraded state alert); Recent Verifications table (8 rows, pagination, eye action); New Verification button in top bar
  - States: empty (new account — zero KPIs, empty chart with quickstart CTA, "Waiting for first verification" stream caption); sandbox mode (amber full-width banner below top bar: "You are in Sandbox mode — all data is simulated.")

- **Verifications List** — Operational table for managing all verification records
  - Route: `/verifications`
  - Key elements: Filter bar (search by DID/email/reference, Status dropdown, Type dropdown, Date Range dropdown, Country multi-select, active filter pills with clear all); Quick filter tabs (All, Verified, Pending, Failed, Processing) with counts; main table (DID, Type, Status badge, Country + flag, Duration, Cost in JetBrains Mono, Timestamp, actions — view + context menu); DID copy-on-hover; bulk action bar replaces filter bar when rows selected (export, revoke, deselect all); pagination ("Showing 1–20 of 1,247", page number pills); Export CSV button in top bar
  - States: empty filtered (icon + "No verifications found" + "Clear filters"); zero-result search ("No results for 'did:solidus:0xfff...'"); loading skeleton; bulk selected (blue-tinted bulk bar)

- **Verification Detail** — Full record for a single verification
  - Route: `/verifications/{session_id}` (e.g., `/verifications/vsn_9f8e7d6c5b4a3291`)
  - Key elements: Breadcrumb (Dashboard / Verifications / session_id); page header (session ID, start/complete/duration timestamps, large status badge, "Revoke Credential" danger ghost button); 60/40 two-column layout; left: SubjectCard (DID + copy, reference, credential badges), DocumentCard (document type, issuing country, masked document number + DOB with eye toggle, full name, expiry, nationality, gender, document thumbnails with "Images deleted after processing (GDPR)" caption), VerificationStepsCard (6-step timeline: uploaded → authenticity → liveness → extraction → validator consensus with block # → credential issued); right: CredentialCard (CredentialPreview with W3C VC type, issuer, issued/expiry dates, QR placeholder; Download Credential + View Raw JSON buttons), BlockchainAnchorCard (block #, tx hash in cyan with explorer link, validator), EventLogCard (8 timestamped events in JetBrains Mono)
  - States: processing (steps 1–3 green, step 4 spinning, steps 5–6 grey, credential card shows locked placeholder); failed (steps 1–3 green, step 3 shows x-circle with failure reason, FailureAnalysisCard in red theme with "Flag for Review" button, no credential card)

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
  - Key elements: DateRangePicker (Last 30 days default); Export PDF button; four KPICards (Total Verifications, Success Rate, Avg. Completion Time, Cost per Verification); Verification Funnel card (trapezoid chart, 5 stages from Initiated to Credential Issued, drop-off percentages, drop-off analysis breakdown by reason); Volume Over Time card (area chart, dual-line: total verifications + successful, 30-day x-axis); Credential Breakdown card (donut chart by verification type with legend); CostSavingsCard (savings vs Auth0, comparison rows, savings percentage bar); Cohort Quality table (6-month data, re-verification rates, active rates); Compliance Audit Log (10 rows, event badges, validator IDs, block numbers, blockchain attestation note, Download CSV)
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
  - Key elements: Sticky nav (logo, nav links, Sign In + Start Free); dark hero section (H1 "KYC verification that respects users.", VerifyPreviewCard widget, trust chips, CTA buttons); Live Stats strip (48.7M verifications, 99.4% success rate, 1.4s avg, 180+ countries); Partner Logos (10 logos, desaturated); How It Works 4-step flow; Feature Grid (6 cards); Industry Verticals tab (Crypto, Fintech, Gaming, Healthcare); Compliance badges (GDPR, SOC 2, BIPA, Open Source); Testimonials (3 cards with metrics); Pricing Preview (pay-as-you-go table + subscription plan toggle); Developer Quickstart (steps + code block); Email signup CTA; Footer (4 columns)
  - States: stats strip API down (static values, italic timestamp)

- **Pricing** — Full pricing page with comparison table and FAQ
  - Route: `/pricing`
  - Key elements: Header (monthly/annual toggle with "Save 20%" badge); 3 plan cards (Startup $99, Growth $499 featured, Enterprise custom); Feature comparison table (7 row groups, check/dash per plan); FAQ accordion (5 questions); Enterprise dark CTA section
  - States: monthly vs annual toggle (price values swap)

- **Security & Compliance** — Trust center and compliance documentation
  - Route: `/security`
  - Key elements: Hero (H1 "Security & Compliance", architecture philosophy copy); Architecture Diagram (data flow: User Device → API Edge → Validators → Blockchain → DID Wallet, with TLS/hash/signature labels, red annotation "Document images processed + deleted"); Certifications Grid (8 badges: GDPR Current, SOC 2 Planned, ISO 27001 Planned, BIPA Current, MiCA Current, eIDAS 2 Current, FATF Current, PCI-DSS N/A); Privacy Principles (6 cards: Zero Biometric Storage, Data Minimization, User-Controlled Credentials, GDPR Right to Erasure, Consent-First, Open Source); Audit Reports table (downloadable PDF/JSON)

- **Use Cases** — Industry-specific use case pages
  - Route: `/use-cases`
  - Key elements: Vertical tab layout (280px industry sidebar + content right); 8 industries; each: H1, metric callout, 3 use cases with icon/title/description/code snippet, customer quote, CTA
  - Industries: Crypto & DeFi (DEX gating, sybil-resistant airdrops, MiCA VASP), Fintech (account opening, PSD2 auth, AML onboarding), Gaming, Healthcare, Marketplaces, Gig Economy, Real Estate, Government

- **Enterprise** — Enterprise-tier product page
  - Route: `/enterprise`
  - Key elements: H1 "Enterprise KYC at any scale"; volume pricing table (1M+, 10M+, 100M+ tiers); white-label API section (branded verification flow screenshot); on-premise deployment architecture diagram; dedicated SLA section; compliance advisory (named advisor + calendar booking); enterprise customer logos grid; contact form (name, company, monthly volume dropdown, message)


---

# Ref: Page Routes

# Verify — Web Pages

All routes on the `verify.solidus.network` domain.

---

## Public Routes

| Route | Page Name | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | Homepage | Primary marketing and acquisition page. Hero, live stats, partner logos, how it works, feature grid, industry verticals, compliance badges, testimonials, pricing preview, developer quickstart, email signup CTA, footer. | No |
| `/pricing` | Pricing | Full pricing page with pay-as-you-go table, subscription plan cards (Startup/Growth/Enterprise), feature comparison table, FAQ accordion, enterprise CTA section. Monthly/annual billing toggle. | No |
| `/security` | Security & Compliance | Trust center. Architecture data-flow diagram, certifications grid (GDPR, SOC 2, ISO 27001, BIPA, MiCA, eIDAS 2, FATF, PCI-DSS), privacy principles (6 cards), audit report downloads. | No |
| `/use-cases` | Use Cases | Industry-specific use cases in a vertical tab layout (8 industries: Crypto & DeFi, Fintech, Banking, Gaming, Healthcare, Marketplaces, Gig Economy, Real Estate, Government). Each shows 3 use cases with code snippets and customer quote. | No |
| `/enterprise` | Enterprise | Enterprise tier page. Volume pricing table, white-label API, on-premise deployment, dedicated SLA, compliance advisory, enterprise customer logos, enterprise contact form. | No |
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
- **`/changelog`** is listed in footer link copy as a planned route. Not defined in the current prototype. Tracked as a P2 feature.
- **`/docs`** routes have no authentication requirement. Developer documentation is fully public. The code examples use placeholder API keys (`sk_live_abc123...`).


---
<!-- ============================================================
END REFERENCE DOCUMENTS — Prototype specification begins below
============================================================ -->

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

### Status Badge (reusable, pill shape)
- Height 24px, horizontal padding 8px, Caption 12/500, `radius-full`
- Verified: bg `rgba(52,199,89,0.15)`, text `#34C759`, border `1px rgba(52,199,89,0.30)`
- Pending: bg `rgba(255,149,0,0.15)`, text `#FF9500`, border `1px rgba(255,149,0,0.30)`
- Failed: bg `rgba(255,59,48,0.15)`, text `#FF3B30`, border `1px rgba(255,59,48,0.30)`
- Processing: bg `rgba(0,102,255,0.15)`, text `#0066FF`, border `1px rgba(0,102,255,0.30)` — icon/loader 10px spinning left of text
- Revoked: bg `rgba(142,142,147,0.15)`, text `#8E8E93`, border `1px rgba(142,142,147,0.30)`

---

## Screen 1: Login / Sign In

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

## Screen 2: Dashboard Overview

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

## Screen 3: Verifications List

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

### Quick Filter Tabs
Above the table card, Horizontal Auto Layout, spacing 4px. `TabPill` × 5:
- "All" (active) / "Verified" / "Pending" / "Failed" / "Processing"
Active tab: `#0066FF` bg, Caption 12/500 white, count badge white. Inactive: `transparent` bg, Caption 12/400 `#8E8E93`, count badge `#48484F`.
Count badges: pill, `#242438` bg, Caption 11/500.

### Empty State (filtered, no results)

Centered in table area: icon/search 48px `#8E8E93` + H3 22/600 white "No verifications found" + Body 14/400 `#8E8E93` "Try adjusting your filters or search query." + "Clear filters" ghost button.

### Zero-result Search

Same empty state but copy: "No results for 'did:solidus:mainnet:0xfff...'" + Body `#8E8E93` "Check the DID format or try a partial match."

---

## Screen 4: Verification Detail

**Route:** `verify.solidus.network/verifications/vsn_9f8e7d6c5b4a3291`

### Breadcrumb
Small 14/400. "Dashboard" `#0066FF` link + "/" `#48484F` + "Verifications" `#0066FF` link + "/" `#48484F` + "vsn_9f8e7d6c" JetBrains Mono 14/400 `#8E8E93`.

### Page Header
Horizontal Auto Layout, Space Between, Alignment Center, margin-bottom 24px.

Left:
- H2 28/600 white "Verification #vsn_9f8e7d6c"
- Below: Small 14/400 `#8E8E93` "Started: 2026-03-17 14:32:08 UTC · Completed: 2026-03-17 14:33:51 UTC · Duration: 1m 43s"

Right: Status badge (large variant, height 32px, padding 0 16px, H3 16/600) — "Verified" green. + "Revoke Credential" danger ghost button (icon/shield-off 16px + "Revoke" Body 14/500 `#FF3B30`, `border: 1px rgba(255,59,48,0.30)`).

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

`EventLogCard` — `#1A1A2E` bg, 8px radius, padding 20 24:
- H3 "Event Log" 16/600 white
- 8 event rows. Each: Caption 11/400 `#48484F` JetBrains Mono timestamp left (80px col) + Body 14/400 white event description right. `border-bottom: 1px #242438`.
- Events: "14:32:08" "Verification session created" · "14:32:09" "Subject DID resolved" · "14:32:10" "Document upload URL generated" · "14:32:14" "Document received (passport_front.jpg)" · "14:32:51" "Liveness session completed" · "14:32:55" "Data extraction completed" · "14:33:48" "Validator consensus confirmed (21-validator committee)" · "14:33:51" "W3C VC issued to did:solidus:mainnet:7a3b..."

### Edge States — Verification Detail

**Processing state:** Status badge "Processing" amber. Steps 1–3 green check. Step 4 shows icon/loader 20px `#0066FF` spinning + "In progress..." amber text. Steps 5–6: icon/circle 20px `#48484F` + text `#48484F`. Credential card body replaced by: dashed `1px #2A2A42` border rectangle, 200px height, icon/lock 32px `#8E8E93` centered + Caption "Credential will appear when verification completes."

**Failed state:** Status badge "Failed" red. H2 red. Steps 1–3 green. Step 3 shows icon/x-circle 20px `#FF3B30` + "Liveness Check Failed" + Caption "Face similarity below threshold (34%). Possible spoofing attempt." Steps 4–6: `#48484F`. Right column shows `FailureAnalysisCard`: amber `Fill: rgba(255,59,48,0.08)`, `border: 1px rgba(255,59,48,0.20)`, padding 16. H3 "Failure Reason" 14/600 `#FF3B30` + Body 14/400 white "Liveness check failed: face similarity score 34% (threshold: 75%)." + Caption `#8E8E93` "Possible causes: low-quality selfie, lighting conditions, or fraudulent attempt." + "Flag for Review" ghost danger button.

---

## Screen 5: New Verification Modal

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

## Screen 6: Analytics

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

### Edge States — Analytics

**New account:** All chart areas — icon/bar-chart-2 48px `#8E8E93` + H3 "No data yet" + Body "Verification data will appear here after your first API call." Each card independently shows this centered in the chart area.

**Export triggered:** "Export Report" button shows 14px spinner. Toast bottom-right: `#1A1A2E` bg, 6px radius, padding 12 16, `box-shadow: 0 8px 24px rgba(0,0,0,0.48)`. icon/download 16px `#34C759` + Body 14/400 white "PDF report ready" + Caption `#8E8E93` "Check your downloads." Slides in from right, 250ms ease-out. Auto-dismiss 4s.

---

## Screen 7: Credential Management

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

## Screen 8: API Keys

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

## Screen 9: Webhooks

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

## Screen 10: Audit Log

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

## Screen 11: Team Members

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

## Screen 12: Billing

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

## Screen 13: Settings

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

## Screen 14: Developer API Reference (Embedded)

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

## Screen 15: Quickstart / Integration Guide

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

## Marketing Screen 16: Homepage (verify.solidus.network)

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

## Marketing Screen 17: Pricing Page

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

### FAQ Section

H2 center 36/700 `#0A1628`: "Frequently asked questions"

5 `FAQItem` accordion (Radix-style): H3 20/600 `#0A1628` question + chevron-down icon right. Expanded: Body 16/400 `#666666` answer below. Divider `1px #E0E0E5`.

Questions:
1. "What counts as a 'verification query'?" — Answer explaining each API call to the /sessions or /credentials endpoints counts as one query.
2. "Can I switch plans mid-month?" — Yes, immediate upgrade; downgrade takes effect at next billing cycle.
3. "What happens if I exceed my plan quota?" — Pay-as-you-go overage at $0.01 per additional query (Startup/Growth). Enterprise: no cap.
4. "Is there a free trial?" — 14-day trial, first 1,000 verifications free, no credit card required.
5. "What's the difference between a 'query' and a 'verification session'?" — One session (a full KYC flow) = one query regardless of how many underlying checks are performed.

### Enterprise CTA

Padding 64 120px. `Fill: #0A1628`.

H2 white center: "Need custom volume, white-label, or on-premise?"
Body white 60% center: "We work with regulated institutions who need custom MSAs, dedicated infrastructure, and a compliance advisor on speed dial."
"Contact Enterprise Sales →" primary button 48px height + "View enterprise features" ghost right, gap 16px.

---

## Marketing Screen 18: Security & Compliance Page

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

### Audit Reports Section

Table: Report Name | Scope | Date | Download.

Rows: "Protocol Security Audit Q1 2026" | Credential issuance + validator consensus | Jan 2026 | Download PDF + Download JSON.

Note: Caption `#666666` "Independent security audits are commissioned quarterly. All reports published in full."

---

## Marketing Screen 19: Use Cases Page

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

## Marketing Screen 20: Enterprise Page

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

## Screen 21: Liveness Verification Flow (User-Facing Hosted Page)

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

## Screen 22: Sign Up

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

## Screen 23: Forgot Password

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

## Screen 24: Reset Password

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

## Screen 25: API Reference — Section Active State

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

## Universal Edge States (applicable to all app screens)

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

## Sample Data Reference (use across all screens)

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
