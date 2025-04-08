import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../utils/elevation';
import { Shape, Size, Variant } from '../../Layout/configs/Input.type';
import { OTPInputStyles } from './OTPInput.type';

export interface OTPInputProps extends Omit<InputProps, 'size'> {
  /**
   * Unique identifier for the OTP input
   */
  id?: string;

  /**
   * Error state for validation
   */
  error?: any;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Number of OTP input fields
   */
  length?: number;

  /**
   * Placeholder text for each input field
   */
  placeholder?: string;

  /**
   * Whether the input is read-only
   */
  isReadOnly?: boolean;

  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the first input should be auto-focused
   */
  isAutoFocus?: boolean;

  /**
   * Callback when the OTP value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback when the OTP text changes
   */
  onChangeText?: (value: string) => void;

  /**
   * Callback when an input field loses focus
   */
  onBlur?: (value: any) => void;

  /**
   * Callback when an input field is clicked
   */
  onClick?: () => void;

  /**
   * Callback when an input field gains focus
   */
  onFocus?: () => void;

  /**
   * Size of the input fields
   */
  size?: Size;

  /**
   * Shadow effect for the input fields
   */
  shadow?: Shadow | Elevation | ViewProps;

  /**
   * Shape of the input fields
   */
  shape?: Shape;

  /**
   * Variant of the input fields
   */
  variant?: Variant;

  /**
   * Gap between input fields
   */
  gap?: number;

  /**
   * Custom styling for the component
   */
  views?: OTPInputStyles;
}

export interface OTPInputViewProps extends OTPInputProps {
  /**
   * Current OTP value
   */
  value: string;

  /**
   * Whether the input is focused
   */
  isFocused: boolean;

  /**
   * Whether the input is hovered
   */
  isHovered: boolean;

  /**
   * Setter for the OTP value
   */
  setValue: (value: string) => void;

  /**
   * Setter for the focused state
   */
  setIsFocused: (isFocused: boolean) => void;

  /**
   * Setter for the hovered state
   */
  setIsHovered: (isHovered: boolean) => void;
}
