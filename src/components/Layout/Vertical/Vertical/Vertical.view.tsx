import React from 'react';
import { View } from 'app-studio';
import { VerticalProps } from './Vertical.props';

const VerticalView: React.FC<VerticalProps> = ({
  wrap = 'wrap',
  justifyContent = 'flex-start',
  isReversed = false,
  ...props
}) => (
  <View
    display="flex"
    flexWrap={wrap}
    justifyContent={justifyContent}
    flexDirection={isReversed ? 'column-reverse' : 'column'}
    {...props} />
);



export default VerticalView;
