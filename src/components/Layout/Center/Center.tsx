import React from 'react';

import { CenterProps } from './Center/Center.props';
import CenterView from './Center/Center.view';

/**
 * The Center component is a React functional component that provides a centered layout for its children using flexbox.
 */
const CenterComponent: React.FC<CenterProps> = (props) => <CenterView {...props} />;

export const Center = CenterComponent;
