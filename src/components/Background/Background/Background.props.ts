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
   * Overlay color to blend with image
   */
  overlay?: string;

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
    image?: ViewProps;
    overlay?: ViewProps;
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
 * Background styles for customization
 */
export interface BackgroundStyles {
  container?: ViewProps;
  content?: ViewProps;
  aurora?: ViewProps;
  meteors?: ViewProps;
  image?: ViewProps;
  gradient?: ViewProps;
}
