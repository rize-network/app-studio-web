# App Studio Design System

A design system extracted from **`rize-network/app-studio-web`** — a production-ready React component library built on the `app-studio` runtime. The library ships 40+ accessible, themeable UI components used to build "App Studio" web applications and ADK (Agent Development Kit) interfaces.

> **Source code:** `github.com/rize-network/app-studio-web` (branch: `main`)
> **Package:** `@app-studio/web` (v0.9.97, MIT)
> **Runtime:** `app-studio` ^0.7 — a styled-props runtime similar to styled-system/Chakra
> **Peer deps:** React 18, formik, lucide-react, react-router-dom 6, zustand 4

This folder is the portable design-system snapshot a designer or agent can use to produce on-brand prototypes, slides, and mocks without needing the live repo.

---

## Index

```
├── README.md                 ← you are here
├── SKILL.md                  ← Agent Skill front-matter for Claude Code
├── colors_and_type.css       ← token CSS vars: colors, type, spacing, shadow, radius
├── assets/
│   ├── orange.webp           ← the brand brush-circle (hero LCP image)
│   └── favicon.ico
├── preview/                  ← card HTMLs populating the Design System tab
│   ├── brand.html
│   ├── colors-brand.html     · colors-semantic.html · colors-neutrals.html
│   ├── type-display.html     · type-body.html       · type-scale.html
│   ├── radii.html            · shadows.html         · spacing.html
│   ├── buttons-variants.html · buttons-sizes.html   · buttons-shapes.html   · buttons-animated.html
│   ├── inputs.html           · cards.html           · badges.html          · alerts.html
│   └── icons.html
└── ui_kits/
    └── app_studio_web/
        ├── README.md
        ├── index.html        ← interactive showcase of the library
        └── components.jsx    ← JSX recreations of Button / Card / Input / Badge / …
```

---

## CONTENT FUNDAMENTALS

### Voice & tone
App Studio's product surface reads like **a developer-facing library docs page crossed with a playful hero**. The copy is:

- **Direct and declarative.** "40+ UI Components", "Fully Typed", "Production Ready". Short verb phrases, often framed as badges.
- **Second-person, imperative.** "Click me", "Get Started", "Deploy Now", "Type your message…". The user is always addressed as *you*.
- **Lightly enthusiastic.** A handful of hand-picked emoji in marketing copy only — 🚀 What's Included, 📚 Documentation, ✨ Features, 💡 tip callouts. Never inside components.
- **Mixed languages occur.** The live CookieConsent in `home.page.tsx` shows a French string ("Préférences de personnalisation cliquées") — the product has bilingual FR/EN surfaces in places. Default to English, but expect French in footer/consent UI.
- **Component pages use Lorem Ipsum** for body copy where real content is missing. Do not reproduce this in prototypes; write real copy.

### Casing
- **Sentence case** for titles, headings, buttons: *"Get Started"*, *"Discover our features"*, *"Theme Test Page"*.
- **Title Case** for short labels in lists/tables: *"Primary Button"*, *"Outline Button"*.
- **lowercase code-style** for token names: `theme-primary`, `color-blue-500`, `color-gray-100`.

### Emoji
Reserved for **marketing / docs / system callouts**: 🚀 📚 ✨ 💡. Never used in production UI components, button labels, or empty states. Do not add emoji to Button children, Badge labels, or Alert copy.

### Examples (from the codebase)
- Hero title: **"App-Studio"** — branded with hyphen, bold, tight letter-spacing (-1.5px at 110px)
- Hero subtitle: **"Discover our features"**
- CTA pair: **"Get Started"** (filled) + **"Deploy Now"** (outline)
- Info callout: *"💡 Try typing @ to see mention auto-completion! (e.g., @john_doe)"*
- Status text: *"AI is thinking…"* (italic, muted)
- Feature headline: *"Bundle analyzer plugin"* · description: *"Optimize your React JS application's performance and reduce bundle size."*

---

## VISUAL FOUNDATIONS

### Colors
- **Brand accent: `#F97316`** (color-orange-500). Declared as `<meta name="theme-color">` in `index.html` and used in brand imagery.
- **Default theme primary: `#1D4ED8`** (color-blue-700), secondary `#A855F7` (color-purple-500) — set by the `ThemeProvider` in `src/providers/index.tsx`. The library supports per-app overrides; brand marketing leans orange, component pages lean blue.
- **Full Tailwind-style palette is available** through `color-<hue>-<step>` tokens: blue, purple, indigo, pink, red, amber, emerald, green, orange, gray, warmGray.
- **Neutrals = Tailwind gray scale** (50–900). `warmGray-500` (#78716C) shows up as the hero text color.
- **Smart contrast** — the runtime's `useTheme()` returns a `getColorHex()` helper that resolves either mode-agnostic (`color-*`), light-mode-locked (`light-*`), dark-mode-locked (`dark-*`), or semantic (`theme-*`) tokens.

### Dark mode
First-class. `ThemeProvider` accepts `mode="light" | "dark"`, toggled via a `ThemeModeContext`. Cards, Buttons, etc. each have a `getXVariants(themeMode)` that swaps backgrounds (`color-white` ↔ `color-gray-900`) and borders (`gray-200` ↔ `gray-700`).

### Typography
- **Primary font: `Mulish`** — loaded from Google Fonts in `index.html`, weights 400/500/600/700.
- **Documented fallback: "Inter/Geist"** — the component style files' JSDoc comments reference Inter/Geist, but no Inter/Geist files ship and no `@font-face` loads them. Treat Mulish as the source of truth; Inter is a safe web fallback on systems without Mulish.
- **Body scale** (`xs`→`xl`): 10/12/14/16/20 px with line-heights 12/16/20/24/28 — note that **the xs size is 10 px**, unusually small; use sparingly for captions/meta only.
- **Display scale** (responsive, hero): 48 / 96 / 110 px with negative letter-spacing (-1.5px at 110px).
- **Weights used:** 400 (regular), 500 (medium — button default), 600 (semibold — headings), 700 (bold — hero).
- **Letter-spacing:** `-0.01em` on buttons; `-1.5px` on display.

### Spacing & grid
- **4 px grid.** Button padding = `lineHeight / 2`; card padding = 12/16/24 (3/4/6 units). Component gaps are 8/12/16/20/24/30/60.
- **Breakpoints** (`ResponsiveProvider`): xs 0, sm 340, md 560, lg 1080, xl 1300.
- **Device groups:** mobile = xs+sm, tablet = md+lg, desktop = lg+xl. Components accept a `media={{mobile:…, tablet:…, desktop:…}}` prop for breakpoint-scoped overrides.

### Radius
`ButtonShapes`/`CardShapes` define three canonical shapes:
- `square: 0`
- `rounded: 8px` — **default**
- `pill: 999px` (button) / `24px` (card, which is really a large radius, not fully round)

Chat messages and hero cards commonly use `12px` or `16px` directly.

### Shadows / elevation
Three elevation steps, defined inline in `Card.style.ts`:
- **none** (default / outlined)
- **sm on hover** — `0 1px 3px rgba(0,0,0,.05)`
- **md resting** — `0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)`
- **lg on hover of elevated** — `0 4px 6px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.06)`
- **xl for chat containers** — `0 10px 15px -3px rgba(0,0,0,.10)`
- Dark mode uses stronger opacity (.30–.40) to read on dark surfaces.

No inner shadows. No glows except optional `Title` highlight effects.

### Borders
- **1 px solid** borders are the norm. `color-gray-200` in light, `color-gray-700` in dark.
- Outline buttons use the main color at 1px.
- Focus ring is a **2-layer box-shadow**: `0 0 0 2px white, 0 0 0 4px <color>`. This is a signature detail — keep it in any new components.

### Hover / press states
- **Hover:** opacity .9 (filled/outline/ghost), opacity .8 (link). Subtle variant uses `color-mix(in srgb, <color> 15%, transparent)`.
- **Active:** opacity .95, or darker color-mix (subtle). No scale/squash.
- **Transitions:** `background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease` — consistent 200 ms ease across the system.

### Animation
The library stays **subtle by default** (200ms fades) but ships a set of opt-in flourishes:
- **Button animations** (`animation` prop): `borderMoving` (animated gradient border, ~2s linear loop, default palette `#705CFF / #FF5C97 / #FFC75C`), `animatedStroke` (SVG rect with stroke-dashoffset drawing on hover), `borderReveal` (four sides reveal in sequence on hover).
- **Title animations:** `highlightTypewriter`, `highlightSlide`, `alternateHighlightText` for swapping between words.
- **Loaders:** `spinner`, `points`, `points-opacity`.

Avoid bounces or springs — easing is **`ease` / `linear`**, duration 200–500ms for micro, ~2s for looping decorations.

### Backgrounds, imagery, layering
- **Hero pattern:** the signature move is a **full-bleed orange hand-drawn brush-circle** (`orange.webp`) behind the hero title. Content sits inside the ring. It reads warm, studio-ish, a bit crafty.
- **No gradients** in production UI except the Button `borderMoving` gradient (marketing only) and `Title` gradient highlights (opt-in).
- **No protection gradients / scrims** — text sits directly over the transparent WebP on white.
- **No repeating patterns or textures** beyond the single brush-circle.
- **Imagery vibe:** warm orange, slightly rough, high-contrast against white. Otherwise the system is clean neutral.

### Transparency & blur
Rare. `color-mix` for tinted subtle-button backgrounds (5%, 15%, 20%, 40% depending on hover/reversed). No backdrop-blur/frosted-glass surfaces.

### Layout rules
- **Fixed elements:** the cookie consent (`position="bottom"`), the chat info bar (top of container).
- **Cards** have three layered parts — `Card.Header` / `Card.Content` / `Card.Footer` — with an internal `border-bottom` / `border-top` between them in default gray-100 / gray-800.
- **Sidebars** exist (`Sidebar` component) but are not shown in the hero — a library surface pattern, not a marketing one.

---

## ICONOGRAPHY

**System: [Lucide](https://lucide.dev)** (`lucide-react` ^0.562.0, listed as a peer dependency). The library wraps Lucide in a single `<Icon name="...">` component that lazy-loads icons from `lucide-react/dynamicIconImports`.

- **Stroke style, not filled** — `filled={false}` by default, `strokeWidth={1}` default, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- **Sizing via `size` or `widthHeight`**, default 24px. The Button component ships its own icon pads: 16/20/24/24/28 for xs→xl.
- **Named aliases** exported for common icons: `UserIcon`, `HomeIcon`, `SearchIcon`, `SettingsIcon`, `SendIcon`, `AttachmentIcon`, `MicrophoneIcon`, `CloseIcon`, `ChevronIcon`, etc. — full list in `ui_kits/app_studio_web/components.jsx`.
- **No built-in icon font or sprite** — everything is React-lazy SVG.
- **No emoji in component UI.** Brand/marketing sometimes uses 🚀 ✨ 📚 💡 but only in docs and top-level feature lists.
- **Unicode chars** are not used as icon substitutes anywhere.

For this design-system folder we load Lucide from CDN in preview HTMLs:
```html
<!-- Lucide web build, ~35 KB gzipped -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```
Icons are referenced as `<i data-lucide="user"></i>`, `<i data-lucide="send"></i>`, etc. This matches the same Lucide set the library uses.

### Brand assets
- `assets/orange.webp` — 1000×1000 transparent WebP, the hand-drawn orange circle. Use full-bleed behind hero sections, or as a decorative watermark at ~0.6 opacity.
- `assets/favicon.ico` — 64px multi-size favicon.

No wordmark / logo file ships with the repo beyond the favicon; the brand name "App-Studio" (with hyphen) is set in type, bold Mulish.

---

## Font substitution note
The hosted app loads **Mulish** from Google Fonts and no local TTFs ship in the repo. This design system also uses **Mulish via Google Fonts CDN** in `colors_and_type.css`. The component style JSDoc references Inter/Geist as a documented intent but the repo never configured them — **if you want Inter/Geist instead, please supply TTFs and we'll swap the CSS import.**

---

## Using this design system

1. **Link the CSS once:** `<link rel="stylesheet" href="colors_and_type.css">`
2. **Set mode:** `<html data-theme="light">` (or `"dark"`).
3. **Use the token vars:** `background: var(--color-white); color: var(--theme-text); border-radius: var(--radius-md); box-shadow: var(--shadow-md);`
4. **For components, pull from `ui_kits/app_studio_web/components.jsx`** — these are simplified JSX recreations of Button, Card, Input, Badge, Alert, Chat Input, etc. with the same visual behavior as the library.
5. **For icons, load Lucide from CDN** and reference by name.
