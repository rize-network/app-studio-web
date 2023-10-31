import React from 'react';
import { Vertical } from '../../..';
import { View } from '../../../Layout/View/View';

export const DefaultVertical = () => (
  <Vertical>
    <View height={50} backgroundColor="theme.primary" />
    <View height={50} backgroundColor="theme.secondary" />
    <View height={50} backgroundColor="theme.warning" />
  </Vertical>
);
