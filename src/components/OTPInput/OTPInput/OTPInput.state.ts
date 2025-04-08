import { useState, useRef } from 'react';
import { OTPInputProps } from './OTPInput.props';

export const useOTPInputState = ({
  value: defaultValue = '',
  length = 6,
}: OTPInputProps) => {
  // State for the OTP value
  const [value, setValue] = useState<string>(defaultValue.slice(0, length));
  
  // State for focus and hover
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Refs for input elements
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Set up input refs
  const setInputRef = (index: number, ref: HTMLInputElement | null) => {
    inputRefs.current[index] = ref;
  };
  
  // Focus a specific input
  const focusInput = (index: number) => {
    if (index >= 0 && index < length && inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };
  
  return {
    value,
    setValue,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    inputRefs,
    setInputRef,
    focusInput,
  };
};
