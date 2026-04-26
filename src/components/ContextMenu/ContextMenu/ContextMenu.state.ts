import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateId } from '../../../utils/id';
import { Size, Variant } from './ContextMenu.type';
// This hook encapsulates all the state management and logic required for the ContextMenu component, handling its open/close state, positioning, active submenus, and external event listeners for proper behavior.
export const useContextMenuState = (props?: {
  size?: Size;
  variant?: Variant;
  onOpenChange?: (isOpen: boolean) => void;
}) => {
  // Destructures the size, variant, and onOpenChange properties from the props object, providing default values if props are not provided.
  const { size, variant, onOpenChange } = props || {};
  // Manages the visibility state of the context menu (true for open, false for closed).
  const [isOpen, setIsOpen] = useState(false);
  // Stores the x and y coordinates where the context menu should appear on the screen.
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Keeps track of the currently active submenu's unique identifier, or null if no submenu is active.
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  // A ref used to reference the DOM element that triggers the context menu.
  const triggerRef = useRef<HTMLElement>(null);
  // A ref used to reference the DOM element containing the context menu's content.
  const contentRef = useRef<HTMLDivElement>(null);
  // Generates a stable, unique ID for the context menu content, ensuring accessibility and proper linking.
  const contentId = React.useMemo(() => generateId('contextmenu-content'), []);
  // A memoized callback function to open the context menu at the specified event coordinates.
  const openMenu = useCallback(
    (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
      onOpenChange?.(true);
    },
    [onOpenChange]
  );
  // A memoized callback function to close the context menu and reset the active submenu state.
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenuId(null);
    onOpenChange?.(false);
  }, [onOpenChange]);
  // Sets up global event listeners for closing the menu when clicking outside, resizing the window, or pressing the Escape key.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    const handleResize = () => {
      if (isOpen) {
        closeMenu();
      }
    };
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
