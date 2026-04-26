import { ViewProps } from 'app-studio';
import React from 'react';
import {
  CommandGroup,
  CommandItem,
  CommandSize,
  CommandStyles,
  CommandVariant,
} from './Command.type';
export interface CommandProps {
  // Determines whether the Command component dropdown is currently open.
  open: boolean;
  // Callback function triggered when the open state of the Command component changes.
  onOpenChange: (open: boolean) => void;
  // Optional array of command groups to display within the component.
  groups?: CommandGroup[];
  // Optional array of individual command items to display.
  commands?: CommandItem[];
  // Placeholder text for the command input field.
  placeholder?: string;
  // Specifies the visual size of the Command component.
  size?: CommandSize;
  // Defines the visual variant or style of the Command component.
  variant?: CommandVariant;
  // Custom filter function to apply to command items based on the input value.
  filter?: (value: string, item: CommandItem) => boolean;
  // Content to display when there are no command results.
  emptyState?: React.ReactNode;
  // Content to display at the bottom of the Command component, typically for actions or information.
  footer?: React.ReactNode;
  // Customizable styling options for various parts of the Command component.
  views?: CommandStyles;
  // Allows for additional, flexible properties to be passed to the component.
  [key: string]: any;
}
export interface CommandInputProps {
  // The current value of the input field.
  value: string;
  // Callback function triggered when the input value changes.
  onValueChange: (value: string) => void;
  // Placeholder text for the command input.
  placeholder?: string;
  // Customizable styling options for the input container and input element.
  views?: {
    container?: ViewProps;
    input?: ViewProps;
  };
}
export interface CommandListProps {
  // React nodes to be rendered inside the command list.
  children: React.ReactNode;
  // Customizable styling options for the list container.
  views?: {
    container?: ViewProps;
  };
}
export interface CommandGroupProps {
  // The heading text for the command group.
  heading: string;
  // React nodes to be rendered inside the command group, typically CommandItem components.
  children: React.ReactNode;
  // Customizable styling options for the group container and heading element.
  views?: {
    container?: ViewProps;
    heading?: ViewProps;
  };
}
export interface CommandItemProps {
  // The command item data object to be displayed.
  item: CommandItem;
  // Indicates whether the command item is currently selected.
  selected?: boolean;
  // Callback function triggered when the command item is selected.
  onSelect?: () => void;
  // Customizable styling options for the item container, icon, content, name, description, and shortcut elements.
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
    content?: ViewProps;
    name?: ViewProps;
    description?: ViewProps;
    shortcut?: ViewProps;
  };
}
export interface CommandEmptyProps {
  // React nodes to be displayed as the empty state content.
  children?: React.ReactNode;
  // Customizable styling options for the empty state container.
  views?: {
    container?: ViewProps;
  };
}
export interface CommandType extends React.FC<CommandProps> {
  // The Input subcomponent of the Command component.
  Input: React.FC<CommandInputProps>;
  // The List subcomponent of the Command component.
  List: React.FC<CommandListProps>;
  // The Group subcomponent of the Command component.
  Group: React.FC<CommandGroupProps>;
  // The Item subcomponent of the Command component.
  Item: React.FC<CommandItemProps>;
  // The Empty subcomponent of the Command component.
  Empty: React.FC<CommandEmptyProps>;
}
