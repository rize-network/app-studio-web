import { ViewProps } from 'app-studio';
import { Size, Variant } from './ContextMenu.type';

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

export const ContextMenuVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color.white',
    color: 'color.gray.800',
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
  },
  outline: {
    backgroundColor: 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',
  },
};

export const ContextMenuItemStates = {
  hover: {
    backgroundColor: 'color.gray.100',
  },
  active: {
    backgroundColor: 'color.gray.200',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

// Note: Manual positioning logic has been replaced with intelligent positioning
// using viewport-aware algorithms in the ContextMenu component
