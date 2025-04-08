import { useState } from 'react';

export const useCardState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
