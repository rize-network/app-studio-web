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

export const BadgeAnnouncementSizes: Record<Size, ViewProps> = {
  xs: {
    gap: '6px',
    padding: '3px 8px 3px 3px',
  },
  sm: {
    gap: '8px',
    padding: '4px 10px 4px 4px',
  },
  md: {
    gap: '12px',
    padding: '6px 16px 6px 6px',
  },
  lg: {
    gap: '12px',
    padding: '7px 18px 7px 7px',
  },
  xl: {
    gap: '14px',
    padding: '8px 20px 8px 8px',
  },
};

export const BadgePastilContentSizes: Record<Size, ViewProps> = {
  xs: {
    padding: '2px 6px',
    fontSize: '9px',
    lineHeight: '12px',
  },
  sm: {
    padding: '3px 8px',
    fontSize: '10px',
    lineHeight: '14px',
  },
  md: {
    padding: '6px 12px',
    fontSize: '11px',
    lineHeight: '14px',
  },
  lg: {
    padding: '7px 14px',
    fontSize: '12px',
    lineHeight: '16px',
  },
  xl: {
    padding: '8px 16px',
    fontSize: '13px',
    lineHeight: '18px',
  },
};

export const BadgeAnnouncementTextSizes: Record<Size, ViewProps> = {
  xs: {
    fontSize: '11px',
    lineHeight: '14px',
  },
  sm: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  md: {
    fontSize: '13px',
    lineHeight: '18px',
  },
  lg: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  xl: {
    fontSize: '15px',
    lineHeight: '22px',
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

export const getBadgeAnnouncementVariant = (themeMode: string): ViewProps => {
  const isDark = themeMode === 'dark';

  return {
    display: 'inline-flex',
    height: 'auto',
    minWidth: 'auto',
    backgroundColor: 'color-white-600',
    color: 'color-gray-900',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-white',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
    _hover: {
      backgroundColor: 'color-white-800',
      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.1)',
    },
  };
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
      borderColor: 'theme-primary',
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
    },
    outline: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'theme-primary',
      color: 'theme-primary',
      style: { backgroundColor: 'transparent' },
      transition: 'border-color 0.2s ease, opacity 0.2s ease',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
    },
    link: {
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'theme-primary',
      color: 'theme-primary',
      textDecoration: 'underline',
      style: {
        backgroundColor: 'transparent',
        textUnderlineOffset: '2px',
        textDecorationThickness: '1px',
      },
      transition: 'opacity 0.2s ease',
      _hover: {
        opacity: 0.8,
      },
    },
    ghost: {
      color: 'color-gray-500',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'color-gray-500',
      style: { backgroundColor: 'transparent' },
      transition: 'background-color 0.2s ease, color 0.2s ease',
      _hover: {
        backgroundColor: 'color-gray-100',
      },
    },
  };
};

/**
 * Default badge variants for backward compatibility
 */
export const BadgeVariants = getBadgeVariants('light');
