import { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { InputProps, Shadow } from 'app-studio';

import { Size, SwitchStyles } from './Switch.type';

export interface SwitchProps extends Omit<InputProps, 'size'> {
  /**
   * The content to be rendered when the switch is active.
   */
  activeChild?: React.ReactNode;

  /**
   * Specifies the color scheme for the switch's background.
   */
  colorScheme?: string;

  /**
   * Specifies the unique identifier of the switch.
   */
  id?: string;

  /**
   * If set to true, the switch is disabled and cannot be interacted with.
   */
  isDisabled?: boolean;

  /**
   * If set to true, the switch cannot be turned on or off and is in read-only mode.
   */
  isReadOnly?: boolean;

  /**
   * A callback function that is invoked when the switch's value changes.
   */
  onChange?: Function;

  /**
   * The name of the switch.
   */
  name?: string;

  /**
   * The content to be rendered when the switch is inactive.
   */
  inActiveChild?: React.ReactNode;

  /**
   * Custom CSS styles for the switch container and its components.
   */
  styles?: SwitchStyles;

  /**
   * Adds a shadow effect to the switch.
   */
  shadow?: Shadow | Elevation | CSSProperties;

  /**
   * Specifies the size of the switch, affecting its height and width.
   */
  size?: Size;

  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
}

export interface SwitchViewProps extends SwitchProps {
  /** Prop indicating if the switch is being hovered */
  isHovered: boolean;

  /** Callback prop to update the hover state of the switch */
  setIsHovered: Function;

  /** Prop indicating the current state of the switch */
  value?: boolean;

  /** Callback prop to update the state of the switch */
  setValue?: Function;
}
