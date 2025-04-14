/**
 * AIResponseDisplay Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
};

export const textStyles: ViewProps = {
  fontSize: 'md',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

export const codeBlockStyles: ViewProps = {
  fontFamily: 'monospace',
  backgroundColor: 'color.gray.800',
  color: 'color.white',
  padding: 'md',
  borderRadius: 'md',
  overflowX: 'auto',
  marginY: 'md',
};

export const inlineCodeStyles: ViewProps = {
  fontFamily: 'monospace',
  backgroundColor: 'color.gray.100',
  padding: '0 4px',
  borderRadius: 'sm',
};

export const citationStyles: ViewProps = {
  backgroundColor: 'color.blue.50',
  borderLeft: '3px solid',
  borderColor: 'color.blue.500',
  padding: 'sm',
  marginY: 'sm',
  borderRadius: 'sm',
};
