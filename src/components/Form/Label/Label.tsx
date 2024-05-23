import React from 'react';
import { LabelProps } from './Label/Label.props';
import LabelView from './Label/Label.view';
// Import custom type 'LabelProps' to type check the properties passed into the Label component.
const LabelComponent: React.FC<LabelProps> = (props) => (
  // Import 'LabelView' as a visual component for the label, separating the view from business logic.
  <LabelView {...props} />
  // Define 'LabelComponent' as a functional component that uses React's FC type for type checking and utilizing React features.
);
// Pass all properties received by 'LabelComponent' to 'LabelView' using the spread syntax, ensuring it has all props needed for rendering.
export const Label = LabelComponent;
// Export the 'LabelComponent' as 'Label' to be reused throughout the project.
