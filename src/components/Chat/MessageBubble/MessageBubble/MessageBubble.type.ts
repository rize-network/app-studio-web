/**
 * MessageBubble Types
 */

import { ViewProps } from 'app-studio';
import { Message } from '../../ChatInterface/ChatInterface/ChatInterface.type';

export interface MessageBubbleStyles {
  container?: ViewProps;
  content?: ViewProps;
  avatar?: ViewProps;
  timestamp?: ViewProps;
  actions?: ViewProps;
}
