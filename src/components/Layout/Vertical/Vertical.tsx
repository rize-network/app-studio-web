import React from 'react';
import VerticalView from './Vertical/Vertical.view';
import { VerticalProps } from './Vertical/Vertical.props';
// Defines the VerticalComponent as a functional component with VerticalProps as its props signature.
const VerticalComponent: React.FC<VerticalProps> = (props) => (
// Renders the VerticalView component, passing all of the received props through to it.
  <VerticalView {...props} />
);
// Exports the VerticalComponent as Vertical for use in other parts of the application.
export const Vertical = VerticalComponent;
