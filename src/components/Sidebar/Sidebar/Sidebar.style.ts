import { ViewProps } from 'app-studio';
import { Position, Size, Variant } from './Sidebar.type';

export const SidebarSizes: Record<Size, { expandedWidth: string; collapsedWidth: string }> = {
  sm: {
    expandedWidth: '240px',
    collapsedWidth: '64px',
  },
  md: {
    expandedWidth: '280px',
    collapsedWidth: '72px',
  },
  lg: {
    expandedWidth: '320px',
    collapsedWidth: '80px',
  },
};

export const SidebarVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'white',
    color: 'color.gray.800',
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
  },
  outline: {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',
  },
};

export const SidebarPositions: Record<Position, ViewProps> = {
  left: {
    left: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'color.gray.200',
  },
  right: {
    right: 0,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'color.gray.200',
  },
};
