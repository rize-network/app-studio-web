import { ViewProps, TextProps } from 'app-studio';

export type Shape = 'square' | 'rounded' | 'pill';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'outline';

// Defines the orientation of the Slider
export type Orientation = 'horizontal' | 'vertical';

// Defines the structure for custom styling the Slider component parts
export interface SliderStyles {
  container?: ViewProps;
  track?: ViewProps;
  progress?: ViewProps;
  filledTrack?: ViewProps; // Styles for the portion of the track representing the value
  thumb?: ViewProps;
  label?: ViewProps;
  valueLabel?: ViewProps;
  stepMarks?: ViewProps;
  tooltip?: ViewProps & { text?: TextProps }; // Styles for the tooltip container and text
}
