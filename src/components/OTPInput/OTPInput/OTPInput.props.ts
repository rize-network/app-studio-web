import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../utils/elevation';
import { Shape, Size, Variant } from '../../Input/Input.type';
import { OTPInputStyles, OTPInputType } from './OTPInput.type';
// Defines the core properties for the OTPInput component, extending standard input properties while omitting 'size' to use a custom one.
export interface OTPInputProps extends Omit<InputProps, 'size'> {
  // A unique identifier for the OTP input field.
  id?: string;
  // An error object or message to display for validation feedback.
  error?: any;
  // Supplemental text to guide the user or provide additional information.
  helperText?: string;
  // The name attribute for the input field, useful for form submission.
  name?: string;
  // A descriptive label for the OTP input component.
  label?: string;
  // The total number of digits/characters expected in the OTP.
  length?: number;
  // Placeholder text displayed when the input field is empty.
  placeholder?: string;
  // Indicates whether the input field should be read-only.
  isReadOnly?: boolean;
  // Indicates whether the input field should be disabled.
  isDisabled?: boolean;
  // Determines if the input field should automatically gain focus on component mount.
  isAutoFocus?: boolean;
  // Specifies the type of OTP input (e.g., numeric, alphanumeric).
  type?: OTPInputType;
  // Callback function invoked when all OTP digits have been entered.
  onComplete?: (value: string) => void;
  // Callback function invoked when the value of the input changes.
  onChange?: (value: string) => void;
  // Callback function invoked when the text content of the input changes.
  onChangeText?: (value: string) => void;
  // Callback function invoked when the input field loses focus.
  onBlur?: (value: any) => void;
  // Callback function invoked when a key is pressed down and then released.
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // Callback function invoked when a key is pressed down.
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // Callback function invoked when the input field is clicked.
  onClick?: () => void;
  // Callback function invoked when the input field gains focus.
  onFocus?: () => void;
  // A regular expression or string pattern to validate the input.
  pattern?: RegExp | string;
  // A function to transform pasted content before it's processed by the input.
  pasteTransformer?: (pasted: string) => string;
  // An array of numbers used for specific stepping behavior, if applicable.
  stepValues?: number[];
  // Determines the visual size of the OTP input component.
  size?: Size;
  // Applies shadow styling to the OTP input, supporting various shadow types.
  shadow?: Shadow | Elevation | ViewProps;
  // Defines the visual shape of the OTP input fields (e.g., rounded, square).
  shape?: Shape;
  // Specifies the visual variant of the OTP input (e.g., filled, outlined).
  variant?: Variant;
  // The spacing in pixels between individual OTP digit input fields.
  gap?: number;
  // Custom styles to be applied to different parts of the OTP input component.
  views?: OTPInputStyles;
}
// Extends OTPInputProps with additional properties specific to the view component's internal state and handlers.
export interface OTPInputViewProps extends OTPInputProps {
  // The current string value of the OTP input.
  value: string;
  // A boolean indicating whether the OTP input currently has focus.
  isFocused: boolean;
  // A boolean indicating whether the mouse cursor is currently hovering over the OTP input.
  isHovered: boolean;
  // A function to update the OTP input's value.
  setValue: (value: string) => void;
  // A function to set the focus state of the OTP input.
  setIsFocused: (isFocused: boolean) => void;
  // A function to set the hover state of the OTP input.
  setIsHovered: (isHovered: boolean) => void;
}
