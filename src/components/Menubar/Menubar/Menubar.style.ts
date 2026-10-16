import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './Menubar.type';
// Defines a mapping of size variants ('sm', 'md', 'lg') to specific `ViewProps` (styling properties) for the Menubar, controlling its overall dimensions and typography.
export const MenubarSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '6px 10px',
    fontSize: '14px',
  },
  md: {
    padding: '8px 12px',
    fontSize: '16px',
  },
  lg: {
    padding: '10px 16px',
    fontSize: '18px',
  },
};
// Specifies different visual appearances for the Menubar, such as 'default', 'filled', and 'outline', each with distinct background, border, and text color styles.
export const MenubarVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    color: 'color-gray-800',
  },
  filled: {
    backgroundColor: 'color-gray-100',
    color: 'color-gray-800',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
};
// Provides styling configurations for the Menubar's layout direction, allowing it to render either 'horizontal' (row) or 'vertical' (column).
export const MenubarOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
};
// Defines specific styling rules that apply to individual Menubar items based on their interaction states, such as 'active', 'hover', and 'disabled'.
export const MenubarItemStates = {
  active: {
    backgroundColor: 'color-gray-200',
    fontWeight: 'bold',
  },
  hover: {
    backgroundColor: 'color-gray-100',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
// Calculates and returns the appropriate positioning `ViewProps` for the Menubar's dropdown content based on the Menubar's current orientation (horizontal or vertical).
export const getMenubarContentPosition = (
  orientation: Orientation
): ViewProps => {
  if (orientation === 'horizontal') {
    return {
      top: '100%',
      left: 0,
    };
  }
  return {
    top: 0,
    left: '100%',
  };
};
