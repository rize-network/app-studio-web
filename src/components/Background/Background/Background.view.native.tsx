import React, { createContext } from 'react';
import { Animated, Easing, useWindowDimensions } from 'react-native';
import { View, useTheme } from 'app-studio';
import {
  BackgroundProps,
  AuroraBackgroundProps,
  MeteorsProps,
  WallProps,
  ParticlesProps,
  GridProps,
  RipplesProps,
  BackgroundImageProps,
  BackgroundVideoProps,
  BackgroundGradientProps,
  BackgroundOverlayProps,
  BackgroundLayoutProps,
} from './Background.props';
import { DefaultBackgroundStyles } from './Background.style';
import { BackgroundContextType } from './Background.type';
import { Gradient } from '../../Gradient/Gradient';

// React Native version of Background. The web effects rely on CSS keyframes,
// mask-images and <canvas>, none of which exist on RN. Here each variant is
// re-implemented with React Native's built-in `Animated` API (looping
// transforms/opacity, native-driver) so the effects actually MOVE without
// depending on react-native-reanimated.

const BackgroundContext = createContext<BackgroundContextType>({});

const DEFAULT_HEIGHT = 200;
const DEFAULT_WIDTH = 360;
const EFFECT_GRADIENT_VIEWS = {
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    zIndex: 1,
    pointerEvents: 'box-none',
  },
} as any;

const isRawColor = (value?: string) =>
  typeof value === 'string' &&
  (/^(#|rgb\(|rgba\(|hsl\(|hsla\()/.test(value) ||
    ['black', 'transparent', 'white'].includes(value));

const useColorResolver = (themeMode?: string) => {
  const theme = useTheme();
  const mode = themeMode ?? theme.themeMode;

  return React.useCallback(
    (value: string | undefined, fallback: string) => {
      if (!value) return fallback;
      if (isRawColor(value)) return value;
      return theme.getColor(value, { themeMode: mode } as any) as string;
    },
    [mode, theme]
  );
};

const durationForSpeed = (
  speed: 'slow' | 'medium' | 'fast' | undefined,
  values: { slow: number; medium: number; fast: number }
) => {
  switch (speed) {
    case 'slow':
      return values.slow;
    case 'fast':
      return values.fast;
    default:
      return values.medium;
  }
};

const phaseProgress = (progress: Animated.Value, phase: number) =>
  Animated.modulo(
    Animated.add(progress as any, phase as any) as any,
    1
  ) as Animated.AnimatedInterpolation<number>;

// A 0→1 value that loops forever. `delay` staggers multiple instances.
const useLoop = (duration: number, delay = 0) => {
  const v = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    v.setValue(0);
    const anim = Animated.loop(
      Animated.timing(v, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
      { resetBeforeIteration: true }
    );
    anim.start();
    return () => anim.stop();
  }, [duration, delay, v]);
  return v;
};

const Layer: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? (
    <View
      position="relative"
      zIndex={2}
      width="100%"
      height="100%"
      pointerEvents={'box-none' as any}
    >
      {children}
    </View>
  ) : null;

// --- Aurora: soft colour blobs drifting over a dark base gradient ---
const AuroraBlob: React.FC<{
  color: string;
  size: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  progress: Animated.Value;
  phase: number;
  opacity?: number;
}> = ({ color, size, left, top, dx, dy, progress, phase, opacity = 0.4 }) => {
  const t = phaseProgress(progress, phase);
  const translateX = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, dx, 0],
  });
  const translateY = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, dy, 0],
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
};

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  showRadialGradient = true,
  views,
  themeMode: elementMode,
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const progress = useLoop(9000);
  const opacity = showRadialGradient ? 0.42 : 0.28;

  return (
    <Gradient
      type="linear"
      direction="to-bottom-right"
      from="color-gray-900"
      to="color-blue-900"
      overflow="hidden"
      width="100%"
      minHeight={200}
      position="relative"
      views={EFFECT_GRADIENT_VIEWS}
      {...(views?.container as any)}
      {...props}
    >
      <AuroraBlob
        color="#3b82f6"
        size={220}
        left={-40}
        top={-40}
        dx={60}
        dy={40}
        progress={progress}
        phase={0}
        opacity={opacity}
      />
      <AuroraBlob
        color="#a855f7"
        size={200}
        left={width - 180}
        top={-20}
        dx={-50}
        dy={50}
        progress={progress}
        phase={0.25}
        opacity={opacity}
      />
      <AuroraBlob
        color="#2dd4bf"
        size={180}
        left={width / 2 - 90}
        top={60}
        dx={40}
        dy={-30}
        progress={progress}
        phase={0.5}
        opacity={opacity}
      />
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Meteors: thin streaks falling diagonally ---
const Meteor: React.FC<{
  left: number;
  progress: Animated.Value;
  phase: number;
}> = ({ left, progress, phase }) => {
  const t = phaseProgress(progress, phase);
  const translateY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 300],
  });
  const translateX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });
  const opacity = t.interpolate({
    inputRange: [0, 0.1, 0.85, 1],
    outputRange: [0, 1, 1, 0],
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left,
        width: 2,
        height: 70,
        borderRadius: 1,
        backgroundColor: '#cbd5e1',
        opacity,
        transform: [{ translateX }, { translateY }, { rotate: '215deg' }],
      }}
    />
  );
};

const Meteors: React.FC<MeteorsProps> = ({
  number = 12,
  children,
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const progress = useLoop(3200);
  const count = Math.max(1, number);
  const meteors = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: 40 + ((i * 97) % (width + 120)),
        phase: i / count,
      })),
    [count, width]
  );
  return (
    <Gradient
      type="linear"
      direction="to-bottom"
      from="color-gray-900"
      to="color-blue-900"
      overflow="hidden"
      width="100%"
      minHeight={200}
      position="relative"
      views={EFFECT_GRADIENT_VIEWS}
      {...props}
    >
      {meteors.map((m, i) => (
        <Meteor key={i} progress={progress} {...m} />
      ))}
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Wall: static soft gradient (no motion on web either) ---
const Wall: React.FC<WallProps> = ({
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  return (
    <Gradient
      type="linear"
      direction="to-bottom"
      from="color-gray-100"
      to="color-gray-50"
      width="100%"
      minHeight={200}
      views={EFFECT_GRADIENT_VIEWS}
      {...props}
    />
  );
};

// --- Particles: small dots rising and fading ---
const Particle: React.FC<{
  left: number;
  bottom: number;
  size: number;
  driftX: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  progress: Animated.Value;
  phase: number;
}> = ({ left, bottom, size, driftX, color, shape, progress, phase }) => {
  const t = phaseProgress(progress, phase);
  const translateX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, driftX],
  });
  const translateY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -190],
  });
  const opacity = t.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 0.9, 0.9, 0],
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        bottom,
        left,
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? size / 2 : 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
};

const defaultParticleColors = [
  'rgb(59, 130, 246)',
  'rgb(147, 51, 234)',
  'rgb(236, 72, 153)',
  'rgb(34, 197, 94)',
  'rgb(251, 146, 60)',
  'rgb(168, 85, 247)',
];

const Particles: React.FC<ParticlesProps> = ({
  children,
  count = 22,
  colors = defaultParticleColors,
  speed = 'medium',
  shapes = ['circle'],
  themeMode: elementMode,
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const resolveColor = useColorResolver(elementMode);
  const resolvedColors = React.useMemo(
    () => colors.map((color) => resolveColor(color, color)),
    [colors, resolveColor]
  );
  const duration = durationForSpeed(speed, {
    slow: 9000,
    medium: 6500,
    fast: 4200,
  });
  const progress = useLoop(duration);
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (i * 83) % Math.max(width, DEFAULT_WIDTH),
        bottom: (i * 37) % 80,
        size: 3 + ((i * 7) % 5),
        driftX: ((i * 53) % 80) - 40,
        color: resolvedColors[i % resolvedColors.length] ?? '#e0e7ff',
        shape: shapes[i % shapes.length] ?? 'circle',
        phase: i / Math.max(1, count),
      })),
    [count, resolvedColors, shapes, width]
  );
  return (
    <Gradient
      type="linear"
      direction="to-bottom-right"
      from="color-gray-900"
      to="color-indigo-900"
      overflow="hidden"
      width="100%"
      minHeight={200}
      position="relative"
      views={EFFECT_GRADIENT_VIEWS}
      {...props}
    >
      {particles.map((p, i) => (
        <Particle key={i} progress={progress} {...p} />
      ))}
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Grid: drawn lines with a slow opacity pulse ---
const Grid: React.FC<GridProps> = ({
  children,
  gridSize = 30,
  lineColor = 'rgba(59, 130, 246, 0.3)',
  pulseColor = 'rgba(59, 130, 246, 0.8)',
  animationSpeed = 'medium',
  themeMode: elementMode,
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const resolveColor = useColorResolver(elementMode);
  const cellSize = Math.max(8, gridSize);
  const canvasWidth = Math.max(width, DEFAULT_WIDTH);
  const duration = durationForSpeed(animationSpeed, {
    slow: 5000,
    medium: 3200,
    fast: 1800,
  });
  const t = useLoop(duration);
  const pulseOpacity = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.08, 0.22, 0.08],
  });
  const pulseTranslateX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-cellSize * 2, canvasWidth],
  });
  const cols = Math.ceil(canvasWidth / cellSize);
  const rows = Math.ceil(DEFAULT_HEIGHT / cellSize);
  const resolvedLineColor = resolveColor(lineColor, lineColor);
  const resolvedPulseColor = resolveColor(pulseColor, pulseColor);

  return (
    <Gradient
      type="linear"
      direction="to-bottom"
      from="color-gray-800"
      to="color-gray-900"
      overflow="hidden"
      width="100%"
      minHeight={200}
      position="relative"
      views={EFFECT_GRADIENT_VIEWS}
      {...props}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <View
          key={`c${i}`}
          pointerEvents="none"
          position="absolute"
          top={0}
          bottom={0}
          left={i * cellSize}
          width={1}
          backgroundColor={resolvedLineColor}
        />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <View
          key={`r${i}`}
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          top={i * cellSize}
          height={1}
          backgroundColor={resolvedLineColor}
        />
      ))}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: cellSize * 2,
          backgroundColor: resolvedPulseColor,
          opacity: pulseOpacity,
          transform: [{ translateX: pulseTranslateX }],
        }}
      />
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Ripples: concentric rings expanding and fading ---
const Ripple: React.FC<{
  size: number;
  color: string;
  progress: Animated.Value;
  phase: number;
}> = ({ size, color, progress, phase }) => {
  const t = phaseProgress(progress, phase);
  const scale = t.interpolate({ inputRange: [0, 1], outputRange: [0.15, 1] });
  const opacity = t.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: color,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
};

const defaultRippleColors = [
  'rgba(59, 130, 246, 0.6)',
  'rgba(147, 51, 234, 0.6)',
  'rgba(236, 72, 153, 0.6)',
  'rgba(34, 197, 94, 0.6)',
];

const Ripples: React.FC<RipplesProps> = ({
  children,
  rippleCount = 4,
  colors = defaultRippleColors,
  maxSize = 220,
  frequency = 3,
  themeMode: elementMode,
  type: _type,
  animate: _animate,
  animationDuration: _animationDuration,
  ...props
}) => {
  const resolveColor = useColorResolver(elementMode);
  const count = Math.max(1, rippleCount);
  const duration = Math.max(2400, frequency * 1000);
  const progress = useLoop(duration);
  const resolvedColors = React.useMemo(
    () => colors.map((color) => resolveColor(color, color)),
    [colors, resolveColor]
  );
  const rings = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        color: resolvedColors[i % resolvedColors.length] ?? '#3b82f6',
        phase: i / count,
      })),
    [count, resolvedColors]
  );

  return (
    <Gradient
      type="linear"
      direction="to-bottom"
      from="color-blue-100"
      to="color-blue-50"
      overflow="hidden"
      width="100%"
      minHeight={200}
      position="relative"
      views={EFFECT_GRADIENT_VIEWS}
      {...props}
    >
      {rings.map((ripple, i) => (
        <Ripple key={i} size={maxSize} progress={progress} {...ripple} />
      ))}
      <Layer>{children}</Layer>
    </Gradient>
  );
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  overlay = null,
  views,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <View {...views?.container} {...props}>
      {overlay}
      {children && <View {...views?.content}>{children}</View>}
    </View>
  );
};

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  children,
  overlay = null,
  views,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <View {...views?.container} {...props}>
      {overlay}
      {children && <View {...views?.content}>{children}</View>}
    </View>
  );
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
  ...gradientProps
}) => {
  return <Gradient {...gradientProps}>{children}</Gradient>;
};

const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({
  backgroundColor = 'color-black-900',
  ...props
}) => {
  return (
    <View
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      backgroundColor={backgroundColor}
      opacity={0.4}
      pointerEvents="none"
      zIndex={1}
      {...props}
    />
  );
};

interface BackgroundViewComponent extends React.FC<BackgroundProps> {
  Aurora: React.FC<AuroraBackgroundProps>;
  Meteors: React.FC<MeteorsProps>;
  Wall: React.FC<WallProps>;
  Particles: React.FC<ParticlesProps>;
  Grid: React.FC<GridProps>;
  Ripples: React.FC<RipplesProps>;
  Image: React.FC<BackgroundImageProps>;
  Video: React.FC<BackgroundVideoProps>;
  Gradient: React.FC<BackgroundGradientProps>;
  Overlay: React.FC<BackgroundOverlayProps>;
  Layout: React.FC<BackgroundLayoutProps>;
}

const BackgroundViewBase: React.FC<BackgroundProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <BackgroundContext.Provider value={{}}>
      <View
        {...DefaultBackgroundStyles.container}
        {...views?.container}
        {...props}
      >
        {children}
      </View>
    </BackgroundContext.Provider>
  );
};

export const BackgroundLayout = React.forwardRef<any, BackgroundLayoutProps>(
  ({ children, views, ...props }, ref) => {
    return (
      <View ref={ref} position="relative" {...views?.container} {...props}>
        <View {...views?.content}>{children}</View>
      </View>
    );
  }
);
BackgroundLayout.displayName = 'Background.Layout';

export const BackgroundView = BackgroundViewBase as BackgroundViewComponent;
BackgroundView.Aurora = AuroraBackground;
BackgroundView.Meteors = Meteors;
BackgroundView.Wall = Wall;
BackgroundView.Particles = Particles;
BackgroundView.Grid = Grid;
BackgroundView.Ripples = Ripples;
BackgroundView.Image = BackgroundImage;
BackgroundView.Video = BackgroundVideo;
BackgroundView.Gradient = BackgroundGradient;
BackgroundView.Overlay = BackgroundOverlay;
BackgroundView.Layout = BackgroundLayout;
