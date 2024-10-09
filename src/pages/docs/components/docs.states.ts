// ChatStates.ts
import { useState } from 'react';

export function useHomePageStates() {
  const [inputValue, setInputValue] = useState<string>('');

  return {
    inputValue,
    setInputValue,
  };
}
