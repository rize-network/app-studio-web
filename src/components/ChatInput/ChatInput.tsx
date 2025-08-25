import React, { forwardRef } from 'react';
import { ChatInputProps } from './ChatInput/ChatInput.props';
import { useChatInputState } from './ChatInput/ChatInput.state';
import ChatInputView from './ChatInput/ChatInput.view';

/**
 * Interface for the ChatInput component's imperative handle
 */

/**
 * ChatInput component
 *
 * A customizable chat input component with file upload support
 */
export const ChatInput = forwardRef<HTMLElement, ChatInputProps>(
  (props, ref) => {
    // Get state from custom hook
    const state = useChatInputState(props);

    // Render the view component with props and state
    return <ChatInputView {...props} {...state} />;
  }
);

ChatInput.displayName = 'ChatInput';
