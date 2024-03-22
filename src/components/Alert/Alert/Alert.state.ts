import React from 'react';
export const useAlertState = () => {
// The isHovered state is initialized to false, meaning the alert is not hovered by default.
// Hook utilizes React's useState to create a stateful value, isHovered, along with its setter function, setIsHovered.
// Defines a custom React hook called useAlertState that manages the alert hover state.
  const [isHovered, setIsHovered] = React.useState(false);
// The hook returns an object containing the isHovered state and the setIsHovered setter function, allowing the consuming component to read and modify the hover state.
  return { isHovered, setIsHovered };
};
