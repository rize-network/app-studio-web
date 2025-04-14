/**
 * PromptInput View
 */

import React from 'react';
import { View } from 'app-studio';
import { Button } from '../../../Button/Button';
import { Text } from '../../../Text/Text';
import { LoadingIndicator } from '../../LoadingIndicator/LoadingIndicator';
import { PromptInputProps } from './PromptInput.props';
import {
  containerStyles,
  getInputContainerStyles,
  textareaStyles,
  buttonsContainerStyles,
  suggestionsContainerStyles,
  suggestionStyles,
} from './PromptInput.style';

interface Props extends PromptInputProps {
  suggestions: string[];
  selectedSuggestionIndex: number;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export const PromptInputView: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type a message...',
  isDisabled = false,
  isLoading = false,
  enableFileUpload = false,
  enableVoiceInput = false,
  enableSuggestions = false,
  maxRows = 5,
  minRows = 1,
  transparentBackground = false,
  styles = {},
  suggestions,
  selectedSuggestionIndex,
  textareaRef,
  handleKeyDown,
  handleSuggestionClick,
  handleFocus,
  handleBlur,
  ...props
}) => {
  // Calculate rows based on content
  const calculateRows = () => {
    const lineCount = (value.match(/\n/g) || []).length + 1;
    return Math.min(Math.max(lineCount, minRows), maxRows);
  };

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      {suggestions.length > 0 && (
        <View {...suggestionsContainerStyles} {...styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <View
              key={index}
              {...suggestionStyles(index === selectedSuggestionIndex)}
              {...styles.suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Text>{suggestion}</Text>
            </View>
          ))}
        </View>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={isDisabled || isLoading}
        rows={calculateRows()}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          lineHeight: '1.5',
          resize: 'none',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />

      <View {...buttonsContainerStyles} {...styles.buttonsContainer}>
        {enableFileUpload && (
          <Button
            variant="ghost"
            size="sm"
            isDisabled={isDisabled || isLoading}
            aria-label="Attach file"
          >
            📎
          </Button>
        )}

        {enableVoiceInput && (
          <Button
            variant="ghost"
            size="sm"
            isDisabled={isDisabled || isLoading}
            aria-label="Voice input"
          >
            🎤
          </Button>
        )}

        <Button
          size="sm"
          isDisabled={isDisabled || !value.trim()}
          onClick={onSubmit}
          aria-label="Send message"
        >
          {isLoading ? <LoadingIndicator size="xs" /> : '➤'}
        </Button>
      </View>
    </View>
  );
};
