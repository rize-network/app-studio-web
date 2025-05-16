import { ViewProps } from 'app-studio';
import { TreeProps } from './Tree.props';
// Forward declaration for TreeProps to break circular dependency
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TreePropsPlaceholder {}

/**
 * Size options for the Tree component (affects item padding/font)
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Variant options for the Tree component (affects item appearance)
 */
export type Variant = 'default' | 'outline' | 'filled';

/**
 * Tree node data structure for data-driven approach
 */
export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Label text for the node */
  label: string;
  /** Optional icon to display next to the label */
  icon?: React.ReactNode;
  /** Child nodes for hierarchical structure */
  children?: TreeNode[];
  /** Whether the node is disabled (unclickable, deemphasized) */
  disabled?: boolean;
  /** Custom data to associate with the node (e.g., for onItemSelect callback) */
  data?: any;
  /** Optional custom styles for this specific node (applied to TreeItem) */
  style?: ViewProps;
}

/**
 * Props for the TreeItem component (compound pattern)
 */
export interface TreeItemProps extends ViewProps {
  /** Unique identifier for the item, used for expansion state and selection */
  value: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom icon to display for this item */
  icon?: React.ReactNode;
  /** Children elements: typically TreeItemLabel and TreeItemContent */
  children?: React.ReactNode;
  /** Custom views for styling parts of this specific item */
  views?: {
    // These would override the global views passed to Tree for this item only
    container?: ViewProps; // For this TreeItem's root
    label?: ViewProps; // For this TreeItem's TreeItemLabel
    content?: ViewProps; // For this TreeItem's TreeItemContent
    icon?: ViewProps; // For this TreeItem's main icon
    expandIcon?: ViewProps; // For this TreeItem's expand icon
  };
}

/**
 * Props for the TreeItemLabel component (compound pattern)
 */
export interface TreeItemLabelProps extends ViewProps {
  /** Content of the label, typically text or other inline elements */
  children?: React.ReactNode;
  /** Custom views (rarely needed here, usually styled via TreeItem or global views) */
  views?: {
    container?: ViewProps;
    // expandIcon?: ViewProps; // Expand icon is part of TreeItemLabel's layout, styled via TreeItem or global
    // icon?: ViewProps;       // Main icon is part of TreeItemLabel's layout, styled via TreeItem or global
  };
}

/**
 * Props for the TreeItemContent component (compound pattern)
 */
export interface TreeItemContentProps extends ViewProps {
  /** Child elements, typically more TreeItem components for nesting */
  children?: React.ReactNode;
  /** Custom views (rarely needed here, usually styled via TreeItem or global views) */
  views?: {
    container?: ViewProps;
  };
}

/**
 * Context type for the Tree component, passed via React Context
 */
export interface TreeContextType {
  /** List of expanded item IDs */
  expandedItems: string[];
  /** Function to toggle an item's expanded state */
  toggleItem: (itemId: string) => void;
  /** Function to check if an item is expanded */
  isItemExpanded: (itemId: string) => boolean;
  /** Base ID for generating accessible unique IDs for tree parts */
  baseId: string;
  /** Currently selected item ID */
  selectedItem?: string;
  /** Function to handle item selection */
  selectItem: (itemId: string) => void;
  /** Global size for tree items */
  size: Size;
  /** Global variant for tree items */
  variant: Variant;
  /** Global views configuration */
  views?: TreeProps['views']; // Reference views from main TreeProps
}

/**
 * Tree component type with sub-components.
 * P represents the props of the main Tree component (e.g., TreeProps).
 */
export interface TreeComponentType<P = TreePropsPlaceholder>
  extends React.FC<P> {
  Item: React.FC<TreeItemProps>;
  ItemLabel: React.FC<TreeItemLabelProps>;
  ItemContent: React.FC<TreeItemContentProps>;
}
