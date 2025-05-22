import { useState, useCallback, useMemo, useEffect } from 'react';
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
  allowDragAndDrop?: boolean; // Whether to enable drag and drop
  onItemsReorder?: (items: TreeNode[]) => void; // Callback when items are reordered
  onDragStart?: (itemId: string, event: React.DragEvent) => void; // Callback when drag starts
  onDragEnd?: (itemId: string) => void; // Callback when drag ends
}

// Helper functions are now defined inside the useTreeState hook

export const useTreeState = ({
  defaultExpandedItems = [],
  expandedItems: controlledExpandedItems,
  onExpandedItemsChange,
  defaultSelectedItem,
  selectedItem: controlledSelectedItem,
  onItemSelect,
  multiSelect = false, // multiSelect state logic is not fully implemented here
  items, // TreeNode array for data-driven mode
  allowDragAndDrop = false,
  onItemsReorder,
  onDragStart,
  onDragEnd,
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

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [uncontrolledItems, setUncontrolledItems] = useState<TreeNode[]>(
    items || []
  );
  const [dropTarget, setDropTarget] = useState<{
    itemId: string;
    position: 'before' | 'after' | 'inside';
  } | null>(null);

  // Update uncontrolled items when items prop changes
  useEffect(() => {
    if (items) {
      setUncontrolledItems(items);
    }
  }, [items]);

  const isExpandedControlled = controlledExpandedItems !== undefined;
  const currentExpandedItems = isExpandedControlled
    ? controlledExpandedItems
    : uncontrolledExpandedItems;

  const isSelectedControlled = controlledSelectedItem !== undefined;
  const currentSelectedItem: any = isSelectedControlled
    ? controlledSelectedItem
    : uncontrolledSelectedItem;

  const isItemsControlled = items !== undefined;
  const currentItems = isItemsControlled ? items : uncontrolledItems;

  // Helper function to find a node and its parent in the tree
  const findNodeAndParent = useCallback(
    (
      nodes: TreeNode[],
      itemId: string,
      parent: TreeNode | null = null
    ): { node: TreeNode | null; parent: TreeNode | null; index: number } => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === itemId) {
          return { node: nodes[i], parent, index: i };
        }
        if (nodes[i].children) {
          const result = findNodeAndParent(
            nodes[i].children!,
            itemId,
            nodes[i]
          );
          if (result.node) {
            return result;
          }
        }
      }
      return { node: null, parent: null, index: -1 };
    },
    []
  );

  // Helper function to check if a node is a descendant of another node
  const isDescendantOf = useCallback(
    (potentialAncestor: TreeNode, potentialDescendant: string): boolean => {
      if (!potentialAncestor.children) return false;

      return potentialAncestor.children.some(
        (child) =>
          child.id === potentialDescendant ||
          (child.children && isDescendantOf(child, potentialDescendant))
      );
    },
    []
  );

  // Helper function to find a node by its ID in the tree
  const findNodeById = useCallback(
    (nodes: TreeNode[], id: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) {
          return node;
        }
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    },
    []
  );

  // Helper function to move a node in the tree
  const moveNode = useCallback(
    (
      items: TreeNode[],
      sourceId: string,
      targetId: string,
      position: 'before' | 'after' | 'inside'
    ): TreeNode[] => {
      // First, create a deep copy of the original items to preserve all data
      const originalItems = JSON.parse(JSON.stringify(items)) as TreeNode[];

      // Create another deep copy for our working set
      const newItems = JSON.parse(JSON.stringify(items)) as TreeNode[];

      // Find the source and target nodes and their parents in the working copy
      const {
        node: sourceNode,
        parent: sourceParent,
        index: sourceIndex,
      } = findNodeAndParent(newItems, sourceId);
      const {
        node: targetNode,
        parent: targetParent,
        index: targetIndex,
      } = findNodeAndParent(newItems, targetId);

      // If either node is not found, return the original items unchanged
      if (!sourceNode || !targetNode) {
        console.log(
          'Source or target node not found, returning original items'
        );
        return originalItems;
      }

      // Prevent circular references
      if (position === 'inside' && isDescendantOf(sourceNode, targetId)) {
        console.log('Preventing circular reference, returning original items');
        return originalItems;
      }

      // Store a reference to the source node from the original items
      const originalSourceNode = findNodeById(originalItems, sourceId);
      if (!originalSourceNode) {
        console.log('Original source node not found, returning original items');
        return originalItems;
      }

      // Make a clean copy of the source node to insert
      const sourceNodeCopy = JSON.parse(JSON.stringify(originalSourceNode));

      // Get the target array before removing the source node
      const targetArray = targetParent ? targetParent.children! : newItems;

      // Calculate the insert index before removing the source node
      // This is important for handling the case when the source and target are in the same array
      let insertIndex = targetIndex + (position === 'after' ? 1 : 0);

      // Adjust the insert index if the source is in the same array and before the target
      const sameParent =
        (!sourceParent && !targetParent) ||
        (sourceParent && targetParent && sourceParent.id === targetParent.id);

      if (sameParent && sourceIndex < targetIndex && position === 'after') {
        // No need to adjust insertIndex for 'after' when source is before target
        // The removal of source will shift the target one position left
      } else if (
        sameParent &&
        sourceIndex < targetIndex &&
        position === 'before'
      ) {
        // For 'before' position, we need to adjust the index when source is before target
        insertIndex--;
      }

      // Remove the source node from its current position
      if (sourceParent) {
        sourceParent.children!.splice(sourceIndex, 1);
      } else {
        newItems.splice(sourceIndex, 1);
      }

      // Insert the source node copy at the target position
      if (position === 'inside') {
        if (!targetNode.children) {
          targetNode.children = [];
        }
        targetNode.children.push(sourceNodeCopy);
      } else {
        // Ensure insertIndex is valid (not negative or beyond array length)
        insertIndex = Math.max(0, Math.min(insertIndex, targetArray.length));
        targetArray.splice(insertIndex, 0, sourceNodeCopy);
      }

      return newItems;
    },
    [findNodeAndParent, findNodeById, isDescendantOf]
  );

  const toggleItem = useCallback(
    (itemId: string) => {
      const newExpandedItems = currentExpandedItems?.includes(itemId)
        ? currentExpandedItems?.filter((id) => id !== itemId)
        : [...(currentExpandedItems as string[]), itemId];

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
    (itemId: string) => currentExpandedItems?.includes(itemId),
    [currentExpandedItems as string[]]
  );

  const selectItem = useCallback(
    (itemId: string) => {
      // Basic single selection logic
      if (!isSelectedControlled) {
        setUncontrolledSelectedItem(itemId);
      }

      if (onItemSelect) {
        let selectedNodeData: TreeNode | undefined = undefined;
        if (currentItems) {
          // If tree data is available (data-driven mode)
          selectedNodeData = findNodeById(currentItems, itemId) || undefined;
        }
        // For compound components, itemData might not be available unless passed explicitly
        onItemSelect(itemId, selectedNodeData);
      }
    },
    [isSelectedControlled, onItemSelect, currentItems, findNodeById]
  );

  // Function to handle drag start
  const handleDragStart = useCallback(
    (e: React.DragEvent, itemId: string) => {
      if (!allowDragAndDrop) return;

      // Set data transfer for HTML5 drag and drop
      e.dataTransfer.setData('text/plain', itemId);
      e.dataTransfer.effectAllowed = 'move';

      // Set the dragged item ID
      setDraggedItemId(itemId);

      // Clear any existing drop target
      setDropTarget(null);

      // Call the external callback if provided
      if (onDragStart) {
        onDragStart(itemId, e);
      }
    },
    [allowDragAndDrop, onDragStart]
  );

  // Function to handle drag over
  const handleDragOver = useCallback(
    (e: React.DragEvent, itemId: string) => {
      if (!allowDragAndDrop || !draggedItemId || draggedItemId === itemId)
        return;

      // Prevent default to allow drop
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      // Get the target element and its position
      const targetElement = e.currentTarget as HTMLElement;
      const rect = targetElement.getBoundingClientRect();
      const clientY = e.clientY;

      // Calculate relative position within the element
      const relativeY = clientY - rect.top;
      const percentage = relativeY / rect.height;

      // Determine drop position based on where in the element the cursor is
      let position: 'before' | 'after' | 'inside';

      if (percentage < 0.25) {
        position = 'before';
      } else if (percentage > 0.75) {
        position = 'after';
      } else {
        position = 'inside';

        // Check if we're trying to drop a node into its own descendant
        const sourceNode = findNodeById(currentItems || [], draggedItemId);
        if (sourceNode && isDescendantOf(sourceNode, itemId)) {
          // If so, default to 'after' instead
          position = 'after';
        }
      }

      // Get the target node to check if it has children
      const targetNode = findNodeById(currentItems || [], itemId);

      // If the target node has children and we're dropping inside, expand it
      if (
        position === 'inside' &&
        targetNode &&
        !currentExpandedItems?.includes(itemId)
      ) {
        // Add the target to expanded items if it's not already expanded
        const newExpandedItems = [
          ...(currentExpandedItems as string[]),
          itemId,
        ];

        if (!isExpandedControlled) {
          setUncontrolledExpandedItems(newExpandedItems);
        }
        if (onExpandedItemsChange) {
          onExpandedItemsChange(newExpandedItems);
        }
      }

      // Update the drop target
      setDropTarget({ itemId, position });
    },
    [
      allowDragAndDrop,
      draggedItemId,
      currentItems,
      findNodeById,
      isDescendantOf,
      currentExpandedItems,
      isExpandedControlled,
      onExpandedItemsChange,
      setUncontrolledExpandedItems,
    ]
  );

  // Function to handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      // Prevent default browser behavior
      e.preventDefault();

      // If drag and drop is not allowed or no item is being dragged, just reset state
      if (!allowDragAndDrop || !draggedItemId) {
        setDraggedItemId(null);
        setDropTarget(null);
        return;
      }

      try {
        // If we have a valid drop target and it's not the same as the dragged item
        if (dropTarget && draggedItemId !== dropTarget.itemId) {
          // Get the source and target IDs and position
          const sourceId = draggedItemId;
          const { itemId: targetId, position } = dropTarget;

          console.log(`Moving node ${sourceId} ${position} ${targetId}`);

          // Validate that both source and target exist before attempting to move
          const sourceNode = findNodeById(currentItems || [], sourceId);
          const targetNode = findNodeById(currentItems || [], targetId);

          if (!sourceNode || !targetNode) {
            console.error('Source or target node not found in the tree');
            // Don't modify the tree if nodes can't be found
            return;
          }

          // Move the node in the tree
          const newItems = moveNode(
            currentItems || [],
            sourceId,
            targetId,
            position
          );

          // Verify that the operation didn't result in data loss
          if (newItems.length === 0 && (currentItems || []).length > 0) {
            console.error('Operation would result in data loss, aborting');
            // Don't update if it would clear the tree
            return;
          }

          // Update the state or call the callback
          if (!isItemsControlled) {
            setUncontrolledItems(newItems);
          }
          if (onItemsReorder) {
            onItemsReorder(newItems);
          }
        } else {
          // If dropped outside a valid target or on itself, do nothing to the tree structure
          // This ensures data is preserved even when dropped outside
          console.log(
            'Drop canceled or invalid: No changes made to tree structure'
          );
        }
      } catch (error) {
        // Log any errors that occur during the drop operation
        console.error('Error during drop operation:', error);
        // Don't modify the tree if an error occurs
      } finally {
        // Call the external callback if provided
        if (onDragEnd) {
          onDragEnd(draggedItemId);
        }

        // Reset drag state
        setDraggedItemId(null);
        setDropTarget(null);
      }
    },
    [
      allowDragAndDrop,
      draggedItemId,
      dropTarget,
      moveNode,
      currentItems,
      findNodeById,
      isItemsControlled,
      onItemsReorder,
      onDragEnd,
    ]
  );

  // Function to handle drag end (cancel)
  const handleDragEnd = useCallback(
    (_: React.DragEvent) => {
      // Store the current draggedItemId before resetting state
      const currentDraggedItemId = draggedItemId;

      // Reset drag state
      setDraggedItemId(null);
      setDropTarget(null);

      // Call the external callback if provided
      if (currentDraggedItemId && onDragEnd) {
        // Log that the drag was canceled (useful for debugging)
        console.log('Drag canceled: No changes made to tree structure');
        onDragEnd(currentDraggedItemId);
      }
    },
    [draggedItemId, onDragEnd]
  );

  // We don't need global event listeners with our new approach

  // Function to get the dragged item's data
  const getDraggedItem = useCallback(() => {
    if (!draggedItemId || !currentItems) return undefined;
    return findNodeById(currentItems, draggedItemId) || undefined;
  }, [draggedItemId, currentItems, findNodeById]);

  // We don't need to register item refs with our new approach

  return {
    baseId,
    expandedItems: currentExpandedItems,
    toggleItem,
    isItemExpanded,
    selectedItem: currentSelectedItem,
    selectItem,
    multiSelect, // Exposing it, though its full logic isn't here
    // Drag and drop related
    allowDragAndDrop,
    draggedItemId,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    getDraggedItem,
    items: currentItems,
  };
};
