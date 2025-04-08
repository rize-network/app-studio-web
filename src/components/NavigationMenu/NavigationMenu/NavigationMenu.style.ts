import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './NavigationMenu.type';

export const NavigationMenuSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '8px 12px',
    fontSize: '14px',
  },
  md: {
    padding: '10px 16px',
    fontSize: '16px',
  },
  lg: {
    padding: '12px 20px',
    fontSize: '18px',
  },
};

export const NavigationMenuVariants: Record<Variant, ViewProps> = {
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

export const NavigationMenuOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
};

export const NavigationMenuItemStates = {
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
