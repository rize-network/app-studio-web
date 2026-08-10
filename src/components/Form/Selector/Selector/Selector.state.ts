import React from 'react';
import { SelectorProps } from './Selector.props';
// This file defines custom React hooks (`useSelectorState` and `useItemState`) to manage the internal state and logic for the Selector component and its individual items, including value, visibility, and interaction states.
export const useSelectorState = ({
  placeholder,
  isMulti,
  options,
  id: idProp,
}: SelectorProps) => {
  // `useId` is stable across renders where `Math.random` was not; the
  // delimiter characters are stripped so derived ids stay selector-safe.
  const reactId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = idProp ?? `selector-${reactId}`;
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
  };
};
export const useItemState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return { isHovered, setIsHovered };
};
