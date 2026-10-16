import { ViewProps } from 'app-studio';
// Defines the visual shape options for the Accordion items.
export type Shape = 'square' | 'rounded';
// Defines the visual style or variant options for the Accordion component.
export type Variant = 'default' | 'outline' | 'filled';
// Specifies the interaction behavior of the Accordion, allowing either a single item or multiple items to be open simultaneously.
export type AccordionType = 'single' | 'multiple';
// Defines the shape of the Accordion context, providing shared state and functions for its children.
export interface AccordionContextType {
  // An array of item IDs that are currently open or expanded within the Accordion.
  expandedItems: string[];
  // A function used to open or close an Accordion item based on its unique ID.
  toggleItem: (itemId: string) => void;
  // A function that checks if a specific Accordion item, identified by its ID, is currently expanded.
  isItemExpanded: (itemId: string) => boolean;
  // The interaction type of the Accordion, determining if multiple items can be open simultaneously.
  type: AccordionType;
  // Indicates whether Accordion items can be collapsed (closed) after being opened.
  collapsible: boolean;
  // A unique base ID for the Accordion, used to generate unique IDs for its individual items.
  baseId: string;
}
// Defines the styling properties for various parts of the Accordion component, allowing for custom visual presentation.
export interface AccordionStyles {
  // Styling properties applicable to the main container of the Accordion component.
  container?: ViewProps;
  // Styling properties for individual Accordion items or panels.
  item?: ViewProps;
  // Styling properties for the header section of an Accordion item.
  header?: ViewProps;
  // Styling properties for the interactive element (trigger) that expands or collapses an Accordion item.
  trigger?: ViewProps;
  // Styling properties for the collapsible content area of an Accordion item.
  content?: ViewProps;
  // Styling properties for any icon displayed within the Accordion item's header or trigger.
  icon?: ViewProps;
}
