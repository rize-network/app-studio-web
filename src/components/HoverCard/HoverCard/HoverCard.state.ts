import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { HoverCardProps } from './HoverCard.props';
const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
// This file encapsulates the entire state management logic for the HoverCard component, including its open/close state, delay timers, and DOM references, exposed via the `useHoverCardState` hook.
export const useHoverCardState = ({
  openDelay = 200,
  closeDelay = 300,
}: Pick<HoverCardProps, 'openDelay' | 'closeDelay'> = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
    clearTimers();
    if (!isOpen) {
      openTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    }
  }, [isOpen, openDelay, clearTimers]);
  const closeCard = useCallback(() => {
    clearTimers();
    if (isOpen) {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
    }
  }, [isOpen, closeDelay, clearTimers]);
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);
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
