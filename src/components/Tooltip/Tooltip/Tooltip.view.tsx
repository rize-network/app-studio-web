import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, ViewProps } from 'app-studio';
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

  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: position,
  });

  // Calculate optimal position when the tooltip opens
  useEffect(() => {
    if (isOpen && contentRef?.current && triggerRef?.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Get content dimensions
      const contentWidth = Math.max(contentRect.width || 120, 120);
      const contentHeight = Math.max(contentRect.height || 32, 32);

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

      // Determine optimal placement based on available space and preferred position
      const placements = [
        {
          placement: 'top' as const,
          space: availableSpace.top,
          fits: availableSpace.top >= contentHeight + 16, // 8px offset + 8px margin
          x:
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - contentWidth
              : triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.top - contentHeight - 8,
        },
        {
          placement: 'bottom' as const,
          space: availableSpace.bottom,
          fits: availableSpace.bottom >= contentHeight + 16,
          x:
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - contentWidth
              : triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.bottom + 8,
        },
        {
          placement: 'right' as const,
          space: availableSpace.right,
          fits: availableSpace.right >= contentWidth + 16,
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
          fits: availableSpace.left >= contentWidth + 16,
          x: triggerRect.left - contentWidth - 8,
          y:
            align === 'start'
              ? triggerRect.top
              : align === 'end'
              ? triggerRect.bottom - contentHeight
              : triggerRect.top + triggerRect.height / 2 - contentHeight / 2,
        },
      ];

      // First try the preferred position if it fits
      const preferredPlacement = placements.find(
        (p) => p.placement === position && p.fits
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
  }, [isOpen, position, align, triggerRef, contentRef]);

  // Get arrow styles based on optimal placement
  const arrowStyles = showArrow
    ? getArrowStyles(optimalPosition.placement as Position)
    : {};

  // Create intelligent positioning styles
  const positionStyles: React.CSSProperties = {
    position: 'fixed', // Use fixed positioning since we calculated viewport coordinates
    left: optimalPosition.x,
    top: optimalPosition.y,
    zIndex: 1000,
  };

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

          {/* Debug info - can be removed in production */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div style={{ fontSize: '8px', opacity: 0.7, marginTop: '2px' }}>
              Placement: {optimalPosition.placement}
            </div>
          )} */}
        </View>
      )}
    </View>
  );
};
