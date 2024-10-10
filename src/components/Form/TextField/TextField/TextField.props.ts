import React, { CSSProperties } from 'react';
import { InputProps, Shadow } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import { Shape, Size, TextFieldStyles, Variant } from './TextField.type';
export interface TextFieldProps extends Omit<InputProps, 'size'> {
  id?: string;
  error?: any;
  helperText?: string;
  name?: string;
  label?: string;
  colorScheme?: string;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  placeholder?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isAutoFocus?: boolean;
  onChange?: (value: any) => void;
  onChangeText?: (value: string) => void;
  onBlur?: (value: any) => void;
  onClick?: () => void;
  onFocus?: () => void;
  size?: Size;
  shadow?: Shadow | Elevation | CSSProperties;
  shape?: Shape;
  styles?: TextFieldStyles;
  value?: string;
  variant?: Variant;
}
export interface TextFieldViewProps extends TextFieldProps {
  hint?: string;
  setHint?: Function;
  isFocused?: boolean;
  setIsFocused?: Function;
  isHovered?: boolean;
  setIsHovered?: Function;
  value?: string;
  setValue?: Function;
}
