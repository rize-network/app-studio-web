import { ViewProps } from 'app-studio';
import { Size, Variant, TreeNode, TreeComponentType } from './Tree.type';

/**
 * Props for the Tree component
 */
export interface TreeProps extends ViewProps {
  /**
   * Child elements for compound component pattern
   */
  children?: React.ReactNode;

  /**
   * Data-driven approach: array of tree nodes
   */
  items?: TreeNode[];

  /**
   * Size of the tree items
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the tree
   * @default 'default'
   */
  variant?: Variant;

  /**
   * IDs of initially expanded items (uncontrolled mode)
   */
  defaultExpandedItems?: string[];

  /**
   * IDs of expanded items (controlled mode)
   */
  expandedItems?: string[];

  /**
   * Callback when expanded items change
   */
  onExpandedItemsChange?: (expandedItems: string[]) => void;

  /**
   * Callback when an item is selected
   */
  onItemSelect?: (itemId: string, item?: TreeNode) => void;

  /**
   * ID of the currently selected item
   */
  selectedItem?: string;

  /**
   * ID of the initially selected item
   */
  defaultSelectedItem?: string;

  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiSelect?: boolean;

  /**
   * Custom views for styling different parts of the component
   */
  views?: {
    container?: ViewProps;
    item?: ViewProps;
    itemLabel?: ViewProps;
    itemContent?: ViewProps;
    icon?: ViewProps;
    expandIcon?: ViewProps;
  };
}

/**
 * Type for the Tree component with sub-components
 */
export type TreeType = TreeComponentType;
