import React from 'react';
import { SeparatorProps } from './Separator/Separator.props';
import { SeparatorView } from './Separator/Separator.view';
// Defines the primary Separator functional component, which acts as a simple wrapper to render the SeparatorView, and is also exported as Divider.
const SeparatorComponent: React.FC<SeparatorProps> = (props) => {
  return <SeparatorView {...props} />;
};
export const Separator = SeparatorComponent;
export const Divider = SeparatorComponent;
