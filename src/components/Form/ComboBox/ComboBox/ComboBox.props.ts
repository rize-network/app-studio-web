import { ReactNode, Dispatch, SetStateAction } from 'react';
import { ComboBoxStyles } from './ComboBox.type';
export interface ComboBoxProps {
  id: string;
  // Represents the properties that can be passed to the ComboBox component.
  name?: string;
  // Unique identifier for the ComboBox, used to differentiate it from others in a form.
  items: ComboBoxItem[];
  // Optional name property, usually used when the ComboBox is part of a form.
  onSelect?: (item: ComboBoxItem) => void;
  // List of items that the ComboBox will display as options to choose from.
  searchEnabled?: boolean;
  // Optional callback function that is called when an item is selected.
  left?: ReactNode;
  // Boolean flag to enable or disable the search functionality within the ComboBox.
  right?: ReactNode;
  // Optional ReactNode to be displayed on the left side of the ComboBox.
  label?: string;
  // Optional ReactNode to be displayed on the right side of the ComboBox.
  showTick?: boolean;
  // Optional label to describe the purpose of the ComboBox to the user.
  placeholder?: string;
  // Boolean flag to show or hide a tick mark next to selected items.
  styles?: ComboBoxStyles;
  // Placeholder text to be shown when nothing is selected in the ComboBox.
  searchPlaceholder?: string;
  // Optional object to override default ComboBox styles.
  [x: string]: any;
  // Placeholder for the search input when the search is enabled.
}
// Allows the ComboBox to accept additional properties not explicitly defined in the interface.
export interface ComboBoxItem {
  label: string;
  value: string;
  // Defines each item's structure within the ComboBox.
  icon?: ReactNode;
  // Visible label for the ComboBox item, displayed in the list of options.
}
// Value that represents the ComboBox item and is typically sent to the server upon form submission.
export interface ComboBoxStateActions {
  // Optional icon to be displayed next to the item label within the ComboBox.
  filteredItems: ComboBoxItem[];
  setFilteredItems: Dispatch<SetStateAction<ComboBoxItem[]>>;
  selectedItem: ComboBoxItem;
  // Holds state actions for managing ComboBox state, like filtering, selection, and dropdown visibility.
  setSelectedItem: Dispatch<SetStateAction<ComboBoxItem>>;
  // Array of ComboBox items that match the current search query - used when search is enabled.
  highlightedIndex: number;
  // Function to update the list of filtered items displayed in the dropdown.
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  // Currently selected item from the ComboBox options.
  searchQuery: string;
  // Function to update the currently selected item.
  setSearchQuery: Dispatch<SetStateAction<string>>;
  // Index of the highlighted item in the dropdown list, useful for keyboard navigation.
  isDropdownVisible: boolean;
  // Function to update the highlighted item's index.
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>;
  // Current search query string entered by the user, used to filter the ComboBox list.
}
// Function to update the current search query.
export interface ComboBoxViewProps extends ComboBoxProps, ComboBoxStateActions {
  // Boolean value that controls the visibility of the ComboBox dropdown list.
}
// Function to set the visibility of the dropdown list.

// Combines both ComboBoxProps and ComboBoxStateActions to represent props required by the view components.
