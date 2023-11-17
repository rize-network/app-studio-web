import { useMemo, useState } from 'react';

import { TextAreaProps } from './TextArea.props';

export const useTextAreaState = ({
  label,
  placeholder,
  value :defaultValue
}: TextAreaProps) => {
  const [hint, setHint] = useState(label ?? placeholder);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(  defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);

  useMemo(() => {
    setHint(
      isFocused && !value ? placeholder ?? '' : label ?? placeholder
    );
  }, [value, isFocused, label, placeholder]);

  return {
    hint,
    setHint,
    isHovered,
    setIsHovered,
    value,
    setValue,
    isFocused,
    setIsFocused,
  };
};
