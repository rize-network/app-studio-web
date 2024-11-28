import React from 'react';
import { View } from 'app-studio';
import { HorizontalProps } from './Horizontal.props';

export const HorizontalBase = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithRef<typeof View> & HorizontalProps
>(
  (
    {
      // Sets a default alignment for content within the Horizontal container to 'flex-start'
      justifyContent = 'flex-start',
      // Determines the direction in which the Horizontal elements are stacked, default not reversed
      isReversed = false,
      ...props
    },
    ref
  ) => (
    <View
      display="flex"
      justifyContent={justifyContent}
      flexDirection={isReversed ? 'row-reverse' : 'row'}
      {...props}
      ref={ref}
    />
  )
);

HorizontalBase.displayName = 'Horizontal';

export const Horizontal =
  HorizontalBase as unknown as React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<typeof View> &
      HorizontalProps &
      React.RefAttributes<HTMLElement>
  >;
