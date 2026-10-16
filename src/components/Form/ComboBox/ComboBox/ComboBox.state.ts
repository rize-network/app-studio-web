import { useState } from 'react';
import { ComboBoxItem, ComboBoxStateActions } from './ComboBox.props';
// Defines the useComboBoxState hook with parameters for the list of items and optional placeholder texts.
export const useComboBoxState = (
  items: ComboBoxItem[],
  placeholder?: string,
  searchPlaceholder?: string
): ComboBoxStateActions => {
  // State hook for filtered items with initial state set to the items passed to the hook.
  const [filteredItems, setFilteredItems] = useState<ComboBoxItem[]>(items);
  // State hook to track the selected item with an initial state based on the placeholder or the first item.
  const [selectedItem, setSelectedItem] = useState<ComboBoxItem>(
    placeholder ? { value: placeholder, label: placeholder } : items[0]
  );
  // State hook for multi-select mode: array of selected items.
  const [selectedItems, setSelectedItems] = useState<ComboBoxItem[]>([]);
  // State hook for highlighted index in the dropdown list, initialized to 0.
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  // State hook for search query with an initial state based on the searchPlaceholder or empty string.
  const [searchQuery, setSearchQuery] = useState<string>(
    searchPlaceholder ?? ''
  );
  // State hook to manage dropdown visibility, starts as false (hidden).
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // Start of object returned by the useComboBoxState hook containing all state and state updater functions.
  return {
    filteredItems,
    setFilteredItems,
    selectedItem,
    setSelectedItem,
    selectedItems,
    setSelectedItems,
    highlightedIndex,
    setHighlightedIndex,
    searchQuery,
    setSearchQuery,
    isDropdownVisible,
    setIsDropdownVisible,
    // End of the return statement of the useComboBoxState hook, encapsulating all the state and setState actions for ComboBox.
  };
};
