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
 * Supports both compound component pattern and data-driven approach.
 *
 * @example
 * ```tsx
 * // Compound component pattern
 * <Tree>
 *   <Tree.Item value="item-1">
 *     <Tree.ItemLabel>Parent Item</Tree.ItemLabel>
 *     <Tree.ItemContent>
 *       <Tree.Item value="item-1-1">
 *         <Tree.ItemLabel>Child Item 1</Tree.ItemLabel>
 *       </Tree.Item>
 *       <Tree.Item value="item-1-2">
 *         <Tree.ItemLabel>Child Item 2</Tree.ItemLabel>
 *       </Tree.Item>
 *     </Tree.ItemContent>
 *   </Tree.Item>
 * </Tree>
 *
 * // Data-driven approach
 * const items = [
 *   {
 *     id: 'item-1',
 *     label: 'Parent Item',
 *     children: [
 *       { id: 'item-1-1', label: 'Child Item 1' },
 *       { id: 'item-1-2', label: 'Child Item 2' }
 *     ]
 *   }
 * ];
 *
 * <Tree items={items} />
 * ```
 */
const TreeComponent: React.FC<TreeProps> = ({
  children,
  items,
  size = 'md',
  variant = 'default',
  defaultExpandedItems = [],
  expandedItems,
  onExpandedItemsChange,
  defaultSelectedItem,
  selectedItem,
  onItemSelect,
  multiSelect = false,
  views,
  ...props
}) => {
  const treeState = useTreeState({
    defaultExpandedItems,
    expandedItems,
    onExpandedItemsChange,
    defaultSelectedItem,
    selectedItem,
    onItemSelect,
    multiSelect,
    items,
  });

  return (
    <TreeProvider
      value={{
        expandedItems: treeState.expandedItems,
        toggleItem: treeState.toggleItem,
        isItemExpanded: treeState.isItemExpanded,
        baseId: treeState.baseId,
      }}
    >
      <TreeView
        size={size}
        variant={variant}
        views={views}
        baseId={treeState.baseId}
        {...props}
      >
        {items ? (
          <DataDrivenTreeView
            items={items}
            size={size}
            variant={variant}
            views={views}
          />
        ) : (
          children
        )}
      </TreeView>
    </TreeProvider>
  );
};

export const Tree = TreeComponent as TreeType;

// Assign the sub-components to the main component
Tree.Item = TreeItem;
Tree.ItemLabel = TreeItemLabel;
Tree.ItemContent = TreeItemContent;
