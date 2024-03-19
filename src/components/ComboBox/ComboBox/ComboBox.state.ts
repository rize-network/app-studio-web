import { useState } from 'react';

export const useComboBoxState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return { isHovered, setIsHovered };
};
