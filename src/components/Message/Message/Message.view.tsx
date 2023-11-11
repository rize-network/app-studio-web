import React, { useEffect } from 'react';
import { FileSVG } from '../../File/File';
import { Center } from '../../Layout/Center/Center';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';

interface IMessage {
  message: string;
  variant?: string;
  show?: boolean;
  hide: Function;
  closable?: boolean;
  timeout?: number;
  props?: any;
  icons?: Record<string, string>;
  text?: any;
  icon?: any;
  theme?: Record<string, any>;
  iconProps?: any;
  textProps?: any;
  containerProps?: any;
}

export const MessageView = ({
  variant = 'info',
  message,
  hide,
  props,
  timeout = 3000,
  closable = false,
  icons,
  text,
  theme = {},
  icon,
}: IMessage) => {
  useEffect(() => {
    if (timeout) {
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

  const MessageText = text ? text : Text;

  const Icon = icon ? icon : FileSVG;

  return (
    <Horizontal
      borderWidth={1}
      borderStyle="solid"
      alignSelf={'center'}
      justifyContent="center"
      verticalAlign="middle"
      borderRadius={8}
      minHeight={40}
      paddingVertical={5}
      paddingHorizontal={10}
      height={'auto'}
      safe={true}
      backgroundColor={`theme.message.${variant}.background`}
      borderColor={`theme.message.${variant}.border`}
      onClick={() => {
        hide();
      }}
      {...props}
    >
      {icons && icons[variant] && (
        <Center>
          <Icon
            borderColor={`theme.message.${variant}.iconBorderColor`}
            size={14}
            {...{ src: icons[variant] }}
          />
        </Center>
      )}
      <Center>
        <MessageText
          height={'auto'}
          paddingLeft={10}
          color={`theme.message.${variant}.textColor`}
        >
          {message}
        </MessageText>
      </Center>
      {closable && (
        <Center
          marginTop={0}
          paddingLeft={40}
          onClick={() => {
            hide();
          }}
        >
          <Icon size={14} name="CloseSvg" {...theme.close[variant]} />
        </Center>
      )}
    </Horizontal>
  );
};
