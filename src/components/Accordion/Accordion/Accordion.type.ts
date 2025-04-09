import { ViewProps } from 'app-studio';
import { RefObject } from 'react';

export type Shape = 'sharp' | 'rounded';
export type Variant = 'default' | 'outline' | 'filled';
export type AccordionType = 'single' | 'multiple';

export interface AccordionContextType {
  /**
   * The currently expanded item IDs
   */
  expandedItems: string[];
  /**
   * Function to toggle an item's expanded state
   */
  toggleItem: (itemId: string) => void;
  /**
   * Function to check if an item is expanded
   */
  isItemExpanded: (itemId: string) => boolean;
  /**
   * Whether the accordion allows multiple items to be expanded
   */
  type: AccordionType;
  /**
   * Whether the accordion allows all items to be collapsed in single mode
   */
  collapsible: boolean;
  /**
   * Base ID for generating ARIA attributes
   */
  baseId: string;
}

export interface AccordionStyles {
  container?: ViewProps;
  item?: ViewProps;
  header?: ViewProps;
  trigger?: ViewProps;
  content?: ViewProps;
  icon?: ViewProps;
}
