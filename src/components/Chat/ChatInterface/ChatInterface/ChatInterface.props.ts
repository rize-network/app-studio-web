/**
 * ChatInterface Props
 */

import { ViewProps } from 'app-studio';
import { Message, ChatInterfaceStyles } from './ChatInterface.type';

export interface ChatInterfaceProps extends ViewProps {
  /**
   * Array of messages to display in the chat
   */
  messages: Message[];

  /**
   * Callback function when a new message is submitted
   */
  onSubmit?: (message: string) => void;

  /**
   * Callback function when a message is edited
   */
  onEdit?: (id: string, newContent: string) => void;

  /**
   * Callback function when a message is deleted
   */
  onDelete?: (id: string) => void;

  /**
   * Whether to show the loading indicator
   */
  isLoading?: boolean;

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

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
   * URL of the background image
   */
  backgroundImageUrl?: string;

  /**
   * Custom styles for the component
   */
  styles?: ChatInterfaceStyles;

  /**
   * Children components
   */
  children?: React.ReactNode;
}
