import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, ViewProps, useElementPosition } from 'app-studio';
import { TooltipContextType, Position, Alignment } from './Tooltip.type';
import { TooltipTriggerProps, TooltipContentProps } from './Tooltip.props';
import { TooltipSizes, TooltipVariants, getArrowStyles } from './Tooltip.style';

// Create context for the Tooltip
const TooltipContext = createContext<TooltipContextType>({
  isOpen: false,
  openTooltip: () => {},
  closeTooltip: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
  contentId: '',
  triggerId: '',
});

// Hook to use the Tooltip context
export const useTooltipContext = () => useContext(TooltipContext);

// Provider component for the Tooltip context
export const TooltipProvider: React.FC<{
  value: TooltipContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

// Tooltip Trigger component
export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  views,
  asChild = false,
  ...props
}) => {
  const { openTooltip, closeTooltip, triggerRef, contentId, triggerId } =
    useTooltipContext();

  const handleMouseEnter = () => openTooltip();
  const handleMouseLeave = () => closeTooltip();
  const handleFocus = () => openTooltip(); // For keyboard accessibility
  const handleBlur = () => closeTooltip(); // For keyboard accessibility

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    id: triggerId,
    'aria-describedby': contentId, // Link trigger to content for screen readers
    ...views?.container,
    ...props,
  };

  // If asChild is true, clone the child element and pass the props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  // Otherwise, wrap the children in a View component
  return (
    <View display="inline-block" {...triggerProps}>
      {children}
    </View>
  );
};

// Tooltip Content component
export const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  views,
  ...props
}) => {
  const { isOpen, contentRef, contentId, triggerId } = useTooltipContext();

  if (!isOpen) {
    return null; // Don't render content if not open
  }

  return (
    <View
      ref={contentRef}
      id={contentId}
      role="tooltip" // Use tooltip role for accessibility
      aria-labelledby={triggerId} // Associate content with trigger
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

// Main Tooltip View component
export const TooltipView: React.FC<
  {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: Position;
    align?: Alignment;
    size?: string;
    variant?: string;
    showArrow?: boolean;
    views?: any;
  } & Omit<ViewProps, 'position'>
> = ({
  content,
  children,
  position = 'top',
  align = 'center',
  size = 'md',
  variant = 'default',
  showArrow = true,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { isOpen, triggerRef, contentRef, contentId, triggerId } =
    useTooltipContext();

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
    placement: position,
  });

  // Sync the position ref with the trigger ref for positioning calculations
  useEffect(() => {
    if (triggerRef?.current && positionRef) {
      (positionRef as any).current = triggerRef.current;
    }
  }, [triggerRef, positionRef, isOpen]);

  // Calculate optimal position using useElementPosition when the tooltip opens
  useEffect(() => {
    if (isOpen && contentRef?.current && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      let placement = position;

      // Use relation data to determine optimal placement
      if (relation) {
        // If preferred position doesn't have enough space, use the position with more space
        if (position === 'top' && relation.space.vertical === 'bottom') {
          placement = 'bottom';
        } else if (position === 'bottom' && relation.space.vertical === 'top') {
          placement = 'top';
        } else if (
          position === 'right' &&
          relation.space.horizontal === 'left'
        ) {
          placement = 'left';
        } else if (
          position === 'left' &&
          relation.space.horizontal === 'right'
        ) {
          placement = 'right';
        }
      }

      // Calculate position based on optimal placement and alignment
      let x = 0;
      let y = 0;

      switch (placement) {
        case 'top':
          x =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - 120 // Estimated content width
              : triggerRect.left + triggerRect.width / 2 - 60; // Half of estimated width
          y = triggerRect.top - 8;
          break;
        case 'bottom':
          x =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - 120
              : triggerRect.left + triggerRect.width / 2 - 60;
          y = triggerRect.bottom + 8;
          break;
        case 'right':
          x = triggerRect.right + 8;
          y =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - 32 // Estimated content height
              : triggerRect.top + triggerRect.height / 2 - 16; // Half of estimated height
          break;
        case 'left':
          x = triggerRect.left - 8;
          y =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - 32
              : triggerRect.top + triggerRect.height / 2 - 16;
          break;
      }

      setOptimalPosition({ x, y, placement });
    }
  }, [isOpen, position, align, triggerRef, contentRef, relation]);

  // Get arrow styles based on optimal placement
  const arrowStyles = showArrow
    ? getArrowStyles(optimalPosition.placement as Position)
    : {};

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
      position="relative"
      display="inline-block"
      {...views?.container}
      {...props}
    >
      {/* Trigger */}
      <TooltipTrigger>{children}</TooltipTrigger>

      {/* Content */}
      {isOpen && (
        <View
          ref={contentRef}
          id={contentId}
          role="tooltip"
          aria-labelledby={triggerId}
          borderRadius={4}
          boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
          style={positionStyles}
          {...TooltipSizes[size as keyof typeof TooltipSizes]}
          {...TooltipVariants[variant as keyof typeof TooltipVariants]}
          {...views?.content}
        >
          {typeof content === 'string' ? (
            <Text {...views?.text}>{content}</Text>
          ) : (
            content
          )}

          {/* Arrow */}
          {showArrow && <View {...arrowStyles} {...views?.arrow} />}
        </View>
      )}
    </View>
  );
};
