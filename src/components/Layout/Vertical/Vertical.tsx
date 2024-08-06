import React from 'react';

import VerticalView from './Vertical/Vertical.view';
import { VerticalProps } from './Vertical/Vertical.props';

/**
 * Vertical layout aligns all the elements in a container on the vertical axis.
 */

const VerticalComponent: React.FC<VerticalProps> = (props) => (
  <VerticalView {...props} />
);

export const Vertical = VerticalComponent;
