import { useState } from 'react';

export const useToggleState = (defaultToggled: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isToggle, setIsToggled] = useState(defaultToggled);
  return { isHovered, setIsHovered, isToggle, setIsToggled };
};
