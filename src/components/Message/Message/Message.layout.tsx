import React from 'react';
import { hideMessage, useMessageStore } from './Message.store';
import { View } from '../../Layout/View/View';
import { MessageView } from './Message.view';
import { MessageLayoutProps } from './Message.props';

export const MessageLayout = ({
  container,
  theme,
  position = 'topRight',
}: MessageLayoutProps) => {
  const {
    visible,
    title,
    variant,
    subtitle,
    isClosable,
    views,
    action,
    actionText,
    showIcon,
    timeout,
  } = useMessageStore();

  const toastPosition = {
    topLeft: {
      top: 6,
      left: 8,
    },
    topRight: {
      top: 6,
      right: 8,
    },
    bottomLeft: {
      bottom: 8,
      left: 6,
    },
    bottomRight: {
      bottom: 8,
      right: 6,
    },
  }[position];

  // Crée une fonction pour construire le contenu du message
  const renderMessageContent = () => (
    <MessageView
      variant={variant}
      subtitle={subtitle}
      show={visible}
      title={title}
      theme={theme}
      isClosable={isClosable}
      views={views}
      action={action}
      actionText={actionText}
      showIcon={showIcon}
      timeout={timeout}
      hide={() => hideMessage()}
    />
  );

  const MessageContainer = container ? (
    React.cloneElement(container, {}, renderMessageContent())
  ) : (
    <View position={'absolute'} zIndex={10000} {...toastPosition}>
      {renderMessageContent()}
    </View>
  );

  return visible ? MessageContainer : null;
};
