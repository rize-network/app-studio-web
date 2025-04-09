import { ViewProps } from 'app-studio';
import React from 'react';

export type CommandSize = 'sm' | 'md' | 'lg';
export type CommandVariant = 'default' | 'filled' | 'outline';

export interface CommandItem {
  /**
   * Unique identifier for the command
   */
  id: string;

  /**
   * Display name for the command
   */
  name: string;

  /**
   * Optional description for the command
   */
  description?: string;

  /**
   * Optional icon to display with the command
   */
  icon?: React.ReactNode;

  /**
   * Optional keyboard shortcut for the command (e.g., "⌘K", "Ctrl+P")
   */
  shortcut?: string;

  /**
   * Function to execute when the command is selected
   */
  onSelect: () => void;

  /**
   * Optional keywords for improved search
   */
  keywords?: string[];

  /**
   * Optional disabled state
   */
  disabled?: boolean;
}

export interface CommandGroup {
  /**
   * Unique identifier for the group
   */
  id: string;

  /**
   * Display name for the group
   */
  name: string;

  /**
   * Commands in this group
   */
  commands: CommandItem[];
}

export interface CommandStyles {
  /**
   * Styles for the command dialog container
   */
  container?: ViewProps;

  /**
   * Styles for the search input
   */
  searchInput?: {
    container?: ViewProps;
    input?: ViewProps;
  };

  /**
   * Styles for the command list container
   */
  list?: ViewProps;

  /**
   * Styles for the command group heading
   */
  groupHeading?: { container?: ViewProps; heading?: ViewProps };

  /**
   * Styles for each command item
   */
  item?: ViewProps;

  /**
   * Styles for the selected command item
   */
  selectedItem?: ViewProps;

  /**
   * Styles for the command item icon
   */
  icon?: ViewProps;

  /**
   * Styles for the command item content (name and description)
   */
  content?: ViewProps;

  /**
   * Styles for the command item name
   */
  name?: ViewProps;

  /**
   * Styles for the command item description
   */
  description?: ViewProps;

  /**
   * Styles for the command item shortcut
   */
  shortcut?: ViewProps;

  /**
   * Styles for the empty state
   */
  empty?: { container?: ViewProps };

  /**
   * Styles for the footer
   */
  footer?: ViewProps;
}
