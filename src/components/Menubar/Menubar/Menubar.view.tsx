import React, { createContext, useContext } from 'react';
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
  getMenubarContentPosition,
} from './Menubar.style';

// Create context for the Menubar
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
});

// Hook to use the Menubar context
export const useMenubarContext = () => useContext(MenubarContext);

// Provider component for the Menubar context
export const MenubarProvider: React.FC<{
  value: MenubarContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <MenubarContext.Provider value={value}>{children}</MenubarContext.Provider>
  );
};

// Menubar Root component
export const MenubarRoot: React.FC<MenubarRootProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  views,
  ...props
}) => {
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

// Menubar Menu component
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
          // Pass the menuId to MenubarTrigger and MenubarContent
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

// Menubar Trigger component
export const MenubarTrigger: React.FC<MenubarTriggerProps> = ({
  children,
  menuId,
  disabled = false,
  views,
}) => {
  const { activeMenuId, setActiveMenuId, toggleMenu, isMenuOpen, size } =
    useMenubarContext();

  const isActive = activeMenuId === menuId;
  const isOpen = isMenuOpen(menuId);

  const handleClick = () => {
    if (disabled) return;

    setActiveMenuId(menuId);
    toggleMenu(menuId);
  };

  return (
    <View
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

// Menubar Content component
export const MenubarContent: React.FC<MenubarContentProps> = ({
  children,
  menuId,
  views,
}) => {
  const { isMenuOpen, orientation } = useMenubarContext();

  const isOpen = isMenuOpen(menuId);

  if (!isOpen) {
    return null;
  }

  return (
    <View
      id="menubar-content"
      role="menu"
      position="absolute"
      zIndex={1000}
      minWidth="200px"
      backgroundColor="white"
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      {...getMenubarContentPosition(orientation)}
      {...views?.content}
    >
      {children}
    </View>
  );
};

// Menubar Item component
export const MenubarItem: React.FC<MenubarItemProps> = ({
  children,
  // id,
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

// Menubar Separator component
export const MenubarSeparator: React.FC<MenubarSeparatorProps> = ({
  views,
}) => {
  return (
    <View
      role="separator"
      height="1px"
      backgroundColor="color.gray.200"
      margin="4px 0"
      {...views?.separator}
    />
  );
};

// Main Menubar View component
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
