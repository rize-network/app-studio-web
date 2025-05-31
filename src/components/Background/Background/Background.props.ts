import { ReactNode } from 'react';
import { ViewProps } from 'app-studio';

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
 * Background styles for customization
 */
export interface BackgroundStyles {
  container?: ViewProps;
  content?: ViewProps;
  aurora?: ViewProps;
  meteors?: ViewProps;
}
