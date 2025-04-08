import React, { createContext, useContext } from 'react';
import { View, Horizontal, Vertical } from 'app-studio';
import {
  NavigationMenuContextType,
  NavigationItem,
  Orientation,
  Size,
  Variant,
} from './NavigationMenu.type';
import {
  NavigationMenuItemProps,
  NavigationMenuListProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
} from './NavigationMenu.props';
import {
  NavigationMenuSizes,
  NavigationMenuVariants,
  NavigationMenuOrientations,
  NavigationMenuItemStates,
} from './NavigationMenu.style';

// Create context for the NavigationMenu
const NavigationMenuContext = createContext<NavigationMenuContextType>({
  activeItemId: null,
  setActiveItemId: () => {},
  expandedItemIds: [],
  toggleExpandedItem: () => {},
  isItemExpanded: () => false,
  orientation: 'vertical',
  size: 'md',
  variant: 'default',
});

// Provider component for the NavigationMenu context
export const NavigationMenuProvider: React.FC<{
  children: React.ReactNode;
  value: NavigationMenuContextType;
}> = ({ children, value }) => {
  return (
    <NavigationMenuContext.Provider value={value}>
      {children}
    </NavigationMenuContext.Provider>
  );
};

// Hook to use the NavigationMenu context
export const useNavigationMenuContext = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      'useNavigationMenuContext must be used within a NavigationMenuProvider'
    );
  }
  return context;
};

// NavigationMenu List component
export const NavigationMenuList: React.FC<NavigationMenuListProps> = ({
  children,
  views,
}) => {
  const { orientation } = useNavigationMenuContext();

  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  return (
    <Container
      width="100%"
      gap={2}
      {...NavigationMenuOrientations[orientation]}
      {...views?.container}
    >
      {children}
    </Container>
  );
};

// NavigationMenu Item component
export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  item,
  views,
}) => {
  const {
    activeItemId,
    setActiveItemId,
    // isItemExpanded,
    orientation,
    size,
    variant,
    onItemActivate,
  } = useNavigationMenuContext();

  const isActive = activeItemId === item.id;
  const hasSubItems = item.items && item.items.length > 0;
  // const isExpanded = hasSubItems && isItemExpanded(item.id);

  const handleClick = () => {
    if (item.disabled) return;

    setActiveItemId(item.id);
    if (onItemActivate) {
      onItemActivate(item.id);
    }
  };

  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  // Render item with sub-items
  if (hasSubItems) {
    return (
      <Container
        width="100%"
        flexDirection={orientation === 'horizontal' ? 'column' : 'column'}
        position="relative"
        {...views?.item}
      >
        <NavigationMenuTrigger
          itemId={item.id}
          disabled={item.disabled}
          views={views}
        >
          {item.icon && (
            <View marginRight={8} {...views?.icon}>
              {item.icon}
            </View>
          )}
          {item.label}
        </NavigationMenuTrigger>

        <NavigationMenuContent
          itemId={item.id} //views={views}
        >
          <NavigationMenuList>
            {item.items?.map((subItem) => (
              <NavigationMenuItem key={subItem.id} item={subItem} />
            ))}
          </NavigationMenuList>
        </NavigationMenuContent>
      </Container>
    );
  }

  // Render regular item (no sub-items)
  return (
    <View
      as={item.href ? 'a' : 'div'}
      to={item.href}
      onClick={handleClick}
      cursor={item.disabled ? 'not-allowed' : 'pointer'}
      opacity={item.disabled ? 0.5 : 1}
      width="100%"
      display="flex"
      alignItems="center"
      borderRadius={4}
      transition="background-color 0.2s ease"
      {...NavigationMenuSizes[size]}
      {...NavigationMenuVariants[variant]}
      {...(isActive ? NavigationMenuItemStates.active : {})}
      _hover={!item.disabled ? NavigationMenuItemStates.hover : {}}
      {...views?.item}
    >
      {item.icon && (
        <View marginRight={8} {...views?.icon}>
          {item.icon}
        </View>
      )}
      {item.label}
    </View>
  );
};

// NavigationMenu Trigger component
export const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  children,
  itemId,
  disabled,
  views,
}) => {
  const { activeItemId, toggleExpandedItem, isItemExpanded, size, variant } =
    useNavigationMenuContext();

  const isActive = activeItemId === itemId;
  const isExpanded = isItemExpanded(itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    toggleExpandedItem(itemId);
  };

  return (
    <View
      onClick={handleClick}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={4}
      transition="background-color 0.2s ease"
      {...NavigationMenuSizes[size]}
      {...NavigationMenuVariants[variant]}
      {...(isActive ? NavigationMenuItemStates.active : {})}
      _hover={!disabled ? NavigationMenuItemStates.hover : {}}
      {...views?.trigger}
    >
      <View display="flex" alignItems="center">
        {children}
      </View>
      <View
        transition="transform 0.2s ease"
        transform={isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
        {...views?.indicator}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
            fill="currentColor"
          />
        </svg>
      </View>
    </View>
  );
};

// NavigationMenu Content component
export const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  children,
  itemId,
  views,
}) => {
  const { isItemExpanded, orientation } = useNavigationMenuContext();

  const isExpanded = isItemExpanded(itemId);

  if (!isExpanded) {
    return null;
  }

  return (
    <View
      paddingLeft={orientation === 'vertical' ? 16 : 0}
      paddingTop={orientation === 'horizontal' ? 8 : 0}
      overflow="hidden"
      width="100%"
      {...views?.container}
    >
      {children}
    </View>
  );
};

// Main NavigationMenu View component
export const NavigationMenuView: React.FC<{
  items: NavigationItem[];
  orientation: Orientation;
  size: Size;
  variant: Variant;
  views?: any;
}> = ({
  items,
  orientation,
  //size, variant,
  views,
}) => {
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  return (
    <Container
      width="100%"
      {...NavigationMenuOrientations[orientation]}
      {...views?.container}
    >
      <NavigationMenuList views={views}>
        {items.map((item) => (
          <NavigationMenuItem key={item.id} item={item} views={views} />
        ))}
      </NavigationMenuList>
    </Container>
  );
};
