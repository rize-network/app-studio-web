import { ViewProps } from 'app-studio';
export interface ProgressBarStyles {
  // Defines styles for the main container of the progress bar.
  container?: ViewProps;
  // Defines styles for the progress bar's actual filling element.
  bar?: ViewProps;
  // Defines SVG attributes for the progress bar's track (the background path for circular progress).
  track?: React.SVGAttributes<SVGCircleElement>;
  // Defines SVG attributes for the progress bar's indicator element (e.g., a circle at the end of a circular bar).
  indicator?: React.SVGAttributes<SVGCircleElement>;
  // Defines styles for the text label displayed on the progress bar.
  text?: ViewProps;
}
export interface ProgressBarProps extends ViewProps {
  // Specifies the visual shape of the progress bar, either linear or circular.
  shape?: 'linear' | 'circle';
  // Represents the current progress value of the bar.
  value?: number;
  // Defines the maximum possible value for the progress bar.
  max?: number;
  // Sets the color of the progress bar's filling portion.
  color?: string;
  // Sets the background color of the progress bar's track.
  backgroundColor?: string;
  // Specifies the height of a linear progress bar.
  height?: number | string;
  // Defines the overall size (diameter) for a circular progress bar.
  size?: number;
  // Specifies the radius of a circular progress bar.
  radius?: number | string;
  // Determines the thickness of the circular progress bar's stroke.
  strokeWidth?: number;
  // Controls the visibility of the progress percentage label.
  showLabel?: boolean;
  // Sets the color of the progress percentage label.
  labelColor?: string;
  // Enables or disables animation for the progress bar's changes.
  animated?: boolean;
  // Specifies the duration of the animation for progress changes.
  animationDuration?: string;
  // Provides custom style overrides for different sub-components of the progress bar.
  views?: ProgressBarStyles;
}
