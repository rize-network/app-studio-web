import React, { createContext, useContext } from 'react';
import { Modal } from 'react-native';
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
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { isOpen, closeTooltip } = useTooltipContext();
  return (
    <View {...views?.container} {...(props as any)}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeTooltip}
      >
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="color-blackAlpha-400"
          onPress={closeTooltip}
          onClick={closeTooltip}
        >
          <View
            borderRadius={4}
            {...TooltipSizes[size as keyof typeof TooltipSizes]}
            {...TooltipVariants[variant as keyof typeof TooltipVariants]}
            {...views?.content}
          >
            {typeof content === 'string' ? (
              <Text {...views?.text}>{content}</Text>
            ) : (
              content
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
