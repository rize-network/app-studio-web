import { ViewProps } from 'app-studio';
import { Size, Variant, Position, Alignment } from './ContextMenu.type';

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

// Helper function to calculate position based on available space
export const calculateMenuPosition = (
  x: number,
  y: number,
  menuWidth: number,
  menuHeight: number,
  windowWidth: number,
  windowHeight: number,
  side: Position = 'right',
  align: Alignment = 'start'
): { x: number; y: number } => {
  let posX = x;
  let posY = y;

  // Adjust horizontal position based on side
  if (side === 'left') {
    posX = x - menuWidth;
  } else if (side === 'right') {
    posX = x;
  } else if (side === 'top' || side === 'bottom') {
    // Adjust horizontal position based on alignment for top/bottom
    if (align === 'center') {
      posX = x - menuWidth / 2;
    } else if (align === 'end') {
      posX = x - menuWidth;
    }
  }

  // Adjust vertical position based on side
  if (side === 'top') {
    posY = y - menuHeight;
  } else if (side === 'bottom') {
    posY = y;
  } else if (side === 'left' || side === 'right') {
    // Adjust vertical position based on alignment for left/right
    if (align === 'center') {
      posY = y - menuHeight / 2;
    } else if (align === 'end') {
      posY = y - menuHeight;
    }
  }

  // Ensure menu stays within window bounds
  if (posX + menuWidth > windowWidth) {
    posX = windowWidth - menuWidth;
  }
  if (posX < 0) {
    posX = 0;
  }
  if (posY + menuHeight > windowHeight) {
    posY = windowHeight - menuHeight;
  }
  if (posY < 0) {
    posY = 0;
  }

  return { x: posX, y: posY };
};
