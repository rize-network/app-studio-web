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
  "primary":     "#ff385c",
  "secondary":   "#222222",
  "success":     "#428bff",
  "warning":     "#460479",
  "error":       "#c13515",
  "canvas":      "#ffffff",
  "surface":     "#f7f7f7",
  "text":        "#222222",
  "muted":       "#6a6a6a",
  "border":      "#dddddd",
  "onPrimary":   "#ffffff"
}
```

`theme` is the **only** place hex values for those eleven roles should live. Everything else — `tokens.colors[]`, `components.*.views`, page-level inline styles — should reference them via `theme-*` token strings. That's the contract: change one hex in `theme.primary` and every button, badge, focus ring, link, and brand snapshot updates across the design-system page.

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

## 8. Reference

- Provider & hooks: [src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx)
- Types (incl. `BrandPersonality`): [src/design-system/types.ts](../../src/design-system/types.ts)
- Merge utilities: [src/design-system/utils.ts](../../src/design-system/utils.ts) — `deepMerge`, `getDesignSystemComponentProps`, `mergeDesignSystemComponentProps`, `normalizeDesignSystemComponentProps`
- 15 brand configs: [src/design-system/configs/](../../src/design-system/configs/) — fully tokenized; all `components.*.views.*` colors are `theme-*` references
- Live showcase: [src/pages/designSystem.page.tsx](../../src/pages/designSystem.page.tsx) — ergonomic patterns for `componentRadius`, `getPersonality`, `personality*` helpers, `BrandSnapshotSample`, `PaletteFrame`
- Theming primer (token vocabulary): [docs/design-system/theming.md](./theming.md)
- Wider conventions: [docs/conventions.md](../conventions.md)
- Working example components: [src/components/Button/](../../src/components/Button/), [src/components/Badge/](../../src/components/Badge/), [src/components/Card/](../../src/components/Card/), [src/components/Table/](../../src/components/Table/) — each ends in a one-line `useMergedDesignSystemComponentProps('xxx', props)` call, the pattern to copy. Badge in particular is the reference for variant-safe override application.
