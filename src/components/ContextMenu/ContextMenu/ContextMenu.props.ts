import React from 'react';
import { ViewProps } from 'app-studio';
import { ButtonProps } from '../../Button/Button/Button.props';
import {
  ContextMenuItem,
  ContextMenuStyles,
  Size,
  Variant,
  Position,
  Alignment,
} from './ContextMenu.type';
export interface ContextMenuProps {
  // The content to be rendered inside the context menu, typically the element that triggers the menu.
  children: React.ReactNode;
  // An optional array of configuration objects for each menu item, defining its text, action, etc.
  items?: ContextMenuItem[];
  // Defines the size variant of the context menu components.
  size?: Size;
  // Specifies the visual styling variant for the context menu.
  variant?: Variant;
  // Controls whether the browser's native context menu is disabled when right-clicking.
  disableNativeContextMenu?: boolean;
  // A callback function invoked when the context menu's open state changes.
  onOpenChange?: (isOpen: boolean) => void;
  // Allows customization of the context menu's internal component styles.
  views?: ContextMenuStyles;
  // Enables additional arbitrary properties to be passed to the component.
  [key: string]: any;
}
export interface ContextMenuTriggerProps {
  // The element that, when interacted with (e.g., right-clicked), will open the context menu.
  children: React.ReactNode;
  // Prevents the default browser context menu from appearing on right-click.
  disableNativeContextMenu?: boolean;
  // When true, the trigger will render its child without wrapping it in an extra DOM element.
  asChild?: boolean;
  // If true, the trigger element will not open the context menu.
  isDisabled?: boolean;
  // Customization options for the styling of the trigger component.
  views?: {
    // Custom style properties for the trigger's main container.
    container?: ViewProps;
  };
}
export interface ContextMenuContentProps extends Omit<ViewProps, 'position'> {
  // An optional array of menu item configurations to render within the content.
  items?: ContextMenuItem[];
  // The actual JSX content to display inside the context menu.
  children?: React.ReactNode;
  // Defines the precise x and y coordinates where the context menu should appear.
  position?: { x: number; y: number };
  // Specifies the preferred side (e.g., 'top', 'bottom', 'left', 'right') relative to the trigger where the content should open.
  side?: Position;
  // Determines the alignment of the context menu content relative to the trigger.
  align?: Alignment;
  // Customization options for the styling of various parts of the context menu content.
  views?: {
    // Custom styles for the main menu wrapper element.
    menu?: ViewProps;
    // Custom styles for the content area of the menu.
    content?: ViewProps;
    // Custom styles applied to individual menu items.
    item?: ViewProps;
    // Custom styles for menu dividers.
    divider?: ViewProps;
    // Custom styles for menu separators.
    separator?: ViewProps;
    // Custom styles for icons displayed within menu items.
    icon?: ViewProps;
    // Custom styles for the indicator signifying a submenu.
    submenuIndicator?: ViewProps;
  };
}
export interface ContextMenuItemProps
  extends Omit<ButtonProps, 'onPress' | 'onClick'> {
  // Configuration object for a single context menu item, providing details like label, icon, or action.
  item?: ContextMenuItem;
  // The content to be rendered inside the menu item, typically text or an icon.
  children?: React.ReactNode;
  // A callback function invoked when the menu item is selected or clicked.
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // If true, the menu item will be visually disabled and unclickable.
  isDisabled?: boolean;
  // Customization options for the styling of various parts of the menu item.
  views?: {
    // Custom styles for the menu item's main container.
    item?: ViewProps;
    // Custom styles for the icon within the menu item.
    icon?: ViewProps;
    // Custom styles for the submenu indicator within the item.
    submenuIndicator?: ViewProps;
  };
}
export interface ContextMenuDividerProps {
  // Customization options for the styling of the divider component.
  views?: {
    // Custom styles for the visual divider element in the menu.
    divider?: ViewProps;
  };
}
export interface ContextMenuSeparatorProps extends ViewProps {
  // Customization options for the styling of the separator component.
  views?: {
    // Custom styles for the visual separator element in the menu.
    separator?: ViewProps;
  };
}
export interface ContextMenuType extends React.FC<ContextMenuProps> {
  // Represents the component responsible for triggering the context menu.
  Trigger: React.FC<ContextMenuTriggerProps>;
  // Represents the component that renders the actual menu content.
  Content: React.FC<ContextMenuContentProps>;
  // Represents a single interactive item within the context menu.
  Item: React.FC<ContextMenuItemProps>;
  // Represents a visual divider line within the context menu.
  Divider: React.FC<ContextMenuDividerProps>;
  // Represents a non-interactive separator line within the context menu.
  Separator: React.FC<ContextMenuSeparatorProps>;
}
