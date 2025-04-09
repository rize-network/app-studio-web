import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { HoverCardProps } from './HoverCard.props';

// Generate a unique ID for ARIA attributes
const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

export const useHoverCardState = ({
  openDelay = 200,
  closeDelay = 300,
}: Pick<HoverCardProps, 'openDelay' | 'closeDelay'> = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for trigger and content elements for positioning
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Unique IDs for ARIA attributes
  const contentId = useMemo(() => generateId('hovercard-content'), []);
  const triggerId = useMemo(() => generateId('hovercard-trigger'), []);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openCard = useCallback(() => {
    clearTimers(); // Clear any pending close
    if (!isOpen) {
      openTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    }
  }, [isOpen, openDelay, clearTimers]);

  const closeCard = useCallback(() => {
    clearTimers(); // Clear any pending open
    if (isOpen) {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
    }
  }, [isOpen, closeDelay, clearTimers]);

  // Function specifically to cancel the close timer (e.g., when mouse enters content)
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return {
    isOpen,
    openCard,
    closeCard,
    cancelCloseTimer,
    triggerRef,
    contentRef,
    contentId,
    triggerId,
  };
};
