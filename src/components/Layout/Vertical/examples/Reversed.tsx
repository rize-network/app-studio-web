import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';

import { View } from '../../../Layout/View/View';

export const ReversedVertical = () => (
  <Vertical isReversed gap={5}>
    <View height={50} backgroundColor="theme.primary" />
    <View height={50} backgroundColor="theme.secondary" />
    <View height={50} backgroundColor="theme.warning" />
  </Vertical>
);
