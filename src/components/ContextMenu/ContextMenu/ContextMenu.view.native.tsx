import React, { createContext, useContext, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import { View, Text, ViewProps } from 'app-studio';
import {
  ContextMenuContextType,
  Size,
  Variant,
  ContextMenuItem as ContextMenuItemType,
} from './ContextMenu.type';
import {
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuDividerProps,
  ContextMenuSeparatorProps,
} from './ContextMenu.props';
import { ContextMenuSizes, ContextMenuVariants } from './ContextMenu.style';

const ContextMenuContext = createContext<ContextMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
  activeSubmenuId: null,
  setActiveSubmenuId: () => {},
  size: 'md',
  variant: 'default',
  triggerRef: { current: null },
  contentRef: { current: null },
  contentId: 'contextmenu-content',
  closeMenu: () => {},
  openMenu: () => {},
});

export const ContextMenuProvider: React.FC<{
  children: React.ReactNode;
  value: ContextMenuContextType;
}> = ({ children, value }) => {
  return (
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
};

export const useContextMenuContext = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'useContextMenuContext must be used within a ContextMenuProvider'
    );
  }
  return context;
};

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({
  children,
  isDisabled = false,
  views,
  asChild = false,
  ...props
}) => {
  const { openMenu, setIsOpen } = useContextMenuContext();
  const handleLongPress = (e: any) => {
    if (isDisabled) return;
    if (openMenu) openMenu(e);
    else setIsOpen(true);
  };
  const triggerProps: any = {
    onLongPress: handleLongPress,
    ...views?.container,
    ...props,
  };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, triggerProps);
  }
  return <View {...triggerProps}>{children}</View>;
};

export const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  items,
  children,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen, variant } = useContextMenuContext();
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <View
        flex={1}
        backgroundColor="color-blackAlpha-400"
        justifyContent="center"
        alignItems="center"
        onPress={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
      >
        <View
          minWidth={200}
          borderRadius={4}
          overflow="hidden"
          {...ContextMenuVariants[variant]}
          {...views?.menu}
          {...views?.content}
          {...(props as any)}
        >
          <ScrollView>
            {items &&
              items.map((item, index) => {
                if (item.divider) {
                  return (
                    <ContextMenuDivider
                      key={`divider-${index}`}
                      views={views}
                    />
                  );
                }
                return (
                  <ContextMenuItem key={item.id} item={item} views={views} />
                );
              })}
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  item,
  children,
  onSelect,
  isDisabled = false,
  views,
  ...props
}) => {
  const { size, closeMenu } = useContextMenuContext();
  if (item) {
    const disabled = item.disabled || isDisabled;
    const handlePress = () => {
      if (disabled) return;
      if (item.onClick) item.onClick();
      if (closeMenu) closeMenu();
    };
    return (
      <View
        flexDirection="row"
        alignItems="center"
        opacity={disabled ? 0.5 : 1}
        onPress={handlePress}
        onClick={handlePress}
        {...ContextMenuSizes[size]}
        {...views?.item}
      >
        {item.icon && (
          <View marginRight={8} {...views?.icon}>
            {item.icon}
          </View>
        )}
        <View flexGrow={1}>
          {typeof item.label === 'string' ? (
            <Text>{item.label}</Text>
          ) : (
            item.label
          )}
        </View>
      </View>
    );
  }
  const handlePress = () => {
    if (isDisabled) return;
    onSelect?.(undefined as any);
    if (closeMenu) closeMenu();
  };
  return (
    <View
      onPress={handlePress}
      onClick={handlePress}
      opacity={isDisabled ? 0.5 : 1}
      {...ContextMenuSizes[size]}
      {...views?.item}
      {...(props as any)}
    >
      {children}
    </View>
  );
};

export const ContextMenuDivider: React.FC<ContextMenuDividerProps> = ({
  views,
  ...props
}) => {
  return (
    <View
      height={1}
      backgroundColor="color-gray-200"
      marginVertical={4}
      {...views?.divider}
      {...props}
    />
  );
};

export const ContextMenuSeparator: React.FC<ContextMenuSeparatorProps> = ({
  views,
  ...props
}) => {
  return (
    <View
      height={1}
      backgroundColor="color-gray-200"
      marginVertical={4}
      {...views?.separator}
      {...props}
    />
  );
};

export const ContextMenuView: React.FC<
  {
    children: React.ReactNode;
    items?: ContextMenuItemType[];
    size?: Size;
    variant?: Variant;
    disableNativeContextMenu?: boolean;
    views?: any;
    onOpenChange?: (isOpen: boolean) => void;
  } & ViewProps
> = ({ children, items, views, themeMode: elementMode, ...props }) => {
  if (!items || items.length === 0) {
    return <>{children}</>;
  }
  return (
    <>
      <ContextMenuTrigger views={views} {...props}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent items={items} views={views} />
    </>
  );
};
