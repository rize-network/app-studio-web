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
  NavigationMenuLink,
} from './NavigationMenu/NavigationMenu.view';
// This file defines the core `NavigationMenu` component, serving as the main entry point for the navigation system. It orchestrates state management using `useNavigationMenuState` to control active and expanded menu items, and provides these states and props via `NavigationMenuProvider`. The component offers flexible rendering, either by processing an `items` array to render a default `NavigationMenuView` or by rendering `children` for custom compositions. It also exposes sub-components like `List`, `Item`, and `Trigger` as static properties, facilitating a compound component pattern.
const NavigationMenuComponent: React.FC<NavigationMenuProps> = ({
  items,
  children,
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
    triggerRefs,
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
        triggerRefs,
      }}
    >
      {items ? (
        <NavigationMenuView
          items={items}
          orientation={orientation}
          size={size}
          variant={variant}
          views={views}
          {...props}
        />
      ) : (
        children
      )}
    </NavigationMenuProvider>
  );
};
export const NavigationMenu = NavigationMenuComponent as NavigationMenuType;
NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;
