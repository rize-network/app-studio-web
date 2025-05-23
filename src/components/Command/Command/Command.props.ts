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
  /**
   * Whether the command palette is open
   */
  open: boolean;

  /**
   * Callback when the open state changes
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Command groups to display
   */
  groups?: CommandGroup[];

  /**
   * Flat list of commands (alternative to groups)
   */
  commands?: CommandItem[];

  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Size of the command palette
   */
  size?: CommandSize;

  /**
   * Visual variant of the command palette
   */
  variant?: CommandVariant;

  /**
   * Custom filter function for searching commands
   */
  filter?: (value: string, item: CommandItem) => boolean;

  /**
   * Custom empty state when no commands match the search
   */
  emptyState?: React.ReactNode;

  /**
   * Custom footer content
   */
  footer?: React.ReactNode;

  /**
   * Custom styles for different parts of the command palette
   */
  views?: CommandStyles;

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface CommandInputProps {
  /**
   * Value of the search input
   */
  value: string;

  /**
   * Callback when the value changes
   */
  onValueChange: (value: string) => void;

  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Custom styles for the input
   */
  views?: {
    container?: ViewProps;
    input?: ViewProps;
  };
}

export interface CommandListProps {
  /**
   * Children to render in the list
   */
  children: React.ReactNode;

  /**
   * Custom styles for the list
   */
  views?: {
    container?: ViewProps;
  };
}

export interface CommandGroupProps {
  /**
   * Heading for the group
   */
  heading: string;

  /**
   * Children to render in the group
   */
  children: React.ReactNode;

  /**
   * Custom styles for the group
   */
  views?: {
    container?: ViewProps;
    heading?: ViewProps;
  };
}

export interface CommandItemProps {
  /**
   * Command item data
   */
  item: CommandItem;

  /**
   * Whether the item is selected
   */
  selected?: boolean;

  /**
   * Callback when the item is selected
   */
  onSelect?: () => void;

  /**
   * Custom styles for the item
   */
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
  /**
   * Children to render in the empty state
   */
  children?: React.ReactNode;

  /**
   * Custom styles for the empty state
   */
  views?: {
    container?: ViewProps;
  };
}

export interface CommandType extends React.FC<CommandProps> {
  /**
   * Input component for the command palette
   */
  Input: React.FC<CommandInputProps>;

  /**
   * List component for the command palette
   */
  List: React.FC<CommandListProps>;

  /**
   * Group component for the command palette
   */
  Group: React.FC<CommandGroupProps>;

  /**
   * Item component for the command palette
   */
  Item: React.FC<CommandItemProps>;

  /**
   * Empty component for the command palette
   */
  Empty: React.FC<CommandEmptyProps>;
}
