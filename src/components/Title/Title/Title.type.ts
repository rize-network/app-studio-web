import { ViewProps } from 'app-studio';

/**
 * Highlight style options for the Title component
 */
export type HighlightStyle =
  | 'underline'   // Underline the text
  | 'background'  // Background color highlight
  | 'gradient'    // Gradient background
  | 'outline'     // Text with outline
  | 'glow';       // Text with glow effect

/**
 * Animation type for the Title component
 */
export type TitleAnimation =
  | 'fadeIn'      // Fade in animation
  | 'slideIn'     // Slide in animation
  | 'typewriter'  // Typewriter effect
  | 'highlight'   // Highlight text animation
  | 'reveal'      // Text reveal animation
  | 'bounce'      // Bounce animation
  | 'none';       // No animation

/**
 * Animation direction for slide animations
 */
export type AnimationDirection =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

/**
 * Title size options
 */
export type TitleSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

/**
 * Title styles for customization
 */
export type TitleStyles = {
  container?: ViewProps;
  text?: ViewProps;
  highlight?: ViewProps;
};
