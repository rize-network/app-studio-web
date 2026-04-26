import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { View, Text, ViewProps, useElementPosition } from 'app-studio';
import { TooltipContextType, Position, Alignment } from './Tooltip.type';
import { TooltipTriggerProps, TooltipContentProps } from './Tooltip.props';
import { TooltipSizes, TooltipVariants, getArrowStyles } from './Tooltip.style';
// Initializes the React Context for the Tooltip, providing a way to share the tooltip's state and functions (open/close, refs, IDs) across its child components.
const TooltipContext = createContext<TooltipContextType>({
  isOpen: false,
  openTooltip: () => {},
  closeTooltip: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
  contentId: '',
  triggerId: '',
});
// A custom hook to easily access the Tooltip context, allowing child components to consume the shared tooltip state and actions.
export const useTooltipContext = () => useContext(TooltipContext);
// The provider component for the TooltipContext, responsible for making the tooltip's state and functions available to all nested components.
export const TooltipProvider: React.FC<{
  value: TooltipContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};
// The component that triggers the tooltip's visibility. It wraps the element that, when interacted with, will show or hide the tooltip content.
export const TooltipTrigger: React.FC<TooltipTriggerProps> = React.memo(
  ({ children, views, asChild = false, ...props }) => {
    const { openTooltip, closeTooltip, triggerRef, contentId, triggerId } =
      useTooltipContext();
    // Memoized callback function to open the tooltip when the trigger element's mouseEnter event occurs.
    const handleMouseEnter = useCallback(() => openTooltip(), [openTooltip]);
    // Memoized callback function to close the tooltip when the trigger element's mouseLeave event occurs.
    const handleMouseLeave = useCallback(() => closeTooltip(), [closeTooltip]);
    // Memoized callback function to open the tooltip when the trigger element receives focus.
    const handleFocus = useCallback(() => openTooltip(), [openTooltip]);
    // Memoized callback function to close the tooltip when the trigger element loses focus.
    const handleBlur = useCallback(() => closeTooltip(), [closeTooltip]);
    // Collects all necessary properties and event handlers for the tooltip trigger element, including accessibility attributes and custom views.
    const triggerProps = {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      id: triggerId,
      'aria-describedby': contentId,
      ...views?.container,
      ...props,
    };
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, triggerProps);
    }
    return (
      <View display="inline-block" {...triggerProps}>
        {children}
      </View>
    );
  }
);
export const TooltipContent: React.FC<TooltipContentProps> = React.memo(
  ({ children, views, ...props }) => {
    const { isOpen, contentRef, contentId, triggerId } = useTooltipContext();
    if (!isOpen) {
      return null;
    }
    return (
      <View
        ref={contentRef}
        id={contentId}
        role="tooltip"
        aria-labelledby={triggerId}
        {...views?.container}
        {...props}
      >
        {children}
      </View>
    );
  }
);
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
  useEffect(() => {
    if (triggerRef?.current && positionRef) {
      (positionRef as any).current = triggerRef.current;
    }
  }, [triggerRef, positionRef, isOpen]);
  useEffect(() => {
    if (isOpen && contentRef?.current && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      let placement = position;
      if (relation) {
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
      let x = 0;
      let y = 0;
      switch (placement) {
        case 'top':
          x =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
              ? triggerRect.right - 120
              : triggerRect.left + triggerRect.width / 2 - 60;
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
              ? triggerRect.bottom - 32
              : triggerRect.top + triggerRect.height / 2 - 16;
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
  const arrowStyles = useMemo(
    () =>
      showArrow ? getArrowStyles(optimalPosition.placement as Position) : {},
    [showArrow, optimalPosition.placement]
  );
  const positionStyles = useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      left: optimalPosition.x,
      top: optimalPosition.y,
      zIndex: 1000,
    };
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
  }, [optimalPosition.x, optimalPosition.y, optimalPosition.placement]);
  return (
    <View
      position="relative"
      display="inline-block"
      {...views?.container}
      {...props}
    >
      {}
      <TooltipTrigger>{children}</TooltipTrigger>
      {}
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
          {}
          {showArrow && <View {...arrowStyles} {...views?.arrow} />}
        </View>
      )}
    </View>
  );
};
