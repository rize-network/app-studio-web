import { CSSProperties } from 'react';
import { InputProps, Shadow } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';

import { Shape, Size, TextAreaStyles, Variant } from './TextArea.type';

export interface TextAreaProps extends Omit<InputProps, 'size'> {
  /**
   * Changes the label and border color of the input field.
   */
  colorScheme?: string;
  /**
   * Sets the initial value of the textarea.
   */
  defaultValue?: string;
  /**
   * Specifies whether the input field should display an error state.
   */
  error?: boolean;
  /**
   * Specifies whether the text input is editable or not for iOS and Android.
   */
  isEditable?: boolean;
  /**
   * Provides additional information about the input field.
   */
  helperText?: string;
  /**
   * The input field identifier.
   */
  id?: string;
  /**
   * Specifies whether the input field is read-only and cannot be edited.
   */
  isReadOnly?: boolean;
  /**
   * Specifies whether the input field is disabled and cannot be interacted with.
   */
  isDisabled?: boolean;
  /**
   * Specifies whether the input field should be automatically focused.
   */
  isAutoFocus?: boolean;
  /**
   * Specifies whether the input field should allow multiple lines of text.
   */
  isMultiline?: boolean;
  /**
   * Displays a label above the user input.
   */
  label?: string;
  /**
   * Specifies the maximum number of rows that the textarea should display.
   */
  maxRows?: number;
  /**
   * Specifies the maximum number of columns that the textarea should display.
   */
  maxCols?: number;
  /**
   * The name of the input field.
   */
  name: string;
  /**
   * Placeholder text to display in the input field until the user enters text.
   */
  placeholder?: string;
  /**
   * Handler function called when the input field value changes.
   */
  onChange?: (value: any) => void;
  /**
   * Handler function called when the input field value changes for iOS and Android.
   */
  onChangeText?: (text: string) => void;
  /**
   * Callback function triggered when the field loses focus.
   */
  onBlur?: (value: any) => void;
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
  styles?: TextAreaStyles;
  /**
   * The default value of the input field.
   */
  value?: string | number;
  /**
   * Changes the style variant of the input field.
   */
  variant?: Variant;
}

export interface TextAreaViewProps extends TextAreaProps {
  /**
   * The hint text displayed in the textarea.
   */
  hint?: string;

  /**
   * Callback prop to update the hint text.
   */
  setHint?: Function;

  /**
   * Prop indicating if the textarea is being hovered.
   */
  isHovered?: boolean;

  /**
   * Callback prop to update the hover state of the textarea.
   */
  setIsHovered?: Function;

  /**
   * The current value of the textarea input.
   */
  value?: string | number;

  /**
   * Callback prop to update the value of the textarea input.
   */
  setValue?: Function;

  /**
   * Prop indicating if the textarea is currently focused.
   */
  isFocused?: boolean;

  /**
   * Callback prop to update the focus state of the textarea.
   */
  setIsFocused?: Function;
}
