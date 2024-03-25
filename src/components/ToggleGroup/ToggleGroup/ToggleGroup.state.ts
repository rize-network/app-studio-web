import { useState } from 'react';
// Define a custom hook for managing ToggleGroup state
export const useToggleGroupState = () => {
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  return { activeToggles, setActiveToggles };
};
