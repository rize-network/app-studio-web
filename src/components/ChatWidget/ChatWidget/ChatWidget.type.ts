import type { CSSProperties } from 'react';

/** Variant types for the ChatWidget component */
export type Variant = 'default' | 'glassy' | 'minimal';

/** Size options for the ChatWidget component */
export type Size = 'sm' | 'md' | 'lg';

/** Role of the message sender */
export type MessageRole = 'user' | 'assistant';

/** Attachment type for messages */
export interface Attachment {
  id: string;
  name: string;
  size?: number;
  type?: string;
  url?: string;
}

/** Context element referenced in chat */
export interface ContextElement {
  id: string;
  name: string;
  tagName: string;
  rect?: DOMRect; // Optional as we might not always have/need the rect in history
}

export type MessageType = 'text' | 'error' | 'system' | 'tool';

/** Message structure */
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  reasoning?: string; // The "thinking" process of the LLM
  messageType?: MessageType; // The kind of message (default: 'text')
  timestamp: Date;
  attachments?: Attachment[];
  contextElements?: ContextElement[];
}

/** Custom styles for different parts of the ChatWidget component */
export interface ChatWidgetStyles {
  container?: any;
  messagesContainer?: any;
  inputContainer?: any;
  bubble?: any;
  userBubble?: any;
  assistantBubble?: any;
  timestamp?: any;
  input?: any;
  sendButton?: any;
  attachmentButton?: any;
  loadingIndicator?: any;
  contextChipsContainer?: any;
  contextPickerButton?: any;
  // New styles for message types
  reasoningContainer?: any;
  reasoningContent?: any;
  errorMessage?: any;
  systemMessage?: any;
  toolMessage?: any;
}
