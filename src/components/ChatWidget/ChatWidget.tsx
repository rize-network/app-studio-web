import React from 'react';
import type { ChatWidgetProps } from './ChatWidget/ChatWidget.props';
import { useChatWidgetState } from './ChatWidget/ChatWidget.state';
import ChatWidgetView from './ChatWidget/ChatWidget.view';
// This file acts as the main container for the ChatWidget component, orchestrating its properties, state management logic from `useChatWidgetState`, and rendering the `ChatWidgetView` to present the user interface.
export const ChatWidgetComponent: React.FC<ChatWidgetProps> = (props) => {
  const state = useChatWidgetState(props);
  return <ChatWidgetView {...props} {...state} />;
};
ChatWidgetComponent.displayName = 'ChatWidget';
export const ChatWidget = ChatWidgetComponent;
