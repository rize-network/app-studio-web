import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './NavigationMenu.type';
// Defines a map of styling properties for different predefined sizes of the NavigationMenu component.
export const NavigationMenuSizes: Record<Size, ViewProps> = {
  // Specifies styling for the small (sm) size of the navigation menu, including responsive adjustments for mobile devices.
  sm: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '500',
    media: {
      mobile: {
        padding: '6px 10px',
        fontSize: '11px',
      },
    },
  },
  // Specifies styling for the medium (md) size of the navigation menu, including responsive adjustments for mobile devices.
  md: {
    padding: '10px 14px',
    fontSize: '14px',
    fontWeight: '500',
    media: {
      mobile: {
        padding: '8px 12px',
        fontSize: '12px',
      },
    },
  },
  // Specifies styling for the large (lg) size of the navigation menu, including responsive adjustments for mobile devices.
  lg: {
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '600',
    media: {
      mobile: {
        padding: '10px 14px',
        fontSize: '12px',
      },
    },
  },
};
// Defines a map of styling properties for different visual variants of the NavigationMenu component.
export const NavigationMenuVariants: Record<Variant, ViewProps> = {
  // Specifies the default visual style for the navigation menu, typically a transparent background with standard text color.
  default: {
    backgroundColor: 'transparent',
    color: 'color-gray-800',
    transition:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  },
  // Specifies styling for a 'filled' variant of the navigation menu, often with a subtle background color.
  filled: {
    backgroundColor: 'color-gray-100',
    color: 'color-gray-800',
    transition:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  },
  // Specifies styling for an 'outline' variant of the navigation menu, featuring a border around the component.
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
    transition:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  },
};
// Defines a map of styling properties for different orientation layouts of the NavigationMenu component.
export const NavigationMenuOrientations: Record<Orientation, ViewProps> = {
  // Specifies styling for a horizontal layout of the navigation menu, adjusting to a vertical stack on mobile.
  horizontal: {
    flexDirection: 'row',
    gap: '8px',
    media: {
      mobile: {
        flexDirection: 'column',
        gap: '4px',
      },
    },
  },
  // Specifies styling for a vertical layout of the navigation menu.
  vertical: {
    flexDirection: 'column',
    gap: '4px',
  },
};
// Defines a collection of styling properties for various interaction states of individual items within the NavigationMenu.
export const NavigationMenuItemStates = {
  // Specifies styling for an active navigation menu item, indicating its currently selected state.
  active: {
    backgroundColor: 'color-blue-50',
    color: 'color-blue-700',
    fontWeight: '600',
    borderLeftWidth: 3,
    borderLeftStyle: 'solid' as const,
    borderLeftColor: 'color-blue-600',
  },
  // Specifies styling for a navigation menu item when it is being hovered over by the user.
  hover: {
    backgroundColor: 'color-gray-100',
    transition: 'background-color 0.2s ease',
  },
  // Specifies styling for a disabled navigation menu item, making it visually inactive and non-interactive.
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};
// Defines styling properties for icons used within the NavigationMenu component, for different states.
export const NavigationMenuIconStyles = {
  // Specifies the default styling for icons within the navigation menu.
  default: {
    color: 'color-gray-500',
    transition: 'color 0.2s ease',
  },
  // Specifies styling for icons when their corresponding navigation menu item is active.
  active: {
    color: 'color-blue-600',
    transition: 'color 0.2s ease',
  },
};
