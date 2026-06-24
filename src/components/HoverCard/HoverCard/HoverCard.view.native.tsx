import React, { createContext, useContext } from 'react';
import { Modal, Dimensions } from 'react-native';
import { View } from 'app-studio';
import { HoverCardContextType } from './HoverCard.type';
import {
  HoverCardContentProps,
  HoverCardTriggerProps,
} from './HoverCard.props';

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
  const { openCard, closeCard, isOpen, triggerRef } = useHoverCardContext();
  const handlePress = () => (isOpen ? closeCard() : openCard());
  const triggerProps: any = {
    ref: triggerRef,
    onPress: handlePress,
    onClick: handlePress,
    alignSelf: 'flex-start',
    ...views?.container,
    ...props,
  };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, triggerProps);
  }
  return <View {...triggerProps}>{children}</View>;
};

export const HoverCardContent: React.FC<HoverCardContentProps> = ({
  children,
  views,
  backgroundColor = 'white',
  borderRadius = '4px',
  padding = '12px',
  minWidth = '50px',
  maxWidth = '300px',
  ...props
}) => {
  const { isOpen, closeCard, triggerRef } = useHoverCardContext();
  const [rect, setRect] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [card, setCard] = React.useState({ w: 200, h: 80 });

  // Measure the trigger when the card opens so it can be placed next to it
  // rather than centred in the middle of the screen.
  React.useEffect(() => {
    if (!isOpen) return;
    const node: any = triggerRef?.current;
    if (node && typeof node.measureInWindow === 'function') {
      node.measureInWindow((x: number, y: number, w: number, h: number) =>
        setRect({ x, y, w, h })
      );
    }
  }, [isOpen, triggerRef]);

  const screen = Dimensions.get('window');
  const GAP = 8;
  const EDGE = 8;
  let top = screen.height / 2 - card.h / 2;
  let left = screen.width / 2 - card.w / 2;
  if (rect) {
    left = Math.max(
      EDGE,
      Math.min(rect.x + rect.w / 2 - card.w / 2, screen.width - card.w - EDGE)
    );
    const belowTop = rect.y + rect.h + GAP;
    const aboveTop = rect.y - card.h - GAP;
    top =
      belowTop + card.h <= screen.height - EDGE || aboveTop < EDGE
        ? belowTop
        : aboveTop;
    top = Math.max(EDGE, Math.min(top, screen.height - card.h - EDGE));
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={closeCard}
    >
      <View flex={1} onPress={closeCard} onClick={closeCard}>
        <View
          position="absolute"
          top={top}
          left={left}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          padding={padding}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onLayout={(e: any) => {
            const { width, height } = e.nativeEvent.layout;
            if (Math.abs(width - card.w) > 1 || Math.abs(height - card.h) > 1) {
              setCard({ w: width, h: height });
            }
          }}
          {...views?.container}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
