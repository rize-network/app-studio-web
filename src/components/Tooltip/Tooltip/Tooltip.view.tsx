import React, { createContext, useContext } from 'react';
import { View, Text } from 'app-studio';
import { TooltipContextType, Position, Alignment } from './Tooltip.type';
import { TooltipTriggerProps, TooltipContentProps } from './Tooltip.props';
import {
  TooltipSizes,
  TooltipVariants,
  getTooltipPositionStyles,
  getArrowStyles,
} from './Tooltip.style';

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
export const TooltipView: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
  position?: Position;
  align?: Alignment;
  size?: string;
  variant?: string;
  showArrow?: boolean;
  views?: any;
}> = ({
  content,
  children,
  position = 'top',
  align = 'center',
  size = 'md',
  variant = 'default',
  showArrow = true,
  views,
  ...props
}) => {
  const {
    isOpen,
    openTooltip,
    closeTooltip,
    triggerRef,
    contentRef,
    contentId,
    triggerId,
  } = useTooltipContext();

  // Get position styles
  const positionStyles = getTooltipPositionStyles(position, align);

  // Get arrow styles
  const arrowStyles = showArrow ? getArrowStyles(position) : {};

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
          {...TooltipSizes[size as keyof typeof TooltipSizes]}
          {...TooltipVariants[variant as keyof typeof TooltipVariants]}
          {...positionStyles}
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
