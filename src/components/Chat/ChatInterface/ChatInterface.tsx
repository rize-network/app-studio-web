/**
 * ChatInterface Component
 *
 * A comprehensive chat interface for AI applications that includes
 * message display, user input, and various controls.
 */

import React from 'react';
import { ChatInterfaceProps } from './ChatInterface/ChatInterface.props';
import { useChatInterfaceState } from './ChatInterface/ChatInterface.state';
import { ChatInterfaceView } from './ChatInterface/ChatInterface.view';

export const ChatInterface: React.FC<ChatInterfaceProps> = (props) => {
  const {
    inputValue,
    isSubmitting,
    messagesEndRef,
    handleInputChange,
    handleSubmit,
  } = useChatInterfaceState(props.messages as any);

  const onSubmit = () => {
    handleSubmit(props.onSubmit);
  };

  return (
    <ChatInterfaceView
      {...props}
      inputValue={inputValue}
      isSubmitting={isSubmitting}
      messagesEndRef={messagesEndRef}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit}
    />
  );
};

export type { ChatInterfaceProps } from './ChatInterface/ChatInterface.props';
export type { Message, MessageType } from './ChatInterface/ChatInterface.type';
