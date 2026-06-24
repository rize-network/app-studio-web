import React from 'react';
import { Dimensions } from 'react-native';
import { hideMessage, useMessageStore } from './Message.store';
import { View } from 'app-studio';
import { MessageView } from './Message.view';
import { MessageLayoutProps } from './Message.props';

// React Native variant of MessageLayout. Web's `width:100%` + `maxWidth:520`
// inside an auto-width absolute container collapses/overflows on Yoga and the
// 520 cap is wider than most phones, so the message rendered off-screen. Here
// the positioned container gets a CONCRETE width that always fits the screen,
// and MessageView's `width:100%` then resolves against it.
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
    topLeft: { top: 6, left: 8 },
    topRight: { top: 6, right: 8 },
    bottomLeft: { bottom: 8, left: 6 },
    bottomRight: { bottom: 8, right: 6 },
  }[position];

  const width = Math.min(520, Dimensions.get('window').width - 16);

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
    <View position={'absolute'} zIndex={10000} width={width} {...toastPosition}>
      {renderMessageContent()}
    </View>
  );

  return visible ? MessageContainer : null;
};
