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
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: '8px', // Consistent with design system (rounded-md)
  },
  pill: {
    borderRadius: '9999px', // Full rounded for pill shape
  },
};

/**
 * Label sizes following the 4px grid system
 */
export const LabelSizes: Record<Size, string> = {
  xs: '10px',
  sm: '12px',
  md: '12px',
  lg: '14px',
  xl: '14px',
};

/**
 * Input variants with consistent styling
 * Design tokens:
 * - Transitions: 200ms ease-out for smooth, natural feel
 * - Focus ring: 3px offset with 15% opacity primary color
 * - Hover: Subtle background tint for better affordance
 */
export const InputVariants: Record<Variant, ViewProps> = {
  outline: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    backgroundColor: 'color-white',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    _hover: {
      borderColor: 'color-gray-300',
    },
    _focus: {
      borderColor: 'theme-primary',
      backgroundColor: 'color-white',
      outline: 'none',
      boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
    },
    _focusVisible: {
      borderColor: 'theme-primary',
      backgroundColor: 'color-white',
      outline: 'none',
      boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
    },
  },
  default: {
    borderWidth: 0,
    borderBottomWidth: '1.5px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'color-gray-200',
    borderRadius: 0,
    backgroundColor: 'transparent',
    transition:
      'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
    _hover: {
      borderBottomColor: 'color-gray-400',
    },
    _focus: {
      borderBottomColor: 'theme-primary',
      borderBottomWidth: '2px',
      backgroundColor: 'transparent',
      outline: 'none',
    },
    _focusVisible: {
      borderBottomColor: 'theme-primary',
      borderBottomWidth: '2px',
      backgroundColor: 'transparent',
      outline: 'none',
    },
  },
  none: {
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
    _hover: {
      backgroundColor: 'color-gray-50',
    },
    _focus: {
      outline: 'none',
      backgroundColor: 'color-gray-100',
    },
    _focusVisible: {
      outline: 'none',
      backgroundColor: 'color-gray-100',
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
