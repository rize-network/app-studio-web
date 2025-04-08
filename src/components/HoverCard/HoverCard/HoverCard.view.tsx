import React, { createContext, useContext } from 'react';
import { View } from 'app-studio';
import { HoverCardContextType } from './HoverCard.type';
import {
  HoverCardContentProps,
  HoverCardTriggerProps,
} from './HoverCard.props';
import { ContentPositions } from './HoverCard.style';

// Create context for the HoverCard
const HoverCardContext = createContext<HoverCardContextType>({
  isOpen: false,
  setIsOpen: () => {},
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
  ...props
}) => {
  const { setIsOpen } = useHoverCardContext();

  return (
    <View
      position="relative"
      display="inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

export const HoverCardContent: React.FC<HoverCardContentProps> = ({
  children,
  views,
  side = 'bottom',
  align = 'center',
  ...props
}) => {
  const { isOpen } = useHoverCardContext();

  if (!isOpen) {
    return null;
  }

  return (
    <View
      backgroundColor="white"
      borderRadius="4px"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.15)"
      padding="12px"
      minWidth="200px"
      maxWidth="300px"
      zIndex={1000}
      {...ContentPositions[side](align)}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};
