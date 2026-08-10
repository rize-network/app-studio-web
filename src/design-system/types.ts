export type DesignSystemAppearance = 'light' | 'dark';

export type DesignSystemComponentName =
  | 'accordion'
  | 'alert'
  | 'avatar'
  | 'badge'
  | 'button'
  | 'card'
  | 'checkbox'
  | 'hero'
  | 'input'
  | 'loader'
  | 'navigation'
  | 'page'
  | 'progress'
  | 'radio'
  | 'select'
  | 'separator'
  | 'slider'
  | 'status'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'textarea';

export type DesignSystemViewProps = Record<string, any>;

export interface DesignSystemMetadata {
  id: string;
  label: string;
  sourcePath: string;
  sourceTitle: string;
  defaultAppearance: DesignSystemAppearance;
  googleFontLinks?: string[];
}

/**
 * The eleven semantic theme slots. A single config serves **both** light and
 * dark mode — the dark theme is derived automatically by app-studio's
 * ThemeProvider. The *form* of each value decides how the slot behaves when
 * the theme mode switches:
 *
 * - A **`color-*` token** (`"color-black"`) is emitted as
 *   `--theme-<slot>: var(--color-black)` and **flips automatically**:
 *   `color-black` → black in light / white in dark, `color-white` → black in
 *   dark, and the `color-gray-*` ramp inverts. Use it for structural neutrals.
 * - A **parseable literal** (`"#2563eb"`, `rgb(...)`) is **snapped to the
 *   nearest palette token** (`normalizeThemeColors` in app-studio), so it
 *   also adapts to dark mode — brand hexes get the dark-mode variant of the
 *   closest palette shade rather than staying frozen.
 * - An **unparseable literal** (a CSS named colour, a gradient) stays
 *   constant across modes. For the neutral slots (canvas, surface, text,
 *   muted, border) app-studio warns about this in development, because a
 *   frozen neutral reads as a dark-mode regression.
 *
 * Rule of thumb: **use `color-*` tokens for the structural neutrals (canvas,
 * text, surface, muted, border) and hex for brand accents (primary,
 * secondary, states) — knowing the hex will be palette-snapped so it stays
 * legible in dark mode.** See `docs/design-system/theming.md` §2.1.
 */
export interface DesignSystemTheme {
  /** Brand primary (CTAs, links, focus). Constant → use a **hex**. */
  primary: string;
  /** Brand secondary accent. Constant → use a **hex** (not for body ink). */
  secondary: string;
  /** Positive state. Constant → use a **hex**. */
  success: string;
  /** Caution / pending state. Constant → use a **hex**. */
  warning: string;
  /** Destructive / failure state. Constant → use a **hex**. */
  error: string;
  /** Page background. Adaptive → use a **`color-*` token** (e.g. `color-white`). */
  canvas: string;
  /** Card / elevated surface. Adaptive → use a **`color-*` token** (e.g. `color-gray-50`). */
  surface: string;
  /** Primary ink / body copy. Adaptive → use a **`color-*` token** (e.g. `color-black`). */
  text: string;
  /** Secondary ink (captions, helper). Adaptive → use a **`color-*` token** (e.g. `color-gray-500`). */
  muted: string;
  /** Hairlines, dividers, control borders. Adaptive → use a **`color-*` token** (e.g. `color-gray-200`). */
  border: string;
  /** Ink on top of `primary` (button label). Constant → use a **hex** (usually `#ffffff`). */
  onPrimary: string;
}

export interface DesignSystemColorToken {
  name: string;
  value: string;
  role: string;
}

export interface DesignSystemTypographyTokens {
  fontFamily: string;
  monoFamily: string;
  fontSizes: string[];
  fontWeights: string[];
  lineHeights: string[];
}

export interface DesignSystemTokens {
  rawCssVars: Record<string, string>;
  colors: DesignSystemColorToken[];
  typography: DesignSystemTypographyTokens;
  spacing: string[];
  radii: string[];
  shadows: string[];
}

export interface DesignSystemComponentConfig extends Record<string, any> {
  /**
   * Per-slot style defaults applied ABOVE the component's variant styles.
   * Contract: shape + typography only (radius, font, letterSpacing, casing…).
   * Never put colors here for variant-driven components (Button): a
   * `views.container.backgroundColor` flattens ghost/outline/subtle into
   * solid blocks. Colors go through the top-level `color`/`textColor` keys,
   * or `config.variants.<variant>` for per-variant overrides (merged UNDER
   * each variant's own styles).
   */
  views?: Record<string, DesignSystemViewProps>;
  config?: Record<string, any>;
}

export type BrandCornerStyle = 'sharp' | 'soft' | 'pill';
export type BrandTypeWeight = 'light' | 'regular' | 'bold' | 'black';
export type BrandTypeCase = 'normal' | 'uppercase';
export type BrandTypeStyle = 'normal' | 'italic';
export type BrandAccentTreatment =
  | 'flat'
  | 'gradient'
  | 'stripe'
  | 'glow'
  | 'halftone';
export type BrandDensity = 'tight' | 'comfortable' | 'spacious';
export type BrandSurfaceTone = 'paper' | 'glass' | 'matte' | 'mono';

export interface BrandPersonality {
  cornerStyle: BrandCornerStyle;
  typeWeight: BrandTypeWeight;
  typeCase: BrandTypeCase;
  typeStyle: BrandTypeStyle;
  letterSpacing: string;
  accentTreatment: BrandAccentTreatment;
  signatureMotif: string;
  density: BrandDensity;
  surfaceTone: BrandSurfaceTone;
  cardRadius: number;
  pillRadius: number;
  badgeRadius: number;
  voice: string;
}

export interface DesignSystemConfig {
  metadata: DesignSystemMetadata;
  theme: DesignSystemTheme;
  tokens: DesignSystemTokens;
  components: Partial<
    Record<DesignSystemComponentName, DesignSystemComponentConfig>
  >;
  personality?: BrandPersonality;
}

export interface DesignSystemContextValue {
  config?: DesignSystemConfig;
  configId?: string;
  isEnabled: boolean;
}
