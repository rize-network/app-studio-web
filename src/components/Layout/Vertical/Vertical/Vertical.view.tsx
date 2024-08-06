import React from 'react';
import { View } from 'app-studio';
import { VerticalProps } from './Vertical.props';

const VerticalView: React.FC<VerticalProps> = ({
  justifyContent = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    justifyContent={justifyContent}
    flexDirection={isReversed ? 'column-reverse' : 'column'}
    {...props}
  />
);

export default VerticalView;
