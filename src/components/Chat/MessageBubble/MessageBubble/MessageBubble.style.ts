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
    flexDirection: 'column',
    position: 'relative',
    width: 'fit-content',
    maxWidth: '100%',
  };

  const typeStyles: Record<MessageType, ViewProps> = {
    user: {
      alignSelf: 'flex-end',
      marginLeft: 'auto',
    },
    assistant: {
      alignSelf: 'flex-start',
      marginRight: 'auto',
    },
    system: {
      alignSelf: 'center',
      marginLeft: 'auto',
      backgroundColor: 'color.gray.200',
      color: 'color.gray.700',
      fontStyle: 'italic',
      padding: 'sm',
      borderRadius: 'md',
    },
    error: {
      alignSelf: 'center',
      marginLeft: 'auto',
      backgroundColor: 'color.red.100',
      color: 'color.red.900',
      borderLeft: '4px solid',
      borderColor: 'color.red.500',
      padding: 'sm',
      borderRadius: 'md',
    },
  };

  const hoverStyles: ViewProps = isHovered
    ? {
        zIndex: 10,
      }
    : {};

  return {
    ...baseStyles,
    ...typeStyles[type],
    ...hoverStyles,
  };
};

export const getMessageContentStyles = (type: MessageType): ViewProps => {
  const baseStyles: ViewProps = {
    padding: 'md',
    borderRadius: 'lg',
    position: 'relative',
  };

  const typeStyles: Record<MessageType, ViewProps> = {
    user: {
      backgroundColor: 'theme.primary',
      color: 'color.white',
      borderTopRightRadius: '0',
    },
    assistant: {
      backgroundColor: 'color.gray.100',
      color: 'color.gray.900',
      borderTopLeftRadius: '0',
    },
    system: {},
    error: {},
  };

  return {
    ...baseStyles,
    ...typeStyles[type],
  };
};

export const contentStyles: ViewProps = {
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
};

export const timestampStyles: ViewProps = {
  fontSize: 'xs',
  color: 'color.gray.500',
  marginTop: '4px',
  marginLeft: '8px',
  textAlign: 'right',
};

export const actionsStyles: ViewProps = {
  position: 'absolute',
  top: '-24px',
  right: '0',
  display: 'flex',
  gap: 'xs',
  backgroundColor: 'color.white',
  borderRadius: 'md',
  padding: '4px',
  boxShadow: 'sm',
  zIndex: 20,
};
