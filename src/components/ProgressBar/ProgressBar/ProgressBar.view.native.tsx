/**
 * ProgressBarView (React Native) – linear and circle shapes.
 * The circle shape uses `react-native-svg` (optional peer). If it is not
 * installed, the component falls back to the linear shape.
 */

import React, { useMemo } from 'react';
import { View, Text, useTheme } from 'app-studio';
import { ProgressBarProps } from './ProgressBar.props';

let Svg: any = null;
let Circle: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg ?? RNSvg.default;
  Circle = RNSvg.Circle;
} catch {
  /* optional peer absent */
}

const isRawCssColor = (value?: string) =>
  typeof value === 'string' &&
  (/^(#|rgb\(|rgba\(|hsl\(|hsla\(|var\()/.test(value) ||
    ['black', 'currentColor', 'inherit', 'transparent', 'white'].includes(
      value
    ));

const ProgressBarView: React.FC<ProgressBarProps> = React.memo(
  ({
    shape = 'linear',
    value = 0,
    max = 100,
    color = 'theme-primary',
    backgroundColor = 'color-gray-200',
    height,
    size,
    radius = 4,
    strokeWidth = 10,
    showLabel = false,
    labelColor = 'color-black-primary',
    animated: _animated = true,
    animationDuration: _animationDuration = '0.5s',
    views,
    themeMode: elementMode,
    ...props
  }) => {
    const { getColor, themeMode } = useTheme();
    const currentMode = elementMode ? elementMode : themeMode;
    const validValue = Math.min(max, Math.max(0, value));
    const percentage = (validValue / max) * 100;
    const resolveColor = (value: string) =>
      isRawCssColor(value)
        ? value
        : getColor(value, { themeMode: currentMode });
    const trackColor = useMemo(
      () => resolveColor(backgroundColor) as string,
      [backgroundColor, currentMode]
    );
    const barColor = useMemo(
      () => resolveColor(color) as string,
      [color, currentMode]
    );

    // --- Circle shape ---
    if (shape === 'circle' && Svg && Circle) {
      const circleSize = (size ||
        (typeof height === 'number' ? height : 100)) as number;
      const radiusCalc = (circleSize - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radiusCalc;
      const offset = circumference - (percentage / 100) * circumference;
      return (
        <View
          width={circleSize}
          height={circleSize}
          position="relative"
          alignItems="center"
          justifyContent="center"
          {...views?.container}
          {...props}
        >
          <Svg
            width={circleSize}
            height={circleSize}
            viewBox={`0 0 ${circleSize} ${circleSize}`}
            // Rotate so that progress starts at the top (12 o'clock) instead of 3 o'clock.
            style={{ transform: [{ rotate: '-90deg' }] }}
          >
            {/* Track */}
            <Circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radiusCalc}
              stroke={trackColor}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Indicator */}
            <Circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radiusCalc}
              stroke={barColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
            />
          </Svg>
          {showLabel && (
            <View
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              pointerEvents="none"
            >
              <Text
                color={labelColor}
                fontSize={circleSize * 0.2}
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

    // --- Linear shape (also the fallback when react-native-svg is absent) ---
    const linearHeight = height || 8;
    return (
      <View
        width="100%"
        height={linearHeight}
        borderRadius={radius}
        overflow="hidden"
        position="relative"
        alignItems="center"
        justifyContent="center"
        backgroundColor={trackColor}
        {...views?.container}
        {...props}
      >
        <View
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          height="100%"
          width={`${percentage}%`}
          backgroundColor={barColor}
          borderRadius={typeof radius === 'number' ? radius : 4}
          {...(views?.bar as any)}
        />
        {showLabel && (
          <Text
            color={labelColor}
            fontSize={
              typeof linearHeight === 'number' && linearHeight > 16
                ? linearHeight * 0.6
                : 10
            }
            fontWeight="bold"
            position="relative"
            zIndex={1}
            {...views?.text}
          >
            {Math.round(percentage)}%
          </Text>
        )}
      </View>
    );
  }
);
export default ProgressBarView;
