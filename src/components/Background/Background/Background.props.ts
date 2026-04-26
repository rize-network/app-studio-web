import { ReactNode } from 'react';
import { ViewProps } from 'app-studio';
import { GradientProps } from '../../Gradient/Gradient/Gradient.props';
import {
  BackgroundSize,
  BackgroundPosition,
  BackgroundRepeat,
  BlendMode,
} from './Background.type';
export interface BackgroundProps extends ViewProps {
  // Optional React nodes to be rendered as children within the Background component.
  children?: ReactNode;
  // Optional styling properties for specific sub-components of the background.
  views?: {
    // Optional styling properties for the primary container of the background.
    container?: ViewProps;
    // Optional styling properties for the content area within the background.
    content?: ViewProps;
  };
  // Specifies the theme mode ('light' or 'dark') to apply to the background.
  themeMode?: 'light' | 'dark';
  // Defines the overall shape of the background component.
  shape?: 'square' | 'rounded' | 'pill';
  // Controls the rotation angle of any decorative elements.
  decorationRotation?: number;
  // Adjusts the scale factor of any decorative elements.
  decorationScale?: number;
  // Sets the opacity level for any decorative elements.
  decorationOpacity?: number;
}
export interface BackgroundLayoutProps extends BackgroundProps {
  // Overrides or specifies the shape for the background layout component.
  shape?: 'square' | 'rounded' | 'pill';
  // Optional styling properties for specific sub-components within the background layout.
  views?: {
    // Optional styling properties for the main container of the layout.
    container?: ViewProps;
    // Optional styling properties for the content area of the layout.
    content?: ViewProps;
    // Optional styling properties for the back layer of the layout.
    back?: ViewProps;
    // Optional styling properties for the front layer of the layout.
    front?: ViewProps;
  };
}
export interface AuroraBackgroundProps extends BackgroundProps {
  // Determines whether a radial gradient should be displayed for the Aurora background effect.
  showRadialGradient?: boolean;
}
export interface MeteorsProps extends ViewProps {
  // Specifies the number of meteor particles to render.
  number?: number;
  // Optional React nodes to be rendered alongside the meteor effect.
  children?: ReactNode;
}
export interface WallProps extends ViewProps {
  // Defines the number of rows for the wall grid background.
  rows?: number;
  // Defines the number of columns for the wall grid background.
  cols?: number;
  // Sets the size of each square cell in the wall grid.
  squareSize?: number;
}
export interface ParticlesProps extends Omit<ViewProps, 'colors'> {
  // Specifies the total number of particles to be rendered.
  count?: number;
  // An array of color strings to be used for the particles.
  colors?: string[];
  // Sets the animation speed for the particles.
  speed?: 'slow' | 'medium' | 'fast';
  // An array of shapes ('circle', 'square', 'triangle') that particles can adopt.
  shapes?: ('circle' | 'square' | 'triangle')[];
}
export interface GridProps extends ViewProps {
  // Defines the size of each grid cell in pixels.
  gridSize?: number;
  // Specifies the color of the grid lines.
  lineColor?: string;
  // Specifies the color for the pulsing effect on grid lines.
  pulseColor?: string;
  // Sets the animation speed for grid-related effects.
  animationSpeed?: 'slow' | 'medium' | 'fast';
}
export interface RipplesProps extends Omit<ViewProps, 'colors'> {
  // Determines the number of ripple effects to display.
  rippleCount?: number;
  // An array of color strings to be used for the ripples.
  colors?: string[];
  // Sets the maximum size a ripple can expand to.
  maxSize?: number;
  // Controls how frequently new ripples are generated.
  frequency?: number;
}
export interface BackgroundImageProps
  extends Omit<BackgroundProps, 'position'> {
  // The URL or path to the background image source.
  src: string;
  // Controls the sizing of the background image.
  backgroundSize?: BackgroundSize;
  // Sets the initial positioning of the background image.
  backgroundPosition?: BackgroundPosition;
  // Determines if and how the background image repeats.
  backgroundRepeat?: BackgroundRepeat;
  // Controls whether the background image scrolls with its container or is fixed.
  backgroundAttachment?: 'scroll' | 'fixed' | 'local';
  // Sets the transparency level of the background image.
  imageOpacity?: number;
  // Specifies the blend mode for the background image with other layers.
  blendMode?: BlendMode;
  // Optional React nodes to be rendered as an overlay on top of the image.
  overlay?: ReactNode;
  // Optional styling properties for specific sub-components within the background image.
  views?: {
    // Optional styling properties for the main container of the image background.
    container?: ViewProps;
    // Optional styling properties for the content area of the image background.
    content?: ViewProps;
    // Optional styling properties for the image element itself.
    image?: ViewProps;
  };
}
export interface BackgroundVideoProps
  extends Omit<BackgroundProps, 'position'> {
  // The URL or path to the background video source.
  src: string;
  // A boolean to control whether the video should autoplay.
  autoPlay?: boolean;
  // A boolean to control whether the video should loop continuously.
  loop?: boolean;
  // A boolean to control whether the video's audio is muted.
  muted?: boolean;
  // A boolean to control whether the video plays inline on iOS devices.
  playsInline?: boolean;
  // Optional React nodes to be rendered as an overlay on top of the video.
  overlay?: ReactNode;
  // Specifies the blend mode for the background video with other layers.
  blendMode?: BlendMode;
  // Optional styling properties for specific sub-components within the background video.
  views?: {
    // Optional styling properties for the main container of the video background.
    container?: ViewProps;
    // Optional styling properties for the content area of the video background.
    content?: ViewProps;
    // Optional styling properties for the video element itself.
    video?: ViewProps;
  };
}
// Interface for gradient background properties, inheriting all specifications from GradientProps.
export interface BackgroundGradientProps extends GradientProps {}
export interface BackgroundOverlayProps extends ViewProps {
  // Specifies the alignment of content within the overlay.
  contentPosition?: 'left' | 'right' | 'center' | 'bottom' | 'top';
}
export interface BackgroundStyles {
  // Optional styling properties for the main container of the background component.
  container?: ViewProps;
  // Optional styling properties for the content area of the background component.
  content?: ViewProps;
  // Optional styling properties specifically for the Aurora effect.
  aurora?: ViewProps;
  // Optional styling properties specifically for the Meteors effect.
  meteors?: ViewProps;
  // Optional styling properties specifically for the Image background.
  image?: ViewProps;
  // Optional styling properties specifically for the Video background.
  video?: ViewProps;
  // Optional styling properties specifically for the Gradient background.
  gradient?: ViewProps;
}
