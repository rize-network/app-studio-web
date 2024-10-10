import { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import {
  Country,
  CountryPickerStyles,
  Shape,
  Size,
  Variant,
} from './CountryPicker.type';
export interface CountryPickerProps extends Omit<InputProps, 'size'> {
  id?: string;
  error?: boolean;
  name?: string;
  label?: string;
  colorScheme?: string;
  helperText?: string;
  placeholder?: string;
  shape?: Shape;
  isAutoFocus?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  styles?: CountryPickerStyles;
  size?: Size;
  value?: string | number;
  variant?: Variant;
  shadow?: Shadow | Elevation | CSSProperties;
}
export interface CountryPickerViewProps extends CountryPickerProps {
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
  selected?: string;
  setSelected?: (selected: string) => void;
  hide?: boolean;
  setHide?: (hide: boolean) => void;
  newOptions?: Array<Country>;
  setNewOptions?: (newOptions: Array<Country>) => void;
}
export interface DropDownProps extends Omit<InputProps, 'size'> {
  size?: Size;
  callback?: Function;
  options: Array<Country>;
  styles?: CountryPickerStyles;
}
export interface DropDownItemProps extends Omit<InputProps, 'size'> {
  callback?: Function;
  option: string;
  size?: Size;
  styles?: CountryPickerStyles;
}
