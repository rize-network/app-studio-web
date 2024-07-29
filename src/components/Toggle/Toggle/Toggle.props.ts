import { InputProps } from 'app-studio';
import { Shape, Variant } from './Toggle.type';
export interface ToggleProps extends Omit<InputProps, 'size'> {
  // Optional 'shape' property to determine the shape of the toggle component.
  shape?: Shape;
  // Optional boolean to define the initial toggle state.
  isToggled?: boolean;
  // Optional boolean to set the toggle component as disabled or not.
  isDisabled?: boolean;
  // Children property to pass React nodes inside the toggle component.
  children: React.ReactNode;
  // Optional 'variant' to style the toggle component with predefined sets of visual types.
  variant?: Variant;
  // Optional string to set the color scheme for the toggle component's appearance.
  colorScheme?: string;
  // Optional function that triggers when the toggle state changes, receives the new state as an argument.
  onToggle?: (isToggled: boolean) => void;
}
export interface ToggleViewProps extends ToggleProps {
  // Boolean to indicate whether the toggle component is hovered over by the user.
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isToggle: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
