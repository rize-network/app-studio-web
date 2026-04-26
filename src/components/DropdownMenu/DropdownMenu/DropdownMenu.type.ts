import { ViewProps } from 'app-studio';
import React from 'react';
// Defines the possible size variations ('sm', 'md', 'lg') for the dropdown menu components.
export type Size = 'sm' | 'md' | 'lg';
// Specifies the visual styles or variants ('default', 'filled', 'outline') available for the dropdown menu.
export type Variant = 'default' | 'filled' | 'outline';
// Determines where the dropdown menu will appear relative to its trigger ('top', 'right', 'bottom', 'left').
export type Position = 'top' | 'right' | 'bottom' | 'left';
// Specifies the alignment of the dropdown menu content relative to its trigger ('start', 'center', 'end').
export type Alignment = 'start' | 'center' | 'end';
// Defines the structure and properties for a single item within the dropdown menu.
export interface DropdownMenuItem {
  // A unique identifier for the dropdown menu item.
  id: string;
  // The text content displayed for the menu item.
  label: string;
  // An optional React node to display an icon alongside the item label.
  icon?: React.ReactNode;
  // An optional callback function to execute when the menu item is clicked.
  onClick?: () => void;
  // An optional flag to indicate if the menu item should be disabled.
  disabled?: boolean;
  // An optional array of `DropdownMenuItem`s, allowing for nested submenus.
  items?: DropdownMenuItem[];
  // An optional flag to display a visual divider above the menu item.
  divider?: boolean;
}
// Defines the shape of the context object for the dropdown menu, providing state and functions to its children.
export interface DropdownMenuContextType {
  // Indicates whether the dropdown menu is currently open or closed.
  isOpen: boolean;
  // A function to update the `isOpen` state of the dropdown menu.
  setIsOpen: (isOpen: boolean) => void;
  // Stores the ID of the currently active or open submenu, or `null` if none.
  activeSubmenuId: string | null;
  // A function to set the ID of the currently active submenu.
  setActiveSubmenuId: (id: string | null) => void;
  // The size variant ('sm', 'md', 'lg') applied to the dropdown menu.
  size: Size;
  // The visual variant ('default', 'filled', 'outline') applied to the dropdown menu.
  variant: Variant;
  // A React ref object pointing to the DOM element that triggers the dropdown menu.
  triggerRef: React.RefObject<HTMLElement>;
}
// Defines the properties for applying custom styles to various parts of the dropdown menu component.
export interface DropdownMenuStyles {
  // Optional styles for the main container wrapping the dropdown menu.
  container?: ViewProps;
  // Optional styles for the element that triggers the dropdown menu.
  trigger?: ViewProps;
  // Optional styles for the dropdown menu panel itself.
  menu?: ViewProps;
  // Optional styles for individual items within the dropdown menu.
  item?: ViewProps;
  // Optional styles for an item when it is in an active or hovered state.
  activeItem?: ViewProps;
  // Optional styles for the divider element between menu items.
  divider?: ViewProps;
  // Optional styles for the icon displayed within a menu item.
  icon?: ViewProps;
  // Optional styles for the indicator icon present on items with submenus.
  submenuIndicator?: ViewProps;
  // Optional styles for the submenu panel itself.
  submenu?: ViewProps;
}
