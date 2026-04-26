import { ViewProps, TextProps } from 'app-studio';
// Defines the possible positions where the tooltip can be displayed relative to its trigger.
export type Position = 'top' | 'right' | 'bottom' | 'left';
// Specifies the alignment of the tooltip content along its designated position.
export type Alignment = 'start' | 'center' | 'end';
// Defines the predefined sizes for the tooltip.
export type Size = 'sm' | 'md' | 'lg';
// Specifies the visual variant or theme of the tooltip (e.g., default, light, dark background).
export type Variant = 'default' | 'light' | 'dark';
// Defines the shape of the context object provided by the TooltipProvider, managing tooltip state and functions.
export interface TooltipContextType {
  // Indicates whether the tooltip is currently visible or hidden.
  isOpen: boolean;
  // A function to programmatically open the tooltip.
  openTooltip: () => void;
  // A function to programmatically close the tooltip.
  closeTooltip: () => void;
  // A ref object pointing to the DOM element that triggers the tooltip.
  triggerRef: React.RefObject<HTMLElement>;
  // A ref object pointing to the DOM element containing the tooltip's content.
  contentRef: React.RefObject<HTMLElement>;
  // A unique identifier for the tooltip's content element, used for accessibility.
  contentId: string;
  // A unique identifier for the tooltip's trigger element, used for accessibility.
  triggerId: string;
}
// Defines the interface for custom styling properties that can be applied to different parts of the tooltip.
export interface TooltipStyles {
  // Optional styling properties for the main container element of the tooltip.
  container?: ViewProps;
  // Optional styling properties for the wrapper around the tooltip's text content.
  content?: ViewProps;
  // Optional styling properties for the visual arrow component of the tooltip.
  arrow?: ViewProps;
  // Optional styling properties for the text element within the tooltip.
  text?: TextProps;
}
