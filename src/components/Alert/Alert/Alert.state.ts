import React from 'react';
export const useAlertState = () => {
// Defines a custom React hook called 'useAlertState' that manages the alert state within a component.
  const [isHovered, setIsHovered] = React.useState(false);
// Provides the 'setIsHovered' function which allows other components to update the value of 'isHovered'.
// Initializes 'isHovered' state variable with a default value of 'false'. This state will track whether an element is being hovered over or not.
  return { isHovered, setIsHovered };
// The hook returns an object containing the 'isHovered' state variable and the 'setIsHovered' function to allow other components to read and modify the hover state.
};
