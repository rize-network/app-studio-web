import React from 'react';
// Defines a custom hook called useAlertState to manage alert visibility state.
export const useAlertState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  // Exposes the isHovered state and its updater function setIsHovered for outside use.
  return { isHovered, setIsHovered };
};
