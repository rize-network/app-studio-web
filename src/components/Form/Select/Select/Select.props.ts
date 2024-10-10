import { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { SelectStyles, Shape, Size, Variant, Option } from './Select.type';
export interface SelectProps extends Omit<InputProps, 'size'> {
  id?: string;
  error?: boolean;
  name?: string;
  label?: string;
  colorScheme?: string;
  helperText?: string;
  placeholder?: string;
  options: Option[];
  isMulti?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  onChange?: (value: any) => void;
  shape?: Shape;
  variant?: Variant;
  styles?: SelectStyles;
  size?: Size;
  shadow?: Shadow | Elevation | CSSProperties;
  isScrollable?: boolean;
}
export interface SelectViewProps extends SelectProps {
  value: string | Array<string>;
  setValue: Function;
  hide: boolean;
  setHide: Function;
  isHovered: boolean;
  setIsHovered: Function;
  isFocused: boolean;
  setIsFocused: Function;
}
export interface SelectBoxProps {
  options: Option[];
  value?: string | Array<string>;
  isDisabled?: boolean;
  placeholder?: string;
  removeOption?: Function;
  styles?: SelectStyles;
  size?: Size;
}
export interface MultiSelectProps extends Omit<InputProps, 'size'> {
  option: string;
  removeOption: Function;
  size?: Size;
}
export interface ItemProps extends Omit<InputProps, 'size'> {
  callback?: Function;
  option: Option;
  size?: Size;
  style?: SelectStyles;
}
export interface HiddenSelectProps extends Omit<InputProps, 'size'> {
  id?: string;
  name?: string;
  value: string | Array<string>;
  isMulti?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  onChange?: (value: any) => void;
  options: Option[];
}
export interface DropDownProps extends Omit<InputProps, 'size'> {
  size?: Size;
  callback?: Function;
  options: Option[];
  styles?: SelectStyles;
}
