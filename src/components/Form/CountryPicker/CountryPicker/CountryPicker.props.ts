import { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import {
  Country,
  CountryPickerStyles,
  Shape,
  Size,
  Variant,
} from './CountryPicker.type';
// Defines properties for CountryPicker excluding 'size' from InputProps for customization
export interface CountryPickerProps extends Omit<InputProps, 'size'> {
// Optional ID for the CountryPicker input
  id?: string;
// Optional error flag to indicate validation state
  error?: boolean;
// Optional name attribute for the CountryPicker input
  name?: string;
// Optional label text for the CountryPicker input
  label?: string;
// Optional color scheme for styling
  colorScheme?: string;
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
// Optional blur handler function
  onBlur?: (value: any) => void;
// Optional change handler function
  onChange?: (value: any) => void;
// Optional styles object specific to CountryPicker
  styles?: CountryPickerStyles;
// Optional size of the CountryPicker for visual styles
  size?: Size;
// Value to be used as the current selection
  value?: string | number;
// Variant for different visual types of CountryPicker
  variant?: Variant;
// Shadow or Elevation styles for visual depth and perspective
  shadow?: Shadow | Elevation | CSSProperties;
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
// Setter function for selected item
  setSelected?: (selected: string) => void;
// Flag for toggling visibility
  hide?: boolean;
// Setter function for visibility
  setHide?: (hide: boolean) => void;
// Array of new options for dropdown list
  newOptions?: Array<Country>;
// Setter function for new options
  setNewOptions?: (newOptions: Array<Country>) => void;
}
// Defines properties for DropDown excluding 'size' from InputProps for customization
export interface DropDownProps extends Omit<InputProps, 'size'> {
// Optional size of the dropdown for visual styles
  size?: Size;
// Callback function for dropdown actions
  callback?: Function;
// Options array to populate the dropdown
  options: Array<Country>;
// Optional styles object specific to dropdown
  styles?: CountryPickerStyles;
}
// Defines properties for DropDownItem excluding 'size' from InputProps for customization
export interface DropDownItemProps extends Omit<InputProps, 'size'> {
// Callback function for dropdown item actions
  callback?: Function;
// The option value for the dropdown item
  option: string;
// Optional size of the dropdown item for visual styles
  size?: Size;
// Optional styles object specific to dropdown item
  styles?: CountryPickerStyles;
}
