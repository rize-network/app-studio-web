import React from 'react';
import type { ViewProps } from 'app-studio';
import { View } from 'app-studio';
// Defines a functional component 'HorizontalComponent' utilizing 'ViewProps'. It leverages flexbox to create a horizontal view, which can be reversed based on a prop.
const HorizontalComponent: React.FC<ViewProps> = (props) => (
  <View
    display="flex"
    flexDirection={props.isReversed ? 'row-reverse' : 'row'}
    {...props}
  />
);
// Exports the HorizontalComponent as 'Horizontal', making it available for use in other parts of the application.
export const Horizontal = HorizontalComponent;
