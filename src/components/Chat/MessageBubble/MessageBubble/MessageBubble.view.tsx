/**
 * MessageBubble View
 */

import React from 'react';
import { View } from 'app-studio';
import { Vertical } from '../../../Layout/Vertical/Vertical';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Text } from '../../../Text/Text';
import { Button } from '../../../Button/Button';
import { LoadingIndicator } from '../../LoadingIndicator/LoadingIndicator';
import { AIResponseDisplay } from '../../AIResponseDisplay/AIResponseDisplay';
import { MessageBubbleProps } from './MessageBubble.props';
import {
  getContainerStyles,
  contentStyles,
  timestampStyles,
  actionsStyles,
} from './MessageBubble.style';

interface Props extends MessageBubbleProps {
  isEditing: boolean;
  editValue: string;
  isHovered: boolean;
  setEditValue: (value: string) => void;
  setIsHovered: (value: boolean) => void;
  startEditing: (initialContent: string) => void;
  cancelEditing: () => void;
  saveEditing: () => void;
}

export const MessageBubbleView: React.FC<Props> = ({
  message,
  onEdit,
  onDelete,
  showTimestamp = true,
  showAvatar = false,
  showActions = true,
  styles = {},
  isEditing,
  editValue,
  isHovered,
  setEditValue,
  setIsHovered,
  startEditing,
  cancelEditing,
  saveEditing,
  ...props
}) => {
  const { id, type, content, timestamp, isLoading } = message;

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View
      {...getContainerStyles(type, isHovered)}
      {...props}
      {...styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <LoadingIndicator size="sm" />
      ) : (
        <Vertical width="100%">
          {isEditing ? (
            <Vertical gap="sm" width="100%">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '80px',
                }}
              />
              <Horizontal gap="sm" justifyContent="flex-end">
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button onClick={saveEditing}>Save</Button>
              </Horizontal>
            </Vertical>
          ) : (
            <>
              {type === 'assistant' ? (
                <AIResponseDisplay content={content} />
              ) : (
                <Text {...contentStyles} {...styles.content}>
                  {content}
                </Text>
              )}

              {showTimestamp && (
                <Text {...timestampStyles} {...styles.timestamp}>
                  {formatTimestamp(timestamp)}
                </Text>
              )}
            </>
          )}
        </Vertical>
      )}

      {showActions && isHovered && !isLoading && !isEditing && (
        <View {...actionsStyles} {...styles.actions}>
          {onEdit && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => startEditing(content)}
              aria-label="Edit message"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onDelete}
              aria-label="Delete message"
            >
              Delete
            </Button>
          )}
        </View>
      )}
    </View>
  );
};
