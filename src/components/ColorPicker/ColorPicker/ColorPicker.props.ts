import { ViewProps } from 'app-studio';
import {
  Variant,
  Shape,
  Size,
  ColorPickerStyles,
  ColorFormat,
  PredefinedColor,
} from './ColorPicker.type';

export interface ColorPickerProps extends ViewProps {
  // Basic props
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;

  // Value and change handling
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;

  // Styling
  views?: ColorPickerStyles;
  size?: Size;
  shape?: Shape;
  variant?: Variant;

  // State
  error?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;

  // Color options
  predefinedColors?: PredefinedColor[];
  showCustomInput?: boolean;
  showRecentColors?: boolean;
  colorFormat?: ColorFormat;
  maxRecentColors?: number;

  // Dropdown behavior
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnSelect?: boolean;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface ColorPickerViewProps extends ColorPickerProps {
  // State from useColorPickerState
  isOpen: boolean;
  selectedColor: string;
  recentColors: string[];
  customColor: string;

  // Handlers from useColorPickerState
  handleToggle: () => void;
  handleColorSelect: (color: string) => void;
  handleCustomColorChange: (color: string) => void;
  handleCustomColorSubmit: () => void;
  handleClose: () => void;

  // Refs
  triggerRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}
