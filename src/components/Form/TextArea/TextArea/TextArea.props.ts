import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import { Shape, Size, TextAreaStyles, Variant } from './TextArea.type';
export interface TextAreaProps extends Omit<InputProps, 'size'> {
  defaultValue?: string;
  error?: boolean;
  isEditable?: boolean;
  helperText?: string;
  id?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isAutoFocus?: boolean;
  isMultiline?: boolean;
  label?: string;
  maxRows?: number;
  maxCols?: number;
  name?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  onChangeText?: (text: string) => void;
  onBlur?: (value: any) => void;
  onFocus?: () => void;
  size?: Size;
  shadow?: Shadow | Elevation | ViewProps;
  shape?: Shape;
  views?: TextAreaStyles;
  value?: string | number;
  variant?: Variant;
}
export interface TextAreaViewProps extends TextAreaProps {
  hint?: string;
  setHint?: Function;
  isHovered?: boolean;
  setIsHovered?: Function;
  value?: string | number;
  setValue?: Function;
  isFocused?: boolean;
  setIsFocused?: Function;
}
