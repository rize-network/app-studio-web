import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, ViewProps } from 'app-studio';
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
  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: side,
  });

  // Calculate optimal position when the dropdown opens
  useEffect(() => {
    if (isOpen && contentRef.current && triggerRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Get content dimensions
      const contentWidth = Math.max(contentRect.width || 180, 180);
      const contentHeight = Math.max(contentRect.height || 100, 100);

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate available space on all sides from the trigger
      const availableSpace = {
        top: triggerRect.top,
        right: viewportWidth - triggerRect.right,
        bottom: viewportHeight - triggerRect.bottom,
        left: triggerRect.left,
      };

      // Determine optimal placement based on available space and preferred side
      const placements = [
        {
          placement: 'bottom' as const,
          space: availableSpace.bottom,
          fits: availableSpace.bottom >= contentHeight + 8,
          x:
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - contentWidth
              : triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.bottom + 8,
        },
        {
          placement: 'top' as const,
          space: availableSpace.top,
          fits: availableSpace.top >= contentHeight + 8,
          x:
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - contentWidth
              : triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.top - contentHeight - 8,
        },
        {
          placement: 'right' as const,
          space: availableSpace.right,
          fits: availableSpace.right >= contentWidth + 8,
          x: triggerRect.right + 8,
          y:
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - contentHeight
              : triggerRect.top + triggerRect.height / 2 - contentHeight / 2,
        },
        {
          placement: 'left' as const,
          space: availableSpace.left,
          fits: availableSpace.left >= contentWidth + 8,
          x: triggerRect.left - contentWidth - 8,
          y:
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - contentHeight
              : triggerRect.top + triggerRect.height / 2 - contentHeight / 2,
        },
      ];

      // First try the preferred side if it fits
      const preferredPlacement = placements.find(
        (p) => p.placement === side && p.fits
      );
      if (preferredPlacement) {
        setOptimalPosition({
          x: preferredPlacement.x,
          y: preferredPlacement.y,
          placement: preferredPlacement.placement,
        });
        return;
      }

      // Otherwise, find the best fitting placement
      const fittingPlacement = placements.find((p) => p.fits);
      if (fittingPlacement) {
        setOptimalPosition({
          x: fittingPlacement.x,
          y: fittingPlacement.y,
          placement: fittingPlacement.placement,
        });
        return;
      }

      // If nothing fits, choose the placement with the most space
      const bestPlacement = placements.reduce((best, current) =>
        current.space > best.space ? current : best
      );

      // Ensure the content stays within viewport bounds
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
  }, [isOpen, side, align, triggerRef]);

  if (!isOpen) {
    return null;
  }

  // Create intelligent positioning styles
  const positionStyles: React.CSSProperties = {
    position: 'fixed', // Use fixed positioning since we calculated viewport coordinates
    left: optimalPosition.x,
    top: optimalPosition.y,
    zIndex: 1000,
  };

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
      {/* Debug info - can be removed in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '10px', opacity: 0.7, padding: '4px' }}>
          Placement: {optimalPosition.placement}
        </div>
      )}
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
      backgroundColor="color.gray.200"
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
