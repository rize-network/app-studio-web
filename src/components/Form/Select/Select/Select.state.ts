import React from 'react';
import { SelectProps } from './Select.props';
// Initializes the custom hook 'useSelectState' for managing the state of the Select component
export const useSelectState = ({
  placeholder,
  isMulti,
  options,
}: SelectProps) => {
// Determines the default value based on the 'placeholder' and 'isMulti' props, setting to an empty array for multi-select or an empty string/single default option
  const defaultValue = placeholder ? (isMulti ? [] : '') : options[0].value;
// State hook for managing visibility of the Select dropdown, initially set to hidden
  const [hide, setHide] = React.useState(true);
// State hook for tracking mouse hover status over the Select component
  const [isHovered, setIsHovered] = React.useState(false);
// State hook for tracking focus status of the Select input field
  const [isFocused, setIsFocused] = React.useState(false);
// State hook for managing the value(s) selected by the user, initialized with the default value
  const [value, setValue] = React.useState<string | string[]>(defaultValue);
// State hook for keeping track of the currently highlighted index in the options list
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
// Returns an object containing all stateful values and their associated setters to manage the Select component's state
  return {
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
// Initializes another custom hook 'useItemState' for managing the hover state of each Select item
export const useItemState = () => {
// State hook for tracking mouse hover status over individual Select item options
  const [isHovered, setIsHovered] = React.useState(false);
// Returns an object with 'isHovered' state and its associated setter from the 'useItemState' hook, for controlling individual Select item hover state
  return { isHovered, setIsHovered };
};
