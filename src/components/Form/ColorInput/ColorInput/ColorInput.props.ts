import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import {
  Shape,
  Size,
  ColorInputStyles,
  Variant,
  PredefinedColor,
  ColorFormat,
} from './ColorInput.type';
// Defines the public properties available for the ColorInput component, extending standard input properties while omitting the 'size' property to use a custom one.
export interface ColorInputProps extends Omit<InputProps, 'size'> {
  // An optional unique identifier for the input element.
  id?: string;
  // An optional error object or message to display validation feedback.
  error?: any;
  // An optional text displayed below the input to provide additional guidance or error messages.
  helperText?: string;
  // The name of the input element, typically used for form submission.
  name?: string;
  // The label text displayed for the color input.
  label?: string;
  // The placeholder text displayed in the input field when it's empty.
  placeholder?: string;
  // A boolean indicating whether the input field is read-only.
  isReadOnly?: boolean;
  // A boolean indicating whether the input field is disabled.
  isDisabled?: boolean;
  // A boolean indicating whether the input field should automatically gain focus on mount.
  isAutoFocus?: boolean;
  // Callback function triggered when the input's value changes.
  onChange?: (value: string) => void;
  // Callback function triggered when the input loses focus.
  onBlur?: (value: any) => void;
  // Callback function triggered when the input is clicked.
  onClick?: () => void;
  // Callback function triggered when the input gains focus.
  onFocus?: () => void;
  // The size of the color input component, utilizing a custom `Size` type.
  size?: Size;
  // Defines the shadow style for the color input, accepting various shadow types.
  shadow?: Shadow | Elevation | ViewProps;
  // Defines the shape of the color input component.
  shape?: Shape;
  // Custom styles to override or extend the default appearance of the ColorInput.
  views?: ColorInputStyles;
  // The current value of the color input.
  value?: string;
  // The initial default value of the color input.
  defaultValue?: string;
  // The visual variant style of the color input.
  variant?: Variant;
  // An array of predefined colors for quick selection.
  predefinedColors?: PredefinedColor[];
  // A boolean to control the visibility of a custom color input field within the picker.
  showCustomInput?: boolean;
  // A boolean to control the visibility of recently used colors in the picker.
  showRecentColors?: boolean;
  // The format in which the color value should be represented (e.g., hex, rgb).
  colorFormat?: ColorFormat;
  // The maximum number of recent colors to store and display.
  maxRecentColors?: number;
  // A boolean indicating whether the color picker should close automatically after a color is selected.
  closeOnSelect?: boolean;
  // Callback function triggered when the color selection process is completed (e.g., picker closes or final selection).
  onChangeComplete?: (color: string) => void;
  // Callback function triggered when the color picker dropdown opens.
  onOpen?: () => void;
  // Callback function triggered when the color picker dropdown closes.
  onClose?: () => void;
}
// Extends `ColorInputProps` to include additional properties used internally by the view component, often related to state management and UI interactions.
export interface ColorInputViewProps extends ColorInputProps {
  // A boolean indicating if the input is currently focused.
  isFocused?: boolean;
  // Setter function to update the `isFocused` state.
  setIsFocused?: Function;
  // A boolean indicating if the input is currently hovered.
  isHovered?: boolean;
  // Setter function to update the `isHovered` state.
  setIsHovered?: Function;
  // The current value displayed in the input field.
  value?: string;
  // Setter function to update the input's `value` state.
  setValue?: Function;
  // A boolean indicating if the color picker dropdown is currently open.
  isOpen?: boolean;
  // The currently selected color within the picker.
  selectedColor?: string;
  // An array of recently used colors.
  recentColors?: string[];
  // The value of the custom color input field.
  customColor?: string;
  // Function to toggle the visibility of the color picker dropdown.
  handleToggle?: () => void;
  // Function called when a color is selected from the picker.
  handleColorSelect?: (color: string) => void;
  // Function to handle changes in the custom color input field.
  handleCustomColorChange?: (color: string) => void;
  // Function to handle the submission of a custom color.
  handleCustomColorSubmit?: () => void;
  // Function to handle closing the color picker dropdown.
  handleClose?: () => void;
  // Ref object for the DOM element that triggers the color picker dropdown.
  triggerRef?: React.RefObject<HTMLDivElement>;
  // Ref object for the DOM element representing the color picker dropdown itself.
  dropdownRef?: React.RefObject<HTMLDivElement>;
}
