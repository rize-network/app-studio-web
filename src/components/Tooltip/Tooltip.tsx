import React from 'react';
import { TooltipProps, TooltipType } from './Tooltip/Tooltip.props';
import { useTooltipState } from './Tooltip/Tooltip.state';
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipView,
} from './Tooltip/Tooltip.view';
// Defines the main Tooltip component, a customizable overlay for displaying contextual information. It manages tooltip state using `useTooltipState` and renders the `TooltipView` within a `TooltipProvider`, supporting a compound component pattern.
const TooltipComponent: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  align = 'center',
  size = 'md',
  variant = 'default',
  openDelay = 200,
  closeDelay = 200,
  showArrow = true,
  defaultOpen = false,
  isDisabled = false,
  views,
  ...props
}) => {
  const tooltipState = useTooltipState({
    defaultOpen,
    openDelay,
    closeDelay,
    isDisabled,
  });
  return (
    <TooltipProvider value={tooltipState}>
      <TooltipView
        content={content}
        position={position}
        align={align}
        size={size}
        variant={variant}
        showArrow={showArrow}
        views={views}
        {...props}
      >
        {children}
      </TooltipView>
    </TooltipProvider>
  );
};
export const Tooltip = TooltipComponent as TooltipType;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
