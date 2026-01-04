import { ReactNode } from 'react';
import { ViewProps } from 'app-studio';
import { GradientProps } from '../../Gradient/Gradient/Gradient.props';
import {
  BackgroundSize,
  BackgroundPosition,
  BackgroundRepeat,
  BlendMode,
} from './Background.type';

/**
 * Base Background component props
 */
export interface BackgroundProps extends ViewProps {
  children?: ReactNode;
  views?: {
    container?: ViewProps;
    content?: ViewProps;
  };
  themeMode?: 'light' | 'dark';
  shape?: 'square' | 'rounded' | 'pill';
  decorationRotation?: number;
  decorationScale?: number;
  decorationOpacity?: number;
}

export interface BackgroundLayoutProps extends BackgroundProps {
  shape?: 'square' | 'rounded' | 'pill';
  views?: {
    container?: ViewProps;
    content?: ViewProps;
    back?: ViewProps;
    front?: ViewProps;
  };
}

/**
 * Aurora Background component props
 */
export interface AuroraBackgroundProps extends BackgroundProps {
  showRadialGradient?: boolean;
}

/**
 * Meteors component props
 */
export interface MeteorsProps extends ViewProps {
  number?: number;
  children?: ReactNode;
}

/**
 * Wall component props
 */
export interface WallProps extends ViewProps {
  rows?: number;
  cols?: number;
  squareSize?: number;
}

/**
 * Particles component props
 */
export interface ParticlesProps extends Omit<ViewProps, 'colors'> {
  count?: number;
  colors?: string[];
  speed?: 'slow' | 'medium' | 'fast';
  shapes?: ('circle' | 'square' | 'triangle')[];
}

/**
 * Grid component props
 */
export interface GridProps extends ViewProps {
  gridSize?: number;
  lineColor?: string;
  pulseColor?: string;
  animationSpeed?: 'slow' | 'medium' | 'fast';
}

/**
 * Ripples component props
 */
export interface RipplesProps extends Omit<ViewProps, 'colors'> {
  rippleCount?: number;
  colors?: string[];
  maxSize?: number;
  frequency?: number;
}

/**
 * Background Image component props
 */
export interface BackgroundImageProps
  extends Omit<BackgroundProps, 'position'> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Background size
   * @default 'cover'
   */
  backgroundSize?: BackgroundSize;

  /**
   * Background position
   * @default 'center'
   */
  backgroundPosition?: BackgroundPosition;

  /**
   * Background repeat
   * @default 'no-repeat'
   */
  backgroundRepeat?: BackgroundRepeat;

  /**
   * Background attachment
   * @default 'scroll'
   */
  backgroundAttachment?: 'scroll' | 'fixed' | 'local';

  /**
   * Image opacity
   * @default 1
   */
  imageOpacity?: number;

  /**
   * Blend mode for overlay
   * @default 'normal'
   */
  blendMode?: BlendMode;

  /**
   * Overlay content
   */
  overlay?: ReactNode;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    content?: ViewProps;
    image?: ViewProps;
  };
}

/**
 * Background Video component props
 */
export interface BackgroundVideoProps
  extends Omit<BackgroundProps, 'position'> {
  /**
   * Video source URL
   */
  src: string;

  /**
   * Whether the video should autoplay
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Whether the video should loop
   * @default true
   */
  loop?: boolean;

  /**
   * Whether the video should be muted
   * @default true
   */
  muted?: boolean;

  /**
   * Use inline playback on mobile
   * @default true
   */
  playsInline?: boolean;

  /**
   * Overlay color to blend with video
   */
  overlay?: ReactNode;

  /**
   * Blend mode for overlay
   * @default 'normal'
   */
  blendMode?: BlendMode;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    content?: ViewProps;
    video?: ViewProps;
  };
}

/**
 * Background Gradient component props
 * Extends GradientProps and adds Background-specific functionality
 */
export interface BackgroundGradientProps extends GradientProps {
  // All gradient props are inherited from GradientProps
}

/**
 * Background Overlay component props
 */
export interface BackgroundOverlayProps extends ViewProps {
  /**
   * Position of the content relative to the overlay
   * @default 'center'
   */
  contentPosition?: 'left' | 'right' | 'center' | 'bottom' | 'top';
}

/**
 * Background styles for customization
 */
export interface BackgroundStyles {
  container?: ViewProps;
  content?: ViewProps;
  aurora?: ViewProps;
  meteors?: ViewProps;
  image?: ViewProps;
  video?: ViewProps;
  gradient?: ViewProps;
}
