/**
 * MessageBubble Component
 *
 * A component for displaying chat messages with different styles based on the message type.
 * Supports user, assistant, system, and error message types.
 */

import React from 'react';
import { MessageBubbleProps } from './MessageBubble/MessageBubble.props';
import { useMessageBubbleState } from './MessageBubble/MessageBubble.state';
import { MessageBubbleView } from './MessageBubble/MessageBubble.view';

export const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
  const {
    isEditing,
    editValue,
    isHovered,
    setEditValue,
    setIsHovered,
    startEditing,
    cancelEditing,
    saveEditing,
  } = useMessageBubbleState();

  const handleSaveEditing = () => {
    saveEditing(props.onEdit);
  };

  return (
    <MessageBubbleView
      {...props}
      isEditing={isEditing}
      editValue={editValue}
      isHovered={isHovered}
      setEditValue={setEditValue}
      setIsHovered={setIsHovered}
      startEditing={startEditing}
      cancelEditing={cancelEditing}
      saveEditing={handleSaveEditing}
    />
  );
};

export type { MessageBubbleProps } from './MessageBubble/MessageBubble.props';
