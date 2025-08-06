import { ViewProps } from 'app-studio';
import { Size, Variant, TreeNode, TreeComponentType } from './Tree.type';

/**
 * Props for the Tree component
 */
export interface TreeProps extends ViewProps {
  /**
   * Child elements for compound component pattern (e.g., <Tree.Item />).
   * Used if `items` prop is not provided.
   */
  children?: React.ReactNode;

  /**
   * Data-driven approach: array of tree nodes.
   * If provided, `children` will be ignored for rendering tree items.
   */
  items?: TreeNode[];

  /**
   * Size of the tree items (affects padding and font size primarily).
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the tree items (affects background, borders).
   * @default 'default'
   */
  variant?: Variant;

  /**
   * IDs of initially expanded items (uncontrolled mode).
   */
  defaultExpandedItems?: string[];

  /**
   * IDs of expanded items (controlled mode).
   * If provided, component is controlled; `onExpandedItemsChange` must be used to update.
   */
  expandedItems?: string[];

  /**
   * Callback when expanded items change.
   * Receives an array of currently expanded item IDs.
   */
  onExpandedItemsChange?: (expandedItems: string[]) => void;

  /**
   * Callback when an item is selected (clicked).
   * Receives the `itemId` and the full `TreeNode` object if available (from data-driven mode).
   */
  onItemSelect?: (itemId: string, item?: TreeNode) => void;

  /**
   * ID of the currently selected item (controlled mode).
   */
  selectedItem?: string;

  /**
   * ID of the initially selected item (uncontrolled mode).
   */
  defaultSelectedItem?: string;

  /**
   * Whether to allow multiple selection.
   * Note: Multi-select state management (tracking multiple selected items) is not fully implemented in `useTreeState` provided.
   * This prop is a placeholder for future enhancement.
   * @default false
   */
  multiSelect?: boolean;

  /**
   * Whether to enable drag and drop functionality for tree items.
   * @default false
   */
  allowDragAndDrop?: boolean;

  /**
   * Custom icon to use for the drag handle.
   * If not provided, a default drag handle icon will be used.
   */
  dragHandleIcon?: React.ReactNode;

  /**
   * Callback when items are reordered via drag and drop.
   * Receives the updated array of tree nodes.
   */
  onItemsReorder?: (items: TreeNode[]) => void;

  /**
   * Callback when drag starts on an item.
   * Receives the item ID and the event.
   */
  onDragStart?: (itemId: string, event: React.DragEvent) => void;

  /**
   * Callback when drag ends.
   * Receives the item ID.
   */
  onDragEnd?: (itemId: string) => void;

  /**
   * Custom views for styling different parts of the component.
   * Allows overriding default styles for sub-components.
   */
  views?: {
    container?: ViewProps; // Styles for TreeView (root container)
    item?: ViewProps; // Styles for TreeItem (each item's container)
    itemLabel?: ViewProps; // Styles for TreeItemLabel (clickable label part)
    itemContent?: ViewProps; // Styles for TreeItemContent (children wrapper)
    icon?: ViewProps; // Styles for the item's main icon (folder/file)
    expandIcon?: ViewProps; // Styles for the expand/collapse chevron icon
    draggedItem?: ViewProps; // Styles for the item being dragged
    dragHandle?: ViewProps; // Styles for the drag handle icon
  };
}

/**
 * Type for the Tree component with sub-components.
 * Makes `Tree.Item`, `Tree.ItemLabel`, `Tree.ItemContent` available.
 */
export type TreeType = TreeComponentType<TreeProps>;
