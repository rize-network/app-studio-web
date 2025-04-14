/**
 * CodeBlock Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
  borderRadius: 'md',
  overflow: 'hidden',
  backgroundColor: 'color.gray.900',
  marginY: 'md',
};

export const headerStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'xs',
  backgroundColor: 'color.gray.800',
  borderBottom: '1px solid',
  borderColor: 'color.gray.700',
};

export const contentStyles: ViewProps = {
  padding: 'md',
  overflowX: 'auto',
  fontFamily: 'monospace',
  fontSize: 'sm',
  lineHeight: '1.5',
  color: 'color.gray.100',
};

export const footerStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 'xs',
  backgroundColor: 'color.gray.800',
  borderTop: '1px solid',
  borderColor: 'color.gray.700',
};

export const copyButtonStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 8px',
  borderRadius: 'sm',
  backgroundColor: 'color.gray.700',
  color: 'color.gray.300',
  cursor: 'pointer',
  fontSize: 'xs',
  _hover: {
    backgroundColor: 'color.gray.600',
  },
};

export const languageLabelStyles: ViewProps = {
  padding: '2px 6px',
  borderRadius: 'sm',
  backgroundColor: 'color.gray.700',
  color: 'color.gray.300',
  fontSize: 'xs',
  fontFamily: 'monospace',
};
