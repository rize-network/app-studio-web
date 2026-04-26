import React, { useMemo } from 'react';
import { View } from 'app-studio';
import { GradientProps } from './Gradient.props';
import {
  DefaultColorStops,
  DefaultGradientStyles,
  GradientAnimations,
  generateGradientString,
} from './Gradient.style';
// Defines the GradientView functional component which renders a customizable gradient. It accepts various props to control the gradient's appearance, animation, and content.
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
  // Memoizes the array of color stops used to define the gradient. It prioritizes the 'colors' prop, then generates from 'from' and 'to' props, falling back to default color stops based on the gradient type.
  const colorStops = useMemo(() => {
    if (colors && colors.length > 0) {
      return colors;
    }
    if (from && to) {
      return [
        { color: from, position: '0%' },
        { color: to, position: '100%' },
      ];
    }
    return DefaultColorStops[type];
  }, [colors, from, to, type]);
  // Memoizes the CSS gradient string (e.g., `linear-gradient(...)` or `radial-gradient(...)`). It constructs this string using the processed color stops, gradient type, direction, shape, and position.
  const gradientString = useMemo(() => {
    const processedColorStops = colorStops.map((stop) => ({
      ...stop,
      color: stop.color,
    }));
    return generateGradientString(
      type,
      processedColorStops,
      direction,
      shape,
      position
    );
  }, [type, colorStops, direction, shape, position]);
  // Memoizes the CSS styles required for gradient animation. If 'animate' is true, it applies base animation styles from `GradientAnimations`, adjusting transition duration and iteration count based on component props.
  const animationStyles = useMemo(() => {
    if (!animate) return {};
    const baseAnimation = GradientAnimations[type];
    return {
      ...baseAnimation,
      transition: baseAnimation.transition.replace(
        '3s',
        `${animationDuration}s`
      ),
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
