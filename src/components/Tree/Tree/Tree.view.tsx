import React, { createContext, useContext } from 'react';
import { View, Vertical, Horizontal, ViewProps } from 'app-studio';
import { Text } from '../../Text/Text'; // Assuming Text path is correct
import { ChevronIcon, DragHandleIcon } from '../../Icon/Icon'; // Assuming Icon path is correct

// Use the DragHandleIcon component as the default
const DefaultDragHandleIcon = () => <DragHandleIcon />;
import {
  TreeContextType,
  TreeNode,
  Size,
  Variant,
  TreeItemProps,
  TreeItemLabelProps,
  TreeItemContentProps,
} from './Tree.type';
import { TreeProps } from './Tree.props'; // For TreeViewProps

import {
  DefaultTreeStyles,
  TreeSizes,
  TreeItemLabelVariants, // Renamed from TreeVariants for clarity
  TreeItemStates,
} from './Tree.style';

// Create context for the Tree component
const TreeContext = createContext<TreeContextType | undefined>(undefined);

// Provider component for the Tree context
export const TreeProvider: React.FC<{
  value: TreeContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

// Hook to use the Tree context
export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};

// Props for the main TreeView component (root container)
interface TreeViewProps
  extends Pick<TreeProps, 'size' | 'variant' | 'views' | 'children'>,
    Omit<
      ViewProps,
      keyof Pick<TreeProps, 'size' | 'variant' | 'views' | 'children'>
    > {
  baseId: string;
}

// Main Tree View component (root container)
export const TreeView: React.FC<TreeViewProps> = ({
  children,
  // size, variant, views are accessed from context by items, but can be passed to container
  views, // Views for the container itself
  baseId,
  // themeMode, // If 'app-studio' ViewProps supports themeMode
  ...props
}) => {
  const { allowDragAndDrop, handleDrop, handleDragEnd } = useTreeContext();

  // Handle drag over for the entire tree container
  const handleContainerDragOver = (e: React.DragEvent) => {
    if (!allowDragAndDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // We don't set a drop target here, as we're not over a specific item
  };

  // Handle drop on the container (outside any specific item)
  const handleContainerDrop = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !handleDrop) return;

    // When dropping on the container, we want to cancel the operation
    // rather than potentially causing data loss
    console.log('Drop on container: canceling operation to preserve data');

    // We still call handleDrop which will reset the drag state
    // but since dropTarget is null, it won't modify the tree structure
    handleDrop(e);
  };

  // Handle drag end for the container
  const handleContainerDragEnd = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !handleDragEnd) return;
    handleDragEnd(e);
  };

  return (
    <Vertical
      as="ul" // Semantically a list of items
      width="100%"
      role="tree" // ARIA role for the tree widget
      aria-label="Tree" // Provide a general label, can be overridden by user
      id={baseId} // Base ID for the tree
      onDragOver={allowDragAndDrop ? handleContainerDragOver : undefined}
      onDrop={allowDragAndDrop ? handleContainerDrop : undefined}
      onDragEnd={allowDragAndDrop ? handleContainerDragEnd : undefined}
      {...DefaultTreeStyles.container}
      {...views?.container} // Apply custom styles for the root container
      {...props}
    >
      {children}
    </Vertical>
  );
};

// Tree Item component (for compound pattern)
export const TreeItem: React.FC<TreeItemProps> = ({
  value: itemId, // Renamed for clarity, 'value' is the prop name
  disabled = false,
  icon,
  children,
  views: itemSpecificViews, // Item-specific view overrides
  style: itemSpecificStyle, // Item-specific direct style override
  draggable,
  ...props
}) => {
  const {
    isItemExpanded,
    toggleItem,
    baseId,
    selectedItem,
    selectItem,
    size: globalSize,
    variant: globalVariant,
    views: globalViews,
    allowDragAndDrop,
    draggedItemId,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useTreeContext();

  const expanded = isItemExpanded(itemId);
  const isSelected = selectedItem === itemId;
  const isDragging = draggedItemId === itemId;
  const canDrag = allowDragAndDrop && draggable !== false && !disabled;

  // Determine if this item is a drop target and what position
  const isDropTarget = dropTarget?.itemId === itemId;
  const dropPosition = isDropTarget && dropTarget ? dropTarget?.position : null;

  const hasChildren = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TreeItemContent
  );

  const handleToggleExpand = (e: React.MouseEvent) => {
    if (disabled || !hasChildren) return; // Only toggle if has children and not disabled
    toggleItem(itemId);
    e.stopPropagation(); // Prevent selection if clicking only on expander area (optional)
  };

  const handleSelect = (e: React.MouseEvent) => {
    if (disabled) return;
    selectItem(itemId);
    // If it has children and click was on label (not expander), also toggle expand
    // This depends on desired UX. Here, clicking label selects AND toggles if it has children.
    // If only expander should toggle, then handleToggleExpand is enough.
    if (hasChildren && e.currentTarget.contains(e.target as Node)) {
      // Check if click was on label part
      const targetIsExpander = (e.target as HTMLElement).closest(
        '[data-expander="true"]'
      );
      if (!targetIsExpander) {
        // Don't re-toggle if click was on expander handled by handleToggleExpand
        // toggleItem(itemId);
        // Decided: label click selects. Expander icon toggles.
        // If you want label click to also toggle, uncomment above.
      }
    }
  };

  // Handle drag start
  const handleItemDragStart = (e: React.DragEvent) => {
    if (!canDrag || !handleDragStart) return;
    handleDragStart(e, itemId);
  };

  // Handle drag over
  const handleItemDragOver = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !handleDragOver || isDragging) return;
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    handleDragOver(e, itemId);
  };

  // Handle drop
  const handleItemDrop = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !handleDrop) return;
    e.preventDefault();
    handleDrop(e);
  };

  // Handle drag end
  const handleItemDragEnd = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !handleDragEnd) return;
    handleDragEnd(e);
  };

  // Resolve views: itemSpecific takes precedence over global
  const resolvedViews = { ...globalViews, ...itemSpecificViews };

  // Determine drag and drop styles
  const dragStyles = isDragging
    ? {
        opacity: 0.5,
        backgroundColor: 'color.gray.100',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        ...resolvedViews.draggedItem,
      }
    : {};

  // Determine drop target styles
  const dropTargetStyles = isDropTarget
    ? {
        ...(dropPosition === 'before'
          ? { borderTop: '2px solid color.blue.500' }
          : {}),
        ...(dropPosition === 'after'
          ? { borderBottom: '2px solid color.blue.500' }
          : {}),
        ...(dropPosition === 'inside'
          ? { backgroundColor: 'rgba(0, 0, 255, 0.1)' }
          : {}),
      }
    : {};

  return (
    <Vertical
      as="li" // Each item is a list item
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-selected={isSelected}
      aria-disabled={disabled}
      id={`${baseId}-item-${itemId}`} // Unique ID for the item
      data-tree-item-id={itemId} // For easier querying
      cursor={canDrag ? 'grab' : undefined}
      draggable={canDrag}
      onDragStart={canDrag ? handleItemDragStart : undefined}
      onDragOver={allowDragAndDrop ? handleItemDragOver : undefined}
      onDrop={allowDragAndDrop ? handleItemDrop : undefined}
      onDragEnd={canDrag ? handleItemDragEnd : undefined}
      {...DefaultTreeStyles.item}
      {...resolvedViews.item} // Apply resolved item container styles
      {...itemSpecificStyle} // Apply direct item style
      {...dragStyles} // Apply drag-specific styles
      {...dropTargetStyles} // Apply drop target styles
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TreeItemLabel) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: handleSelect, // Click on label selects
              onToggleExpand: handleToggleExpand, // Pass dedicated toggle for expander icon
              hasChildren,
              expanded,
              icon, // Pass item's icon to its label
              disabled,
              isSelected,
              isDragging,
              size: globalSize,
              variant: globalVariant,
              views: resolvedViews, // Pass resolved views down
            });
          }
          if (child.type === TreeItemContent) {
            return expanded
              ? React.cloneElement(child as React.ReactElement<any>, {
                  views: resolvedViews, // Pass resolved views down
                })
              : null;
          }
        }
        return child;
      })}
    </Vertical>
  );
};

// Tree Item Label component (for compound pattern)
interface InternalTreeItemLabelProps extends TreeItemLabelProps {
  onClick?: (e: React.MouseEvent) => void; // For selection
  onToggleExpand?: (e: React.MouseEvent) => void; // For expander icon click
  hasChildren?: boolean;
  expanded?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  isDragging?: boolean; // Whether the item is being dragged
  size?: Size;
  variant?: Variant;
  views?: TreeProps['views']; // Global or resolved views
}

export const TreeItemLabel: React.FC<InternalTreeItemLabelProps> = ({
  children,
  onClick,
  onToggleExpand,
  hasChildren,
  expanded,
  icon,
  disabled,
  isSelected,
  isDragging,
  size = 'md',
  variant = 'default',
  views,
  ...props
}) => {
  const { allowDragAndDrop, dragHandleIcon } = useTreeContext();

  const labelStyles = {
    ...DefaultTreeStyles.itemLabel,
    ...TreeSizes[size], // Apply size-specific styles (padding, font)
    ...TreeItemLabelVariants[variant], // Apply variant-specific styles (bg, border)
    ...(isSelected && !disabled ? TreeItemStates.selected : {}), // Apply selected state styles
    ...(disabled ? TreeItemStates.disabled : {}), // Apply disabled state styles
    ...(isDragging ? { opacity: 0.5 } : {}), // Apply dragging state styles
  };
  const hoverStyles = disabled
    ? TreeItemStates.disabled._hover
    : TreeItemStates.hover;

  return (
    <Horizontal
      onClick={onClick} // Click on the whole label area
      alignItems="center"
      justifyContent="space-between" // Changed to space-between to position drag handle on the right
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...labelStyles}
      _hover={hoverStyles} // Apply hover state styles
      {...views?.itemLabel} // Custom global/item overrides for itemLabel
      {...props}
    >
      <Horizontal alignItems="center" flex="1">
        {/* Optional Expander Icon (rendered first for some designs, or use order prop if View supports) */}
        {/* Let's keep icon first, then text, then expander icon */}
        {icon && (
          <View {...DefaultTreeStyles.icon} {...views?.icon}>
            {icon}
          </View>
        )}
        {typeof children === 'string' ? (
          <Text isTruncated>{children}</Text>
        ) : (
          children
        )}

        {hasChildren && (
          <View
            data-expander="true" // For click target detection
            onClick={onToggleExpand} // Expander icon has its own click for toggling
            cursor="pointer" // Ensure cursor indicates clickable expander
            aria-hidden="true" // Presentation, main item has aria-expanded
            {...DefaultTreeStyles.expandIcon}
            style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }} // Chevron right for collapsed, down for expanded
            {...views?.expandIcon}
          >
            <ChevronIcon orientation="right" size={16} />
            {/* Changed orientation for more standard tree view: right (collapsed) / down (expanded is done by rotate(0)) */}
            {/* Or use 'down' and rotate 180deg vs 0deg */}
          </View>
        )}
      </Horizontal>

      {/* Drag handle icon on the right side */}
      {allowDragAndDrop && !disabled && (
        <View
          opacity={0.5}
          _hover={{ opacity: 1 }}
          cursor="grab"
          marginLeft={2}
          {...views?.dragHandle}
        >
          {dragHandleIcon || <DefaultDragHandleIcon />}
        </View>
      )}
    </Horizontal>
  );
};

// Tree Item Content component (for compound pattern)
interface InternalTreeItemContentProps extends TreeItemContentProps {
  views?: TreeProps['views'];
}
export const TreeItemContent: React.FC<InternalTreeItemContentProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <Vertical
      as="ul" // Children form a nested list
      role="group" // ARIA role for a group of tree items under a parent
      {...DefaultTreeStyles.itemContent}
      {...views?.itemContent} // Custom global/item overrides for itemContent
      {...props}
    >
      {children}
    </Vertical>
  );
};

// Recursive component for rendering tree nodes from `items` (data-driven)
const TreeNodeView: React.FC<{
  node: TreeNode;
  // size, variant, views are taken from context now
}> = ({ node }) => {
  // Context is accessed implicitly by TreeItem and its children
  return (
    <TreeItem
      value={node.id}
      disabled={node.disabled}
      icon={node.icon}
      draggable={node.draggable !== false} // Enable dragging by default unless explicitly disabled
      views={{
        // Pass only node-specific view overrides if node.style existed for this
        ...(node.style ? { container: node.style } : {}),
        // other sub-views from node data if necessary
      }}
      // Specific styles for this node can be passed via node.style prop in TreeNode
      // and applied by TreeItem using its `style` prop.
    >
      <TreeItemLabel>{node.label}</TreeItemLabel>

      {node.children && node.children.length > 0 && (
        <TreeItemContent>
          {node.children.map((child) => (
            <TreeNodeView
              key={child.id}
              node={child}
              // size, variant, views are implicitly passed via context to nested TreeItems
            />
          ))}
        </TreeItemContent>
      )}
    </TreeItem>
  );
};

// Data-driven Tree View content renderer
export const DataDrivenTreeView: React.FC<{
  items: TreeNode[];
  // size, variant, views are from context
}> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <TreeNodeView key={item.id} node={item} />
      ))}
    </>
  );
};
