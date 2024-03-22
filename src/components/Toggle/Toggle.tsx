import React, { useEffect } from 'react';
import { ToggleProps } from './Toggle/Toggle.props';
import { useToggleState } from './Toggle/Toggle.state';
import ToggleView from './Toggle/Toggle.view';
const ToggleComponent = ({
  children,
  // Define a functional component 'ToggleComponent' with destructured props from 'ToggleProps' and default value for 'isToggled' prop.
  shape,
  // Utilize the custom hook 'useToggleState', initialized with 'isToggled', to manage the toggle's state.
  colorScheme,
  variant,
  // Invoke 'useEffect' to synchronize the internal toggle state when the 'isToggled' prop changes.
  isDisabled,
  // Update the internal toggle state 'setIsToggled' whenever the 'isToggled' prop changes, as indicated by the dependencies array.
  isToggled = false,
  onToggle,
  ...props
}: ToggleProps) => {
  // Render the 'ToggleView' component with the required props and handlers to manage the toggle's state and appearance.
  const { isHovered, setIsHovered, isToggle, setIsToggled } =
    // Pass down 'shape', 'colorScheme', 'variant', 'isDisabled' props for styling and behavior.
    useToggleState(isToggled);
  // Pass the 'isHovered' state and 'setIsHovered' callback to manage hover state within 'ToggleView'.
  useEffect(() => {
    // Provide 'isToggle' state and 'setIsToggled' callback to control the toggled state and its updates.
    setIsToggled(isToggled);
    // Pass down 'onToggle' callback prop to be invoked when the toggle interaction occurs.
  }, [isToggled]);
  // Spread the remaining props to 'ToggleView' to ensure extensibility of the component.
  return (
    // Include children within 'ToggleView' which allows for nested content or additional components.
    <ToggleView
      shape={shape}
      colorScheme={colorScheme}
      // Export 'Toggle' as an alias for 'ToggleComponent' to be used for imports within other components or modules.
      variant={variant}
      isDisabled={isDisabled}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      isToggle={isToggle}
      setIsToggled={setIsToggled}
      onToggle={onToggle}
      {...props}
    >
      {children}
    </ToggleView>
  );
};
export const Toggle = ToggleComponent;
