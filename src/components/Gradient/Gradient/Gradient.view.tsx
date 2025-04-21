/**
 * Gradient View Component
 *
 * Renders a gradient with various styles and states
 * according to the design guidelines.
 */

import React, { useMemo } from 'react';
import { View } from 'app-studio';
import { useTheme } from 'app-studio';
import { GradientProps } from './Gradient.props';
import {
  DefaultColorStops,
  DefaultGradientStyles,
  GradientAnimations,
  generateGradientString,
} from './Gradient.style';

export const GradientView: React.FC<GradientProps> = ({
  type = 'linear',
  direction = 'to-right',
  shape = 'circle',
  position = 'center',
  from,
  to,
  colors,
  animate = false,
  animationDuration = 3,
  children,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  // Determine color stops to use
  const colorStops = useMemo(() => {
    // If colors array is provided, use it
    if (colors && colors.length > 0) {
      return colors;
    }

    // If from and to are provided, create a two-color gradient
    if (from && to) {
      return [
        { color: from, position: '0%' },
        { color: to, position: '100%' },
      ];
    }

    // Otherwise use default colors for the selected gradient type
    return DefaultColorStops[type];
  }, [colors, from, to, type]);

  // Generate the gradient string
  const gradientString = useMemo(() => {
    // Process color stops to resolve theme colors
    const processedColorStops = colorStops.map((stop) => ({
      ...stop,
      color: getColor(
        stop.color,
        elementMode ? { themeMode: elementMode } : undefined
      ),
    }));
    return generateGradientString(
      type,
      processedColorStops,
      direction,
      shape,
      position
    );
  }, [
    type,
    colorStops,
    direction,
    shape,
    position,
    getColor,
    themeMode,
    elementMode,
  ]);

  // Prepare animation styles if animation is enabled
  const animationStyles = useMemo(() => {
    if (!animate) return {};

    const baseAnimation = GradientAnimations[type];

    return {
      ...baseAnimation,
      transition: baseAnimation.transition.replace(
        '3s',
        `${animationDuration}s`
      ),
      // Apply animation properties
      animationDuration: `${animationDuration}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: type === 'conic' ? 'linear' : 'ease-in-out',
    };
  }, [animate, animationDuration, type]);

  return (
    <View
      background={gradientString}
      {...DefaultGradientStyles.container}
      {...animationStyles}
      {...views?.container}
      {...props}
    >
      {children && (
        <View {...DefaultGradientStyles.content} {...views?.content}>
          {children}
        </View>
      )}
    </View>
  );
};
