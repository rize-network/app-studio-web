'use client';

import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './ChatInput.type';

/**
 * Default styles for the ChatInput component
 */
export const DefaultChatInputStyles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: '12px',
    backgroundColor: 'color.gray.50',
    transition: 'all 0.2s ease',
  },
  content: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
  },
  textarea: {
    width: '100%',
    minHeight: '40px',
    maxHeight: '200px',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'color.gray.900',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
  },
  attachments: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '8px 0',
  },
  attachmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: 'color.gray.100',
  },
  attachmentName: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'color.gray.700',
  },
  attachmentSize: {
    fontSize: '10px',
    color: 'color.gray.500',
  },
  attachmentRemove: {
    padding: '2px',
    borderRadius: '50%',
    cursor: 'pointer',
    color: 'color.gray.500',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    height: '36px',
    minWidth: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'theme.primary',
    color: 'color.white',
    transition: 'all 0.2s ease',
  },
  fileButton: {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'color.gray.500',
    transition: 'all 0.2s ease',
  },
  modelSelector: {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'color.gray.500',
    transition: 'all 0.2s ease',
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 0',
  },
};

/**
 * Shape styles for the ChatInput component
 */
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: '8px',
  },
  sharp: {
    borderRadius: '0px',
  },
  rounded: {
    borderRadius: '8px',
  },
};

/**
 * Size styles for the ChatInput component
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    fontSize: '10px',
    padding: '4px 8px',
  },
  sm: {
    fontSize: '12px',
    padding: '6px 10px',
  },
  md: {
    fontSize: '14px',
    padding: '8px 12px',
  },
  lg: {
    fontSize: '16px',
    padding: '10px 14px',
  },
  xl: {
    fontSize: '20px',
    padding: '12px 16px',
  },
};

/**
 * Variant styles for the ChatInput component
 */
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.300',
  },
  none: {
    backgroundColor: 'transparent',
    border: 'none',
  },
};
