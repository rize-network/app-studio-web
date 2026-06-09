# Theming Guide

This guide explains how the design-system theming layer works end-to-end: the providers, the tokens you can reference, and how brand-specific values get propagated to every component without you wiring anything per-brand.

For the architectural overview and how to author components against this system, see [component-library.md](./component-library.md).

---

## 1. Two providers — what does what

The app uses two cooperating providers, set up once at the root in [src/providers/index.tsx](../../src/providers/index.tsx):

```tsx
<ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
  <GoogleFontProvider>
    <ThemeProvider mode={mode} theme={{ primary: 'color-blue-700', secondary: 'color-purple-500' }}>
      <ResponsiveProvider>
        <RouterProvider>{children}</RouterProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  </GoogleFontProvider>
</ThemeModeContext.Provider>
```

| Provider              | Role                                                                                              |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `ThemeProvider`       | App-studio's color-resolver context. Sets the global `themeMode` (`light` / `dark`) and the default `theme-primary` / `theme-secondary` colors. |
| `ThemeModeContext`    | Local-app toggle between light and dark mode. The `useThemeMode()` hook reads this.               |
| `GoogleFontProvider`  | Imports the Google Fonts referenced in `metadata.googleFontLinks` (per-brand fonts inject into `<Helmet>`). |
| `DesignSystemProvider` | **Optional, brand-aware layer.** Drops into any subtree and overrides the theme tokens for that subtree with the active brand's `theme.*` values. |

You can use the design system anywhere by wrapping a subtree in `<DesignSystemProvider config={airbnbConfig}>` (or `configId="airbnb"`). Components below it pick up Airbnb's brand colors via the CSS-variable layer described in §3 — without disturbing the rest of the app.

---

## 2. Theme modes

The app-level mode is a binary `light` / `dark` switch managed by `ThemeModeContext`:

```tsx
import { useThemeMode } from 'src/providers';

function ModeToggle() {
  const { mode, toggleThemeMode } = useThemeMode();
  return <button onClick={toggleThemeMode}>Switch to {mode === 'light' ? 'dark' : 'light'}</button>;
}
```

You can also pin a single component to a specific mode using the `themeMode` prop:

```tsx
<Button themeMode="dark">Always dark</Button>
<Badge themeMode="light">Always light</Badge>
```

Brand configs declare their `defaultAppearance` in `metadata` (`light` or `dark`). That value only decides **which mode the config opens in** — both modes work regardless (see §2.1). The design-system showcase respects `defaultAppearance` when rendering each brand on its native canvas, but also renders an inverted PaletteFrame so you can see the brand on the opposite surface.

### 2.1 One config, both modes — the adaptive rule

You never write a separate dark config. A single `theme` block serves **both** light and dark, and the dark theme is **derived automatically**. What decides whether a slot flips or stays is the **form of the value** you give it — this is exactly what app-studio's `ThemeProvider` emits ([generateCSSVariables](../../../app-studio/src/providers/Theme.tsx)):

| Value you write in `theme.<slot>` | What app-studio emits        | Behaviour when the mode switches |
|-----------------------------------|------------------------------|----------------------------------|
| A **raw hex** — `"#2563eb"`       | `--theme-<slot>: #2563eb`     | **Stays constant.** Identical in light and dark. |
| A **`color-*` token** — `"color-black"` | `--theme-<slot>: var(--color-black)` | **Flips automatically.** `color-black` → black in light, **white** in dark; `color-white` → black in dark; the `color-gray-*` ramp inverts. |

So the rule is:

> **Want the color to stay the same in both modes?** Use a **hex** — your brand identity (`primary`, `secondary`, status accents, `onPrimary`).
> **Want it to adapt when the mode flips?** Use a **`color-*` token** — your structural neutrals (`canvas`, `surface`, `text`, `muted`, `border`).

Recommended mapping for a config that works in both modes out of the box:

```jsonc
"theme": {
  "primary":   "#2563eb",        // hex  → constant brand color
  "secondary": "#7c3aed",        // hex  → constant
  "success":   "#16a34a",        // hex  → constant
  "warning":   "#d97706",        // hex  → constant
  "error":     "#dc2626",        // hex  → constant
  "onPrimary": "#ffffff",        // hex  → constant (ink that sits on primary)

  "canvas":    "color-white",    // → white in light, black in dark
  "surface":   "color-gray-50",  // → #fafafa in light, near-black in dark
  "text":      "color-black",    // → black in light, white in dark
  "muted":     "color-gray-500", // → readable mid-grey in both modes
  "border":    "color-gray-200"  // → light hairline → dark hairline
}
```

Because `theme-canvas` / `theme-text` / `theme-surface` / `theme-border` / `theme-muted` now point at auto-flipping palette variables, **every component that references those tokens adapts for free** — no `themeMode` branching in component code, no second config to maintain.

Two practical notes:

- **Brand slots don't flip, so they must read in *both* modes.** A `primary` chosen only for a white canvas can wash out on black. Pick a `primary` with ≥ 3:1 contrast against both `color-white` and `color-black` (most mid-tone brand colors already pass).
- **Use a neutral *family* for character.** Prefer a warmer or cooler grey while keeping auto-flip by swapping the family: `color-slate-*` (cool), `color-stone-*` (warm), `color-zinc-*`, `color-neutral-*`. The shade still inverts; only the hue changes.
- **For body ink, reference `theme-text` / `theme-muted` — never a constant brand slot** like `theme-secondary`. A constant dark `secondary` used as text becomes unreadable when the canvas turns dark.
- **`primary` and `onPrimary` must use the same *form*** — both hex, or both `color-*`. They are a fill/ink pair; if one flips and the other doesn't, the label disappears in one mode. For a black-or-white brand you may make *both* `color-*` (`primary: color-black`, `onPrimary: color-white`) so the CTA inverts authentically.

### 2.2 Brand = fills, neutrals = foreground

The single rule that keeps **every** brand (including pure black/white ones) coherent on both light and dark surfaces:

> **Brand tokens (`theme-primary`, `theme-secondary`, …) are for *fills*** — they paint a background and pair with an `on*` ink. **Surface-contrasting foreground** (body text, outline borders, dividers, helper text) uses the **neutral** slots (`theme-text`, `theme-muted`, `theme-border`), which flip *with* the surface.

Why: a filled element brings its own background, so its `onPrimary` ink is always correct. But a foreground element (an outline border, a link, an active-tab label) sits *on* the surface — if you colour it with `theme-primary` and the brand's primary happens to equal the surface (a monochrome brand: black primary on a dark card), it vanishes. Neutral ink flips with the surface, so it is always readable.

A brand-coloured foreground accent (a link, an active-tab label, an alert icon) using `theme-primary` is fine **for chromatic brands**. For monochrome brands, use `theme-text` or a chromatic `theme-secondary` for those accents instead.

> **Note (resolver fix).** `theme-*` tokens flip correctly in **both** modes, including inside nested, mode-pinned providers (e.g. a "show on dark surface" frame). app-studio re-declares the token-referencing `--theme-*` variables inside the `[data-theme]` blocks so they re-substitute per mode — see [generateCSSVariables](../../../app-studio/src/providers/Theme.tsx). A `theme-text` foreground is therefore as reliable as a `color-black` one.

---

## 3. How brand tokens flow through app-studio

When a `DesignSystemProvider` mounts, it does two things:

1. Stores the config in React context (so hooks reach the active brand).
2. **Delegates to app-studio's `<ThemeProvider>`** — passing `theme={config.theme}`, `mode={config.metadata.defaultAppearance}`, and `transparentWrapper` (so the inner provider doesn't repaint the page).

app-studio's `<ThemeProvider>` then:
- Iterates the `theme` object you gave it and emits one `--theme-<key>` CSS variable per slot (`--theme-primary`, `--theme-canvas`, …).
- Registers those slots with the color resolver so `getColor('theme-primary')` returns `var(--theme-primary)`.
- Adds `data-theme="light|dark"` on a div so `[data-theme=…]` color-scale selectors can scope properly.

The DesignSystemProvider also sets `data-design-system="<id>"` and `data-appearance="light|dark"` on a `display:contents` child, purely for downstream CSS hooks.

Inside the subtree, the following CSS variables are live (one per slot in your brand `theme` block):

```
--theme-primary       (e.g., #FF385C for Airbnb, #1DB954 for Spotify)
--theme-secondary
--theme-success
--theme-warning
--theme-error
--theme-canvas
--theme-surface
--theme-text
--theme-muted
--theme-border
--theme-onPrimary
```

You don't write `var(--theme-primary)` in components — you write `'theme-primary'`. App-studio's resolver — same code path as for `color-blue-500` and any other token — turns that into `var(--theme-primary)` at render time, which the browser resolves to the brand's hex. The component code doesn't know which brand is active and doesn't have to.

### 3.1 Why this matters

The resolver, not the DesignSystemProvider, is the bridge. That means every code path in app-studio that already handles `theme-*` tokens — alpha suffixes (`theme-primary-100` = 10% mix), token references in theme objects (`theme.primary: 'color-blue-700'` chains correctly), `getColor` / `getColorHex` / `getColorRGBA` helpers, the `useTheme` hook — automatically works for brand tokens too. There's no parallel resolution layer to maintain.

### 3.2 Pseudo-element / browser pseudo-class styling

For things that have historically required a `.css` file — `::placeholder`, `::selection`, `:-webkit-autofill`, `::-webkit-contacts-auto-fill-button`, browser spinner buttons — use app-studio's `_*` props. The resolver handles theme tokens the same way it does for regular props.

```tsx
<Input
  _placeholder={{ color: 'color-gray-400', opacity: 1 }}
  _focus={{ _placeholder: { opacity: 0.7 } }}
  _selection={{ backgroundColor: 'theme-primary-200' }}
  _webkitAutofill={{
    boxShadow: '0 0 0 1000px theme-canvas inset',
    WebkitTextFillColor: 'theme-text',
  }}
/>
```

Supported pseudos include `_hover`, `_focus`, `_active`, `_focusVisible`, `_focusWithin`, `_disabled`, `_checked`, `_placeholder`, `_selection`, `_before`, `_after`, `_marker`, `_backdrop`, `_webkitAutofill`, `_webkitContactsAutoFillButton`, `_webkitInnerSpinButton`, `_webkitOuterSpinButton`, `_webkitSearchCancelButton`, `_mozPlaceholder`, `_mozFocusInner`, plus group / peer modifiers. Pseudos nest — `_focus={{ _placeholder: {...} }}` compiles to `:focus::placeholder { ... }`.

For alpha tints, prefer the resolver's `theme-primary-100`–`theme-primary-1000` alpha suffix — it generates `color-mix(in srgb, var(--theme-primary) X%, transparent)` internally and stays consistent with the rest of the resolver output.

### 3.3 React inline style

```tsx
<View style={{ color: 'var(--theme-text)', backgroundColor: 'var(--theme-surface)' }}>
  ...
</View>
```

### 3.4 The `useTheme` hook (app-studio)

```tsx
import { useTheme } from 'app-studio';

function Snippet() {
  const { getColor, themeMode } = useTheme();
  const primary = getColor('theme-primary', { themeMode });   // → 'var(--theme-primary)'
  return <View backgroundColor={primary} />;
}
```

---

## 4. Token reference

### 4.1 Semantic theme tokens (the eleven slots)

| Token              | Meaning                                              |
|--------------------|------------------------------------------------------|
| `theme-primary`    | Brand primary — main CTAs, links, focus rings        |
| `theme-secondary`  | Brand secondary — supporting accents                 |
| `theme-success`    | Positive state                                       |
| `theme-warning`    | Caution / pending state                              |
| `theme-error`      | Destructive / failure state                          |
| `theme-canvas`     | Page background                                      |
| `theme-surface`    | Card / elevated surface background                   |
| `theme-text`       | Primary ink                                          |
| `theme-muted`      | Secondary ink (helper, captions, disabled-ish)       |
| `theme-border`     | Hairlines, dividers, default control borders         |
| `theme-onPrimary`  | Ink that sits on top of `theme-primary` (button text)|

Every slot has matching alpha-suffix variants: `theme-primary-100` (10% primary) through `theme-primary-1000` (100%). app-studio's resolver renders these as `color-mix(in srgb, var(--theme-primary) X%, transparent)`.

Every brand provides all eleven. Use them in priority over neutral-scale tokens whenever the value should respect the brand. Which of these slots flip with the theme mode and which stay constant is decided by the config (see [§2.1](#21-one-config-both-modes--the-adaptive-rule)): the recommended setup makes `canvas`, `surface`, `text`, `muted`, `border` adaptive and keeps `primary`, `secondary`, `success`, `warning`, `error`, `onPrimary` constant.

### 4.2 Neutral / palette colors (`color-*`)

The `color-*` family is **brand-independent but theme-mode-aware** — the same token resolves to different values in light vs dark:

- `color-white` (→ black in dark), `color-black` (→ white in dark)
- `color-gray-50` … `color-gray-900` (the ramp inverts: `50` is lightest in light mode, darkest in dark mode), plus the tinted families `color-slate-*`, `color-stone-*`, `color-zinc-*`, `color-neutral-*`
- `color-blue-*`, `color-green-*`, `color-red-*`, `color-yellow-*`, `color-purple-*`, `color-orange-*`, etc.

You force a fixed mode with the `light-*` / `dark-*` prefix (`light-gray-100` stays light even in dark mode) — rarely needed.

Two ways to use them:

1. **Inside a `theme` slot** (`"text": "color-black"`) — this is how you make a brand slot *adaptive* ([§2.1](#21-one-config-both-modes--the-adaptive-rule)).
2. **Directly in a component** (`backgroundColor="color-gray-50"`) — for utility chrome that should track the mode but not the brand. Use sparingly; anything brand-facing should prefer `theme-*`.

### 4.3 The `'inherit'` keyword

For label-style text where the color should track the surrounding ink, use `color: 'inherit'`. The form controls (Checkbox, Radio, Switch, FieldLabel, StatusIndicator, Table cells) all default to `inherit` so they remain readable on any brand surface. Brand configs intentionally **omit** `label.color` to let this work — see [component-library.md §7.2](./component-library.md#72-strip-labelcolor-from-brand-component-configs).

---

## 5. Typography

Each brand sets its own typography stack via `config.tokens.typography`:

```jsonc
"typography": {
  "fontFamily": "'Inter', system-ui, sans-serif",
  "monoFamily": "ui-monospace, SF Mono, monospace",
  "fontSizes":   ["12px","14px","16px","18px","24px","32px","48px"],
  "fontWeights": ["300","400","500","600","700","800"],
  "lineHeights": ["1.0","1.2","1.4","1.6"]
}
```

The web fonts those families reference must be listed in `metadata.googleFontLinks` so `<Helmet>` injects the link tag (or shipped locally — Vercel's `Geist` is loaded via Google Fonts as a custom font). Commercial brand fonts (Cereal, sohne, Aeonik, Gotham, Uber Move, Spotify Circular, Shopify Sans) gracefully fall through to Inter or system-ui in the listed chain.

Usage in components:

```tsx
<Text fontSize={16} fontWeight={500}>Body text</Text>
<Text fontSize={32} fontWeight={700} letterSpacing="-0.02em">Headline</Text>
```

Or, for brand-aware code:

```tsx
import { useDesignSystem } from 'src/design-system';

function BrandedHeadline({ children }: { children: React.ReactNode }) {
  const { config } = useDesignSystem();
  return (
    <Text
      fontFamily={config.tokens.typography.fontFamily}
      fontWeight={config.personality?.typeWeight === 'black' ? 800 : 700}
      letterSpacing={config.personality?.letterSpacing ?? '-0.01em'}
    >
      {children}
    </Text>
  );
}
```

---

## 6. Spacing

The 4-px grid is the unit. Spacing tokens are exposed via `config.tokens.spacing` as a sorted array:

```jsonc
"spacing": ["2px","4px","8px","12px","16px","24px","32px","56px"]
```

Components should accept padding/margin via the standard `app-studio` shorthand props (`padding`, `gap`, `marginTop`, …) rather than reading the spacing array. The array is documentation/tooling material.

```tsx
<View padding={16}>
  <Horizontal gap={8}>
    <View width={50} height={50} backgroundColor="theme-primary" />
    <View width={50} height={50} backgroundColor="theme-secondary" />
  </Horizontal>
</View>
```

---

## 7. Shapes (border radius)

There are three patterns the design system uses:

| Token                | Default | Meaning                                            |
|----------------------|---------|----------------------------------------------------|
| `shape="square"`     | `0`     | Sharp corners (Nike, SpaceX, Tesla, Uber, Vercel) |
| `shape="rounded"`    | `8px`   | Soft corners (most brands)                         |
| `shape="pill"`       | `9999px`| Fully rounded (Revolut, Spotify)                   |

A component-level config can also pin its own `borderRadius` per slot, e.g., `card.views.container.borderRadius: 12`. The brand-personality block in each config carries the canonical `cardRadius`, `pillRadius`, `badgeRadius` numbers — pages and helpers consume those when assembling brand-shaped compositions.

```tsx
<Button shape="square">Sharp</Button>
<Button shape="rounded">Rounded (default)</Button>
<Button shape="pill">Pill</Button>
```

---

## 8. Shadows

Shadows come from `config.tokens.shadows` (a sorted array, lightest first). Component-level configs typically pick an index. The `Shadow` prop type covers `'sm' | 'md' | 'lg' | 'xl'` for components that expose a named shadow scale:

```tsx
<Card shadow="sm">Small shadow</Card>
<Card shadow="md">Medium shadow</Card>
<Card shadow="lg">Large shadow</Card>
```

For bespoke values, pass through `views.container.boxShadow` or inline `style`.

---

## 9. Working with the active design-system config

For pages that need raw access to the brand:

```tsx
import { useDesignSystem } from 'src/design-system';

function PageWithBrand() {
  const { config, isEnabled } = useDesignSystem();
  if (!isEnabled) return null;

  return (
    <View
      backgroundColor="theme-canvas"
      color="theme-text"
      fontFamily={config.tokens.typography.fontFamily}
    >
      <Heading>{config.metadata.label}</Heading>
    </View>
  );
}
```

> **Don't read `config.theme.canvas` / `config.theme.text` into a raw React `style={{}}`.** Those slots may hold token strings like `"color-white"` (adaptive), which the browser can't resolve as CSS. Pass them as app-studio **props** (`backgroundColor="theme-canvas"`) so the resolver turns them into the right per-mode value. Raw `config.theme.*` values are only safe in `style` when you know the brand pinned a literal hex.

To pre-fetch one component's brand config (to compose a custom variant manually):

```tsx
import { useDesignSystemComponentProps } from 'src/design-system';

function HeroButton() {
  const buttonConfig = useDesignSystemComponentProps('button');
  return (
    <Button views={{ container: { borderRadius: buttonConfig?.views?.container?.borderRadius } }}>
      Get started
    </Button>
  );
}
```

For the common pattern of merging brand defaults with the user's explicit props (which is what every component does internally), use `useMergedDesignSystemComponentProps` — see [component-library.md §4.2](./component-library.md#42-public-entry--wire-up-the-design-system).

---

## 10. Best practices

- Reference theme tokens (`theme-primary`, `theme-canvas`, …) instead of literal hex.
- Don't lock label or helper-text color in brand configs — let `inherit` carry the cascade.
- Use `views` to override component slots; use top-level props for layout/sizing knobs the component exposes.
- Use `themeMode` on a single component when you intentionally need it to render light/dark against the page.
- Follow the 4-px spacing grid.
- Reach for `config.personality` (cornerStyle, typeWeight, accentTreatment, …) when a page needs brand cues that don't fit into 11 colors and slot styling.
- Verify any new font is loaded via `metadata.googleFontLinks` — otherwise the chain silently falls through.

---

## See also

- [design-system.md](./design-system.md) — **step-by-step recipe to generate a new brand config** (agent-facing build instructions).
- [component-library.md](./component-library.md) — how to author components and brand configs.
- [src/design-system/types.ts](../../src/design-system/types.ts) — TypeScript types for `DesignSystemConfig`, `BrandPersonality`, all component slot maps.
- [src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx) — provider source incl. CSS-var injection.
- [src/design-system/configs/](../../src/design-system/configs/) — 15 shipped brand configs.
