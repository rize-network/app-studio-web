/**
 * PromptInput State
 */

import { useState, useRef, useEffect } from 'react';

export const usePromptInputState = (
  value: string,
  onChange: (value: string) => void,
  onSubmit: () => void,
  enableSuggestions: boolean
) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulate getting suggestions based on input
  useEffect(() => {
    if (enableSuggestions && value.trim() && isFocused) {
      // This would typically be an API call to get suggestions
      // For now, we'll just simulate some suggestions
      const dummySuggestions = [
        `${value} and explain the concept`,
        `${value} with examples`,
        `${value} in simple terms`,
      ];
      setSuggestions(dummySuggestions);
    } else {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  }, [value, enableSuggestions, isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle suggestion navigation with arrow keys
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          onChange(suggestions[selectedSuggestionIndex]);
          setSuggestions([]);
          setSelectedSuggestionIndex(-1);
          return;
        }
      }
    }

    // Submit on Enter (without shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    textareaRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicking on them
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return {
    suggestions,
    selectedSuggestionIndex,
    textareaRef,
    handleKeyDown,
    handleSuggestionClick,
    handleFocus,
    handleBlur,
  };
};
