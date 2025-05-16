import { useState, useCallback, useMemo } from 'react';
import { TreeNode } from './Tree.type';

interface UseTreeStateProps {
  defaultExpandedItems?: string[];
  expandedItems?: string[];
  onExpandedItemsChange?: (expandedItems: string[]) => void;
  defaultSelectedItem?: string;
  selectedItem?: string;
  onItemSelect?: (itemId: string, itemData?: TreeNode) => void; // itemData is optional
  multiSelect?: boolean;
  items?: TreeNode[]; // For data-driven mode, to find item data on select
}

// Helper function to find a node by ID within a single TreeNode and its children (recursive)
const findNodeByIdRecursive = (
  node: TreeNode,
  id: string
): TreeNode | undefined => {
  if (node.id === id) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeByIdRecursive(child, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

export const useTreeState = ({
  defaultExpandedItems = [],
  expandedItems: controlledExpandedItems,
  onExpandedItemsChange,
  defaultSelectedItem,
  selectedItem: controlledSelectedItem,
  onItemSelect,
  multiSelect = false, // multiSelect state logic is not fully implemented here
  items, // TreeNode array for data-driven mode
}: UseTreeStateProps) => {
  // Generate a unique ID for accessibility.
  // For production, consider using React.useId() if available.
  const baseId = useMemo(
    () => `tree-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const [uncontrolledExpandedItems, setUncontrolledExpandedItems] = useState<
    string[]
  >(defaultExpandedItems || []);

  const [uncontrolledSelectedItem, setUncontrolledSelectedItem] = useState<
    string | undefined
  >(defaultSelectedItem);

  const isExpandedControlled = controlledExpandedItems !== undefined;
  const currentExpandedItems = isExpandedControlled
    ? controlledExpandedItems
    : uncontrolledExpandedItems;

  const isSelectedControlled = controlledSelectedItem !== undefined;
  const currentSelectedItem = isSelectedControlled
    ? controlledSelectedItem
    : uncontrolledSelectedItem;

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

  const isItemExpanded = useCallback(
    (itemId: string) => currentExpandedItems.includes(itemId),
    [currentExpandedItems]
  );

  const selectItem = useCallback(
    (itemId: string) => {
      // Basic single selection logic
      if (!isSelectedControlled) {
        setUncontrolledSelectedItem(itemId);
      }

      if (onItemSelect) {
        let selectedNodeData: TreeNode | undefined = undefined;
        if (items) {
          // If tree data is available (data-driven mode)
          for (const rootNode of items) {
            // Iterate through root nodes
            selectedNodeData = findNodeByIdRecursive(rootNode, itemId);
            if (selectedNodeData) break; // Found the node
          }
        }
        // For compound components, itemData might not be available unless passed explicitly
        onItemSelect(itemId, selectedNodeData);
      }
    },
    [isSelectedControlled, onItemSelect, items] // Ensure `items` is a dependency
  );

  return {
    baseId,
    expandedItems: currentExpandedItems,
    toggleItem,
    isItemExpanded,
    selectedItem: currentSelectedItem,
    selectItem,
    multiSelect, // Exposing it, though its full logic isn't here
  };
};
