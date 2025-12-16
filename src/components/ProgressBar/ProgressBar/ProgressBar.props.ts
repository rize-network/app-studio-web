import { ViewProps } from 'app-studio';

export interface ProgressBarStyles {
  container?: ViewProps;
  bar?: ViewProps;
  // Circular specific styles
  track?: React.SVGAttributes<SVGCircleElement>;
  indicator?: React.SVGAttributes<SVGCircleElement>;
  text?: ViewProps;
}

export interface ProgressBarProps extends ViewProps {
  /**
   * The shape of the progress bar
   * @default 'linear'
   */
  shape?: 'linear' | 'circle';

  /**
   * Current progress value
   */
  value?: number;
  /**
   * Maximum progress value
   */
  max?: number;
  /**
   * Color of the filled portion
   */
  color?: string;
  /**
   * Background color of the track
   */
  backgroundColor?: string;
  /**
   * Height of the progress bar (linear) or size (circle)
   */
  height?: number | string;

  /**
   * Diameter of the circle (alias for height/width when shape is circle)
   */
  size?: number;

  /**
   * Border radius for rounded corners (linear only)
   */
  radius?: number | string;

  /**
   * Width of the stroke (circle only)
   */
  strokeWidth?: number;

  /**
   * Whether to show the percentage label in the center (circle only)
   */
  showLabel?: boolean;

  /**
   * Color of the label text (circle only)
   */
  labelColor?: string;

  /**
   * Whether to animate the progress change smoothly
   * @default true
   */
  animated?: boolean;

  /**
   * Duration of the animation
   */
  animationDuration?: string;

  /**
   * Custom styles for container or bar
   */
  views?: ProgressBarStyles;
}
