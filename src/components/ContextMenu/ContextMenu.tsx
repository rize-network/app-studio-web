import React from 'react';
import {
  ContextMenuProps,
  ContextMenuType,
} from './ContextMenu/ContextMenu.props';
import { useContextMenuState } from './ContextMenu/ContextMenu.state';
import {
  ContextMenuProvider,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuSeparator,
  ContextMenuView,
} from './ContextMenu/ContextMenu.view';
// Defines the main ContextMenu functional component, accepting its properties to configure behavior and appearance. It acts as the primary entry point for using the context menu.
const ContextMenuComponent: React.FC<ContextMenuProps> = ({
  children,
  items,
  size = 'md',
  variant = 'default',
  disableNativeContextMenu = true,
  onOpenChange,
  views,
  ...props
}) => {
  // Initializes the context menu's internal state management using the `useContextMenuState` hook, passing configuration options like size, variant, and an optional callback for open state changes.
  const state = useContextMenuState({
    size,
    variant,
    onOpenChange,
  });
  // Destructures various state variables and updater functions from the `useContextMenuState` hook. These include menu visibility, position, active submenu ID, and references to trigger and content elements, along with methods to control menu state.
  const {
    isOpen,
    setIsOpen,
    position,
    setPosition,
    activeSubmenuId,
    setActiveSubmenuId,
    triggerRef,
    contentRef,
    contentId,
    openMenu,
    closeMenu,
  } = state;
  return (
    <ContextMenuProvider
      value={{
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
        styles: views,
      }}
    >
      <ContextMenuView
        items={items}
        size={size}
        variant={variant}
        disableNativeContextMenu={disableNativeContextMenu}
        views={views}
        {...props}
      >
        {children}
      </ContextMenuView>
    </ContextMenuProvider>
  );
};
export const ContextMenu = ContextMenuComponent as ContextMenuType;
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Divider = ContextMenuDivider;
ContextMenu.Separator = ContextMenuSeparator;
