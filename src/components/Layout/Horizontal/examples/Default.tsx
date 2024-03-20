import React from 'react';

import { View } from '../../../Layout/View/View';
import { Horizontal } from '../../Horizontal/Horizontal';

export const DefaultHorizontal = () => (
  <Horizontal>
    <View width={50} height={50} backgroundColor="theme.primary" />
    <View
      width={50}
      height={50}
      backgroundColor="theme.secondary"
      margin="0 10px "
    />
    <View width={50} height={50} backgroundColor="theme.warning" />
  </Horizontal>
);
