import React from 'react';
import { HorizontalView } from './Horizontal/Horizontal.view';
import { HorizontalProps } from './Horizontal/Horizontal.props';

export const Horizontal: React.FC<HorizontalProps> = (props) => (
  <HorizontalView {...props} />
);
