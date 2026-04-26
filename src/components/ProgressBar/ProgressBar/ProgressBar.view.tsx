import React, { useMemo } from 'react';
import { View, Text, useTheme } from 'app-studio';
import { ProgressBarProps } from './ProgressBar.props';
// Defines the ProgressBarView functional component, wrapped in React.memo for performance optimization, ensuring it only re-renders when its props change. It receives props defined by ProgressBarProps.
const ProgressBarView: React.FC<ProgressBarProps> = React.memo(
  ({
    // Sets the shape of the progress bar, defaulting to 'linear'.
    shape = 'linear',
    // Sets the current progress value, defaulting to 0.
    value = 0,
    // Sets the maximum possible value for the progress bar, defaulting to 100.
    max = 100,
    // Sets the color of the progress indicator, defaulting to 'theme-primary'.
    color = 'theme-primary',
    // Sets the background color of the progress bar track, defaulting to 'color-gray-200'.
    backgroundColor = 'color-gray-200',
    // Defines the height of the linear progress bar.
    height,
    // Defines the size (width and height) for the circular progress bar.
    size,
    // Sets the border radius for the linear progress bar, defaulting to 4.
    radius = 4,
    // Sets the thickness of the stroke for the circular progress bar, defaulting to 10.
    strokeWidth = 10,
    // Determines whether to display the progress percentage label, defaulting to false.
    showLabel = false,
    // Sets the color of the progress label, defaulting to 'theme-text-primary'.
    labelColor = 'theme-text-primary',
    // Enables or disables animation for progress transitions, defaulting to true.
    animated = true,
    // Sets the duration of the animation for progress transitions, defaulting to '0.5s'.
    animationDuration = '0.5s',
    // Allows overriding default styles for specific internal view components.
    views,
    // Overrides the theme mode for this specific component instance.
    themeMode: elementMode,
    // Captures any other remaining props passed to the component.
    ...props
  }) => {
    // Utilizes the useTheme hook to access theme-related utilities like getColor for resolving theme-aware colors and the current global themeMode.
    const { getColor, themeMode } = useTheme();
    // Determines the active theme mode for the component, prioritizing a specific elementMode prop if provided, otherwise falling back to the global themeMode.
    const currentMode = elementMode ? elementMode : themeMode;
    // Calculates a validated progress value, ensuring it stays within the acceptable range of 0 to max to prevent invalid display states.
    const validValue = Math.min(max, Math.max(0, value));
    // Calculates the progress as a percentage based on the validated value and the maximum value.
    const percentage = (validValue / max) * 100;
    // Memoizes the calculation of the track's background color, resolving it using the theme's getColor utility and the current theme mode. This prevents unnecessary recalculations on re-renders.
    const trackColor = useMemo(
      () => getColor(backgroundColor, { themeMode: currentMode }),
      [getColor, backgroundColor, currentMode]
    );
    // Memoizes the calculation of the progress bar's fill color, resolving it using the theme's getColor utility and the current theme mode. This prevents unnecessary recalculations on re-renders.
    const barColor = useMemo(
      () => getColor(color, { themeMode: currentMode }),
      [getColor, color, currentMode]
    );
    // Checks if the progress bar should be rendered as a 'circle' shape.
    if (shape === 'circle') {
      // Determines the overall size of the circular progress bar, prioritizing the 'size' prop, then 'height' if it's a number, otherwise defaulting to 100px.
      const circleSize = size || (typeof height === 'number' ? height : 100);
      // Calculates the radius of the SVG circles, accounting for the strokeWidth to ensure the progress bar fits within the defined circleSize.
      const radiusCalc = (circleSize - strokeWidth) / 2;
      // Calculates the circumference of the circle, which is essential for managing the strokeDasharray and strokeDashoffset properties to display progress.
      const circumference = 2 * Math.PI * radiusCalc;
      // Calculates the strokeDashoffset value, which determines how much of the circular progress bar is filled based on the current percentage.
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
            {}
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radiusCalc}
              stroke={trackColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              {...views?.track}
            />
            {}
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
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...views?.container}
        {...props}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: barColor,
            borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${percentage}%`,
            transition: animated
              ? `width ${animationDuration} ease-in-out`
              : 'none',
            ...(views?.bar as any),
          }}
        />
        {showLabel && (
          <Text
            color={labelColor}
            fontSize={
              typeof linearHeight === 'number' && linearHeight > 16
                ? `${linearHeight * 0.6}px`
                : '10px'
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
