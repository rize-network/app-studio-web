import React from 'react';
import { Horizontal } from '../../..';
import { View } from '../../../Layout/View/View';

export const ReversedHorizontal = () => (
  <Horizontal isReversed gap={5}>
    <View width={50} height={50} backgroundColor="theme.primary" />
    <View width={50} height={50} backgroundColor="theme.secondary" />
    <View width={50} height={50} backgroundColor="theme.warning" />
  </Horizontal>
);
