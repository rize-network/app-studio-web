import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { View, Horizontal, Vertical, Text, ViewProps } from 'app-studio';
import { ChevronIcon } from '../../Icon/Icon';
import { AccordionContextType } from './Accordion.type';
import {
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionItemProps,
} from './Accordion.props';
import { AccordionShapes, AccordionVariants } from './Accordion.style';
import { deepMerge, useDesignSystemComponentProps } from 'src/design-system';

const AccordionContext = createContext<AccordionContextType>({
  expandedItems: [],
  toggleItem: () => {},
  isItemExpanded: () => false,
  type: 'single',
  collapsible: false,
  baseId: '',
});

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

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within an AccordionProvider'
    );
  }
  return context;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  isDisabled = false,
  views,
  ...props
}) => {
  const { isItemExpanded, baseId } = useAccordionContext();
  const designSystemAccordion = useDesignSystemComponentProps('accordion');
  const mergedViews = deepMerge(
    {
      item: designSystemAccordion.views?.container,
    },
    views
  );
  const isExpanded = isItemExpanded(value);
  const triggerId = `${baseId}-trigger-${value}`;
  const contentId = `${baseId}-content-${value}`;
  return (
    <View
      borderWidth={1}
      borderStyle="solid"
      borderColor="color-gray-200"
      overflow="hidden"
      opacity={isDisabled ? 0.5 : 1}
      {...mergedViews?.item}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<Record<string, unknown>>(child)) {
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
  const designSystemAccordion = useDesignSystemComponentProps('accordion');
  const mergedViews = deepMerge(
    {
      container: designSystemAccordion.views?.trigger,
    },
    views
  );
  const handlePress = () => {
    if (value && !isDisabled) {
      toggleItem(value);
    }
  };
  const triggerProps: any = {
    onPress: handlePress,
    onClick: handlePress,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    ...mergedViews?.container,
    ...props,
  };
  if (asChild && isValidElement<Record<string, unknown>>(children)) {
    const child = Children.only(children);
    return cloneElement(child, { ...triggerProps, ...child.props });
  }
  return (
    <Horizontal {...triggerProps}>
      {children}
      <View
        width={24}
        height={24}
        alignItems="center"
        justifyContent="center"
        {...mergedViews?.icon}
      >
        <ChevronIcon
          widthHeight={16}
          orientation={isExpanded ? 'up' : 'down'}
        />
      </View>
    </Horizontal>
  );
};

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
  const designSystemAccordion = useDesignSystemComponentProps('accordion');
  const mergedViews = deepMerge(
    {
      container: designSystemAccordion.views?.content,
    },
    views
  );
  if (!isExpanded) {
    return null;
  }
  return (
    <View overflow="hidden" {...mergedViews?.container} {...props}>
      <View padding={16}>{children}</View>
    </View>
  );
};

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
      {...AccordionShapes[shape]}
      {...AccordionVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Vertical>
  );
};
