import { ViewProps } from 'app-studio';

export interface ProgressBarStyles {
  container?: ViewProps;
  bar?: ViewProps;
}

export interface ProgressBarProps extends ViewProps {
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
   * Height of the progress bar
   */
  height?: number | string;
  /**
   * Border radius for rounded corners
   */
  radius?: number | string;
  /**
   * Custom styles for container or bar
   */
  views?: ProgressBarStyles;
}
