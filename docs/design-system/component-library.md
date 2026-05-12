# Building a Component Library on top of the Design System

This document explains the design-system architecture in [src/design-system/](../../src/design-system/) and shows how to author new components so they automatically pick up brand-specific tokens (colors, typography, spacing, radii, shadows) and component-level overrides (variant, size, shape, views).

You should be able to drop a component into the library and have it correctly render under any of the 15 shipped brand configs (`airbnb`, `apple`, `coinbase`, `figma`, `linear`, `nike`, `notion`, `revolut`, `shopify`, `spacex`, `spotify`, `stripe`, `tesla`, `uber`, `vercel`) without touching a single config file.

---

## 1. Mental model

```
┌──────────────────────────────────────────────────────────────────┐
│                       DesignSystemProvider                       │
│  React context holding a single DesignSystemConfig               │
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
                              └────────────────────────────────┘
```

A `DesignSystemConfig` is a plain JSON object with four sections:

| Section      | Holds                                                                                          |
|--------------|------------------------------------------------------------------------------------------------|
| `metadata`   | `id`, `label`, `sourcePath`, `defaultAppearance` (`light` / `dark`), optional Google Font links |
| `theme`      | 11 semantic colors: `primary`, `secondary`, `success`, `warning`, `error`, `canvas`, `surface`, `text`, `muted`, `border`, `onPrimary` |
| `tokens`     | Raw extracted material: `rawCssVars`, `colors[]`, `typography`, `spacing[]`, `radii[]`, `shadows[]` |
| `components` | Per-component defaults: `{ variant, size, shape, color, views: { container, label, ... } }`    |

A component reads two things at render time:
1. **Theme tokens** — via `theme-primary`, `theme-canvas`, etc. (resolved by `app-studio`'s color resolver).
2. **Component config** — via `useMergedDesignSystemComponentProps(name, props)`, which deep-merges the user's explicit props *over* the active brand's defaults.

That's it. No CSS variables, no global styles, no themes-as-classes — just one React context and a deep-merge.

---

## 2. The provider

[src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx) exposes:

```ts
<DesignSystemProvider config={airbnbConfig}>          // by config object
<DesignSystemProvider configId="airbnb">              // by id (looks up in designSystemConfigs)
<DesignSystemProvider />                              // falls back to defaultDesignSystemConfig
```

And three hooks:

```ts
useDesignSystem()                          // → { config, configId, isEnabled }
useDesignSystemComponentProps(name)        // → component config block (variant, size, views, ...)
useMergedDesignSystemComponentProps(name, props)
                                           // → props deep-merged with config defaults; explicit props always win
```

Switching brand at runtime is just a state update of the `config` (or `configId`) prop. Components below re-render with the new tokens.

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

`googleFontLinks` is consumed by `<Helmet>` in the showcase to inject brand-specific web fonts.

### 3.2 `theme` (11 semantic colors)
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

When a component needs a brand color, it should reach for one of these eleven keys, **not** an arbitrary token from `tokens.colors`. This is the contract that lets every brand stay coherent.

### 3.3 `tokens` (raw extracted)
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

Use `tokens.*` for documentation/tooling (color-block grid, elevation gallery) but prefer `theme.*` for actual component styling.

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
        "fontFamily":   "'Inter', system-ui, sans-serif"
      },
      "label": { "fontWeight": 600 }
    }
  }
}
```

The `views` object mirrors the component's own slot map. Every component that opts into the design system should expose a `views: { slotA, slotB, ... }` API; the config's keys must match those slot names.

> **Critical:** put values that depend on the **default variant** (e.g., a filled-button background) at the *slot level* (`views.label.color`), not at the *container level* (`views.container.color`). Container `color` cascades into outline/ghost variants and overrides their proper text color — that bug is what made airbnb's outline badge render white-on-white. See [§7.1](#71-keep-overrides-variant-safe).

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

That single hook call is what wires the component to the brand. It deep-merges the active config's `components.myWidget` over `props` so:
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
    backgroundColor: 'theme-primary',     // ← resolves per-brand
    color:           'theme-onPrimary',
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

`theme-primary` / `theme-canvas` / `theme-text` / etc. are resolved by app-studio against the active config's `theme.*`. **Never hardcode `#ff385c`**, **never read `tokens.colors[N]` from inside a component** — that ties the component to a single brand.

---

## 5. Brand-aware values that don't fit `theme.*`

For things outside the 11 semantic colors — radii, shadows, typography weights — pull from `config.tokens` via the design-system hook in *page-level orchestration code*, not inside reusable components. The component itself should expose a `views` slot the page can fill:

```tsx
// page code that knows about brands
import { useDesignSystem } from 'src/design-system';

const Hero = () => {
  const { config } = useDesignSystem();
  return (
    <Card
      views={{
        container: {
          borderRadius: config.tokens.radii.find((r) => r.endsWith('px')),
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

---

## 6. Authoring a config for a new brand

A config is just a JSON file under [src/design-system/configs/](../../src/design-system/configs/). To add `mybrand`:

1. **Create `mybrand.json`** with all four sections (`metadata`, `theme`, `tokens`, `components`). Use an existing config as a template — `airbnb.json` (light) or `linear.json` (dark) are the cleanest references.
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
4. **Visual check.** Open `/design-system` and pick the brand from the sidebar. The Source HTML and Compare tabs let you visually diff the live components against the original reference.

### 6.1 Brand fingerprint cheat-sheet

The shipped configs cluster into recognizable patterns:

| Aesthetic           | Brands                              | Key tells                                                                  |
|---------------------|-------------------------------------|----------------------------------------------------------------------------|
| Light minimal       | apple, figma, notion, vercel        | rounded everything, soft shadows, neutral surfaces                         |
| Light brand pop     | airbnb, coinbase, shopify, stripe   | strong primary (#ff385c, #0052ff, #008060, #635bff) on white surface       |
| Dark editorial      | linear, spacex                      | inverted theme, primary used as accent rather than CTA bg                  |
| High-contrast bold  | nike, uber, vercel                  | square or pill, no in-between, black/white emphasis                        |
| Vibrant green       | spotify                             | iconic `#1DB954` primary on near-black canvas                              |
| Color-shifted       | tesla, revolut                      | playful gradients, longer radius range, shadow stacks                      |

When auditing your own brand, identify which cluster it fits and start by copying that template's `theme` block.

---

## 7. Pitfalls

### 7.1 Keep overrides variant-safe

```jsonc
// ❌ Bad — breaks outline/ghost variants
"badge": {
  "views": {
    "container": { "color": "#ffffff", "backgroundColor": "#222222" }
  }
}
```

If the user passes `<Badge variant="outline" />`, the variant style sets `color: theme-primary` for outline, but `views.container.color: '#ffffff'` overrides it → outline text is white on a white background.

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

### 7.2 Don't fight the spread order

When a component hardcodes `borderWidth={1}` then spreads `{...views.container}` *after*, your override wins. But if you spread `{...views.container}` *before* its own hardcoded prop — your override loses. Read the view source before assuming `views.X` is honored. In the rare case it isn't, pass the override as a top-level prop on the component (which spreads via `{...props}` last); that was the workaround for `Accordion.Item`'s hardcoded `marginBottom: 8` and `borderWidth: 1` on each item.

### 7.3 Force remount when the brand swaps

Internal `useState` initial values won't update when the config changes. If a component initializes derived state from props (e.g., Tabs from `defaultValue`, Title from `highlightText`), a brand swap can leave it pointing at stale values. Wrap the brand-bound subtree with `key={config.metadata.id}`.

### 7.4 Don't pull `theme.primary` into a component file

Components should reference `'theme-primary'` (the resolver token), not `config.theme.primary`. The resolver is what makes the same component render correctly under every brand without re-imports.

---

## 8. Reference

- Provider & hooks: [src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx)
- Types: [src/design-system/types.ts](../../src/design-system/types.ts)
- Merge utilities: [src/design-system/utils.ts](../../src/design-system/utils.ts) — `deepMerge`, `getDesignSystemComponentProps`, `mergeDesignSystemComponentProps`, `normalizeDesignSystemComponentProps`
- 15 brand configs: [src/design-system/configs/](../../src/design-system/configs/)
- Live showcase: [src/pages/designSystem.page.tsx](../../src/pages/designSystem.page.tsx) — ergonomic patterns for `componentRadius`, `getBrandTitleStyle`, `HeroSection`
- Theming primer (token vocabulary): [docs/design-system/theming.md](./theming.md)
- Wider conventions: [docs/conventions.md](../conventions.md)
- Working example components: [src/components/Button/](../../src/components/Button/), [src/components/Badge/](../../src/components/Badge/), [src/components/Card/](../../src/components/Card/) — each ends in a one-line `useMergedDesignSystemComponentProps('xxx', props)` call, the pattern to copy.
