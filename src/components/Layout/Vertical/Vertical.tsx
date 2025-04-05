import React from 'react';
import { View } from 'app-studio';
import { VerticalProps } from './Vertical.props';

export const VerticalBase = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithRef<typeof View> & VerticalProps
>(
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

VerticalBase.displayName = 'Vertical';

export const Vertical =
  VerticalBase as unknown as React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<typeof View> &
      VerticalProps &
      React.RefAttributes<HTMLElement>
  >;
