import { ViewProps } from 'app-studio';
import { ButtonProps } from '../../Button/Button/Button.props';
import React from 'react';
// Defines the available predefined sizes for the context menu: small, medium, or large.
export type Size = 'sm' | 'md' | 'lg';
// Defines the visual variants for the context menu's appearance, such as default, filled, or outlined.
export type Variant = 'default' | 'filled' | 'outline';
// Specifies the possible relative positions where the context menu can open: top, right, bottom, or left.
export type Position = 'top' | 'right' | 'bottom' | 'left';
// Defines the alignment options for context menu content: start, center, or end.
export type Alignment = 'start' | 'center' | 'end';
// Defines the structure for a single item within the context menu.
export interface ContextMenuItem {
  // A unique identifier for the menu item.
  id: string;
  // The text displayed for the menu item.
  label: string;
  // An optional React node to display an icon next to the label.
  icon?: React.ReactNode;
  // An optional callback function executed when the menu item is clicked.
  onClick?: () => void;
  // A boolean flag indicating if the menu item is disabled and non-interactive.
  disabled?: boolean;
  // An optional array of `ContextMenuItem` objects, used to create a submenu.
  items?: ContextMenuItem[];
  // A boolean flag indicating if a visual divider should appear after this menu item.
  divider?: boolean;
}
// Defines the shape of the context object that manages the state and functions of the ContextMenu.
export interface ContextMenuContextType {
  // Indicates whether the context menu is currently open or closed.
  isOpen: boolean;
  // A function to update the open/closed state of the context menu.
  setIsOpen: (isOpen: boolean) => void;
  // The current x and y coordinates where the context menu is displayed.
  position: { x: number; y: number };
  // A function to update the display position of the context menu.
  setPosition: (position: { x: number; y: number }) => void;
  // The ID of the currently active or open submenu, or null if no submenu is active.
  activeSubmenuId: string | null;
  // A function to set the ID of the active submenu.
  setActiveSubmenuId: (id: string | null) => void;
  // The size variant applied to the context menu and its items.
  size: Size;
  // The visual style variant applied to the context menu and its items.
  variant: Variant;
  // An optional React ref object pointing to the DOM element that triggers the context menu.
  triggerRef?: React.RefObject<HTMLElement>;
  // An optional React ref object pointing to the DOM element containing the context menu content.
  contentRef?: React.RefObject<HTMLDivElement>;
  // An optional ID for the context menu content element.
  contentId?: string;
  // An optional function to programmatically close the context menu.
  closeMenu?: () => void;
  // An optional function to programmatically open the context menu, typically with a mouse event.
  openMenu?: (event: React.MouseEvent) => void;
  // Optional custom styles to apply to different parts of the context menu.
  styles?: ContextMenuStyles;
}
// Defines an interface for customizing the styles of various sub-components within the ContextMenu.
export interface ContextMenuStyles {
  // Custom styles for the outermost container of the context menu.
  container?: ViewProps;
  // Custom styles for the main menu wrapper.
  menu?: ViewProps;
  // Custom styles for the content area of the context menu.
  content?: ViewProps;
  // Custom styles for individual menu items, including a specific style for disabled items.
  item?: ButtonProps & { _disabled?: ButtonProps };
  // Custom styles for a menu item when it is active or hovered.
  activeItem?: ViewProps;
  // Custom styles for the visual divider separating menu items.
  divider?: ViewProps;
  // Custom styles for a separator element (similar to divider, possibly for different visual needs).
  separator?: ViewProps;
  // Custom styles for the icon displayed within a menu item.
  icon?: ViewProps;
  // Custom styles for the indicator icon that signifies a submenu.
  submenuIndicator?: ViewProps;
  // Custom styles for a submenu container.
  submenu?: ViewProps;
}
