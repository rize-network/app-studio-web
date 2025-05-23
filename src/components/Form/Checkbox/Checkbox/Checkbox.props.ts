import React from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { CheckboxStyles, Size } from './Checkbox.type';
import { ViewProps } from 'app-studio';

export interface CheckboxProps extends Omit<InputProps, 'size'> {
  id?: string;
  icon?: React.ReactNode;
  error?: any;
  name?: string;
  label?: string;
  isChecked?: boolean;
  defaultIsSelected?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  labelPosition?: 'left' | 'right';
  onChange?: Function;
  onValueChange?: Function;
  views?: CheckboxStyles;
  size?: Size;
  shadow?: Shadow | Elevation | ViewProps;
  infoText?: string;
}
export interface CheckboxViewProps extends CheckboxProps {
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  isChecked?: boolean;
  setIsChecked?: (selected: boolean) => void;
}
