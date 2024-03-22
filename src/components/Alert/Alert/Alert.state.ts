import React from 'react';
export const useAlertState = () => {
// Define a custom hook called 'useAlertState' for managing the alert state in a component.
  const [isHovered, setIsHovered] = React.useState(false);
// 'setIsHovered' is the function that allows updating the state of 'isHovered'.
// Initialize 'isHovered' state with a default value of false to track whether an element is being hovered over.
  return { isHovered, setIsHovered };
// The custom hook returns an object containing the 'isHovered' state and the 'setIsHovered' function, allowing external components to access and mutate the hover state.
};
