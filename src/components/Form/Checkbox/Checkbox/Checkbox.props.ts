import React from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { CheckboxStyles, Size } from './Checkbox.type';
import { ViewProps } from 'app-studio';

export interface CheckboxProps
  extends Omit<InputProps, 'size' | 'onChange' | 'shadow'> {
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
  // Called with the checkbox's next checked state — not a DOM event. Typed
  // rather than `Function` so a DOM-shaped handler is a compile error and the
  // argument is actually visible to callers.
  onChange?: (checked: boolean) => void;
  // Same argument as `onChange`; both fire on toggle.
  onValueChange?: (checked: boolean) => void;
  views?: CheckboxStyles;
  size?: Size;
  shadow?: Shadow | Elevation | ViewProps;
  infoText?: string;
}
export interface CheckboxViewProps extends CheckboxProps {
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  isChecked?: boolean;
  isSelected?: boolean;
  setIsSelected?: (selected: boolean) => void;
}
