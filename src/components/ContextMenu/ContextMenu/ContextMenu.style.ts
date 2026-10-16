import { ViewProps } from 'app-studio';
import { Size, Variant } from './ContextMenu.type';
// Defines a map of predefined size configurations for the ContextMenu, associating each size variant (e.g., 'sm', 'md', 'lg') with specific padding, font size, and minimum width styles.
export const ContextMenuSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '6px 8px',
    fontSize: '14px',
    minWidth: '160px',
  },
  md: {
    padding: '8px 12px',
    fontSize: '16px',
    minWidth: '180px',
  },
  lg: {
    padding: '10px 16px',
    fontSize: '18px',
    minWidth: '200px',
  },
};
// Specifies various visual style variants for the ContextMenu, such as 'default', 'filled', and 'outline', each with distinct background, border, and text color properties.
export const ContextMenuVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    color: 'color-gray-800',
  },
  filled: {
    backgroundColor: 'color-gray-100',
    color: 'color-gray-800',
  },
  outline: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
};
// Defines the styling for different interactive states of ContextMenu items, including hover, active, and disabled states, specifying their respective background colors, opacity, and cursor behaviors.
export const ContextMenuItemStates = {
  hover: {
    backgroundColor: 'color-gray-100',
  },
  active: {
    backgroundColor: 'color-gray-200',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
