import { useState } from 'react';

import { TextAreaProps } from './TextArea.props';

export const useTextAreaState = ({
  label,
  placeholder,
  defaultValue,
  value,
}: TextAreaProps) => {
  const [hint, setHint] = useState(label ?? placeholder);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);

  return {
    hint,
    setHint,
    isHovered,
    setIsHovered,
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
  };
};
