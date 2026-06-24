import React, { createContext, useContext } from 'react';
import { Modal, Dimensions } from 'react-native';
import { View, Text, ViewProps } from 'app-studio';
import {
  TooltipContextType,
  Position,
  Alignment,
  TooltipStyles,
} from './Tooltip.type';
import { TooltipTriggerProps, TooltipContentProps } from './Tooltip.props';
import { TooltipSizes, TooltipVariants } from './Tooltip.style';

const TooltipContext = createContext<TooltipContextType>({
  isOpen: false,
  openTooltip: () => {},
  closeTooltip: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
  contentId: '',
  triggerId: '',
});

export const useTooltipContext = () => useContext(TooltipContext);

export const TooltipProvider: React.FC<{
  value: TooltipContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

export const TooltipTrigger: React.FC<TooltipTriggerProps> = React.memo(
  ({ children, views, asChild = false, ...props }) => {
    const { openTooltip, closeTooltip, isOpen } = useTooltipContext();
    const handlePress = () => (isOpen ? closeTooltip() : openTooltip());
    const triggerProps: any = {
      onPress: handlePress,
      onClick: handlePress,
      ...views?.container,
      ...props,
    };
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, triggerProps);
    }
    return <View {...triggerProps}>{children}</View>;
  }
);

export const TooltipContent: React.FC<TooltipContentProps> = React.memo(
  ({ children, views, ...props }) => {
    const { isOpen } = useTooltipContext();
    if (!isOpen) return null;
    return (
      <View {...views?.container} {...props}>
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
    views?: TooltipStyles;
  } & Omit<ViewProps, 'position' | 'content' | 'size'>
> = ({
  content,
  children,
  size = 'md',
  variant = 'default',
  position = 'top',
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { isOpen, openTooltip, closeTooltip } = useTooltipContext();
  const triggerRef = React.useRef<any>(null);
  const [rect, setRect] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  // Measure the trigger in window coords so the bubble can be placed next to it
  // (RN has no DOM rects; `measureInWindow` is the native equivalent).
  const handlePress = () => {
    if (isOpen) {
      closeTooltip();
      return;
    }
    const node = triggerRef.current;
    if (node && typeof node.measureInWindow === 'function') {
      node.measureInWindow((x: number, y: number, w: number, h: number) => {
        setRect({ x, y, w, h });
        openTooltip();
      });
    } else {
      openTooltip();
    }
  };

  // Measured bubble size (from onLayout) so placement uses the real height,
  // not a guess — otherwise the bubble overlaps the trigger / neighbours.
  const [bubble, setBubble] = React.useState({ w: 200, h: 40 });

  const screen = Dimensions.get('window');
  const GAP = 8;
  const EDGE = 8;
  const clampX = (x: number) =>
    Math.max(EDGE, Math.min(x, screen.width - bubble.w - EDGE));
  const clampY = (y: number) =>
    Math.max(EDGE, Math.min(y, screen.height - bubble.h - EDGE));
  let top = screen.height / 2;
  let left = screen.width / 2 - bubble.w / 2;
  if (rect) {
    if (position === 'left' || position === 'right') {
      // Beside the trigger, vertically centred. Flip side if it doesn't fit.
      const rightLeft = rect.x + rect.w + GAP;
      const leftLeft = rect.x - bubble.w - GAP;
      const fitsRight = rightLeft + bubble.w <= screen.width - EDGE;
      const fitsLeft = leftLeft >= EDGE;
      if (position === 'right') {
        left = fitsRight || !fitsLeft ? rightLeft : leftLeft;
      } else {
        left = fitsLeft || !fitsRight ? leftLeft : rightLeft;
      }
      left = clampX(left);
      top = clampY(rect.y + rect.h / 2 - bubble.h / 2);
    } else {
      // Above/below the trigger, horizontally centred. Flip if it doesn't fit.
      left = clampX(rect.x + rect.w / 2 - bubble.w / 2);
      const aboveTop = rect.y - bubble.h - GAP;
      const belowTop = rect.y + rect.h + GAP;
      const fitsAbove = aboveTop >= EDGE;
      const fitsBelow = belowTop + bubble.h <= screen.height - EDGE;
      if (position === 'bottom') {
        top = fitsBelow || !fitsAbove ? belowTop : aboveTop;
      } else {
        top = fitsAbove || !fitsBelow ? aboveTop : belowTop;
      }
      top = clampY(top);
    }
  }

  const contentColor =
    (views?.content as any)?.color ??
    (TooltipVariants[variant as keyof typeof TooltipVariants] as any)?.color;
  const contentFontSize = (
    TooltipSizes[size as keyof typeof TooltipSizes] as any
  )?.fontSize;

  return (
    <View {...views?.container} {...(props as any)}>
      <View ref={triggerRef} onPress={handlePress} onClick={handlePress} alignSelf="flex-start">
        {children}
      </View>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={closeTooltip}>
        {/* Transparent full-screen layer: tap anywhere to dismiss. The bubble is
            absolutely positioned next to the measured trigger. */}
        <View flex={1} onPress={closeTooltip} onClick={closeTooltip}>
          <View
            position="absolute"
            top={top}
            left={left}
            maxWidth={280}
            borderRadius={8}
            onLayout={(e: any) => {
              const { width, height } = e.nativeEvent.layout;
              if (
                Math.abs(width - bubble.w) > 1 ||
                Math.abs(height - bubble.h) > 1
              ) {
                setBubble({ w: width, h: height });
              }
            }}
            {...TooltipSizes[size as keyof typeof TooltipSizes]}
            {...TooltipVariants[variant as keyof typeof TooltipVariants]}
            {...views?.content}
          >
            {typeof content === 'string' ? (
              <Text color={contentColor} fontSize={contentFontSize} {...views?.text}>
                {content}
              </Text>
            ) : (
              content
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
