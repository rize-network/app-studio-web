import React from 'react';
import { View } from 'app-studio';
import { VerticalProps } from './Vertical.props';
// Defines the functional component VerticalView with props specified by VerticalProps
const VerticalView: React.FC<VerticalProps> = ({
// Sets a default alignment for content within the vertical container to 'flex-start'
  justifyContent = 'flex-start',
// Determines the direction in which the vertical elements are stacked, default not reversed
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
// Exports the VerticalView component for use in other parts of the application
export default VerticalView;
