# Building a Component Library on top of the Design System

This document explains the design-system architecture in [src/design-system/](../../src/design-system/) and shows how to author new components so they automatically pick up brand-specific tokens (colors, typography, spacing, radii, shadows), component-level overrides (variant, size, shape, views), and the brand-personality DNA that drives layout-level decisions.

You should be able to drop a component into the library and have it correctly render under any of the 15 shipped brand configs (`airbnb`, `apple`, `coinbase`, `figma`, `linear`, `nike`, `notion`, `revolut`, `shopify`, `spacex`, `spotify`, `stripe`, `tesla`, `uber`, `vercel`) without touching a single config file.

---

## 1. Mental model

```
┌──────────────────────────────────────────────────────────────────┐
│                       DesignSystemProvider                       │
│  React context holding a single DesignSystemConfig               │
│  + emits brand CSS variables (--theme-primary, …) on a wrapper   │
└──────────────────────────────────────────────────────────────────┘
              │                                │
              ▼                                ▼
   ┌──────────────────────┐         ┌──────────────────────────┐
   │  useDesignSystem()   │         │  useMergedDesign...      │
   │  → { config, ... }   │         │  ComponentProps(name,    │
   └──────────────────────┘         │  props)                  │
                                    │  → merged props          │
                                    └──────────────────────────┘
                                              │
                                              ▼
                              ┌────────────────────────────────┐
                              │  ComponentView                 │
                              │  Renders with merged values    │
                              │  Resolves theme-* tokens via   │
                              │  CSS variables                 │
                              └────────────────────────────────┘
```

A `DesignSystemConfig` is a plain JSON object with **five** sections (the fifth is new):

| Section        | Holds                                                                                          |
|----------------|------------------------------------------------------------------------------------------------|
| `metadata`     | `id`, `label`, `sourcePath`, `defaultAppearance` (`light` / `dark`), optional Google Font links |
| `theme`        | 11 semantic colors: `primary`, `secondary`, `success`, `warning`, `error`, `canvas`, `surface`, `text`, `muted`, `border`, `onPrimary` |
| `tokens`       | Raw extracted material: `rawCssVars`, `colors[]`, `typography`, `spacing[]`, `radii[]`, `shadows[]` |
| `components`   | Per-component defaults: `{ variant, size, shape, color, views: { container, label, ... } }`    |
| `personality`  | **New.** Brand DNA: corner style, type weight/case, accent treatment, signature motif, density |

A component reads three things at render time:
1. **Theme tokens** — via `theme-primary`, `theme-canvas`, etc. These are **resolved by app-studio's color resolver**, which the DesignSystemProvider configures with the active brand's `theme` block. Same token, different per-brand value — no per-component branching.
2. **Component config** — via `useMergedDesignSystemComponentProps(name, props)`, which deep-merges the user's explicit props *over* the active brand's defaults.
3. **Personality** (optional) — via `config.personality` when a page or component needs layout-level brand cues (e.g., sharp vs pill corners, uppercase tracked headlines, glow accents).

---

## 2. The provider

[src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx) exposes:

```ts
<DesignSystemProvider config={airbnbConfig}>          // by config object
<DesignSystemProvider configId="airbnb">              // by id (looks up in designSystemConfigs)
<DesignSystemProvider />                              // falls back to defaultDesignSystemConfig
```

Under the hood the provider:
1. Stores the active config in React context (so `useDesignSystem()` and `useMergedDesignSystemComponentProps(...)` can reach the active brand).
2. **Delegates token resolution to app-studio's `<ThemeProvider>`** — it passes `theme={config.theme}` and `mode={config.metadata.defaultAppearance}`, plus `transparentWrapper` so the inner provider doesn't repaint the page. app-studio iterates the theme object and emits one `--theme-<slot>` CSS variable per key (`--theme-primary`, `--theme-canvas`, `--theme-surface`, `--theme-text`, `--theme-muted`, `--theme-border`, `--theme-on-primary`, `--theme-secondary`, `--theme-success`, `--theme-warning`, `--theme-error`, plus any extras you add). When a component requests `theme-primary` (via app-studio's color resolver — `getColor`, `<Element backgroundColor="theme-primary" />`, …), the resolver returns `var(--theme-primary)`, which the browser resolves to the brand's hex.
3. Sets `data-design-system="<id>"` and `data-appearance="light|dark"` on a `display:contents` child for downstream CSS targeting.

That **app-studio handles the resolution end-to-end**: brand `theme` block → `--theme-*` CSS variables → `getColor('theme-primary')` → `var(--theme-primary)` → resolved hex. There is no hand-rolled style injection inside DesignSystemProvider — it's a thin React-context layer plus a single delegation to `<ThemeProvider>`.

> **Why the indirection?** Two reasons:
> 1. The app's root `<ThemeProvider>` (in `providers/index.tsx`) sets the default theme. The DesignSystemProvider nests inside it and overrides `--theme-*` for its subtree only, so the rest of the app keeps its global theme.
> 2. app-studio's resolver knows how to handle `theme-primary-100` (alpha suffix), `theme-primary` (token reference inside theme objects), and other token shapes uniformly. Reimplementing the resolver per design-system would drift.

Hooks:

```ts
useDesignSystem()                          // → { config, configId, isEnabled }
useDesignSystemComponentProps(name)        // → component config block (variant, size, views, ...)
useMergedDesignSystemComponentProps(name, props)
                                           // → props deep-merged with config defaults; explicit props always win
```

Switching brand at runtime is just a state update of the `config` (or `configId`) prop. Components below re-render with the new tokens, and the CSS variables on the wrapper update — so theme-token references flip across the entire subtree.

> **Pro tip.** When swapping config under a stateful component tree, force-remount with a `key={config.metadata.id}` to flush internal state from useState/useEffect/useRef hooks (e.g., Tabs' active-tab state, Title's `useTitleState`). Otherwise transitive caches can stick to the old brand. The design-system page does exactly this on its `<Showcase>` host.

---

## 3. Config structure in detail

### 3.1 `metadata`
```jsonc
{
  "id": "airbnb",
  "label": "Airbnb",
  "sourcePath": "design.md/html/airbnb.html",
  "defaultAppearance": "light",
  "googleFontLinks": [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
  ]
}
```

`googleFontLinks` is consumed by `<Helmet>` in the showcase to inject brand-specific web fonts. **Only load fonts you actually reference** in `tokens.typography.fontFamily` — Nike's config used to load `Bebas+Neue` even though the font chain pointed elsewhere. Verify alignment when you add a brand.

### 3.2 `theme` (11 semantic colors — the single source of truth)
```jsonc
{
  // Brand identity — raw hex → stays constant in light AND dark
  "primary":     "#ff385c",
  "secondary":   "#7c3aed",
  "success":     "#16a34a",
  "warning":     "#d97706",
  "error":       "#dc2626",
  "onPrimary":   "#ffffff",

  // Structural neutrals — color-* token → flips automatically with the mode
  "canvas":      "color-white",    // white in light, black in dark
  "surface":     "color-gray-50",  // near-white in light, near-black in dark
  "text":        "color-black",    // black in light, white in dark
  "muted":       "color-gray-500", // readable mid-grey in both
  "border":      "color-gray-200"  // light hairline → dark hairline
}
```

`theme` is the **only** place these eleven roles are defined. Everything else — `tokens.colors[]`, `components.*.views`, page-level inline styles — references them via `theme-*` token strings. Change one value here and every button, badge, focus ring, link, and surface updates across the design-system page.

The **form of each value** decides its light/dark behaviour — this is the heart of the adaptive system ([theming.md §2.1](./theming.md#21-one-config-both-modes--the-adaptive-rule)):

- **Raw hex** (`"#ff385c"`) → constant across modes. Use for brand slots: `primary`, `secondary`, `success`, `warning`, `error`, `onPrimary`.
- **`color-*` token** (`"color-black"`) → flips automatically. Use for structural neutrals: `canvas`, `surface`, `text`, `muted`, `border`.

This is why one config serves both modes: the brand colours stay put while the neutrals invert. Do **not** hand-author a second dark config, and do **not** put a constant dark hex in `text`/`canvas` — that's what breaks a "light" brand the moment the user toggles to dark.

### 3.3 `tokens` (raw extracted material)
```jsonc
{
  "rawCssVars": { "--rausch": "#ff385c", "--space-3": "8px", ... },
  "colors":   [ { "name": "rausch", "value": "#ff385c", "role": "primary" }, ... ],
  "typography": {
    "fontFamily": "'Inter', system-ui, sans-serif",
    "monoFamily": "ui-monospace, SF Mono, monospace",
    "fontSizes":   ["12px","14px","16px","18px","24px","32px","48px"],
    "fontWeights": ["400","500","600","700"],
    "lineHeights": ["1.0","1.2","1.4","1.6"]
  },
  "spacing": ["2px","4px","8px","12px","16px","24px","32px","56px"],
  "radii":   ["3px","4px","6px","8px","14px","9999px"],
  "shadows": [ "0 1px 2px rgba(0,0,0,0.04)", "0 4px 12px rgba(0,0,0,0.08)" ]
}
```

Use `tokens.*` for documentation/tooling (color-block grid, elevation gallery) and for per-brand page orchestration. Prefer `theme.*` (via `theme-*` token strings) for the actual component styling that's wired through `views`.

Keep `tokens.colors[]` entries with `role: 'primary' | 'secondary' | ...` in sync with `theme.*`. The token-grid table in the design-system page reads from `tokens.colors`, so a mismatch shows up immediately.

### 3.4 `components` (per-component defaults)
```jsonc
{
  "button": {
    "variant": "filled",
    "size":    "md",
    "shape":   "rounded",
    "views": {
      "container": {
        "borderRadius": "8px",
        "backgroundColor": "theme-primary",
        "color": "theme-on-primary",
        "fontFamily":   "'Inter', system-ui, sans-serif"
      },
      "label": { "fontWeight": 600 }
    }
  }
}
```

The `views` object mirrors the component's own slot map. Every component that opts into the design system should expose a `views: { slotA, slotB, ... }` API; the config's keys must match those slot names.

**All color values inside `components.*.views.*` MUST be theme-token references** (`theme-primary`, `theme-canvas`, etc.), never literal hex. Literal hex couples the component config to one specific brand and won't adapt when the parent context changes appearance (e.g., rendering Airbnb on a faked dark surface in a showcase).

> **Critical for variant-bearing components (badge, button, card, etc.):** put values that depend on the **default variant** at the *slot level* (`views.label.fontWeight`), not at the *container level* (`views.container.color`). A container-level `color` cascades into outline/ghost variants and overrides their proper text color — that's the bug that made Airbnb's outline badge render white-on-white. The Badge component now defensively re-applies non-filled variant `color`/`backgroundColor`/`borderColor` after the container spread (see [`Badge.view.tsx`](../../src/components/Badge/Badge/Badge.view.tsx)). New components should follow the same pattern, or simply avoid putting variant-coupled colors on `views.container`. See [§7.1](#71-keep-overrides-variant-safe).

### 3.5 `personality` (brand DNA — new section)
```jsonc
{
  "cornerStyle":     "sharp",            // 'sharp' | 'soft' | 'pill'
  "typeWeight":      "black",            // 'light' | 'regular' | 'bold' | 'black'
  "typeCase":        "uppercase",        // 'normal' | 'uppercase'
  "typeStyle":       "normal",           // 'normal' | 'italic'
  "letterSpacing":   "0.06em",
  "accentTreatment": "glow",             // 'flat' | 'gradient' | 'stripe' | 'glow' | 'halftone'
  "signatureMotif":  "⚡",
  "density":         "tight",            // 'tight' | 'comfortable' | 'spacious'
  "surfaceTone":     "mono",             // 'paper' | 'glass' | 'matte' | 'mono'
  "cardRadius":      2,
  "pillRadius":      0,
  "badgeRadius":     0,
  "voice":           "technical-mission"
}
```

`personality` lets pages and bespoke showcase components reach for *layout-level* brand cues that don't fit into 11 colors and `views` slots: the corner style of decorative shapes, the type weight of headlines, the texture of an accent stripe behind a hero, the signature motif used in a featured badge, the density of vertical rhythm. The 15 shipped brand configs all carry a `personality` block; the design-system page uses it for the Brand Snapshot, tier-pricing cards, content cards, and color-block sections.

The field is **optional**. Components that don't need it can ignore it entirely. Pages that do can pull it via `getPersonality(config)` from the design-system page (which falls back to a `defaultPersonality` if the brand doesn't declare one). See [§5.2](#52-personality-driven-helpers) for the page-level helpers built on top.

### 3.6 Uniform schema across configs

Every brand config carries the **same set of keys** (the same shape down through `metadata`, `theme`, `tokens.typography`, `components.*.views.*`, and `personality`). The only intentionally per-brand bucket is `tokens.rawCssVars`, which stores each brand's extracted CSS variables and is by definition non-uniform.

> **Why uniform schemas?** Authoring a new brand becomes a fill-in-the-blanks exercise — copy any existing config, replace values, and you cannot accidentally drop a slot the runtime expects. Cross-brand audits (radii audit, font-weight audit, etc.) collapse to a single read path with no `?.` plumbing required.

#### Empty values use `null`, not missing keys

Some brands deliberately don't customize a slot — Airbnb's badge, for instance, has no `views.container.backgroundColor` / `color` / `borderColor` overrides (the component default carries it). In a uniform schema the key still has to be present, so the convention is:

```jsonc
"badge": {
  "views": {
    "container": {
      "backgroundColor": null,         // ← present in schema, no override
      "color":           null,
      "borderColor":     null,
      "borderRadius":    6,            // ← real override
      "fontFamily":      "'Inter', ..."
    }
  }
}
```

`null` means "this brand does not override this slot — use the component default." Compare to omitting the key entirely (which used to be the convention): both behave the same at runtime now, but `null` makes the schema obvious to readers and to schema-audit tooling.

#### Nulls are stripped at the config boundary

[`getDesignSystemComponentProps`](../../src/design-system/utils.ts) runs `stripNullsDeep` on the brand's component block before returning it, so by the time anything is merged the schema placeholders are gone. This matters because the spread chain in component views is `{...baseStyles} {...views?.container} {...props}` — if `views.container.backgroundColor` were still `null` at spread time, it would clobber the variant's `theme-primary` background with `null`. Pre-stripping at the boundary is also why [`deepMerge`](../../src/design-system/utils.ts) stays cycle-safe: it only recurses when *both* sides are plain objects (so React elements passed via `children` / refs are assigned by reference, never traversed).

`deepMerge` still skips top-level `null`/`undefined` so user props can't reintroduce them. The merge precedence is unchanged: **component defaults → brand config (null-stripped) → user props (skipping `undefined`) → user `config` overrides**.

If you need to *force-clear* an inherited slot value down to its CSS default, pass an explicit token like `'transparent'` or `'inherit'` — `null` is reserved for "no opinion."

#### Auditing the schema

A small Node check that the 15 configs share the same object-key tree (excluding `tokens.rawCssVars`):

```bash
node -e "
const fs = require('fs');
const path = require('path');
const dir = 'src/design-system/configs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const EXCLUDE = ['tokens.rawCssVars'];
const collect = (o, p, s) => {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return;
  for (const k of Object.keys(o)) {
    const np = p ? p + '.' + k : k;
    if (EXCLUDE.some(e => np === e || np.startsWith(e + '.'))) continue;
    s.add(np); collect(o[k], np, s);
  }
};
const per = {};
for (const f of files) { const s = new Set(); collect(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')), '', s); per[f] = s; }
const all = new Set(); Object.values(per).forEach(s => s.forEach(p => all.add(p)));
const drift = [...all].filter(p => Object.values(per).some(s => !s.has(p))).sort();
if (drift.length === 0) console.log('OK — schema uniform across', files.length, 'configs');
else { console.log('DRIFT:'); for (const p of drift) console.log(' -', p); }
"
```

Run this after adding a new config (or modifying an existing one) to catch schema drift before it ships.

---

## 4. Authoring a new component

Conventions live in [docs/conventions.md](../conventions.md) — folder structure, file naming, props pattern. The bits specific to the design system are below.

### 4.1 Skeleton

```
src/components/MyWidget/
├── MyWidget.tsx                  # public entry; calls useMergedDesignSystemComponentProps
├── MyWidget/
│   ├── MyWidget.props.ts         # interface exposing variant, size, shape, views
│   ├── MyWidget.type.d.ts        # union types for variant, size, shape
│   ├── MyWidget.style.ts         # local size/variant/shape style maps
│   ├── MyWidget.view.tsx         # pure presentational render
│   └── MyWidget.state.ts         # (optional) stateful logic
└── examples/
    └── default.tsx
```

### 4.2 Public entry — wire up the design system

```tsx
// MyWidget.tsx
import React from 'react';
import { MyWidgetProps } from './MyWidget/MyWidget.props';
import MyWidgetView from './MyWidget/MyWidget.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';

export const MyWidget: React.FC<MyWidgetProps> = (props) => {
  const merged = useMergedDesignSystemComponentProps('myWidget', props);
  return <MyWidgetView {...merged} />;
};
```

That single hook call wires the component to the brand. It deep-merges the active config's `components.myWidget` over `props` so:
- explicit props always win,
- brand defaults fill in everything else,
- nested `views.*` get merged slot-by-slot.

Then **register the new component name** in [src/design-system/types.ts](../../src/design-system/types.ts):

```ts
export type DesignSystemComponentName =
  | 'button'
  | 'card'
  | ...
  | 'myWidget';   // ← add it here
```

### 4.3 Props interface — expose the standard shape

```ts
// MyWidget.props.ts
import { ViewProps } from 'app-studio';

export interface MyWidgetViews {
  container?: ViewProps;
  label?:     ViewProps;
  icon?:      ViewProps;
}

export interface MyWidgetProps {
  variant?: 'filled' | 'outline' | 'ghost';
  size?:    'sm' | 'md' | 'lg';
  shape?:   'square' | 'rounded' | 'pill';
  colorScheme?: 'primary' | 'secondary' | 'black' | 'white';
  isDisabled?: boolean;
  isLoading?:  boolean;
  views?: MyWidgetViews;
  children?: React.ReactNode;
}
```

Standard prop names — `variant` / `size` / `shape` / `colorScheme` / `isDisabled` / `isLoading` / `views` — let consumers reason about every component the same way and let configs override them uniformly.

### 4.4 View — read theme, then layer overrides

```tsx
// MyWidget.view.tsx
import React from 'react';
import { Center, Text, useTheme } from 'app-studio';
import { MyWidgetSizes, MyWidgetVariants, MyWidgetShapes } from './MyWidget.style';
import { MyWidgetProps } from './MyWidget.props';

const MyWidgetView: React.FC<MyWidgetProps> = ({
  variant = 'filled',
  size    = 'md',
  shape   = 'rounded',
  views,
  children,
  ...rest
}) => {
  const { themeMode } = useTheme();
  const variantStyles = MyWidgetVariants(themeMode)[variant];

  return (
    <Center
      // 1. base layout
      display="inline-flex"
      gap={6}
      // 2. size (width/height/padding/font sizing)
      {...MyWidgetSizes[size]}
      // 3. shape (border radius)
      borderRadius={MyWidgetShapes[shape]}
      // 4. variant (theme-* color references)
      {...variantStyles}
      // 5. brand override (config.components.myWidget.views.container)
      {...views?.container}
      // 6. user-supplied container styles last
      {...rest}
    >
      <Text {...views?.label}>{children}</Text>
    </Center>
  );
};

export default MyWidgetView;
```

The order matters: **size → shape → variant → views.container → user props**. Each later spread wins over the previous. The user always has the last word.

For variant-bearing components, **defensively reapply variant `color` / `backgroundColor` / `borderColor` after `views.container` when variant !== 'filled'** — otherwise a brand container color set for the filled default will leak into outline/ghost renders. [`Badge.view.tsx`](../../src/components/Badge/Badge/Badge.view.tsx) is the reference implementation.

### 4.5 Style — reference theme colors, not hex

```ts
// MyWidget.style.ts
export const MyWidgetSizes = {
  sm: { height: 28, padding: '0 10px', fontSize: 12 },
  md: { height: 36, padding: '0 14px', fontSize: 14 },
  lg: { height: 44, padding: '0 18px', fontSize: 16 },
};

export const MyWidgetShapes = { square: 0, rounded: 8, pill: 9999 };

export const MyWidgetVariants = (themeMode: string) => ({
  filled: {
    backgroundColor: 'theme-primary',      // ← resolves to var(--theme-primary)
    color:           'theme-on-primary',
  },
  outline: {
    backgroundColor: 'transparent',
    color:           'theme-primary',
    borderWidth:     1,
    borderStyle:     'solid',
    borderColor:     'theme-primary',
  },
  ghost: {
    backgroundColor: 'transparent',
    color:           'theme-text',
  },
});
```

Valid resolver tokens (app-studio emits a `--theme-<slot>` CSS variable for every key in `config.theme`):
- Colors: `theme-primary`, `theme-secondary`, `theme-success`, `theme-warning`, `theme-error`, `theme-canvas`, `theme-surface`, `theme-text`, `theme-muted`, `theme-border`, `theme-onPrimary`
- Alpha suffix (app-studio resolver feature): `theme-primary-100` … `theme-primary-1000` resolves to a `color-mix` 0–100% mix with transparent. Useful for tints: `theme-primary-100` ≈ 10% primary on transparent.
- Token references inside the theme object itself: if you set `theme.primary: 'color-blue-700'`, app-studio emits `--theme-primary: var(--color-blue-700)` (chained var). This lets you point one slot at another via tokens rather than hex.

**Never hardcode `#ff385c`**, **never read `tokens.colors[N]` from inside a component** — that ties the component to a single brand.

### 4.6 Defaults should `inherit`, not lock to a color

For non-decorative properties (label color, helper text color, secondary text on a generic surface), default to `color: 'inherit'` so the surrounding context drives it. The brand `views.label.fontFamily` / `fontWeight` / `letterSpacing` can still customize the type, but locking `color: 'color-gray-700'` (or a brand-specific `theme-muted`) makes the label invisible the moment the component is rendered on an inverted-tone surface in a showcase.

This is the pattern the form controls now follow:
- [`FieldLabel.tsx`](../../src/components/Input/FieldLabel/FieldLabel.tsx) — `color: 'inherit'` with `opacity: 0.72` for muted feel
- [`Checkbox.view.tsx`](../../src/components/Form/Checkbox/Checkbox/Checkbox.view.tsx), [`Radio.view.tsx`](../../src/components/Form/Radio/Radio/Radio.view.tsx), [`Switch.view.tsx`](../../src/components/Form/Switch/Switch/Switch.view.tsx) — label color inherits from parent
- [`StatusIndicator.style.tsx`](../../src/components/StatusIndicator/StatusIndicator/StatusIndicator.style.tsx) — semantic dot color stays vivid, label inherits
- [`Table.style.ts`](../../src/components/Table/Table/Table.style.ts) — `td`/`th`/`caption` color = `inherit`, opacity dims them

Brand configs reinforce this by **not** specifying `label.color` on `checkbox`/`radio`/`switch`/`input`/`textarea`/`select` — the field is intentionally absent so the inherit cascade can do its job. Don't put it back when adding a new brand.

---

## 5. Brand-aware values that don't fit `theme.*`

For things outside the 11 semantic colors — radii, shadows, typography weights — pull from `config.tokens` or `config.personality` via the design-system hook in *page-level orchestration code*, not inside reusable components. The component itself should expose a `views` slot the page can fill:

```tsx
// page code that knows about brands
import { useDesignSystem } from 'src/design-system';

const Hero = () => {
  const { config } = useDesignSystem();
  return (
    <Card
      views={{
        container: {
          borderRadius: config.personality?.cardRadius ?? 12,
          boxShadow:    config.tokens.shadows[1],
          fontFamily:   config.tokens.typography.fontFamily,
        },
      }}
    >
      ...
    </Card>
  );
};
```

The component stays brand-agnostic; the page applies brand-specific styling through the public `views` API.

### 5.1 Component-appropriate radii

The page utility `componentRadius(config, name)` in [src/pages/designSystem.page.tsx](../../src/pages/designSystem.page.tsx) demonstrates the right pattern: read the component's own configured `views.container.borderRadius`, with a fallback chain to a related component (`accordion → card → alert`, `tabs → button`). That keeps Apple's tabs pill-shaped, Stripe's at 4px, and Nike's at 0 — all without hardcoding.

### 5.2 Personality-driven helpers

The design-system page exposes a battery of helpers built on top of `config.personality`:

| Helper                                | Returns                                                                                          |
|---------------------------------------|--------------------------------------------------------------------------------------------------|
| `getPersonality(config)`              | The personality block, falling back to a safe default if absent                                  |
| `personalityFontWeight(p, bump)`      | Numeric font-weight from `typeWeight`, with optional `'light' \| 'normal' \| 'heavy'` adjustment |
| `personalityDensityScale(p)`          | `{ padding, gap, large }` triplet keyed off `density`                                            |
| `personalityHeadingStyle(p)`          | `letterSpacing` + `textTransform` + `fontStyle` + `fontWeight` for hero/title text               |
| `personalityLabelStyle(p)`            | Smaller-cap label treatment (tighter weight, lighter tracking)                                   |
| `personalitySurfaceStyle(p, palette)` | Background + backdrop-filter per `surfaceTone` (paper / glass / matte / mono)                    |
| `personalityAccentBackground(p, palette)` | A CSS background string per `accentTreatment` (flat / gradient / stripe / glow / halftone)   |
| `personalityAccentShadow(p, palette)` | A bloom shadow for `accentTreatment: 'glow'`, undefined otherwise                                |

Use these inside bespoke page-level compositions (brand snapshots, tier-pricing cards, content blocks). Keep them out of reusable library components — those should stay personality-agnostic and let the page supply the styling via `views`.

---

## 6. Authoring a config for a new brand

> **For a focused, copy-paste recipe (especially for AI agents), use the
> dedicated guide: [design-system.md](./design-system.md).** It walks the five
> sections in order with the coherence rules, a validation checklist, and an
> anti-pattern table. The summary below remains the quick reference.

A config is a JSON file under [src/design-system/configs/](../../src/design-system/configs/). To add `mybrand`:

1. **Create `mybrand.json`** with all five sections (`metadata`, `theme`, `tokens`, `components`, `personality`). Use an existing config as a template — `airbnb.json` (light) or `linear.json` (dark) are the cleanest references.
2. **Register it** in [src/design-system/configs/index.ts](../../src/design-system/configs/index.ts):
   ```ts
   import mybrand from './mybrand.json';
   export const designSystemConfigs = {
     ...,
     mybrand: mybrand as DesignSystemConfig,
   };
   ```
3. **Verify completeness.** All 22 component keys should be present (button, badge, card, input, select, textarea, checkbox, radio, switch, slider, tabs, accordion, table, avatar, alert, status, progress, loader, separator, navigation, hero, page). Run the audit script:
   ```bash
   node -e "const c = require('./src/design-system/configs/mybrand.json'); \
            console.log('components:', Object.keys(c.components).length)"
   ```
   Then run the **schema-drift audit** from [§3.6](#36-uniform-schema-across-configs) — every key present in any other config (outside `tokens.rawCssVars`) must also exist in your new file, even if the value is `null`.
4. **Verify all colors are theme-token references**, not hex. The configs are tokenized: any hex value in `components.*.views.*` that matches a `theme.*` entry has been replaced with `theme-<slot>`. Stay consistent.
5. **Verify the font family is loadable.** If you reference `'Custom Brand Font'` and that font isn't on Google Fonts and you didn't ship it locally, end-users get the next fallback in the chain. Always include `'Inter'` or `system-ui` somewhere downstream as a graceful fallback.
6. **Visual check.** Open `/design-system` and pick the brand from the sidebar. The Source HTML and Compare tabs let you visually diff the live components against the original reference.

### 6.1 Brand fingerprint cheat-sheet

The 15 shipped configs cluster into recognizable patterns. Use these as orientation when extracting a new brand:

| Aesthetic            | Brands                              | Key tells                                                                  |
|----------------------|-------------------------------------|----------------------------------------------------------------------------|
| Light minimal        | apple, figma, notion, vercel        | rounded everything, soft shadows, neutral surfaces                         |
| Light brand pop      | airbnb (`#ff385c`), coinbase (`#0052ff`), shopify (`#008060`), stripe (`#635bff`) | strong primary on white surface |
| Dark editorial       | linear (`#5e6ad2` on `#08090A`), spacex (white on `#000`) | inverted theme, primary used as accent rather than CTA bg |
| High-contrast bold   | nike (black + `#FA5400` accent), uber (pure black + `#06c167` go-green), vercel (pure black) | square or pill, no in-between, black/white emphasis |
| Vibrant green        | spotify (`#1DB954` on `#000`/`#121212`) | iconic green primary on near-black canvas                              |
| Color-shifted        | tesla (`#3E6AE1`), revolut (`#1361F0` + `#101D31`) | playful gradients, longer radius range, shadow stacks                 |
| Multi-hue play       | figma (`#F24E1E` + `#A259FF` + `#0ACF83` + `#FFC700` + `#FF7262`) | every theme slot is a distinct accent, not a tint of primary |

When auditing your own brand, identify which cluster it fits and start by copying that template's `theme` block.

### 6.2 Authoring a `personality` block

Pick the closest values to the brand identity:

| Field             | Choose based on…                                                                            |
|-------------------|---------------------------------------------------------------------------------------------|
| `cornerStyle`     | What does a brand button look like? `sharp` (Nike, SpaceX, Tesla, Uber, Vercel), `soft` (Airbnb, Apple, Coinbase, Figma, Linear, Notion, Shopify, Stripe), `pill` (Revolut, Spotify) |
| `typeWeight`      | Headline weight: `light` (Apple, Tesla), `regular` (Notion), `bold` (most), `black` (Nike, SpaceX, Spotify) |
| `typeCase`        | `uppercase` (Nike, SpaceX, Tesla), `normal` (everyone else)                                |
| `typeStyle`       | `italic` only for brands that actually use italic editorially (Nike)                       |
| `letterSpacing`   | Match the marketing site: tight negatives for refined brands (Apple `-0.022em`, Stripe `-0.022em`), positive for tracked uppercase (SpaceX `0.06em`, Nike `0.02em`) |
| `accentTreatment` | `flat` (most), `gradient` (Linear, Revolut, Stripe), `glow` (SpaceX), `halftone` or `stripe` (rare) |
| `signatureMotif`  | One glyph that screams the brand — lightning (`⚡` SpaceX), play (`▶` Nike, Uber), triangle (`▲` Tesla, Vercel), spark (`✦` Figma), star (`★` Revolut), dot (`●` everywhere else) |
| `density`         | `tight` (Nike, SpaceX, Linear, Uber), `comfortable` (most), `spacious` (Apple, Tesla)      |
| `surfaceTone`     | `paper` (white-ish brands), `mono` (mono brands), `glass` (gradient brands), `matte` (Spotify) |
| `cardRadius` / `pillRadius` / `badgeRadius` | Three radii covering the size span — small chip, pill button, full card |
| `voice`           | Free-form copy hint used to pick taglines and signature copy in the Brand Snapshot |

The 15 shipped personality blocks are the canonical references — read them when in doubt.

---

## 7. Pitfalls

### 7.1 Keep overrides variant-safe

```jsonc
// ❌ Bad — breaks outline/ghost variants
"badge": {
  "views": {
    "container": { "color": "theme-canvas", "backgroundColor": "theme-secondary" }
  }
}
```

If the user passes `<Badge variant="outline" />`, the variant style sets `color: theme-primary` for outline, but `views.container.color: theme-canvas` (white) overrides it → outline text is white on a white background.

```jsonc
// ✓ Good — variant logic stays intact
"badge": {
  "views": {
    "container": { "borderRadius": "8px", "fontFamily": "..." },
    "text":      { "fontWeight": 600 }
  }
}
```

Only put **variant-independent** properties on `views.container` (radius, font-family, padding tweaks). Anything that changes per variant — colors, borders — should live inside the component's variant style map, *not* in the config.

The Badge component now also defends against this at the view layer ([`Badge.view.tsx`](../../src/components/Badge/Badge/Badge.view.tsx)): for non-filled variants, it reapplies the variant's `color` / `backgroundColor` / `borderColor` *after* `views.container`. New variant-bearing components should follow that pattern.

### 7.2 Strip `label.color` from brand component configs

The brand configs for `checkbox`, `radio`, `switch`, `input`, `textarea`, `select` should **not** set `label.color`. The components default to `color: 'inherit'` and rely on the surrounding `palette.text` (via PaletteFrame's inline `style={{ color }}`) to drive the label ink. Setting `label.color: 'theme-muted'` (or any brand-specific value) hard-locks the label to that color even when the component is rendered on a faked inverted surface in a showcase — which is exactly what made Uber's "Email updates" / "Standard" / "Enabled" labels invisible on the design-system page's dark frame.

The brand `label` block should specify font family, weight, letter-spacing, text-transform — not color.

### 7.3 Don't fight the spread order

When a component hardcodes `borderWidth={1}` then spreads `{...views.container}` *after*, your override wins. But if you spread `{...views.container}` *before* its own hardcoded prop — your override loses. Read the view source before assuming `views.X` is honored. In the rare case it isn't, pass the override as a top-level prop on the component (which spreads via `{...props}` last); that was the workaround for `Accordion.Item`'s hardcoded `marginBottom: 8` and `borderWidth: 1` on each item.

### 7.4 Force remount when the brand swaps

Internal `useState` initial values won't update when the config changes. If a component initializes derived state from props (e.g., Tabs from `defaultValue`, Title from `highlightText`), a brand swap can leave it pointing at stale values. Wrap the brand-bound subtree with `key={config.metadata.id}`.

### 7.5 Don't pull `theme.primary` into a component file

Components should reference `'theme-primary'` (the resolver token), not `config.theme.primary`. The resolver — backed by the CSS variables the provider emits — is what makes the same component render correctly under every brand without re-imports.

The exception is **page-level orchestration code** (e.g., `BrandSnapshotSample` in the design-system page) where you need raw hex to drive things like inline-styled gradients or radial backgrounds that don't go through app-studio's resolver. Even there, prefer `palette.primary` from a derived `getLightPalette` / `getDarkPalette` helper over a direct `config.theme.primary` read so the dark-on-light-brand showcase mode works.

### 7.6 Verify brand fonts are actually loaded

Listing a font in `tokens.typography.fontFamily` doesn't load it. If the font isn't a system font and you don't list it in `metadata.googleFontLinks` (or ship it locally), users get the next fallback in the chain. Cross-check both fields when changing brand typography. Custom commercial fonts (Cereal, sohne, Aeonik, Gotham, Uber Move, Spotify Circular, Shopify Sans) gracefully fall through to Inter or system-ui — those chains are intentional.

---

## 9. LLM playbook — generating a beautiful, distinctive config

This section is written so an LLM (or a human moving fast) can produce a config that **renders correctly on first paint** *and* **feels unmistakably like the target brand** instead of generic-purple-fintech-#5. Read it linearly. The order is the order to fill the file.

### 9.1 Inputs you need before you start

| Input | Why it matters |
|-------|----------------|
| **Brand name + 1–2 sentence identity** | Drives every aesthetic decision below. "Calm, premium, hardware-adjacent" ≠ "Loud, sports-grade, athletic." |
| **One reference hex (primary brand color)** | Anchors the entire theme palette. Pull from the marketing site's CTA button if unsure. |
| **Default appearance** (`light` or `dark`) | Determines canvas/text inversion. Linear, SpaceX, Spotify, Uber default `dark`; Apple, Airbnb, Notion default `light`. |
| **Personality archetype** (pick one from [§9.5](#95-personality-archetypes)) | Shortcut to a coherent `personality` block. |
| **Typography fingerprint** (pick one from [§9.4](#94-typography-fingerprints)) | Avoids the Inter-everywhere trap. |

If a brand source HTML/page exists ([§9.10](#910-when-a-source-html-exists)), extract from it; otherwise generate from brand knowledge.

### 9.2 Decision flow (the 7 ordered steps)

1. **Pick the primary hex.** One color. Everything else is derived. It must read on **both** a white and a black canvas (it stays constant across modes — see step 3).
2. **Pick the default appearance** (`light` or `dark`). This only sets which mode the config *opens in* — you do **not** hand-pick a canvas/text hex per mode; the neutrals adapt automatically.
3. **Build the 11 theme slots** following [§9.3](#93-theme-palette-recipe): brand slots as **hex** (constant), neutral slots (`canvas`, `surface`, `text`, `muted`, `border`) as **`color-*` tokens** (auto-flip). One config, both modes.
4. **Pick the typography fingerprint** from [§9.4](#94-typography-fingerprints) and assemble `tokens.typography` + `metadata.googleFontLinks`.
5. **Pick the personality archetype** from [§9.5](#95-personality-archetypes); copy its block; tweak `signatureMotif` and `voice` to fit the brand.
6. **Fill `components.*` defaults** following the component patterns in [§9.7](#97-component-config-patterns). Use `theme-*` tokens, **never hex**.
7. **Validate** using the checklist in [§9.9](#99-self-validation-rubric). Fix anything that fails.

### 9.3 Theme palette recipe (the 11 slots)

Each slot is either **constant** (a raw `hex` — brand identity, identical in light and dark) or **adaptive** (a `color-*` token — flips automatically with the mode). Author both groups in one config and the dark theme is derived for free ([theming.md §2.1](./theming.md#21-one-config-both-modes--the-adaptive-rule)). **Do not author a second dark config.**

**Brand slots — write a `hex`, stays constant in both modes:**

| Slot        | What it paints                                   | Construction rule                                                                                              |
|-------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `primary`   | CTA backgrounds, links, focus rings, active tabs | The signature hex. Must clear **≥ 3:1 on both white and black** — it never flips, so it has to read in dark too. |
| `secondary` | Secondary CTAs, hovers, accent emphasis          | A *related* hue (analogous or lighter tint of primary), not a clash. **Not body ink** — ink is `text`.          |
| `success`   | Positive / "operational" states                  | Green family that survives next to `primary` without vibrating. ~`#16a34a`–`#1DB954`.                          |
| `warning`   | Cautions / "degraded" states                     | Amber/orange (`#d97706`-ish); some brands repurpose a brand hue (Linear uses a desaturated indigo).            |
| `error`     | Destructive / "outage" states                    | Red family (`#dc2626`–`#ef4444`). Coinbase / Stripe / Airbnb tune this toward their primary's temperature.     |
| `onPrimary` | Ink *on top of* `primary` (filled-button label)  | Max contrast vs `primary`. ~99% use `#ffffff`; `#000` only when `primary` is light (yellow, mint, pale gold).   |

**Neutral slots — write a `color-*` token, flips with the mode:**

| Slot      | What it paints                          | Recommended token → what it becomes in dark                                            |
|-----------|-----------------------------------------|-----------------------------------------------------------------------------------------|
| `canvas`  | Page background                         | `color-white` → black. (Want off-white instead of pure white? `color-gray-50`.)         |
| `surface` | Cards, popovers, raised regions         | `color-gray-50` (or `color-gray-100`) → near-black. Must stay distinct from `canvas`.    |
| `text`    | Body copy                              | `color-black` → white. (Softer ink: `color-gray-900`.)                                   |
| `muted`   | Secondary copy, captions, placeholders  | `color-gray-500` → a readable mid-grey in both modes.                                    |
| `border`  | Dividers, outlines, input borders       | `color-gray-200` → dark hairline. (Stronger: `color-gray-300`.)                          |

> **Tint the neutrals for brand character** while keeping auto-flip: swap the grey family — `color-slate-*` (cool), `color-stone-*` (warm), `color-zinc-*`, `color-neutral-*`. Pick **one** family and use it for all five neutral slots so they stay coherent.

> **Contrast invariants** to verify in **both** light and dark (the default `color-gray-*` ramp passes these by construction — re-check only if you hand-pick shades or tint the family):
> - `text` vs `canvas`: WCAG AA (≥ 4.5:1).
> - `onPrimary` vs `primary`: WCAG AA (≥ 4.5:1).
> - `primary` vs `canvas`: ≥ 3:1 on **both** white and black (primary doesn't flip).
> - `surface` vs `canvas`: distinguishable when adjacent (≥ 1.1:1).
> - `border` vs `surface`: visible but subtle (1.2–1.6:1).
> - `muted` vs `canvas`: legible but recessive (≥ 3:1).

### 9.4 Typography fingerprints

Don't default to Inter for every brand. Match the typeface to the identity. **Always include a system-ui fallback chain** so missing fonts degrade gracefully.

| Fingerprint           | When to use                                  | `fontFamily`                                                                                  | `googleFontLinks`                                                                            |
|-----------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **Refined-Sans**      | Apple, Tesla, Linear, Stripe, Vercel         | `"'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif"`                           | `Inter:wght@400;500;600;700`                                                                 |
| **Grotesk-Bold**      | Nike, SpaceX, Vercel-dark, athletic brands   | `"'Inter', 'Bebas Neue', 'Helvetica Neue', system-ui, sans-serif"` *(if heavy display needed: add `Bebas+Neue` link)* | `Inter:wght@600;700;800;900` + optional `Bebas+Neue`                                         |
| **Geometric-Friendly**| Airbnb, Coinbase, Shopify, Notion            | `"'Inter', 'Airbnb Cereal VF', 'Circular', system-ui, sans-serif"`                            | `Inter:wght@400;500;600;700`                                                                 |
| **Modern-Mono-Hybrid**| Linear, Vercel, dev-tool brands              | sans body + `"'JetBrains Mono', ui-monospace, 'SF Mono', menlo, monospace"` for `monoFamily` | `Inter` + `JetBrains+Mono:wght@400`                                                          |
| **Editorial-Serif**   | Luxury brands, publications (rare)           | `"'Playfair Display', Georgia, serif"`                                                        | `Playfair+Display:wght@500;700`                                                              |

Build `tokens.typography.fontSizes`/`fontWeights`/`lineHeights` as **clean ordered arrays** (smallest → largest). Example:
```json
"fontSizes":   ["12px","13px","14px","16px","18px","22px","28px","36px","48px","64px"],
"fontWeights": ["400","500","600","700","800"],
"lineHeights": ["1.0","1.1","1.2","1.4","1.5","1.6"]
```

### 9.5 Personality archetypes

Each archetype is a copy-pasteable `personality` block. Pick the closest one, then tweak `signatureMotif` and `voice`.

| Archetype             | Example brands             | Block |
|-----------------------|----------------------------|-------|
| **Refined-Premium**   | Apple, Tesla, Vercel-light | `{ "cornerStyle":"soft", "typeWeight":"light", "typeCase":"normal", "typeStyle":"normal", "letterSpacing":"-0.022em", "accentTreatment":"flat", "signatureMotif":"●", "density":"spacious", "surfaceTone":"paper", "cardRadius":18, "pillRadius":9999, "badgeRadius":8, "voice":"refined-quiet" }` |
| **Sport-Extreme**     | Nike, SpaceX               | `{ "cornerStyle":"sharp", "typeWeight":"black", "typeCase":"uppercase", "typeStyle":"italic", "letterSpacing":"0.04em", "accentTreatment":"stripe", "signatureMotif":"▶", "density":"tight", "surfaceTone":"mono", "cardRadius":0, "pillRadius":0, "badgeRadius":0, "voice":"aggressive-direct" }` |
| **Dev-Editorial**     | Linear, Vercel-dark, Notion-pro | `{ "cornerStyle":"soft", "typeWeight":"bold", "typeCase":"normal", "typeStyle":"normal", "letterSpacing":"-0.025em", "accentTreatment":"gradient", "signatureMotif":"↗", "density":"tight", "surfaceTone":"glass", "cardRadius":12, "pillRadius":9999, "badgeRadius":6, "voice":"speed-clarity" }` |
| **Friendly-Pop**      | Airbnb, Shopify, Coinbase  | `{ "cornerStyle":"soft", "typeWeight":"bold", "typeCase":"normal", "typeStyle":"normal", "letterSpacing":"-0.01em", "accentTreatment":"flat", "signatureMotif":"✦", "density":"comfortable", "surfaceTone":"paper", "cardRadius":14, "pillRadius":9999, "badgeRadius":6, "voice":"warm-confident" }` |
| **Vibrant-Playful**   | Figma, Spotify, Revolut    | `{ "cornerStyle":"pill", "typeWeight":"black", "typeCase":"normal", "typeStyle":"normal", "letterSpacing":"-0.03em", "accentTreatment":"gradient", "signatureMotif":"★", "density":"comfortable", "surfaceTone":"matte", "cardRadius":16, "pillRadius":9999, "badgeRadius":9999, "voice":"playful-bold" }` |
| **Industrial-Mono**   | Uber, Tesla-utility, B2B   | `{ "cornerStyle":"sharp", "typeWeight":"bold", "typeCase":"uppercase", "typeStyle":"normal", "letterSpacing":"0.02em", "accentTreatment":"flat", "signatureMotif":"▲", "density":"tight", "surfaceTone":"mono", "cardRadius":2, "pillRadius":4, "badgeRadius":2, "voice":"systemic-objective" }` |

Then **personalize**:
- `signatureMotif` — one glyph that *feels* like the brand. Lightning `⚡` (SpaceX, Tesla), arrow `↗` (Linear), play `▶` (Nike, Uber), spark `✦` (Figma), triangle `▲` (Vercel, Tesla), star `★` (Revolut), dot `●` (default).
- `voice` — short hyphenated phrase, used as a copy hint in the Brand Snapshot. Examples: `refined-quiet`, `speed-clarity`, `mission-technical`, `warm-confident`, `aggressive-direct`, `playful-bold`.

### 9.6 Diversity heuristics — avoid the generic-purple-startup trap

If your generated config could be *anyone's*, it's wrong. Force at least three of these dimensions to non-default values for every brand:

| Lever                       | Default that screams "generic" | Push toward                                                                                  |
|-----------------------------|--------------------------------|----------------------------------------------------------------------------------------------|
| Primary hex                 | `#6366f1` (indigo)             | A hue the brand *actually owns* — coral, leaf-green, off-red, electric blue, neon mint, etc. |
| `cornerStyle`               | `soft`                         | `sharp` (utilitarian) or `pill` (playful) if the identity supports it.                       |
| `typeCase`                  | `normal`                       | `uppercase` for sport / aerospace / industrial brands.                                       |
| `density`                   | `comfortable`                  | `tight` (dev-tools, hardware) or `spacious` (luxury, hardware-premium).                      |
| `surfaceTone`               | `paper`                        | `glass` (gradient brands), `mono` (mono brands), `matte` (rich-dark brands).                 |
| `accentTreatment`           | `flat`                         | `gradient` (Linear, Stripe, Revolut), `glow` (SpaceX, dark-tech), `stripe`/`halftone` (rare). |
| `cardRadius` / `badgeRadius`| Both `12`                      | Use the **whole spread** — Nike `0/0/0`, Apple `18/9999/8`, Revolut `16/9999/9999`.          |
| `signatureMotif`            | `●`                            | Anything else.                                                                               |
| `monoFamily`                | reused sans                    | A real mono — `JetBrains Mono`, `SF Mono`, `IBM Plex Mono`.                                  |

**Triangulate**: if you give a brand `cornerStyle: 'soft'` AND `density: 'comfortable'` AND `accentTreatment: 'flat'` AND `signatureMotif: '●'`, it will look indistinguishable from five other configs. Move at least three levers.

### 9.7 Component config patterns

Apply these conventions per component. **Only put variant-independent properties on `views.container`** (radius, font, letter-spacing). Colors that change per variant must live in the component's variant style map ([§7.1](#71-keep-overrides-variant-safe)).

| Component                                 | Set on `views.container`                                                                                          | Leave to defaults / inherit |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------|-----------------------------|
| `button`                                  | `borderRadius`, `fontFamily`, `fontWeight`, `letterSpacing`, `textTransform`, `fontStyle`. **Top-level**: `color: "theme-primary"`, `textColor: "theme-on-primary"`. | `backgroundColor` (let variant drive it; set only if brand specifically wants a non-primary fill like SpaceX's `theme-surface`). |
| `badge`                                   | `borderRadius`, `fontFamily`, `letterSpacing`, `textTransform`, `fontWeight`, `fontStyle`                          | `backgroundColor`/`color`/`borderColor` — leave `null` so variant logic stays intact. |
| `card`                                    | `backgroundColor: "theme-surface"`, `borderColor: "theme-border"`, `borderRadius`, `borderStyle`, `borderWidth`, `boxShadow`, `color: "theme-text"`, `fontFamily` | — |
| `alert`                                   | `backgroundColor: "theme-surface"`, `borderColor: "theme-border"`, `borderRadius`                                   | Per-severity colors come from variants. |
| `input` / `textarea` / `select`           | `backgroundColor`, `borderColor: "theme-border"`, `borderRadius`, `color: "theme-text"`, `fontFamily`                | **Never** set `label.color` — it must inherit. |
| `checkbox` / `radio` / `switch`           | `color: "theme-primary"` on the control mark only                                                                   | **Never** set `label.color`. |
| `tabs` (`views.activeTab`)                | `color: "theme-primary"`, `borderColor: "theme-primary"`, optional `backgroundColor: "theme-primary"` (filled) or `"transparent"` (underline) | — |
| `accordion`, `separator`, `table`         | `borderColor: "theme-border"`, `borderRadius`, `fontFamily`                                                         | — |
| `progress` / `slider` / `status` / `loader` | `color: "theme-primary"`, `backgroundColor: "theme-border"`                                                       | — |
| `navigation` / `hero` / `page`            | layout-level: `backgroundColor`, `color`, `fontFamily`, `borderColor`                                              | — |
| `avatar`                                  | `backgroundColor: "theme-surface"`, `color: "theme-text"`, `borderColor: "theme-border"`, `borderRadius: 9999`     | — |

### 9.8 Starter template (copy, fill, rename)

Save this as `src/design-system/configs/<brandid>.json`, replace every `___` placeholder, register in `index.ts`.

```jsonc
{
  "metadata": {
    "id": "___brandid",
    "label": "___Brand Label",
    "sourcePath": "design.md/html/___brandid.html",
    "sourceTitle": "Design System Inspiration of ___Brand Label",
    "defaultAppearance": "light",
    "googleFontLinks": [
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    ]
  },
  "theme": {
    "primary":   "#___",
    "secondary": "#___",
    "success":   "#___",
    "warning":   "#___",
    "error":     "#___",
    "onPrimary": "#ffffff",
    "canvas":    "color-white",
    "surface":   "color-gray-50",
    "text":      "color-black",
    "muted":     "color-gray-500",
    "border":    "color-gray-200"
  },
  "tokens": {
    "rawCssVars": {},
    "colors": [
      { "name": "primary",   "value": "#___", "role": "primary" },
      { "name": "secondary", "value": "#___", "role": "secondary" },
      { "name": "success",   "value": "#___", "role": "success" },
      { "name": "warning",   "value": "#___", "role": "warning" },
      { "name": "error",     "value": "#___", "role": "error" }
    ],
    "typography": {
      "fontFamily": "'Inter', system-ui, -apple-system, sans-serif",
      "monoFamily": "ui-monospace, 'SF Mono', menlo, monospace",
      "fontSizes":   ["12px","13px","14px","16px","18px","22px","28px","36px","48px","64px"],
      "fontWeights": ["400","500","600","700","800"],
      "lineHeights": ["1.0","1.1","1.2","1.4","1.5","1.6"]
    },
    "spacing": ["2px","4px","8px","12px","16px","24px","32px","48px","64px"],
    "radii":   ["2px","4px","6px","8px","12px","16px","9999px"],
    "shadows": [
      "0 1px 2px rgba(0,0,0,0.04)",
      "0 4px 12px rgba(0,0,0,0.08)",
      "0 12px 32px rgba(0,0,0,0.12)"
    ]
  },
  "components": {
    "button":     { "variant": "filled", "size": "md", "shape": "rounded", "color": "theme-primary", "textColor": "theme-on-primary",
                    "views": { "container": { "borderRadius": 8, "fontFamily": "'Inter', system-ui, sans-serif", "fontWeight": 600, "letterSpacing": "-0.01em", "textTransform": "none", "fontStyle": "normal", "borderColor": "theme-primary", "backgroundColor": null }, "content": { "fontFamily": "'Inter', system-ui, sans-serif", "fontWeight": 600, "letterSpacing": "-0.01em", "textTransform": "none", "fontStyle": "normal" } } },
    "badge":      { "variant": "filled", "size": "sm", "shape": "rounded",
                    "views": { "container": { "backgroundColor": null, "color": null, "borderColor": null, "borderRadius": 6, "fontFamily": "'Inter', system-ui, sans-serif", "letterSpacing": "-0.01em", "textTransform": "none", "fontWeight": 600, "fontStyle": "normal" }, "text": { "fontFamily": "'Inter', system-ui, sans-serif", "fontWeight": 600 } } },
    "card":       { "variant": "elevated", "size": "md", "shape": "rounded",
                    "views": { "container": { "backgroundColor": "theme-surface", "borderColor": "theme-border", "borderRadius": 12, "borderStyle": "solid", "borderWidth": 1, "boxShadow": "0 1px 2px rgba(0,0,0,0.04)", "color": "theme-text" }, "header": { "borderColor": "theme-border", "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif", "fontWeight": 700 }, "content": { "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" }, "footer": { "borderColor": "theme-border" } } },
    "alert":      { "views": { "container": { "backgroundColor": "theme-surface", "borderColor": "theme-border", "borderRadius": 10 }, "icon": { "color": "theme-primary" }, "title": { "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif", "fontStyle": "normal", "fontWeight": 700, "letterSpacing": "-0.01em", "textTransform": "none" }, "description": { "color": "theme-muted", "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "input":      { "views": { "container": { "backgroundColor": "theme-canvas", "borderColor": "theme-border", "borderRadius": 8, "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "textarea":   { "views": { "container": { "backgroundColor": "theme-canvas", "borderColor": "theme-border", "borderRadius": 8, "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "select":     { "views": { "container": { "backgroundColor": "theme-canvas", "borderColor": "theme-border", "borderRadius": 8, "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "checkbox":   { "views": { "container": { "borderColor": "theme-border", "color": "theme-primary" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "radio":      { "views": { "container": { "borderColor": "theme-border", "color": "theme-primary" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "switch":     { "views": { "container": { "backgroundColor": "theme-border" }, "thumb": { "backgroundColor": "theme-canvas" }, "label": { "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "slider":     { "views": { "track": { "backgroundColor": "theme-border" }, "filled": { "backgroundColor": "theme-primary" }, "thumb": { "backgroundColor": "theme-primary" } } },
    "tabs":       { "views": { "container": { "borderColor": "theme-border", "fontFamily": "'Inter', system-ui, sans-serif" }, "tab": { "color": "theme-muted" }, "activeTab": { "color": "theme-primary", "borderColor": "theme-primary", "backgroundColor": "transparent" } } },
    "accordion":  { "views": { "container": { "borderColor": "theme-border", "borderRadius": 10, "fontFamily": "'Inter', system-ui, sans-serif" }, "header": { "color": "theme-text" }, "content": { "color": "theme-muted" } } },
    "table":      { "views": { "container": { "borderColor": "theme-border", "fontFamily": "'Inter', system-ui, sans-serif" }, "header": { "color": "theme-muted" }, "row": { "borderColor": "theme-border" } } },
    "avatar":     { "views": { "container": { "backgroundColor": "theme-surface", "color": "theme-text", "borderColor": "theme-border", "borderRadius": 9999, "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "status":     { "views": { "container": { "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" }, "dot": { "backgroundColor": "theme-primary" } } },
    "progress":   { "views": { "container": { "backgroundColor": "theme-border", "borderRadius": 9999 }, "bar": { "backgroundColor": "theme-primary" } } },
    "loader":     { "views": { "container": { "color": "theme-primary" } } },
    "separator":  { "views": { "container": { "backgroundColor": "theme-border" } } },
    "navigation": { "views": { "container": { "backgroundColor": "theme-canvas", "color": "theme-text", "borderColor": "theme-border", "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "hero":       { "views": { "container": { "backgroundColor": "theme-canvas", "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" } } },
    "page":       { "views": { "container": { "backgroundColor": "theme-canvas", "color": "theme-text", "fontFamily": "'Inter', system-ui, sans-serif" } } }
  },
  "personality": {
    "cornerStyle":     "soft",
    "typeWeight":      "bold",
    "typeCase":        "normal",
    "typeStyle":       "normal",
    "letterSpacing":   "-0.01em",
    "accentTreatment": "flat",
    "signatureMotif":  "●",
    "density":         "comfortable",
    "surfaceTone":     "paper",
    "cardRadius":      12,
    "pillRadius":      9999,
    "badgeRadius":     6,
    "voice":           "neutral"
  }
}
```

The fontFamily strings in `components.*.views.*.fontFamily` should mirror `tokens.typography.fontFamily` exactly — if you change the primary face, change it in both places.

### 9.9 Self-validation rubric

Run this list against the output before declaring done:

**Schema correctness**
- [ ] All five top-level sections present: `metadata`, `theme`, `tokens`, `components`, `personality`.
- [ ] All 11 theme slots present and non-null: `primary`, `secondary`, `success`, `warning`, `error`, `canvas`, `surface`, `text`, `muted`, `border`, `onPrimary`.
- [ ] All 22 component keys present (see template): `button`, `badge`, `card`, `alert`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `slider`, `tabs`, `accordion`, `table`, `avatar`, `status`, `progress`, `loader`, `separator`, `navigation`, `hero`, `page`.
- [ ] Schema-drift audit from [§3.6](#36-uniform-schema-across-configs) passes against existing configs.

**Token discipline**
- [ ] No literal hex (`#xxxxxx`) inside `components.*.views.*`. Every color is a `theme-*` token reference.
- [ ] `views.container.color` is **not** set on `badge`/`button` in a way that overrides variant logic ([§7.1](#71-keep-overrides-variant-safe)).
- [ ] `label.color` is **absent** on `checkbox`/`radio`/`switch`/`input`/`textarea`/`select` ([§7.2](#72-strip-labelcolor-from-brand-component-configs)).
- [ ] Every font family in `components.*.views.*.fontFamily` matches `tokens.typography.fontFamily`.

**Light/dark adaptivity** (so one config serves both modes — [theming.md §2.1](./theming.md#21-one-config-both-modes--the-adaptive-rule))
- [ ] Neutral slots `canvas`, `surface`, `text`, `muted`, `border` are **`color-*` token references**, not raw hex — so they flip with the theme mode.
- [ ] Brand slots `primary`, `secondary`, `success`, `warning`, `error`, `onPrimary` are **raw hex** — constant across modes.
- [ ] The five neutral slots all use **one** grey family (`color-gray-*`, or one tint family) — not mixed.
- [ ] Components reference `theme-text` / `theme-muted` for body ink — **never** a constant brand slot like `theme-secondary` (which would stay dark on a dark canvas).

**Contrast & legibility** (verify in **both** light and dark)
- [ ] `text` vs `canvas` ≥ 4.5:1.
- [ ] `onPrimary` vs `primary` ≥ 4.5:1.
- [ ] `primary` ≥ 3:1 against **both** `color-white` and `color-black` (it doesn't flip).
- [ ] `surface` ≠ `canvas` (visually distinguishable).
- [ ] `muted` vs `canvas` ≥ 3:1.

**Distinctiveness (the "is this brand-shaped?" check)**
- [ ] At least 3 personality dimensions are non-default ([§9.6](#96-diversity-heuristics--avoid-the-generic-purple-startup-trap)).
- [ ] `signatureMotif` is not `●`.
- [ ] `voice` is not `neutral`.
- [ ] `monoFamily` is a real mono, not the body font reused.
- [ ] Primary hex is not within `#6` of the indigo family (`#6366f1` ± neighborhood).
- [ ] `cardRadius`/`pillRadius`/`badgeRadius` are **not all equal** — the spread itself signals the brand.

**Font loading**
- [ ] Every non-system font referenced in `tokens.typography.fontFamily` appears in `metadata.googleFontLinks` (or is shipped locally).
- [ ] The chain ends in a system fallback (`system-ui`, `-apple-system`, `sans-serif`).

### 9.10 When a source HTML exists

If the brand has a reference page under `design.md/html/<brandid>.html`, **extract first, then refine**:

1. Open the HTML and inspect the CSS custom properties (`--*`) in `:root`. Capture them into `tokens.rawCssVars` verbatim.
2. Identify which raw vars play the role of each of the 11 theme slots; use those hexes in `theme`.
3. Echo the brand's typography choices into `tokens.typography.fontFamily` — don't invent a font the brand doesn't use.
4. Open `/design-system` and select the brand from the sidebar — the **Compare** view shows live components next to the source iframe. Iterate `views.*` overrides until the live components feel like the source.

### 9.11 Worked example — generating "Hyperloop" (fictional)

To anchor the playbook, here's how it applies end-to-end to a fictional brand: *Hyperloop — high-speed transit, premium, technical-spec aesthetic, dark default.*

1. **Primary hex**: `#00d4ff` (electric cyan — owns the "speed/transit" lane without colliding with Tesla blue).
2. **Appearance**: `dark` (premium-technical brands default dark).
3. **Theme** (built per [§9.3](#93-theme-palette-recipe)):
   - Brand (hex, constant): `primary #00d4ff`, `secondary #00a4cc` (darker analog), `success #00d68f`, `warning #ffb547`, `error #ff5757`, `onPrimary #001218` (dark ink on cyan for AA). `primary` reads on both white and black ✓.
   - Neutrals (`color-*` tokens, adaptive): `canvas color-white`, `surface color-gray-50`, `text color-black`, `muted color-gray-500`, `border color-gray-200`. With `defaultAppearance: "dark"` the config **opens** with a near-black canvas + light ink, and still works if the user toggles to light. *(If a brand truly needs exact, bespoke dark-only neutrals — e.g. a glass `#0f1115` surface — pin those as hex instead, accepting they won't flip.)*
4. **Typography**: *Modern-Mono-Hybrid* — body `Inter`, mono `JetBrains Mono`, plus `googleFontLinks` for both.
5. **Personality**: *Dev-Editorial* archetype, but tune `signatureMotif: '→'`, `accentTreatment: 'glow'`, `voice: 'velocity-precision'`.
6. **Components**: from the starter template; replace generic `Inter` with the chosen family; `tabs.activeTab` underline style (`backgroundColor: "transparent"`); `button.color: "theme-primary"`.
7. **Diversity check** ([§9.6](#96-diversity-heuristics--avoid-the-generic-purple-startup-trap)): cyan primary ✓, `density: tight` ✓, `surfaceTone: glass` ✓, mono is real ✓, `signatureMotif: →` ✓. *Five levers moved — distinctive.*
8. **Validate** ([§9.9](#99-self-validation-rubric)): all schema, token-discipline, contrast, distinctiveness, and font-loading boxes pass.

The output is a config that *renders correctly* and *unmistakably reads as Hyperloop*, not as another indigo-purple startup template.

---

## 8. Reference

- Provider & hooks: [src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx)
- Types (incl. `BrandPersonality`): [src/design-system/types.ts](../../src/design-system/types.ts)
- Merge utilities: [src/design-system/utils.ts](../../src/design-system/utils.ts) — `deepMerge` (skips top-level `undefined`/`null`; recurses only when both sides are plain objects, so React-element props stay reference-only and don't trigger cycles), `getDesignSystemComponentProps` (runs `stripNullsDeep` so the schema's `null` placeholders never reach the merge — see [§3.6](#36-uniform-schema-across-configs)), `mergeDesignSystemComponentProps`, `normalizeDesignSystemComponentProps`
- Default adaptive config: [src/design-system/configs/default.json](../../src/design-system/configs/default.json) — the brand-neutral fallback; brand slots are hex (constant), neutral slots are `color-*` tokens (auto-flip), so it renders correctly in light **and** dark. The reference implementation of [theming.md §2.1](./theming.md#21-one-config-both-modes--the-adaptive-rule).
- 15 brand configs: [src/design-system/configs/](../../src/design-system/configs/) — fully tokenized; all `components.*.views.*` colors are `theme-*` references. (These are brand *snapshots* and currently pin their neutral slots as hex for their native appearance — convert a slot to a `color-*` token per §2.1 to make that brand adapt.)
- Live showcase: [src/pages/designSystem.page.tsx](../../src/pages/designSystem.page.tsx) — ergonomic patterns for `componentRadius`, `getPersonality`, `personality*` helpers, `BrandSnapshotSample`, `PaletteFrame`
- Theming primer (token vocabulary): [docs/design-system/theming.md](./theming.md)
- Wider conventions: [docs/conventions.md](../conventions.md)
- Working example components: [src/components/Button/](../../src/components/Button/), [src/components/Badge/](../../src/components/Badge/), [src/components/Card/](../../src/components/Card/), [src/components/Table/](../../src/components/Table/) — each ends in a one-line `useMergedDesignSystemComponentProps('xxx', props)` call, the pattern to copy. Badge in particular is the reference for variant-safe override application.
