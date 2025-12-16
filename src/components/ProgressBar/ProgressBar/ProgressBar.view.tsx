import React from 'react';
import { View, Text, useTheme } from 'app-studio';
import { ProgressBarProps } from './ProgressBar.props';

const ProgressBarView: React.FC<ProgressBarProps> = ({
  shape = 'linear',
  value = 0,
  max = 100,
  color = 'theme.primary',
  backgroundColor = 'color.gray.200',
  height,
  size,
  radius = 4,
  strokeWidth = 10,
  showLabel = false,
  labelColor = 'theme.text.primary',
  animated = true,
  animationDuration = '0.5s',
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const currentMode = elementMode ? elementMode : themeMode;

  const validValue = Math.min(max, Math.max(0, value));
  const percentage = (validValue / max) * 100;

  const trackColor = getColor(backgroundColor, { themeMode: currentMode });
  const barColor = getColor(color, { themeMode: currentMode });

  if (shape === 'circle') {
    const circleSize = size || (typeof height === 'number' ? height : 100);
    const radiusCalc = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radiusCalc;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <View
        width={circleSize}
        height={circleSize}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...views?.container}
        {...props}
      >
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radiusCalc}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            {...views?.track}
          />
          {/* Indicator */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radiusCalc}
            stroke={barColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: animated
                ? `stroke-dashoffset ${animationDuration} ease-in-out`
                : 'none',
            }}
            {...views?.indicator}
          />
        </svg>
        {showLabel && (
          <View
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
          >
            <Text
              color={labelColor}
              fontSize={`${circleSize * 0.2}px`}
              fontWeight="bold"
              {...views?.text}
            >
              {Math.round(percentage)}%
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Linear Progress Bar
  const linearHeight = height || 8;

  return (
    <View
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      width="100%"
      height={linearHeight}
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
        style={{
          transition: animated
            ? `width ${animationDuration} ease-in-out`
            : 'none',
        }}
        {...views?.bar}
      />
    </View>
  );
};

export default ProgressBarView;
