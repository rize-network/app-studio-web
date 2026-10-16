/**
 * GradientView (React Native) – uses `react-native-linear-gradient` for real
 * linear-gradient rendering on native. Radial and conic types are
 * approximated by a linear gradient (RN has no first-class radial/conic
 * primitive without extra libs).
 *
 * `react-native-linear-gradient` is declared as an optional peer dep — if it
 * is not present at runtime, we fall back to the first color stop as a flat
 * backgroundColor.
 */

import React, { useMemo } from 'react';
import { Animated, Easing } from 'react-native';
import { View, useTheme } from 'app-studio';
import { GradientProps } from './Gradient.props';
import { DefaultColorStops, DefaultGradientStyles } from './Gradient.style';

// Optional dep — require lazily so consumers without the lib still get a flat
// color instead of a crash.
let LinearGradient: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = null;
}

// Map a CSS-style direction keyword to the {start, end} points used by
// react-native-linear-gradient (each coord 0..1, origin top-left).
const directionToPoints = (
  direction?: string
): { start: { x: number; y: number }; end: { x: number; y: number } } => {
  switch (direction) {
    case 'to-right':
      return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
    case 'to-left':
      return { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } };
    case 'to-bottom':
      return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
    case 'to-top':
      return { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } };
    case 'to-top-right':
      return { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } };
    case 'to-top-left':
      return { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } };
    case 'to-bottom-right':
      return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    case 'to-bottom-left':
      return { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } };
    default:
      return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
  }
};

// Parse a position string (e.g. "50%", "0.5") into the 0..1 range used by
// react-native-linear-gradient's `locations` prop.
const parsePosition = (
  pos: string | number | undefined,
  fallback: number
): number => {
  if (pos == null) return fallback;
  if (typeof pos === 'number') return pos > 1 ? pos / 100 : pos;
  const trimmed = pos.trim();
  if (trimmed.endsWith('%')) return parseFloat(trimmed) / 100;
  const n = parseFloat(trimmed);
  return Number.isFinite(n) ? (n > 1 ? n / 100 : n) : fallback;
};

const durationMs = (duration?: string | number): number => {
  if (typeof duration === 'number')
    return duration < 100 ? duration * 1000 : duration;
  if (!duration) return 3000;
  const value = String(duration).trim();
  if (value.endsWith('ms')) return parseFloat(value) || 3000;
  if (value.endsWith('s')) return (parseFloat(value) || 3) * 1000;
  const parsed = parseFloat(value);
  return parsed < 100 ? parsed * 1000 : parsed || 3000;
};

const useGradientMotion = (enabled: boolean, duration: number) => {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!enabled) {
      progress.stopAnimation();
      progress.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
        isInteraction: false,
      }),
      { resetBeforeIteration: true }
    );

    animation.start();
    return () => animation.stop();
  }, [duration, enabled, progress]);

  return progress;
};

export const GradientView: React.FC<GradientProps> = ({
  type = 'linear',
  direction = 'to-right',
  from,
  to,
  colors,
  children,
  views,
  themeMode: elementMode,
  // not honoured on native:
  shape: _shape,
  position: _position,
  animate = false,
  animationDuration = 3,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const mode = elementMode ?? themeMode;

  const colorStops = useMemo(() => {
    if (colors && colors.length > 0) return colors;
    if (from && to) {
      return [
        { color: from, position: '0%' },
        { color: to, position: '100%' },
      ];
    }
    return DefaultColorStops[type];
  }, [colors, from, to, type]);

  const resolvedColors = useMemo(
    () =>
      colorStops.map((s) => getColor(s.color, { themeMode: mode }) as string),
    [colorStops, getColor, mode]
  );

  const locations = useMemo(() => {
    const n = colorStops.length;
    if (n <= 1) return undefined;
    const parsed = colorStops.map((s, i) =>
      parsePosition(s.position, i / (n - 1))
    );
    // Ensure monotonic non-decreasing
    for (let i = 1; i < parsed.length; i++) {
      if (parsed[i] < parsed[i - 1]) parsed[i] = parsed[i - 1];
    }
    return parsed;
  }, [colorStops]);

  const points = directionToPoints(direction);
  const animationMs = durationMs(animationDuration);
  const progress = useGradientMotion(
    !!animate && type !== 'conic',
    animationMs
  );

  // No LinearGradient peer present (or conic, which RN can't render) → flat
  // color fallback.
  const useFlatFallback = !LinearGradient || type === 'conic';

  const animatedLayerStyle = useMemo(() => {
    if (!animate) return undefined;

    const translateX = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-40, 40, -40],
    });
    const translateY = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: type === 'radial' ? [-16, 16, -16] : [-10, 10, -10],
    });
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: type === 'radial' ? [1, 1.12, 1] : [1.06, 1.12, 1.06],
    });

    return {
      position: 'absolute' as const,
      top: -48,
      left: -48,
      right: -48,
      bottom: -48,
      transform: [{ translateX }, { translateY }, { scale }],
    };
  }, [animate, progress, type]);

  // IMPORTANT: the size/shape props (`height="100px"`, `width="100%"`,
  // `borderRadius="12px"`, color tokens, …) are app-studio style props, NOT raw
  // RN styles — passing them straight to `LinearGradient`'s `style` makes RN
  // drop `"100px"` and the box collapses to zero height (the gradient "doesn't
  // show"). So we always render an app-studio `<View>` as the sized, clipped
  // container (it runs every prop through `useNativeStyle`) and let
  // `LinearGradient` absolutely fill it.
  return (
    <View
      backgroundColor={
        useFlatFallback ? resolvedColors[0] ?? 'transparent' : undefined
      }
      {...DefaultGradientStyles.container}
      {...views?.container}
      {...props}
    >
      {!useFlatFallback &&
        (animate ? (
          <Animated.View pointerEvents="none" style={animatedLayerStyle}>
            <LinearGradient
              colors={resolvedColors}
              locations={locations}
              start={points.start}
              end={points.end}
              style={{ flex: 1 }}
            />
          </Animated.View>
        ) : (
          <LinearGradient
            colors={resolvedColors}
            locations={locations}
            start={points.start}
            end={points.end}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ))}
      {children && (
        <View {...DefaultGradientStyles.content} {...views?.content}>
          {children}
        </View>
      )}
    </View>
  );
};
