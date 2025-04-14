/**
 * ChatInterface Types
 */

import { ViewProps } from 'app-studio';

export type MessageType = 'user' | 'assistant' | 'system' | 'error';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  metadata?: Record<string, any>;
}

export interface ChatInterfaceStyles {
  container?: ViewProps;
  messagesContainer?: ViewProps;
  inputContainer?: ViewProps;
  controlsContainer?: ViewProps;
}
