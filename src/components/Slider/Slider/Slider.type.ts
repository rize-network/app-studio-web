import { ViewProps, TextProps } from 'app-studio';
// Defines the possible visual shapes for the Slider component.
export type Shape = 'square' | 'rounded' | 'pill';
// Specifies the predefined size options for the Slider component.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Describes the visual variant styles available for the Slider component.
export type Variant = 'default' | 'outline';
// Determines the layout direction of the Slider component.
export type Orientation = 'horizontal' | 'vertical';
export interface SliderStyles {
  // Styles for the main container wrapping the Slider component.
  container?: ViewProps;
  // Styles for the background track of the Slider.
  track?: ViewProps;
  // Styles for the portion of the track representing progress, typically filled from the start.
  progress?: ViewProps;
  // Styles for the section of the track that indicates the current value, often used for ranges or filled portions.
  filledTrack?: ViewProps;
  // Styles for the draggable handle (thumb) of the Slider.
  thumb?: ViewProps;
  // Styles for the static label associated with the Slider.
  label?: ViewProps;
  // Styles for the label displaying the current value of the Slider.
  valueLabel?: ViewProps;
  // Styles for the visual indicators along the track representing discrete steps.
  stepMarks?: ViewProps;
  // Styles for the tooltip that appears when interacting with the Slider, including its text.
  tooltip?: ViewProps & { text?: TextProps };
}
