import { ViewProps } from 'app-studio';
// Defines the permissible input types for the OTP fields, allowing for 'text', 'password', or 'number' input methods.
export type OTPInputType = 'text' | 'password' | 'number';
// Defines the interface for customizing the styles of different elements within the OTP input component.
export type OTPInputStyles = {
  // Specifies optional styling properties for each individual OTP input field.
  input?: ViewProps;
  // Specifies optional styling properties for the main container that encloses all OTP input fields.
  container?: ViewProps;
  // Specifies optional styling properties for the text displayed inside each OTP input field.
  text?: ViewProps;
  // Specifies optional styling properties for the descriptive label accompanying the OTP input component.
  label?: ViewProps;
  // Specifies optional styling properties for any helper text displayed beneath the OTP input field.
  helperText?: ViewProps;
};
