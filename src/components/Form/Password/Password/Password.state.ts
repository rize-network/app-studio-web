import { useState } from 'react';

export const usePasswordState = () => {
  const [isVisible, setIsVisible] = useState(false);
  return { isVisible, setIsVisible };
};
