import { useMemo, useState } from 'react';

import { TextFieldProps } from './TextField.props';

export const useTextFieldState = ({
  label,
  placeholder,
  value : defaultValue,
}: TextFieldProps) => {
  const [hint, setHint] = useState(label ?? placeholder);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useMemo(() => {
    setHint(isFocused && !value ? placeholder ?? '' : label ?? placeholder);
  }, [value, isFocused, label, placeholder]);

  return {
    hint,
    setHint,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    setValue,
    value,
  };
};
