/**
 * MessageBubble Styles
 */

import { ViewProps } from 'app-studio';
import { MessageType } from '../../ChatInterface/ChatInterface/ChatInterface.type';

export const getContainerStyles = (
  type: MessageType,
  isHovered: boolean
): ViewProps => {
  const baseStyles: ViewProps = {
    display: 'flex',
    padding: 'md',
    borderRadius: 'md',
    maxWidth: '80%',
    position: 'relative',
  };

  const typeStyles: Record<MessageType, ViewProps> = {
    user: {
      alignSelf: 'flex-end',
      backgroundColor: 'theme.primary',
      color: 'color.white',
    },
    assistant: {
      alignSelf: 'flex-start',
      backgroundColor: 'color.gray.100',
      color: 'color.gray.900',
    },
    system: {
      alignSelf: 'center',
      backgroundColor: 'color.gray.200',
      color: 'color.gray.700',
      fontStyle: 'italic',
    },
    error: {
      alignSelf: 'center',
      backgroundColor: 'color.red.100',
      color: 'color.red.900',
      borderLeft: '4px solid',
      borderColor: 'color.red.500',
    },
  };

  const hoverStyles: ViewProps = isHovered
    ? {
        boxShadow: 'sm',
      }
    : {};

  return {
    ...baseStyles,
    ...typeStyles[type],
    ...hoverStyles,
  };
};

export const contentStyles: ViewProps = {
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
};

export const timestampStyles: ViewProps = {
  fontSize: 'xs',
  color: 'color.gray.500',
  marginTop: 'xs',
  textAlign: 'right',
};

export const actionsStyles: ViewProps = {
  position: 'absolute',
  top: '-8px',
  right: '8px',
  display: 'flex',
  gap: 'xs',
  backgroundColor: 'color.white',
  borderRadius: 'full',
  padding: '2px',
  boxShadow: 'sm',
};
