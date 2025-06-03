import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect,
} from 'react';
import { View, useElementPosition } from 'app-studio';
import { HoverCardContextType } from './HoverCard.type';
import {
  HoverCardContentProps,
  HoverCardTriggerProps,
} from './HoverCard.props';

// Create context for the HoverCard
const HoverCardContext = createContext<HoverCardContextType>({
  isOpen: false,
  openCard: () => {},
  closeCard: () => {},
  cancelCloseTimer: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
  contentId: '',
  triggerId: '',
});

export const HoverCardProvider: React.FC<{
  children: React.ReactNode;
  value: HoverCardContextType;
}> = ({ children, value }) => {
  return (
    <HoverCardContext.Provider value={value}>
      {children}
    </HoverCardContext.Provider>
  );
};

export const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error(
      'useHoverCardContext must be used within a HoverCardProvider'
    );
  }
  return context;
};

export const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({
  children,
  views,
  asChild = false,
  ...props
}) => {
  const { openCard, closeCard, triggerRef, contentId, triggerId } =
    useHoverCardContext();

  const handleMouseEnter = () => openCard();
  const handleMouseLeave = () => closeCard();
  const handleFocus = () => openCard(); // For keyboard accessibility
  const handleBlur = () => closeCard(); // For keyboard accessibility

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

  if (asChild && isValidElement(children)) {
    // Clone the child element and merge props
    const child = Children.only(children);
    return cloneElement(child, { ...triggerProps, ...child.props });
  }

  // Default: wrap children in a View
  return (
    <View position="relative" display="inline-block" {...triggerProps}>
      {children}
    </View>
  );
};

export const HoverCardContent: React.FC<HoverCardContentProps> = ({
  children,
  views,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  style: userStyle, // User provided style override
  backgroundColor = 'white',
  borderRadius = '4px',
  boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.15)',
  padding = '12px',
  minWidth = '50px',
  maxWidth = '300px',
  ...props
}) => {
  const {
    isOpen,
    cancelCloseTimer,
    closeCard,
    contentRef,
    triggerRef,
    contentId,
    triggerId,
  } = useHoverCardContext();

  const [optimalPosition, setOptimalPosition] = useState({
    x: 0,
    y: 0,
    placement: side,
  });

  // Calculate optimal position when the card opens or content dimensions change
  useEffect(() => {
    if (isOpen && contentRef?.current && triggerRef?.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Get content dimensions
      const contentWidth = Math.max(contentRect.width || 200, 200);
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
          fits: availableSpace.bottom >= contentHeight + sideOffset,
          x: triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.bottom + sideOffset,
        },
        {
          placement: 'top' as const,
          space: availableSpace.top,
          fits: availableSpace.top >= contentHeight + sideOffset,
          x: triggerRect.left + triggerRect.width / 2 - contentWidth / 2,
          y: triggerRect.top - contentHeight - sideOffset,
        },
        {
          placement: 'right' as const,
          space: availableSpace.right,
          fits: availableSpace.right >= contentWidth + sideOffset,
          x: triggerRect.right + sideOffset,
          y: triggerRect.top + triggerRect.height / 2 - contentHeight / 2,
        },
        {
          placement: 'left' as const,
          space: availableSpace.left,
          fits: availableSpace.left >= contentWidth + sideOffset,
          x: triggerRect.left - contentWidth - sideOffset,
          y: triggerRect.top + triggerRect.height / 2 - contentHeight / 2,
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
  }, [isOpen, side, sideOffset, contentRef, triggerRef]);

  const handleMouseEnter = () => cancelCloseTimer(); // Keep card open if mouse enters content
  const handleMouseLeave = () => closeCard();

  if (!isOpen) {
    return null; // Don't render content if not open
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
      id={contentId}
      role="tooltip" // Use tooltip role for accessibility
      aria-labelledby={triggerId} // Associate content with trigger
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      padding={padding}
      minWidth={minWidth}
      maxWidth={maxWidth}
      // Combine intelligent position styles with user styles
      style={{
        ...positionStyles,
        ...userStyle, // Allow user override
      }}
      {...views?.container}
      {...props}
    >
      {children}
      {/* Debug info - can be removed in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px' }}>
          Placement: {optimalPosition.placement}
        </div>
      )}
    </View>
  );
};
