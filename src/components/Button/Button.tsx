import React from 'react';
import { ButtonProps } from './Button/Button.props';
// Importing TypeScript type for button properties to ensure the component receives the correct props.
import ButtonView from './Button/Button.view';
import { useHover } from 'app-studio';
// Importing a custom hook to manage the state specific to the button component.
const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  const [ref, hover] = useHover<HTMLDivElement>();

  // Destructuring the state and state update function from the custom hook for button state management.
  return (
    // Defines a function to toggle the hover state of the button.
    <ButtonView ref={ref} isHovered={hover} {...props} />
  );
  // Exports the Button component for use in other parts of the application.
};
export const Button = ButtonComponent;
