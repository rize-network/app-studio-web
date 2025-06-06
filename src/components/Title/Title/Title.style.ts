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
  sm: 40,
  md: 56,
  lg: 72,
  xl: 80,
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
