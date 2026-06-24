import React, { createContext } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { View } from 'app-studio';
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

const SCREEN = Dimensions.get('window');

// A 0→1 value that loops forever. `delay` staggers multiple instances.
const useLoop = (duration: number, delay = 0) => {
  const v = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(v, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
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
      pointerEvents="box-none"
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
  duration: number;
  delay: number;
}> = ({ color, size, left, top, dx, dy, duration, delay }) => {
  const t = useLoop(duration, delay);
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
        opacity: 0.4,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
};

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  views,
  themeMode: elementMode,
  ...props
}) => {
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
      {...views?.container}
      {...props}
    >
      <AuroraBlob
        color="#3b82f6"
        size={220}
        left={-40}
        top={-40}
        dx={60}
        dy={40}
        duration={6000}
        delay={0}
      />
      <AuroraBlob
        color="#a855f7"
        size={200}
        left={SCREEN.width - 180}
        top={-20}
        dx={-50}
        dy={50}
        duration={7500}
        delay={500}
      />
      <AuroraBlob
        color="#2dd4bf"
        size={180}
        left={SCREEN.width / 2 - 90}
        top={60}
        dx={40}
        dy={-30}
        duration={9000}
        delay={1000}
      />
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Meteors: thin streaks falling diagonally ---
const Meteor: React.FC<{ left: number; duration: number; delay: number }> = ({
  left,
  duration,
  delay,
}) => {
  const t = useLoop(duration, delay);
  const translateY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 260],
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

const Meteors: React.FC<MeteorsProps> = ({ children, ...props }) => {
  const count = 12;
  const meteors = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: 40 + ((i * 97) % (SCREEN.width + 120)),
        duration: 2200 + ((i * 313) % 1800),
        delay: (i * 350) % 3000,
      })),
    []
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
      {...props}
    >
      {meteors.map((m, i) => (
        <Meteor key={i} {...m} />
      ))}
      <Layer>{children}</Layer>
    </Gradient>
  );
};

// --- Wall: static soft gradient (no motion on web either) ---
const Wall: React.FC<WallProps> = ({ ...props }) => {
  return (
    <Gradient
      type="linear"
      direction="to-bottom"
      from="color-gray-100"
      to="color-gray-50"
      width="100%"
      minHeight={200}
      {...props}
    />
  );
};

// --- Particles: small dots rising and fading ---
const Particle: React.FC<{
  left: number;
  size: number;
  duration: number;
  delay: number;
}> = ({ left, size, duration, delay }) => {
  const t = useLoop(duration, delay);
  const translateY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -180],
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
        bottom: 0,
        left,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#e0e7ff',
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
};

const Particles: React.FC<ParticlesProps> = ({ ...props }) => {
  const count = 22;
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (i * 83) % SCREEN.width,
        size: 3 + ((i * 7) % 4),
        duration: 4000 + ((i * 271) % 3000),
        delay: (i * 220) % 4000,
      })),
    []
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
      {...props}
    >
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </Gradient>
  );
};

// --- Grid: drawn lines with a slow opacity pulse ---
const Grid: React.FC<GridProps> = ({ ...props }) => {
  const t = useLoop(4000, 0);
  const opacity = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.15, 0.4, 0.15],
  });
  const cols = Math.ceil(SCREEN.width / 40);
  const rows = 6;
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
      {...props}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Animated.View
          key={`c${i}`}
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: i * 40,
            width: 1,
            backgroundColor: '#64748b',
            opacity,
          }}
        />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <Animated.View
          key={`r${i}`}
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: i * 40,
            height: 1,
            backgroundColor: '#64748b',
            opacity,
          }}
        />
      ))}
    </Gradient>
  );
};

// --- Ripples: concentric rings expanding and fading ---
const Ripple: React.FC<{ size: number; duration: number; delay: number }> = ({
  size,
  duration,
  delay,
}) => {
  const t = useLoop(duration, delay);
  const scale = t.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1.4] });
  const opacity = t.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        width: size,
        height: size,
        marginTop: -size / 2,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#3b82f6',
        opacity,
        transform: [{ scale }],
      }}
    />
  );
};

const Ripples: React.FC<RipplesProps> = ({ ...props }) => {
  const rings = [0, 1, 2, 3];
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
      {...props}
    >
      {rings.map((i) => (
        <Ripple key={i} size={160} duration={3200} delay={i * 800} />
      ))}
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
