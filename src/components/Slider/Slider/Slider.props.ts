import { InputProps, ViewProps } from 'app-studio';
import { Orientation, Shape, Size, SliderStyles, Variant } from './Slider.type';
export interface SliderProps
  extends Omit<InputProps, 'size' | 'onChange' | 'onDrag'> {
  // Defines the minimum allowed value for the slider.
  min?: number;
  // Defines the maximum allowed value for the slider.
  max?: number;
  // The current controlled value of the slider.
  value?: number;
  // The initial uncontrolled value of the slider.
  defaultValue?: number;
  // The step increment for the slider's value.
  step?: number;
  // An array of specific values the slider can snap to.
  stepValues?: number[];
  // Defines the visual shape of the slider's elements (e.g., round, square).
  shape?: Shape;
  // Defines the overall size of the slider component.
  size?: Size;
  // Specifies the visual style or variant of the slider.
  variant?: Variant;
  // Defines whether the slider is horizontal or vertical.
  orientation?: Orientation;
  // Indicates if the slider is disabled and non-interactive.
  isDisabled?: boolean;
  // Determines whether the current slider value should be displayed.
  showValue?: boolean;
  // Determines whether a tooltip showing the value appears on hover/drag.
  showTooltip?: boolean;
  // A label to associate with the slider.
  label?: React.ReactNode;
  // Supplementary text to provide additional context or guidance.
  helperText?: string;
  // Callback function invoked when the slider's value changes.
  onChange?: (value: number) => void;
  // Callback function invoked during a slider drag operation.
  onDrag?: (value: number) => void;
  // Custom styles for different parts of the slider component.
  views?: SliderStyles;
  // Props for rendering a shadow effect for the slider.
  shadow?: ViewProps;
  // An ARIA label for accessibility purposes.
  ariaLabel?: string;
}
export interface SliderViewProps extends SliderProps {
  // The current value being displayed or dragged.
  currentValue?: number;
  // Indicates if the slider thumb is currently being dragged.
  isDragging: boolean;
  // Indicates if the slider or its thumb is currently hovered.
  isHovered: boolean;
  // Ref to the slider's track DOM element.
  trackRef: React.RefObject<HTMLDivElement>;
  // Ref to the slider's thumb DOM element.
  thumbRef: React.RefObject<HTMLDivElement>;
  // Event handler for mouse/touch down on the thumb.
  handleThumbMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
  // Event handler for mouse/touch down on the track.
  handleTrackMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
  // Event handler for keyboard interactions with the slider.
  handleKeyDown: (event: React.KeyboardEvent) => void;
  // The calculated position of the thumb as a percentage of the track width.
  thumbPositionPercent: number;
  // Function to set the hovered state of the slider.
  setIsHovered: (hovered: boolean) => void;
}
