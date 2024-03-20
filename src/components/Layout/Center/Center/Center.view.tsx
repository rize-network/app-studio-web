import React from 'react';

import { View } from '../../View/View';

import { CenterProps } from './Center.props';

const CenterView: React.FC<CenterProps> = ({ children, wrap, ...props }) => (
  <View
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexWrap={wrap}
    {...props}
  >
    {children}
  </View>
);

export default CenterView;
