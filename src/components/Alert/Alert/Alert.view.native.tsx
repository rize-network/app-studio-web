import React, { useMemo } from 'react';
import { View, Text, Vertical, Horizontal, useTheme } from 'app-studio';
import { AlertProps } from './Alert.props';
import { getThemes } from './Alert.style';

export const AlertView = React.memo(
  ({
    icon,
    title = '',
    views,
    description = '',
    variant = 'default',
    themeMode: elementMode,
    children,
    ...props
  }: AlertProps) => {
    const { themeMode } = useTheme();
    const currentThemeMode = elementMode || themeMode;
    const themes = useMemo(
      () => getThemes(currentThemeMode),
      [currentThemeMode]
    );

    return (
      <Horizontal
        gap={12}
        padding={12}
        flexWrap="nowrap"
        alignItems="flex-start"
        borderRadius={8}
        borderWidth={1}
        borderStyle="solid"
        borderColor={themes[variant].container.borderColor}
        backgroundColor={themes[variant].container.backgroundColor}
        {...views?.container}
        {...props}
      >
        {icon && (
          <View alignSelf="flex-start" marginTop={2} {...views?.icon}>
            {icon}
          </View>
        )}
        <Vertical gap={4}>
          {title ? (
            <Text
              fontSize={14}
              fontWeight="600"
              lineHeight={20}
              color={themes[variant].content.color}
              {...views?.title}
            >
              {title}
            </Text>
          ) : null}
          <Text
            fontSize={12}
            fontWeight="400"
            lineHeight={16}
            color={themes[variant].content.color}
            {...views?.description}
          >
            {description || children}
          </Text>
        </Vertical>
      </Horizontal>
    );
  }
);
