import React, { createContext, useContext } from 'react';
import { View, Horizontal, Vertical, ViewProps } from 'app-studio';
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
      {...NavigationMenuOrientations[orientation]}
      transition="all 0.2s ease"
      borderRadius="4px"
      {...views?.container}
    >
      {children}
    </Container>
  );
};

// Create a context for NavigationMenuItem
const NavigationMenuItemContext = createContext<{
  itemValue: string | null;
  isDisabled: boolean;
}>({ itemValue: null, isDisabled: false });

// Hook to use the NavigationMenuItem context
export const useNavigationMenuItemContext = () => {
  const context = useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error(
      'useNavigationMenuItemContext must be used within a NavigationMenuItem'
    );
  }
  return context;
};

// NavigationMenu Item component
export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  item,
  value,
  isDisabled = false,
  children,
  views,
}) => {
  const {
    activeItemId,
    setActiveItemId,
    orientation,
    size,
    variant,
    onItemActivate,
  } = useNavigationMenuContext();

  // Handle both data-driven and compound component patterns
  const itemId = item?.id || value;
  const isActive = activeItemId === itemId;
  const hasSubItems = item?.items && item.items.length > 0;
  const disabled = item?.disabled || isDisabled;

  const handleClick = () => {
    if (disabled) return;

    if (itemId) {
      setActiveItemId(itemId);
      if (onItemActivate) {
        onItemActivate(itemId);
      }
    }
  };

  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  // For compound component pattern
  if (children) {
    return (
      <NavigationMenuItemContext.Provider
        value={{ itemValue: itemId || null, isDisabled: disabled }}
      >
        <View
          width="100%"
          cursor={disabled ? 'not-allowed' : 'pointer'}
          opacity={disabled ? 0.6 : 1}
          borderRadius="4px"
          transition="all 0.2s ease"
          {...NavigationMenuSizes[size]}
          {...NavigationMenuVariants[variant]}
          {...(isActive ? NavigationMenuItemStates.active : {})}
          _hover={!disabled ? NavigationMenuItemStates.hover : {}}
          {...views?.item}
        >
          {children}
        </View>
      </NavigationMenuItemContext.Provider>
    );
  }

  // For data-driven pattern with sub-items
  if (hasSubItems && item) {
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

        <NavigationMenuContent itemId={item.id}>
          <NavigationMenuList>
            {item.items?.map((subItem) => (
              <NavigationMenuItem key={subItem.id} item={subItem} />
            ))}
          </NavigationMenuList>
        </NavigationMenuContent>
      </Container>
    );
  }

  // For data-driven pattern without sub-items
  if (item) {
    return (
      <View
        as={item.href ? 'a' : 'div'}
        to={item.href}
        onClick={handleClick}
        cursor={item.disabled ? 'not-allowed' : 'pointer'}
        opacity={item.disabled ? 0.6 : 1}
        width="100%"
        display="flex"
        alignItems="center"
        borderRadius="4px"
        transition="all 0.2s ease"
        gap="8px"
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
  }

  return null;
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
      position={orientation === 'horizontal' ? 'absolute' : 'relative'}
      backgroundColor={orientation === 'horizontal' ? 'white' : 'transparent'}
      boxShadow={
        orientation === 'horizontal' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
      }
      borderRadius={orientation === 'horizontal' ? '4px' : '0'}
      zIndex={orientation === 'horizontal' ? 10 : 1}
      {...views?.container}
    >
      {children}
    </View>
  );
};

// Main NavigationMenu View component
// NavigationMenu Link component
import { NavigationMenuLinkProps } from './NavigationMenu.props';

export const NavigationMenuLink: React.FC<NavigationMenuLinkProps> = ({
  href,
  children,
  views,
  ...props
}) => {
  const { itemValue, isDisabled } = useNavigationMenuItemContext();
  const { activeItemId, setActiveItemId, onItemActivate } =
    useNavigationMenuContext();

  const isActive = activeItemId === itemValue;

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    if (itemValue) {
      setActiveItemId(itemValue);
      if (onItemActivate) {
        onItemActivate(itemValue);
      }
    }

    // Allow the user's onClick handler to run
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <View
      as="a"
      href={isDisabled ? undefined : href}
      onClick={handleClick}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      width="100%"
      display="flex"
      alignItems="center"
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={isDisabled}
      data-active={isActive ? '' : undefined}
      data-disabled={isDisabled ? '' : undefined}
      {...(isActive ? { fontWeight: 'bold' } : {})}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

export const NavigationMenuView: React.FC<
  {
    items?: NavigationItem[];
    orientation: Orientation;
    size: Size;
    variant: Variant;
    views?: any;
  } & ViewProps
> = ({
  items,
  orientation,
  //size, variant,
  views,
  themeMode: elementMode,
}) => {
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  if (!items || items.length === 0) {
    return null;
  }

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
