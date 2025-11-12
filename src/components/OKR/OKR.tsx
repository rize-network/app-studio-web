import React from 'react';
import { OKRProps } from './OKR/OKR.props';
import OKRView from './OKR/OKR.view';

/**
 * OKR component renders a collection of Objectives and their Key Results with progress tracking.
 */
const OKRComponent: React.FC<OKRProps> = (props) => <OKRView {...props} />;

export const OKR = OKRComponent;
