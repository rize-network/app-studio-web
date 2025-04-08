import React from 'react';
import {
  NavigationMenuProps,
  NavigationMenuType,
} from './NavigationMenu/NavigationMenu.props';
import { useNavigationMenuState } from './NavigationMenu/NavigationMenu.state';
import {
  NavigationMenuProvider,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuView,
} from './NavigationMenu/NavigationMenu.view';

/**
 * NavigationMenu component for creating navigation menus with optional nested items.
 */
const NavigationMenuComponent: React.FC<NavigationMenuProps> = ({
  items,
  orientation = 'vertical',
  size = 'md',
  variant = 'default',
  defaultActiveItemId = null,
  defaultExpandedItemIds = [],
  onItemActivate,
  views,
  ...props
}) => {
  const {
    activeItemId,
    setActiveItemId,
    expandedItemIds,
    toggleExpandedItem,
    isItemExpanded,
  } = useNavigationMenuState(defaultActiveItemId, defaultExpandedItemIds);

  return (
    <NavigationMenuProvider
      value={{
        activeItemId,
        setActiveItemId,
        expandedItemIds,
        toggleExpandedItem,
        isItemExpanded,
        orientation,
        size,
        variant,
        onItemActivate,
      }}
    >
      <NavigationMenuView
        items={items}
        orientation={orientation}
        size={size}
        variant={variant}
        views={views}
        {...props}
      />
    </NavigationMenuProvider>
  );
};

export const NavigationMenu = NavigationMenuComponent as NavigationMenuType;

// Assign the sub-components to the main component
NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
