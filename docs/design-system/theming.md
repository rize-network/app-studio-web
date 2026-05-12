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

Brand configs declare their `defaultAppearance` in `metadata` (`light` or `dark`). The design-system showcase respects that when rendering each brand on its native canvas, but also renders an inverted PaletteFrame so you can see how the brand performs on the opposite surface.

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

Every brand provides all eleven. Use them in priority over neutral-scale tokens whenever the value should respect the brand.

### 4.2 Neutral / static colors

For things that should stay constant across brands (utility chrome, debug overlays):

- `color-white`, `color-black`
- `color-gray-50` through `color-gray-900`
- `color-blue-*`, `color-green-*`, `color-red-*`, `color-yellow-*`, `color-purple-*`, `color-orange-*`, etc.

These don't shift with the active brand. Use them sparingly — anything user-visible should prefer `theme-*`.

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
  const { config, configId, isEnabled } = useDesignSystem();
  if (!isEnabled) return null;

  return (
    <View
      style={{
        backgroundColor: config.theme.canvas,
        color: config.theme.text,
        fontFamily: config.tokens.typography.fontFamily,
      }}
    >
      <Heading>{config.metadata.label}</Heading>
    </View>
  );
}
```

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

- [component-library.md](./component-library.md) — how to author components and brand configs.
- [src/design-system/types.ts](../../src/design-system/types.ts) — TypeScript types for `DesignSystemConfig`, `BrandPersonality`, all component slot maps.
- [src/design-system/DesignSystemProvider.tsx](../../src/design-system/DesignSystemProvider.tsx) — provider source incl. CSS-var injection.
- [src/design-system/configs/](../../src/design-system/configs/) — 15 shipped brand configs.
