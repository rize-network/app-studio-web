# Generating a Design-System Config — Agent Guide

This is a **prescriptive recipe** for an AI agent (or a human) to generate a new
brand design-system config from scratch. Follow it top to bottom and you will
produce a single JSON file that renders correctly in **both light and dark
mode** across every component — with **no component code changes** and **no
light/dark branching**.

> **Mental model.** A config is *data*. Components are *dumb consumers* — they
> read tokens and do their job, nothing more. All the intelligence lives in the
> **shape of the values you choose**. Get the tokens right and dark mode,
> contrast, and brand identity all fall out automatically.

If you want the deep "how the resolver works" reference, read
[theming.md](./theming.md). This doc is the **build instructions**; theming.md
is the **physics**.

---

## 0. TL;DR — the five rules that make a config coherent

1. **Stay vs adapt is decided by the value's *form*.**
   - **Raw hex** (`"#2563eb"`) → **constant** in both modes. Use for brand identity.
   - **`color-*` token** (`"color-black"`) → **flips** automatically. Use for structural neutrals.
2. **Brand colors are FILLS, not foreground.** `theme-primary` paints a
   background and pairs with `theme-onPrimary` ink. **Never** use `theme-primary`
   as the text/border color of something sitting directly on a surface — for a
   black/white brand it collides with the surface and vanishes.
3. **Surface-contrasting foreground uses neutrals.** Body text, borders,
   dividers, helper text → `theme-text` / `theme-muted` / `theme-border` (or the
   `color-*` neutrals). These flip with the surface, so they stay readable on any
   brand in any mode.
4. **`primary` and `onPrimary` must use the *same form*.** Both hex, or both
   `color-*`. That keeps the fill and its ink flipping together (or staying
   together) so the label never disappears.
5. **Never put a token into a raw inline `style={{}}` or a gradient string.** The
   resolver only runs on component **props**. Tokens in raw CSS silently break
   (fine for hex, invisible for `color-*`). This rule is about *consuming* configs;
   you don't hit it while authoring one, but it's why neutrals must be tokens.

Everything below is an expansion of these five rules.

---

## 1. What you are producing

- **One file:** `src/design-system/configs/<brand>.json`.
- **One registration line** in `src/design-system/configs/index.ts`.

The fastest correct path is: **copy `default.json`, then change values** — its
structure is already coherent. Do not invent a new shape.

```bash
cp src/design-system/configs/default.json src/design-system/configs/<brand>.json
```

The file has exactly five top-level keys, in this order:

```jsonc
{
  "metadata":   { ... },   // identity + fonts
  "theme":      { ... },   // the 11 semantic color slots  ← the heart of the config
  "tokens":     { ... },   // typography, spacing, radii, shadows (mostly tooling)
  "components": { ... },   // per-component slot overrides
  "personality":{ ... }    // non-color brand cues (shape, weight, density, motif)
}
```

The TypeScript contract is [`DesignSystemConfig`](../../src/design-system/types.ts) —
keep it valid against that.

---

## 2. `metadata`

```jsonc
"metadata": {
  "id": "acme",                                  // unique kebab id; MUST match the filename and the index.ts key
  "label": "Acme",                               // human label shown in the showcase switcher
  "sourcePath": "",                              // optional reference URL/path; "" is fine
  "sourceTitle": "Acme brand system (light + dark)",
  "defaultAppearance": "light",                  // which mode the brand opens in: "light" | "dark"
  "googleFontLinks": [                           // REQUIRED if typography.fontFamily names a web font
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
  ]
}
```

- `defaultAppearance` only sets the **opening** mode — the config still works in
  both. Pick the mode that flatters the brand (e.g. SpaceX → `dark`).
- **Every font family referenced in `tokens.typography` must be loaded** via
  `googleFontLinks`, or it silently falls back to the next family in the stack.

---

## 3. `theme` — the 11 slots (the part that matters most)

Eleven slots. Each is either a **constant hex** or an **adaptive `color-*`
token**. This single block serves light *and* dark — you never write a second
config.

```jsonc
"theme": {
  "primary":   "#2563eb",        // hex → CONSTANT brand color (CTAs, links, focus)
  "secondary": "#7c3aed",        // hex → CONSTANT accent
  "success":   "#16a34a",        // hex → CONSTANT
  "warning":   "#d97706",        // hex → CONSTANT
  "error":     "#dc2626",        // hex → CONSTANT
  "onPrimary": "#ffffff",        // hex → CONSTANT ink that sits on `primary`

  "canvas":    "color-white",    // token → ADAPTS: white in light, black in dark
  "surface":   "color-gray-50",  // token → ADAPTS: near-white → near-black
  "text":      "color-black",    // token → ADAPTS: black in light, white in dark
  "muted":     "color-gray-500", // token → ADAPTS: readable mid-grey in both
  "border":    "color-gray-200"  // token → ADAPTS: hairline in both
}
```

### 3.1 The decision table

| Slot | Role | Form | Why |
|------|------|------|-----|
| `primary` | Brand CTA / link / focus | **hex** | Brand identity, same in both modes |
| `secondary` | Supporting accent | **hex** | Same |
| `success` / `warning` / `error` | Status accents | **hex** | Same |
| `onPrimary` | Ink on top of `primary` | **hex** | Contrast for the primary fill |
| `canvas` | Page background | **`color-*`** | Must flip to go dark |
| `surface` | Card / elevated background | **`color-*`** | Must flip |
| `text` | Primary ink / body copy | **`color-*`** | Must flip to stay readable |
| `muted` | Secondary ink (captions, helper) | **`color-*`** | Must flip |
| `border` | Hairlines, dividers, control borders | **`color-*`** | Must flip |

### 3.2 Hard constraints (verify these)

- **`primary` and `onPrimary` use the same form.** Both hex (typical), or both
  `color-*`. Never mix — a hex fill with a flipping ink (or vice-versa) loses its
  label in one mode.
- **`onPrimary` actually contrasts `primary`.** ≥ 4.5:1. Usually `#ffffff` for a
  mid/dark `primary`; use `#000000` for a light/vivid `primary` (e.g. a bright
  green or yellow).
- **`primary` reads on *both* `canvas` colors.** Since `primary` doesn't flip, a
  hue chosen only for white can wash out on black. Aim for ≥ 3:1 against **both**
  white and black. Most mid-tone brand colors pass; very light or very dark ones
  don't (see monochrome brands, §3.3).
- **Body ink is never a brand slot.** Use `text` / `muted` for copy. A constant
  dark `secondary` used as text becomes invisible on a dark canvas.

### 3.3 Monochrome / black-or-white brands (Nike, Vercel, Uber, SpaceX…)

A brand whose primary *is* black or white is the one case the form rule has to be
applied deliberately. Two valid strategies — pick one and be consistent:

| Strategy | `primary` | `onPrimary` | Result |
|----------|-----------|-------------|--------|
| **A — Constant brand (recommended)** | `"#111111"` (hex) | `"#ffffff"` (hex) | CTA stays the **same** black/white in both modes. Brand-stable. |
| **B — Adaptive monochrome (authentic Vercel/Linear)** | `"color-black"` | `"color-white"` | CTA **inverts**: black-on-light, white-on-dark. |

- Either way, **both forms match** (A = both hex, B = both `color-*`) — that's
  rule 4.
- **Do not** then reuse `primary` for outline/ghost foreground or icons — on the
  matching surface it disappears. For those, use `theme-text` (which flips with
  the surface) or a chromatic `secondary`. This is the bug that makes an "outline
  badge" vanish on the dark card.

### 3.4 Give neutrals character without breaking the flip

Swap the grey *family* — the shade still inverts, only the hue changes:

- `color-slate-*` (cool blue-grey), `color-stone-*` (warm), `color-zinc-*`,
  `color-neutral-*`.

```jsonc
"surface": "color-slate-50", "muted": "color-slate-500", "border": "color-slate-200"
```

**Valid shades:** `50, 100, 200, 300, 400, 500, 600, 700, 800, 900` only.
`920` / `950` / `960` etc. are **not valid** and will fail to resolve.

---

## 4. `tokens`

Mostly typography (functional) plus documentation/tooling arrays.

```jsonc
"tokens": {
  "rawCssVars": { "primary": "#2563eb", "secondary": "#7c3aed", ... },  // descriptive mirror of brand hexes
  "colors": [ { "name": "primary", "value": "#2563eb", "role": "primary" }, ... ], // descriptive
  "typography": {
    "fontFamily": "'Inter', system-ui, -apple-system, sans-serif",       // FUNCTIONAL — used by components
    "monoFamily": "ui-monospace, 'SF Mono', Menlo, monospace",
    "fontSizes":   ["12px","13px","14px","16px","18px","22px","28px","36px","48px","64px"],
    "fontWeights": ["400","500","600","700","800"],
    "lineHeights": ["1.0","1.1","1.2","1.4","1.5","1.6"]
  },
  "spacing": ["2px","4px","8px","12px","16px","24px","32px","48px","64px"],  // 4px grid, documentation
  "radii":   ["2px","4px","6px","8px","12px","16px","9999px"],               // documentation
  "shadows": [                                                                // lightest first; components pick by index
    "0 1px 2px rgba(0,0,0,0.04)",
    "0 4px 12px rgba(0,0,0,0.08)",
    "0 12px 32px rgba(0,0,0,0.12)"
  ]
}
```

- **`typography.fontFamily` / `monoFamily` are the only fields components read at
  runtime.** Always end the stack with a system fallback (`system-ui`,
  `sans-serif`) so a missing web font degrades gracefully. List any web font in
  `metadata.googleFontLinks`.
- `rawCssVars`, `colors`, and the `spacing` / `radii` / `shadows` arrays are
  reference/tooling material — keep them consistent with the brand but they don't
  drive rendering on their own.

---

## 5. `components` — per-slot overrides

Each component has a top-level config (variant/size/shape) plus a `views` map of
named slots. Use overrides to apply the brand's **shape, font, and accent
tokens** — **not** to re-specify colors a component already handles correctly.

**The token-role rule for every slot:**

| What the slot paints | Use | Examples |
|----------------------|-----|----------|
| A **filled** element's background + its ink | `theme-primary` + `theme-onPrimary` | filled badge/button, checkbox `_checked`, radio `dot`, slider `progress`, progress `bar` |
| A **surface** background | `theme-surface` / `theme-canvas` or a `color-*` neutral | card/input/table/accordion container |
| A **border / divider** | `theme-border` or `color-gray-200` | container borders, separators, table lines |
| **Body / heading ink** on a surface | `theme-text` or `color-black`, or `"inherit"` | titles, cell text, labels |
| **Secondary ink** | `theme-muted` or `color-gray-500` | helper text, captions, descriptions |
| A **brand-colored accent foreground** | `theme-primary` **only for chromatic brands** | active-tab label, link, alert icon |

> **The trap:** using `theme-primary` for *foreground on a surface* (an outline
> border, a link, an active-tab label) looks great for a blue brand and
> **disappears** for a black/white brand, because their `primary` equals the
> surface in one mode. If the brand is monochrome, switch those to `theme-text`
> or `theme-secondary`.

Example — a button override that changes only shape/typography and keeps the
correct fill tokens:

```jsonc
"button": {
  "variant": "filled", "size": "md", "shape": "rounded",
  "color": "theme-primary", "textColor": "theme-onPrimary",
  "views": {
    "container": {
      "borderRadius": 8,
      "fontFamily": "'Inter', system-ui, sans-serif",
      "fontWeight": 600,
      "borderColor": "theme-primary",
      "letterSpacing": "-0.01em"
    }
  }
}
```

**Do not lock `label.color`** on form controls (Checkbox, Radio, Switch,
FieldLabel, StatusIndicator, Table cells). Omit it so the component's `inherit`
default carries the surrounding ink — see
[component-library.md §7.2](./component-library.md).

The complete slot map for all 22 overridable components is the
[`default.json`](../../src/design-system/configs/default.json) you copied —
treat it as the canonical template and change values slot-by-slot. The component
name list and slot types are in [types.ts](../../src/design-system/types.ts)
(`DesignSystemComponentName`).

---

## 6. `personality` — non-color brand cues

Pages and composition helpers read these for brand character that 11 colors can't
express. Keep it; tune the values.

```jsonc
"personality": {
  "cornerStyle": "soft",        // "sharp" | "soft" | "pill"
  "typeWeight": "regular",      // "light" | "regular" | "bold" | "black"
  "typeCase": "normal",         // "normal" | "uppercase"
  "typeStyle": "normal",        // "normal" | "italic"
  "letterSpacing": "-0.01em",
  "accentTreatment": "flat",    // "flat" | "gradient" | "stripe" | "glow" | "halftone"
  "signatureMotif": "●",        // a glyph used as a brand tick/bullet
  "density": "comfortable",     // "tight" | "comfortable" | "spacious"
  "surfaceTone": "paper",       // "paper" | "glass" | "matte" | "mono"
  "cardRadius": 12, "pillRadius": 9999, "badgeRadius": 6,
  "voice": "neutral-clear"      // free-text descriptor used to pick brand copy
}
```

Match these to the brand: Nike → `cornerStyle: "sharp"`, `typeCase: "uppercase"`,
`typeWeight: "black"`; Revolut/Spotify → `cornerStyle: "pill"`.

---

## 7. Register the config

Add two lines to [`src/design-system/configs/index.ts`](../../src/design-system/configs/index.ts):

```ts
import acme from './acme.json';            // 1. import

export const designSystemConfigs = {
  // ...
  acme: acme as DesignSystemConfig,        // 2. register (key MUST equal metadata.id)
};
```

That makes it available as `configId="acme"` and adds it to the showcase
switcher. Use it anywhere:

```tsx
<DesignSystemProvider configId="acme">
  <App />
</DesignSystemProvider>
```

---

## 8. Validation checklist (self-check before you finish)

Run through every item — these map 1:1 to the failure modes this system has hit:

- [ ] **JSON is valid** and matches `DesignSystemConfig` (5 top-level keys).
- [ ] `metadata.id` === filename === `index.ts` key.
- [ ] **`canvas`, `surface`, `text`, `muted`, `border` are `color-*` tokens** (they MUST flip).
- [ ] **`primary`, `secondary`, `success`, `warning`, `error`, `onPrimary` are hex** (constant) — *unless* you chose monochrome Strategy B for `primary`/`onPrimary` (then both are `color-*`).
- [ ] **`primary` and `onPrimary` use the same form.**
- [ ] `onPrimary` contrasts `primary` ≥ 4.5:1.
- [ ] `primary` reads ≥ 3:1 on **both** white and black.
- [ ] **No `color-*` shade outside `50…900`.** No `920/950/960`.
- [ ] **No brand slot used as body ink**; body uses `text` / `muted`.
- [ ] **No `theme-primary` used as foreground-on-surface for a monochrome brand** (use `theme-text` / `theme-secondary`).
- [ ] Every font in `typography` is listed in `metadata.googleFontLinks`; the stack ends in a system fallback.
- [ ] `label.color` is **omitted** on form-control overrides (let `inherit` work).
- [ ] Registered in `index.ts`.
- [ ] **Eyeball both modes** in the showcase — toggle light/dark and confirm: no invisible text, no white-on-white, no vanished outlines, filled CTAs keep readable labels.

---

## 9. Anti-patterns (do NOT do these)

| ❌ Anti-pattern | Why it breaks | ✅ Instead |
|----------------|---------------|-----------|
| `"text": "#111111"` | Frozen dark ink → invisible on dark canvas | `"text": "color-black"` |
| `"canvas": "#ffffff"` | Frozen white page → never goes dark | `"canvas": "color-white"` |
| `"primary": "color-blue-600"` for a chromatic brand | Brand color shifts between modes unexpectedly | `"primary": "#2563eb"` (hex, constant) |
| `primary` hex + `onPrimary` `"color-white"` | Mismatched forms → label flips off the fill | Same form for both |
| `theme-primary` as outline/link color on a **black** brand | Collides with the surface, vanishes | `theme-text` or `theme-secondary` |
| Writing a separate `<brand>.dark.json` | Unnecessary; dark is derived | One config, adaptive tokens |
| Adding `appearance === 'dark' ? … : …` anywhere | The system flips for you via tokens | Use the right token form |
| `color-gray-950` | Invalid shade | `color-gray-900` |

---

## 10. Minimal valid template (copy, then fill in)

```jsonc
{
  "metadata": {
    "id": "acme", "label": "Acme", "sourcePath": "",
    "sourceTitle": "Acme brand system (light + dark)",
    "defaultAppearance": "light",
    "googleFontLinks": ["https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"]
  },
  "theme": {
    "primary": "#2563eb", "secondary": "#7c3aed",
    "success": "#16a34a", "warning": "#d97706", "error": "#dc2626",
    "onPrimary": "#ffffff",
    "canvas": "color-white", "surface": "color-gray-50",
    "text": "color-black", "muted": "color-gray-500", "border": "color-gray-200"
  },
  "tokens": {
    "rawCssVars": { "primary": "#2563eb", "secondary": "#7c3aed", "success": "#16a34a", "warning": "#d97706", "error": "#dc2626" },
    "colors": [
      { "name": "primary", "value": "#2563eb", "role": "primary" },
      { "name": "secondary", "value": "#7c3aed", "role": "secondary" }
    ],
    "typography": {
      "fontFamily": "'Inter', system-ui, -apple-system, sans-serif",
      "monoFamily": "ui-monospace, 'SF Mono', Menlo, monospace",
      "fontSizes": ["12px","13px","14px","16px","18px","22px","28px","36px","48px","64px"],
      "fontWeights": ["400","500","600","700","800"],
      "lineHeights": ["1.0","1.1","1.2","1.4","1.5","1.6"]
    },
    "spacing": ["2px","4px","8px","12px","16px","24px","32px","48px","64px"],
    "radii": ["2px","4px","6px","8px","12px","16px","9999px"],
    "shadows": ["0 1px 2px rgba(0,0,0,0.04)","0 4px 12px rgba(0,0,0,0.08)","0 12px 32px rgba(0,0,0,0.12)"]
  },
  "components": {
    "button": {
      "variant": "filled", "size": "md", "shape": "rounded",
      "color": "theme-primary", "textColor": "theme-onPrimary",
      "views": { "container": { "borderRadius": 8, "fontWeight": 600, "borderColor": "theme-primary" } }
    },
    "card": {
      "variant": "outlined", "shape": "rounded",
      "views": {
        "container": { "backgroundColor": "color-gray-50", "borderColor": "color-gray-200", "color": "color-black", "borderRadius": 12 },
        "header": { "color": "color-black", "borderColor": "color-gray-200" },
        "content": { "color": "color-gray-500" }
      }
    }
  },
  "personality": {
    "cornerStyle": "soft", "typeWeight": "regular", "typeCase": "normal", "typeStyle": "normal",
    "letterSpacing": "-0.01em", "accentTreatment": "flat", "signatureMotif": "●",
    "density": "comfortable", "surfaceTone": "paper",
    "cardRadius": 12, "pillRadius": 9999, "badgeRadius": 6, "voice": "neutral-clear"
  }
}
```

> Start from the **full** [`default.json`](../../src/design-system/configs/default.json)
> (all 22 component overrides), not this minimal one, unless you have a reason to
> omit components — missing components simply fall back to library defaults.

---

## See also

- [theming.md](./theming.md) — how the token resolver and CSS-variable flip work.
- [component-library.md](./component-library.md) — authoring components against the system.
- [types.ts](../../src/design-system/types.ts) — the `DesignSystemConfig` contract.
- [configs/](../../src/design-system/configs/) — 15 shipped brand configs to learn from.
