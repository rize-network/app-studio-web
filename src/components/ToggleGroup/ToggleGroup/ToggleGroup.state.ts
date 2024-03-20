import { useState } from 'react';

export const useToggleGroupState = () => {
  const [activeToggles, setActiveToggles] = useState<string[]>([]);

  return { activeToggles, setActiveToggles };
};
