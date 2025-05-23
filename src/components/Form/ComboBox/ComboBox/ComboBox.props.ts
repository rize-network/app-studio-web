import { ReactNode, Dispatch, SetStateAction } from 'react';
import { ComboBoxStyles } from './ComboBox.type';
import { InputProps } from 'app-studio';
// Declaration of the main properties for ComboBox component.
export interface ComboBoxProps extends Omit<InputProps, 'size'> {
  // Unique identifier for the ComboBox, required for accessibility.
  id: string;
  // Optional name attribute for the ComboBox, useful when submitted in a form.
  name?: string;
  // Array of ComboBox items that the user can select from.
  items: ComboBoxItem[];
  // Optional callback function triggered when an item is selected.
  onSelect?: (item: ComboBoxItem) => void;
  // Flag to enable search functionality within the ComboBox.
  searchEnabled?: boolean;
  // Optional element to display on the left side of the ComboBox.
  left?: ReactNode;
  // Optional element to display on the right side of the ComboBox.
  right?: ReactNode;
  // Optional label to describe the purpose of the ComboBox.
  label?: string;
  // Flag to show a tick mark next to selected items.
  showTick?: boolean;
  // Text to display when nothing has been selected in the ComboBox.
  placeholder?: string;
  // Optional custom styles to apply to the ComboBox.
  views?: ComboBoxStyles;
  // Placeholder text for the search input when search is enabled.
  searchPlaceholder?: string;
}
// Defines the shape of an item within the ComboBox.
export interface ComboBoxItem {
  // Visible text for the ComboBox item.
  label: string;
  // Underlying value associated with a ComboBox item.
  value: string;
  // Optional icon to display alongside the ComboBox item text.
  icon?: ReactNode;
}
// Interface defining the actions and state handling of the ComboBox.
export interface ComboBoxStateActions {
  // Array of items filtered based on the search query.
  filteredItems: ComboBoxItem[];
  // Function to update the state of filtered ComboBox items.
  setFilteredItems: Dispatch<SetStateAction<ComboBoxItem[]>>;
  // The currently selected item in the ComboBox.
  selectedItem: ComboBoxItem;
  // Function to set the currently selected item in the ComboBox.
  setSelectedItem: Dispatch<SetStateAction<ComboBoxItem>>;
  // Index of the item that is currently highlighted for keyboard navigation.
  highlightedIndex: number;
  // Function to set the index of the highlighted item.
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  // The text of the search query entered by the user.
  searchQuery: string;
  // Function to update the search query state.
  setSearchQuery: Dispatch<SetStateAction<string>>;
  // Boolean state to control the visibility of the dropdown list.
  isDropdownVisible: boolean;
  // Function to toggle the dropdown list's visibility.
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>;
}
export interface ComboBoxViewProps
  extends ComboBoxProps,
    ComboBoxStateActions {}
