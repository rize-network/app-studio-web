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

// The ColorInputProps interface extends InputProps and customizes the ColorInput component, omitting the 'size' prop from InputProps.
export interface ColorInputProps extends Omit<InputProps, 'size'> {
  // Optional unique identifier for the ColorInput.
  id?: string;
  // Optional property for error handling within the ColorInput.
  error?: any;
  // Optional helper text that appears below the ColorInput.
  helperText?: string;
  // Optional name attribute for the ColorInput, useful for form submission.
  name?: string;
  // Optional label text for the ColorInput to indicate the field's purpose.
  label?: string;
  // Optional placeholder text shown inside the ColorInput when empty.
  placeholder?: string;
  // Optional flag to set the ColorInput as read-only.
  isReadOnly?: boolean;
  // Optional flag to indicate whether the ColorInput is disabled.
  isDisabled?: boolean;
  // Optional flag to autofocus the ColorInput when it mounts.
  isAutoFocus?: boolean;
  // Optional callback function that is called when the ColorInput value changes.
  onChange?: (value: string) => void;
  // Optional callback function that is called when the ColorInput loses focus.
  onBlur?: (value: any) => void;
  // Optional callback function that is called when the ColorInput is clicked.
  onClick?: () => void;
  // Optional callback function that is called when the ColorInput gains focus.
  onFocus?: () => void;
  // Optional Size enum to specify the size of the ColorInput.
  size?: Size;
  // Optional shadow property that could be of type Shadow, Elevation, or CSSProperties to give depth effect.
  shadow?: Shadow | Elevation | ViewProps;
  // Optional Shape enum to specify the shape of the ColorInput's corners.
  shape?: Shape;
  // Optional custom styles to apply to the ColorInput component.
  views?: ColorInputStyles;
  // Optional controlled value of the ColorInput, driving its current state.
  value?: string;
  // Optional default value for uncontrolled usage.
  defaultValue?: string;
  // Optional Variant enum to specify the variant of the ColorInput component.
  variant?: Variant;

  // Color-specific props
  // Optional array of predefined colors to show in the picker.
  predefinedColors?: PredefinedColor[];
  // Optional flag to show/hide custom color input.
  showCustomInput?: boolean;
  // Optional flag to show/hide recent colors.
  showRecentColors?: boolean;
  // Optional color format for the input value.
  colorFormat?: ColorFormat;
  // Optional maximum number of recent colors to store.
  maxRecentColors?: number;
  // Optional flag to close dropdown on color selection.
  closeOnSelect?: boolean;
  // Optional callback when color selection is complete.
  onChangeComplete?: (color: string) => void;
  // Optional callback when dropdown opens.
  onOpen?: () => void;
  // Optional callback when dropdown closes.
  onClose?: () => void;
}

// The ColorInputViewProps interface extends ColorInputProps and adds props specific to the view-layer customization of the component.
export interface ColorInputViewProps extends ColorInputProps {
  // Optional property indicating whether the ColorInput is currently focused.
  isFocused?: boolean;
  // Optional function to update the focused state of the ColorInput.
  setIsFocused?: Function;
  // Optional property indicating whether the ColorInput is currently hovered by the mouse cursor.
  isHovered?: boolean;
  // Optional function to update the hovered state of the ColorInput.
  setIsHovered?: Function;
  // Optional controlled value of the ColorInput, potentially used in a state management context.
  value?: string;
  // Optional function to programmatically set the value of the ColorInput.
  setValue?: Function;

  // State from useColorInputState
  isOpen?: boolean;
  selectedColor?: string;
  recentColors?: string[];
  customColor?: string;

  // Handlers from useColorInputState
  handleToggle?: () => void;
  handleColorSelect?: (color: string) => void;
  handleCustomColorChange?: (color: string) => void;
  handleCustomColorSubmit?: () => void;
  handleClose?: () => void;

  // Refs
  triggerRef?: React.RefObject<HTMLDivElement>;
  dropdownRef?: React.RefObject<HTMLDivElement>;
}
