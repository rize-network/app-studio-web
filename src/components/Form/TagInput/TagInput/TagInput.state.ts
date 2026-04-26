import { useState, useCallback, useEffect } from 'react';
import { TagInputProps } from './TagInput.props';
import { Tag } from './TagInput.type';
// This file defines the `useTagInputState` hook, which manages all local state and logic for the TagInput component. It handles tag creation, validation, removal, input field management, and user interactions like focus, blur, and keyboard events, supporting both controlled and uncontrolled tag modes.
export const useTagInputState = (props: TagInputProps) => {
  const {
    tags: controlledTags,
    defaultTags = [],
    onTagsChange,
    onTagAdd,
    onTagRemove,
    maxTags,
    minTagLength = 1,
    maxTagLength = 50,
    allowDuplicates = false,
    separators = ['enter', 'comma'],
    isDisabled = false,
    isReadOnly = false,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [internalTags, setInternalTags] = useState<Tag[]>(() => {
    const initialValue = controlledTags || defaultTags || [];
    return initialValue.map((tag, index) => ({
      id: `tag-${index}-${Date.now()}`,
      value: tag,
    }));
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tags =
    controlledTags && Array.isArray(controlledTags)
      ? controlledTags.map((tag, index) => ({
          id: `tag-${index}-${Date.now()}`,
          value: tag,
        }))
      : internalTags;
  useEffect(() => {
    if (controlledTags && Array.isArray(controlledTags)) {
      setInternalTags(
        controlledTags.map((tag, index) => ({
          id: `tag-${index}-${Date.now()}`,
          value: tag,
        }))
      );
    }
  }, [controlledTags]);
  const validateTag = useCallback(
    (tag: string): boolean => {
      const trimmed = tag.trim();
      if (trimmed.length < minTagLength || trimmed.length > maxTagLength) {
        return false;
      }
      if (!allowDuplicates) {
        const tagValues = tags.map((t) => t.value.toLowerCase());
        if (tagValues.includes(trimmed.toLowerCase())) {
          return false;
        }
      }
      if (maxTags && tags.length >= maxTags) {
        return false;
      }
      return true;
    },
    [tags, minTagLength, maxTagLength, allowDuplicates, maxTags]
  );
  const addTag = useCallback(
    (tag: string) => {
      if (isDisabled || isReadOnly) return;
      const trimmed = tag.trim();
      if (!trimmed || !validateTag(trimmed)) return;
      const newTag: Tag = {
        id: `tag-${Date.now()}-${Math.random()}`,
        value: trimmed,
      };
      const newTags = [...tags, newTag];
      const tagValues = newTags.map((t) => t.value);
      if (!controlledTags) {
        setInternalTags(newTags);
      }
      onTagsChange?.(tagValues);
      onTagAdd?.(trimmed);
      setInputValue('');
    },
    [
      tags,
      validateTag,
      onTagsChange,
      onTagAdd,
      isDisabled,
      isReadOnly,
      controlledTags,
    ]
  );
  const removeTag = useCallback(
    (index: number) => {
      if (isDisabled || isReadOnly) return;
      const tagToRemove = tags[index];
      if (!tagToRemove) return;
      const newTags = tags.filter((_, i) => i !== index);
      const tagValues = newTags.map((t) => t.value);
      if (!controlledTags) {
        setInternalTags(newTags);
      }
      onTagsChange?.(tagValues);
      onTagRemove?.(tagToRemove.value, index);
    },
    [tags, onTagsChange, onTagRemove, isDisabled, isReadOnly, controlledTags]
  );
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      const newValue = event.target.value;
      if (separators.includes('comma') && newValue.includes(',')) {
        const parts = newValue.split(',');
        const tagToAdd = parts[0];
        const remaining = parts.slice(1).join(',');
        if (tagToAdd.trim()) {
          addTag(tagToAdd);
        }
        setInputValue(remaining);
        return;
      }
      setInputValue(newValue);
    },
    [addTag, separators, isDisabled, isReadOnly]
  );
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      const { key } = event;
      if (separators.includes('enter') && key === 'Enter') {
        event.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
        return;
      }
      if (separators.includes('tab') && key === 'Tab' && inputValue.trim()) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }
      if (separators.includes('space') && key === ' ' && inputValue.trim()) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }
      if (key === 'Backspace' && !inputValue && tags.length > 0) {
        event.preventDefault();
        removeTag(tags.length - 1);
        return;
      }
    },
    [addTag, removeTag, inputValue, tags, separators, isDisabled, isReadOnly]
  );
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    props.onFocus?.();
  }, [props.onFocus]);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (inputValue.trim()) {
      addTag(inputValue);
    }
    props.onBlur?.();
  }, [addTag, inputValue, props.onBlur]);
  return {
    inputValue,
    setInputValue,
    tags,
    setTags: setInternalTags,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    addTag,
    removeTag,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    validateTag,
  };
};
