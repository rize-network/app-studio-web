import React from 'react';
import { ViewProps } from 'app-studio';
import {
  Position,
  Alignment,
  Size,
  Variant,
  TooltipStyles,
} from './Tooltip.type';
// Defines the properties available for the main Tooltip component, controlling its behavior and appearance.
export interface TooltipProps {
  // Specifies the actual content to be displayed inside the tooltip, which can be any React node.
  content: React.ReactNode;
  // Defines the element that triggers the tooltip's visibility, typically a button or icon.
  children: React.ReactNode;
  // Determines the preferred placement of the tooltip relative to its trigger element (e.g., 'top', 'bottom', 'left', 'right').
  position?: Position;
  // Specifies the alignment of the tooltip's content along its defined position (e.g., 'start', 'center', 'end').
  align?: Alignment;
  // Sets a predefined size for the tooltip, affecting its overall dimensions.
  size?: Size;
  // Defines the visual style or variant of the tooltip, allowing for different design themes.
  variant?: Variant;
  // Sets the delay in milliseconds before the tooltip appears when hovered over or focused.
  openDelay?: number;
  // Sets the delay in milliseconds before the tooltip disappears after the trigger is no longer hovered or focused.
  closeDelay?: number;
  // A boolean flag to determine whether an arrow pointing to the trigger should be displayed on the tooltip.
  showArrow?: boolean;
  defaultOpen?: boolean;
  // If true, the tooltip functionality will be entirely disabled, preventing it from opening.
  isDisabled?: boolean;
  // Provides an object to customize the styling of various internal parts of the tooltip component.
  views?: TooltipStyles;
  // Allows for passing any additional, non-explicitly defined properties to the underlying root DOM element of the tooltip.
  [key: string]: any;
}
// Defines the properties specific to the TooltipTrigger sub-component, controlling how the tooltip is activated.
export interface TooltipTriggerProps {
  // The content or element that acts as the trigger for displaying the tooltip.
  children: React.ReactNode;
  // Provides an object to customize the styling of the trigger's container element.
  views?: {
    container?: ViewProps;
  };
  // If true, the trigger will render its child directly without wrapping it in an additional DOM element.
  asChild?: boolean;
  // Allows for passing any additional, non-explicitly defined properties to the underlying root DOM element of the trigger.
  [key: string]: any;
}
// Defines the properties specific to the TooltipContent sub-component, controlling the display of the tooltip's message.
export interface TooltipContentProps {
  // The actual content to be displayed inside the tooltip's pop-up bubble.
  children: React.ReactNode;
  // Provides an object to customize the styling of the content's container and its optional arrow.
  views?: {
    container?: ViewProps;
    arrow?: ViewProps;
  };
  // Allows for passing any additional, non-explicitly defined properties to the underlying root DOM element of the content.
  [key: string]: any;
}
// Defines the overall structure of the Tooltip component, including its sub-components (Trigger, Content) as static properties.
export interface TooltipType extends React.FC<TooltipProps> {
  // Represents the sub-component responsible for handling the element that opens and closes the tooltip.
  Trigger: React.FC<TooltipTriggerProps>;
  // Represents the sub-component responsible for rendering the actual visual content of the tooltip.
  Content: React.FC<TooltipContentProps>;
}
