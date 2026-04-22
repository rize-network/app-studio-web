import React, { useEffect } from 'react';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';
import { Text } from 'app-studio';
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
    borderRadius: 12,
    borderColor: `${Theme[variant].container.border}`,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
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
      gap={12}
      width="100%"
      maxWidth={520}
      flexWrap="nowrap"
      position="relative"
      alignItems="flex-start"
      padding="12px 14px"
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
      transition="background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
      {...views?.container}
    >
      {isShowIcon && iconComponent}
      <Vertical gap={4} width="100%">
        <Text size="md" weight="semiBold" {...views?.title}>
          {title}
        </Text>
        {subtitle && (
          <Text
            size="sm"
            lineHeight="20px"
            color={Theme[variant].content.color}
            {...views?.subtitle}
          >
            {subtitle}
          </Text>
        )}
      </Vertical>
      {showAction && (
        <View
          as="button"
          type="button"
          onClick={action}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={Theme[variant].container.border}
          borderRadius="9999px"
          padding="6px 12px"
          cursor="pointer"
          transition="background-color 0.2s ease, border-color 0.2s ease"
          {...views?.actionText}
        >
          <Text
            whiteSpace="nowrap"
            size="sm"
            weight="semiBold"
            color={Theme[variant].content.color}
          >
            {actionText}
          </Text>
        </View>
      )}
      {isClosable && (
        <View
          position="absolute"
          zIndex={10000}
          right={8}
          top={8}
          onClick={() => {
            hide();
          }}
          cursor="pointer"
          padding="4px"
          borderRadius="9999px"
          transition="background-color 0.2s ease"
          {...views?.closingIcon?.container}
        >
          <CloseIcon
            widthHeight={16}
            color={Theme[variant].close.color}
            {...views?.closingIcon?.icon}
          />
        </View>
      )}
    </Horizontal>
  );
};
