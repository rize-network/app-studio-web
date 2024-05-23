import React, { useEffect } from 'react';
import { ToggleProps } from './Toggle/Toggle.props';
import { useToggleState } from './Toggle/Toggle.state';
import ToggleView from './Toggle/Toggle.view';
// Destructuring properties from ToggleProps to be used within the ToggleComponent.
const ToggleComponent = ({
  children,
  shape,
  colorScheme,
  variant,
  isDisabled,
  // Assigning a default value of false to the isToggled property if none is provided.
  isToggled = false,
  onToggle,
  ...props
}: ToggleProps) => {
  // Initializing toggle state and set state functions using the custom hook useToggleState.
  const { isHovered, setIsHovered, isToggle, setIsToggled } =
    useToggleState(isToggled);
  // Creating an effect that updates the isToggled state whenever the isToggled prop changes.
  useEffect(() => {
    setIsToggled(isToggled);
  }, [isToggled]);
  // Beginning of the JSX block to render the Toggle view component.
  return (
    <ToggleView
      shape={shape}
      colorScheme={colorScheme}
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
