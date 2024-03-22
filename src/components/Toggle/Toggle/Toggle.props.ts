import { Shape, Variant } from './Toggle.type';
// Import custom types 'Shape' and 'Variant' from Toggle.type for use in component prop typing.
export interface ToggleProps {
  // Define TypeScript interface for the props of the Toggle component.
  shape?: Shape;
  // Optional 'shape' prop to determine the shape of the toggle, using the custom 'Shape' type.
  isToggled?: boolean;
  // Optional 'isToggled' boolean indicating the current state of the toggle.
  isDisabled?: boolean;
  // Optional 'isDisabled' boolean to specify if the toggle should be disabled.
  children: React.ReactNode;
  // Mandatory 'children' prop of type React.ReactNode, representing the child elements of the toggle component.
  variant?: Variant;
  // Optional 'variant' prop to apply predefined style variants, utilizing the 'Variant' type.
  colorScheme?: string;
  // Optional 'colorScheme' string to customize the color theme of the toggle component.
  onToggle?: (isToggled: boolean) => void;
  // Optional 'onToggle' function prop that gets executed when the toggle state changes, receiving the new state as a parameter.
  [x: string]: any;
  // Index signature allowing any additional properties not explicitly defined in this interface, giving the component flexibility for extension.
}
// Define TypeScript interface 'ToggleViewProps' for the view component of the Toggle, extending the basic 'ToggleProps' interface.
export interface ToggleViewProps extends ToggleProps {
  // Mandatory 'isHovered' boolean indicating if the toggle is currently being hovered by the cursor.
  isHovered: boolean;
  // 'setIsHovered' function used to change the state of 'isHovered', following the React useState convention.
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  // Mandatory boolean 'isToggle' to keep synchronous state with 'isToggled' prop, could be linked directly to display styling.
  isToggle: boolean;
  // 'setIsToggled' function is the dispatcher from React's useState hook to update the 'isToggle' state.
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
