import React from 'react';

export const useTableState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return { isHovered, setIsHovered };
};
