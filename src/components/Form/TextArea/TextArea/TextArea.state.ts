import { useMemo, useState } from 'react';
import { TextAreaProps } from './TextArea.props';
// Declaration of the useTextAreaState custom hook for managing the text area component state.
export const useTextAreaState = ({
  label,
  placeholder,
  value: defaultValue,
// Initializes the custom hook with properties from TextAreaProps and returns the text area state management functions and values.
}: TextAreaProps) => {
// State hook for the 'hint' value, displaying either the label or placeholder as guidance within the text area.
  const [hint, setHint] = useState(label ?? placeholder);
// State hook for tracking whether the text area is hovered over.
  const [isHovered, setIsHovered] = useState(false);
// State hook to manage the current value of the text area, initialized with the default value or an empty string.
  const [value, setValue] = useState(defaultValue || '');
// State hook to determine if the text area is currently focused.
  const [isFocused, setIsFocused] = useState(false);
// Memoized callback that sets the hint based on focus state and value presence to ensure proper label or placeholder visibility.
  useMemo(() => {
    setHint(isFocused && !value ? placeholder ?? '' : label ?? placeholder);
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
// Export of the useTextAreaState hook for external usage.
};
