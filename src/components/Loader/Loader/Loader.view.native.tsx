/**
 * LoaderView (React Native) – restores the three web variants (default /
 * dotted / quarter) on native using `react-native-svg` + RN's Animated API.
 *
 * If `react-native-svg` is not installed, we gracefully fall back to RN's
 * built-in <ActivityIndicator/> (no crash).
 */

import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing } from 'react-native';
import { useTheme, View, ViewProps, Center } from 'app-studio';
import { LoaderProps } from '../Loader/Loader.props';
import { DefaultSizes, DefaultSpeeds } from './Loader.style';

interface Props extends LoaderProps {
  views?: {
    container?: ViewProps;
    text?: ViewProps;
  };
}

// Lazy require react-native-svg so consumers without it still get a working
// loader.
let Svg: any = null;
let Circle: any = null;
let Path: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg ?? RNSvg.default;
  Circle = RNSvg.Circle;
  Path = RNSvg.Path;
} catch {
  /* optional peer absent */
}

const isRawCssColor = (value?: string) =>
  typeof value === 'string' &&
  (/^(#|rgb\(|rgba\(|hsl\(|hsla\(|var\()/.test(value) ||
    ['black', 'currentColor', 'inherit', 'transparent', 'white'].includes(
      value
    ));

const useSpinAnim = (durationMs: number) => {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    const loop = Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [durationMs, value]);
  return value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
};

const DefaultSpinner: React.FC<{
  size: number;
  color: string;
  durationMs: number;
}> = ({ size, color, durationMs }) => {
  const rotate = useSpinAnim(durationMs * 8); // 8 frames × interval ≈ full turn
  if (!Svg) {
    return (
      <ActivityIndicator size={size > 24 ? 'large' : 'small'} color={color} />
    );
  }
  return (
    <Animated.View
      style={{ width: size, height: size, transform: [{ rotate }] }}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 12a9 9 0 11-6.219-8.56"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

const Dotted: React.FC<{ size: number; color: string; durationMs: number }> = ({
  size,
  color,
  durationMs,
}) => {
  const rotate = useSpinAnim(durationMs * 8);
  if (!Svg) {
    return (
      <ActivityIndicator size={size > 24 ? 'large' : 'small'} color={color} />
    );
  }
  return (
    <Animated.View
      style={{ width: size, height: size, transform: [{ rotate }] }}
    >
      <Svg width={size} height={size} viewBox="0 0 50 50">
        <Circle cx="10" cy="25" r="4" fill={color} />
        <Circle cx="25" cy="25" r="4" fill={color} />
        <Circle cx="40" cy="25" r="4" fill={color} />
      </Svg>
    </Animated.View>
  );
};

const Quarter: React.FC<{
  size: number;
  color: string;
  durationMs: number;
}> = ({ size, color, durationMs }) => {
  const rotate = useSpinAnim(durationMs * 8);
  if (!Svg) {
    return (
      <ActivityIndicator size={size > 24 ? 'large' : 'small'} color={color} />
    );
  }
  return (
    <Animated.View
      style={{ width: size, height: size, transform: [{ rotate }] }}
    >
      <Svg width={size} height={size} viewBox="0 0 50 50">
        <Circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray="1,10"
        />
      </Svg>
    </Animated.View>
  );
};

const LoaderView: React.FC<Props> = ({
  size,
  children,
  textColor,
  loaderColor,
  type = 'default',
  speed = 'normal',
  textPosition = 'right',
  views,
  ...props
}) => {
  const { getColor } = useTheme();
  const resolveColor = (value?: string) =>
    isRawCssColor(value) ? value : getColor(value || 'theme-loading');
  const finalLoaderColor = resolveColor(
    loaderColor || (props as any).color || 'theme-loading'
  ) as string;
  const finalTextColor = resolveColor(
    textColor || (props as any).color || 'theme-loading'
  );

  const sizeValue =
    typeof size === 'number' ? size : DefaultSizes[size || 'md'];
  const durationMs = DefaultSpeeds[speed];

  const variants = {
    default: (
      <DefaultSpinner
        size={sizeValue}
        color={finalLoaderColor}
        durationMs={durationMs}
      />
    ),
    dotted: (
      <Dotted
        size={sizeValue}
        color={finalLoaderColor}
        durationMs={durationMs}
      />
    ),
    quarter: (
      <Quarter
        size={sizeValue}
        color={finalLoaderColor}
        durationMs={durationMs}
      />
    ),
  };

  return (
    <Center
      gap={10}
      flexDirection={
        textPosition === 'top' || textPosition === 'bottom' ? 'column' : 'row'
      }
      {...props}
      {...views?.container}
    >
      {(textPosition === 'left' || textPosition === 'top') && children && (
        <View color={finalTextColor} {...views?.text}>
          {children}
        </View>
      )}
      {variants[type]}
      {(textPosition === 'right' || textPosition === 'bottom') && children && (
        <View color={finalTextColor} {...views?.text}>
          {children}
        </View>
      )}
    </Center>
  );
};

export default LoaderView;
