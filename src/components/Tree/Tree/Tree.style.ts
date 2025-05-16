import { ViewProps } from 'app-studio';
import { Size, Variant } from './Tree.type';

/**
 * Default styles for the Tree component
 */
export const DefaultTreeStyles = {
  container: {},
  item: {
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  itemLabel: {
    display: 'flex',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  itemContent: {
    paddingLeft: 24,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIcon: {
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

/**
 * Size variations for the Tree component
 */
export const TreeSizes: Record<Size, ViewProps> = {
  sm: {
    fontSize: 12,
    padding: 6,
  },
  md: {
    fontSize: 14,
    padding: 8,
  },
  lg: {
    fontSize: 16,
    padding: 10,
  },
};

/**
 * Variant styles for the Tree component
 */
export const TreeVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  },
  outline: {
    border: '1px solid',
    borderColor: 'color.gray.200',
    borderRadius: 4,
    _hover: {
      backgroundColor: 'color.gray.50',
    },
  },
  filled: {
    backgroundColor: 'color.gray.50',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  },
};

/**
 * States for tree items
 */
export const TreeItemStates = {
  active: {
    backgroundColor: 'color.blue.50',
    color: 'color.blue.600',
  },
  hover: {
    backgroundColor: 'color.gray.100',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    _hover: {
      backgroundColor: 'transparent',
    },
  },
};
