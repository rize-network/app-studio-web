import React from 'react';
import { Vertical } from 'src/components';
import { View } from 'src/components/Layout/View/View';

export const DefaultVertical = () => (
  <Vertical>
    <View height={50} backgroundColor="theme.primary" />
    <View height={50} backgroundColor="theme.secondary" />
    <View height={50} backgroundColor="theme.warning" />
  </Vertical>
);
