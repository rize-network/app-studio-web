import React from 'react';

export const useButtonState = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return { isHovered, setIsHovered };
};
