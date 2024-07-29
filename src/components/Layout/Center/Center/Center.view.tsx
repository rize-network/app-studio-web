import React from 'react';

import { View } from 'app-studio';

import { CenterProps } from './Center.props';

const CenterView: React.FC<CenterProps> = (props: CenterProps) => (
  <View display="flex" justifyContent="center" alignItems="center" {...props} />
);

export default CenterView;
