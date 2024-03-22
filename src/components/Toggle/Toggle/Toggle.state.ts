import { useState } from 'react';
export const useToggleState = (defaultToggled: boolean) => {
  // Defines a custom hook `useToggleState` that takes a default boolean value to set the initial state of a toggle functionality.
  const [isHovered, setIsHovered] = useState(false);
  // Declares `isHovered` state to track the hovered state of an element with its setter function `setIsHovered` initialized to `false`.
  const [isToggle, setIsToggled] = useState(defaultToggled);
  // Declares `isToggle` state to represent the toggled state of an element with its setter `setIsToggled`, initialized with the `defaultToggled` parameter.
  return { isHovered, setIsHovered, isToggle, setIsToggled };
  // Returns an object containing the `isHovered` state, its setter function, the `isToggle` state, and its setter function, to be used by the components that require toggle behavior.
};
