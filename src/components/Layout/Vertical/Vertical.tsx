import React from 'react';
import { VerticalView } from './Vertical/Vertical.view';
import { VerticalProps } from './Vertical/Vertical.props';

export const Vertical: React.FC<VerticalProps> = (props) => (
  <VerticalView {...props} />
);
