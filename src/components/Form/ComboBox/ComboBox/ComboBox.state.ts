import { useState } from 'react';
import { ComboBoxItem, ComboBoxStateActions } from './ComboBox.props';
// Define a custom hook `useComboBoxState` to manage the state of a combo box component.
export const useComboBoxState = (
  // Receives `items` as an array of ComboBoxItem, and optional `placeholder` and `searchPlaceholder` strings.
  items: ComboBoxItem[],
  // Initializes `filteredItems` state with the full list of items provided.
  placeholder?: string,
  // Initializes `selectedItem` state with the provided placeholder or defaults to the first item if placeholder is not provided.
  searchPlaceholder?: string
  // Initializes `highlightedIndex` state to indicate which item is currently highlighted, starting at index 0.
): ComboBoxStateActions => {
  // Initializes `searchQuery` state to store the current search value, defaults to empty or `searchPlaceholder` if provided.
  const [filteredItems, setFilteredItems] = useState<ComboBoxItem[]>(items);
  // Initializes `isDropdownVisible` state to control the visibility of the dropdown list, initially set to false.
  const [selectedItem, setSelectedItem] = useState<ComboBoxItem>(
    // Returns an object containing states and setter functions to be used by the consuming component to manage the combo box's behavior and UI.
    placeholder ? { value: placeholder, label: placeholder } : items[0]
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchPlaceholder ?? ''
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  return {
    filteredItems,
    setFilteredItems,
    selectedItem,
    setSelectedItem,
    highlightedIndex,
    setHighlightedIndex,
    searchQuery,
    setSearchQuery,
    isDropdownVisible,
    setIsDropdownVisible,
  };
};
