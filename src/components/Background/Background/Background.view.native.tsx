import React, { createContext } from 'react';
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

// React Native version of Background. Most of the web background variants
// (Aurora, Meteors, Wall, Particles, Grid, Ripples) rely on CSS gradients,
// keyframe animations, mask-images and video tags that have no equivalent on
// RN. We render simplified, animation-less placeholders so the component tree
// at least mounts cleanly. Apps wanting these effects on native should swap
// in dedicated implementations.

const BackgroundContext = createContext<BackgroundContextType>({});

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  views,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <View
      backgroundColor="color-gray-900"
      overflow="hidden"
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

const Meteors: React.FC<MeteorsProps> = ({ children, ...props }) => {
  return (
    <View
      width="100%"
      height="100%"
      backgroundColor="black"
      position="relative"
      overflow="hidden"
      {...props}
    >
      {children && (
        <View position="relative" zIndex={1} width="100%" height="100%">
          {children}
        </View>
      )}
    </View>
  );
};

const Wall: React.FC<WallProps> = ({ ...props }) => {
  return (
    <View width={400} height={300} backgroundColor="color-gray-50" {...props} />
  );
};

const Particles: React.FC<ParticlesProps> = ({ ...props }) => {
  return (
    <View
      width={400}
      height={300}
      backgroundColor="color-gray-900"
      {...props}
    />
  );
};

const Grid: React.FC<GridProps> = ({ ...props }) => {
  return (
    <View
      width={400}
      height={300}
      backgroundColor="color-gray-900"
      {...props}
    />
  );
};

const Ripples: React.FC<RipplesProps> = ({ ...props }) => {
  return (
    <View
      width={400}
      height={300}
      backgroundColor="color-gray-100"
      {...props}
    />
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
