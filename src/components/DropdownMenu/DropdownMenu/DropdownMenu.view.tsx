import React, { createContext, useContext, useRef, useState } from 'react';
import { View } from 'app-studio';
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
  getDropdownPosition,
} from './DropdownMenu.style';

// Create context for the DropdownMenu
const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  activeSubmenuId: null,
  setActiveSubmenuId: () => {},
  size: 'md',
  variant: 'default',
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
  const { isOpen, setIsOpen } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <View
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
  const {
    isOpen, //activeSubmenuId, setActiveSubmenuId, size,
    variant,
  } = useDropdownMenuContext();

  if (!isOpen) {
    return null;
  }

  return (
    <View
      id="dropdown-menu"
      position="absolute"
      zIndex={1000}
      borderRadius={4}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      {...getDropdownPosition(side, align)}
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
export const DropdownMenuView: React.FC<{
  trigger: React.ReactNode;
  items: DropdownMenuItemType[];
  side?: Position;
  align?: Alignment;
  views?: any;
}> = ({
  trigger,
  items,
  side = 'bottom',
  align = 'start',
  views,
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
