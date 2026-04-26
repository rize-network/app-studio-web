import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import { View, ViewProps, useElementPosition } from 'app-studio';
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
import {
  ContextMenuSizes,
  ContextMenuVariants,
  ContextMenuItemStates,
} from './ContextMenu.style';
import { ChevronIcon } from '../../Icon/Icon';
// Initializes the React Context for the Context Menu, providing default values for its state and functions. This context enables descendant components to access and update the menu's open/close state, position, active submenu, and other shared properties.
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
// Provides the ContextMenuContext to its children, making the context's `value` (which contains menu state and actions) available throughout the component tree. This is essential for managing the global state of the context menu.
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
  disableNativeContextMenu = true,
  asChild = false,
  isDisabled = false,
  views,
  ...props
}) => {
  const { triggerRef, contentId, openMenu } = useContextMenuContext();
  const handleContextMenu = (e: React.MouseEvent) => {
    if (isDisabled) return;
    if (disableNativeContextMenu) {
      e.preventDefault();
    }
    if (openMenu) {
      openMenu(e);
    } else {
      const { setIsOpen, setPosition } = useContextMenuContext();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    }
  };
  const triggerProps = {
    ref: triggerRef as React.Ref<any>,
    onContextMenu: handleContextMenu,
    'aria-controls': contentId,
    'aria-haspopup': 'menu' as const,
    'data-disabled': isDisabled ? '' : undefined,
    ...(asChild &&
      React.isValidElement(children) &&
      children.props.isDisabled === undefined && { isDisabled }),
    ...views?.container,
    ...props,
  };
  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children);
    return React.cloneElement(child, { ...triggerProps, ...child.props });
  }
  return <View {...triggerProps}>{children}</View>;
};
export const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  items,
  children,
  position,
  side = 'right',
  align = 'start',
  views,
  style,
  ...props
}) => {
  const {
    isOpen,
    position: contextPosition,
    contentRef,
    contentId,
    variant,
  } = useContextMenuContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const ref = contentRef || menuRef;
  const { ref: positionRef, relation } = useElementPosition({});
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (isOpen && ref.current) {
      const pos = position || contextPosition;
      const menuWidth = ref.current.offsetWidth;
      const menuHeight = ref.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let finalX = pos.x;
      let finalY = pos.y;
      if (relation) {
        if (relation.space.horizontal === 'left') {
          finalX = pos.x - menuWidth;
        } else {
          finalX = pos.x;
        }
        if (relation.space.vertical === 'top') {
          finalY = pos.y - menuHeight;
        } else {
          finalY = pos.y;
        }
      }
      if (finalX + menuWidth > viewportWidth) {
        finalX = viewportWidth - menuWidth - 8;
      }
      if (finalX < 8) {
        finalX = 8;
      }
      if (finalY + menuHeight > viewportHeight) {
        finalY = viewportHeight - menuHeight - 8;
      }
      if (finalY < 8) {
        finalY = 8;
      }
      setMenuPosition({ x: finalX, y: finalY });
    }
  }, [isOpen, contextPosition, position, side, align, ref, relation]);
  if (!isOpen) {
    return null;
  }
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${menuPosition.y}px`,
    left: `${menuPosition.x}px`,
    zIndex: 1000,
    transformOrigin: 'top left',
  };
  return (
    <View
      id={contentId || 'context-menu'}
      ref={ref}
      role="menu"
      tabIndex={-1}
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      style={{ ...positionStyles, ...style }}
      {...ContextMenuVariants[variant]}
      {...views?.menu}
      {...views?.content}
      {...props}
    >
      {items &&
        items.map((item, index) => {
          if (item.divider) {
            return (
              <ContextMenuDivider key={`divider-${index}`} views={views} />
            );
          }
          return <ContextMenuItem key={item.id} item={item} views={views} />;
        })}
      {children}
    </View>
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
  const { activeSubmenuId, setActiveSubmenuId, size, closeMenu } =
    useContextMenuContext();
  if (item) {
    const [isHovered, setIsHovered] = useState(false);
    const hasSubmenu = item.items && item.items.length > 0;
    const isSubmenuActive = activeSubmenuId === item.id;
    const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });
    const disabled = item.disabled || isDisabled;
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (hasSubmenu) {
        setActiveSubmenuId(item.id);
      }
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    const handleClick = () => {
      if (disabled) return;
      if (!hasSubmenu && item.onClick) {
        item.onClick();
        if (closeMenu) closeMenu();
      }
    };
    const { ref: itemRef, relation: submenuRelation } = useElementPosition({});
    useEffect(() => {
      if (isSubmenuActive && itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const estimatedSubmenuWidth = 200;
        let useLeftSide = false;
        if (submenuRelation) {
          useLeftSide = submenuRelation.space.horizontal === 'left';
        } else {
          const rightSpace = viewportWidth - rect.right;
          const leftSpace = rect.left;
          useLeftSide =
            rightSpace < estimatedSubmenuWidth && leftSpace > rightSpace;
        }
        setSubmenuPosition({
          x: useLeftSide ? rect.left - estimatedSubmenuWidth : rect.right,
          y: rect.top,
        });
      }
    }, [isSubmenuActive, item.items, submenuRelation]);
    return (
      <View
        ref={itemRef}
        role="menuitem"
        display="flex"
        alignItems="center"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        position="relative"
        aria-disabled={disabled}
        data-disabled={disabled ? '' : undefined}
        {...ContextMenuSizes[size]}
        _hover={!disabled ? ContextMenuItemStates.hover : {}}
        backgroundColor={
          isHovered && !disabled ? 'color-gray-100' : 'transparent'
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...views?.item}
        {...props}
      >
        {item.icon && (
          <View marginRight={8} {...views?.icon}>
            {item.icon}
          </View>
        )}
        <View flexGrow={1}>{item.label}</View>
        {hasSubmenu && (
          <View marginLeft={8} {...views?.submenuIndicator}>
            <ChevronIcon
              orientation="right"
              widthHeight={16}
              color="currentColor"
              filled={true}
            />
          </View>
        )}
        {isSubmenuActive && hasSubmenu && (
          <ContextMenuContent
            items={item.items || []}
            position={submenuPosition}
            side="right"
            align="start"
            views={views}
          />
        )}
      </View>
    );
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onSelect?.(event);
      if (closeMenu) closeMenu();
    }
  };
  return (
    <View
      role="menuitem"
      onClick={handleClick}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      aria-disabled={isDisabled}
      data-disabled={isDisabled ? '' : undefined}
      {...ContextMenuSizes[size]}
      _hover={!isDisabled ? ContextMenuItemStates.hover : {}}
      {...views?.item}
      {...props}
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
      height="1px"
      backgroundColor="color-gray-200"
      margin="4px 0"
      role="separator"
      aria-orientation="horizontal"
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
      height="1px"
      backgroundColor="color-gray-200"
      margin="4px 0"
      role="separator"
      aria-orientation="horizontal"
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
  } & ViewProps
> = ({
  children,
  items,
  size = 'md',
  variant = 'default',
  disableNativeContextMenu = true,
  views,
  themeMode: elementMode,
  ...props
}) => {
  if (!items || items.length === 0) {
    return <>{children}</>;
  }
  return (
    <>
      <ContextMenuTrigger
        disableNativeContextMenu={disableNativeContextMenu}
        views={views}
        {...props}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent items={items} views={views} />
    </>
  );
};
