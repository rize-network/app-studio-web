import { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { Size, SwitchStyles } from './Switch.type';
// Defines the properties for the Switch component excluding 'size' from the InputProps to allow customization.
export interface SwitchProps extends Omit<InputProps, 'size'> {
  // The content to be displayed when the switch is in an active state.
  activeChild?: React.ReactNode;
  // Unique identifier for the switch component.
  id?: string;
  // Determines if the switch is disabled.
  isDisabled?: boolean;
  // Determines if the switch is read-only.
  isReadOnly?: boolean;
  // Callback function to handle the change event.
  onChange?: Function;
  // Name attribute for the switch component, useful for form submission.
  name?: string;
  // The content to be displayed when the switch is in an inactive state.
  inActiveChild?: React.ReactNode;
  // Custom styles to apply to the switch component.
  views?: SwitchStyles;
  // Defines the shadow appearance of the switch using predefined Shadow or Elevation, or a custom CSSProperties object.
  shadow?: Shadow | Elevation | CSSProperties;
  // Specifies the size of the switch component.
  size?: Size;
  // The position of the label relative to the switch, either 'left' or 'right'.
  labelPosition?: 'left' | 'right';
}
// Extends SwitchProps to include properties specific to the switch's view, like hover state.
export interface SwitchViewProps extends SwitchProps {
  // Denotes if the switch component is currently hovered by the cursor.
  isHovered: boolean;
  // Function to set the hover state of the switch component.
  setIsHovered: Function;
  // Controls the value or state of the switch (on/off).
  value?: boolean;
  // Function to update the value of the switch.
  setValue?: Function;
}
