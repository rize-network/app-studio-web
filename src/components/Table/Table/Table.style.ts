/**
 * Table Styles
 *
 * Defines the styles for the Table component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { TableViewStyles } from './Table.type';

/**
 * Default table styles following the design system
 */
export const DefaultTableStyles: TableViewStyles = {
  table: {
    width: '100%',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    borderRadius: '8px', // 2 × 4px grid
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid',
    borderColor: 'color.gray.200',
    transition: 'all 0.2s ease',
  },
  thead: {
    backgroundColor: 'color.gray.50',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
  },
  th: {
    padding: '12px 16px', // 3 × 4px and 4 × 4px grid
    fontWeight: '600',
    fontSize: '14px',
    color: 'color.gray.700',
    textAlign: 'left',
  },
  td: {
    padding: '12px 16px', // 3 × 4px and 4 × 4px grid
    fontSize: '14px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.100',
  },
  tr: {
    transition: 'background-color 0.2s ease',
    _hover: {
      backgroundColor: 'color.gray.50',
    },
  },
  tfoot: {
    backgroundColor: 'color.gray.50',
    fontWeight: '600',
    borderTop: '2px solid',
    borderTopColor: 'color.gray.200',
  },
  caption: {
    margin: '8px 0', // 2 × 4px grid
    color: 'color.gray.600',
    fontSize: '14px',
    fontStyle: 'italic',
  },
};

/**
 * Compact table styles
 */
export const CompactTableStyles: TableViewStyles = {
  ...DefaultTableStyles,
  th: {
    ...DefaultTableStyles.th,
    padding: '8px 12px', // 2 × 4px and 3 × 4px grid
    fontSize: '12px',
  },
  td: {
    ...DefaultTableStyles.td,
    padding: '8px 12px', // 2 × 4px and 3 × 4px grid
    fontSize: '12px',
  },
};

/**
 * Striped table styles
 */
export const StripedTableStyles: TableViewStyles = {
  ...DefaultTableStyles,
  tr: {
    ...DefaultTableStyles.tr,
    _even: {
      backgroundColor: 'color.gray.50',
    },
  },
};

/**
 * Bordered table styles
 */
export const BorderedTableStyles: TableViewStyles = {
  ...DefaultTableStyles,
  td: {
    ...DefaultTableStyles.td,
    borderRight: '1px solid',
    borderRightColor: 'color.gray.100',
  },
  th: {
    ...DefaultTableStyles.th,
    borderRight: '1px solid',
    borderRightColor: 'color.gray.200',
  },
};

/**
 * Dark theme table styles
 */
export const DarkTableStyles: TableViewStyles = {
  table: {
    ...DefaultTableStyles.table,
    backgroundColor: 'color.gray.800',
    borderColor: 'color.gray.700',
  },
  thead: {
    backgroundColor: 'color.gray.900',
    borderBottomColor: 'color.gray.700',
  },
  th: {
    ...DefaultTableStyles.th,
    color: 'color.gray.100',
  },
  td: {
    ...DefaultTableStyles.td,
    color: 'color.gray.300',
    borderBottomColor: 'color.gray.700',
  },
  tr: {
    ...DefaultTableStyles.tr,
    _hover: {
      backgroundColor: 'color.gray.700',
    },
  },
  tfoot: {
    ...DefaultTableStyles.tfoot,
    backgroundColor: 'color.gray.900',
    borderTopColor: 'color.gray.700',
  },
  caption: {
    ...DefaultTableStyles.caption,
    color: 'color.gray.400',
  },
};
