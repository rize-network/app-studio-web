import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatWidgetProps } from './ChatWidget.props';
// This file defines a custom React hook `useChatWidgetState` to encapsulate the state management and logic for the ChatWidget component, handling input values, message display, and submission, supporting both controlled and uncontrolled component patterns.
export function useChatWidgetState(props: ChatWidgetProps) {
  const { inputValue, onInputChange, onSubmit, messages = [] } = props;
  const [internalInputValue, setInternalInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isControlled = inputValue !== undefined;
  const currentInputValue =
    inputValue !== undefined ? inputValue : internalInputValue;
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
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      const trimmedValue = currentInputValue.trim();
      if (trimmedValue && onSubmit) {
        onSubmit(trimmedValue);
        if (!isControlled) {
          setInternalInputValue('');
        }
        if (inputRef.current) {
          inputRef.current.style.height = 'auto';
        }
      }
    },
    [currentInputValue, onSubmit, isControlled]
  );
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
