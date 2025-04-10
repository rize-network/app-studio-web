import React from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { WarningIcon } from '../../Icon/Icon';
import { AlertProps } from './Alert.props';
import { Themes } from './Alert.style';
// Defines AlertView as a functional component using destructuring to extract props.
export const AlertView = ({
  icon,
  title,
  views,
  description,
  // Sets a default variant prop to 'default' if none is provided.
  variant = 'default',
}: AlertProps) => (
  <Horizontal
    gap={15}
    borderRadius={10}
    borderWidth={1}
    borderStyle="solid"
    padding={16}
    flexWrap="nowrap"
    borderColor={Themes[variant].container.border}
    {...views?.container}
  >
    <View alignSelf={'center'}>
      {icon ? (
        icon
      ) : (
        <WarningIcon
          widthHeight={24}
          color={views?.icon?.color ?? Themes[variant].content.color}
        />
      )}
    </View>
    <Vertical gap={10}>
      <Text
        fontSize="16px"
        color={Themes[variant].content.color}
        {...views?.title}
      >
        {title}
      </Text>
      <Text
        fontSize="14px"
        color={Themes[variant].content.color}
        {...views?.description}
      >
        {description}
      </Text>
    </Vertical>
  </Horizontal>
);
