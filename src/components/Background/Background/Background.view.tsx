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
} from './Background.props';
import { DefaultBackgroundStyles, AuroraStyles } from './Background.style';
import { BackgroundContextType } from './Background.type';

// Background Context
const BackgroundContext = createContext<BackgroundContextType>({});

/**
 * Aurora Background Component
 */
const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  showRadialGradient = true,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const gradientColors = {
    white: 'rgba(255,255,255,1)',
    transparent: 'rgba(255,255,255,0)',
  };

  const auroraColors = [
    'rgb(59, 130, 246)', // blue-500
    'rgb(196, 181, 253)', // indigo-300
    'rgb(147, 197, 253)', // blue-300
    'rgb(221, 214, 254)', // violet-200
    'rgb(96, 165, 250)', // blue-400
  ];

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

/**
 * Meteors Component
 */
const Meteors: React.FC<MeteorsProps> = ({ number = 20, ...props }) => {
  const meteors = Array.from({ length: number }, (_, i) => i);

  return (
    <View
      widthHeight={300}
      backgroundColor="black"
      position="relative"
      {...props}
    >
      {meteors.map((idx) => {
        const leftValue = Math.floor(Math.random() * 300 - 100) + 'px';
        const delaySec = Math.random() * (0.8 - 0.2) + 0.2 + 's';
        const durSec = Math.floor(Math.random() * (10 - 2) + 1) / 2 + 's';
        const target = 300 + Math.floor(Math.random() * 100) + 'px';

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
    </View>
  );
};

/**
 * Wall Component
 */
const colors = [
  'rgb(186, 230, 253)', // sky-300
  'rgb(249, 168, 212)', // pink-300
  'rgb(134, 239, 172)', // green-300
  'rgb(253, 224, 71)', // yellow-300
  'rgb(252, 165, 165)', // red-300
  'rgb(216, 180, 254)', // purple-300
  'rgb(147, 197, 253)', // blue-300
  'rgb(165, 180, 252)', // indigo-300
  'rgb(196, 181, 253)', // violet-300
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
      backgroundColor="color.gray.50"
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
              borderColor="color.gray.200"
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

/**
 * Particles Component
 */
const defaultParticleColors = [
  'rgb(59, 130, 246)', // blue-500
  'rgb(147, 51, 234)', // purple-600
  'rgb(236, 72, 153)', // pink-500
  'rgb(34, 197, 94)', // green-500
  'rgb(251, 146, 60)', // orange-400
  'rgb(168, 85, 247)', // violet-500
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
      backgroundColor="color.gray.900"
      {...props}
    >
      {particles.map((idx) => {
        const size = Math.random() * 8 + 4; // 4-12px
        const startX = Math.random() * 400;
        const startY = Math.random() * 300;
        const endX = Math.random() * 400;
        const endY = Math.random() * 300;
        const duration = (Math.random() * 10 + 5) / getSpeedMultiplier(); // 5-15s adjusted by speed
        const delay = Math.random() * 5; // 0-5s delay
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

/**
 * Grid Component
 */
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
      backgroundColor="color.gray.900"
      {...props}
    >
      {/* Vertical lines */}
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

      {/* Horizontal lines */}
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

      {/* Pulsing cells */}
      {cells.map((cellIndex) => {
        const col = cellIndex % cols;
        const row = Math.floor(cellIndex / cols);
        const delay = (col + row) * 0.1; // Diagonal wave effect

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

/**
 * Ripples Component
 */
const defaultRippleColors = [
  'rgba(59, 130, 246, 0.6)', // blue-500
  'rgba(147, 51, 234, 0.6)', // purple-600
  'rgba(236, 72, 153, 0.6)', // pink-500
  'rgba(34, 197, 94, 0.6)', // green-500
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
    duration: 3 + Math.random() * 2, // 3-5 seconds
  }));

  return (
    <View
      width={400}
      height={300}
      position="relative"
      overflow="hidden"
      backgroundColor="color.gray.100"
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

      {/* Add secondary ripples for more complex effect */}
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

/**
 * Main Background View Component with compound pattern
 */
interface BackgroundViewComponent extends React.FC<BackgroundProps> {
  Aurora: React.FC<AuroraBackgroundProps>;
  Meteors: React.FC<MeteorsProps>;
  Wall: React.FC<WallProps>;
  Particles: React.FC<ParticlesProps>;
  Grid: React.FC<GridProps>;
  Ripples: React.FC<RipplesProps>;
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

// Create the compound component
export const BackgroundView = BackgroundViewBase as BackgroundViewComponent;

// Attach compound components
BackgroundView.Aurora = AuroraBackground;
BackgroundView.Meteors = Meteors;
BackgroundView.Wall = Wall;
BackgroundView.Particles = Particles;
BackgroundView.Grid = Grid;
BackgroundView.Ripples = Ripples;
