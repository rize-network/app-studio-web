import { ViewProps } from 'app-studio';

/**
 * Size options for the Tree component
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Variant options for the Tree component
 */
export type Variant = 'default' | 'outline' | 'filled';

/**
 * Tree node data structure
 */
export interface TreeNode {
  /**
   * Unique identifier for the node
   */
  id: string;

  /**
   * Label text for the node
   */
  label: string;

  /**
   * Optional icon to display next to the label
   */
  icon?: React.ReactNode;

  /**
   * Child nodes
   */
  children?: TreeNode[];

  /**
   * Whether the node is disabled
   */
  disabled?: boolean;

  /**
   * Custom data to associate with the node
   */
  data?: any;
}

/**
 * Tree component type with sub-components
 */
export interface TreeComponentType extends React.FC<any> {
  Item: React.FC<TreeItemProps>;
  ItemLabel: React.FC<TreeItemLabelProps>;
  ItemContent: React.FC<TreeItemContentProps>;
}

/**
 * Props for the TreeItem component
 */
export interface TreeItemProps extends ViewProps {
  /**
   * Unique identifier for the item
   */
  value: string;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;

  /**
   * Children elements
   */
  children?: React.ReactNode;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
    content?: ViewProps;
  };
}

/**
 * Props for the TreeItemLabel component
 */
export interface TreeItemLabelProps extends ViewProps {
  /**
   * Children elements
   */
  children?: React.ReactNode;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    expandIcon?: ViewProps;
    icon?: ViewProps;
  };
}

/**
 * Props for the TreeItemContent component
 */
export interface TreeItemContentProps extends ViewProps {
  /**
   * Children elements
   */
  children?: React.ReactNode;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
  };
}

/**
 * Context type for the Tree component
 */
export interface TreeContextType {
  /**
   * List of expanded item IDs
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
   * Base ID for accessibility
   */
  baseId: string;
}
