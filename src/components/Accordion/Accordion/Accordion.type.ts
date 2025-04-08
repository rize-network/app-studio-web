import { ViewProps } from 'app-studio';

export type Shape = 'sharp' | 'rounded';
export type Variant = 'default' | 'outline' | 'filled';

export interface AccordionContextType {
  expandedItems: string[];
  toggleItem: (itemId: string) => void;
  isItemExpanded: (itemId: string) => boolean;
}

export interface AccordionStyles {
  container?: ViewProps;
  item?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  icon?: ViewProps;
}
