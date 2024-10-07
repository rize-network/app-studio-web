import React, { useEffect } from 'react';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Themes } from './Message.style';
import { MessageProps } from './Message.props';
import { CloseSvg, WarningSvg, SuccessSvg, ErrorSvg, InfoSvg } from '../../Svg';

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
  styles,
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
  const isWithAction = !!(action && actionText);

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
    info: <InfoSvg size={24} color={iconColor} {...styles?.icon} />,
    success: <SuccessSvg size={24} color={iconColor} {...styles?.icon} />,
    warning: <WarningSvg size={24} color={iconColor} {...styles?.icon} />,
    error: <ErrorSvg size={24} color={iconColor} {...styles?.icon} />,
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
      {...styles?.container}
    >
      {isShowIcon && iconComponent}
      <Vertical gap={8} width="100%">
        <Text size="md" weight="semiBold" {...styles?.title}>
          {title}
        </Text>
        {subtitle && (
          <Text size="sm" {...styles?.subtitle}>
            {subtitle}
          </Text>
        )}
      </Vertical>
      {isWithAction && (
        <Text
          marginRight={10}
          onClick={action}
          padding="6px 10px"
          whiteSpace="nowrap"
          {...containerStyle}
          {...styles?.actionText}
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
          {...styles?.closingIcon?.container}
        >
          <CloseSvg
            size={18}
            color={iconColor}
            {...styles?.closingIcon?.icon}
          />
        </View>
      )}
    </Horizontal>
  );
};
