import React from 'react';
import { Button as AppStudioButton, ButtonProps as AppStudioButtonProps, useTheme } from 'app-studio';

export interface ButtonProps extends Omit<AppStudioButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  className?: string; // Kept for compatibility, but ignored or mapped if possible
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    const themeContext = useTheme();
    // Safely access colors. theme object in types might not have it directly if strict,
    // but useTheme returns colors: Colors object.
    const colors = themeContext.colors;

    // Map size to padding/height
    let height: string | number = '36px'; // h-9
    let padding = '0 16px';
    let width: string | number | undefined = undefined;

    switch (size) {
      case 'sm':
        height = '32px'; // h-8
        padding = '0 12px';
        break;
      case 'lg':
        height = '40px'; // h-10
        padding = '0 24px';
        break;
      case 'icon':
        height = '36px'; // size-9
        width = '36px';
        padding = '0';
        break;
    }

    // Map variant to colors/borders
    let backgroundColor = themeContext.theme.primary || colors?.main?.primary || 'blue';
    let color = 'white'; // Assuming primary foreground is white
    let border = undefined;

    // Fallback colors if theme values are missing
    const destructiveColor = themeContext.theme.error || colors?.main?.error || 'red';
    const secondaryColor = themeContext.theme.secondary || colors?.main?.secondary || 'gray';
    const foregroundColor = 'black'; // simplified

    switch (variant) {
      case 'destructive':
        backgroundColor = destructiveColor;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        color = foregroundColor;
        border = `1px solid ${colors?.palette?.gray?.[300] || '#e2e8f0'}`;
        break;
      case 'secondary':
        backgroundColor = secondaryColor;
        color = foregroundColor;
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        color = foregroundColor;
        break;
      case 'link':
        backgroundColor = 'transparent';
        color = themeContext.theme.primary || colors?.main?.primary || 'blue';
        // underline handled via style or Text child usually
        break;
    }

    // Cast height/width to any if type mismatch persists, or ensure they match AppStudio expectations.
    // In many cases AppStudio accepts string | number.

    return (
      <AppStudioButton
        ref={ref}
        height={height}
        width={width}
        padding={padding}
        backgroundColor={backgroundColor}
        color={color}
        border={border}
        borderRadius="6px" // rounded-md
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        gap={8}
        fontSize="14px"
        fontWeight="medium"
        cursor="pointer"
        {...props}
      >
        {children}
      </AppStudioButton>
    );
  }
);

Button.displayName = 'Button';
