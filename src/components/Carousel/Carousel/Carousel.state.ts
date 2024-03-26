import { useState } from 'react';

export const useCarouselState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
