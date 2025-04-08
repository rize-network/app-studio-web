import React from 'react';
import {
  DropdownMenuProps,
  DropdownMenuType,
} from './DropdownMenu/DropdownMenu.props';
import { useDropdownMenuState } from './DropdownMenu/DropdownMenu.state';
import {
  DropdownMenuProvider,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuDivider,
  DropdownMenuView,
} from './DropdownMenu/DropdownMenu.view';

/**
 * DropdownMenu component for displaying a menu when clicking on a trigger element.
 */
const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  size = 'md',
  variant = 'default',
  side = 'bottom',
  align = 'start',
  defaultOpen = false,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen, activeSubmenuId, setActiveSubmenuId } =
    useDropdownMenuState(defaultOpen);

  return (
    <DropdownMenuProvider
      value={{
        isOpen,
        setIsOpen,
        activeSubmenuId,
        setActiveSubmenuId,
        size,
        variant,
      }}
    >
      <DropdownMenuView
        trigger={trigger}
        items={items}
        side={side}
        align={align}
        views={views}
        {...props}
      />
    </DropdownMenuProvider>
  );
};

export const DropdownMenu = DropdownMenuComponent as DropdownMenuType;

// Assign the sub-components to the main component
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Divider = DropdownMenuDivider;
