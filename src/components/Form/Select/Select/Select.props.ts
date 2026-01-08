import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { SelectStyles, Shape, Size, Variant, Option } from './Select.type';
// Defines the interface for Select component properties, extending from InputProps but omitting 'size'
export interface SelectProps extends Omit<InputProps, 'size'> {
  // Optional string identifier for the select element
  id?: string;
  // Flag to indicate if the select has an error state
  error?: boolean;
  // Name attribute for the select element, useful for form submission
  name?: string;
  // Label text associated with the select element
  label?: string;
  // Helper text that appears below the select box
  helperText?: string;
  // Placeholder text shown when the select is empty
  placeholder?: string;
  // Array of options that the user can choose from
  options: Option[];
  // Boolean to allow multi-selection
  isMulti?: boolean;
  // Boolean to set the select as read-only, preventing user modification
  isReadOnly?: boolean;
  // Boolean to disable the select element
  isDisabled?: boolean;
  // Function that handles the change event when the selected option(s) change
  onChange?: (value: any) => void;
  // Determines the overall shape of the select box, e.g., rounded or square edges
  shape?: Shape;
  // Defines the styling variant for the select component
  variant?: Variant;
  // Custom styles that can be applied to the select component
  views?: SelectStyles;
  // Defines the size of the component
  size?: Size;
  // Determines the shadow property of the select component
  shadow?: Shadow | Elevation | ViewProps;
  // Boolean to control whether the select options are scrollable
  isScrollable?: boolean;
}
export interface SelectViewProps extends SelectProps {
  value: string | Array<string>;
  setValue: Function;
  hide: boolean;
  setHide: Function;
  isHovered: boolean;
  setIsHovered: Function;
  isFocused: boolean;
  setIsFocused: Function;
}
export interface SelectBoxProps {
  options: Option[];
  value?: string | Array<string>;
  isDisabled?: boolean;
  placeholder?: string;
  removeOption?: Function;
  views?: SelectStyles;
  size?: Size;
}
export interface MultiSelectProps extends Omit<InputProps, 'size'> {
  option: string;
  removeOption: Function;
  size?: Size;
}
export interface ItemProps extends Omit<InputProps, 'size'> {
  callback?: Function;
  option: Option;
  size?: Size;
  style?: SelectStyles;
}
export interface HiddenSelectProps extends Omit<InputProps, 'size'> {
  id?: string;
  name?: string;
  value: string | Array<string>;
  isMulti?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  onChange?: (value: any) => void;
  options: Option[];
}
export interface DropDownProps extends Omit<InputProps, 'size'> {
  size?: Size;
  callback?: Function;
  options: Option[];
  views?: SelectStyles;
}
