/**
 * MessageBubble State
 */

import { useState } from 'react';

export const useMessageBubbleState = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const startEditing = (initialContent: string) => {
    setEditValue(initialContent);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const saveEditing = (onEdit?: (newContent: string) => void) => {
    if (onEdit && editValue.trim()) {
      onEdit(editValue);
    }
    setIsEditing(false);
    setEditValue('');
  };

  return {
    isEditing,
    editValue,
    isHovered,
    setEditValue,
    setIsHovered,
    startEditing,
    cancelEditing,
    saveEditing,
  };
};
