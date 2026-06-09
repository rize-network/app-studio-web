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
  animate: _animate,
  animationDuration: _animationDuration,
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

  // No LinearGradient peer present → flat color fallback.
  if (!LinearGradient || type === 'conic') {
    return (
      <View
        backgroundColor={resolvedColors[0] ?? 'transparent'}
        {...DefaultGradientStyles.container}
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
  }

  return (
    <LinearGradient
      colors={resolvedColors}
      locations={locations}
      start={points.start}
      end={points.end}
      style={[DefaultGradientStyles.container, views?.container, props as any]}
    >
      {children && (
        <View {...DefaultGradientStyles.content} {...views?.content}>
          {children}
        </View>
      )}
    </LinearGradient>
  );
};
