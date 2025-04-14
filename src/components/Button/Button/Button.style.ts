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

/**
 * Button sizes following the 4px grid system
 */
export const ButtonSizes: Record<Size, ViewProps> = {
  xs: {
    // Height: 28px (7 × 4px)
    height: '28px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '12px', // text-xs
    fontWeight: '500', // medium
    lineHeight: '20px',
    letterSpacing: '-0.01em',
  },
  sm: {
    // Height: 32px (8 × 4px)
    height: '32px',
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '12px',
    paddingRight: '12px',
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px', // text-sm
    fontWeight: '500', // medium
    lineHeight: '20px',
    letterSpacing: '-0.01em',
  },
  md: {
    // Height: 40px (10 × 4px) - standard height for interactive elements
    height: '40px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px', // text-sm/md
    fontWeight: '500', // medium
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
  lg: {
    // Height: 48px (12 × 4px)
    height: '48px',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '20px',
    paddingRight: '20px',
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '16px', // text-md/lg
    fontWeight: '500', // medium
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
  xl: {
    // Height: 56px (14 × 4px)
    height: '56px',
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '18px', // text-lg
    fontWeight: '500', // medium
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
};

/**
 * Button shapes with consistent border radius
 */
export const ButtonShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: '8px', // Consistent with design system (rounded-md)
  pillShaped: '9999px', // Full rounded for pill shape
};

/**
 * Icon sizes for different button sizes
 */
export const IconSizes: Record<Size, ViewProps> = {
  xs: {
    width: '16px',
    height: '16px',
    padding: '6px',
  },
  sm: {
    width: '20px',
    height: '20px',
    padding: '6px',
  },
  md: {
    width: '24px',
    height: '24px',
    padding: '8px',
  },
  lg: {
    width: '24px',
    height: '24px',
    padding: '12px',
  },
  xl: {
    width: '28px',
    height: '28px',
    padding: '14px',
  },
};

/**
 * Button variants with consistent styling
 */
export const getButtonVariants = (
  color: string,
  isLight: boolean
): Record<Variant, ViewProps> => ({
  filled: {
    backgroundColor: color,
    color: isLight ? 'color.gray.900' : 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    _hover: {
      filter: 'brightness(0.9)',
      transform: 'translateY(-1px)',
    },
    _active: {
      filter: 'brightness(0.85)',
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color,
    color: color,
    _hover: {
      backgroundColor: `${color}10`, // 10% opacity
      transform: 'translateY(-1px)',
    },
    _active: {
      backgroundColor: `${color}20`, // 20% opacity
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: color,
    _hover: {
      backgroundColor: `${color}10`, // 10% opacity
      transform: 'translateY(-1px)',
    },
    _active: {
      backgroundColor: `${color}20`, // 20% opacity
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
  },
  link: {
    backgroundColor: 'transparent',
    color: color,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    _hover: {
      textDecoration: 'underline',
      textDecorationThickness: '2px',
    },
    transition: 'all 0.2s ease',
  },
});
