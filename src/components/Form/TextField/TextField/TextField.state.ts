import { useMemo, useState } from 'react';

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

  useMemo(() => {
    setHint(
      isFocused && !inputValue ? placeholder ?? '' : label ?? placeholder
    );
  }, [inputValue, isFocused, label, placeholder]);

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
