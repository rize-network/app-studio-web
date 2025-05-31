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
 * Background styles for customization
 */
export interface BackgroundStyles {
  container?: ViewProps;
  content?: ViewProps;
  aurora?: ViewProps;
  meteors?: ViewProps;
}
