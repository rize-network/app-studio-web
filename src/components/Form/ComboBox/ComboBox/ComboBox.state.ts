// Import the necessary types
import { useState } from 'react';
import { ComboBoxItem, ComboBoxStateActions } from './ComboBox.props';

// Define the useComboBoxState hook properly with types
export const useComboBoxState = (
  items: ComboBoxItem[],
  placeholder?: string,
  searchPlaceholder?: string
): ComboBoxStateActions => {
  const [filteredItems, setFilteredItems] = useState<ComboBoxItem[]>(items);
  const [selectedItem, setSelectedItem] = useState<ComboBoxItem>(
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
