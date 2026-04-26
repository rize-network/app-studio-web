import { ViewProps } from 'app-studio';
import {
  Position,
  Size,
  Variant,
  Elevation,
  TransitionPreset,
} from './Sidebar.type';
// Defines a map for various sidebar sizes (sm, md, lg, xl), specifying their `expandedWidth` and `collapsedWidth` properties.
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
// Generates a set of `ViewProps` for the sidebar based on its `Variant` (default, filled, outline, subtle, elevated) and the current `themeMode` (light/dark).
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
// Exports the default sidebar variants, pre-configured using the `getSidebar` function for a 'light' theme.
export const SidebarVariants = getSidebar('light');
// Defines styling configurations for the sidebar based on its `Position` (left or right), including border styles.
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
// Specifies shadow properties for different `Elevation` levels (none, low, medium, high) to be applied to the sidebar.
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
// Provides predefined CSS transition strings for various animation speed `TransitionPreset` options (fast, normal, slow, bounce).
export const SidebarTransitions: Record<TransitionPreset, string> = {
  fast: 'all 0.2s ease-in-out',
  normal: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
  bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
};
// Defines the visual styles to apply when a sidebar item is in an active state, including background color, text color, font weight, and a left border.
export const SidebarItemActive: ViewProps = {
  backgroundColor: 'rgba(var(--theme-primary-rgb), 0.1)',
  color: 'theme-primary',
  fontWeight: '600',
  borderLeftWidth: '2px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'theme-primary',
};
// Specifies the visual styles to apply when a user hovers over a sidebar item, primarily changing the background color with a transition.
export const SidebarItemHover: ViewProps = {
  backgroundColor: 'color-gray-100',
  transition: 'all 0.2s ease-in-out',
};
