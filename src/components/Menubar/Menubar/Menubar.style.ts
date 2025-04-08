import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './Menubar.type';

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

export const MenubarVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    color: 'color.gray.800',
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',
  },
};

export const MenubarOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
};

export const MenubarItemStates = {
  active: {
    backgroundColor: 'color.gray.200',
    fontWeight: 'bold',
  },
  hover: {
    backgroundColor: 'color.gray.100',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export const getMenubarContentPosition = (orientation: Orientation): ViewProps => {
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
