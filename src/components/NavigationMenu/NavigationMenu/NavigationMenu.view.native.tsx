import React, { createContext, useContext } from 'react';
import { View, Horizontal, Vertical, Text, ViewProps } from 'app-studio';
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

const NavigationMenuContext = createContext<NavigationMenuContextType>({
  activeItemId: null,
  setActiveItemId: () => {},
  expandedItemIds: [],
  toggleExpandedItem: () => {},
  isItemExpanded: () => false,
  orientation: 'vertical',
  size: 'md',
  variant: 'default',
  triggerRefs: { current: {} },
});

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

export const useNavigationMenuContext = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      'useNavigationMenuContext must be used within a NavigationMenuProvider'
    );
  }
  return context;
};

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
      borderRadius={8}
      {...views?.container}
    >
      {children}
    </Container>
  );
};

const NavigationMenuItemContext = createContext<{
  itemValue: string | null;
  isDisabled: boolean;
}>({ itemValue: null, isDisabled: false });

export const useNavigationMenuItemContext = () => {
  const context = useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error(
      'useNavigationMenuItemContext must be used within a NavigationMenuItem'
    );
  }
  return context;
};

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
  const itemId = item?.id || value;
  const isActive = activeItemId === itemId;
  const hasSubItems = item?.items && item.items.length > 0;
  const disabled = item?.disabled || isDisabled;
  const handlePress = () => {
    if (disabled) return;
    if (itemId) {
      setActiveItemId(itemId);
      if (onItemActivate) onItemActivate(itemId);
    }
  };
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;
  if (children) {
    return (
      <NavigationMenuItemContext.Provider
        value={{ itemValue: itemId || null, isDisabled: disabled }}
      >
        <View
          width="100%"
          opacity={disabled ? 0.6 : 1}
          borderRadius={8}
          {...NavigationMenuSizes[size]}
          {...NavigationMenuVariants[variant]}
          {...(isActive ? NavigationMenuItemStates.active : {})}
          {...views?.item}
        >
          {children}
        </View>
      </NavigationMenuItemContext.Provider>
    );
  }
  if (hasSubItems && item) {
    return (
      <Container width="100%" {...views?.item}>
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
          {typeof item.label === 'string' ? (
            <Text>{item.label}</Text>
          ) : (
            item.label
          )}
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
  if (item) {
    return (
      <View
        onPress={handlePress}
        onClick={handlePress}
        opacity={item.disabled ? 0.6 : 1}
        width="100%"
        flexDirection="row"
        alignItems="center"
        borderRadius={8}
        gap={8}
        {...NavigationMenuSizes[size]}
        {...NavigationMenuVariants[variant]}
        {...(isActive ? NavigationMenuItemStates.active : {})}
        {...views?.item}
      >
        {item.icon && (
          <View marginRight={8} {...views?.icon}>
            {item.icon}
          </View>
        )}
        {typeof item.label === 'string' ? (
          <Text>{item.label}</Text>
        ) : (
          item.label
        )}
      </View>
    );
  }
  return null;
};

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
  const handlePress = () => {
    if (disabled) return;
    toggleExpandedItem(itemId);
  };
  return (
    <View
      onPress={handlePress}
      onClick={handlePress}
      opacity={disabled ? 0.5 : 1}
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={8}
      {...NavigationMenuSizes[size]}
      {...NavigationMenuVariants[variant]}
      {...(isActive ? NavigationMenuItemStates.active : {})}
      {...views?.trigger}
    >
      <View flexDirection="row" alignItems="center">
        {children}
      </View>
      <View {...views?.indicator}>
        <Text>{isExpanded ? '▲' : '▼'}</Text>
      </View>
    </View>
  );
};

export const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  children,
  itemId,
  views,
}) => {
  const { isItemExpanded } = useNavigationMenuContext();
  const isExpanded = isItemExpanded(itemId);
  if (!isExpanded) return null;
  return (
    <View
      paddingLeft={16}
      width="100%"
      backgroundColor="transparent"
      {...views?.container}
    >
      {children}
    </View>
  );
};

import { NavigationMenuLinkProps } from './NavigationMenu.props';
export const NavigationMenuLink: React.FC<NavigationMenuLinkProps> = ({
  href,
  children,
  views,
  underline,
  isExternal,
  iconSize,
  ...props
}) => {
  const { itemValue, isDisabled } = useNavigationMenuItemContext();
  const { activeItemId, setActiveItemId, onItemActivate } =
    useNavigationMenuContext();
  const isActive = activeItemId === itemValue;
  const handlePress = (e: any) => {
    if (isDisabled) return;
    if (itemValue) {
      setActiveItemId(itemValue);
      if (onItemActivate) onItemActivate(itemValue);
    }
    if (props.onClick) props.onClick(e);
  };
  return (
    <View
      onPress={handlePress}
      onClick={handlePress}
      opacity={isDisabled ? 0.5 : 1}
      width="100%"
      flexDirection="row"
      alignItems="center"
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
> = ({ items, orientation, views, themeMode: elementMode }) => {
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;
  if (!items || items.length === 0) return null;
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
