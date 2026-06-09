import React, { createContext, useContext } from 'react';
import { Modal, ScrollView } from 'react-native';
import { View, Horizontal, Vertical, Text, ViewProps } from 'app-studio';
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

export const useMenubarContext = () => useContext(MenubarContext);

export const MenubarProvider: React.FC<{
  value: MenubarContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <MenubarContext.Provider value={value}>{children}</MenubarContext.Provider>
  );
};

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
    <Container opacity={disabled ? 0.5 : 1} {...views?.menu}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<Record<string, unknown>>(child)) {
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
  const { activeMenuId, setActiveMenuId, toggleMenu, size } =
    useMenubarContext();
  const isActive = activeMenuId === menuId;
  const handlePress = () => {
    if (disabled) return;
    setActiveMenuId(menuId);
    toggleMenu(menuId);
  };
  return (
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...MenubarSizes[size]}
      {...(isActive ? MenubarItemStates.active : {})}
      {...(disabled ? MenubarItemStates.disabled : {})}
      onPress={handlePress}
      onClick={handlePress}
      {...views?.trigger}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
};

export const MenubarContent: React.FC<MenubarContentProps> = ({
  children,
  menuId,
  views,
}) => {
  const { isMenuOpen, toggleMenu } = useMenubarContext();
  const isOpen = isMenuOpen(menuId);
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => menuId && toggleMenu(menuId)}
    >
      <View
        flex={1}
        backgroundColor="color-blackAlpha-400"
        justifyContent="center"
        alignItems="center"
        onPress={() => menuId && toggleMenu(menuId)}
        onClick={() => menuId && toggleMenu(menuId)}
      >
        <View
          minWidth={200}
          backgroundColor="color-white"
          borderRadius={4}
          overflow="hidden"
          {...views?.content}
        >
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
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
  const handlePress = () => {
    if (disabled || !onClick) return;
    onClick();
  };
  return (
    <View
      flexDirection="row"
      alignItems="center"
      opacity={disabled ? 0.5 : 1}
      onPress={handlePress}
      onClick={handlePress}
      {...MenubarSizes[size]}
      {...views?.item}
    >
      {icon && (
        <View marginRight={8} {...views?.icon}>
          {icon}
        </View>
      )}
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
};

export const MenubarSeparator: React.FC<MenubarSeparatorProps> = ({
  views,
}) => {
  return (
    <View
      height={1}
      backgroundColor="color-gray-200"
      marginVertical={4}
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
> = ({ items, orientation, size, variant, views }) => {
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
