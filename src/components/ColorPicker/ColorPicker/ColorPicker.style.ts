import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './ColorPicker.type';
// This object defines the default styles for various structural parts of the ColorPicker component, such as its container, trigger, dropdown, and individual color swatches.
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
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  } as ViewProps,
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'color-white',
    borderRadius: 12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.14)',
    padding: '16px',
    minWidth: '320px',
  } as ViewProps,
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 36px)',
    gap: '12px',
    marginBottom: '16px',
  } as ViewProps,
  colorSwatch: {
    width: '36px',
    height: '36px',
    borderRadius: 8,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition:
      'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  } as ViewProps,
  customInput: {
    marginBottom: '12px',
  } as ViewProps,
  recentColors: {
    borderTop: '1px solid #F3F4F6',
    paddingTop: '12px',
  } as ViewProps,
};
// This object maps predefined size options (e.g., xs, sm, md) to specific styling configurations, affecting the ColorPicker's dimensions, font size, and padding.
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    height: '32px',
    fontSize: '12px',
    padding: '4px 8px',
  },
  sm: {
    height: '40px',
    fontSize: '12px',
    padding: '8px 10px',
  },
  md: {
    height: '44px',
    fontSize: '14px',
    padding: '10px 12px',
  },
  lg: {
    height: '48px',
    fontSize: '16px',
    padding: '12px 14px',
  },
  xl: {
    height: '56px',
    fontSize: '18px',
    padding: '14px 16px',
  },
};
// This object maps predefined shape options (e.g., default, square, pill) to specific border-radius styles, influencing the visual curvature of the ColorPicker's elements.
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: 8,
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: 8,
  },
  pill: {
    borderRadius: 9999,
  },
};
// This object maps predefined variant options (e.g., default, outline, filled) to distinct visual styles, altering the background, border, and text color of the ColorPicker.
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    color: 'color-gray-900',
  },
  outline: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    color: 'color-gray-900',
  },
  filled: {
    backgroundColor: '#F8FAFC',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    color: 'color-gray-900',
  },
};
// This array defines the default color palette presented within the ColorPicker dropdown, providing a curated selection of colors with their names, hex values, and categories.
export const DefaultColorPalette = [
  { name: 'Blue', value: '#1D4ED8', category: 'primary' },
  { name: 'Purple', value: '#A855F7', category: 'primary' },
  { name: 'Green', value: '#22C55E', category: 'primary' },
  { name: 'Orange', value: '#F97316', category: 'primary' },
  { name: 'Red', value: '#EF4444', category: 'primary' },
  { name: 'Ink', value: '#111827', category: 'neutral' },
];
