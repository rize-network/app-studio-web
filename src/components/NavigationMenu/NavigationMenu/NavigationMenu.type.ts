import { ViewProps } from 'app-studio';
import React from 'react';
// Defines the possible orientations for the navigation menu.
export type Orientation = 'horizontal' | 'vertical';
// Defines the possible sizes for the navigation menu.
export type Size = 'sm' | 'md' | 'lg';
// Defines the possible visual variants for the navigation menu.
export type Variant = 'default' | 'filled' | 'outline';
// Defines the structure for a single item within the navigation menu.
export interface NavigationItem {
  // A unique identifier for the navigation item.
  id: string;
  // The text displayed for the navigation item.
  label: string;
  // An optional React node to display as an icon next to the label.
  icon?: React.ReactNode;
  // An optional URL that the navigation item links to.
  href?: string;
  // An optional array of child navigation items, indicating a nested menu.
  items?: NavigationItem[];
  // An optional flag indicating whether the navigation item is disabled.
  disabled?: boolean;
}
// Defines the shape of the context object used to manage navigation menu state and interactions.
export interface NavigationMenuContextType {
  // The ID of the currently active navigation item, or null if none is active.
  activeItemId: string | null;
  // A function to set the ID of the active navigation item.
  setActiveItemId: (id: string | null) => void;
  // An array of IDs for currently expanded navigation items (e.g., submenus).
  expandedItemIds: string[];
  // A function to toggle the expanded state of a navigation item by its ID.
  toggleExpandedItem: (id: string) => void;
  // A function to check if a specific navigation item is currently expanded.
  isItemExpanded: (id: string) => boolean;
  // An optional callback function triggered when a navigation item is activated.
  onItemActivate?: (itemId: string) => void;
  // The orientation of the navigation menu, either horizontal or vertical.
  orientation: Orientation;
  // The size variant of the navigation menu.
  size: Size;
  // The visual variant style of the navigation menu.
  variant: Variant;
  // A mutable ref object to store references to HTML div elements that act as triggers for menu items.
  triggerRefs: React.MutableRefObject<Record<string, HTMLDivElement>>;
}
// Defines props for custom styling of various parts of the navigation menu.
export interface NavigationMenuStyles {
  // Optional styling properties for the main container of the navigation menu.
  container?: ViewProps;
  // Optional styling properties for the list element that holds navigation items.
  list?: ViewProps;
  // Optional styling properties for individual navigation items.
  item?: ViewProps;
  // Optional styling properties specifically for the currently active navigation item.
  activeItem?: ViewProps;
  // Optional styling properties for the content area associated with a navigation item.
  content?: ViewProps;
  // Optional styling properties for the interactive element that opens/closes a submenu.
  trigger?: ViewProps;
  // Optional styling properties for icons displayed within navigation items.
  icon?: ViewProps;
  // Optional styling properties for any visual indicator (e.g., an arrow) next to a submenu trigger.
  indicator?: ViewProps;
}
