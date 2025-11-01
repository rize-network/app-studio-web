import React, { useEffect } from 'react';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Themes } from './Message.style';
import { MessageProps } from './Message.props';
import {
  CloseIcon,
  WarningIcon,
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
} from '../../Icon/Icon';

export const MessageView = ({
  variant,
  hide,
  title,
  subtitle,
  theme,
  action,
  actionText,
  showIcon = false,
  isClosable = false,
  timeout = 3000,
  views,
}: MessageProps) => {
  useEffect(() => {
    if (timeout && !isClosable) {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        hide();
      }, timeout);

      return () => {
        clearTimeout(timeId);
      };
    }

    return;
  }, []);

  const Theme = theme ?? Themes;
  const showAction = !!(action && actionText);

  const containerStyle = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: `${Theme[variant].container.border}`,
  };

  const iconColor = {
    info: '#3b82f6',
    success: '#4ade80',
    warning: '#f97316',
    error: '#ef4444',
  }[variant];

  const iconComponent = {
    info: <InfoIcon widthHeight={24} color={iconColor} {...views?.icon} />,
    success: (
      <SuccessIcon widthHeight={24} color={iconColor} {...views?.icon} />
    ),
    warning: (
      <WarningIcon widthHeight={24} color={iconColor} {...views?.icon} />
    ),
    error: <ErrorIcon widthHeight={24} color={iconColor} {...views?.icon} />,
  }[variant];

  const isShowIcon = showIcon && iconComponent;

  return (
    <Horizontal
      role="messageContent"
      gap={16}
      width={400}
      // safe={true}
      flexWrap="nowrap"
      position={'relative'}
      alignItems="center"
      padding="14px 24px 14px 14px"
      color={`${Theme[variant].content.color}`}
      backgroundColor={`${Theme[variant].container.backgroundColor}`}
      onClick={
        isClosable
          ? () => {}
          : () => {
              hide();
            }
      }
      {...containerStyle}
      {...views?.container}
    >
      {isShowIcon && iconComponent}
      <Vertical gap={8} width="100%">
        <Text
          size="md"
          weight="semiBold"
          bgColor={Theme[variant].container.backgroundColor}
          {...views?.title}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            size="sm"
            bgColor={Theme[variant].container.backgroundColor}
            {...views?.subtitle}
          >
            {subtitle}
          </Text>
        )}
      </Vertical>
      {showAction && (
        <Text
          marginRight={10}
          onClick={action}
          padding="6px 10px"
          whiteSpace="nowrap"
          bgColor={Theme[variant].container.backgroundColor}
          {...containerStyle}
          {...views?.actionText}
        >
          {actionText}
        </Text>
      )}
      {isClosable && (
        <View
          position="absolute"
          zIndex={10000}
          right={8}
          top={6}
          onClick={() => {
            hide();
          }}
          {...views?.closingIcon?.container}
        >
          <CloseIcon
            widthHeight={18}
            color={iconColor}
            {...views?.closingIcon?.icon}
          />
        </View>
      )}
    </Horizontal>
  );
};
