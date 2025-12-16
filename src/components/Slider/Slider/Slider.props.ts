import { InputProps, ViewProps } from 'app-studio';
import { Orientation, Shape, Size, SliderStyles, Variant } from './Slider.type';

export interface SliderProps
  extends Omit<InputProps, 'size' | 'onChange' | 'onDrag'> {
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
   * The default value of the slider (uncontrolled)
   */
  defaultValue?: number;
  /**
   * The step value for the slider
   */
  step?: number;
  /**
   * Array of specific values to use as steps
   * When provided, the slider will only allow these values
   */
  stepValues?: number[];
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
   * The orientation of the slider
   */
  orientation?: Orientation;
  /**
   * Whether the slider is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to show the current value label
   */
  showValue?: boolean;
  /**
   * If true, a tooltip showing the current value will appear on hover/drag
   */
  showTooltip?: boolean;
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
  /**
   * Aria-label for accessibility
   */
  ariaLabel?: string;
}

export interface SliderViewProps extends SliderProps {
  /** The current internal value being displayed/manipulated. */
  currentValue?: number;
  /** Flag indicating if the thumb is being dragged. */
  isDragging: boolean;
  /** Flag indicating if the component is hovered. */
  isHovered: boolean;
  /** Reference to the track element. */
  trackRef: React.RefObject<HTMLDivElement>;
  /** Reference to the thumb element. */
  thumbRef: React.RefObject<HTMLDivElement>;
  /** Handler for mouse down / touch start on the thumb. */
  handleThumbMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
  /** Handler for mouse down / touch start on the track. */
  handleTrackMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
  /** Handler for keyboard interaction on the thumb. */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  /** The calculated position percentage for the thumb. */
  thumbPositionPercent: number;
  /** Callback to set hover state */
  setIsHovered: (hovered: boolean) => void;
}
