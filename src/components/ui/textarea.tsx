import React from 'react';
import { View, useTheme } from 'app-studio';

// app-studio doesn't export a Textarea component directly, so we use a styled native textarea wrapped in View?
// Or we can just return a styled textarea since app-studio components render to DOM elements.
// But to use app-studio's props, we might need Element or just apply styles manually.
// Wait, `app-studio/Input` might support `as="textarea"`?
// The definition `export interface InputProps ... Omit<Partial<HTMLInputElement>...` suggests it's an input.

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <textarea
        ref={ref}
        style={{
          width: '100%',
          minHeight: '60px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: `1px solid ${theme.colors?.border || '#e2e8f0'}`,
          backgroundColor: 'transparent',
          fontSize: '14px',
          fontFamily: 'inherit',
          outline: 'none', // Handle focus ring if possible, or leave default
          ...style
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
