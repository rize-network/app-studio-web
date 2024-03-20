import React from 'react';
export const useAlertState = () => {
  // Define a custom React hook called useAlertState.
  const [isHovered, setIsHovered] = React.useState(false);
  // useState returns a pair: the current state value and a function that lets you update it ('setIsHovered').
  // Initialize a state variable 'isHovered' with a default value of false using the useState hook.
  return { isHovered, setIsHovered };
  // The hook returns an object containing 'isHovered' to track if an element is hovered and 'setIsHovered' to change its value.
};
