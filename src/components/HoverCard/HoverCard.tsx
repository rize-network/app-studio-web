import React from 'react';
import { HoverCardProps, HoverCardType } from './HoverCard/HoverCard.props';
import { useHoverCardState } from './HoverCard/HoverCard.state';
import {
  HoverCardProvider,
  HoverCardTrigger,
  HoverCardContent,
} from './HoverCard/HoverCard.view';
import { View } from 'app-studio';

/**
 * HoverCard component displays floating content when hovering over a trigger element.
 * Supports configurable open and close delays for a smoother user experience.
 */
const HoverCardComponent: React.FC<HoverCardProps> = ({
  children,
  views,
  openDelay,
  closeDelay,
  ...props
}) => {
  const hoverCardState = useHoverCardState({ openDelay, closeDelay });

  return (
    <HoverCardProvider value={hoverCardState}>
      <View
        position="relative"
        display="inline-block"
        {...views?.container}
        {...props}
      >
        {children}
      </View>
    </HoverCardProvider>
  );
};

export const HoverCard = HoverCardComponent as HoverCardType;

HoverCard.Trigger = HoverCardTrigger;
HoverCard.Content = HoverCardContent;
