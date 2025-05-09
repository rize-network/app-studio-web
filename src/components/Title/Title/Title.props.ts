import { ViewProps } from 'app-studio';
import { HighlightStyle, TitleSize, TitleStyles } from './Title.type';
import { AnimationProps } from 'app-studio/dist/utils/constants';

/**
 * Props for the Title component
 */
export interface TitleProps extends ViewProps {
  /**
   * Internal prop to indicate if the component is in view
   * @internal
   */
  _isInView?: boolean;
  /**
   * The main text content of the title
   */
  children: React.ReactNode;

  /**
   * Text to be highlighted within the title
   * If not provided, no highlighting will be applied
   */
  highlightText?: string | string[];

  /**
   * Array of strings to cycle through, replacing the text specified in highlightText
   * Used with alternateAnimation to create an infinite loop of changing words
   */
  alternateHighlightText?: string[];

  /**
   * Animation for the highlighted text
   * This can be a single animation object or an array of animation objects
   * for multiple highlighted words
   */
  highlightAnimate?: AnimationProps | AnimationProps[];

  /**
   * Whether to apply a typewriter effect to the highlighted text
   * @default false
   */
  highlightTypewriter?: boolean;

  /**
   * Duration in milliseconds for the typewriter effect on highlighted text
   * @default 1500
   */
  highlightTypewriterDuration?: number;

  /**
   * Style of the highlight effect
   * @default 'background'
   */
  highlightStyle?: HighlightStyle;

  /**
   * Color for the highlight effect
   * @default 'theme.primary'
   */
  highlightColor?: string;

  /**
   * Secondary color for gradient highlights
   * @default 'theme.secondary'
   */
  highlightSecondaryColor?: string;

  /**
   * Animation for the title
   * This should be an animation object with properties like from, to, duration, etc.
   */
  animate?: AnimationProps | AnimationProps[];

  /**
   * Size of the title
   * @default 'xl'
   */
  size?: TitleSize;

  /**
   * Whether to center the title
   * @default false
   */
  centered?: boolean;

  /**
   * Custom styles for different parts of the component
   */
  views?: TitleStyles;

  /**
   * Whether to animate the alternating highlight text
   * @default false
   */
  alternateAnimation?: boolean;

  /**
   * Duration in milliseconds for each alternating highlight text
   * @default 3000
   */
  alternateDuration?: number;
}
