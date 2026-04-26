/**
 * Button Styles
 *
 * Defines the styles for the Button component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './Button.type';

export const ButtonSizes: Record<Size, ViewProps> = {
  xs: {
    minHeight: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 12,
    letterSpacing: '-0.01em',
  },
  sm: {
    minHeight: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: '-0.01em',
  },
  md: {
    minHeight: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    letterSpacing: '-0.01em',
  },
  lg: {
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: '-0.01em',
  },
  xl: {
    minHeight: 56,
    paddingHorizontal: 28,
    paddingVertical: 14,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 28,
    letterSpacing: '-0.01em',
  },
};

/**
 * Button shapes with consistent border radius
 */
export const ButtonShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: 8,
  pill: 999, // Full rounded for pill shape
};

/**
 * Icon sizes for different button sizes
 */
export const IconSizes: Record<Size, ViewProps> = {
  xs: {
    width: 16,
    height: 16,
    padding: 6,
  },
  sm: {
    width: 20,
    height: 20,
    padding: 6,
  },
  md: {
    width: 24,
    height: 24,
    padding: 8,
  },
  lg: {
    width: 24,
    height: 24,
    padding: 12,
  },
  xl: {
    width: 28,
    height: 28,
    padding: 14,
  },
};

/**
 * Convert an app-studio token (`color-*`, `theme-*`, `light-*`, `dark-*`) into
 * the equivalent CSS `var(--token)` reference so it can be embedded inside
 * arbitrary CSS strings (box-shadow, gradients, …) where token resolution is
 * not applied. Non-token values are returned unchanged.
 */
export const cssVar = (value: string) =>
  /^(color|theme|light|dark)-/.test(value) ? `var(--${value})` : value;

export const getButtonVariants = (
  color: string,
  textColor: string,
  reversed: boolean = false
): Record<Variant, ViewProps> => {
  // Determine effective tokens based on reversed state
  const effectiveBg = reversed ? textColor : color;
  const effectiveContent = reversed ? color : textColor;
  const effectiveBorder = reversed ? textColor : color;

  // App-Studio alpha syntax: `{token}-{alpha}` (alpha 0–1000 → 0%–100% opacity).
  const tint = (alpha: number) => `${effectiveBorder}-${alpha}`;
  const focusRing = `0 0 0 2px ${cssVar('color-white')}, 0 0 0 4px ${cssVar(
    effectiveBorder
  )}`;

  return {
    filled: {
      backgroundColor: effectiveBg,
      color: effectiveContent,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      _hover: { opacity: 0.92 },
      _active: { opacity: 0.96 },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition:
        'background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
    },
    empty: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: { opacity: 0.9 },
      _active: { opacity: 0.95 },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: { backgroundColor: tint(40) },
      _active: { backgroundColor: tint(80) },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition:
        'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      _hover: { backgroundColor: tint(60) },
      _active: { backgroundColor: tint(100) },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    link: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      minHeight: 'auto',
      paddingHorizontal: '4px',
      paddingVertical: '10px',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
      textDecorationColor: effectiveBorder,
      _hover: { opacity: 0.8 },
      _active: { opacity: 0.9 },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition: 'opacity 0.2s ease',
    },
    subtle: {
      backgroundColor: tint(reversed ? 200 : 100),
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: { backgroundColor: tint(reversed ? 300 : 200) },
      _active: { backgroundColor: tint(reversed ? 400 : 300) },
      _focusVisible: { outline: 'none', boxShadow: focusRing },
      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    },
  };
};

/**
 * Generate offset path for border animation
 */
export function generateOffsetPath(
  width: number,
  height: number,
  borderRadius: number | string
): string {
  let radius: number;

  if (typeof borderRadius === 'string' && borderRadius.endsWith('%')) {
    const percentage = parseFloat(borderRadius) / 100;
    radius = Math.min(width, height) * percentage;
  } else {
    radius = parseFloat(borderRadius.toString());
  }

  radius = Math.min(radius, width / 2, height / 2);

  if (radius === 0) {
    return `M 0,0 H ${width} V ${height} H 0 Z`;
  }

  return `
    M ${radius},0
    H ${width - radius}
    A ${radius},${radius} 0 0 1 ${width},${radius}
    V ${height - radius}
    A ${radius},${radius} 0 0 1 ${width - radius},${height}
    H ${radius}
    A ${radius},${radius} 0 0 1 0,${height - radius}
    V ${radius}
    A ${radius},${radius} 0 0 1 ${radius},0
    Z
  `;
}
