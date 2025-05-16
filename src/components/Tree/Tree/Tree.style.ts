import { ViewProps } from 'app-studio';
import { Size, Variant } from './Tree.type';

/**
 * Default styles for the Tree component and its parts
 */
export const DefaultTreeStyles = {
  container: {
    // Base styles for the TreeView root container
  } as ViewProps,
  item: {
    // Styles for TreeItem container
    width: '100%',
    // cursor: 'pointer', // Applied to TreeItemLabel instead for better click target
    transition: 'background-color 0.2s ease', // Transition for hover/active states
    listStyleType: 'none', // If rendered as ul/li
  } as ViewProps,
  itemLabel: {
    // Styles for TreeItemLabel (the clickable part)
    display: 'flex',
    alignItems: 'center', // Vertically align icon, text, expander
    width: '100%',
    padding: '4px 8px', // Default padding, can be overridden by size
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    borderRadius: 4, // Slight rounding for the label
  } as ViewProps,
  itemContent: {
    // Styles for TreeItemContent (wrapper for children)
    paddingLeft: 24, // Indentation for children, aligns with typical icon + expander width
    overflow: 'hidden', // For smooth expand/collapse animation if height is transitioned
    borderLeft: '1px solid var(--app-studio-colors-gray-200)', // Guide line for hierarchy
    marginLeft: 12, // Position the guide line relative to the parent's padding start
    paddingTop: 4, // Space above children within the content area
    paddingBottom: 4, // Space below children
  } as ViewProps,
  icon: {
    // Styles for the main icon (folder/file) next to the label
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Prevent icon from shrinking
  } as ViewProps,
  expandIcon: {
    // Styles for the expand/collapse chevron icon
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto', // Push to the right for LTR, or handle differently for RTL
    paddingLeft: 8, // Space before chevron
    flexShrink: 0,
  } as ViewProps,
};

/**
 * Size variations for the Tree component (primarily affects TreeItemLabel padding and font size)
 */
export const TreeSizes: Record<Size, ViewProps> = {
  sm: {
    // Applied to TreeItemLabel or TreeItem
    fontSize: 12,
    padding: '4px 6px', // Reduced padding for smaller items
  },
  md: {
    fontSize: 14,
    padding: '6px 8px', // Default padding defined in itemLabel might be sufficient
  },
  lg: {
    fontSize: 16,
    padding: '8px 10px', // Increased padding for larger items
  },
};

/**
 * Variant styles for the Tree component (applied to TreeItemLabel for visual feedback)
 */
export const TreeItemLabelVariants: Record<Variant, ViewProps> = {
  default: {
    // _hover is part of TreeItemStates.hover
  },
  outline: {
    border: '1px solid',
    borderColor: 'color.gray.300', // Border for each item label
    // _hover applied via TreeItemStates
  },
  filled: {
    backgroundColor: 'color.gray.100', // Filled background for item label
    // _hover applied via TreeItemStates
  },
};

/**
 * States for tree items (typically applied to TreeItemLabel)
 */
export const TreeItemStates = {
  selected: {
    // Style for the selected item's label
    backgroundColor: 'var(--app-studio-colors-blue-100)', // Use CSS var for theming
    color: 'var(--app-studio-colors-blue-700)',
    fontWeight: 'medium',
  },
  hover: {
    // Hover style for any item's label
    backgroundColor: 'var(--app-studio-colors-gray-100)',
  },
  disabled: {
    // Style for a disabled item's label
    opacity: 0.6,
    cursor: 'not-allowed',
    _hover: {
      // Override hover for disabled items
      backgroundColor: 'transparent', // Or its current variant background
    },
  },
};
