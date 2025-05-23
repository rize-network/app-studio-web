import { ViewProps } from 'app-studio';

/**
 * Type of input for OTP fields
 */
export type OTPInputType = 'text' | 'password' | 'number';

/**
 * Styles for different parts of the OTP input component
 */
export type OTPInputStyles = {
  input?: ViewProps;
  container?: ViewProps;
  text?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};
