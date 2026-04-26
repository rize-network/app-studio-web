import { useState, useEffect } from 'react';
// This file defines the `useMenubarState` custom hook, which encapsulates the entire state management and interaction logic for the Menubar component. It manages the active menu item and the currently open sub-menu, while also handling global events like outside clicks and escape key presses to close menus, providing a centralized and reusable state solution.
export const useMenubarState = (
  defaultActiveMenuId: string | null = null,
  defaultOpenMenuId: string | null = null
) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(
    defaultActiveMenuId
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(
    defaultOpenMenuId
  );
  const isMenuOpen = (menuId: string) => {
    return openMenuId === menuId;
  };
  const toggleMenu = (menuId: string) => {
    setOpenMenuId((prevOpenMenuId) => {
      return prevOpenMenuId === menuId ? null : menuId;
    });
  };
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
