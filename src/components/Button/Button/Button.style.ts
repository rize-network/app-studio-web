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

const ButtonFontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
};
const ButtonLineHeight = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

const getButtonSize = (size: Size) => {
  return {
    minHeight: ButtonLineHeight[size] * 2,
    paddingHorizontal: ButtonLineHeight[size] / 2,
    fontSize: ButtonFontSize[size],
    fontWeight: 500,
    lineHeight: ButtonLineHeight[size],
    letterSpacing: '-0.01em',
    paddingInline: ButtonLineHeight[size],
    paddingBlock: ButtonLineHeight[size] / 2,
    outlineWidth: 'medium',
  };
};

/**
 * Button sizes following the 4px grid system
 */ export const ButtonSizes: Record<Size, ViewProps> = {
  xs: getButtonSize('xs'),
  sm: getButtonSize('sm'),
  md: getButtonSize('md'),
  lg: getButtonSize('lg'),
  xl: getButtonSize('xl'),
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

export const getButtonVariants = (
  color: string,
  textColor: string,
  reversed: boolean = false
): Record<Variant, ViewProps> => {
  // Determine effective colors based on reversed state
  const effectiveBg = reversed ? textColor : color;
  const effectiveContent = reversed ? color : textColor;
  const effectiveBorder = reversed ? textColor : color;

  return {
    filled: {
      backgroundColor: effectiveBg,
      color: effectiveContent,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBg}`,
      },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    empty: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBorder}`,
      },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBorder}`,
      },
      transition:
        'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
    },

    ghost: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      _hover: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: effectiveBorder,
        color: effectiveBorder,
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBorder}`,
      },
      transition: 'background-color 0.2s ease, opacity 0.2s ease',
    },
    link: {
      backgroundColor: 'transparent',
      color: effectiveBorder,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
      textDecorationColor: effectiveBorder,
      _hover: {
        opacity: 0.8,
      },
      _active: {
        opacity: 0.9,
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBorder}`,
      },
      transition: 'opacity 0.2s ease',
    },
    subtle: {
      backgroundColor: reversed
        ? `color-mix(in srgb, ${effectiveBorder} 20%, transparent)`
        : `color-mix(in srgb, ${effectiveBorder} 5%, transparent)`,
      color: effectiveBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: effectiveBorder,
      _hover: {
        backgroundColor: reversed
          ? `color-mix(in srgb, ${effectiveBorder} 40%, transparent)`
          : `color-mix(in srgb, ${effectiveBorder} 15%, transparent)`,
      },
      _active: {
        backgroundColor: reversed
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(0, 0, 0, 0.15)',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px ${effectiveBorder}`,
      },
      transition: 'all 0.2s ease',
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
