import { useState } from 'react';

export const useHoverCardState = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};
