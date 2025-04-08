import React from 'react';
import {
  MenubarProps,
  MenubarType,
} from './Menubar/Menubar.props';
import { useMenubarState } from './Menubar/Menubar.state';
import {
  MenubarProvider,
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarView,
} from './Menubar/Menubar.view';

/**
 * Menubar component for creating horizontal or vertical menu bars with dropdown menus.
 */
const MenubarComponent: React.FC<MenubarProps> = ({
  items,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  defaultActiveMenuId = null,
  defaultOpenMenuId = null,
  views,
  ...props
}) => {
  const {
    activeMenuId,
    setActiveMenuId,
    openMenuId,
    setOpenMenuId,
    isMenuOpen,
    toggleMenu,
  } = useMenubarState(defaultActiveMenuId, defaultOpenMenuId);

  return (
    <MenubarProvider
      value={{
        activeMenuId,
        setActiveMenuId,
        openMenuId,
        setOpenMenuId,
        isMenuOpen,
        toggleMenu,
        orientation,
        size,
        variant,
      }}
    >
      <MenubarView
        items={items}
        orientation={orientation}
        size={size}
        variant={variant}
        views={views}
        {...props}
      />
    </MenubarProvider>
  );
};

export const Menubar = MenubarComponent as MenubarType;

// Assign the sub-components to the main component
Menubar.Root = MenubarRoot;
Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
Menubar.Item = MenubarItem;
Menubar.Separator = MenubarSeparator;
