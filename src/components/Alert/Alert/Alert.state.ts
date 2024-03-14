import React from 'react';
export const useAlertState = () => {
  // Defines a custom React hook named useAlertState that manages the hover state of an element.
  const [isHovered, setIsHovered] = React.useState(false);
  // Sets 'setIsHovered' as the function to update the state of 'isHovered' when required.
  // Initializes the 'isHovered' state variable to 'false'. This variable will track if an element is currently hovered or not.
  return { isHovered, setIsHovered };
  // The hook returns an object containing the 'isHovered' state and the 'setIsHovered' state updater function, allowing the component that uses this hook to have access to the hover state and the ability to modify it.
};
