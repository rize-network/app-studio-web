import React from 'react';
import { View } from 'app-studio';
import { VerticalProps } from './Vertical.props';

const VerticalView = React.forwardRef<HTMLElement, VerticalProps>(
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

VerticalView.displayName = 'VerticalView';

export { VerticalView };
