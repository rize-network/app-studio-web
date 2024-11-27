import React from 'react';
import { VerticalProps } from './Vertical.props';
import { View } from 'app-studio';

const Vertical = React.forwardRef<HTMLElement, VerticalProps>(
  (
    {
      // Sets a default alignment for content within the Vertical container to 'flex-start'
      justifyContent = 'flex-start',
      // Determines the direction in which the Vertical elements are stacked, default not reversed
      isReversed = false,
      ...props
    },
    ref
  ) => (
    <View
      display="flex"
      justifyContent={justifyContent}
      flexDirection={isReversed ? 'column-reverse' : 'column'}
      {...props}
      ref={ref}
    />
  )
);

Vertical.displayName = 'Vertical';

export { Vertical };
export type { VerticalProps };
