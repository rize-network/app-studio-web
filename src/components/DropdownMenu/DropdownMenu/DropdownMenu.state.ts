import { useState, useEffect } from 'react';
// This file defines the `useDropdownMenuState` custom hook, which encapsulates the entire state management and interaction logic for a dropdown menu component, including its open/closed state, active submenu tracking, and event listeners for closing the dropdown on outside clicks, window resize, or 'Escape' key press.
export const useDropdownMenuState = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      const isOutside = !path.some(
        (element: any) =>
          element?.id === 'dropdown-menu' || element?.id === 'dropdown-trigger'
      );
      if (isOutside && isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }
    };
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
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
  }, [isOpen]);
  return {
    isOpen,
    setIsOpen,
    activeSubmenuId,
    setActiveSubmenuId,
  };
};
