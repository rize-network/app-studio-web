/**
 * PromptInput Component
 *
 * A textarea input component specifically designed for AI chat interfaces.
 * Includes features like suggestions, file upload, and voice input.
 */

import React from 'react';
import { PromptInputProps } from './PromptInput/PromptInput.props';
import { usePromptInputState } from './PromptInput/PromptInput.state';
import { PromptInputView } from './PromptInput/PromptInput.view';

export const PromptInput: React.FC<PromptInputProps> = (props) => {
  const { value, onChange, onSubmit, enableSuggestions = false } = props;

  const {
    suggestions,
    selectedSuggestionIndex,
    textareaRef,
    handleKeyDown,
    handleSuggestionClick,
    handleFocus,
    handleBlur,
  } = usePromptInputState(value, onChange, onSubmit, enableSuggestions);

  return (
    <PromptInputView
      {...props}
      suggestions={suggestions}
      selectedSuggestionIndex={selectedSuggestionIndex}
      textareaRef={textareaRef}
      handleKeyDown={handleKeyDown}
      handleSuggestionClick={handleSuggestionClick}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
    />
  );
};

export type { PromptInputProps } from './PromptInput/PromptInput.props';
