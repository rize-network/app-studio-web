import React, { createContext, useContext } from 'react';
import { View, Text, ViewProps } from 'app-studio';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
import { MoreIcon } from '../../Icon/Icon';
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

export const ContextMenuTrigger: React.FC<
  ContextMenuTriggerProps & { showIndicator?: boolean }
> = ({
  children,
  isDisabled = false,
  views,
  asChild = false,
  showIndicator = true,
  ...props
}) => {
  const { openMenu, setIsOpen } = useContextMenuContext();
  const handleOpen = (e: any) => {
    if (isDisabled) return;
    if (openMenu) openMenu(e);
    else setIsOpen(true);
  };
  // On native a long-press has no visible affordance, so a context menu reads
  // as non-interactive. Open on tap AND long-press, and overlay a small "⋯"
  // indicator so users can see there's a menu.
  const triggerProps: any = {
    onPress: handleOpen,
    onClick: handleOpen,
    onLongPress: handleOpen,
    ...views?.container,
    ...props,
  };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, triggerProps);
  }
  return (
    <View position="relative" {...triggerProps}>
      {children}
      {showIndicator && !isDisabled && (
        <View
          position="absolute"
          top={6}
          right={6}
          width={20}
          height={20}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          backgroundColor="color-black-900-60"
          pointerEvents="none"
          {...views?.indicator}
        >
          <MoreIcon widthHeight={14} color="color-gray-600" />
        </View>
      )}
    </View>
  );
};

export const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  items,
  children,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen, variant, size } = useContextMenuContext();
  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size={size}
      items={(items || []).map((item, index) =>
        item.divider
          ? { id: `divider-${index}`, divider: true }
          : {
              id: item.id,
              label: item.label,
              icon: item.icon,
              isDisabled: item.disabled,
              onPress: () => item.onClick?.(),
            }
      )}
      views={{
        sheet: {
          ...ContextMenuVariants[variant],
          ...views?.menu,
          ...views?.content,
          ...(props as any),
        },
        item: views?.item,
        itemIcon: views?.icon,
        divider: views?.divider,
      }}
    >
      {children}
    </ActionSheet>
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
