import { ViewProps } from 'app-studio';
import { TitleSize, HighlightStyle } from './Title.type';

/**
 * Font sizes for different title sizes
 */
export const TitleSizes = {
  xs: 24,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 72,
};

/**
 * Line heights for different title sizes
 */
export const LineHeights: Record<TitleSize, number> = {
  xs: 32,
  sm: 48,
  md: 56,
  lg: 72,
  xl: 80,
};

/**
 * Responsive typography system that maps title sizes to responsive breakpoints
 * Based on the Typography system with dynamic breakpoint sizing
 */
export const ResponsiveTypography: Record<
  TitleSize,
  {
    fontWeight: number;
    marginBottom?: number;
    letterSpacing?: number;
    media: {
      mobile: { fontSize: number; width?: string; minWidth?: string };
      tablet: { fontSize: number; width?: string; minWidth?: string };
      desktop: { fontSize: number; width?: string; minWidth?: string };
    };
  }
> = {
  // xl maps to H1 - Largest heading
  xl: {
    fontWeight: 500,
    marginBottom: 20,
    letterSpacing: 1.25,
    media: {
      mobile: { fontSize: 42, width: '100%' },
      tablet: { fontSize: 50, width: '100%' },
      desktop: { fontSize: 58, minWidth: '60%' },
    },
  },
  // lg maps to H2 - Large heading
  lg: {
    fontWeight: 500,
    media: {
      mobile: { fontSize: 32 },
      tablet: { fontSize: 40 },
      desktop: { fontSize: 48 },
    },
  },
  // md maps to H3 - Medium heading
  md: {
    fontWeight: 500,
    media: {
      mobile: { fontSize: 20 },
      tablet: { fontSize: 30 },
      desktop: { fontSize: 40 },
    },
  },
  // sm maps to T1 - Title text
  sm: {
    fontWeight: 400,
    letterSpacing: -0.2,
    media: {
      mobile: { fontSize: 16 },
      tablet: { fontSize: 28 },
      desktop: { fontSize: 32 },
    },
  },
  // xs maps to S1 - Subtitle text
  xs: {
    fontWeight: 400,
    letterSpacing: -0.2,
    media: {
      mobile: { fontSize: 12 },
      tablet: { fontSize: 18 },
      desktop: { fontSize: 24 },
    },
  },
};

/**
 * Default styles for different highlight types
 */
export const HighlightStyles: Record<
  HighlightStyle,
  (color: string, secondaryColor?: string) => ViewProps
> = {
  underline: (color) => ({
    textDecoration: 'underline',
    textDecorationColor: color,
    textDecorationThickness: '4px',
    textUnderlineOffset: '4px',
  }),
  background: (color) => ({
    backgroundColor: color,
    color: 'color.white',
    padding: '0 8px',
    borderRadius: '4px',
  }),
  gradient: (color, secondaryColor) => ({
    background: `linear-gradient(135deg, ${color}, ${secondaryColor || color})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block',
    textShadow: 'none',
  }),
  outline: (color) => ({
    WebkitTextStroke: `1px ${color}`,
    WebkitTextFillColor: 'transparent !important',
    color: 'transparent',
    textShadow: 'none',
  }),
  glow: (color) => ({
    color: color,
    textShadow: `0 0 10px ${color}80, 0 0 20px ${color}40, 0 0 30px ${color}20`,
  }),
};
