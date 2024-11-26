import React from 'react';
import { View } from 'app-studio';
import { CenterProps } from './Center.props';

const Center = React.forwardRef<HTMLElement, CenterProps>(
  (
    {
      // Sets a default alignment for content within the Center container to 'flex-start'
      // Determines the direction in which the Center elements are stacked, default not reversed
      isReversed = false,
      ...props
    },
    ref
  ) => (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
      ref={ref}
    />
  )
);

Center.displayName = 'Center';

export { Center };
export type { CenterProps };
