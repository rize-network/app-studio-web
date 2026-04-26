import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './IconPicker.type';
// Defines the default set of styles for various structural parts of the IconPicker component, including the container, trigger, dropdown, search input, icon grid, and individual icon items.
export const DefaultIconPickerStyles = {
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
    transition: 'all 0.2s ease-in-out',
  } as ViewProps,
  dropdown: {
    position: 'absolute',
    mixBlendMode: 'normal',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'color-white',
    borderRadius: 12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    minWidth: '280px',
    maxHeight: '320px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  } as ViewProps,
  searchInput: {
    marginBottom: '12px',
    flexShrink: 0,
  } as ViewProps,
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '8px',
    overflowY: 'auto',
    padding: '4px',
    color: 'color-black',
    flexGrow: 1,
  } as ViewProps,
  iconItem: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'all 0.2s ease-in-out',
  } as ViewProps,
};
// A collection of predefined style objects, each representing a distinct size variant for the IconPicker component, such as extra small (xs) to extra large (xl).
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    height: '28px',
    fontSize: '12px',
    padding: '4px 8px',
  },
  sm: {
    height: '32px',
    fontSize: '12px',
    padding: '6px 10px',
  },
  md: {
    height: '40px',
    fontSize: '14px',
    padding: '8px 12px',
  },
  lg: {
    height: '48px',
    fontSize: '14px',
    padding: '10px 14px',
  },
  xl: {
    height: '56px',
    fontSize: '16px',
    padding: '12px 16px',
  },
};
// A collection of predefined style objects, each representing a distinct shape variant for the IconPicker component, primarily affecting border-radius.
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
// A collection of predefined style objects, each representing a distinct visual variant for the IconPicker component, affecting background, borders, and text color.
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
  filled: {
    backgroundColor: 'color-gray-50',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
};
