import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import {
  Country,
  CountryPickerStyles,
  Shape,
  Size,
  Variant,
} from './CountryPicker.type';
// Defines properties for CountryPicker excluding 'size' from InputProps for customization
export interface CountryPickerProps
  extends Omit<InputProps, 'size' | 'shadow' | 'value' | 'onChange'> {
  // Optional ID for the CountryPicker input
  id?: string;
  // Optional error flag to indicate validation state
  error?: boolean;
  // Optional name attribute for the CountryPicker input
  name?: string;
  // Optional label text for the CountryPicker input
  label?: string;
  // Optional helper text for guiding the user
  helperText?: string;
  // Optional placeholder text for the CountryPicker input
  placeholder?: string;
  // Optional shape of the CountryPicker for visual styles
  shape?: Shape;
  // Flag to auto-focus the CountryPicker on render
  isAutoFocus?: boolean;
  // Flag to mark the CountryPicker as read-only
  isReadOnly?: boolean;
  // Flag to disable the CountryPicker input
  isDisabled?: boolean;
  // Called on blur with the blur **event**, not the value.
  onBlur?: (event: any) => void;
  /**
   * Called with the country name the field now holds — either the option that
   * was picked or what the user has typed so far. Never the DOM event, so
   * `e.target.value` is a compile error.
   */
  onChange?: (value: string) => void;
  // Optional styles object specific to CountryPicker
  views?: CountryPickerStyles;
  // Optional size of the CountryPicker for visual styles
  size?: Size;
  // Value to be used as the current selection (country code string, e.g. 'US').
  value?: string;
  // Variant for different visual types of CountryPicker
  variant?: Variant;
  // Shadow or Elevation styles for visual depth and perspective
  shadow?: Shadow | Elevation | ViewProps;
}
// Includes all CountryPickerProps and properties specific to the view
export interface CountryPickerViewProps extends CountryPickerProps {
  // Flag for hover state
  isHovered?: boolean;
  // Setter function for hover state
  setIsHovered?: (hovered: boolean) => void;
  // Flag for focus state
  isFocused?: boolean;
  // Setter function for focus state
  setIsFocused?: (focused: boolean) => void;
  // Selected item's value
  selected?: string;
  // Flag for toggling visibility
  hide?: boolean;
  // Setter function for visibility
  setHide?: (hide: boolean) => void;
  // Array of new options for dropdown list
  newOptions?: Array<Country>;
  // Setter function for new options
  setNewOptions?: (newOptions: Array<Country>) => void;
  // Current selected value managed by the state hook
  value?: string;
  // Setter for the value managed by the state hook
  setValue?: (value: string) => void;
  // Theme mode override (light/dark)
}
// Defines properties for DropDown excluding 'size' from InputProps for customization
export interface CountryPickerDropDownProps extends Omit<InputProps, 'size'> {
  // Optional size of the dropdown for visual styles
  size?: Size;
  // Callback function for dropdown actions
  callback?: (option: string) => void;
  // Options array to populate the dropdown
  options?: Array<Country>;
  // Name of the currently selected option, used to mark `aria-selected`
  selectedOption?: string;
  // Index of the keyboard-highlighted option (-1 for none)
  highlightedIndex?: number;
  // Optional styles object specific to dropdown
  views?: CountryPickerStyles;
}
// Defines properties for DropDownItem excluding 'size' from InputProps for customization
export interface DropDownItemProps extends Omit<InputProps, 'size'> {
  // Callback function for dropdown item actions
  callback?: (option: string) => void;
  // The option value for the dropdown item
  option?: string;
  // Whether this option matches the current field value (`aria-selected`)
  isSelected?: boolean;
  // Whether this option currently holds the keyboard highlight
  isHighlighted?: boolean;
  // Optional size of the dropdown item for visual styles
  size?: Size;
  // Optional styles object specific to dropdown item
  views?: CountryPickerStyles;
}
