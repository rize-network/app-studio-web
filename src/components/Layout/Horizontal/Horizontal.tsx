import React from 'react';

import { HorizontalProps } from './Horizontal/Horizontal.props';
import HorizontalView from './Horizontal/Horizontal.view';

/**
 * Horizontal layout aligns all the elements in a container on the horizontal axis.
 */
const HorizontalComponent: React.FC<HorizontalProps> = (props) => <HorizontalView {...props} />;

export const Horizontal = HorizontalComponent;
