import { useState } from 'react';

export const useLinkState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
