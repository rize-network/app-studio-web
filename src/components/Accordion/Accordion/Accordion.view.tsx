import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { View, Horizontal, Vertical, ViewProps } from 'app-studio';
import { AccordionContextType } from './Accordion.type';
import {
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionItemProps,
} from './Accordion.props';
import { AccordionShapes, AccordionVariants } from './Accordion.style';

// Create context for the Accordion
const AccordionContext = createContext<AccordionContextType>({
  expandedItems: [],
  toggleItem: () => {},
  isItemExpanded: () => false,
  type: 'single',
  collapsible: false,
  baseId: '',
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
  value,
  children,
  isDisabled = false,
  views,
  ...props
}) => {
  const {
    isItemExpanded,
    baseId,
    //toggleItem
  } = useAccordionContext();
  const isExpanded = isItemExpanded(value);

  // Generate unique IDs for ARIA attributes
  const triggerId = `${baseId}-trigger-${value}`;
  const contentId = `${baseId}-content-${value}`;

  return (
    <View
      borderWidth={1}
      borderStyle="solid"
      borderColor="color.gray.200"
      marginBottom={8}
      overflow="hidden"
      opacity={isDisabled ? 0.5 : 1}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      data-state={isExpanded ? 'open' : 'closed'}
      data-disabled={isDisabled ? '' : undefined}
      {...views?.item}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass the necessary props to AccordionTrigger and AccordionContent
          return React.cloneElement(child, {
            ...child.props,
            value,
            isExpanded,
            isDisabled,
            triggerId,
            contentId,
          });
        }
        return child;
      })}
    </View>
  );
};

// Accordion Trigger component
export const AccordionTrigger: React.FC<
  AccordionTriggerProps & {
    value?: string;
    isExpanded?: boolean;
    isDisabled?: boolean;
    triggerId?: string;
    contentId?: string;
  }
> = ({
  children,
  value,
  isExpanded,
  isDisabled,
  triggerId,
  contentId,
  views,
  asChild = false,
  ...props
}) => {
  const { toggleItem } = useAccordionContext();

  const handleClick = () => {
    if (value && !isDisabled) {
      toggleItem(value);
    }
  };

  const triggerProps = {
    id: triggerId,
    'aria-expanded': isExpanded,
    'aria-controls': contentId,
    'aria-disabled': isDisabled,
    'data-state': isExpanded ? 'open' : 'closed',
    'data-disabled': isDisabled ? '' : undefined,
    onClick: handleClick,
    padding: 16,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'color.white',
    width: '100%',
    ...views?.container,
    ...props,
  };

  // If asChild is true, clone the child element and merge props
  if (asChild && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, { ...triggerProps, ...child.props });
  }

  return (
    <Horizontal {...triggerProps}>
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
  AccordionContentProps & {
    isExpanded?: boolean;
    isDisabled?: boolean;
    triggerId?: string;
    contentId?: string;
  }
> = ({
  children,
  isExpanded,
  isDisabled,
  triggerId,
  contentId,
  views,
  ...props
}) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <View
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      padding={16}
      backgroundColor="color.white"
      maxHeight={isExpanded ? '1000px' : '0'}
      transition="max-height 0.3s ease-in-out, opacity 0.3s ease-in-out"
      opacity={1}
      overflow="hidden"
      data-state={isExpanded ? 'open' : 'closed'}
      data-disabled={isDisabled ? '' : undefined}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

// Main Accordion View component
export const AccordionView: React.FC<
  {
    children: React.ReactNode;
    shape?: 'square' | 'rounded';
    variant?: 'default' | 'outline' | 'filled';
    views?: any;
    baseId: string;
    type: 'single' | 'multiple';
    collapsible: boolean;
  } & ViewProps
> = ({
  children,
  shape = 'rounded',
  variant = 'default',
  views,
  baseId,
  type,
  collapsible,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <Vertical
      width="100%"
      data-orientation="vertical"
      {...AccordionShapes[shape]}
      {...AccordionVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Vertical>
  );
};
