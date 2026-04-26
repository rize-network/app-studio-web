import { ViewProps } from 'app-studio';
import React from 'react';
// Defines the available size options for the Command component.
export type CommandSize = 'sm' | 'md' | 'lg';
// Defines the available visual variants for the Command component.
export type CommandVariant = 'default' | 'filled' | 'outline';
// Interface for an individual command item within the Command palette.
export interface CommandItem {
  // A unique identifier for the command item.
  id: string;
  // The display name of the command item.
  name: string;
  // Optional descriptive text for the command item.
  description?: string;
  // Optional React node to display as an icon next to the command item.
  icon?: React.ReactNode;
  // Optional string representing a keyboard shortcut for the command item.
  shortcut?: string;
  // A callback function to be executed when the command item is selected.
  onSelect: () => void;
  // Optional array of keywords to aid in searching and filtering command items.
  keywords?: string[];
  // A boolean indicating whether the command item is disabled.
  disabled?: boolean;
}
// Interface for a group of related command items.
export interface CommandGroup {
  // A unique identifier for the command group.
  id: string;
  // The display name of the command group.
  name: string;
  // An array of `CommandItem` objects belonging to this group.
  commands: CommandItem[];
}
// Interface for customizing the visual styles of various sub-components within the Command component.
export interface CommandStyles {
  // Styles for the main container of the Command component.
  container?: ViewProps;
  // Styles for the search input section.
  searchInput?: {
    // Styles for the container of the search input.
    container?: ViewProps;
    // Styles for the search input field itself.
    input?: ViewProps;
  };
  // Styles for the list container that holds command items.
  list?: ViewProps;
  // Styles for the heading of a command group.
  groupHeading?: { container?: ViewProps; heading?: ViewProps };
  // Styles for an individual command item.
  item?: ViewProps;
  // Styles for a command item when it is selected or active.
  selectedItem?: ViewProps;
  // Styles for the icon displayed within a command item.
  icon?: ViewProps;
  // Styles for the content area of a command item (e.g., name and description).
  content?: ViewProps;
  // Styles for the name text within a command item.
  name?: ViewProps;
  // Styles for the description text within a command item.
  description?: ViewProps;
  // Styles for the shortcut text within a command item.
  shortcut?: ViewProps;
  // Styles for the container displayed when no search results are found.
  empty?: { container?: ViewProps };
  // Styles for the footer section of the Command component.
  footer?: ViewProps;
}
