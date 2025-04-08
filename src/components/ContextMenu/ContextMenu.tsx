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
  ContextMenuView,
} from './ContextMenu/ContextMenu.view';

/**
 * ContextMenu component for displaying a custom context menu on right-click.
 */
const ContextMenuComponent: React.FC<ContextMenuProps> = ({
  children,
  items,
  size = 'md',
  variant = 'default',
  disableNativeContextMenu = true,
  views,
  ...props
}) => {
  const {
    isOpen,
    setIsOpen,
    position,
    setPosition,
    activeSubmenuId,
    setActiveSubmenuId,
  } = useContextMenuState();

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
