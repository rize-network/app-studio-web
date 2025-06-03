import { useState, useCallback, useEffect } from 'react';
import { KeywordsInputProps } from './KeywordsInput.props';
import { Keyword } from './KeywordsInput.type';

/**
 * Custom hook for managing KeywordsInput state
 */
export const useKeywordsInputState = (props: KeywordsInputProps) => {
  const {
    value,
    defaultValue = [],
    onChange,
    onAdd,
    onRemove,
    maxKeywords,
    minKeywordLength = 1,
    maxKeywordLength = 50,
    allowDuplicates = false,
    separators = ['enter', 'comma'],
    isDisabled = false,
    isReadOnly = false,
  } = props;

  // State for input value
  const [inputValue, setInputValue] = useState('');

  // State for keywords (controlled vs uncontrolled)
  const [internalKeywords, setInternalKeywords] = useState<Keyword[]>(() => {
    const initialValue = value || defaultValue;
    return initialValue.map((keyword, index) => ({
      id: `keyword-${index}-${Date.now()}`,
      value: keyword,
    }));
  });

  // State for focus and hover
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use controlled value if provided, otherwise use internal state
  const keywords = value
    ? value.map((keyword, index) => ({
        id: `keyword-${index}-${Date.now()}`,
        value: keyword,
      }))
    : internalKeywords;

  // Update internal keywords when controlled value changes
  useEffect(() => {
    if (value) {
      setInternalKeywords(
        value.map((keyword, index) => ({
          id: `keyword-${index}-${Date.now()}`,
          value: keyword,
        }))
      );
    }
  }, [value]);

  /**
   * Validates a keyword before adding
   */
  const validateKeyword = useCallback(
    (keyword: string): boolean => {
      const trimmed = keyword.trim();

      // Check length constraints
      if (
        trimmed.length < minKeywordLength ||
        trimmed.length > maxKeywordLength
      ) {
        return false;
      }

      // Check for duplicates if not allowed
      if (!allowDuplicates) {
        const keywordValues = keywords.map((k) => k.value.toLowerCase());
        if (keywordValues.includes(trimmed.toLowerCase())) {
          return false;
        }
      }

      // Check maximum keywords limit
      if (maxKeywords && keywords.length >= maxKeywords) {
        return false;
      }

      return true;
    },
    [keywords, minKeywordLength, maxKeywordLength, allowDuplicates, maxKeywords]
  );

  /**
   * Adds a new keyword
   */
  const addKeyword = useCallback(
    (keyword: string) => {
      if (isDisabled || isReadOnly) return;

      const trimmed = keyword.trim();
      if (!trimmed || !validateKeyword(trimmed)) return;

      const newKeyword: Keyword = {
        id: `keyword-${Date.now()}-${Math.random()}`,
        value: trimmed,
      };

      const newKeywords = [...keywords, newKeyword];
      const keywordValues = newKeywords.map((k) => k.value);

      if (!value) {
        setInternalKeywords(newKeywords);
      }

      onChange?.(keywordValues);
      onAdd?.(trimmed);
      setInputValue('');
    },
    [keywords, validateKeyword, onChange, onAdd, isDisabled, isReadOnly, value]
  );

  /**
   * Removes a keyword by index
   */
  const removeKeyword = useCallback(
    (index: number) => {
      if (isDisabled || isReadOnly) return;

      const keywordToRemove = keywords[index];
      if (!keywordToRemove) return;

      const newKeywords = keywords.filter((_, i) => i !== index);
      const keywordValues = newKeywords.map((k) => k.value);

      if (!value) {
        setInternalKeywords(newKeywords);
      }

      onChange?.(keywordValues);
      onRemove?.(keywordToRemove.value, index);
    },
    [keywords, onChange, onRemove, isDisabled, isReadOnly, value]
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
        const keywordToAdd = parts[0];
        const remaining = parts.slice(1).join(',');

        if (keywordToAdd.trim()) {
          addKeyword(keywordToAdd);
        }
        setInputValue(remaining);
        return;
      }

      setInputValue(newValue);
    },
    [addKeyword, separators, isDisabled, isReadOnly]
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
          addKeyword(inputValue);
        }
        return;
      }

      // Handle Tab key
      if (separators.includes('tab') && key === 'Tab' && inputValue.trim()) {
        event.preventDefault();
        addKeyword(inputValue);
        return;
      }

      // Handle Space key
      if (separators.includes('space') && key === ' ' && inputValue.trim()) {
        event.preventDefault();
        addKeyword(inputValue);
        return;
      }

      // Handle Backspace to remove last keyword
      if (key === 'Backspace' && !inputValue && keywords.length > 0) {
        event.preventDefault();
        removeKeyword(keywords.length - 1);
        return;
      }
    },
    [
      addKeyword,
      removeKeyword,
      inputValue,
      keywords,
      separators,
      isDisabled,
      isReadOnly,
    ]
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

    // Add current input value as keyword on blur if it exists
    if (inputValue.trim()) {
      addKeyword(inputValue);
    }

    props.onBlur?.();
  }, [addKeyword, inputValue, props.onBlur]);

  return {
    inputValue,
    setInputValue,
    keywords,
    setKeywords: setInternalKeywords,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    addKeyword,
    removeKeyword,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    validateKeyword,
  };
};
