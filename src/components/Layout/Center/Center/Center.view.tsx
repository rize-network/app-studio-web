import React from 'react';
import { View } from 'app-studio';
import { CenterProps } from './Center.props';
// Defines a React Functional Component named CenterView which centers its children both horizontally and vertically using flexbox.
const CenterView: React.FC<CenterProps> = (props: CenterProps) => (
  // Renders a 'View' component with display flex and center alignment applied on both axes, passing all received props.
  <View display="flex" justifyContent="center" alignItems="center" {...props} />
);
// Exports the CenterView component for use in other parts of the application.
export default CenterView;
