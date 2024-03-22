import React, { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';
import { CheckboxStyles, Size } from './Checkbox.type';
export interface CheckboxProps {
  id?: string;
  icon?: React.ReactNode;
  error?: boolean;
  name?: string;
  label?: string;
  colorScheme?: string;
  isChecked?: boolean;
  defaultIsSelected?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  labelPosition?: 'left' | 'right';
  onChange?: Function;
  onValueChange?: Function;
  styles?: CheckboxStyles;
  size?: Size;
  shadow?: Shadow | Elevation | CSSProperties;
  [x: string]: any;
}
export interface CheckboxViewProps extends CheckboxProps {
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  isChecked?: boolean;
  setIsChecked?: (selected: boolean) => void;
}
