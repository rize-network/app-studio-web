import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, ViewProps, useElementPosition } from 'app-studio';
import {
  DropdownMenuContextType,
  DropdownMenuItem as DropdownMenuItemType,
  Position,
  Alignment,
} from './DropdownMenu.type';
import {
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuDividerProps,
} from './DropdownMenu.props';
import {
  DropdownMenuSizes,
  DropdownMenuVariants,
  DropdownMenuItemStates,
} from './DropdownMenu.style';
import { ChevronIcon } from '../../Icon/Icon';

// Create context for the DropdownMenu
const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  activeSubmenuId: null,
  setActiveSubmenuId: () => {},
  size: 'md',
  variant: 'default',
  triggerRef: { current: null },
});

// Provider component for the DropdownMenu context
export const DropdownMenuProvider: React.FC<{
  children: React.ReactNode;
  value: DropdownMenuContextType;
}> = ({ children, value }) => {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

// Hook to use the DropdownMenu context
export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'useDropdownMenuContext must be used within a DropdownMenuProvider'
    );
  }
  return context;
};

// DropdownMenu Trigger component
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <View
      ref={triggerRef}
      id="dropdown-trigger"
      onClick={handleClick}
      cursor="pointer"
      position="relative"
      display="inline-block"
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

// DropdownMenu Content component
export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  items,
  side = 'bottom',
  align = 'start',
  views,
  ...props
}) => {
  const { isOpen, variant, triggerRef } = useDropdownMenuContext();

  const contentRef = useRef<HTMLDivElement>(null);

  // Use useElementPosition for intelligent positioning
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: true,
    trackOnScroll: true,
    trackOnResize: true,
  });

  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: side,
  });

  // Sync the position ref with the trigger ref for positioning calculations
  useEffect(() => {
    if (triggerRef.current && positionRef) {
      (positionRef as any).current = triggerRef.current;
    }
  }, [triggerRef, positionRef, isOpen]);

  // Calculate optimal position using useElementPosition when the dropdown opens
  useEffect(() => {
    if (isOpen && contentRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      let placement = side;

      // Use relation data to determine optimal placement
      if (relation) {
        // If preferred side doesn't have enough space, use the side with more space
        if (side === 'bottom' && relation.space.vertical === 'top') {
          placement = 'top';
        } else if (side === 'top' && relation.space.vertical === 'bottom') {
          placement = 'bottom';
        } else if (side === 'right' && relation.space.horizontal === 'left') {
          placement = 'left';
        } else if (side === 'left' && relation.space.horizontal === 'right') {
          placement = 'right';
        }
      }

      // Calculate position based on optimal placement and alignment
      let x = 0;
      let y = 0;

      switch (placement) {
        case 'bottom':
          x =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - 180 // Estimated content width
              : triggerRect.left + triggerRect.width / 2 - 90; // Half of estimated width
          y = triggerRect.bottom + 8;
          break;
        case 'top':
          x =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - 180
              : triggerRect.left + triggerRect.width / 2 - 90;
          y = triggerRect.top - 8; // Will be adjusted with transform
          break;
        case 'right':
          x = triggerRect.right + 8;
          y =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - 100 // Estimated content height
              : triggerRect.top + triggerRect.height / 2 - 50; // Half of estimated height
          break;
        case 'left':
          x = triggerRect.left - 8; // Will be adjusted with transform
          y =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - 100
              : triggerRect.top + triggerRect.height / 2 - 50;
          break;
      }

      setOptimalPosition({ x, y, placement });
    }
  }, [isOpen, side, align, triggerRef, relation]);

  if (!isOpen) {
    return null;
  }

  // Create intelligent positioning styles with transform for better placement
  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      left: optimalPosition.x,
      top: optimalPosition.y,
      zIndex: 1000,
    };

    // Add transform based on placement for better positioning
    switch (optimalPosition.placement) {
      case 'top':
        return { ...baseStyles, transform: 'translateY(-100%)' };
      case 'left':
        return { ...baseStyles, transform: 'translateX(-100%)' };
      case 'bottom':
      case 'right':
      default:
        return baseStyles;
    }
  };

  const positionStyles = getPositionStyles();

  return (
    <View
      ref={contentRef}
      id="dropdown-menu"
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      style={positionStyles}
      {...DropdownMenuVariants[variant]}
      {...views?.menu}
      {...props}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return <DropdownMenuDivider key={`divider-${index}`} views={views} />;
        }

        return <DropdownMenuItem key={item.id} item={item} views={views} />;
      })}
    </View>
  );
};

// DropdownMenu Item component
export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  item,
  views,
  ...props
}) => {
  const {
    activeSubmenuId,
    setActiveSubmenuId,
    size,
    //variant
  } = useDropdownMenuContext();

  const [isHovered, setIsHovered] = useState(false);
  const hasSubmenu = item.items && item.items.length > 0;
  const isSubmenuActive = activeSubmenuId === item.id;
  const itemRef = useRef<HTMLDivElement>(null);

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.disabled) return;
    if (!hasSubmenu && item.onClick) {
      item.onClick();
    }
  };

  return (
    <View
      ref={itemRef}
      display="flex"
      alignItems="center"
      cursor={item.disabled ? 'not-allowed' : 'pointer'}
      opacity={item.disabled ? 0.5 : 1}
      position="relative"
      {...DropdownMenuSizes[size]}
      _hover={!item.disabled ? DropdownMenuItemStates.hover : {}}
      backgroundColor={
        isHovered && !item.disabled ? 'color-gray-100' : 'transparent'
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
        <DropdownMenuContent
          items={item.items || []}
          side="right"
          align="start"
          views={views}
        />
      )}
    </View>
  );
};

// DropdownMenu Divider component
export const DropdownMenuDivider: React.FC<DropdownMenuDividerProps> = ({
  views,
  ...props
}) => {
  return (
    <View
      height="1px"
      backgroundColor="color-gray-200"
      margin="4px 0"
      {...views?.divider}
      {...props}
    />
  );
};

// Main DropdownMenu View component
export const DropdownMenuView: React.FC<
  {
    trigger: React.ReactNode;
    items: DropdownMenuItemType[];
    side?: Position;
    align?: Alignment;
    views?: any;
  } & ViewProps
> = ({
  trigger,
  items,
  side = 'bottom',
  align = 'start',
  views,

  themeMode: elementMode,
  ...props
}) => {
  return (
    <View
      position="relative"
      display="inline-block"
      {...views?.container}
      {...props}
    >
      <DropdownMenuTrigger views={views}>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        items={items}
        side={side}
        align={align}
        views={views}
      />
    </View>
  );
};
