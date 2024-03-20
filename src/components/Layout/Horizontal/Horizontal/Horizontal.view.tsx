import React from 'react';
import { View } from '../../../Layout/View/View';

import { HorizontalProps } from './Horizontal.props';

const HorizontalView: React.FC<HorizontalProps> = ({
  children,
  wrap = 'wrap',
  justify = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    flexWrap={wrap}
    flexDirection={isReversed ? 'row-reverse' : 'row'}
    justifyContent={justify}
    {...props}
  >
    {children}
  </View>
);

export default HorizontalView;
