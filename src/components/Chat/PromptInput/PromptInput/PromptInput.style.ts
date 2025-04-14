/**
 * PromptInput Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
  position: 'relative',
};

export const getInputContainerStyles = (
  transparentBackground: boolean
): ViewProps => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '1.5rem',
  border: '1px solid',
  borderColor: transparentBackground ? 'color.gray.800' : 'color.gray.100',
  backgroundColor: transparentBackground
    ? 'color.gray.400/5'
    : 'color.white/90',
  transition: 'all 0.2s ease',
  padding: '1px',
  _hover: {
    borderColor: transparentBackground ? 'color.gray.800' : 'color.gray.200',
  },
  _focusWithin: {
    borderColor: transparentBackground ? 'color.gray.800' : 'color.gray.200',
  },
  '@media (prefers-color-scheme: dark)': {
    borderColor: transparentBackground ? 'color.gray.850' : 'color.gray.850',
    _hover: {
      borderColor: transparentBackground ? 'color.gray.800' : 'color.gray.800',
    },
    _focusWithin: {
      borderColor: transparentBackground ? 'color.gray.800' : 'color.gray.800',
    },
  },
});

export const textareaStyles: ViewProps = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'transparent',
  fontSize: 'md',
  lineHeight: '1.5',
  resize: 'none',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  _disabled: {
    cursor: 'not-allowed',
  },
  '@media (prefers-color-scheme: dark)': {
    color: 'color.gray.100',
  },
};

export const buttonsContainerStyles: ViewProps = {
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  display: 'flex',
  gap: 'xs',
};

export const suggestionsContainerStyles: ViewProps = {
  position: 'absolute',
  top: '-8px',
  left: '0',
  right: '0',
  transform: 'translateY(-100%)',
  backgroundColor: 'color.white',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'color.gray.200',
  boxShadow: 'md',
  zIndex: 10,
  maxHeight: '200px',
  overflowY: 'auto',
};

export const suggestionStyles = (isSelected: boolean): ViewProps => ({
  padding: 'sm',
  cursor: 'pointer',
  backgroundColor: isSelected ? 'color.gray.100' : 'transparent',
  _hover: {
    backgroundColor: 'color.gray.100',
  },
});
