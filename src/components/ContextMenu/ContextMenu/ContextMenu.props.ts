import React from 'react';
import { ViewProps } from 'app-studio';
import { 
  ContextMenuItem, 
  ContextMenuStyles, 
  Size, 
  Variant,
  Position,
  Alignment
} from './ContextMenu.type';

export interface ContextMenuProps {
  /**
   * The content that will trigger the context menu on right-click
   */
  children: React.ReactNode;
  /**
   * The items to display in the context menu
   */
  items: ContextMenuItem[];
  /**
   * The size of the context menu items
   */
  size?: Size;
  /**
   * The visual style variant of the context menu
   */
  variant?: Variant;
  /**
   * Whether to disable the default browser context menu
   */
  disableNativeContextMenu?: boolean;
  /**
   * Custom styles for different parts of the context menu
   */
  views?: ContextMenuStyles;
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface ContextMenuTriggerProps {
  /**
   * The content that will trigger the context menu on right-click
   */
  children: React.ReactNode;
  /**
   * Whether to disable the default browser context menu
   */
  disableNativeContextMenu?: boolean;
  /**
   * Custom styles for the trigger container
   */
  views?: {
    container?: ViewProps;
  };
}

export interface ContextMenuContentProps {
  /**
   * The items to display in the context menu
   */
  items: ContextMenuItem[];
  /**
   * The position of the context menu
   */
  position?: { x: number; y: number };
  /**
   * The preferred side to display the context menu
   */
  side?: Position;
  /**
   * The alignment of the context menu
   */
  align?: Alignment;
  /**
   * Custom styles for the context menu
   */
  views?: {
    menu?: ViewProps;
    item?: ViewProps;
    divider?: ViewProps;
    icon?: ViewProps;
    submenuIndicator?: ViewProps;
  };
}

export interface ContextMenuItemProps {
  /**
   * The item data
   */
  item: ContextMenuItem;
  /**
   * Custom styles for the item
   */
  views?: {
    item?: ViewProps;
    icon?: ViewProps;
    submenuIndicator?: ViewProps;
  };
}

export interface ContextMenuDividerProps {
  /**
   * Custom styles for the divider
   */
  views?: {
    divider?: ViewProps;
  };
}

export interface ContextMenuType extends React.FC<ContextMenuProps> {
  /**
   * The trigger component for the context menu
   */
  Trigger: React.FC<ContextMenuTriggerProps>;
  /**
   * The content component for the context menu
   */
  Content: React.FC<ContextMenuContentProps>;
  /**
   * The item component for the context menu
   */
  Item: React.FC<ContextMenuItemProps>;
  /**
   * The divider component for the context menu
   */
  Divider: React.FC<ContextMenuDividerProps>;
}
