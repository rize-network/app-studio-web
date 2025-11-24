import React from 'react';
import { View, useTheme } from 'app-studio';

export const Separator = React.forwardRef<HTMLDivElement, any>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const { theme } = useTheme();
    const borderColor = theme.colors?.border || '#e2e8f0';

    return (
      <View
        ref={ref}
        {...(orientation === 'horizontal'
          ? { height: '1px', width: '100%' }
          : { height: '100%', width: '1px' })}
        backgroundColor={borderColor}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
