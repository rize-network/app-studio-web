import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatWidgetProps } from './ChatWidget.props';

/**
 * Custom hook for managing ChatWidget component state
 */
export function useChatWidgetState(props: ChatWidgetProps) {
  const { inputValue, onInputChange, onSubmit, messages = [] } = props;

  // Internal state for uncontrolled input
  const [internalInputValue, setInternalInputValue] = useState('');

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Determine if the component is controlled
  const isControlled = inputValue !== undefined;

  // Get the current input value
  const currentInputValue =
    inputValue !== undefined ? inputValue : internalInputValue;

  // Handle input changes
  const handleInputChange = useCallback(
    (value: string) => {
      if (isControlled) {
        onInputChange?.(value);
      } else {
        setInternalInputValue(value);
      }
    },
    [isControlled, onInputChange]
  );

  // Handle message submission
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const trimmedValue = currentInputValue.trim();
      if (trimmedValue && onSubmit) {
        onSubmit(trimmedValue);

        // Clear input after submission (only for uncontrolled)
        if (!isControlled) {
          setInternalInputValue('');
        }

        // Reset textarea height
        if (inputRef.current) {
          inputRef.current.style.height = 'auto';
        }
      }
    },
    [currentInputValue, onSubmit, isControlled]
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages.length]);

  return {
    internalInputValue: currentInputValue,
    handleInputChange,
    handleSubmit,
    inputRef,
    messagesRef,
  };
}
