import { ViewProps } from 'app-studio';
import { Size, Variant } from './Radio.type';
// Defines the standard sizes for the Radio component's main container, mapping size variants (e.g., xs, sm, md) to their respective height and width values.
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '16px', width: '16px' },
  sm: { height: '20px', width: '20px' },
  md: { height: '24px', width: '24px' },
  lg: { height: '28px', width: '28px' },
  xl: { height: '32px', width: '32px' },
};
// Specifies the dimensions for the inner dot of the Radio component, correlating with the overall size variants.
export const DotSizes: Record<Size, ViewProps> = {
  xs: { height: '8px', width: '8px' },
  sm: { height: '10px', width: '10px' },
  md: { height: '12px', width: '12px' },
  lg: { height: '14px', width: '14px' },
  xl: { height: '16px', width: '16px' },
};
// Contains styling rules for the Radio component's container based on its selection state (selected or unselected).
export const VariantStyles: Record<Variant, ViewProps> = {
  selected: {
    borderColor: 'theme-primary',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  unselected: {
    backgroundColor: 'transparent',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'color-gray-300',
  },
};
// Defines the background color for the Radio component's inner dot based on its selection state.
export const DotStyles: Record<Variant, ViewProps> = {
  selected: {
    backgroundColor: 'theme-primary',
  },
  unselected: {
    backgroundColor: 'transparent',
  },
};
// Provides styling adjustments for the Radio component's container when it is in various interactive states such as hover, disabled, or error.
export const StateStyles = {
  hover: {
    selected: {
      borderColor: 'color-blue-600',
    },
    unselected: {
      borderColor: 'color-gray-400',
    },
  },
  disabled: {
    selected: {
      borderColor: 'color-gray-300',
      opacity: 0.6,
    },
    unselected: {
      borderColor: 'color-gray-300',
      opacity: 0.6,
    },
  },
  error: {
    selected: {
      borderColor: 'color-red-500',
    },
    unselected: {
      borderColor: 'color-red-500',
    },
  },
};
// Contains styling for the Radio component's inner dot across different interactive states like hover, disabled, and error.
export const DotStateStyles = {
  hover: {
    selected: {
      backgroundColor: 'color-blue-600',
    },
    unselected: {
      backgroundColor: 'transparent',
    },
  },
  disabled: {
    selected: {
      backgroundColor: 'color-gray-300',
      opacity: 0.6,
    },
    unselected: {
      backgroundColor: 'transparent',
      opacity: 0.6,
    },
  },
  error: {
    selected: {
      backgroundColor: 'color-red-500',
    },
    unselected: {
      backgroundColor: 'transparent',
    },
  },
};
