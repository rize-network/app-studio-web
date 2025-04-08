import { useState, useEffect } from 'react';

export const useContextMenuState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  // Close the context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      const isOutside = !path.some(
        (element: any) => element?.id === 'context-menu'
      );
      if (isOutside && isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }
    };

    // Close the context menu when the window is resized
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }
    };

    // Close the context menu when the escape key is pressed
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
    position,
    setPosition,
    activeSubmenuId,
    setActiveSubmenuId,
  };
};
