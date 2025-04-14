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
  backgroundColor: 'color.gray.900',
  color: 'color.white',
  padding: 'md',
  borderRadius: 'md',
  overflowX: 'auto',
  marginY: 'md',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: 'color.gray.950',
  },
};

export const inlineCodeStyles: ViewProps = {
  fontFamily: 'monospace',
  backgroundColor: 'color.gray.100',
  padding: '0 4px',
  borderRadius: 'sm',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: 'color.gray.700',
  },
};

export const citationStyles: ViewProps = {
  backgroundColor: 'color.blue.50',
  borderLeft: '3px solid',
  borderColor: 'color.blue.500',
  padding: 'sm',
  marginY: 'sm',
  borderRadius: 'sm',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: 'color.blue.900',
    borderColor: 'color.blue.400',
  },
};

export const linkStyles: ViewProps = {
  color: 'color.blue.600',
  textDecoration: 'underline',
  _hover: {
    color: 'color.blue.800',
  },
  '@media (prefers-color-scheme: dark)': {
    color: 'color.blue.400',
    _hover: {
      color: 'color.blue.300',
    },
  },
};
