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

  let Component = container ? (
    container
  ) : (
    <Center width={'100vw'} position={'absolute'} top={'5vh'}>
      <MessageView
        variant={variant}
        message={message}
        show={visible}
        icons={icons}
        text={text}
        icon={icon}
        hide={() => hideMessage()}
      />
    </Center>
  );

  return visible ? (
    <Component
      variant={variant}
      message={message}
      show={visible}
      icons={icons}
      text={text}
      icon={icon}
      hide={() => hideMessage()}
    />
  ) : null;
};
