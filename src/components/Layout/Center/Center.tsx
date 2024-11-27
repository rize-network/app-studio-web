import React from 'react';
import { View } from 'app-studio';
import { CenterProps } from './Center.props';

const Center = React.forwardRef<HTMLElement, CenterProps>((props, ref) => (
  <View
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...props}
    ref={ref}
  />
));

Center.displayName = 'Center';

export { Center };
export type { CenterProps };
