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
        padding: '12px 16px',
        borderRadius: '8px',
        border: `1px solid ${hasError ? 'color-red-500' : 'color-gray-200'}`,
        fontSize: '14px',
        lineHeight: '20px',
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: isDisabled ? 'color-gray-50' : 'color-white',
        color: isDisabled ? 'color-gray-400' : 'inherit',
        ...style,
      }}
      _focus={{
        borderColor: hasError ? 'color-red-500' : 'theme-primary',
        boxShadow: `0 0 0 2px white, 0 0 0 4px ${
          hasError ? 'color-red-500' : 'theme-primary'
        }`,
      }}
      _focusVisible={{
        borderColor: hasError ? 'color-red-500' : 'theme-primary',
        boxShadow: `0 0 0 2px white, 0 0 0 4px ${
          hasError ? 'color-red-500' : 'theme-primary'
        }`,
      }}
      {...props}
    />
  );
};

export default TextArea;
