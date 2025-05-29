import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { View } from 'app-studio';
import { HoverCardContextType } from './HoverCard.type';
import {
  HoverCardContentProps,
  HoverCardTriggerProps,
} from './HoverCard.props';
import { getContentPositionStyles } from './HoverCard.style';
import { useRect } from '../../../hooks/useRect';

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

  // Use hook to measure trigger for positioning
  const triggerRect = useRect(triggerRef);

  // Calculate position based on trigger dimensions and side prop
  const positionStyles = getContentPositionStyles(
    triggerRect,
    side,
    align,
    sideOffset
  );

  const handleMouseEnter = () => cancelCloseTimer(); // Keep card open if mouse enters content
  const handleMouseLeave = () => closeCard();

  if (!isOpen) {
    return null; // Don't render content if not open
  }

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
      zIndex={1000}
      // Combine calculated position styles with user styles
      style={{
        ...positionStyles,
        ...userStyle, // Allow user override
      }}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};
