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
// Initializes the React context for the HoverCard component, providing default values for its state and functions. This context will be used to manage the HoverCard's open/close state, references, and unique IDs.
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
// Defines the HoverCardProvider component, which makes the HoverCard context available to all its child components. It receives children to render and a 'value' prop containing the context's current state and functions.
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
  const handleFocus = () => openCard();
  const handleBlur = () => closeCard();
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
  if (asChild && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, { ...triggerProps, ...child.props });
  }
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
  style: userStyle,
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
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: true,
    trackOnScroll: true,
    trackOnResize: true,
  });
  useEffect(() => {
    if (triggerRef?.current && positionRef?.current !== triggerRef.current) {
      if (positionRef) {
        (positionRef as any).current = triggerRef.current;
      }
    }
  }, [triggerRef, positionRef, isOpen]);
  const handleMouseEnter = () => cancelCloseTimer();
  const handleMouseLeave = () => closeCard();
  if (!isOpen) {
    return null;
  }
  const getPositionStyles = (): React.CSSProperties => {
    if (!relation || !triggerRef?.current) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
      };
    }
    const triggerRect = triggerRef.current.getBoundingClientRect();
    let placement = side;
    if (side === 'bottom' && relation.space.vertical === 'top') {
      placement = 'top';
    } else if (side === 'top' && relation.space.vertical === 'bottom') {
      placement = 'bottom';
    } else if (side === 'right' && relation.space.horizontal === 'left') {
      placement = 'left';
    } else if (side === 'left' && relation.space.horizontal === 'right') {
      placement = 'right';
    }
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
      role="tooltip"
      aria-labelledby={triggerId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      padding={padding}
      minWidth={minWidth}
      maxWidth={maxWidth}
      style={{
        ...positionStyles,
        ...userStyle,
      }}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};
