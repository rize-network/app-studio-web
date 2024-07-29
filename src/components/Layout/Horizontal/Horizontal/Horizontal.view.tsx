import React from 'react';
import { View } from 'app-studio';
import { HorizontalProps } from './Horizontal.props';

const HorizontalView: React.FC<HorizontalProps> = ({
  wrap = 'wrap',
  justifyContent = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    flexWrap={wrap}
    flexDirection={isReversed ? 'row-reverse' : 'row'}
    justifyContent={justifyContent}
    {...props}
  />
);

export default HorizontalView;
