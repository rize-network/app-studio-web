import React from 'react';
import { View, useTheme } from 'app-studio';
import { ProgressBarProps } from './ProgressBar.props';

const ProgressBarView: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  color = 'theme.primary',
  backgroundColor = 'color.gray.200',
  height = 8,
  radius = 4,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const currentMode = elementMode ? elementMode : themeMode;

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const trackColor = getColor(backgroundColor, { themeMode: currentMode });
  const barColor = getColor(color, { themeMode: currentMode });

  return (
    <View
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      width="100%"
      height={height}
      backgroundColor={trackColor}
      borderRadius={radius}
      overflow="hidden"
      {...views?.container}
      {...props}
    >
      <View
        width={`${percentage}%`}
        height="100%"
        backgroundColor={barColor}
        borderRadius={radius}
        {...views?.bar}
      />
    </View>
  );
};

export default ProgressBarView;
