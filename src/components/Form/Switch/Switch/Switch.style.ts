/**
 * Switch Styles
 *
 * Defines the styles for the Switch component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size } from './Switch.type';
/**
 * Knob (circle) sizes for the Switch component
 * Following the 4px grid system - dimensions réduites
 */
export const KnobSizes: Record<Size, ViewProps> = {
  xs: { height: '10px', width: '10px' },
  sm: { height: '14px', width: '14px' },
  md: { height: '18px', width: '18px' },
  lg: { height: '22px', width: '22px' },
  xl: { height: '26px', width: '26px' },
};

/**
 * Slider (track) sizes for the Switch component
 * Following the 4px grid system - dimensions réduites
 */
export const SliderSizes: Record<Size, ViewProps> = {
  xs: {
    height: '20px',
    width: '40px',
  },
  sm: {
    height: '24px',
    width: '48px',
  },
  md: {
    height: '28px',
    width: '56px',
  },
  lg: {
    height: '32px',
    width: '64px',
  },
  xl: {
    height: '36px',
    width: '72px',
  },
};

/**
 * Padding for the Switch slider - ajusté pour les nouvelles dimensions
 * Following the 4px grid system
 */
export const SliderPadding: Record<Size, Record<string, number>> = {
  xs: { paddingVertical: 5, paddingHorizontal: 3 },
  sm: { paddingVertical: 5, paddingHorizontal: 3 },
  md: { paddingVertical: 5, paddingHorizontal: 5 },
  lg: { paddingVertical: 5, paddingHorizontal: 5 },
  xl: { paddingVertical: 5, paddingHorizontal: 5 },
};

/**
 * Color schemes for the Switch component
 */
export const ColorSchemes = {
  // Default colors
  default: {
    active: 'theme-primary',
    inactive: 'color-gray-300',
    knob: 'white',
    disabled: 'color-gray-200',
  },
  // State-specific colors
  states: {
    hover: {
      active: 'theme-primary',
      inactive: 'color-gray-400',
      activeOpacity: 0.9,
    },
    focus: {
      active: {
        outline: 'none',
        boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
      },
      inactive: {
        outline: 'none',
        boxShadow: '0 0 0 2px white, 0 0 0 4px color-gray-200',
      },
    },
  },
};

/**
 * Transition styles for the Switch component
 */
export const TransitionStyles = {
  slider: {
    transition: 'all 0.2s ease-in-out',
  },
  knob: {
    transition: 'all 0.2s ease-in-out',
  },
};
