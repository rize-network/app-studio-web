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
    // Height: 20px (5 × 4px)
    minWidth: '20px',
    height: '20px',
    padding: '0 6px',
    // Typography
    fontSize: '10px', // Smallest text size
    fontWeight: '500', // Medium weight for better readability
    lineHeight: '20px', // Match height for vertical centering
  },
  sm: {
    // Height: 24px (6 × 4px)
    minWidth: '24px',
    height: '24px',
    padding: '0 8px',
    // Typography
    fontSize: '12px', // text-xs
    fontWeight: '500', // Medium weight
    lineHeight: '24px',
  },
  md: {
    // Height: 28px (7 × 4px)
    minWidth: '28px',
    height: '28px',
    padding: '0 10px',
    // Typography
    fontSize: '14px', // text-sm
    fontWeight: '500', // Medium weight
    lineHeight: '28px',
  },
  lg: {
    // Height: 32px (8 × 4px)
    minWidth: '32px',
    height: '32px',
    padding: '0 12px',
    // Typography
    fontSize: '14px', // text-sm
    fontWeight: '500', // Medium weight
    lineHeight: '32px',
  },
  xl: {
    // Height: 36px (9 × 4px)
    minWidth: '36px',
    height: '36px',
    padding: '0 14px',
    // Typography
    fontSize: '16px', // text-md
    fontWeight: '500', // Medium weight
    lineHeight: '36px',
  },
};

/**
 * Badge shapes with consistent border radius
 */
export const BadgeShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: '8px', // Consistent with design system (rounded-md)
  pillShaped: '9999px', // Full rounded for pill shape
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
  const isDarkMode = themeMode === 'dark';

  return {
    filled: {
      backgroundColor: 'theme.primary',
      color: isDarkMode ? 'color.gray.900' : 'color.white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      transition: 'all 0.2s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'theme.primary',
      color: 'theme.primary',
      transition: 'all 0.2s ease',
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      color: 'theme.primary',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      transition: 'all 0.2s ease',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDarkMode ? 'color.gray.400' : 'color.gray.500',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      transition: 'all 0.2s ease',
    },
  };
};

/**
 * Default badge variants for backward compatibility
 */
export const BadgeVariants = getBadgeVariants('light');
