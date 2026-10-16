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
export interface DesignSystemTheme {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
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
