import { useState, useEffect } from 'react';

export const useSidebarState = (
  defaultExpanded: boolean = true,
  expanded?: boolean,
  onExpandedChange?: (expanded: boolean) => void,
  breakpoint?: number
) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    expanded !== undefined ? expanded : defaultExpanded
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    breakpoint ? window.innerWidth < breakpoint : false
  );

  // Handle controlled expanded state
  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    if (!breakpoint) return;

    const handleResize = () => {
      const newIsMobile = window.innerWidth < breakpoint;
      setIsMobile(newIsMobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

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
