import React from 'react';
import { Input as AppStudioInput, InputProps as AppStudioInputProps, useTheme } from 'app-studio';

export interface InputProps extends AppStudioInputProps {
  className?: string; // Kept for compatibility
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const themeContext = useTheme();
    const borderColor = themeContext.colors?.palette?.gray?.[200] || '#e2e8f0';

    return (
      <AppStudioInput
        ref={ref}
        height="36px" // h-9
        width="100%"
        padding="4px 12px" // py-1 px-3
        borderRadius="6px" // rounded-md
        border={`1px solid ${borderColor}`}
        backgroundColor="transparent"
        fontSize="14px"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
