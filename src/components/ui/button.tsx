import React from 'react';
import { Button as AppStudioButton, ButtonProps as AppStudioButtonProps, useTheme } from 'app-studio';

export interface ButtonProps extends AppStudioButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  className?: string; // Kept for compatibility, but ignored or mapped if possible
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    const { theme } = useTheme();

    // Map size to padding/height
    let height = '36px'; // h-9
    let padding = '0 16px';
    let width = undefined;

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
    let backgroundColor = 'theme.primary';
    let color = 'color.white'; // Assuming primary foreground is white
    let border = undefined;
    let hoverBackgroundColor = undefined;

    switch (variant) {
      case 'destructive':
        backgroundColor = 'color.red.500'; // Approximate
        break;
      case 'outline':
        backgroundColor = 'transparent';
        color = 'theme.foreground'; // Approximate
        border = `1px solid ${theme.colors?.border || '#e2e8f0'}`;
        break;
      case 'secondary':
        backgroundColor = 'theme.secondary';
        color = 'theme.secondaryForeground';
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        color = 'theme.foreground';
        break;
      case 'link':
        backgroundColor = 'transparent';
        color = 'theme.primary';
        // underline handled via style or Text child usually
        break;
    }

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
