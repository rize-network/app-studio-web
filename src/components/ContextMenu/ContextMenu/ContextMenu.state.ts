import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateId } from '../../../utils/id';
import { Size, Variant } from './ContextMenu.type';

export const useContextMenuState = (props?: {
  size?: Size;
  variant?: Variant;
  onOpenChange?: (isOpen: boolean) => void;
}) => {
  const { size, variant, onOpenChange } = props || {};
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Unique ID for ARIA
  const contentId = React.useMemo(() => generateId('contextmenu-content'), []);

  // Define open and close menu functions
  const openMenu = useCallback(
    (event: React.MouseEvent) => {
      // Set position based on click coordinates
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
      onOpenChange?.(true);
    },
    [onOpenChange]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenuId(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Close the context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // Close the context menu when the window is resized
    const handleResize = () => {
      if (isOpen) {
        closeMenu();
      }
    };

    // Close the context menu when the escape key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    setIsOpen,
    position,
    setPosition,
    activeSubmenuId,
    setActiveSubmenuId,
    size,
    variant,
    triggerRef,
    contentRef,
    contentId,
    openMenu,
    closeMenu,
  };
};
