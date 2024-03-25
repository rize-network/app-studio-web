import React from 'react';
// Declare a custom React hook named useAlertState.
export const useAlertState = () => {
// Within the hook, initialize a state variable isHovered with a default value of false using the useState hook.
  const [isHovered, setIsHovered] = React.useState(false);
// Return an object containing the state variable isHovered and the updater function setIsHovered from the hook.
  return { isHovered, setIsHovered };
};
