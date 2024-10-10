import { useState } from 'react';
// This function initializes the Link component's state using the useState hook and exposes its state and setter function.
export const useLinkState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
