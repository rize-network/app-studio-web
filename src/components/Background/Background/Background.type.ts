import { ViewProps } from 'app-studio';

/**
 * Background effect types
 */
export type BackgroundEffect = 
  | 'aurora' 
  | 'meteors' 
  | 'borderMoving' 
  | 'animatedStroke';

/**
 * Aurora gradient direction options
 */
export type AuroraDirection = 
  | 'horizontal' 
  | 'vertical' 
  | 'diagonal';

/**
 * Meteor animation timing options
 */
export type MeteorTiming = {
  delay: string;
  duration: string;
  target: string;
};

/**
 * Border animation styles
 */
export type BorderAnimationStyles = {
  container?: ViewProps;
  svg?: ViewProps;
  button?: ViewProps;
};

/**
 * Stroke animation styles
 */
export type StrokeAnimationStyles = {
  container?: ViewProps;
  svg?: ViewProps;
  rect?: ViewProps;
  text?: ViewProps;
};

/**
 * Background context type for compound components
 */
export interface BackgroundContextType {
  effect?: BackgroundEffect;
  isAnimated?: boolean;
  duration?: number;
}
