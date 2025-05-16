import React, { createContext, useContext } from 'react';
import { View, Vertical, Horizontal } from 'app-studio';
import { ViewProps } from 'app-studio';
import { Text } from '../../Text/Text';
import { ChevronIcon } from '../../Icon/Icon';
import {
  TreeContextType,
  TreeNode,
  Size,
  Variant,
  TreeItemProps,
  TreeItemLabelProps,
  TreeItemContentProps,
} from './Tree.type';
import {
  DefaultTreeStyles,
  TreeSizes,
  TreeVariants,
  TreeItemStates,
} from './Tree.style';

// Create context for the Tree component
const TreeContext = createContext<TreeContextType>({
  expandedItems: [],
  toggleItem: () => {},
  isItemExpanded: () => false,
  baseId: '',
});

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

// Main Tree View component
export const TreeView: React.FC<
  {
    children: React.ReactNode;
    size?: Size;
    variant?: Variant;
    views?: any;
    baseId: string;
  } & ViewProps
> = ({
  children,
  size = 'md',
  variant = 'default',
  views,
  baseId,
  themeMode: elementMode,
  ...props
}) => {
  return (
    <Vertical
      width="100%"
      role="tree"
      aria-label="Tree"
      id={baseId}
      {...DefaultTreeStyles.container}
      {...views?.container}
      {...props}
    >
      {children}
    </Vertical>
  );
};

// Tree Item component
export const TreeItem: React.FC<TreeItemProps> = ({
  value,
  disabled = false,
  icon,
  children,
  views,
  ...props
}) => {
  const { isItemExpanded, toggleItem, baseId } = useTreeContext();
  const expanded = isItemExpanded(value);

  // Check if this item has children (for rendering expand/collapse icon)
  const hasChildren = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TreeItemContent
  );

  const handleToggle = (e: React.MouseEvent) => {
    if (disabled) return;
    toggleItem(value);
    e.stopPropagation();
  };

  return (
    <Vertical
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-disabled={disabled}
      id={`${baseId}-item-${value}`}
      {...DefaultTreeStyles.item}
      {...(disabled ? TreeItemStates.disabled : {})}
      {...views?.container}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass props to TreeItemLabel
          if (child.type === TreeItemLabel) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: handleToggle,
              hasChildren,
              expanded,
              icon,
              disabled,
            });
          }

          // Pass props to TreeItemContent
          if (child.type === TreeItemContent) {
            return expanded
              ? React.cloneElement(child as React.ReactElement<any>, {})
              : null;
          }
        }
        return child;
      })}
    </Vertical>
  );
};

// Tree Item Label component
export const TreeItemLabel: React.FC<
  TreeItemLabelProps & {
    onClick?: (e: React.MouseEvent) => void;
    hasChildren?: boolean;
    expanded?: boolean;
    icon?: React.ReactNode;
    disabled?: boolean;
  }
> = ({
  children,
  onClick,
  hasChildren,
  expanded,
  icon,
  disabled,
  views,
  ...props
}) => {
  return (
    <Horizontal
      onClick={onClick}
      alignItems="center"
      justifyContent="space-between"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...DefaultTreeStyles.itemLabel}
      {...views?.container}
      {...props}
    >
      <Horizontal alignItems="center">
        {icon && (
          <View {...DefaultTreeStyles.icon} {...views?.icon}>
            {icon}
          </View>
        )}
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </Horizontal>

      {hasChildren && (
        <View
          {...DefaultTreeStyles.expandIcon}
          transform={expanded ? 'rotate(180deg)' : 'rotate(0deg)'}
          {...views?.expandIcon}
        >
          <ChevronIcon orientation="down" size={16} />
        </View>
      )}
    </Horizontal>
  );
};

// Tree Item Content component
export const TreeItemContent: React.FC<TreeItemContentProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <Vertical
      role="group"
      {...DefaultTreeStyles.itemContent}
      {...views?.container}
      {...props}
    >
      {children}
    </Vertical>
  );
};

// Recursive component for rendering tree nodes from data
export const TreeNodeView: React.FC<{
  node: TreeNode;
  size: Size;
  variant: Variant;
  views?: any;
}> = ({ node, size, variant, views }) => {
  return (
    <TreeItem
      value={node.id}
      disabled={node.disabled}
      icon={node.icon}
      {...TreeSizes[size]}
      {...TreeVariants[variant]}
      views={views}
    >
      <TreeItemLabel>{node.label}</TreeItemLabel>

      {node.children && node.children.length > 0 && (
        <TreeItemContent>
          {node.children.map((child) => (
            <TreeNodeView
              key={child.id}
              node={child}
              size={size}
              variant={variant}
              views={views}
            />
          ))}
        </TreeItemContent>
      )}
    </TreeItem>
  );
};

// Data-driven Tree View component
export const DataDrivenTreeView: React.FC<{
  items: TreeNode[];
  size: Size;
  variant: Variant;
  views?: any;
}> = ({ items, size, variant, views }) => {
  return (
    <>
      {items.map((item) => (
        <TreeNodeView
          key={item.id}
          node={item}
          size={size}
          variant={variant}
          views={views}
        />
      ))}
    </>
  );
};
