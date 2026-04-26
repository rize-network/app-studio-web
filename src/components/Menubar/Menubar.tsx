import React, { useRef } from 'react';
import { MenubarProps, MenubarType } from './Menubar/Menubar.props';
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
// This file defines the main Menubar component, which orchestrates the menubar's state management (active/open menus) using `useMenubarState`, provides this state and essential props via `MenubarProvider`, and renders the actual UI structure through `MenubarView`. It also attaches various sub-components (Root, Menu, Trigger, etc.) to the main Menubar object for easy composition and usage, facilitating a compound component pattern.
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
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
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
        triggerRefs,
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
Menubar.Root = MenubarRoot;
Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
Menubar.Item = MenubarItem;
Menubar.Separator = MenubarSeparator;
