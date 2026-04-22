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
export const getSidebar = (themeMode: string): Record<Variant, ViewProps> => {
  const isDark = themeMode === 'dark';

  return {
    default: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      color: isDark ? 'color-gray-100' : 'color-gray-800',
      transition:
        'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    },
    filled: {
      backgroundColor: isDark ? 'color-gray-800' : 'color-gray-100',
      color: isDark ? 'color-gray-100' : 'color-gray-800',
      transition:
        'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    },
    outline: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
      color: isDark ? 'color-gray-100' : 'color-gray-800',
      transition:
        'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    },
    subtle: {
      backgroundColor: isDark ? 'color-gray-800' : 'color-gray-50',
      color: isDark ? 'color-gray-100' : 'color-gray-800',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    elevated: {
      backgroundColor: isDark ? 'color-gray-900' : 'color-white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      color: isDark ? 'color-gray-100' : 'color-gray-800',
      transition: 'all 0.2s ease-in-out',
    },
  };
};

// For backward compatibility
export const SidebarVariants = getSidebar('light');

/**
 * Position styles for the Sidebar component
 */
export const SidebarPositions: Record<Position, ViewProps> = {
  left: {
    left: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'color-gray-200',
  },
  right: {
    right: 0,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'color-gray-200',
  },
};

/**
 * Elevation styles for the Sidebar component
 */
export const SidebarElevations: Record<Elevation, ViewProps> = {
  none: {},
  low: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  medium: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
  },
  high: {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
};

/**
 * Transition presets for the Sidebar component
 */
export const SidebarTransitions: Record<TransitionPreset, string> = {
  fast: 'all 0.2s ease-in-out',
  normal: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
  bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
};

/**
 * Active item styles for the Sidebar navigation items
 */
export const SidebarItemActive: ViewProps = {
  backgroundColor: 'rgba(var(--theme-primary-rgb), 0.1)',
  color: 'theme-primary',
  fontWeight: '600',
  borderLeftWidth: '2px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'theme-primary',
};

/**
 * Hover styles for the Sidebar navigation items
 */
export const SidebarItemHover: ViewProps = {
  backgroundColor: 'color-gray-100',
  transition: 'all 0.2s ease-in-out',
};
