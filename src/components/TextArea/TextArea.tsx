/**
 * TextArea Component
 *
 * A simple textarea component with styling.
 */

import React from 'react';
import { View } from 'app-studio';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Number of rows to display
   */
  rows?: number;

  /**
   * Whether the textarea is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the textarea has an error
   */
  hasError?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  rows = 3,
  isDisabled,
  hasError,
  className,
  style,
  ...props
}) => {
  return (
    <View
      as="textarea"
      rows={rows}
      disabled={isDisabled}
      className={className}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '4px',
        border: `1px solid ${hasError ? 'red' : '#e2e8f0'}`,
        fontSize: '14px',
        lineHeight: '1.5',
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        backgroundColor: isDisabled ? '#f7fafc' : 'white',
        color: isDisabled ? '#a0aec0' : 'inherit',
        ...style,
      }}
      _focus={{
        borderColor: hasError ? 'red' : '#3182ce',
        boxShadow: `0 0 0 1px ${hasError ? 'red' : '#3182ce'}`,
      }}
      {...props}
    />
  );
};

export default TextArea;
