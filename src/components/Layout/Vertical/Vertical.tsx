import React from 'react';

import { VerticalProps } from './Vertical/Vertical.props';
import VerticalView from './Vertical/Vertical.view';

/**
 * Vertical layout aligns all the elements in a container on the vertical axis.
 */

const VerticalComponent: React.FC<VerticalProps> = (props) => (
  <VerticalView {...props} />
);

export const Vertical = VerticalComponent;
