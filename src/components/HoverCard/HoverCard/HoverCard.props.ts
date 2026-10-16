import React from 'react';
import { ViewProps } from 'app-studio';
// Defines the props interface for the main HoverCard component, detailing its configurable properties.
export interface HoverCardProps {
  // Specifies the children (React elements) that will be rendered inside the HoverCard component.
  children?: React.ReactNode;
  // Allows for custom styling or view properties to be applied to different sub-components of the HoverCard.
  views?: {
    // Defines view-specific properties for the main container of the HoverCard.
    container?: ViewProps;
    // Defines view-specific properties for the content wrapper within the HoverCard.
    content?: ViewProps;
  };
  // Sets the delay in milliseconds before the HoverCard opens after the trigger is hovered.
  openDelay?: number;
  // Sets the delay in milliseconds before the HoverCard closes after the trigger is unhovered.
  closeDelay?: number;
}
// Defines the props interface for the HoverCard.Trigger sub-component, which activates the HoverCard.
export interface HoverCardTriggerProps {
  // Specifies the children (React elements) that serve as the trigger for the HoverCard's visibility.
  children: React.ReactNode;
  // Allows for custom styling or view properties to be applied to different parts of the trigger.
  views?: {
    // Defines view-specific properties for the trigger's container element.
    container?: ViewProps;
  };
  // When true, it renders the 'children' as a direct child of the component without wrapping it in an additional DOM element.
  asChild?: boolean;
  // Allows any additional, arbitrary props to be passed through to the component's underlying DOM element.
  [key: string]: any;
}
// Defines the props interface for the HoverCard.Content sub-component, which displays the actual content.
export interface HoverCardContentProps {
  // Specifies the children (React elements) that will be displayed within the HoverCard when it is open.
  children: React.ReactNode;
  // Allows for custom styling or view properties to be applied to different parts of the content.
  views?: {
    // Defines view-specific properties for the content's container element.
    container?: ViewProps;
  };
  // Determines the preferred side ('top', 'right', 'bottom', or 'left') of the trigger to render the content.
  side?: 'top' | 'right' | 'bottom' | 'left';
  // Specifies the alignment ('start', 'center', or 'end') of the content relative to the trigger along its chosen side.
  align?: 'start' | 'center' | 'end';
  // Sets the distance in pixels between the content and the trigger.
  sideOffset?: number;
  // Allows any additional, arbitrary props to be passed through to the component's underlying DOM element.
  [key: string]: any;
}
// Defines the structure of the main HoverCard component, including its sub-components (Trigger and Content).
export interface HoverCardType extends React.FC<HoverCardProps> {
  // Represents the sub-component responsible for the HoverCard's trigger element.
  Trigger: React.FC<HoverCardTriggerProps>;
  // Represents the sub-component responsible for displaying the HoverCard's content.
  Content: React.FC<HoverCardContentProps>;
}
