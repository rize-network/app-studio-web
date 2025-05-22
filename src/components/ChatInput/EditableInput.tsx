'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { View, useTheme } from 'app-studio';

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  views?: {
    container?: any;
    input?: any;
  };
}

export const EditableInput = forwardRef<HTMLDivElement, EditableInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Type your message...',
      disabled = false,
      autoFocus = true,
      views = {},
    },
    ref,
  ) => {
    const { getColor } = useTheme();
    const lastValueRef = useRef(value);
    
    // Update the content of the editable div when the value prop changes
    useEffect(() => {
      const editableDiv = ref as React.RefObject<HTMLDivElement>;
      if (editableDiv.current && value !== lastValueRef.current) {
        editableDiv.current.textContent = value;
        lastValueRef.current = value;
      }
    }, [value, ref]);
    
    // Handle input events
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.textContent || '';
      if (newValue !== lastValueRef.current) {
        onChange(newValue);
        lastValueRef.current = newValue;
      }
    };
    
    // Handle key down events
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit(e);
      }
    };
    
    return (
      <View
        width="100%"
        minHeight="40px"
        maxHeight="200px"
        overflowY="auto"
        {...views?.container}
      >
        <View
          as="div"
          ref={ref}
          contentEditable={!disabled}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          role="textbox"
          aria-multiline="true"
          aria-placeholder={placeholder}
          data-placeholder={placeholder}
          width="100%"
          minHeight="24px"
          outline="none"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          _empty={{
            _before: {
              content: 'attr(data-placeholder)',
              color: 'color.gray.400',
              pointerEvents: 'none',
            },
          }}
          {...views?.input}
        />
      </View>
    );
  }
);

EditableInput.displayName = 'EditableInput';
