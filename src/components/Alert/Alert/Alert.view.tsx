import React from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { WarningSvg } from '../../Svg';
import { AlertProps } from './Alert.props';
import { Themes } from './Alert.style';

export const AlertView = ({
  icon,
  title,
  styles,
  description,
  variant = 'default',
}: AlertProps) => (
  <Horizontal
    gap={15}
    borderRadius={10}
    borderWidth={1}
    borderStyle="solid"
    padding={16}
    wrap="nowrap"
    borderColor={Themes[variant].container.border}
    {...styles?.container}
  >
    <View alignSelf={'center'}>
      {icon ? (
        icon
      ) : (
        <WarningSvg
          size={24}
          color={styles?.icon.color ?? Themes[variant].content.color}
        />
      )}
    </View>
    <Vertical gap={10}>
      <Text
        fontSize="16px"
        color={Themes[variant].content.color}
        {...styles?.title}
      >
        {title}
      </Text>
      <Text
        fontSize="14px"
        color={Themes[variant].content.color}
        {...styles?.description}
      >
        {description}
      </Text>
    </Vertical>
  </Horizontal>
);
