'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { ChatInputProps } from './ChatInput/ChatInput.props';
import { useChatInputState } from './ChatInput/ChatInput.state';
import ChatInputView from './ChatInput/ChatInput.view';

/**
 * Interface for the ChatInput component's imperative handle
 */
export interface ChatInputHandles {
  /**
   * Get the pending files
   */
  getPendingFiles: () => File[];

  /**
   * Clear the pending files
   */
  clearPendingFiles: () => void;
}

/**
 * ChatInput component
 *
 * A customizable chat input component with file upload support
 */
export const ChatInput = forwardRef<ChatInputHandles, ChatInputProps>(
  (props, ref) => {
    // Get state from custom hook
    const state = useChatInputState(props);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getPendingFiles: () => state.pendingFiles || [],
      clearPendingFiles: () => state.setPendingFiles([]),
    }));

    // Render the view component with props and state
    return <ChatInputView {...props} {...state} />;
  }
);

ChatInput.displayName = 'ChatInput';
