import React from 'react';
import { CenterView } from './Center/Center.view';
import { CenterProps } from './Center/Center.props';

export const Center: React.FC<CenterProps> = (props) => (
  <CenterView {...props} />
);
