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
 */ export const ButtonSizes: Record<Size, ViewProps> = {
  xs: {
    minHeight: 3 * 4, // 24px -> 12px
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: '-0.01em',
  },
  sm: {
    minHeight: 4 * 4, // 32px -> 16px
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: '-0.01em',
  },
  md: {
    minHeight: 6 * 4, // 40px -> 24px
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: '-0.01em',
  },
  lg: {
    minHeight: 8 * 4, // 48px -> 32px
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: '-0.01em',
  },
  xl: {
    minHeight: 10 * 4, // 60px -> 40px
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 22,
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

export const getButtonVariants = (
  color: string,
  isLight: boolean
): Record<Variant, ViewProps> => ({
  filled: {
    backgroundColor: color,
    color: isLight ? 'color.black' : 'color.white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    _hover: {
      transform: 'translateY(-1px)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    _active: {
      transform: 'translateY(-1px)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    transition: 'all 0.2s ease',
  },
  outline: {
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color,
    _hover: {
      backgroundColor: color,
      color: isLight ? 'light.black' : 'light.white',
      transform: 'translateY(-1px)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    _active: {
      backgroundColor: color,
      color: isLight ? 'light.black' : 'light.white',
      transform: 'translateY(0)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    transition: 'all 0.2s ease',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    _hover: {
      backgroundColor: color,
      color: isLight ? 'light.black' : 'light.white',
      transform: 'translateY(-1px)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    _active: {
      backgroundColor: color,
      color: isLight ? 'light.black' : 'light.white',
      transform: 'translateY(0)',
      textDecoration: 'underline',
      textUnderlineOffset: '1px',
      textDecorationThickness: '1px',
    },
    transition: 'all 0.2s ease',
  },
  link: {
    backgroundColor: 'transparent',
    color: isLight ? color : 'light.black',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    textDecorationThickness: '1px',
    _hover: {
      textDecorationThickness: '2px',
    },
    _active: { textDecorationThickness: '2px' },
    transition: 'all 0.2s ease',
  },
});
