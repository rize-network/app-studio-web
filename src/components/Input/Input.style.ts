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
    borderColor: 'color-gray-200',
    backgroundColor: 'transparent',
    color: 'inherit',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    _hover: {
      borderColor: 'color-gray-300',
    },
    _focus: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow: '0 0 0 3px theme-primary',
    },
    _focusVisible: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow: '0 0 0 3px theme-primary',
    },
  },
  default: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'inherit',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    _hover: {
      borderColor: 'color-gray-300',
    },
    _focus: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow: '0 0 0 3px theme-primary',
    },
    _focusVisible: {
      borderColor: 'theme-primary',
      outline: 'none',
      boxShadow: '0 0 0 3px theme-primary',
    },
  },
  none: {
    border: 'none',
    style: { backgroundColor: 'transparent' },
    color: 'inherit',
    transition: 'background-color 0.2s ease',
  },
};

/*
 * `PadddingWithLabel` and `PaddingWithoutLabel` used to live here. They were
 * removed rather than renamed (the first was misspelled with three d's) because
 * they had stopped meaning anything:
 *
 *   - the two were byte-identical, so the `showLabel ? a : b` choice between
 *     them had no effect;
 *   - both were size-independent 10px/12px, which is why every field rendered
 *     at roughly `md` height whatever size was requested;
 *   - their `media.mobile` block repeated the same values, and being a nested
 *     media rule it would have won over the size scale at mobile widths —
 *     quietly pinning `xs` and `xl` fields back to `md` padding on phones.
 *
 * Field padding now comes from `Input/fieldSizes` via FieldContent.
 */
