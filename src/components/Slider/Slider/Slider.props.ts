import { InputProps, ViewProps } from 'app-studio';
import { Shape, Size, SliderStyles, Variant } from './Slider.type';

export interface SliderProps extends Omit<InputProps, 'size'> {
  /**
   * The minimum value of the slider
   */
  min?: number;
  /**
   * The maximum value of the slider
   */
  max?: number;
  /**
   * The current value of the slider
   */
  value?: number;
  /**
   * The step value for the slider
   */
  step?: number;
  /**
   * The shape of the slider
   */
  shape?: Shape;
  /**
   * The size of the slider
   */
  size?: Size;
  /**
   * The variant of the slider
   */
  variant?: Variant;
  /**
   * Whether the slider is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to show the current value label
   */
  showValue?: boolean;
  /**
   * Custom label for the slider
   */
  label?: React.ReactNode;
  /**
   * Helper text to display below the slider
   */
  helperText?: string;
  /**
   * Callback function when the value changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback function when the slider is being dragged
   */
  onDrag?: (value: number) => void;
  /**
   * Custom styles for the slider components
   */
  views?: SliderStyles;
  /**
   * Shadow effect for the slider
   */
  shadow?: ViewProps;
}

export interface SliderViewProps extends SliderProps {
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  setValue: (value: number) => void;
}
