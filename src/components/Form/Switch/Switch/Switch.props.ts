import { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { Size, SwitchStyles } from './Switch.type';
export interface SwitchProps extends Omit<InputProps, 'size'> {
  activeChild?: React.ReactNode;
  colorScheme?: string;
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: Function;
  name?: string;
  inActiveChild?: React.ReactNode;
  styles?: SwitchStyles;
  shadow?: Shadow | Elevation | CSSProperties;
  size?: Size;
  labelPosition?: 'left' | 'right';
}
export interface SwitchViewProps extends SwitchProps {
  isHovered: boolean;
  setIsHovered: Function;
  value?: boolean;
  setValue?: Function;
}
