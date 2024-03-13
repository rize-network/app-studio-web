import React from 'react';

export const useAlertState = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return { isHovered, setIsHovered };
};
