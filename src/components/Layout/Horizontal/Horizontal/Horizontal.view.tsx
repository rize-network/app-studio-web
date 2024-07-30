import React from 'react';
import { View } from 'app-studio';
import { HorizontalProps } from './Horizontal.props';

const HorizontalView: React.FC<HorizontalProps> = ({
  justifyContent = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    flexDirection={isReversed ? 'row-reverse' : 'row'}
    justifyContent={justifyContent}
    {...props}
  />
);

export default HorizontalView;
