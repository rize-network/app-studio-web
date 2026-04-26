import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, ViewProps } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import {
  MenubarContextType,
  MenubarItem as MenubarItemType,
  Orientation,
  Size,
  Variant,
} from './Menubar.type';
import {
  MenubarRootProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
} from './Menubar.props';
import {
  MenubarSizes,
  MenubarVariants,
  MenubarOrientations,
  MenubarItemStates,
} from './Menubar.style';
// Initializes the MenubarContext with default values, providing a central place to manage the state and actions for menubar items.
const MenubarContext = createContext<MenubarContextType>({
  activeMenuId: null,
  setActiveMenuId: () => {},
  openMenuId: null,
  setOpenMenuId: () => {},
  isMenuOpen: () => false,
  toggleMenu: () => {},
  orientation: 'horizontal',
  size: 'md',
  variant: 'default',
  triggerRefs: { current: {} },
});
// A custom hook to conveniently access the current context values from the MenubarContext, allowing components to interact with menubar state.
export const useMenubarContext = () => useContext(MenubarContext);
// Provides the menubar context to its child components, making menubar-related state and functions available throughout the menubar's sub-components.
export const MenubarProvider: React.FC<{
  value: MenubarContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <MenubarContext.Provider value={value}>{children}</MenubarContext.Provider>
  );
};
// The root component for the menubar, responsible for defining the overall orientation, size, and variant, and rendering its children within a flexible container.
export const MenubarRoot: React.FC<MenubarRootProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  views,
  ...props
}) => {
  // Dynamically selects the layout container (Horizontal or Vertical) based on the menubar's specified orientation.
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;
  return (
    <Container
      role="menubar"
      aria-orientation={orientation}
      {...MenubarOrientations[orientation]}
      {...MenubarVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Container>
  );
};
export const MenubarMenu: React.FC<MenubarMenuProps> = ({
  children,
  id,
  disabled = false,
  views,
}) => {
  const { orientation } = useMenubarContext();
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;
  return (
    <Container
      role="none"
      position="relative"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...views?.menu}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            menuId: id,
          });
        }
        return child;
      })}
    </Container>
  );
};
export const MenubarTrigger: React.FC<MenubarTriggerProps> = ({
  children,
  menuId,
  disabled = false,
  views,
}) => {
  const {
    activeMenuId,
    setActiveMenuId,
    toggleMenu,
    isMenuOpen,
    size,
    triggerRefs,
  } = useMenubarContext();
  const triggerRef = useRef<HTMLDivElement>(null);
  const isActive = activeMenuId === menuId;
  const isOpen = isMenuOpen(menuId);
  useEffect(() => {
    if (triggerRef.current && menuId) {
      triggerRefs.current[menuId] = triggerRef.current;
    }
    return () => {
      if (menuId) {
        delete triggerRefs.current[menuId];
      }
    };
  }, [menuId, triggerRefs]);
  const handleClick = () => {
    if (disabled) return;
    setActiveMenuId(menuId);
    toggleMenu(menuId);
  };
  return (
    <View
      ref={triggerRef}
      id="menubar-trigger"
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
      userSelect="none"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...MenubarSizes[size]}
      {...(isActive ? MenubarItemStates.active : {})}
      {...(disabled ? MenubarItemStates.disabled : {})}
      _hover={!disabled ? MenubarItemStates.hover : {}}
      onClick={handleClick}
      {...views?.trigger}
    >
      {children}
    </View>
  );
};
export const MenubarContent: React.FC<MenubarContentProps> = ({
  children,
  menuId,
  views,
}) => {
  const { isMenuOpen, orientation, triggerRefs } = useMenubarContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: orientation === 'horizontal' ? 'bottom' : 'right',
  });
  const isOpen = isMenuOpen(menuId);
  useEffect(() => {
    if (isOpen && contentRef.current && menuId && triggerRefs.current[menuId]) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRefs.current[menuId]!.getBoundingClientRect();
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
  }, [isOpen, orientation, menuId, triggerRefs]);
  if (!isOpen) {
    return null;
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
      id="menubar-content"
      role="menu"
      minWidth="200px"
      backgroundColor="color-white"
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      style={positionStyles}
      {...views?.content}
    >
      {children}
      {}
      {}
    </View>
  );
};
export const MenubarItem: React.FC<MenubarItemProps> = ({
  children,
  icon,
  disabled = false,
  onClick,
  views,
}) => {
  const { size } = useMenubarContext();
  const handleClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };
  return (
    <View
      role="menuitem"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      userSelect="none"
      display="flex"
      alignItems="center"
      opacity={disabled ? 0.5 : 1}
      {...MenubarSizes[size]}
      _hover={!disabled ? MenubarItemStates.hover : {}}
      onClick={handleClick}
      {...views?.item}
    >
      {icon && (
        <View marginRight={8} {...views?.icon}>
          {icon}
        </View>
      )}
      {children}
    </View>
  );
};
export const MenubarSeparator: React.FC<MenubarSeparatorProps> = ({
  views,
}) => {
  return (
    <View
      role="separator"
      height="1px"
      backgroundColor="color-gray-200"
      margin="4px 0"
      {...views?.separator}
    />
  );
};
export const MenubarView: React.FC<
  {
    items: MenubarItemType[];
    orientation: Orientation;
    size: Size;
    variant: Variant;
    views?: any;
  } & ViewProps
> = ({ items, orientation, size, variant, views, themeMode: elementMode }) => {
  return (
    <MenubarRoot
      orientation={orientation}
      size={size}
      variant={variant}
      views={views}
    >
      {items.map((item) => (
        <MenubarMenu
          key={item.id}
          id={item.id}
          disabled={item.disabled}
          views={views}
        >
          <MenubarTrigger menuId={item.id} views={views}>
            {item.icon && (
              <View marginRight={8} {...views?.icon}>
                {item.icon}
              </View>
            )}
            {item.label}
          </MenubarTrigger>
          {item.items && item.items.length > 0 && (
            <MenubarContent menuId={item.id} views={views}>
              {item.items.map((subItem, index) => {
                if (subItem.separator) {
                  return (
                    <MenubarSeparator
                      key={`separator-${index}`}
                      views={views}
                    />
                  );
                }
                return (
                  <MenubarItem
                    key={subItem.id}
                    id={subItem.id}
                    icon={subItem.icon}
                    disabled={subItem.disabled}
                    onClick={subItem.onClick}
                    views={views}
                  >
                    {subItem.label}
                  </MenubarItem>
                );
              })}
            </MenubarContent>
          )}
        </MenubarMenu>
      ))}
    </MenubarRoot>
  );
};
