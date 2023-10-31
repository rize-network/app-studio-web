import React from 'react';
import { View } from 'app-studio';

import { VerticalProps } from './Vertical.props';

const VerticalView: React.FC<VerticalProps> = ({
  children,
  wrap = 'nowrap',
  justify = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    flexWrap={wrap}
    flexDirection={isReversed ? 'column-reverse' : 'column'}
    justifyContent={justify}
    {...props}
  >
    {children}
  </View>
);
export default VerticalView;
