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
    minHeight: 8 * 4, // 24px -> 12px
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
    minHeight: 10 * 4, // 32px -> 16px
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
    minHeight: 12 * 4, // 40px -> 24px
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    fontWeight: 550,
    lineHeight: 24,
    letterSpacing: '-0.01em',
  },
  lg: {
    minHeight: 14 * 4, // 48px -> 32px
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
    minHeight: 16 * 4, // 60px -> 40px
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
): Record<Variant, ViewProps> => {
  const textColor = isLight ? '#000000' : '#FFFFFF';

  return {
    filled: {
      backgroundColor: color,
      color: textColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      _hover: {
        opacity: 0.9,
        color: textColor,
      },
      _active: {
        opacity: 0.95,
        color: textColor,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${color}`,
        color: textColor,
      },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      color: color,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color,
      _hover: {
        backgroundColor: color,
        color: textColor,
        opacity: 0.9,
      },
      _active: {
        backgroundColor: color,
        color: textColor,
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${color}`,
      },
      transition:
        'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: color,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      _hover: {
        backgroundColor: isLight ? 'color.gray.100' : 'color.gray.800',
        color: color,
        opacity: 0.9,
      },
      _active: {
        backgroundColor: isLight ? 'color.gray.200' : 'color.gray.700',
        color: color,
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${color}`,
      },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    link: {
      backgroundColor: 'transparent',
      color: color,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
      textDecorationColor: color,
      _hover: {
        color: color,
        opacity: 0.8,
      },
      _active: {
        color: color,
        opacity: 0.9,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${color}`,
      },
      transition: 'opacity 0.2s ease',
    },
    borderMoving: {
      position: 'relative',
      backgroundColor: 'black',
      color: textColor,
      overflow: 'hidden',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      _hover: {
        color: textColor,
      },
      _active: {
        color: textColor,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow:
          '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.8)',
      },
      transition: 'opacity 0.2s ease',
    },
    animatedStroke: {
      display: 'inline-block',
      maxWidth: '20rem',
      margin: '0 auto',
      textAlign: 'center',
      textDecoration: 'none',
      position: 'relative',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: color,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      _hover: {
        color: color,
      },
      _active: {
        color: color,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${color}`,
      },
      transition: 'opacity 0.2s ease',
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
