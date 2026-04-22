/**
 * Badge Styles
 *
 * Defines the styles for the Badge component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './Badge.type';

/**
 * Badge sizes following the 4px grid system
 */
export const BadgeSizes: Record<Size, ViewProps> = {
  xs: {
    minWidth: '20px',
    height: '20px',
    padding: '0 6px',
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '12px',
    letterSpacing: '-0.01em',
  },
  sm: {
    minWidth: '24px',
    height: '24px',
    padding: '0 8px',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '-0.01em',
  },
  md: {
    minWidth: '28px',
    height: '28px',
    padding: '0 10px',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '-0.01em',
  },
  lg: {
    minWidth: '32px',
    height: '32px',
    padding: '0 12px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
  xl: {
    minWidth: '36px',
    height: '36px',
    padding: '0 14px',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '28px',
    letterSpacing: '-0.01em',
  },
};

/**
 * Badge shapes with consistent border radius
 */
export const BadgeShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: '8px', // Consistent with design system (rounded-md)
  pill: '9999px', // Full rounded for pill shape
};

/**
 * Badge positions for absolute positioning
 */
export const PositionStyles: { [key: string]: React.CSSProperties } = {
  'top-right': { top: '4px', right: '4px', position: 'absolute' }, // 4px offset (1 × 4px grid)
  'top-left': { top: '4px', left: '4px', position: 'absolute' },
  'bottom-right': { bottom: '4px', right: '4px', position: 'absolute' },
  'bottom-left': { bottom: '4px', left: '4px', position: 'absolute' },
};

/**
 * Get badge variants with consistent styling based on theme mode
 */
export const getBadgeVariants = (
  themeMode: string
): Record<Variant, ViewProps> => {
  const isDark = themeMode === 'dark';

  return {
    filled: {
      backgroundColor: 'theme-primary',
      color: 'color-white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'theme-primary',
      color: 'theme-primary',
      transition: 'border-color 0.2s ease, opacity 0.2s ease',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      color: 'theme-primary',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
      transition: 'opacity 0.2s ease',
      _hover: {
        opacity: 0.8,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? 'color-gray-300' : 'color-gray-500',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      _hover: {
        backgroundColor: isDark ? 'color-gray-800' : 'color-gray-100',
      },
    },
  };
};

/**
 * Default badge variants for backward compatibility
 */
export const BadgeVariants = getBadgeVariants('light');
