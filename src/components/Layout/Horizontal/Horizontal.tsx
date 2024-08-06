import React from 'react';
import type { ViewProps } from 'app-studio';
import { View } from 'app-studio';
/**
 * Horizontal layout aligns all the elements in a container on the horizontal axis.
 */
const HorizontalComponent: React.FC<ViewProps> = (props) => (
  <View
    display="flex"
    flexDirection={props.isReversed ? 'row-reverse' : 'row'}
    {...props}
  />
);

export const Horizontal = HorizontalComponent;
