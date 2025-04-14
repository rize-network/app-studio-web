/**
 * MessageBubble Props
 */

import { ViewProps } from 'app-studio';
import { Message } from '../../ChatInterface/ChatInterface/ChatInterface.type';
import { MessageBubbleStyles } from './MessageBubble.type';

export interface MessageBubbleProps extends ViewProps {
  /**
   * Message object to display
   */
  message: Message;

  /**
   * Callback function when the message is edited
   */
  onEdit?: (newContent: string) => void;

  /**
   * Callback function when the message is deleted
   */
  onDelete?: () => void;

  /**
   * Whether to show the timestamp
   */
  showTimestamp?: boolean;

  /**
   * Whether to show the avatar
   */
  showAvatar?: boolean;

  /**
   * Whether to show action buttons (edit, delete, etc.)
   */
  showActions?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: MessageBubbleStyles;
}
