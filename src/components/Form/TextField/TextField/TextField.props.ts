import React, { CSSProperties } from 'react';
import { InputProps, Shadow } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import { Shape, Size, TextFieldStyles, Variant } from './TextField.type';
// The TextFieldProps interface extends InputProps and customizes the TextField component, omitting the 'size' prop from InputProps.
export interface TextFieldProps extends Omit<InputProps, 'size'> {
  // Optional unique identifier for the TextField.
  id?: string;
  // Optional property for error handling within the TextField.
  error?: any;
  // Optional helper text that appears below the TextField.
  helperText?: string;
  // Optional name attribute for the TextField, useful for form submission.
  name?: string;
  // Optional label text for the TextField to indicate the field's purpose.
  label?: string;
  // Optional property to specify the color scheme of the TextField.
  colorScheme?: string;
  // Optional React node to be rendered on the left side of the TextField.
  left?: React.ReactNode;
  // Optional React node to be rendered on the right side of the TextField.
  right?: React.ReactNode;
  // Optional placeholder text shown inside the TextField when empty.
  placeholder?: string;
  // Optional flag to set the TextField as read-only.
  isReadOnly?: boolean;
  // Optional flag to indicate whether the TextField is disabled.
  isDisabled?: boolean;
  // Optional flag that when true allows the TextField to be cleared.
  isClearable?: boolean;
  // Optional flag to autofocus the TextField when it mounts.
  isAutoFocus?: boolean;
  // Optional callback function that is called when the TextField value changes.
  onChange?: (value: any) => void;
  // Optional callback function that is called when the text in the TextField changes.
  onChangeText?: (value: string) => void;
  // Optional callback function that is called when the TextField loses focus.
  onBlur?: (value: any) => void;
  // Optional callback function that is called when the TextField is clicked.
  onClick?: () => void;
  // Optional callback function that is called when the TextField gains focus.
  onFocus?: () => void;
  // Optional Size enum to specify the size of the TextField.
  size?: Size;
  // Optional shadow property that could be of type Shadow, Elevation, or CSSProperties to give depth effect.
  shadow?: Shadow | Elevation | CSSProperties;
  // Optional Shape enum to specify the shape of the TextField's corners.
  shape?: Shape;
  // Optional custom styles to apply to the TextField component.
  styles?: TextFieldStyles;
  // Optional controlled value of the TextField, driving its current state.
  value?: string;
  // Optional Variant enum to specify the variant of the TextField component.
  variant?: Variant;
}
// The TextFieldViewProps interface extends TextFieldProps and adds props specific to the view-layer customization of the component.
export interface TextFieldViewProps extends TextFieldProps {
  // Optional property to give hints to the user about how to fill in the TextField.
  hint?: string;
  // Optional function that allows changing the hint text.
  setHint?: Function;
  // Optional property indicating whether the TextField is currently focused.
  isFocused?: boolean;
  // Optional function to update the focused state of the TextField.
  setIsFocused?: Function;
  // Optional property indicating whether the TextField is currently hovered by the mouse cursor.
  isHovered?: boolean;
  // Optional function to update the hovered state of the TextField.
  setIsHovered?: Function;
  // Optional controlled value of the TextField, potentially used in a state management context.
  value?: string;
  // Optional function to programmatically set the value of the TextField.
  setValue?: Function;
}
