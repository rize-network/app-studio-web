/**
 * ChatInterface State
 */

import { useState, useRef, useEffect } from 'react';

export const useChatInterfaceState = (initialMessages = []) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initialMessages]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = (callback?: (message: string) => void) => {
    if (!inputValue.trim()) return;

    setIsSubmitting(true);

    if (callback) {
      callback(inputValue);
    }

    setInputValue('');
    setIsSubmitting(false);
  };

  return {
    inputValue,
    isSubmitting,
    messagesEndRef,
    handleInputChange,
    handleSubmit,
    setInputValue,
  };
};
