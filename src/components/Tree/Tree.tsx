import React from 'react';
import { TreeProps, TreeType } from './Tree/Tree.props';
import { useTreeState } from './Tree/Tree.state';
import {
  TreeProvider,
  TreeView,
  TreeItem,
  TreeItemLabel,
  TreeItemContent,
  DataDrivenTreeView,
} from './Tree/Tree.view';

/**
 * Tree component for displaying hierarchical data.
 * Supports both compound component pattern (using Tree.Item, Tree.ItemLabel, Tree.ItemContent)
 * and a data-driven approach (passing an array of TreeNode objects to the `items` prop).
 *
 * Features:
 * - Hierarchical data display with expandable/collapsible nodes
 * - Item selection with callbacks
 * - Drag and drop functionality for reorganizing tree items
 * - Customizable styling through views prop
 *
 * @example
 * ```tsx
 * // Compound component pattern
 * <Tree defaultExpandedItems={['parent-1']}>
 *   <Tree.Item value="parent-1" icon={<FolderIcon />}>
 *     <Tree.ItemLabel>Parent Item 1</Tree.ItemLabel>
 *     <Tree.ItemContent>
 *       <Tree.Item value="child-1-1" icon={<FileIcon />}>
 *         <Tree.ItemLabel>Child Item 1.1</Tree.ItemLabel>
 *       </Tree.Item>
 *     </Tree.ItemContent>
 *   </Tree.Item>
 * </Tree>
 *
 * // Data-driven approach
 * const treeNodes = [
 *   {
 *     id: 'parent-1', label: 'Parent Item 1', icon: <FolderIcon />,
 *     children: [
 *       { id: 'child-1-1', label: 'Child Item 1.1', icon: <FileIcon /> }
 *     ]
 *   }
 * ];
 * <Tree items={treeNodes} defaultExpandedItems={['parent-1']} />
 *
 * // With drag and drop for menu reorganization
 * const [menuItems, setMenuItems] = useState(initialMenuItems);
 *
 * <Tree
 *   items={menuItems}
 *   allowDragAndDrop={true}
 *   onItemsReorder={setMenuItems}
 * />
 * ```
 */
const TreeComponent: React.FC<TreeProps> = ({
  children,
  items,
  size = 'md',
  variant = 'default',
  defaultExpandedItems, // `useTreeState` handles default empty array
  expandedItems,
  onExpandedItemsChange,
  defaultSelectedItem,
  selectedItem,
  onItemSelect,
  multiSelect = false,
  allowDragAndDrop = false,
  dragHandleIcon,
  onItemsReorder,
  onDragStart,
  onDragEnd,
  views, // Global views configuration
  ...props // Remaining ViewProps for the root TreeView container
}) => {
  const treeState = useTreeState({
    defaultExpandedItems,
    expandedItems,
    onExpandedItemsChange,
    defaultSelectedItem,
    selectedItem,
    onItemSelect,
    multiSelect,
    items, // Pass items for data-driven selection logic
    allowDragAndDrop,
    onItemsReorder,
    onDragStart,
    onDragEnd,
  });

  return (
    <TreeProvider
      value={{
        expandedItems: treeState.expandedItems,
        toggleItem: treeState.toggleItem,
        isItemExpanded: treeState.isItemExpanded,
        baseId: treeState.baseId,
        selectedItem: treeState.selectedItem,
        selectItem: treeState.selectItem,
        size, // Pass global size
        variant, // Pass global variant
        views, // Pass global views configuration
        // Drag and drop related
        allowDragAndDrop: treeState.allowDragAndDrop,
        dragHandleIcon,
        draggedItemId: treeState.draggedItemId,
        dropTarget: treeState.dropTarget,
        handleDragStart: treeState.handleDragStart,
        handleDragOver: treeState.handleDragOver,
        handleDrop: treeState.handleDrop,
        handleDragEnd: treeState.handleDragEnd,
        getDraggedItem: treeState.getDraggedItem,
      }}
    >
      <TreeView
        // TreeView specific props:
        baseId={treeState.baseId}
        // Pass global styling props that might affect TreeView itself
        // size={size} // Size is used by items, not directly by TreeView container usually
        // variant={variant} // Variant is used by items
        views={views} // Pass views for container styling
        {...props} // Spread other ViewProps like width, margin, etc.
      >
        {items ? ( // If `items` prop is provided, use data-driven rendering
          <DataDrivenTreeView
            items={items}
            // size, variant, views are now sourced from context within DataDrivenTreeView/TreeNodeView
          />
        ) : (
          // Otherwise, use compound component children
          children
        )}
      </TreeView>
    </TreeProvider>
  );
};

export const Tree = TreeComponent as TreeType;

// Assign the sub-components to the main component for the compound pattern
Tree.Item = TreeItem;
Tree.ItemLabel = TreeItemLabel;
Tree.ItemContent = TreeItemContent;
