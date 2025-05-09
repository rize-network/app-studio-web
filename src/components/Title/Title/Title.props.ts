import { ViewProps } from 'app-studio';
import {
  HighlightStyle,
  TitleAnimation,
  AnimationDirection,
  TitleSize,
  TitleStyles,
} from './Title.type';

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
   * Enable alternating animation that replaces the highlightText with words from alternateHighlightText
   * When enabled, the component will replace the text specified in highlightText with each word
   * from alternateHighlightText in sequence, creating an infinite loop animation
   * @default false
   */
  alternateAnimation?: boolean;

  /**
   * Duration for each alternation cycle in milliseconds
   * Controls how long each word from alternateHighlightText is displayed before switching to the next
   * @default 3000
   */
  alternateDuration?: number;

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
   * Animation type for the title
   * @default 'none'
   */
  animation?: TitleAnimation;

  /**
   * Direction for slide animations
   * @default 'left'
   */
  animationDirection?: AnimationDirection;

  /**
   * Duration of the animation in seconds
   * @default '1s'
   */
  animationDuration?: string;

  /**
   * Delay before animation starts in seconds
   * @default '0s'
   */
  animationDelay?: string;

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
}
