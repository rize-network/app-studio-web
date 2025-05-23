import React from 'react';
import { ViewProps } from 'app-studio';
import {
  MenubarItem,
  MenubarStyles,
  Orientation,
  Size,
  Variant,
} from './Menubar.type';

export interface MenubarProps {
  /**
   * The items to display in the menubar
   */
  items: MenubarItem[];
  /**
   * The orientation of the menubar
   */
  orientation?: Orientation;
  /**
   * The size of the menubar items
   */
  size?: Size;
  /**
   * The visual style variant of the menubar
   */
  variant?: Variant;
  /**
   * The ID of the initially active menu
   */
  defaultActiveMenuId?: string | null;
  /**
   * The ID of the initially open menu
   */
  defaultOpenMenuId?: string | null;
  /**
   * Custom styles for different parts of the menubar
   */
  views?: MenubarStyles;
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface MenubarRootProps {
  /**
   * The content of the menubar
   */
  children: React.ReactNode;
  /**
   * The orientation of the menubar
   */
  orientation?: Orientation;
  /**
   * The size of the menubar items
   */
  size?: Size;
  /**
   * The visual style variant of the menubar
   */
  variant?: Variant;
  /**
   * Custom styles for the menubar container
   */
  views?: {
    container?: ViewProps;
  };
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface MenubarMenuProps {
  /**
   * The content of the menubar menu
   */
  children: React.ReactNode;
  /**
   * The ID of the menu
   */
  id: string;
  /**
   * Whether the menu is disabled
   */
  disabled?: boolean;
  /**
   * Custom styles for the menu
   */
  views?: {
    menu?: ViewProps;
  };
}

export interface MenubarTriggerProps {
  /**
   * The content of the menubar trigger
   */
  children: React.ReactNode;
  /**
   * The ID of the menu this trigger belongs to
   */
  menuId: string;
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
  /**
   * Custom styles for the trigger
   */
  views?: {
    trigger?: ViewProps;
    icon?: ViewProps;
  };
}

export interface MenubarContentProps {
  /**
   * The content of the menubar dropdown
   */
  children: React.ReactNode;
  /**
   * The ID of the menu this content belongs to
   */
  menuId: string;
  /**
   * Custom styles for the content
   */
  views?: {
    content?: ViewProps;
  };
}

export interface MenubarItemProps {
  /**
   * The content of the menubar item
   */
  children: React.ReactNode;
  /**
   * The ID of the item
   */
  id: string;
  /**
   * The icon to display next to the item
   */
  icon?: React.ReactNode;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Callback when the item is clicked
   */
  onClick?: () => void;
  /**
   * Custom styles for the item
   */
  views?: {
    item?: ViewProps;
    icon?: ViewProps;
  };
}

export interface MenubarSeparatorProps {
  /**
   * Custom styles for the separator
   */
  views?: {
    separator?: ViewProps;
  };
}

export interface MenubarType extends React.FC<MenubarProps> {
  /**
   * The root component for the menubar
   */
  Root: React.FC<MenubarRootProps>;
  /**
   * The menu component for the menubar
   */
  Menu: React.FC<MenubarMenuProps>;
  /**
   * The trigger component for menubar menus
   */
  Trigger: React.FC<MenubarTriggerProps>;
  /**
   * The content component for menubar menus
   */
  Content: React.FC<MenubarContentProps>;
  /**
   * The item component for menubar content
   */
  Item: React.FC<MenubarItemProps>;
  /**
   * The separator component for menubar content
   */
  Separator: React.FC<MenubarSeparatorProps>;
}
