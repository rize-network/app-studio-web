import { ViewProps } from 'app-studio';
import { Size, Variant, Position, Alignment } from './DropdownMenu.type';

export const DropdownMenuSizes: Record<Size, ViewProps> = {
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

export const DropdownMenuVariants: Record<Variant, ViewProps> = {
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

export const DropdownMenuItemStates = {
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

// Note: Static positioning logic has been replaced with intelligent viewport-aware
// positioning in the DropdownMenu component that automatically chooses optimal placement
// based on available space and prevents content from going off-screen.

// Legacy positioning function - kept for backward compatibility if needed
export const getDropdownPosition = (
  side: Position = 'bottom',
  align: Alignment = 'start'
): ViewProps => {
  const positions: Record<Position, ViewProps> = {
    top: {
      bottom: '100%',
      marginBottom: '8px',
      ...(align === 'start' && { left: 0 }),
      ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
      ...(align === 'end' && { right: 0 }),
    },
    right: {
      left: '100%',
      marginLeft: '8px',
      ...(align === 'start' && { top: 0 }),
      ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
      ...(align === 'end' && { bottom: 0 }),
    },
    bottom: {
      top: '100%',
      marginTop: '8px',
      ...(align === 'start' && { left: 0 }),
      ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
      ...(align === 'end' && { right: 0 }),
    },
    left: {
      right: '100%',
      marginRight: '8px',
      ...(align === 'start' && { top: 0 }),
      ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
      ...(align === 'end' && { bottom: 0 }),
    },
  };

  return positions[side];
};
