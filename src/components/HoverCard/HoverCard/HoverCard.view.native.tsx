import React, { createContext, useContext } from 'react';
import { Modal } from 'react-native';
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
  const { openCard, closeCard, isOpen } = useHoverCardContext();
  const handlePress = () => (isOpen ? closeCard() : openCard());
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
  const { isOpen, closeCard } = useHoverCardContext();
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={closeCard}
    >
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="color-blackAlpha-400"
        onPress={closeCard}
        onClick={closeCard}
      >
        <View
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          padding={padding}
          minWidth={minWidth}
          maxWidth={maxWidth}
          {...views?.container}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
