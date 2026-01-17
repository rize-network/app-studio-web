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

// Create context for the ContextMenu
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

// Provider component for the ContextMenu context
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

// Hook to use the ContextMenu context
export const useContextMenuContext = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'useContextMenuContext must be used within a ContextMenuProvider'
    );
  }
  return context;
};

// ContextMenu Trigger component
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
      // Fallback to the old way if openMenu is not available
      const { setIsOpen, setPosition } = useContextMenuContext();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    }
  };

  const triggerProps = {
    ref: triggerRef as React.Ref<any>, // Cast needed for different element types
    onContextMenu: handleContextMenu,
    'aria-controls': contentId,
    'aria-haspopup': 'menu' as const, // Indicate it triggers a menu
    'data-disabled': isDisabled ? '' : undefined,
    // Pass disabled state down if using asChild
    ...(asChild &&
      React.isValidElement(children) &&
      children.props.isDisabled === undefined && { isDisabled }),
    ...views?.container,
    ...props,
  };

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children);
    // Need to handle ref merging if child uses its own ref
    return React.cloneElement(child, { ...triggerProps, ...child.props });
  }

  // Default: wrap children in a View
  return <View {...triggerProps}>{children}</View>;
};

// ContextMenu Content component
export const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  items,
  children,
  position,
  side = 'right',
  align = 'start',
  views,
  style, // Capture user-provided style
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

  // Use contentRef if provided, otherwise use local menuRef
  const ref = contentRef || menuRef;

  // Use useElementPosition for intelligent positioning
  const { ref: positionRef, relation } = useElementPosition({
    // trackChanges: true,
    // trackOnHover: false,
    // trackOnScroll: true,
    // trackOnResize: true,
    // throttleMs: 50,
  });

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Calculate the position of the menu using useElementPosition
  useEffect(() => {
    if (isOpen && ref.current) {
      const pos = position || contextPosition;
      const menuWidth = ref.current.offsetWidth;
      const menuHeight = ref.current.offsetHeight;

      // Get viewport dimensions for boundary checking
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate optimal position based on available space
      let finalX = pos.x;
      let finalY = pos.y;

      // Use relation data if available for smarter positioning
      if (relation) {
        // Position based on where there's more space
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

      // Ensure the menu stays within viewport bounds
      if (finalX + menuWidth > viewportWidth) {
        finalX = viewportWidth - menuWidth - 8; // 8px margin
      }
      if (finalX < 8) {
        finalX = 8; // 8px margin
      }
      if (finalY + menuHeight > viewportHeight) {
        finalY = viewportHeight - menuHeight - 8; // 8px margin
      }
      if (finalY < 8) {
        finalY = 8; // 8px margin
      }

      setMenuPosition({ x: finalX, y: finalY });
    }
  }, [isOpen, contextPosition, position, side, align, ref, relation]);

  if (!isOpen) {
    return null;
  }

  // Intelligent positioning - place at calculated optimal position
  const positionStyles: React.CSSProperties = {
    position: 'fixed', // Use fixed to position relative to viewport
    top: `${menuPosition.y}px`,
    left: `${menuPosition.x}px`,
    zIndex: 1000,
    transformOrigin: 'top left', // Optional: for animations
  };

  return (
    <View
      id={contentId || 'context-menu'}
      ref={ref}
      role="menu"
      tabIndex={-1} // Important for focus management if implemented later
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      // Apply default content styles + custom styles + positioning
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

// ContextMenu Item component
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

  // For data-driven approach
  if (item) {
    const [isHovered, setIsHovered] = useState(false);
    const hasSubmenu = item.items && item.items.length > 0;
    const isSubmenuActive = activeSubmenuId === item.id;
    const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });
    const disabled = item.disabled || isDisabled;

    // Handle mouse enter event
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (hasSubmenu) {
        setActiveSubmenuId(item.id);
      }
    };

    // Handle mouse leave event
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    // Handle click event
    const handleClick = () => {
      if (disabled) return;
      if (!hasSubmenu && item.onClick) {
        item.onClick();
        if (closeMenu) closeMenu();
      }
    };

    // Use useElementPosition for submenu positioning
    const { ref: itemRef, relation: submenuRelation } = useElementPosition({
      // trackChanges: true,
      // trackOnHover: false,
      // trackOnScroll: true,
      // trackOnResize: true,
      // throttleMs: 50,
    });

    // Calculate the position of the submenu with intelligent positioning
    useEffect(() => {
      if (isSubmenuActive && itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Estimate submenu dimensions (will be refined when submenu renders)
        const estimatedSubmenuWidth = 200; // Default submenu width

        // Use relation data for smarter positioning if available
        let useLeftSide = false;
        if (submenuRelation) {
          useLeftSide = submenuRelation.space.horizontal === 'left';
        } else {
          // Fallback to manual calculation
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

  // For compound component pattern
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onSelect?.(event); // Call the user's handler first
      if (closeMenu) closeMenu(); // Then close the menu
    }
  };

  // Use Button for semantics and interaction state styling
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

// ContextMenu Divider component
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

// ContextMenu Separator component (alias for Divider with different styling options)
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

// Main ContextMenu View component
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
    // If no items are provided, just render the children (for compound component pattern)
    return <>{children}</>;
  }

  // For data-driven approach
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
