import React, { createContext, useContext } from 'react';
import { View, Horizontal, Vertical } from 'app-studio';
import { AccordionContextType } from './Accordion.type';
import {
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionItemProps,
} from './Accordion.props';
import { AccordionShapes, AccordionVariants } from './Accordion.style';

// Create context for the Accordion
const AccordionContext = createContext<AccordionContextType>({
  expandedItems: [],
  toggleItem: () => {},
  isItemExpanded: () => false,
});

// Provider component for the Accordion context
export const AccordionProvider: React.FC<{
  children: React.ReactNode;
  value: AccordionContextType;
}> = ({ children, value }) => {
  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

// Hook to use the Accordion context
export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within an AccordionProvider'
    );
  }
  return context;
};

// Accordion Item component
export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  isDisabled = false,
  views,
}) => {
  const { isItemExpanded } = useAccordionContext();
  const isExpanded = isItemExpanded(id);

  return (
    <View
      borderWidth={1}
      borderStyle="solid"
      borderColor="color.gray.200"
      marginBottom={8}
      overflow="hidden"
      opacity={isDisabled ? 0.5 : 1}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      {...views?.item}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass the id and isExpanded props to AccordionHeader and AccordionContent
          return React.cloneElement(child, {
            ...child.props,
            id,
            isExpanded,
          });
        }
        return child;
      })}
    </View>
  );
};

// Accordion Header component
export const AccordionHeader: React.FC<
  AccordionHeaderProps & { id?: string; isExpanded?: boolean }
> = ({ children, id, isExpanded, views }) => {
  const { toggleItem } = useAccordionContext();

  const handleClick = () => {
    if (id) {
      toggleItem(id);
    }
  };

  return (
    <Horizontal
      padding={16}
      cursor="pointer"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="color.white"
      onClick={handleClick}
      {...views?.container}
    >
      {children}
      <View
        width={24}
        height={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 0.2s ease"
        transform={isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
        {...views?.icon}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
            fill="currentColor"
          />
        </svg>
      </View>
    </Horizontal>
  );
};

// Accordion Content component
export const AccordionContent: React.FC<
  AccordionContentProps & { isExpanded?: boolean }
> = ({ children, isExpanded, views }) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <View
      padding={16}
      backgroundColor="color.white"
      maxHeight={isExpanded ? '1000px' : '0'}
      transition="max-height 0.3s ease-in-out"
      overflow="hidden"
      {...views?.container}
    >
      {children}
    </View>
  );
};

// Main Accordion View component
export const AccordionView: React.FC<{
  children: React.ReactNode;
  shape?: 'sharp' | 'rounded';
  variant?: 'default' | 'outline' | 'filled';
  views?: any;
}> = ({ children, shape = 'rounded', variant = 'default', views }) => {
  return (
    <Vertical
      width="100%"
      {...AccordionShapes[shape]}
      {...AccordionVariants[variant]}
      {...views?.container}
    >
      {children}
    </Vertical>
  );
};
