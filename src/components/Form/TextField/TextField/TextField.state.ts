import { useState } from 'react';

import { TextFieldProps } from './TextField.props';

export const useTextFieldState = ({
  label,
  placeholder,
  value,
}: TextFieldProps) => {
  const [hint, setHint] = useState(label ?? placeholder);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  return {
    hint,
    setHint,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    inputValue,
    setInputValue,
  };
};
