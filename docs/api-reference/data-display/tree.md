# Tree

The Tree component is used for displaying hierarchical data with expandable/collapsible nodes. It supports both a compound component pattern and a data-driven approach.

## Import

```jsx
import { Tree } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | React.ReactNode | undefined | Child elements for compound component pattern (e.g., `<Tree.Item />`) |
| items | TreeNode[] | undefined | Data-driven approach: array of tree nodes |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the tree items |
| variant | 'default' \| 'outline' \| 'filled' | 'default' | Visual variant of the tree items |
| defaultExpandedItems | string[] | [] | IDs of initially expanded items (uncontrolled mode) |
| expandedItems | string[] | undefined | IDs of expanded items (controlled mode) |
| onExpandedItemsChange | (expandedItems: string[]) => void | undefined | Callback when expanded items change |
| onItemSelect | (itemId: string, item?: TreeNode) => void | undefined | Callback when an item is selected |
| selectedItem | string | undefined | ID of the currently selected item (controlled mode) |
| defaultSelectedItem | string | undefined | ID of the initially selected item (uncontrolled mode) |
| multiSelect | boolean | false | Whether to allow multiple selection |
| allowDragAndDrop | boolean | false | Whether to enable drag and drop functionality |
| dragHandleIcon | React.ReactNode | undefined | Custom icon to use for the drag handle |
| onItemsReorder | (items: TreeNode[]) => void | undefined | Callback when items are reordered via drag and drop |
| onDragStart | (itemId: string, event: React.DragEvent) => void | undefined | Callback when drag starts on an item |
| onDragEnd | (itemId: string) => void | undefined | Callback when drag ends |
| views | object | {} | Custom styling for different parts of the component |

## TreeNode Structure

The `TreeNode` interface defines the structure of nodes in the data-driven approach:

```tsx
interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: any;
  style?: ViewProps;
  isDragging?: boolean;
  draggable?: boolean;
}
```

## Examples

### Compound Component Pattern

```jsx
import React from 'react';
import { Tree } from '@app-studio/web';
import { FolderIcon, FileIcon } from '@app-studio/web';

export const CompoundTree = () => {
  return (
    <Tree defaultExpandedItems={['parent-1']}>
      <Tree.Item value="parent-1" icon={<FolderIcon />}>
        <Tree.ItemLabel>Parent Item 1</Tree.ItemLabel>
        <Tree.ItemContent>
          <Tree.Item value="child-1-1" icon={<FileIcon />}>
            <Tree.ItemLabel>Child Item 1.1</Tree.ItemLabel>
          </Tree.Item>
          <Tree.Item value="child-1-2" icon={<FileIcon />}>
            <Tree.ItemLabel>Child Item 1.2</Tree.ItemLabel>
          </Tree.Item>
        </Tree.ItemContent>
      </Tree.Item>
      <Tree.Item value="parent-2" icon={<FolderIcon />}>
        <Tree.ItemLabel>Parent Item 2</Tree.ItemLabel>
        <Tree.ItemContent>
          <Tree.Item value="child-2-1" icon={<FileIcon />}>
            <Tree.ItemLabel>Child Item 2.1</Tree.ItemLabel>
          </Tree.Item>
        </Tree.ItemContent>
      </Tree.Item>
    </Tree>
  );
};
```

### Data-Driven Approach

```jsx
import React from 'react';
import { Tree } from '@app-studio/web';
import { FolderIcon, FileIcon } from '@app-studio/web';

export const DataDrivenTree = () => {
  const treeNodes = [
    {
      id: 'parent-1',
      label: 'Parent Item 1',
      icon: <FolderIcon />,
      children: [
        { id: 'child-1-1', label: 'Child Item 1.1', icon: <FileIcon /> },
        { id: 'child-1-2', label: 'Child Item 1.2', icon: <FileIcon /> }
      ]
    },
    {
      id: 'parent-2',
      label: 'Parent Item 2',
      icon: <FolderIcon />,
      children: [
        { id: 'child-2-1', label: 'Child Item 2.1', icon: <FileIcon /> }
      ]
    }
  ];

  return (
    <Tree 
      items={treeNodes} 
      defaultExpandedItems={['parent-1']} 
      onItemSelect={(itemId, item) => console.log(`Selected: ${itemId}`, item)}
    />
  );
};
```

### With Drag and Drop

```jsx
import React, { useState } from 'react';
import { Tree } from '@app-studio/web';
import { FolderIcon, FileIcon } from '@app-studio/web';

export const DraggableTree = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 'menu-1',
      label: 'Menu Item 1',
      icon: <FolderIcon />,
      children: [
        { id: 'submenu-1-1', label: 'Submenu Item 1.1', icon: <FileIcon /> }
      ]
    },
    {
      id: 'menu-2',
      label: 'Menu Item 2',
      icon: <FolderIcon />,
      children: [
        { id: 'submenu-2-1', label: 'Submenu Item 2.1', icon: <FileIcon /> }
      ]
    }
  ]);

  return (
    <Tree
      items={menuItems}
      allowDragAndDrop={true}
      onItemsReorder={setMenuItems}
      onDragStart={(itemId) => console.log(`Started dragging: ${itemId}`)}
      onDragEnd={(itemId) => console.log(`Finished dragging: ${itemId}`)}
    />
  );
};
```

## Compound Components

The Tree component uses a compound component pattern with the following sub-components:

```jsx
Tree.Item       // Represents a tree node
Tree.ItemLabel  // The clickable label part of a tree node
Tree.ItemContent // Container for child nodes
```

## Customization

The Tree component can be customized using the `views` prop:

```jsx
<Tree
  // ...other props
  views={{
    container: { /* styles for the root container */ },
    item: { /* styles for each tree item */ },
    itemLabel: { /* styles for the clickable label part */ },
    itemContent: { /* styles for the children wrapper */ },
    icon: { /* styles for the item's main icon */ },
    expandIcon: { /* styles for the expand/collapse chevron icon */ },
    draggedItem: { /* styles for the item being dragged */ },
    dragHandle: { /* styles for the drag handle icon */ },
  }}
/>
```

## Accessibility

The Tree component implements the following accessibility features:

- Keyboard navigation for expanding/collapsing nodes
- ARIA attributes for tree structure
- Focus management for interactive elements
- Proper contrast for selected and hovered states

## Best Practices

- Use consistent icons for similar node types
- Provide clear labels for all nodes
- Implement proper error handling for drag and drop operations
- Consider the depth of your tree structure (avoid deeply nested trees)
- Use the `onItemSelect` callback to handle item selection
- Implement undo/redo functionality for drag and drop operations when needed
