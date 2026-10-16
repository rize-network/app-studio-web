import { ViewProps } from 'app-studio';
// Defines the possible visual effects that can be applied to the background component.
export type BackgroundEffect =
  | 'aurora'
  | 'meteors'
  | 'particles'
  | 'grid'
  | 'ripples'
  | 'wall'
  | 'image'
  | 'video'
  | 'gradient'
  | 'borderMoving'
  | 'animatedStroke';
// Specifies the allowed directions for the 'aurora' background effect.
export type AuroraDirection = 'horizontal' | 'vertical' | 'diagonal';
// Defines the timing parameters for the 'meteors' background effect.
export type MeteorTiming = {
  // Specifies the delay before a meteor animation starts.
  delay: string;
  // Indicates the duration of a meteor animation.
  duration: string;
  // Defines the target element or area for the meteor effect.
  target: string;
};
// Specifies optional style properties for various parts of a border animation.
export type BorderAnimationStyles = {
  // Styling properties for the main container element.
  container?: ViewProps;
  // Styling properties for the SVG element within the animation.
  svg?: ViewProps;
  // Styling properties for a button element within the animation, if applicable.
  button?: ViewProps;
};
// Specifies optional style properties for different elements involved in a stroke animation.
export type StrokeAnimationStyles = {
  // Styling properties for the main container of the stroke animation.
  container?: ViewProps;
  // Styling properties for the SVG element used in the stroke animation.
  svg?: ViewProps;
  // Styling properties for a rectangle element within the stroke animation.
  rect?: ViewProps;
  // Styling properties for text elements in the stroke animation.
  text?: ViewProps;
};
// Defines accepted values for controlling the size of a background element, similar to CSS background-size.
export type BackgroundSize = 'auto' | 'cover' | 'contain' | string;
// Specifies the positioning of a background element, aligning with CSS background-position properties.
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
// Defines how a background image should repeat across the element, mirroring CSS background-repeat.
export type BackgroundRepeat =
  | 'repeat'
  | 'repeat-x'
  | 'repeat-y'
  | 'no-repeat'
  | 'space'
  | 'round';
// Specifies blend modes for combining background layers, consistent with CSS mix-blend-mode.
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
// Defines the shape of the context object provided by the Background component, enabling children to access its state.
export interface BackgroundContextType {
  // The currently active background effect.
  effect?: BackgroundEffect;
  // Indicates whether the background effect is currently animated.
  isAnimated?: boolean;
  // The duration of the background animation, if applicable.
  duration?: number;
}
