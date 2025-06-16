import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
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

  // Use useElementPosition for intelligent positioning
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: true,
    trackOnScroll: true,
    trackOnResize: true,
  });

  // Sync the position ref with the trigger ref for positioning calculations
  useEffect(() => {
    if (triggerRef?.current && positionRef?.current !== triggerRef.current) {
      // Update the position tracking to use the trigger element
      if (positionRef) {
        (positionRef as any).current = triggerRef.current;
      }
    }
  }, [triggerRef, positionRef, isOpen]);

  const handleMouseEnter = () => cancelCloseTimer(); // Keep card open if mouse enters content
  const handleMouseLeave = () => closeCard();

  if (!isOpen) {
    return null; // Don't render content if not open
  }

  // Create intelligent positioning styles based on useElementPosition relation data
  const getPositionStyles = (): React.CSSProperties => {
    if (!relation || !triggerRef?.current) {
      // Fallback positioning if relation data is not available
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
      };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    let placement = side;

    // Use relation data to determine optimal placement
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

    // Calculate position based on optimal placement
    let x = 0;
    let y = 0;

    switch (placement) {
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + sideOffset;
        break;
      case 'top':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - sideOffset;
        break;
      case 'right':
        x = triggerRect.right + sideOffset;
        y = triggerRect.top + triggerRect.height / 2;
        break;
      case 'left':
        x = triggerRect.left - sideOffset;
        y = triggerRect.top + triggerRect.height / 2;
        break;
    }

    return {
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 1000,
      transform: getTransformOrigin(placement),
    };
  };

  // Helper function to set transform origin for better positioning
  const getTransformOrigin = (placement: string): string => {
    switch (placement) {
      case 'bottom':
        return 'translate(-50%, 0)';
      case 'top':
        return 'translate(-50%, -100%)';
      case 'right':
        return 'translate(0, -50%)';
      case 'left':
        return 'translate(-100%, -50%)';
      default:
        return 'translate(-50%, 0)';
    }
  };

  const positionStyles = getPositionStyles();

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
      {process.env.NODE_ENV === 'development' && relation && (
        <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px' }}>
          Position: {relation.position.vertical}-{relation.position.horizontal}
          <br />
          More space: {relation.space.vertical}-{relation.space.horizontal}
        </div>
      )}
    </View>
  );
};
