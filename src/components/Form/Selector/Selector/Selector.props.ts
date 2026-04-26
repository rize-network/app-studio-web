import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { SelectorStyles, Shape, Size, Variant, Option } from './Selector.type';
export interface SelectorProps extends Omit<InputProps, 'size'> {
  // Unique identifier for the selector input.
  id?: string;
  // Indicates if the selector is in an error state.
  error?: boolean;
  // Name attribute for the selector input.
  name?: string;
  // Text label for the selector.
  label?: string;
  // Supplementary text displayed below the selector.
  helperText?: string;
  // Placeholder text shown when no option is selected.
  placeholder?: string;
  // Array of selectable options for the component.
  options: Option[];
  // Determines if multiple options can be selected.
  isMulti?: boolean;
  // Specifies if the selector is read-only.
  isReadOnly?: boolean;
  // Specifies if the selector is disabled.
  isDisabled?: boolean;
  // Callback function triggered when the selected value changes.
  onChange?: (value: any) => void;
  // Defines the visual shape of the selector (e.g., rounded, square).
  shape?: Shape;
  // Specifies the visual style or variant of the selector.
  variant?: Variant;
  // Custom styles to apply to different parts of the selector.
  views?: SelectorStyles;
  // Defines the size of the selector (e.g., small, medium, large).
  size?: Size;
  // Applies a shadow effect to the selector.
  shadow?: Shadow | Elevation | ViewProps;
  // Determines if the options dropdown should be scrollable.
  isScrollable?: boolean;
}
export interface SelectorViewProps extends SelectorProps {
  // The currently selected value(s) of the selector.
  value: string | Array<string>;
  // Function to update the selected value(s).
  setValue: Function;
  // Boolean indicating if the dropdown is hidden.
  hide: boolean;
  // Function to control the visibility of the dropdown.
  setHide: Function;
  // Boolean indicating if the selector is currently hovered.
  isHovered: boolean;
  // Function to update the hover state.
  setIsHovered: Function;
  // Boolean indicating if the selector is currently focused.
  isFocused: boolean;
  // Function to update the focus state.
  setIsFocused: Function;
}
export interface SelectorBoxProps {
  // Array of selectable options for the component.
  options: Option[];
  // The currently selected value(s) of the selector.
  value?: string | Array<string>;
  // Specifies if the selector box is disabled.
  isDisabled?: boolean;
  // Placeholder text shown when no option is selected.
  placeholder?: string;
  // Function to remove a selected option (for multi-select).
  removeOption?: Function;
  // Custom styles to apply to different parts of the selector box.
  views?: SelectorStyles;
  // Defines the size of the selector box.
  size?: Size;
}
export interface MultiSelectorProps extends Omit<InputProps, 'size'> {
  // The currently selected option in a multi-select context.
  option: string;
  // Function to remove a specific option from multi-selection.
  removeOption: Function;
  // Defines the size of the multi-selector item.
  size?: Size;
}
export interface ItemProps extends Omit<InputProps, 'size'> {
  // Callback function to be executed when an item is interacted with.
  callback?: Function;
  // The specific option data for the item.
  option: Option;
  // Defines the size of the item.
  size?: Size;
  // Custom styles to apply to the item.
  style?: SelectorStyles;
}
export interface HiddenSelectorProps extends Omit<InputProps, 'size'> {
  // Unique identifier for the hidden selector input.
  id?: string;
  // Name attribute for the hidden selector input.
  name?: string;
  // The currently selected value(s) for the hidden input.
  value: string | Array<string>;
  // Determines if multiple options can be selected, affecting how value is handled.
  isMulti?: boolean;
  // Specifies if the hidden selector is read-only.
  isReadOnly?: boolean;
  // Specifies if the hidden selector is disabled.
  isDisabled?: boolean;
  // Callback function triggered when the selected value changes.
  onChange?: (value: any) => void;
  // Array of available options, relevant for internal value handling.
  options: Option[];
}
export interface DropDownProps extends Omit<InputProps, 'size'> {
  // Defines the size of the dropdown.
  size?: Size;
  // Callback function to be executed when an option in the dropdown is selected.
  callback?: Function;
  // Array of options to display in the dropdown.
  options: Option[];
  // Custom styles to apply to different parts of the dropdown.
  views?: SelectorStyles;
}
