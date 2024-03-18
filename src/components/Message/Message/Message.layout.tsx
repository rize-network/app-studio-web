import React from 'react';
import { hideMessage, useMessageStore } from './Message.store';
import { Center } from '../../Layout/Center/Center';
import { MessageView } from './Message.view';
import { MessageLayoutProps } from './Message.props';

export const MessageLayout = ({
  container,
  icons,
  text,
  icon,
}: MessageLayoutProps) => {
  const { visible, message, variant } = useMessageStore();

  // Crée une fonction pour construire le contenu du message
  const renderMessageContent = () => (
    <MessageView
      variant={variant}
      message={message}
      show={visible}
      icons={icons}
      text={text}
      icon={icon}
      hide={() => hideMessage()}
    />
  );

  // Utilise 'container' si disponible, sinon utilise 'Center' par défaut
  const MessageContainer = container ? (
    React.cloneElement(container, {}, renderMessageContent())
  ) : (
    <Center width={'100vw'} position={'absolute'} top={'5vh'}>
      {renderMessageContent()}
    </Center>
  );

  return visible ? MessageContainer : null;
};
