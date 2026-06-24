import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, Easing } from 'react-native';
import { View, Horizontal, Vertical, ViewProps } from 'app-studio';
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
  const iconProgress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const mergedViews = deepMerge(
    {
      container: designSystemAccordion.views?.trigger,
    },
    views
  );

  useEffect(() => {
    Animated.timing(iconProgress, {
      toValue: isExpanded ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [iconProgress, isExpanded]);

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
      <Animated.View
        style={{
          transform: [
            {
              rotate: iconProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      >
        <View
          width={24}
          height={24}
          alignItems="center"
          justifyContent="center"
          {...mergedViews?.icon}
        >
          <ChevronIcon widthHeight={16} orientation="down" />
        </View>
      </Animated.View>
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

  const transitionMs = 260;
  const contentProgress = useRef(
    new Animated.Value(isExpanded ? 1 : 0)
  ).current;
  const [shouldRender, setShouldRender] = useState(Boolean(isExpanded));
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (isExpanded) {
      setShouldRender(true);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!shouldRender) return;

    const isOpeningWithoutMeasurement = isExpanded && contentHeight === 0;
    if (isOpeningWithoutMeasurement) return;

    const animation = Animated.timing(contentProgress, {
      toValue: isExpanded ? 1 : 0,
      duration: transitionMs,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished && !isExpanded) {
        setShouldRender(false);
      }
    });

    return () => {
      animation.stop();
    };
  }, [contentHeight, contentProgress, isExpanded, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={{
        height: contentProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, contentHeight],
        }),
        opacity: contentProgress,
        overflow: 'hidden',
      }}
    >
      <View overflow="hidden" {...mergedViews?.container} {...props}>
        <View
          padding={16}
          onLayout={(event: any) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          {children}
        </View>
      </View>
    </Animated.View>
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
