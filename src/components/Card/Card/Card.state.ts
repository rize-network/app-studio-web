import { useState } from 'react';
// Manages the local state for the Card component, specifically tracking its hover status using a custom React hook.
export const useCardState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
