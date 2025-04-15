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
    // Height: 24px (6 × 4px)
    height: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    // Typography

    fontSize: 12, // text-xs
    fontWeight: '500', // medium
    lineHeight: 20,
    letterSpacing: '-0.01em',
  },
  sm: {
    // Height: 32px (8 × 4px)
    height: 32,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    // Typography

    fontSize: 14, // text-sm
    fontWeight: '500', // medium
    lineHeight: 20,
    letterSpacing: '-0.01em',
  },
  md: {
    // Height: 40px (10 × 4px) - standard height for interactive elements
    height: 40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    // Typography

    fontSize: 14, // text-sm/md
    fontWeight: '500', // medium
    lineHeight: 24,
    letterSpacing: '-0.01em',
  },
  lg: {
    // Height: 48px (12 × 4px)
    height: 48,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    // Typography

    fontSize: 16, // text-md/lg
    fontWeight: '500', // medium
    lineHeight: 24,
    letterSpacing: '-0.01em',
  },
  xl: {
    // Height: 60px (15 × 4px)
    height: 60,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 28,
    paddingRight: 28,
    // Typography

    fontSize: 18, // text-lg
    fontWeight: '500', // medium
    lineHeight: 28,
    letterSpacing: '-0.01em',
  },
};

/**
 * Button shapes with consistent border radius
 */
export const ButtonShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 8,
  pillShaped: 999, // Full rounded for pill shape
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
 * Button variants with consistent styling
 */
export const getButtonVariants = (
  color: string,
  isLight: boolean
): Record<Variant, ViewProps> => ({
  filled: {
    backgroundColor: color,
    color: isLight ? 'color.gray.900' : 'color.white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    on: {
      hover: {
        filter: 'brightness(0.9)',
        transform: 'translateY(-1px)',
      },
      active: {
        filter: 'brightness(0.85)',
        transform: 'translateY(0)',
      },
    },
    transition: 'all 0.2s ease',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color,
    color: color,
    on: {
      hover: {
        backgroundColor: `${color}10`, // 10% opacity
        transform: 'translateY(-1px)',
      },
      active: {
        backgroundColor: `${color}20`, // 20% opacity
        transform: 'translateY(0)',
      },
    },
    transition: 'all 0.2s ease',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: color,
    on: {
      hover: {
        backgroundColor: `${color}10`, // 10% opacity
        transform: 'translateY(-1px)',
      },
      active: {
        backgroundColor: `${color}20`, // 20% opacity
        transform: 'translateY(0)',
      },
    },
    transition: 'all 0.2s ease',
  },
  link: {
    backgroundColor: 'transparent',
    color: color,
    textDecoration: 'underline',
    textUnderlineOffset: 2,
    on: {
      hover: {
        textDecoration: 'underline',
        textDecorationThickness: 2,
      },
    },
    transition: 'all 0.2s ease',
  },
});
