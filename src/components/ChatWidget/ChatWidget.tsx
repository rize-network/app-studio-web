import React from 'react';
import type { ChatWidgetProps } from './ChatWidget/ChatWidget.props';
import { useChatWidgetState } from './ChatWidget/ChatWidget.state';
import ChatWidgetView from './ChatWidget/ChatWidget.view';

/**
 * ChatWidget Component
 *
 * A configurable chat interface component inspired by the ChatWidget toolbar design.
 * This is a UI-only component without backend/LLM connections.
 *
 * @example
 * ```tsx
 * <ChatWidget
 *   messages={messages}
 *   onSubmit={(message) => console.log(message)}
 *   variant="glassy"
 *   size="md"
 * />
 * ```
 */
export const ChatWidgetComponent: React.FC<ChatWidgetProps> = (props) => {
  const state = useChatWidgetState(props);

  return <ChatWidgetView {...props} {...state} />;
};

ChatWidgetComponent.displayName = 'ChatWidget';

export const ChatWidget = ChatWidgetComponent;
