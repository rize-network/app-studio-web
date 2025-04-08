import React from 'react';
import { ViewProps } from 'app-studio';
import { 
  DropdownMenuItem, 
  DropdownMenuStyles, 
  Size, 
  Variant,
  Position,
  Alignment
} from './DropdownMenu.type';

export interface DropdownMenuProps {
  /**
   * The trigger element that will open the dropdown menu when clicked
   */
  trigger: React.ReactNode;
  /**
   * The items to display in the dropdown menu
   */
  items: DropdownMenuItem[];
  /**
   * The size of the dropdown menu items
   */
  size?: Size;
  /**
   * The visual style variant of the dropdown menu
   */
  variant?: Variant;
  /**
   * The preferred side to display the dropdown menu
   */
  side?: Position;
  /**
   * The alignment of the dropdown menu
   */
  align?: Alignment;
  /**
   * Whether the dropdown menu is initially open
   */
  defaultOpen?: boolean;
  /**
   * Custom styles for different parts of the dropdown menu
   */
  views?: DropdownMenuStyles;
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface DropdownMenuTriggerProps {
  /**
   * The content that will trigger the dropdown menu on click
   */
  children: React.ReactNode;
  /**
   * Custom styles for the trigger container
   */
  views?: {
    container?: ViewProps;
  };
}

export interface DropdownMenuContentProps {
  /**
   * The items to display in the dropdown menu
   */
  items: DropdownMenuItem[];
  /**
   * The preferred side to display the dropdown menu
   */
  side?: Position;
  /**
   * The alignment of the dropdown menu
   */
  align?: Alignment;
  /**
   * Custom styles for the dropdown menu
   */
  views?: {
    menu?: ViewProps;
    item?: ViewProps;
    divider?: ViewProps;
    icon?: ViewProps;
    submenuIndicator?: ViewProps;
  };
}

export interface DropdownMenuItemProps {
  /**
   * The item data
   */
  item: DropdownMenuItem;
  /**
   * Custom styles for the item
   */
  views?: {
    item?: ViewProps;
    icon?: ViewProps;
    submenuIndicator?: ViewProps;
  };
}

export interface DropdownMenuDividerProps {
  /**
   * Custom styles for the divider
   */
  views?: {
    divider?: ViewProps;
  };
}

export interface DropdownMenuType extends React.FC<DropdownMenuProps> {
  /**
   * The trigger component for the dropdown menu
   */
  Trigger: React.FC<DropdownMenuTriggerProps>;
  /**
   * The content component for the dropdown menu
   */
  Content: React.FC<DropdownMenuContentProps>;
  /**
   * The item component for the dropdown menu
   */
  Item: React.FC<DropdownMenuItemProps>;
  /**
   * The divider component for the dropdown menu
   */
  Divider: React.FC<DropdownMenuDividerProps>;
}
