import React from 'react';
export const useButtonState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
// This custom react hook 'useButtonState' is defined for managing the state of a button, especially for hover interactions.
  return { isHovered, setIsHovered };
// The 'setIsHovered' function is used to update the value of 'isHovered' state when the hover status of the button changes.
// A state variable 'isHovered' is declared with its initial value set to 'false', indicating that the button is not hovered by default.
};
// The hook returns an object containing 'isHovered' state and the 'setIsHovered' function to enable state management from the consumer component.
