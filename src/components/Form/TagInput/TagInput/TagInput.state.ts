import { useState, useCallback, useEffect } from 'react';
import { TagInputProps } from './TagInput.props';
import { Tag } from './TagInput.type';

/**
 * Custom hook for managing TagInput state
 */
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

  // State for input value
  const [inputValue, setInputValue] = useState('');

  // State for tags (controlled vs uncontrolled)
  const [internalTags, setInternalTags] = useState<Tag[]>(() => {
    const initialValue = controlledTags || defaultTags || [];
    return initialValue.map((tag, index) => ({
      id: `tag-${index}-${Date.now()}`,
      value: tag,
    }));
  });

  // State for focus and hover
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use controlled value if provided, otherwise use internal state
  const tags =
    controlledTags && Array.isArray(controlledTags)
      ? controlledTags.map((tag, index) => ({
          id: `tag-${index}-${Date.now()}`,
          value: tag,
        }))
      : internalTags;

  // Update internal tags when controlled value changes
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

  /**
   * Validates a tag before adding
   */
  const validateTag = useCallback(
    (tag: string): boolean => {
      const trimmed = tag.trim();

      // Check length constraints
      if (trimmed.length < minTagLength || trimmed.length > maxTagLength) {
        return false;
      }

      // Check for duplicates if not allowed
      if (!allowDuplicates) {
        const tagValues = tags.map((t) => t.value.toLowerCase());
        if (tagValues.includes(trimmed.toLowerCase())) {
          return false;
        }
      }

      // Check maximum tags limit
      if (maxTags && tags.length >= maxTags) {
        return false;
      }

      return true;
    },
    [tags, minTagLength, maxTagLength, allowDuplicates, maxTags]
  );

  /**
   * Adds a new tag
   */
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

  /**
   * Removes a tag by index
   */
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

  /**
   * Handles input change
   */
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;

      const newValue = event.target.value;

      // Check for comma separator
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

  /**
   * Handles key down events
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;

      const { key } = event;

      // Handle Enter key
      if (separators.includes('enter') && key === 'Enter') {
        event.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
        return;
      }

      // Handle Tab key
      if (separators.includes('tab') && key === 'Tab' && inputValue.trim()) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }

      // Handle Space key
      if (separators.includes('space') && key === ' ' && inputValue.trim()) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }

      // Handle Backspace to remove last tag
      if (key === 'Backspace' && !inputValue && tags.length > 0) {
        event.preventDefault();
        removeTag(tags.length - 1);
        return;
      }
    },
    [addTag, removeTag, inputValue, tags, separators, isDisabled, isReadOnly]
  );

  /**
   * Handles input focus
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    props.onFocus?.();
  }, [props.onFocus]);

  /**
   * Handles input blur
   */
  const handleBlur = useCallback(() => {
    setIsFocused(false);

    // Add current input value as tag on blur if it exists
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
