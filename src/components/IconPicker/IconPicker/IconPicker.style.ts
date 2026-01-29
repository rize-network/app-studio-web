import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './IconPicker.type';

/**
 * Default styles for the IconPicker component
 */
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
    transition: 'all 0.2s ease',
  } as ViewProps,

  dropdown: {
    position: 'absolute',
    mixBlendMode: 'normal',
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
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  } as ViewProps,
};

/**
 * Size styles for the IconPicker component
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
 * Shape styles for the IconPicker component
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
 * Variant styles for the IconPicker component
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
