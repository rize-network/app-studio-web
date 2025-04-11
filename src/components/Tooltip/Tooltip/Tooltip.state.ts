import { useState, useRef, useCallback, useEffect } from 'react';
import { generateId } from '../../../utils/generateId';

interface TooltipStateProps {
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
  isDisabled?: boolean;
}

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
  
  // Generate unique IDs for accessibility
  const triggerId = useRef(`tooltip-trigger-${generateId()}`).current;
  const contentId = useRef(`tooltip-content-${generateId()}`).current;

  // Open tooltip with delay
  const openTooltip = useCallback(() => {
    if (isDisabled) return;
    
    // Clear any existing close timer
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    
    // Set open timer
    if (!isOpen && !openTimerRef.current) {
      openTimerRef.current = setTimeout(() => {
        setIsOpen(true);
        openTimerRef.current = null;
      }, openDelay);
    }
  }, [isOpen, openDelay, isDisabled]);

  // Close tooltip with delay
  const closeTooltip = useCallback(() => {
    // Clear any existing open timer
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    
    // Set close timer
    if (isOpen && !closeTimerRef.current) {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        closeTimerRef.current = null;
      }, closeDelay);
    }
  }, [isOpen, closeDelay]);

  // Cancel close timer (used when mouse enters content)
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Clean up timers on unmount
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

  // Close tooltip on ESC key
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
