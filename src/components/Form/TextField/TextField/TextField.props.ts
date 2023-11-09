import React, { CSSProperties } from 'react';
import { Shadow } from 'app-studio';
import { Elevation } from 'src/utils/elevation';

import { Shape, Size, TextFieldStyles, Variant } from './TextField.type';

export interface TextFieldProps {
  /**
   * The input field identifier.
   */
  id?: string;
  /**
   * Specifies whether the input field should display an error state.
   */
  error?: any;
  /**
   * Provides additional information about the input field.
   */
  helperText?: string;
  /**
   * The name of the input field.
   */
  name?: string;
  /**
   * Displays a label above the user input.
   */
  label?: string;
  /**
   * Changes the label and border color of the input field.
   */
  colorScheme?: string;
  /**
   * The left child to include in the field.
   */
  leftChild?: React.ReactNode;
  /**
   * The right child to include in the field.
   */
  rightChild?: React.ReactNode;
  /**
   * Placeholder text to display in the input field until the user enters text.
   */
  placeholder?: string;
  /**
   * Specifies whether the input field is read-only and cannot be edited.
   */
  isReadOnly?: boolean;
  /**
   * Specifies whether the input field is disabled and cannot be interacted with.
   */
  isDisabled?: boolean;
  /**
   * Specifies whether a clear button should be added to the input field that clears its value when clicked.
   */
  isClearable?: boolean;
  /**
   * Specifies whether the input field should be automatically focused.
   */
  isAutoFocus?: boolean;
  /**
   * Handler function called when the input field value changes.
   */
  onChange?: (value: any) => void;
  /**
   * Handler function called when the input field value changes for iOS and Android.
   */
  onChangeText?: (value: string) => void;
  /**
   * Callback function triggered when the field loses focus.
   */
  onBlur?: (value: any) => void;
  /**
   * Event called when the input field is clicked/pressed.
   */
  onClick?: () => void;
  /**
   * Callback function called when the text input receives focus.
   */
  onFocus?: () => void;
  /**
   * Sets the text size and padding of the input field.
   */
  size?: Size;
  /**
   * Applies a shadow effect to the input field.
   */
  shadow?: Shadow | Elevation | CSSProperties;
  /**
   * Changes the shape or outline of the input field.
   */
  shape?: Shape;
  /**
   * CSS styles for the input container and field.
   */
  styles?: TextFieldStyles;
  /**
   * The default value of the input field.
   */
  value?: string;
  /**
   * Changes the style variant of the input field.
   */
  variant?: Variant;
  /**
   * Additional properties for customization and extension.
   */
  [x: string]: any;
}

export interface TextFieldViewProps extends TextFieldProps {
  /** The hint text for the text field */
  hint?: string;

  /** Function to set the hint text for the text field */
  setHint?: Function;

  /** Indicates whether the text field is currently focused or not */
  isFocused?: boolean;

  /** Function to set the focused state of the text field */
  setIsFocused?: Function;

  /** Indicates whether the mouse pointer is currently hovering over the text field or not */
  isHovered?: boolean;

  /** Function to set the hovered state of the text field */
  setIsHovered?: Function;

  /** The current value of the text field */
  inputValue?: string;

  /** Function to set the value of the text field */
  setInputValue?: Function;
}
