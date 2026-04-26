import React from 'react';
import { ViewProps } from 'app-studio';
import {
  MenubarItem,
  MenubarStyles,
  Orientation,
  Size,
  Variant,
} from './Menubar.type';
// Defines the public properties available for the main Menubar component.
export interface MenubarProps {
  // An array of menu items to be rendered. Each item follows the 'MenubarItem' type definition.
  items: MenubarItem[];
  // Specifies the layout orientation of the menubar, either horizontal or vertical. Defaults to horizontal if not provided.
  orientation?: Orientation;
  // Determines the predefined size of the menubar, affecting its dimensions and internal spacing.
  size?: Size;
  // Defines the visual style or variant of the menubar, such as 'primary', 'secondary', etc.
  variant?: Variant;
  defaultActiveMenuId?: string | null;
  defaultOpenMenuId?: string | null;
  // Provides custom styling for various parts of the menubar, allowing for granular visual customization.
  views?: MenubarStyles;
  // Allows for additional arbitrary properties to be passed to the menubar component.
  [key: string]: any;
}
// Defines the properties for the `Menubar.Root` component, which serves as the top-level container for the menubar.
export interface MenubarRootProps {
  // The child elements to be rendered within the menubar root, typically `Menubar.Menu` components.
  children: React.ReactNode;
  // Specifies the layout orientation for the menubar root container.
  orientation?: Orientation;
  // Determines the predefined size variant for the menubar root container.
  size?: Size;
  // Defines the visual style or variant for the menubar root container.
  variant?: Variant;
  // Custom styles specifically for the root container element of the menubar.
  views?: {
    // Custom `ViewProps` to apply to the main container element of the `Menubar.Root`.
    container?: ViewProps;
  };
  // Allows for additional arbitrary properties to be passed to the root component.
  [key: string]: any;
}
// Defines the properties for the `Menubar.Menu` component, representing an individual menu that can be opened and closed.
export interface MenubarMenuProps {
  // The child elements to be rendered inside this menu, typically a `Menubar.Trigger` and `Menubar.Content`.
  children: React.ReactNode;
  // A unique identifier for this specific menu instance.
  id: string;
  // If true, the menu will be disabled and users cannot interact with it.
  disabled?: boolean;
  // Custom styles specifically for the menu element.
  views?: {
    // Custom `ViewProps` to apply to the main menu element itself.
    menu?: ViewProps;
  };
}
// Defines the properties for the `Menubar.Trigger` component, which is responsible for opening and closing its associated menu.
export interface MenubarTriggerProps {
  // The visible content of the trigger, such as text or an icon, that users click to open the menu.
  children: React.ReactNode;
  // The unique ID of the `Menubar.Menu` component that this trigger controls.
  menuId: string;
  // If true, the trigger will be disabled and cannot be activated.
  disabled?: boolean;
  // Custom styles for both the trigger element and its potential icon.
  views?: {
    // Custom `ViewProps` to apply to the trigger button element.
    trigger?: ViewProps;
    // Custom `ViewProps` to apply to any icon rendered within the trigger.
    icon?: ViewProps;
  };
}
// Defines the properties for the `Menubar.Content` component, which holds the actual items of an opened menu.
export interface MenubarContentProps {
  // The menu items or other content to be rendered within this menu's dropdown panel.
  children: React.ReactNode;
  // The unique ID of the `Menubar.Menu` component that this content belongs to.
  menuId: string;
  // Custom styles specifically for the content container element.
  views?: {
    // Custom `ViewProps` to apply to the content panel element itself.
    content?: ViewProps;
  };
}
// Defines the properties for the `Menubar.Item` component, representing a clickable option within a menu's content.
export interface MenubarItemProps {
  // The visible content of the menu item, typically text.
  children: React.ReactNode;
  // A unique identifier for this specific menu item.
  id: string;
  // An optional React node to display as an icon alongside the menu item.
  icon?: React.ReactNode;
  // If true, the menu item will be disabled and non-interactive.
  disabled?: boolean;
  // A callback function that is executed when the menu item is clicked.
  onClick?: () => void;
  // Custom styles for both the item element and its potential icon.
  views?: {
    // Custom `ViewProps` to apply to the menu item element itself.
    item?: ViewProps;
    // Custom `ViewProps` to apply to any icon rendered within the menu item.
    icon?: ViewProps;
  };
}
// Defines the properties for the `Menubar.Separator` component, used to visually divide groups of items within a menu's content.
export interface MenubarSeparatorProps {
  // Custom styles specifically for the separator element.
  views?: {
    // Custom `ViewProps` to apply to the separator element itself.
    separator?: ViewProps;
  };
}
// Defines the shape of the `Menubar` component, specifying that it is a functional component (FC) that also exposes sub-components as static properties for composition.
export interface MenubarType extends React.FC<MenubarProps> {
  // The root container sub-component for the menubar.
  Root: React.FC<MenubarRootProps>;
  // The individual menu sub-component within the menubar.
  Menu: React.FC<MenubarMenuProps>;
  // The trigger sub-component for opening and closing a menu.
  Trigger: React.FC<MenubarTriggerProps>;
  // The content panel sub-component that holds menu items.
  Content: React.FC<MenubarContentProps>;
  // The individual clickable item sub-component within a menu.
  Item: React.FC<MenubarItemProps>;
  Separator: React.FC<MenubarSeparatorProps>;
}
