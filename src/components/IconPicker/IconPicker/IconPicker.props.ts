import { ViewProps } from 'app-studio';
import { Variant, Shape, Size, IconPickerStyles } from './IconPicker.type';
import { IconName } from '../../Icon/Icon';

export interface IconPickerProps extends Omit<ViewProps, 'onChange'> {
  // Basic props
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;

  // Value and change handling
  value?: IconName;
  defaultValue?: IconName;
  onChange?: (iconName: IconName) => void;

  // Styling
  views?: IconPickerStyles;
  size?: Size;
  shape?: Shape;
  variant?: Variant;

  // State
  error?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;

  // Options
  showSearch?: boolean;

  // Dropdown behavior
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnSelect?: boolean;
}

export interface IconPickerViewProps extends IconPickerProps {
  // State
  isOpen: boolean;
  selectedIcon?: IconName;
  searchQuery: string;
  filteredIcons: IconName[];

  // Handlers
  handleToggle: () => void;
  handleIconSelect: (iconName: IconName) => void;
  handleSearchChange: (query: string) => void;
  handleClose: () => void;

  // Refs
  triggerRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}
