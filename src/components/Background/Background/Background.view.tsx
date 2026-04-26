import React, { createContext } from 'react';
import { View, Horizontal } from 'app-studio';
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
import {
  DefaultBackgroundStyles,
  AuroraStyles,
  BackgroundImageStyles,
  BackgroundVideoStyles,
} from './Background.style';
import { BackgroundContextType } from './Background.type';
import { Gradient } from '../../Gradient/Gradient';
// Initializes a React Context to share background-related data across components, though it's currently used with an empty object.
const BackgroundContext = createContext<BackgroundContextType>({});
// Defines the `AuroraBackground` functional component, which renders a dynamically animated aurora-like background effect.
const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  showRadialGradient = true,
  views,
  themeMode: elementMode,
  ...props
}) => {
  // Defines a set of color variables for creating the radial and linear gradients within the aurora effect.
  const gradientColors = {
    white: 'rgba(255,255,255,1)',
    transparent: 'rgba(255,255,255,0)',
  };
  // An array of colors used to generate the repeating linear gradient, creating the vibrant aurora bands.
  const auroraColors = [
    'rgb(59, 130, 246)',
    'rgb(196, 181, 253)',
    'rgb(147, 197, 253)',
    'rgb(221, 214, 254)',
    'rgb(96, 165, 250)',
  ];
  // Calculates the CSS properties for the aurora gradient, combining repeating linear gradients and an optional radial mask.
  const gradientStyle: React.CSSProperties = {
    ...AuroraStyles.gradient,
    backgroundImage: `
      repeating-linear-gradient(100deg, ${auroraColors.join(', ')}),
      repeating-linear-gradient(100deg, ${gradientColors.white} 0%, ${
      gradientColors.white
    } 7%, ${gradientColors.transparent} 10%, ${
      gradientColors.transparent
    } 12%, ${gradientColors.white} 16%)
    `,
    animation: 'aurora 4s ease infinite',
    ...(showRadialGradient
      ? {
          maskImage:
            'radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)',
        }
      : {}),
  };
  return (
    <View {...AuroraStyles.container} {...views?.container} {...props}>
      <View style={gradientStyle} />
      {children}
      <style>
        {`
          @keyframes aurora {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </View>
  );
};
const Meteors: React.FC<MeteorsProps> = ({
  number = 20,
  children,
  ...props
}) => {
  const meteors = Array.from({ length: number }, (_, i) => i);
  return (
    <View
      width="100%"
      height="100%"
      backgroundColor="black"
      position="relative"
      overflow="hidden"
      {...props}
    >
      {meteors.map((idx) => {
        const leftValue = ((idx * 37) % 200) - 100 + 'px';
        const delaySec = 0.2 + ((idx * 13) % 6) * 0.1 + 's';
        const durSec = (1 + ((idx * 7) % 9)) / 2 + 's';
        const target = 300 + ((idx * 17) % 100) + 'px';
        return (
          <View
            key={idx}
            position="absolute"
            top="0px"
            left={leftValue}
            width="2px"
            height="2px"
            borderRadius="9999px"
            backgroundColor="white"
            boxShadow="0 0 0 1px rgba(255, 255, 255, 0.1)"
            transform="rotate(215deg)"
            zIndex={0}
            animate={{
              from: { transform: 'translateX(-100%) translateY(-100%)' },
              to: { transform: `translateX(${target}) translateY(${target})` },
              iterationCount: 'infinite',
              timingFunction: 'linear',
              fillMode: 'forwards',
              duration: durSec,
              delay: delaySec,
            }}
          >
            <View
              position="absolute"
              top="-1px"
              left="-1px"
              width="1px"
              height="1px"
              borderRadius="9999px"
              backgroundColor="white"
              boxShadow="0 10px 0 1px rgba(255, 255, 255, 0.1)"
            />
          </View>
        );
      })}
      {children && (
        <View position="relative" zIndex={1} width="100%" height="100%">
          {children}
        </View>
      )}
    </View>
  );
};
const colors = [
  'rgb(186, 230, 253)',
  'rgb(249, 168, 212)',
  'rgb(134, 239, 172)',
  'rgb(253, 224, 71)',
  'rgb(252, 165, 165)',
  'rgb(216, 180, 254)',
  'rgb(147, 197, 253)',
  'rgb(165, 180, 252)',
  'rgb(196, 181, 253)',
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const Wall: React.FC<WallProps> = ({
  rows = 15,
  cols = 10,
  squareSize = 40,
  ...props
}) => {
  const rowsArray = Array(rows).fill(1);
  const colsArray = Array(cols).fill(1);
  return (
    <View
      padding={16}
      width={400}
      height={300}
      position="relative"
      overflow="hidden"
      backgroundColor="color-gray-50"
      zIndex={0}
      transform="skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)"
      {...props}
    >
      {rowsArray.map((_, i) => (
        <Horizontal key={`row-${i}`} gap={0}>
          {colsArray.map((_, j) => (
            <View
              key={`col-${j}`}
              height={squareSize / 3}
              width={squareSize}
              borderStyle="solid"
              borderColor="color-gray-200"
              borderWidth={0.5}
              backgroundColor="transparent"
              cursor="pointer"
              on={{
                hover: {
                  backgroundColor: getRandomColor(),
                  transition: 'background-color 0.2s ease',
                },
              }}
            />
          ))}
        </Horizontal>
      ))}
    </View>
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
  count = 50,
  colors = defaultParticleColors,
  speed = 'medium',
  shapes = ['circle'],
  ...props
}) => {
  const particles = Array.from({ length: count }, (_, i) => i);
  const getSpeedMultiplier = () => {
    switch (speed) {
      case 'slow':
        return 0.5;
      case 'fast':
        return 2;
      default:
        return 1;
    }
  };
  const getRandomShape = () =>
    shapes[Math.floor(Math.random() * shapes.length)];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  return (
    <View
      width={400}
      height={300}
      position="relative"
      overflow="hidden"
      backgroundColor="color-gray-900"
      {...props}
    >
      {particles.map((idx) => {
        const size = Math.random() * 8 + 4;
        const startX = Math.random() * 400;
        const startY = Math.random() * 300;
        const endX = Math.random() * 400;
        const endY = Math.random() * 300;
        const duration = (Math.random() * 10 + 5) / getSpeedMultiplier();
        const delay = Math.random() * 5;
        const shape = getRandomShape();
        const color = getRandomColor();
        const shapeStyles = {
          circle: { borderRadius: '50%' },
          square: { borderRadius: '2px' },
          triangle: {
            borderRadius: '0',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          },
        };
        return (
          <View
            key={idx}
            position="absolute"
            width={size}
            height={size}
            backgroundColor={color}
            opacity={0.7}
            style={{
              left: startX,
              top: startY,
              ...shapeStyles[shape],
            }}
            animate={{
              from: {
                transform: `translate(0px, 0px) scale(0.5)`,
                opacity: 0,
              },
              to: {
                transform: `translate(${endX - startX}px, ${
                  endY - startY
                }px) scale(1)`,
                opacity: 0.7,
              },
              iterationCount: 'infinite',
              direction: 'alternate',
              timingFunction: 'ease-in-out',
              duration: `${duration}s`,
              delay: `${delay}s`,
            }}
          />
        );
      })}
    </View>
  );
};
const Grid: React.FC<GridProps> = ({
  gridSize = 30,
  lineColor = 'rgba(59, 130, 246, 0.3)',
  pulseColor = 'rgba(59, 130, 246, 0.8)',
  animationSpeed = 'medium',
  ...props
}) => {
  const getSpeedValue = () => {
    switch (animationSpeed) {
      case 'slow':
        return 4;
      case 'fast':
        return 1;
      default:
        return 2;
    }
  };
  const cols = Math.floor(400 / gridSize);
  const rows = Math.floor(300 / gridSize);
  const totalCells = cols * rows;
  const cells = Array.from({ length: totalCells }, (_, i) => i);
  return (
    <View
      width={400}
      height={300}
      position="relative"
      overflow="hidden"
      backgroundColor="color-gray-900"
      {...props}
    >
      {}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <View
          key={`v-line-${i}`}
          position="absolute"
          left={i * gridSize}
          top={0}
          width={1}
          height="100%"
          backgroundColor={lineColor}
        />
      ))}
      {}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <View
          key={`h-line-${i}`}
          position="absolute"
          left={0}
          top={i * gridSize}
          width="100%"
          height={1}
          backgroundColor={lineColor}
        />
      ))}
      {}
      {cells.map((cellIndex) => {
        const col = cellIndex % cols;
        const row = Math.floor(cellIndex / cols);
        const delay = (col + row) * 0.1;
        return (
          <View
            key={cellIndex}
            position="absolute"
            left={col * gridSize + 1}
            top={row * gridSize + 1}
            width={gridSize - 2}
            height={gridSize - 2}
            backgroundColor="transparent"
            animate={{
              from: { backgroundColor: 'transparent' },
              to: { backgroundColor: pulseColor },
              iterationCount: 'infinite',
              direction: 'alternate',
              timingFunction: 'ease-in-out',
              duration: `${getSpeedValue()}s`,
              delay: `${delay}s`,
            }}
          />
        );
      })}
    </View>
  );
};
const defaultRippleColors = [
  'rgba(59, 130, 246, 0.6)',
  'rgba(147, 51, 234, 0.6)',
  'rgba(236, 72, 153, 0.6)',
  'rgba(34, 197, 94, 0.6)',
];
const Ripples: React.FC<RipplesProps> = ({
  rippleCount = 5,
  colors = defaultRippleColors,
  maxSize = 200,
  frequency = 3,
  ...props
}) => {
  const ripples = Array.from({ length: rippleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 400,
    y: Math.random() * 300,
    color: colors[i % colors.length],
    delay: i * (frequency / rippleCount),
    duration: 3 + Math.random() * 2,
  }));
  return (
    <View
      width={400}
      height={300}
      position="relative"
      overflow="hidden"
      backgroundColor="color-gray-100"
      {...props}
    >
      {ripples.map((ripple) => (
        <View
          key={ripple.id}
          position="absolute"
          width={20}
          height={20}
          borderRadius="50%"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            border: `2px solid ${ripple.color}`,
            backgroundColor: 'transparent',
          }}
          animate={{
            from: {
              transform: 'scale(0)',
              opacity: 1,
            },
            to: {
              transform: `scale(${maxSize / 20})`,
              opacity: 0,
            },
            iterationCount: 'infinite',
            timingFunction: 'ease-out',
            duration: `${ripple.duration}s`,
            delay: `${ripple.delay}s`,
          }}
        />
      ))}
      {}
      {ripples.map((ripple) => (
        <View
          key={`secondary-${ripple.id}`}
          position="absolute"
          width={10}
          height={10}
          borderRadius="50%"
          style={{
            left: ripple.x - 5,
            top: ripple.y - 5,
            backgroundColor: ripple.color,
          }}
          animate={{
            from: {
              transform: 'scale(1)',
              opacity: 0.8,
            },
            to: {
              transform: `scale(${maxSize / 40})`,
              opacity: 0,
            },
            iterationCount: 'infinite',
            timingFunction: 'ease-out',
            duration: `${ripple.duration * 1.2}s`,
            delay: `${ripple.delay + 0.5}s`,
          }}
        />
      ))}
    </View>
  );
};
const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  src,
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  backgroundRepeat = 'no-repeat',
  backgroundAttachment = 'scroll',
  imageOpacity = 1,
  overlay = null,
  blendMode = 'normal',
  views,
  themeMode: elementMode,
  ...props
}) => {
  const imageStyle: React.CSSProperties = {
    ...BackgroundImageStyles.image,
    backgroundImage: `url(${src})`,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundAttachment,
    opacity: imageOpacity,
  };
  return (
    <View {...BackgroundImageStyles.container} {...views?.container} {...props}>
      <View style={imageStyle} {...views?.image} />
      {overlay}
      {children && (
        <View {...BackgroundImageStyles.content} {...views?.content}>
          {children}
        </View>
      )}
    </View>
  );
};
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  children,
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  overlay = null,
  blendMode = 'normal',
  views,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <View {...BackgroundVideoStyles.container} {...views?.container} {...props}>
      <View
        as="video"
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        style={BackgroundVideoStyles.video as React.CSSProperties}
        {...views?.video}
      />
      {overlay}
      {children && (
        <View {...BackgroundVideoStyles.content} {...views?.content}>
          {children}
        </View>
      )}
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
  contentPosition,
  backgroundColor = 'color-black-900',
  ...props
}) => {
  const getDefaultOverlay = () => {
    let ligthBackground = `${backgroundColor}-100`;
    let darkBackground = `${backgroundColor}-900`;
    let midBackground = `${backgroundColor}-600`;
    let midDarkBackground = `${backgroundColor}-400`;
    if (backgroundColor.indexOf('-') === -1) {
      ligthBackground = `color-mix(in srgb, ${backgroundColor} 10%, transparent)`;
      darkBackground = `color-mix(in srgb, ${backgroundColor} 90%, transparent)`;
      midBackground = `color-mix(in srgb, ${backgroundColor} 70%, transparent)`;
      midDarkBackground = `color-mix(in srgb, ${backgroundColor} 50%, transparent)`;
    }
    switch (contentPosition) {
      case 'left':
        return `radial-gradient(circle at 70% 50%, ${ligthBackground} 0%, ${ligthBackground} 100%), linear-gradient(to right, ${darkBackground} 0%, ${midBackground} 65%, ${ligthBackground} 100%)`;
      case 'right':
        return `radial-gradient(circle at 30% 50%, ${ligthBackground} 0%, ${ligthBackground} 100%), linear-gradient(to left, ${darkBackground} 0%, ${midBackground} 65%, ${ligthBackground} 100%)`;
      case 'top':
        return `radial-gradient(circle at 50% 40%, ${ligthBackground} 0%, ${ligthBackground} 100%), linear-gradient(to bottom, ${darkBackground} 0%, ${midBackground} 60%, ${ligthBackground} 100%)`;
      case 'bottom':
        return `radial-gradient(circle at 50% 60%, ${ligthBackground} 0%, ${ligthBackground} 100%), linear-gradient(to top, ${darkBackground} 0%, ${midBackground} 60%, ${ligthBackground} 100%)`;
      case 'center':
        return `radial-gradient(circle at 50% 70%, ${darkBackground} 0%, ${ligthBackground} 100%)`;
      default:
        return midDarkBackground;
    }
  };
  const background = getDefaultOverlay();
  return (
    <View
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      background={background}
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
export const BackgroundLayout = React.forwardRef<
  HTMLDivElement,
  BackgroundLayoutProps
>(
  (
    {
      children,
      designProps,
      shape = 'rounded',
      decorationRotation = 5,
      decorationScale = 1,
      decorationOpacity = 0.8,
      views,
      ...props
    },
    ref
  ) => {
    const getBorderRadius = (shape: string) => {
      switch (shape) {
        case 'square':
          return '0px';
        case 'pill':
          return '9999px';
        case 'rounded':
        default:
          return '16px';
      }
    };
    const radius = getBorderRadius(shape);
    const rotationRad = Math.abs(decorationRotation) * (Math.PI / 180);
    const rotationOffset = Math.sin(rotationRad) * 100;
    const scaleOffset = ((decorationScale - 1) * 100) / 2;
    const extraPadding = Math.ceil(rotationOffset + scaleOffset);
    const backgroundColor = props.backgroundColor ?? 'theme-primary';
    return (
      <View
        {...props}
        ref={ref}
        backgroundColor={'transparent'}
        position="relative"
        overflow="visible"
        {...views?.container}
      >
        <View
          padding={props.padding ?? `${96 + extraPadding}px ${extraPadding}px`}
          position="relative"
          overflow="visible"
        >
          <View
            position="absolute"
            top={extraPadding}
            left={extraPadding}
            right={extraPadding}
            bottom={extraPadding}
            backgroundColor={backgroundColor}
            borderRadius={radius}
            opacity={decorationOpacity / 1.5}
            transform={`scale(${decorationScale})`}
            pointerEvents="none"
            zIndex={1}
            {...views?.back}
          />
          <View
            position="absolute"
            top={extraPadding}
            left={extraPadding}
            right={extraPadding}
            bottom={extraPadding}
            transform={`rotate(${decorationRotation}deg) scale(${decorationScale})`}
            opacity={decorationOpacity / 1.2}
            backgroundColor={backgroundColor}
            borderRadius={radius}
            pointerEvents="none"
            zIndex={2}
            {...views?.front}
          />
          <View
            margin="0 auto"
            position="relative"
            zIndex={3}
            {...views?.content}
          >
            {children}
          </View>
        </View>
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
