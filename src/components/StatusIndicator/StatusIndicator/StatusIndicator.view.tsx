import React from 'react';
import { Horizontal, View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { StatusIndicatorProps } from './StatusIndicator.props';
import { getThemes } from './StatusIndicator.style';

export const StatusIndicatorView = ({
  label,
  status = 'default',
  views,
  themeMode: elementMode,
  ...props
}: StatusIndicatorProps) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const themes = getThemes(currentThemeMode);

  return (
    <Horizontal
      alignItems="center"
      gap={8}
      role="status-indicator"
      {...views?.container}
      {...props}
    >
      <View
        role="status-dot"
        width="8px"
        height="8px"
        borderRadius="50%"
        {...themes[status].indicator}
        {...views?.indicator}
      />
      {label && (
        <Text
          role="status-label"
          fontSize="14px"
          lineHeight="20px"
          {...themes[status].label}
          {...views?.label}
        >
          {label}
        </Text>
      )}
    </Horizontal>
  );
};
