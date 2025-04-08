import { useState, useEffect } from 'react';

export const useMenubarState = (
  defaultActiveMenuId: string | null = null,
  defaultOpenMenuId: string | null = null
) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(defaultActiveMenuId);
  const [openMenuId, setOpenMenuId] = useState<string | null>(defaultOpenMenuId);

  const isMenuOpen = (menuId: string) => {
    return openMenuId === menuId;
  };

  const toggleMenu = (menuId: string) => {
    setOpenMenuId((prevOpenMenuId) => {
      return prevOpenMenuId === menuId ? null : menuId;
    });
  };

  // Close the open menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      const isOutside = !path.some(
        (element: any) =>
          element?.id === 'menubar-content' || element?.id === 'menubar-trigger'
      );
      if (isOutside && openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    // Close the open menu when the escape key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuId]);

  return {
    activeMenuId,
    setActiveMenuId,
    openMenuId,
    setOpenMenuId,
    isMenuOpen,
    toggleMenu,
  };
};
