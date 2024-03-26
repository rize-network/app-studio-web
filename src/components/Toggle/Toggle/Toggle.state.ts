import { useState } from 'react';
// Declares the useToggleState function which takes defaultToggled parameter to initialize the toggle state.
export const useToggleState = (defaultToggled: boolean) => {
  // Creates a stateful value isHovered for tracking hover state and a function setIsHovered to update that state, initially false.
  const [isHovered, setIsHovered] = useState(false);
  // Creates a stateful value isToggle to store the current toggle state and a function setIsToggled to modify it, initialized with defaultToggled.
  const [isToggle, setIsToggled] = useState(defaultToggled);
  // Returns an object containing the current states and the functions to update them for external use.
  return { isHovered, setIsHovered, isToggle, setIsToggled };
};
