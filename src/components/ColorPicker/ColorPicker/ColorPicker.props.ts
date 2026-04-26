import { ViewProps } from 'app-studio';
import {
  Variant,
  Shape,
  Size,
  ColorPickerStyles,
  ColorFormat,
  PredefinedColor,
} from './ColorPicker.type';
// Defines the core properties for the ColorPicker component, extending standard ViewProps while omitting its default onChange handler.
export interface ColorPickerProps extends Omit<ViewProps, 'onChange'> {
  // An optional unique identifier for the component.
  id?: string;
  // An optional name attribute for the component, useful for form submissions.
  name?: string;
  // An optional label to display alongside the color picker.
  label?: string;
  // An optional placeholder text to display when no color is selected.
  placeholder?: string;
  // An optional helper text to provide additional context or instructions.
  helperText?: string;
  // The current controlled color value of the picker in string format (e.g., '#RRGGBB').
  value?: string;
  // The initial uncontrolled color value of the picker in string format.
  defaultValue?: string;
  // Callback function triggered when the color value changes, receiving the new color string.
  onChange?: (color: string) => void;
  // Callback function triggered when the color selection process is complete (e.g., mouse up after drag), receiving the final color string.
  onChangeComplete?: (color: string) => void;
  // Custom styles to apply to different parts of the color picker component.
  views?: ColorPickerStyles;
  // Defines the size of the color picker component (e.g., 'small', 'medium', 'large').
  size?: Size;
  // Defines the shape of the color picker component (e.g., 'square', 'rounded', 'circle').
  shape?: Shape;
  // Defines the visual variant of the color picker component (e.g., 'outline', 'filled').
  variant?: Variant;
  // Indicates if the color picker is in an error state.
  error?: boolean;
  // Indicates if the color picker is disabled and cannot be interacted with.
  isDisabled?: boolean;
  // Indicates if the color picker is read-only, allowing selection but not modification.
  isReadOnly?: boolean;
  // An array of predefined colors for quick selection.
  predefinedColors?: PredefinedColor[];
  // Determines whether to display a custom input field for color values.
  showCustomInput?: boolean;
  // Determines whether to display a section for recently selected colors.
  showRecentColors?: boolean;
  // Specifies the format for color values (e.g., 'hex', 'rgb', 'hsl').
  colorFormat?: ColorFormat;
  // The maximum number of recent colors to display.
  maxRecentColors?: number;
  // Controls the open/closed state of the color picker dropdown.
  isOpen?: boolean;
  // Callback function triggered when the color picker dropdown is opened.
  onOpen?: () => void;
  // Callback function triggered when the color picker dropdown is closed.
  onClose?: () => void;
  // Determines if the dropdown should automatically close after a color is selected.
  closeOnSelect?: boolean;
  // ARIA label for accessibility, providing a descriptive name for the component.
  'aria-label'?: string;
  // ARIA property to associate the component with an element that describes it.
  'aria-describedby'?: string;
}
// Defines the internal properties for the `ColorPickerView` component, extending `ColorPickerProps` with additional state and handler props for internal management.
export interface ColorPickerViewProps extends ColorPickerProps {
  // Indicates if the color picker dropdown is currently open.
  isOpen: boolean;
  // The currently selected color value, typically used internally.
  selectedColor: string;
  // An array of recently used colors, used for quick re-selection.
  recentColors: string[];
  // The color value entered in the custom input field.
  customColor: string;
  // Handler to toggle the open/closed state of the color picker dropdown.
  handleToggle: () => void;
  // Handler for when a color is selected from the palette or predefined options.
  handleColorSelect: (color: string) => void;
  // Handler for changes in the custom color input field.
  handleCustomColorChange: (color: string) => void;
  // Handler for submitting the custom color entered in the input field.
  handleCustomColorSubmit: () => void;
  // Handler to close the color picker dropdown.
  handleClose: () => void;
  // React ref object to access the DOM element that triggers the color picker dropdown.
  triggerRef: React.RefObject<HTMLDivElement>;
  // React ref object to access the DOM element of the color picker dropdown itself.
  dropdownRef: React.RefObject<HTMLDivElement>;
}
