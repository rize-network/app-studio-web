import React from 'react';
import { View } from 'app-studio';
import { HorizontalProps } from './Horizontal.props';
// Defines the HorizontalView functional component using destructuring to extract default props from HorizontalProps.
const HorizontalView: React.FC<HorizontalProps> = ({
  // Sets the default alignment of items along the main axis to 'flex-start'.
  justifyContent = 'flex-start',
  // Determines if the flex items are displayed in reverse order by default as false.
  isReversed = false,
  // Spreads the remaining props to be passed to the View component.
  ...props
}) => (
  <View
    display="flex"
    flexDirection={isReversed ? 'row-reverse' : 'row'}
    justifyContent={justifyContent}
    {...props}
  />
);
// Exports the HorizontalView component for use in other parts of the application.
export default HorizontalView;
