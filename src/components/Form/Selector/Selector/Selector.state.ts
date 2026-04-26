import React from 'react';
import { SelectorProps } from './Selector.props';
// This file defines custom React hooks (`useSelectorState` and `useItemState`) to manage the internal state and logic for the Selector component and its individual items, including value, visibility, and interaction states.
export const useSelectorState = ({
  placeholder,
  isMulti,
  options,
  id = `selector-${Math.random().toString(36).substr(2, 9)}`,
}: SelectorProps) => {
  const defaultValue = placeholder
    ? isMulti
      ? []
      : ''
    : Array.isArray(options) && options.length > 0
    ? options[0].value
    : isMulti
    ? []
    : '';
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState<string | string[]>(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
  const [hide, setHide] = React.useState(true);
  return {
    id,
    value,
    setValue,
    hide,
    setHide,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
    highlightedIndex,
    setHighlightedIndex,
  };
};
export const useItemState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return { isHovered, setIsHovered };
};
