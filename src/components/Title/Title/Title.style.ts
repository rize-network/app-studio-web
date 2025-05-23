import { ViewProps } from 'app-studio';
import { TitleSize, HighlightStyle } from './Title.type';

/**
 * Font sizes for different title sizes
 */
export const TitleSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
  '5xl': 72,
  '6xl': 80,
};

/**
 * Line heights for different title sizes
 */
export const LineHeights: Record<TitleSize, number> = {
  xs: 24,
  sm: 28,
  md: 32,
  lg: 40,
  xl: 48,
  '2xl': 56,
  '3xl': 64,
  '4xl': 72,
  '5xl': 80,
  '6xl': 88,
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
    backgroundClip: 'text !important',
    webkitBackgroundClip: 'text !important',
    color: 'transparent',
    webkitTextFillColor: 'transparent',
    display: 'inline-block',
    textShadow: 'none',
  }),
  outline: (color) => ({
    webkitTextStroke: `1px ${color}`,
    webkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: 'none',
  }),
  glow: (color) => ({
    color: color,
    textShadow: `0 0 10px ${color}80, 0 0 20px ${color}40, 0 0 30px ${color}20`,
  }),
};
