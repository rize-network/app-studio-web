import { ViewProps } from 'app-studio';
import { Variant, Shape, Size, IconPickerStyles } from './IconPicker.type';
import { IconName } from '../../Icon/Icon';
export interface IconPickerProps extends Omit<ViewProps, 'onChange'> {
  // Unique identifier for the IconPicker component.
  id?: string;
  // The name attribute for the input element, used for form submission.
  name?: string;
  // The label displayed for the IconPicker.
  label?: string;
  // Placeholder text displayed when no icon is selected.
  placeholder?: string;
  // Supplementary text displayed below the IconPicker for guidance.
  helperText?: string;
  // The currently selected icon's name (controlled component prop).
  value?: IconName;
  // The initial selected icon's name (uncontrolled component prop).
  defaultValue?: IconName;
  // Callback function triggered when an icon is selected or the value changes.
  onChange?: (iconName: IconName) => void;
  // Custom styles to apply to different parts of the IconPicker component.
  views?: IconPickerStyles;
  // Defines the overall size of the IconPicker component.
  size?: Size;
  // Defines the shape of the IconPicker's visual elements.
  shape?: Shape;
  // Defines the visual variant (e.g., filled, outlined) of the IconPicker.
  variant?: Variant;
  // Indicates if the IconPicker is in an error state, triggering error styling.
  error?: boolean;
  // If true, the IconPicker will be disabled and non-interactive.
  isDisabled?: boolean;
  // If true, the IconPicker will be read-only, preventing user input but allowing selection.
  isReadOnly?: boolean;
  // Determines whether the search input field is displayed within the dropdown.
  showSearch?: boolean;
  // Controls the open/closed state of the icon picker dropdown (controlled component prop).
  isOpen?: boolean;
  // Callback function triggered when the icon picker dropdown is opened.
  onOpen?: () => void;
  // Callback function triggered when the icon picker dropdown is closed.
  onClose?: () => void;
  // If true, the dropdown will close automatically after an icon is selected.
  closeOnSelect?: boolean;
}
export interface IconPickerViewProps extends IconPickerProps {
  // Indicates whether the dropdown is currently open.
  isOpen: boolean;
  // The name of the currently selected icon, used for display.
  selectedIcon?: IconName;
  // The current value of the search input field.
  searchQuery: string;
  // The array of icons filtered based on the current search query.
  filteredIcons: IconName[];
  // Function to toggle the open/closed state of the dropdown.
  handleToggle: () => void;
  // Function to call when an icon is selected from the list.
  handleIconSelect: (iconName: IconName) => void;
  // Function to call when the search query input changes.
  handleSearchChange: (query: string) => void;
  // Function to explicitly close the dropdown.
  handleClose: () => void;
  // Ref object attached to the component that triggers the dropdown.
  triggerRef: React.RefObject<HTMLDivElement>;
  // Ref object attached to the dropdown container element.
  dropdownRef: React.RefObject<HTMLDivElement>;
}
