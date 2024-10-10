import { useMemo, useState } from 'react';
import { TextFieldProps } from './TextField.props';
// Define a custom hook `useTextFieldState` that creates and manages the state of a text field component based on its properties.
export const useTextFieldState = ({
  label,
  placeholder,
  value: defaultValue,
}: TextFieldProps) => {
// Initialize `hint` state with either the label or placeholder text, using label as a priority if it exists.
  const [hint, setHint] = useState(label ?? placeholder);
// Set up a boolean state `isFocused` to track if the text field is focused.
  const [isFocused, setIsFocused] = useState(false);
// Introduce a boolean state `isHovered` for tracking mouse hover status over the text field.
  const [isHovered, setIsHovered] = useState(false);
// Manage the `value` state that holds the current value of the text field, initialized with defaultValue.
  const [value, setValue] = useState(defaultValue);
// Use `useMemo` hook to recompute hint text when any dependency changes, updating it based on focus state and presence of value.
  useMemo(() => {
// Update the `hint` state depending on whether the text field is focused and if value is not present, falling back to placeholder or label.
    setHint(isFocused && !value ? placeholder ?? '' : label ?? placeholder);
// Specify the dependencies for the `useMemo` hook - updating the `hint` text when value, isFocused, label, or placeholder changes.
  }, [value, isFocused, label, placeholder]);
// Return an object exposing the states and state setter functions for consumer components to use and manage the text field's UI and behavior.
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
