import React from 'react';
import { ViewProps } from 'app-studio';

export interface HoverCardProps {
  /**
   * The content of the HoverCard
   */
  children?: React.ReactNode;
  /**
   * Custom styles for different parts of the HoverCard
   */
  views?: {
    container?: ViewProps;
    content?: ViewProps;
  };
  /**
   * Delay in milliseconds before the card opens on hover
   * @default 200
   */
  openDelay?: number;
  /**
   * Delay in milliseconds before the card closes after hover stops
   * @default 300
   */
  closeDelay?: number;
}

export interface HoverCardTriggerProps {
  /**
   * The element that triggers the hover card
   */
  children: React.ReactNode;
  /**
   * Custom styles for the trigger element
   */
  views?: {
    container?: ViewProps;
  };
  /**
   * When true, the trigger will be rendered as a child element instead of a wrapper
   * Child must accept forwarded ref and spread props
   * @default false
   */
  asChild?: boolean;
  /**
   * Additional props to be spread to the trigger element
   */
  [key: string]: any;
}

export interface HoverCardContentProps {
  /**
   * The content to be displayed in the hover card
   */
  children: React.ReactNode;
  /**
   * Custom styles for the content container
   */
  views?: {
    container?: ViewProps;
  };
  /**
   * The side of the trigger to render the content
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * The alignment of the content relative to the trigger
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Distance in pixels between the trigger and the content
   * @default 8
   */
  sideOffset?: number;
  /**
   * Additional props to be spread to the content element
   */
  [key: string]: any;
}

export interface HoverCardType extends React.FC<HoverCardProps> {
  /**
   * The trigger element that will show the hover card on hover
   */
  Trigger: React.FC<HoverCardTriggerProps>;
  /**
   * The content that will be displayed when hovering over the trigger
   */
  Content: React.FC<HoverCardContentProps>;
}
