import React from 'react';
import { OKRProps } from './OKR/OKR.props';
import { OKRView } from './OKR/OKR.view';

export const OKR: React.FC<OKRProps> = (props) => <OKRView {...props} />;
