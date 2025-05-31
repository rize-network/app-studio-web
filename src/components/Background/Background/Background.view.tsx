import React, { createContext } from 'react';
import { View, Horizontal } from 'app-studio';
import {
  BackgroundProps,
  AuroraBackgroundProps,
  MeteorsProps,
  WallProps,
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
 * Main Background View Component with compound pattern
 */
interface BackgroundViewComponent extends React.FC<BackgroundProps> {
  Aurora: React.FC<AuroraBackgroundProps>;
  Meteors: React.FC<MeteorsProps>;
  Wall: React.FC<WallProps>;
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
