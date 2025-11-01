import { useState, useEffect } from 'react';
import { useResponsive } from 'app-studio';

export const useSidebarState = (
  defaultExpanded: boolean = true,
  expanded?: boolean,
  onExpandedChange?: (expanded: boolean) => void,
  breakpoint?: number
) => {
  const { on } = useResponsive();
  const isMobile = on('mobile');

  const [isExpanded, setIsExpanded] = useState<boolean>(
    expanded !== undefined ? expanded : defaultExpanded
  );

  // Handle controlled expanded state
  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (onExpandedChange) {
      onExpandedChange(newExpanded);
    }
  };

  const expand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      if (onExpandedChange) {
        onExpandedChange(true);
      }
    }
  };

  const collapse = () => {
    if (isExpanded) {
      setIsExpanded(false);
      if (onExpandedChange) {
        onExpandedChange(false);
      }
    }
  };

  return {
    isExpanded,
    toggleExpanded,
    expand,
    collapse,
    isMobile,
  };
};
