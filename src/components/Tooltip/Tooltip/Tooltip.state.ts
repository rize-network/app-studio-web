import { useState, useRef, useCallback, useEffect } from 'react';
import { generateId } from '../../../utils/generateId';
interface TooltipStateProps {
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
  isDisabled?: boolean;
}
// This file provides the `useTooltipState` custom hook, which encapsulates all the state management and logic for the Tooltip component, including open/close state, timers for delayed appearance/disappearance, accessibility IDs, and keyboard event handling for interaction.
export const useTooltipState = ({
  defaultOpen = false,
  openDelay = 200,
  closeDelay = 200,
  isDisabled = false,
}: TooltipStateProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const triggerId = useRef(`tooltip-trigger-${generateId()}`).current;
  const contentId = useRef(`tooltip-content-${generateId()}`).current;
  const openTooltip = useCallback(() => {
    if (isDisabled) return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (!isOpen && !openTimerRef.current) {
      openTimerRef.current = setTimeout(() => {
        setIsOpen(true);
        openTimerRef.current = null;
      }, openDelay);
    }
  }, [isOpen, openDelay, isDisabled]);
  const closeTooltip = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (isOpen && !closeTimerRef.current) {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        closeTimerRef.current = null;
      }, closeDelay);
    }
  }, [isOpen, closeDelay]);
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);
  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  return {
    isOpen,
    openTooltip,
    closeTooltip,
    cancelCloseTimer,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
  };
};
