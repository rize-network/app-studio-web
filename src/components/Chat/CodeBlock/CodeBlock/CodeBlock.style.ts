/**
 * CodeBlock Styles
 *
 * Styles for the CodeBlock component following the design guidelines
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
  borderRadius: '8px', // Consistent with design system (rounded-md)
  overflow: 'hidden',
  backgroundColor: 'color.gray.900',
  marginTop: '16px', // 16px margin (4px grid)
  border: '1px solid',
  borderColor: 'color.gray.800',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // Subtle shadow for depth
};

export const headerStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px', // Consistent padding (4px grid)
  backgroundColor: 'color.gray.800',
  borderBottom: '1px solid',
  borderColor: 'color.gray.700',
  height: '40px', // Standard height for interactive elements
};

export const contentStyles: ViewProps = {
  padding: '16px', // 16px padding (4px grid)
  overflowX: 'auto',
  fontFamily: 'monospace',
  fontSize: 'sm', // Smaller text for code (14px)
  lineHeight: '1.6', // Improved line height for readability
  color: 'color.gray.100',
};

export const footerStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '8px 12px', // Consistent padding (4px grid)
  backgroundColor: 'color.gray.800',
  borderTop: '1px solid',
  borderColor: 'color.gray.700',
  height: '40px', // Standard height for interactive elements
};

export const copyButtonStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 8px', // Consistent padding (4px grid)
  borderRadius: '4px', // Consistent with design system
  backgroundColor: 'color.gray.700',
  color: 'color.gray.300',
  cursor: 'pointer',
  fontSize: 'xs', // Small text (12px)
  fontWeight: '500', // Medium weight for better readability
  transition: 'background-color 0.2s ease', // Smooth transition for hover
  _hover: {
    backgroundColor: 'color.gray.600',
  },
  _active: {
    backgroundColor: 'color.gray.500', // Feedback for click
  },
};

export const languageLabelStyles: ViewProps = {
  padding: '2px 6px', // Compact padding
  borderRadius: '4px', // Consistent with design system
  backgroundColor: 'color.gray.700',
  color: 'color.gray.300',
  fontSize: 'xs', // Small text (12px)
  fontWeight: '500', // Medium weight for better readability
  fontFamily: 'monospace',
  letterSpacing: '-0.01em', // Slight negative tracking
};
