/**
 * AIResponseDisplay Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
  // Adding spacing based on 4px grid system
  paddingTop: '4px',
};

export const textStyles: ViewProps = {
  // Typography guidelines: body text uses sans-serif font at 16px

  fontSize: 'md', // 16px
  fontWeight: '500', // Medium weight for better readability
  lineHeight: '1.6', // Generous line height for readability
  letterSpacing: '-0.011em', // Slight negative tracking for modern look
  color: 'color.gray.900', // High contrast for readability
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

export const codeBlockStyles: ViewProps = {
  fontFamily: 'monospace',
  backgroundColor: 'color.gray.900',
  color: 'color.white',
  padding: '16px', // 16px padding (4px grid)
  borderRadius: '8px', // Consistent with other components (rounded-md)
  border: '1px solid',
  borderColor: 'color.gray.800',
  overflowX: 'auto',
  // Consistent spacing based on 4px grid
  marginTop: '16px',
  // Shadow for depth
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

export const inlineCodeStyles: ViewProps = {
  fontFamily: 'monospace',
  backgroundColor: 'color.gray.100',
  padding: '0 4px', // Horizontal padding only
  borderRadius: '4px', // Consistent with design system
  fontSize: '0.9em', // Slightly smaller than surrounding text
  fontWeight: '500', // Medium weight
  color: 'color.gray.900',
};

export const citationStyles: ViewProps = {
  backgroundColor: 'color.blue.50',
  borderLeft: '3px solid', // Accent border
  borderColor: 'color.blue.500',
  padding: '12px', // 12px padding (3x4px grid)
  marginTop: '16px', // 16px margin (4x4px grid)
  borderRadius: '4px', // Consistent with design system
  fontSize: 'sm', // Smaller text for citations
};

export const linkStyles: ViewProps = {
  color: 'color.blue.600', // Semantic color for links
  textDecoration: 'underline',
  fontWeight: '500', // Medium weight for better visibility
  transition: 'color 0.2s ease', // Smooth transition for hover state
  _hover: {
    color: 'color.blue.800',
  },
};
