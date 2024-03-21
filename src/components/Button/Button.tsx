import React from 'react';
import { ButtonProps } from './Button/Button.props';
import { useButtonState } from './Button/Button.state';
// Importing TypeScript type for button properties to ensure the component receives the correct props.
import ButtonView from './Button/Button.view';
// Importing a custom hook to manage the state specific to the button component.
const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  // Importing the view part of the button, which is presumably a presentational component.
  const { isHovered, setIsHovered } = useButtonState();
  // Defining the button component with generic React Functional Component type augmented with ButtonProps type.
  const handleHover = () => setIsHovered(!isHovered);
  // Destructuring the state and state update function from the custom hook for button state management.
  return (
    // Defines a function to toggle the hover state of the button.
    <ButtonView
      isHovered={isHovered}
      // Rendering the ButtonView component and spreading the received props on it.
      setIsHovered={setIsHovered}
      // Passing the isHovered state and the setIsHovered function to the ButtonView.
      onMouseEnter={handleHover}
      // Binding handleHover function to onMouseEnter and onMouseLeave events to toggle hover effect.
      onMouseLeave={handleHover}
      {...props}
    />
  );
  // Exports the Button component for use in other parts of the application.
};
export const Button = ButtonComponent;
