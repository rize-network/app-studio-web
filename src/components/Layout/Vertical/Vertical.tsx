import React from 'react';
import { VerticalProps } from './Vertical.props';

const Vertical = React.forwardRef<HTMLDivElement, VerticalProps>(
  ({ justifyContent = 'flex-start', isReversed = false, ...props }, ref) => (
    <div
      style={{
        display: 'flex',
        justifyContent: justifyContent,
        flexDirection: isReversed ? 'column-reverse' : 'column',
      }}
      {...props}
      ref={ref}
    />
  )
);

Vertical.displayName = 'Vertical';

export { Vertical };
export type { VerticalProps };
