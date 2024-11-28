import React from 'react';
import { View } from 'app-studio';
import { CenterProps } from './Center.props';

export const CenterBase = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithRef<typeof View> & CenterProps
>(
  (
    {
      // Sets a default alignment for content within the Center container to 'flex-start'
      justifyContent = 'flex-start',
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

CenterBase.displayName = 'Center';

export const Center = CenterBase as unknown as React.ForwardRefExoticComponent<
  React.ComponentPropsWithRef<typeof View> &
    CenterProps &
    React.RefAttributes<HTMLElement>
>;
