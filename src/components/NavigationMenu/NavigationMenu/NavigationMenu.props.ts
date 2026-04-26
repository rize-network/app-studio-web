import React from 'react';
import { ViewProps } from 'app-studio';
import { LinkProps } from '../../Link/Link/Link.props';
import {
  NavigationItem,
  NavigationMenuStyles,
  Orientation,
  Size,
  Variant,
} from './NavigationMenu.type';
export interface NavigationMenuProps {
  // An optional array of `NavigationItem` objects, used to define the structure and content of the navigation menu.
  items?: NavigationItem[];
  // An optional React node that can be rendered inside the `NavigationMenu` component, allowing for flexible content placement.
  children?: React.ReactNode;
  // Defines the visual orientation of the navigation menu, such as 'horizontal' or 'vertical'.
  orientation?: Orientation;
  // Specifies the visual size of the navigation menu, affecting its overall dimensions.
  size?: Size;
  // Determines the visual style or variant of the navigation menu, allowing for different appearances.
  variant?: Variant;
  defaultActiveItemId?: string;
  defaultExpandedItemIds?: string[];
  // A callback function triggered when a navigation item is activated, providing the ID of the activated item as a parameter.
  onItemActivate?: (itemId: string) => void;
  // An optional object used to apply custom styling to different parts of the navigation menu component.
  views?: NavigationMenuStyles;
  // Allows for additional, arbitrary props to be passed to the component, providing extensibility.
  [key: string]: any;
}
export interface NavigationMenuListProps {
  // Required React node children to be rendered within the navigation menu list container.
  children: React.ReactNode;
  // An optional object for applying custom styles specifically to the list container.
  views?: {
    container?: ViewProps;
  };
}
export interface NavigationMenuItemProps {
  // An optional `NavigationItem` object containing data and configuration for the individual menu item.
  item?: NavigationItem;
  // An optional string value associated with the menu item, often used for identification or state management.
  value?: string;
  // A boolean flag indicating whether the menu item is disabled and therefore not interactive.
  isDisabled?: boolean;
  // Optional React node children to be rendered within the menu item, providing its content.
  children?: React.ReactNode;
  // An optional object for applying custom styles to various sub-parts of the navigation menu item.
  views?: {
    item?: ViewProps;
    trigger?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
    indicator?: ViewProps;
  };
}
export interface NavigationMenuTriggerProps {
  // Required React node or element children that act as the visible trigger for the menu item (e.g., a button or label).
  children: React.ReactNode | React.ReactElement;
  // Required unique identifier for the menu item associated with this trigger.
  itemId: string;
  // An optional boolean flag indicating whether the trigger element is disabled.
  disabled?: boolean;
  // An optional object for applying custom styles to various sub-parts of the navigation menu trigger.
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
    trigger?: ViewProps;
    indicator?: ViewProps;
  };
}
export interface NavigationMenuContentProps {
  // Required React node children to be rendered as the content when the associated menu item is expanded.
  children: React.ReactNode;
  // Required unique identifier for the menu item this content belongs to.
  itemId: string;
  // An optional object for applying custom styles specifically to the content container.
  views?: {
    container?: ViewProps;
  };
}
export interface NavigationMenuLinkProps extends Omit<LinkProps, 'to'> {
  // An optional string URL for the navigation link, used when the component functions as a clickable link.
  href?: string;
  // Required React node children to be rendered as the visible content of the navigation link.
  children: React.ReactNode;
  // An optional object for applying custom styles to various sub-parts of the navigation link.
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
  };
}
export interface NavigationMenuType extends React.FC<NavigationMenuProps> {
  // Represents the `List` sub-component of `NavigationMenu`, typed with its specific `NavigationMenuListProps`.
  List: React.FC<NavigationMenuListProps>;
  // Represents the `Item` sub-component of `NavigationMenu`, typed with its specific `NavigationMenuItemProps`.
  Item: React.FC<NavigationMenuItemProps>;
  // Represents the `Trigger` sub-component of `NavigationMenu`, typed with its specific `NavigationMenuTriggerProps`.
  Trigger: React.FC<NavigationMenuTriggerProps>;
  // Represents the `Content` sub-component of `NavigationMenu`, typed with its specific `NavigationMenuContentProps`.
  Content: React.FC<NavigationMenuContentProps>;
  // Represents the `Link` sub-component of `NavigationMenu`, typed with its specific `NavigationMenuLinkProps`.
  Link: React.FC<NavigationMenuLinkProps>;
}
