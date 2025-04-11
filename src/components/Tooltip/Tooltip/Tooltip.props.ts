import React from 'react';
import { ViewProps } from 'app-studio';
import {
  Position,
  Alignment,
  Size,
  Variant,
  TooltipStyles,
} from './Tooltip.type';

export interface TooltipProps {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;

  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * The preferred position of the tooltip
   * @default 'top'
   */
  position?: Position;

  /**
   * The alignment of the tooltip relative to the trigger
   * @default 'center'
   */
  align?: Alignment;

  /**
   * The size of the tooltip
   * @default 'md'
   */
  size?: Size;

  /**
   * The visual style variant of the tooltip
   * @default 'default'
   */
  variant?: Variant;

  /**
   * Delay in milliseconds before the tooltip opens on hover
   * @default 200
   */
  openDelay?: number;

  /**
   * Delay in milliseconds before the tooltip closes after hover stops
   * @default 200
   */
  closeDelay?: number;

  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean;

  /**
   * Whether the tooltip is initially open
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Whether the tooltip is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Custom styles for different parts of the tooltip
   */
  views?: TooltipStyles;

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface TooltipTriggerProps {
  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * Custom styles for the trigger container
   */
  views?: {
    container?: ViewProps;
  };

  /**
   * Whether to preserve the child element's props
   * @default false
   */
  asChild?: boolean;

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface TooltipContentProps {
  /**
   * The content to display in the tooltip
   */
  children: React.ReactNode;

  /**
   * Custom styles for the content container
   */
  views?: {
    container?: ViewProps;
    arrow?: ViewProps;
  };

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface TooltipType extends React.FC<TooltipProps> {
  Trigger: React.FC<TooltipTriggerProps>;
  Content: React.FC<TooltipContentProps>;
}
