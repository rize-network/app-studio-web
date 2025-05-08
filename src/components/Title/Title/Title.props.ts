import { ViewProps } from 'app-studio';
import {
  HighlightStyle,
  TitleAnimation,
  AnimationDirection,
  TitleSize,
  TitleStyles
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
