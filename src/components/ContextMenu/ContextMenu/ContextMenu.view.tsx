import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import { View, Horizontal } from 'app-studio';
import {
  ContextMenuContextType,
  Size,
  Variant,
  Position,
  Alignment,
  ContextMenuItem as ContextMenuItemType,
} from './ContextMenu.type';
import {
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuDividerProps,
} from './ContextMenu.props';
import {
  ContextMenuSizes,
  ContextMenuVariants,
  ContextMenuItemStates,
  calculateMenuPosition,
} from './ContextMenu.style';

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
  views,
  ...props
}) => {
  const { setIsOpen, setPosition } = useContextMenuContext();

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disableNativeContextMenu) {
      e.preventDefault();
    }

    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  return (
    <View onContextMenu={handleContextMenu} {...views?.container} {...props}>
      {children}
    </View>
  );
};

// ContextMenu Content component
export const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  items,
  position,
  side = 'right',
  align = 'start',
  views,
  ...props
}) => {
  const {
    isOpen,
    position: contextPosition,
    activeSubmenuId,
    setActiveSubmenuId,
    size,
    variant,
  } = useContextMenuContext();

  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Calculate the position of the menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const pos = position || contextPosition;

      const calculatedPosition = calculateMenuPosition(
        pos.x,
        pos.y,
        menuWidth,
        menuHeight,
        windowWidth,
        windowHeight,
        side,
        align
      );

      setMenuPosition(calculatedPosition);
    }
  }, [isOpen, contextPosition, position, side, align]);

  if (!isOpen) {
    return null;
  }

  return (
    <View
      id="context-menu"
      ref={menuRef}
      position="fixed"
      top={menuPosition.y}
      left={menuPosition.x}
      zIndex={1000}
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      {...ContextMenuVariants[variant]}
      {...views?.menu}
      {...props}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return <ContextMenuDivider key={`divider-${index}`} views={views} />;
        }

        return <ContextMenuItem key={item.id} item={item} views={views} />;
      })}
    </View>
  );
};

// ContextMenu Item component
export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  item,
  views,
  ...props
}) => {
  const { activeSubmenuId, setActiveSubmenuId, size, variant } =
    useContextMenuContext();

  const [isHovered, setIsHovered] = useState(false);
  const hasSubmenu = item.items && item.items.length > 0;
  const isSubmenuActive = activeSubmenuId === item.id;
  const itemRef = useRef<HTMLDivElement>(null);
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });

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
    if (item.disabled) return;
    if (!hasSubmenu && item.onClick) {
      item.onClick();
    }
  };

  // Calculate the position of the submenu
  useEffect(() => {
    if (isSubmenuActive && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setSubmenuPosition({
        x: rect.right,
        y: rect.top,
      });
    }
  }, [isSubmenuActive]);

  return (
    <View
      ref={itemRef}
      display="flex"
      alignItems="center"
      cursor={item.disabled ? 'not-allowed' : 'pointer'}
      opacity={item.disabled ? 0.5 : 1}
      position="relative"
      {...ContextMenuSizes[size]}
      _hover={!item.disabled ? ContextMenuItemStates.hover : {}}
      backgroundColor={
        isHovered && !item.disabled ? 'color.gray.100' : 'transparent'
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
              fill="currentColor"
            />
          </svg>
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
};

// ContextMenu Divider component
export const ContextMenuDivider: React.FC<ContextMenuDividerProps> = ({
  views,
  ...props
}) => {
  return (
    <View
      height="1px"
      backgroundColor="color.gray.200"
      margin="4px 0"
      {...views?.divider}
      {...props}
    />
  );
};

// Main ContextMenu View component
export const ContextMenuView: React.FC<{
  children: React.ReactNode;
  items: ContextMenuItemType[];
  size: Size;
  variant: Variant;
  disableNativeContextMenu?: boolean;
  views?: any;
}> = ({
  children,
  items,
  size,
  variant,
  disableNativeContextMenu = true,
  views,
  ...props
}) => {
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
