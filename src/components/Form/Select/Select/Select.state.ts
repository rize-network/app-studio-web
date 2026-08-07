import React from 'react';
import { SelectProps } from './Select.props';

// The view branches on the shape of the value: an array renders as removable
// chips, a string as a single label. A caller passing the shape that does not
// match the current mode (a string with `isMulti`, an array without) has to be
// brought back in line before anything reads it, or the branch taken silently
// disagrees with the mode the component is in.
const normalizeValue = (
  value: string | Array<string>,
  isMulti?: boolean
): string | Array<string> => {
  if (isMulti) {
    if (Array.isArray(value)) return value;
    return value === '' ? [] : [value];
  }
  return Array.isArray(value) ? value[0] ?? '' : value;
};

// Initializes the custom hook 'useSelectState' for managing the state of the Select component
export const useSelectState = ({
  placeholder,
  isMulti,
  options,
  // No default value here: `undefined` is exactly what separates controlled
  // from uncontrolled, so defaulting it would pin the select to that default
  // and make `setValue` a permanent no-op.
  value: controlledValue,
  defaultValue,
  id = `select-${Math.random().toString(36).substr(2, 9)}`,
}: SelectProps) => {
  const isControlled = controlledValue !== undefined;

  // State hook for tracking mouse hover status over the Select component
  const [isHovered, setIsHovered] = React.useState(false);
  // State hook for tracking focus status of the Select input field
  const [isFocused, setIsFocused] = React.useState(false);
  // Backing store for uncontrolled use. It is still initialized when the
  // select is controlled — harmlessly — so that a component that starts
  // controlled and later drops `value` has somewhere to land.
  const [internalValue, setInternalValue] = React.useState<
    string | Array<string>
  >(() => {
    if (defaultValue !== undefined)
      return normalizeValue(defaultValue, isMulti);
    // A multi-select starts empty: preselecting an option nobody asked for is
    // a selection the user then has to undo.
    if (isMulti) return [];
    // A placeholder means "start empty". Without one, the first option stands
    // in for a native <select>'s implicit first-option selection.
    if (placeholder) return '';
    return Array.isArray(options) && options.length > 0 ? options[0].value : '';
  });

  // The value everything downstream reads. In controlled mode it is the prop,
  // read fresh on every render, so the selection tracks the parent's state
  // instead of freezing at whatever it was on mount.
  const value = isControlled
    ? normalizeValue(controlledValue as string | Array<string>, isMulti)
    : internalValue;

  // In controlled mode the parent owns the value: the component records the
  // intent through `onChange` and waits for the new value to come back down.
  // Writing to internal state here would let the two copies disagree.
  const setValue = React.useCallback(
    (next: string | Array<string>) => {
      if (!isControlled) setInternalValue(next);
    },
    [isControlled]
  );

  // State hook for keeping track of the currently highlighted index in the options list
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
  // State hook for managing visibility of the Select dropdown, initially set to hidden
  const [hide, setHide] = React.useState(true);

  // Returns an object containing all stateful values and their associated setters to manage the Select component's state
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
// Initializes another custom hook 'useItemState' for managing the hover state of each Select item
export const useItemState = () => {
  // State hook for tracking mouse hover status over individual Select item options
  const [isHovered, setIsHovered] = React.useState(false);
  // Returns an object with 'isHovered' state and its associated setter from the 'useItemState' hook, for controlling individual Select item hover state
  return { isHovered, setIsHovered };
};
