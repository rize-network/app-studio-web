import { ViewProps } from 'app-studio';

/**
 * Background effect types
 */
export type BackgroundEffect =
  | 'aurora'
  | 'meteors'
  | 'particles'
  | 'grid'
  | 'ripples'
  | 'wall'
  | 'image'
  | 'gradient'
  | 'borderMoving'
  | 'animatedStroke';

/**
 * Aurora gradient direction options
 */
export type AuroraDirection = 'horizontal' | 'vertical' | 'diagonal';

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
 * Background image sizing options
 */
export type BackgroundSize = 'auto' | 'cover' | 'contain' | string;

/**
 * Background image positioning options
 */
export type BackgroundPosition =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | string;

/**
 * Background image repeat options
 */
export type BackgroundRepeat =
  | 'repeat'
  | 'repeat-x'
  | 'repeat-y'
  | 'no-repeat'
  | 'space'
  | 'round';

/**
 * CSS blend mode options for overlays
 */
export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion';

/**
 * Background context type for compound components
 */
export interface BackgroundContextType {
  effect?: BackgroundEffect;
  isAnimated?: boolean;
  duration?: number;
}
