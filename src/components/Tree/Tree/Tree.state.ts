import { useState, useCallback, useMemo } from 'react';
import { TreeNode } from './Tree.type';

interface UseTreeStateProps {
  /**
   * Default expanded items (uncontrolled mode)
   */
  defaultExpandedItems?: string[];

  /**
   * Controlled expanded items
   */
  expandedItems?: string[];

  /**
   * Callback when expanded items change
   */
  onExpandedItemsChange?: (expandedItems: string[]) => void;

  /**
   * Default selected item (uncontrolled mode)
   */
  defaultSelectedItem?: string;

  /**
   * Controlled selected item
   */
  selectedItem?: string;

  /**
   * Callback when selected item changes
   */
  onItemSelect?: (itemId: string, item?: TreeNode) => void;

  /**
   * Whether to allow multiple selection
   */
  multiSelect?: boolean;

  /**
   * Tree items data (for data-driven approach)
   */
  items?: TreeNode[];
}

/**
 * Custom hook for managing Tree component state
 */
export const useTreeState = ({
  defaultExpandedItems = [],
  expandedItems: controlledExpandedItems,
  onExpandedItemsChange,
  defaultSelectedItem,
  selectedItem: controlledSelectedItem,
  onItemSelect,
  multiSelect = false,
  items,
}: UseTreeStateProps) => {
  // Generate a unique ID for accessibility
  const baseId = useMemo(
    () => `tree-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  // State for expanded items (uncontrolled mode)
  const [uncontrolledExpandedItems, setUncontrolledExpandedItems] = useState<
    string[]
  >(defaultExpandedItems || []);

  // State for selected item (uncontrolled mode)
  const [uncontrolledSelectedItem, setUncontrolledSelectedItem] = useState<
    string | undefined
  >(defaultSelectedItem);

  // Determine if we're in controlled or uncontrolled mode for expanded items
  const isExpandedControlled = controlledExpandedItems !== undefined;
  const currentExpandedItems = isExpandedControlled
    ? controlledExpandedItems
    : uncontrolledExpandedItems;

  // Determine if we're in controlled or uncontrolled mode for selected item
  const isSelectedControlled = controlledSelectedItem !== undefined;
  const currentSelectedItem = isSelectedControlled
    ? controlledSelectedItem
    : uncontrolledSelectedItem;

  // Function to toggle an item's expanded state
  const toggleItem = useCallback(
    (itemId: string) => {
      const newExpandedItems = currentExpandedItems.includes(itemId)
        ? currentExpandedItems.filter((id) => id !== itemId)
        : [...currentExpandedItems, itemId];

      if (!isExpandedControlled) {
        setUncontrolledExpandedItems(newExpandedItems);
      }

      if (onExpandedItemsChange) {
        onExpandedItemsChange(newExpandedItems);
      }
    },
    [currentExpandedItems, isExpandedControlled, onExpandedItemsChange]
  );

  // Function to check if an item is expanded
  const isItemExpanded = useCallback(
    (itemId: string) => currentExpandedItems.includes(itemId),
    [currentExpandedItems]
  );

  // Function to select an item
  const selectItem = useCallback(
    (itemId: string) => {
      if (!isSelectedControlled) {
        setUncontrolledSelectedItem(itemId);
      }

      if (onItemSelect) {
        const selectedTreeItem = items?.find((item) =>
          findNodeById(item, itemId)
        );
        onItemSelect(itemId, selectedTreeItem);
      }
    },
    [isSelectedControlled, onItemSelect, items]
  );

  // Helper function to find a node by ID in the tree
  const findNodeById = (node: TreeNode, id: string): TreeNode | undefined => {
    if (node.id === id) {
      return node;
    }

    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(child, id);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  };

  return {
    baseId,
    expandedItems: currentExpandedItems,
    toggleItem,
    isItemExpanded,
    selectedItem: currentSelectedItem,
    selectItem,
    multiSelect,
  };
};
