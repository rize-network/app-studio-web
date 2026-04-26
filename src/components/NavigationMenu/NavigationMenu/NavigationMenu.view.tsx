import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
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
import { ChevronIcon } from '../../Icon/Icon';
// Initializes the NavigationMenuContext, providing a mechanism to share active item state, expanded item IDs, orientation, size, variant, and trigger refs across all navigation components. It sets default values for the context's state and functions.
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
// The NavigationMenuProvider component makes the context value available to all its child components. This is crucial for maintaining a centralized state for the navigation menu, allowing any descendant to access or modify shared properties.
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
      transition="background-color 0.2s ease, border-color 0.2s ease"
      borderRadius="8px"
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
  if (children) {
    return (
      <NavigationMenuItemContext.Provider
        value={{ itemValue: itemId || null, isDisabled: disabled }}
      >
        <View
          width="100%"
          cursor={disabled ? 'not-allowed' : 'pointer'}
          opacity={disabled ? 0.6 : 1}
          borderRadius="8px"
          transition="background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease"
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
        borderRadius="8px"
        transition="background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease"
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
export const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  children,
  itemId,
  disabled,
  views,
}) => {
  const {
    activeItemId,
    toggleExpandedItem,
    isItemExpanded,
    size,
    variant,
    triggerRefs,
  } = useNavigationMenuContext();
  const triggerRef = useRef<HTMLDivElement>(null);
  const isActive = activeItemId === itemId;
  const isExpanded = isItemExpanded(itemId);
  useEffect(() => {
    if (triggerRef.current && itemId) {
      triggerRefs.current[itemId] = triggerRef.current;
    }
    return () => {
      if (itemId) {
        delete triggerRefs.current[itemId];
      }
    };
  }, [itemId, triggerRefs]);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    toggleExpandedItem(itemId);
  };
  return (
    <View
      ref={triggerRef}
      onClick={handleClick}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={8}
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
        <ChevronIcon
          orientation="down"
          widthHeight={16}
          color="currentColor"
          filled={true}
        />
      </View>
    </View>
  );
};
export const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  children,
  itemId,
  views,
}) => {
  const { isItemExpanded, orientation, triggerRefs } =
    useNavigationMenuContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: orientation === 'horizontal' ? 'bottom' : 'right',
  });
  const isExpanded = isItemExpanded(itemId);
  useEffect(() => {
    if (
      isExpanded &&
      contentRef.current &&
      itemId &&
      triggerRefs.current[itemId] &&
      orientation === 'horizontal'
    ) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRefs.current[itemId]!.getBoundingClientRect();
      const contentWidth = Math.max(contentRect.width || 200, 200);
      const contentHeight = Math.max(contentRect.height || 150, 150);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const availableSpace = {
        top: triggerRect.top,
        right: viewportWidth - triggerRect.right,
        bottom: viewportHeight - triggerRect.bottom,
        left: triggerRect.left,
      };
      const placements =
        orientation === 'horizontal'
          ? [
              {
                placement: 'bottom' as const,
                space: availableSpace.bottom,
                fits: availableSpace.bottom >= contentHeight + 8,
                x: triggerRect.left,
                y: triggerRect.bottom + 8,
              },
              {
                placement: 'top' as const,
                space: availableSpace.top,
                fits: availableSpace.top >= contentHeight + 8,
                x: triggerRect.left,
                y: triggerRect.top - contentHeight - 8,
              },
              {
                placement: 'right' as const,
                space: availableSpace.right,
                fits: availableSpace.right >= contentWidth + 8,
                x: triggerRect.right + 8,
                y: triggerRect.top,
              },
              {
                placement: 'left' as const,
                space: availableSpace.left,
                fits: availableSpace.left >= contentWidth + 8,
                x: triggerRect.left - contentWidth - 8,
                y: triggerRect.top,
              },
            ]
          : [
              {
                placement: 'right' as const,
                space: availableSpace.right,
                fits: availableSpace.right >= contentWidth + 8,
                x: triggerRect.right + 8,
                y: triggerRect.top,
              },
              {
                placement: 'left' as const,
                space: availableSpace.left,
                fits: availableSpace.left >= contentWidth + 8,
                x: triggerRect.left - contentWidth - 8,
                y: triggerRect.top,
              },
              {
                placement: 'bottom' as const,
                space: availableSpace.bottom,
                fits: availableSpace.bottom >= contentHeight + 8,
                x: triggerRect.left,
                y: triggerRect.bottom + 8,
              },
              {
                placement: 'top' as const,
                space: availableSpace.top,
                fits: availableSpace.top >= contentHeight + 8,
                x: triggerRect.left,
                y: triggerRect.top - contentHeight - 8,
              },
            ];
      const fittingPlacement = placements.find((p) => p.fits);
      if (fittingPlacement) {
        setOptimalPosition({
          x: fittingPlacement.x,
          y: fittingPlacement.y,
          placement: fittingPlacement.placement,
        });
        return;
      }
      const bestPlacement = placements.reduce((best, current) =>
        current.space > best.space ? current : best
      );
      let finalX = bestPlacement.x;
      let finalY = bestPlacement.y;
      if (finalX + contentWidth > viewportWidth) {
        finalX = viewportWidth - contentWidth - 8;
      }
      if (finalX < 8) {
        finalX = 8;
      }
      if (finalY + contentHeight > viewportHeight) {
        finalY = viewportHeight - contentHeight - 8;
      }
      if (finalY < 8) {
        finalY = 8;
      }
      setOptimalPosition({
        x: finalX,
        y: finalY,
        placement: bestPlacement.placement,
      });
    }
  }, [isExpanded, orientation, itemId, triggerRefs]);
  if (!isExpanded) {
    return null;
  }
  if (orientation === 'vertical') {
    return (
      <View
        paddingLeft={16}
        width="100%"
        position="relative"
        backgroundColor="transparent"
        {...views?.container}
      >
        {children}
      </View>
    );
  }
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    left: optimalPosition.x,
    top: optimalPosition.y,
    zIndex: 1000,
  };
  return (
    <View
      ref={contentRef}
      role="menu"
      minWidth="200px"
      backgroundColor="color-white"
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      style={positionStyles}
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
> = ({ items, orientation, views, themeMode: elementMode }) => {
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
