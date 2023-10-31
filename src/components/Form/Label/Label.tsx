import React from 'react';

import { LabelProps } from './Label/Label.props';
import LabelView from './Label/Label.view';

const LabelComponent: React.FC<LabelProps> = (props) => <LabelView {...props} />;

export const Label = LabelComponent;
