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

/**
 * ContextMenu component for displaying a custom context menu on right-click.
 * Supports both data-driven approach (with items prop) and compound component pattern.
 */
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
  const state = useContextMenuState({
    size,
    variant,
    onOpenChange,
  });

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

// Assign the sub-components to the main component
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Divider = ContextMenuDivider;
ContextMenu.Separator = ContextMenuSeparator; // Add the Separator component
