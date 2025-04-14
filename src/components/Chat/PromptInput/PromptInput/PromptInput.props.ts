/**
 * PromptInput Props
 */

import { ViewProps } from 'app-studio';
import { PromptInputStyles } from './PromptInput.type';

export interface PromptInputProps extends ViewProps {
  /**
   * Current value of the input
   */
  value: string;

  /**
   * Callback function when the input value changes
   */
  onChange: (value: string) => void;

  /**
   * Callback function when the input is submitted
   */
  onSubmit: () => void;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether to show a loading indicator
   */
  isLoading?: boolean;

  /**
   * Whether to enable file uploads
   */
  enableFileUpload?: boolean;

  /**
   * Whether to enable voice input
   */
  enableVoiceInput?: boolean;

  /**
   * Whether to enable AI suggestions
   */
  enableSuggestions?: boolean;

  /**
   * Maximum number of rows for the textarea
   */
  maxRows?: number;

  /**
   * Minimum number of rows for the textarea
   */
  minRows?: number;

  /**
   * Whether to use a transparent background
   */
  transparentBackground?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: PromptInputStyles;
}
