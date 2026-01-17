import { ViewProps } from 'app-studio';
import { Placement, Size } from './Drawer.type';

export const DrawerSizes: Record<Size, string> = {
  xs: '320px',
  sm: '380px',
  md: '480px',
  lg: '640px',
  xl: '768px',
  full: '100%',
};

export const DrawerPlacements: Record<Placement, ViewProps> = {
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    height: '100vh',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'color-gray-200',
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'color-gray-200',
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'color-gray-200',
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    width: '100vw',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'color-gray-200',
  },
};
