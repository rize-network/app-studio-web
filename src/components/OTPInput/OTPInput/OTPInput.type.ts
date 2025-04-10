import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from '../../Layout/configs/Input.type';

/**
 * Type of input for OTP fields
 */
export type OTPInputType = 'text' | 'password' | 'number';

/**
 * Styles for different parts of the OTP input component
 */
export type OTPInputStyles = {
  container?: ViewProps;
  input?: ViewProps;
  box?: ViewProps;
  text?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};
