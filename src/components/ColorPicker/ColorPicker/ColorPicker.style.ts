import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './ColorPicker.type';

/**
 * Default styles for the ColorPicker component
 */
export const DefaultColorPickerStyles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  } as ViewProps,

  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as ViewProps,

  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'color-white',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    padding: '16px',
    minWidth: '280px',
  } as ViewProps,

  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '8px',
    marginBottom: '16px',
  } as ViewProps,

  colorSwatch: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
  } as ViewProps,

  customInput: {
    marginBottom: '12px',
  } as ViewProps,

  recentColors: {
    borderTop: '1px solid color-gray-200',
    paddingTop: '12px',
  } as ViewProps,
};

/**
 * Size styles for the ColorPicker component
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    height: '28px',
    fontSize: '12px',
    padding: '4px 8px',
  },
  sm: {
    height: '32px',
    fontSize: '14px',
    padding: '6px 10px',
  },
  md: {
    height: '40px',
    fontSize: '16px',
    padding: '8px 12px',
  },
  lg: {
    height: '48px',
    fontSize: '18px',
    padding: '10px 16px',
  },
  xl: {
    height: '56px',
    fontSize: '20px',
    padding: '12px 20px',
  },
};

/**
 * Shape styles for the ColorPicker component
 */
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: '8px',
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: '8px',
  },
  pill: {
    borderRadius: '9999px',
  },
};

/**
 * Variant styles for the ColorPicker component
 */
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-300',
    color: 'color-gray-800',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-300',
    color: 'color-gray-800',
  },
  filled: {
    backgroundColor: 'color-gray-100',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
};

/**
 * Predefined color palette based on the design system
 */
export const DefaultColorPalette = [
  // Primary colors
  { name: 'Blue 500', value: 'color-blue-500', category: 'primary' },
  { name: 'Purple 500', value: 'color-purple-500', category: 'primary' },
  { name: 'Pink 500', value: 'color-pink-500', category: 'primary' },
  { name: 'Red 500', value: 'color-red-500', category: 'primary' },
  { name: 'Orange 500', value: 'color-orange-500', category: 'primary' },
  { name: 'Yellow 500', value: 'color-yellow-500', category: 'primary' },
  { name: 'Green 500', value: 'color-green-500', category: 'primary' },
  { name: 'Teal 500', value: 'color-teal-500', category: 'primary' },

  // Light variants
  { name: 'Blue 300', value: 'color-blue-300', category: 'light' },
  { name: 'Purple 300', value: 'color-purple-300', category: 'light' },
  { name: 'Pink 300', value: 'color-pink-300', category: 'light' },
  { name: 'Red 300', value: 'color-red-300', category: 'light' },
  { name: 'Orange 300', value: 'color-orange-300', category: 'light' },
  { name: 'Yellow 300', value: 'color-yellow-300', category: 'light' },
  { name: 'Green 300', value: 'color-green-300', category: 'light' },
  { name: 'Teal 300', value: 'color-teal-300', category: 'light' },

  // Dark variants
  { name: 'Blue 700', value: 'color-blue-700', category: 'dark' },
  { name: 'Purple 700', value: 'color-purple-700', category: 'dark' },
  { name: 'Pink 700', value: 'color-pink-700', category: 'dark' },
  { name: 'Red 700', value: 'color-red-700', category: 'dark' },
  { name: 'Orange 700', value: 'color-orange-700', category: 'dark' },
  { name: 'Yellow 700', value: 'color-yellow-700', category: 'dark' },
  { name: 'Green 700', value: 'color-green-700', category: 'dark' },
  { name: 'Teal 700', value: 'color-teal-700', category: 'dark' },

  // Grays
  { name: 'Gray 100', value: 'color-gray-100', category: 'neutral' },
  { name: 'Gray 300', value: 'color-gray-300', category: 'neutral' },
  { name: 'Gray 500', value: 'color-gray-500', category: 'neutral' },
  { name: 'Gray 700', value: 'color-gray-700', category: 'neutral' },
  { name: 'Gray 900', value: 'color-gray-900', category: 'neutral' },
  { name: 'Black', value: 'color-black', category: 'neutral' },
  { name: 'White', value: 'color-white', category: 'neutral' },
];
