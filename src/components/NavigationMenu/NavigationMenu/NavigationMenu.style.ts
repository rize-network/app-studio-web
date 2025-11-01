/**
 * NavigationMenu Styles
 *
 * Defines the styles for the NavigationMenu component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './NavigationMenu.type';

/**
 * Size configurations for the NavigationMenu component
 * Following the 4px grid system
 */
export const NavigationMenuSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '8px 12px', // 2×4px and 3×4px grid
    fontSize: '12px', // Harmonized font size
    fontWeight: '500', // Medium weight for better readability
    media: {
      mobile: {
        padding: '6px 10px',
        fontSize: '11px',
      },
    },
  },
  md: {
    padding: '12px 16px', // 3×4px and 4×4px grid
    fontSize: '14px', // Harmonized font size
    fontWeight: '500', // Medium weight for better readability
    media: {
      mobile: {
        padding: '10px 14px',
        fontSize: '13px',
      },
    },
  },
  lg: {
    padding: '16px 20px', // 4×4px and 5×4px grid
    fontSize: '16px', // Harmonized font size
    fontWeight: '500', // Medium weight for better readability
    media: {
      mobile: {
        padding: '12px 16px',
        fontSize: '14px',
      },
    },
  },
};

/**
 * Variant styles for the NavigationMenu component
 */
export const NavigationMenuVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    color: 'color.gray.800',
    transition: 'all 0.2s ease',
  },
  filled: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
    transition: 'all 0.2s ease',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    color: 'color.gray.800',
    transition: 'all 0.2s ease',
  },
};

/**
 * Orientation styles for the NavigationMenu component
 */
export const NavigationMenuOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
    gap: '8px', // 2×4px grid
    media: {
      mobile: {
        flexDirection: 'column', // Stack vertically on mobile
        gap: '4px',
      },
    },
  },
  vertical: {
    flexDirection: 'column',
    gap: '4px', // 1×4px grid
  },
};

/**
 * State styles for the NavigationMenu items
 */
export const NavigationMenuItemStates = {
  active: {
    backgroundColor: 'color.blue.50',
    color: 'color.blue.700',
    fontWeight: '600', // Semi-bold for active items
    borderLeftWidth: 3,
    borderLeftStyle: 'solid' as const,
    borderLeftColor: 'color.blue.600',
  },
  hover: {
    backgroundColor: 'color.gray.100',
    transition: 'background-color 0.2s ease',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};

/**
 * Icon styles for the NavigationMenu component
 */
export const NavigationMenuIconStyles = {
  default: {
    color: 'color.gray.500',
    transition: 'color 0.2s ease',
  },
  active: {
    color: 'color.blue.600',
    transition: 'color 0.2s ease',
  },
};
