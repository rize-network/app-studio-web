import React from 'react';
import { CenterProps } from './Center/Center.props';
import CenterView from './Center/Center.view';
// Defines a functional component named CenterComponent utilizing React's functional component structure, which expects props of the CenterProps type.
const CenterComponent: React.FC<CenterProps> = (props) => (
  // Renders the CenterView component, passing down all the props received by the CenterComponent.
  <CenterView {...props} />
);
// Exports CenterComponent as Center, making it available for use in other parts of the application.
export const Center = CenterComponent;
