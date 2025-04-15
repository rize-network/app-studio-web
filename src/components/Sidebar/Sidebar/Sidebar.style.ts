/**
 * Sidebar Styles
 *
 * Defines the styles for the Sidebar component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import {
  Position,
  Size,
  Variant,
  Elevation,
  TransitionPreset,
} from './Sidebar.type';

/**
 * Size configurations for the Sidebar component
 * Following the 4px grid system
 */
export const SidebarSizes: Record<
  Size,
  { expandedWidth: string; collapsedWidth: string }
> = {
  sm: {
    expandedWidth: '240px', // 60 × 4px grid
    collapsedWidth: '64px', // 16 × 4px grid
  },
  md: {
    expandedWidth: '280px', // 70 × 4px grid
    collapsedWidth: '72px', // 18 × 4px grid
  },
  lg: {
    expandedWidth: '320px', // 80 × 4px grid
    collapsedWidth: '80px', // 20 × 4px grid
  },
  xl: {
    expandedWidth: '360px', // 90 × 4px grid
    collapsedWidth: '88px', // 22 × 4px grid
  },
};

/**
 * Variant styles for the Sidebar component
 */
export const SidebarVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'white',
    color: 'color.gray.800',

    transition: 'all 0.2s ease',
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',

    transition: 'all 0.2s ease',
  },
  outline: {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',

    transition: 'all 0.2s ease',
  },
  subtle: {
    backgroundColor: 'color.gray.50',
    color: 'color.gray.800',

    transition: 'all 0.2s ease',
  },
  elevated: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'color.gray.800',

    transition: 'all 0.2s ease',
  },
};

/**
 * Position styles for the Sidebar component
 */
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

/**
 * Elevation styles for the Sidebar component
 */
export const SidebarElevations: Record<Elevation, ViewProps> = {
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

/**
 * Transition presets for the Sidebar component
 */
export const SidebarTransitions: Record<TransitionPreset, string> = {
  fast: 'width 0.2s ease, transform 0.2s ease',
  normal: 'width 0.3s ease, transform 0.3s ease',
  slow: 'width 0.5s ease, transform 0.5s ease',
  bounce:
    'width 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
};

/**
 * Active item styles for the Sidebar navigation items
 */
export const SidebarItemActive: ViewProps = {
  backgroundColor: 'color.blue.50',
  color: 'color.blue.700',
  fontWeight: '600', // Semi-bold for active items
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'color.blue.600',
};

/**
 * Hover styles for the Sidebar navigation items
 */
export const SidebarItemHover: ViewProps = {
  backgroundColor: 'color.gray.100',
  transition: 'background-color 0.2s ease',
};
