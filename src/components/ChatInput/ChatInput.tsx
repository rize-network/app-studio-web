// This file defines the main ChatInput functional component. It uses `forwardRef` to enable ref forwarding, integrates a custom state management hook (`useChatInputState`) for its logic, and delegates the actual rendering to a separate `ChatInputView` component, thereby separating concerns.
import React, { forwardRef } from 'react';
import { ChatInputProps } from './ChatInput/ChatInput.props';
import { useChatInputState } from './ChatInput/ChatInput.state';
import ChatInputView from './ChatInput/ChatInput.view';
export const ChatInput = forwardRef<HTMLElement, ChatInputProps>(
  (props, ref) => {
    const state = useChatInputState(props);
    return <ChatInputView {...props} {...state} />;
  }
);
ChatInput.displayName = 'ChatInput';
