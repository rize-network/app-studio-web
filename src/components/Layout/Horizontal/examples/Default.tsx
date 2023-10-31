import React from 'react';
import { Horizontal } from 'src/components';
import { View } from 'src/components/Layout/View/View';

export const DefaultHorizontal = () => (
  <Horizontal>
    <View width={50} height={50} backgroundColor="theme.primary" />
    <View width={50} height={50} backgroundColor="theme.secondary" margin="0 10px " />
    <View width={50} height={50} backgroundColor="theme.warning" />
  </Horizontal>
);
