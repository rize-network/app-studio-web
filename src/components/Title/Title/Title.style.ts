import { ViewProps } from 'app-studio';
import { TitleSize, HighlightStyle } from './Title.type';
// Defines a mapping of abstract title sizes (xs, sm, md, lg, xl) to their corresponding fixed pixel values for consistent sizing across the component.
export const TitleSizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 96,
  xl: 110,
};
// Provides a comprehensive set of responsive typography settings. It maps each defined `TitleSize` to specific font sizes and optional width constraints tailored for various device breakpoints (mobile, tablet, desktop).
export const ResponsiveTypography: Record<
  TitleSize,
  {
    media: {
      mobile: { fontSize: number; width?: string; minWidth?: string };
      tablet: { fontSize: number; width?: string; minWidth?: string };
      desktop: { fontSize: number; width?: string; minWidth?: string };
    };
  }
> = {
  xl: {
    media: {
      mobile: { fontSize: 48 },
      tablet: { fontSize: 96 },
      desktop: { fontSize: 110 },
    },
  },
  lg: {
    media: {
      mobile: { fontSize: 48 },
      tablet: { fontSize: 48 },
      desktop: { fontSize: 70 },
    },
  },
  md: {
    media: {
      mobile: { fontSize: 32 },
      tablet: { fontSize: 40 },
      desktop: { fontSize: 56 },
    },
  },
  sm: {
    media: {
      mobile: { fontSize: 20 },
      tablet: { fontSize: 24 },
      desktop: { fontSize: 32 },
    },
  },
  xs: {
    media: {
      mobile: { fontSize: 14 },
      tablet: { fontSize: 18 },
      desktop: { fontSize: 20 },
    },
  },
};
// Contains a collection of functions, each representing a distinct text highlight style. These functions accept primary and optional secondary color parameters and return `ViewProps` objects with the necessary CSS-like properties to apply the chosen highlight effect.
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
    color: 'color-white',
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
  solid: (color) => ({
    color: color,
  }),
  default: () => ({}),
};
