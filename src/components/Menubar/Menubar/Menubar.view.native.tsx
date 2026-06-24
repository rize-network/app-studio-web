import React, { createContext, useContext } from 'react';
import { View, Horizontal, Vertical, Text, ViewProps } from 'app-studio';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
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

export const MenubarContent: React.FC<
  MenubarContentProps & { items?: MenubarItemType['items']; title?: string }
> = ({ children, menuId, items, title, views }) => {
  const { isMenuOpen, toggleMenu, size } = useMenubarContext();
  const isOpen = isMenuOpen(menuId);
  const close = () => menuId && toggleMenu(menuId);
  // On native, render the menu as a bottom sheet (ActionSheet) — the same
  // default native behaviour as DropdownMenu / ContextMenu / Select — instead
  // of a mis-placed centred popover.
  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={close}
      title={title}
      size={size}
      items={(items || []).map((subItem, index) =>
        subItem.separator
          ? { id: `separator-${index}`, divider: true }
          : {
              id: subItem.id,
              label: subItem.label,
              icon: subItem.icon,
              isDisabled: subItem.disabled,
              onPress: () => subItem.onClick?.(),
            }
      )}
      views={{
        item: views?.item,
        itemIcon: views?.icon,
        divider: views?.separator,
        sheet: views?.content,
      }}
    >
      {children}
    </ActionSheet>
  );
};

export const MenubarItem: React.FC<MenubarItemProps> = ({
  children,
  icon,
  disabled = false,
  onClick,
  views,
}) => {
  const { size, setOpenMenuId } = useMenubarContext();
  const handlePress = () => {
    if (disabled) return;
    onClick?.();
    // Close the open menu after selecting (compound-API usage).
    setOpenMenuId?.(null);
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
            <MenubarContent
              menuId={item.id}
              items={item.items}
              title={typeof item.label === 'string' ? item.label : undefined}
              views={views}
            />
          )}
        </MenubarMenu>
      ))}
    </MenubarRoot>
  );
};
