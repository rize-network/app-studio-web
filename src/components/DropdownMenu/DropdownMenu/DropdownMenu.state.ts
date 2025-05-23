import { useState, useEffect } from 'react';

export const useDropdownMenuState = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  // Close the dropdown menu when clicking outside
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

    // Close the dropdown menu when the window is resized
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }
    };

    // Close the dropdown menu when the escape key is pressed
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
