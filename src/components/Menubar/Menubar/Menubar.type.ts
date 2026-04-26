import { ViewProps } from 'app-studio';
import React from 'react';
// Defines the possible size variations for the Menubar components.
export type Size = 'sm' | 'md' | 'lg';
// Defines the possible visual variations for the Menubar components.
export type Variant = 'default' | 'filled' | 'outline';
// Defines the possible layout orientations for the Menubar.
export type Orientation = 'horizontal' | 'vertical';
// Defines the structure and properties for a single item within the Menubar.
export interface MenubarItem {
  // Unique identifier for the menubar item.
  id: string;
  // The display text for the menubar item.
  label: string;
  // Optional icon to be displayed alongside the label.
  icon?: React.ReactNode;
  // Optional array of sub-items, indicating a nested menu.
  items?: MenubarItem[];
  // Indicates whether the menubar item is interactable or disabled.
  disabled?: boolean;
  // Callback function executed when the menubar item is clicked.
  onClick?: () => void;
  // Indicates if this item should be rendered as a visual separator.
  separator?: boolean;
}
// Defines the shape of the context object for the Menubar, providing state and functions to its children.
export interface MenubarContextType {
  // Stores the ID of the currently active (focused) menu item.
  activeMenuId: string | null;
  // Function to set the ID of the currently active menu item.
  setActiveMenuId: (id: string | null) => void;
  // Stores the ID of the currently open submenu.
  openMenuId: string | null;
  // Function to set the ID of the currently open submenu.
  setOpenMenuId: (id: string | null) => void;
  // Function to check if a specific submenu is currently open.
  isMenuOpen: (id: string) => boolean;
  // Function to toggle the open/closed state of a specific submenu.
  toggleMenu: (id: string) => void;
  // Specifies the layout orientation of the Menubar (horizontal or vertical).
  orientation: Orientation;
  // Specifies the size of the Menubar components.
  size: Size;
  // Specifies the visual variant of the Menubar components.
  variant: Variant;
  // A ref object to store references to the DOM elements of menubar item triggers.
  triggerRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}
// Defines a set of optional styling props for various parts of the Menubar component.
export interface MenubarStyles {
  // Styling properties for the main container of the Menubar.
  container?: ViewProps;
  // Styling properties for individual menu dropdowns.
  menu?: ViewProps;
  // Styling properties for the menubar item that triggers a submenu.
  trigger?: ViewProps;
  // Styling properties for the content area of a submenu.
  content?: ViewProps;
  // Styling properties for a standard menubar item.
  item?: ViewProps;
  // Styling properties for an active (focused) menubar item.
  activeItem?: ViewProps;
  // Styling properties for a menubar separator.
  separator?: ViewProps;
  // Styling properties for an icon within a menubar item.
  icon?: ViewProps;
}
