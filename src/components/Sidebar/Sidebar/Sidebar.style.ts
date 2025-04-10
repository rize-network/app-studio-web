import { ViewProps } from 'app-studio';
import { Position, Size, Variant } from './Sidebar.type';

export const SidebarSizes: Record<
  Size,
  { expandedWidth: string; collapsedWidth: string }
> = {
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
  xl: {
    expandedWidth: '360px',
    collapsedWidth: '88px',
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
  subtle: {
    backgroundColor: 'color.gray.50',
    color: 'color.gray.800',
  },
  elevated: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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

// Default elevation styles for the sidebar
export const SidebarElevations = {
  none: {},
  low: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  medium: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  high: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
};

// Default transition presets for the sidebar
export const SidebarTransitions = {
  fast: 'width 0.2s ease, transform 0.2s ease',
  normal: 'width 0.3s ease, transform 0.3s ease',
  slow: 'width 0.5s ease, transform 0.5s ease',
  bounce:
    'width 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
};
