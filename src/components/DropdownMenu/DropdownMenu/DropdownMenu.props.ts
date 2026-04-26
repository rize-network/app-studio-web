import React from 'react';
import { ViewProps } from 'app-studio';
import {
  DropdownMenuItem,
  DropdownMenuStyles,
  Size,
  Variant,
  Position,
  Alignment,
} from './DropdownMenu.type';
export interface DropdownMenuProps {
  // Defines the element that will trigger the dropdown menu to open or close.
  trigger: React.ReactNode;
  // An array of data representing the items to be displayed within the dropdown menu.
  items: DropdownMenuItem[];
  // Specifies the visual size of the dropdown menu.
  size?: Size;
  // Defines the visual style or variant of the dropdown menu.
  variant?: Variant;
  // Determines the preferred position of the dropdown content relative to its trigger (e.g., 'top', 'bottom', 'left', 'right').
  side?: Position;
  // Specifies the alignment of the dropdown content relative to the trigger on the specified side (e.g., 'start', 'center', 'end').
  align?: Alignment;
  defaultOpen?: boolean;
  // Provides custom styles to be applied to different parts of the dropdown menu component.
  views?: DropdownMenuStyles;
  // Allows for additional, arbitrary props to be passed to the component, providing flexibility for custom attributes.
  [key: string]: any;
}
export interface DropdownMenuTriggerProps {
  // The React child elements that will serve as the dropdown menu's interactive trigger.
  children: React.ReactNode;
  // Provides custom styles to be applied to different parts of the dropdown menu trigger.
  views?: {
    // Custom styles specifically for the trigger's container element.
    container?: ViewProps;
  };
}
export interface DropdownMenuContentProps {
  // An array of data representing the items to be rendered within the dropdown menu content area.
  items: DropdownMenuItem[];
  // Determines the preferred position of the dropdown content relative to its trigger.
  side?: Position;
  // Specifies the alignment of the dropdown content relative to the trigger.
  align?: Alignment;
  // Provides custom styles to be applied to various elements within the dropdown menu content.
  views?: {
    // Custom styles for the main menu container element itself.
    menu?: ViewProps;
    // Custom styles for individual item elements within the menu.
    item?: ViewProps;
    // Custom styles for divider elements used to separate menu items.
    divider?: ViewProps;
    // Custom styles for icon elements displayed alongside menu items.
    icon?: ViewProps;
    // Custom styles for the indicator graphic that signifies a submenu.
    submenuIndicator?: ViewProps;
  };
}
export interface DropdownMenuItemProps {
  // The specific data object for a single dropdown menu item to be rendered.
  item: DropdownMenuItem;
  // Provides custom styles to be applied to different parts of the individual dropdown menu item.
  views?: {
    // Custom styles for the container of the individual menu item.
    item?: ViewProps;
    // Custom styles for the icon associated with the menu item.
    icon?: ViewProps;
    // Custom styles for the submenu indicator within the item, if present.
    submenuIndicator?: ViewProps;
  };
}
export interface DropdownMenuDividerProps {
  // Provides custom styles to be applied to the dropdown menu divider component.
  views?: {
    // Custom styles specifically for the divider line element.
    divider?: ViewProps;
  };
}
export interface DropdownMenuType extends React.FC<DropdownMenuProps> {
  // Represents the component responsible for rendering the dropdown's interactive trigger.
  Trigger: React.FC<DropdownMenuTriggerProps>;
  // Represents the component responsible for rendering the actual dropdown menu content.
  Content: React.FC<DropdownMenuContentProps>;
  // Represents the component responsible for rendering an individual item within the dropdown menu.
  Item: React.FC<DropdownMenuItemProps>;
  // Represents the component responsible for rendering a visual divider within the dropdown menu.
  Divider: React.FC<DropdownMenuDividerProps>;
}
