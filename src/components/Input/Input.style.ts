/**
 * Input Styles
 *
 * Defines the styles for input components following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './Input.type';

/**
 * Shape styles for input components with consistent border radius
 */
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: '8px', // Consistent with design system (rounded-md)
    media: {
      mobile: {
        borderRadius: '6px',
      },
    },
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: '8px', // Consistent with design system (rounded-md)
    media: {
      mobile: {
        borderRadius: '6px',
      },
    },
  },
  pill: {
    borderRadius: '9999px', // Full rounded for pill shape
  },
};

/**
 * Label sizes following the 4px grid system
 */
export const LabelSizes: Record<Size, string> = {
  xs: '12px', // 3 × 4px grid
  sm: '14px', // 3.5 × 4px grid
  md: '16px', // 4 × 4px grid
  lg: '18px', // 4.5 × 4px grid
  xl: '20px', // 5 × 4px grid
};

/**
 * Input variants with consistent styling
 */
export const InputVariants: Record<Variant, ViewProps> = {
  outline: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    backgroundColor: 'color-white',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    _hover: {
      borderColor: 'color-gray-300',
    },
    _focus: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.2)',
    },
    _focusVisible: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.2)',
    },
  },
  default: {
    borderWidth: 0,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'color-gray-200',
    borderRadius: 0,
    backgroundColor: 'color-white',
    transition: 'border-color 0.2s ease',
    _hover: {
      borderBottomColor: 'color-gray-300',
    },
    _focus: {
      borderBottomColor: 'theme-primary',
      outline: 'none',
    },
    _focusVisible: {
      borderBottomColor: 'theme-primary',
      outline: 'none',
    },
  },
  none: {
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
    _focus: {
      outline: 'none',
    },
    _focusVisible: {
      outline: 'none',
    },
  },
};

/**
 * Padding for input with label following the 4px grid system
 */
export const PadddingWithLabel = {
  paddingTop: '16px', // 4 × 4px grid
  paddingBottom: '8px', // 2 × 4px grid
  paddingLeft: '16px', // 4 × 4px grid
  paddingRight: '16px', // 4 × 4px grid
  media: {
    mobile: {
      paddingTop: '12px', // Smaller padding on mobile
      paddingBottom: '6px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
};

/**
 * Padding for input without label following the 4px grid system
 */
export const PaddingWithoutLabel = {
  paddingTop: '12px', // 3 × 4px grid
  paddingBottom: '12px', // 3 × 4px grid
  paddingLeft: '16px', // 4 × 4px grid
  paddingRight: '16px', // 4 × 4px grid
  media: {
    mobile: {
      paddingTop: '10px', // Smaller padding on mobile
      paddingBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
};
