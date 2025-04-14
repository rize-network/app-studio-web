/**
 * Gradient View Component
 *
 * Renders a gradient with various styles and states
 * according to the design guidelines.
 */

import React, { useMemo } from 'react';
import { View } from '../../Layout/View/View';
import { GradientProps } from './Gradient.props';
import {
  DefaultColorStops,
  DefaultGradientStyles,
  GradientAnimations,
  generateGradientString,
} from './Gradient.style';
import { ColorStop } from './Gradient.type';

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
  ...props
}) => {
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
    return generateGradientString(type, colorStops, direction, shape, position);
  }, [type, colorStops, direction, shape, position]);

  // Prepare animation styles if animation is enabled
  const animationStyles = useMemo(() => {
    if (!animate) return {};

    const baseAnimation = GradientAnimations[type];

    return {
      ...baseAnimation,
      animation: baseAnimation.animation.replace('3s', `${animationDuration}s`),
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
