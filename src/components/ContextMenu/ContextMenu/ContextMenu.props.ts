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
  /**
   * The content that will trigger the context menu on right-click
   */
  children: React.ReactNode;
  /**
   * The items to display in the context menu (for data-driven approach)
   */
  items?: ContextMenuItem[];
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
   * Callback fired when the menu open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
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
   * If true, merges props onto the immediate child
   */
  asChild?: boolean;
  /**
   * Disables the trigger
   */
  isDisabled?: boolean;
  /**
   * Custom styles for the trigger container
   */
  views?: {
    container?: ViewProps;
  };
}

export interface ContextMenuContentProps extends Omit<ViewProps, 'position'> {
  /**
   * The items to display in the context menu (for data-driven approach)
   */
  items?: ContextMenuItem[];
  /**
   * The content of the menu (for compound component pattern)
   */
  children?: React.ReactNode;
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
    content?: ViewProps;
    item?: ViewProps;
    divider?: ViewProps;
    separator?: ViewProps;
    icon?: ViewProps;
    submenuIndicator?: ViewProps;
  };
}

export interface ContextMenuItemProps
  extends Omit<ButtonProps, 'onPress' | 'onClick'> {
  /**
   * The item data (for data-driven approach)
   */
  item?: ContextMenuItem;
  /**
   * The content of the menu item (for compound component pattern)
   */
  children?: React.ReactNode;
  /**
   * Callback fired when the item is selected (clicked)
   */
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Disables interaction with the item
   */
  isDisabled?: boolean;
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

export interface ContextMenuSeparatorProps extends ViewProps {
  /**
   * Custom styling for the separator
   */
  views?: {
    separator?: ViewProps;

    /**
     * Optional theme mode override ('light' or 'dark')
     * If not provided, the component will use the theme mode from context
     */
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
  /**
   * The separator component for the context menu (alias for Divider)
   */
  Separator: React.FC<ContextMenuSeparatorProps>;
}
