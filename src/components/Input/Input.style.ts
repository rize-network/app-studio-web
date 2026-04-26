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
  sm: '11px',
  md: '11px',
  lg: '12px',
  xl: '12px',
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
    borderColor: '#E5E7EB',
    backgroundColor: 'color-white',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    _hover: {
      borderColor: '#CBD5E1',
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderRadius: '8px',
    backgroundColor: 'color-white',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    _hover: {
      borderColor: '#CBD5E1',
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
  none: {
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
  },
};

/**
 * Padding for input shells following the gallery form treatment.
 */
export const PadddingWithLabel = {
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '12px',
  paddingRight: '12px',
  media: {
    mobile: {
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
};

/**
 * Padding for input shells without a label.
 */
export const PaddingWithoutLabel = {
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '12px',
  paddingRight: '12px',
  media: {
    mobile: {
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
};
