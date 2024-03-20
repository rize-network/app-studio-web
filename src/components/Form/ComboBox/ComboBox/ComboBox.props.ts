import { ReactNode, Dispatch, SetStateAction } from 'react';
import { ComboBoxStyles } from './ComboBox.type';

export interface ComboBoxProps {
  id: string;
  name?: string;
  items: ComboBoxItem[];
  onSelect?: (item: ComboBoxItem) => void;
  searchEnabled?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  label?: string;
  showTick?: boolean;
  placeholder?: string;
  styles?: ComboBoxStyles;
  searchPlaceholder?: string;
  [x: string]: any;
}

export interface ComboBoxItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface ComboBoxStateActions {
  filteredItems: ComboBoxItem[];
  setFilteredItems: Dispatch<SetStateAction<ComboBoxItem[]>>;
  selectedItem: ComboBoxItem;
  setSelectedItem: Dispatch<SetStateAction<ComboBoxItem>>;
  highlightedIndex: number;
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isDropdownVisible: boolean;
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>;
}

export interface ComboBoxViewProps extends ComboBoxProps, ComboBoxStateActions {
  // You can add additional properties here if needed
}
