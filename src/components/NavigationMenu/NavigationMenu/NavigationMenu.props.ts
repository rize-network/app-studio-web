import React from 'react';
import { ViewProps } from 'app-studio';
import {
  NavigationItem,
  NavigationMenuStyles,
  Orientation,
  Size,
  Variant,
} from './NavigationMenu.type';

export interface NavigationMenuProps {
  /**
   * The items to display in the navigation menu
   */
  items: NavigationItem[];
  /**
   * The orientation of the navigation menu
   */
  orientation?: Orientation;
  /**
   * The size of the navigation menu items
   */
  size?: Size;
  /**
   * The visual style variant of the navigation menu
   */
  variant?: Variant;
  /**
   * The ID of the initially active item
   */
  defaultActiveItemId?: string;
  /**
   * The IDs of the initially expanded items (for items with sub-items)
   */
  defaultExpandedItemIds?: string[];
  /**
   * Callback when an item is activated
   */
  onItemActivate?: (itemId: string) => void;
  /**
   * Custom styles for different parts of the navigation menu
   */
  views?: NavigationMenuStyles;
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface NavigationMenuListProps {
  /**
   * The content of the navigation menu list
   */
  children: React.ReactNode;
  /**
   * Custom styles for the list
   */
  views?: {
    container?: ViewProps;
  };
}

export interface NavigationMenuItemProps {
  /**
   * The navigation item data
   */
  item: NavigationItem;
  /**
   * Custom styles for the item
   */
  views?: {
    item?: ViewProps;
    trigger?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
    indicator?: ViewProps;
  };
}

export interface NavigationMenuTriggerProps {
  /**
   * The content of the navigation menu trigger
   */
  children: React.ReactNode;
  /**
   * The ID of the item this trigger belongs to
   */
  itemId: string;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Custom styles for the trigger
   */
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
    trigger?: ViewProps;
    indicator?: ViewProps;
  };
}

export interface NavigationMenuContentProps {
  /**
   * The content to be displayed
   */
  children: React.ReactNode;
  /**
   * The ID of the item this content belongs to
   */
  itemId: string;
  /**
   * Custom styles for the content
   */
  views?: {
    container?: ViewProps;
  };
}

export interface NavigationMenuType extends React.FC<NavigationMenuProps> {
  /**
   * The list component for the navigation menu
   */
  List: React.FC<NavigationMenuListProps>;
  /**
   * The item component for the navigation menu
   */
  Item: React.FC<NavigationMenuItemProps>;
  /**
   * The trigger component for navigation menu items with sub-items
   */
  Trigger: React.FC<NavigationMenuTriggerProps>;
  /**
   * The content component for navigation menu items with sub-items
   */
  Content: React.FC<NavigationMenuContentProps>;
}
