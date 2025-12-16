import React from 'react';
import { View } from 'app-studio';
import { ProgressBar } from '../ProgressBar';

export const CircularDemo = () => (
  <View display="flex" gap={4}>
    <ProgressBar shape="circle" value={25} showLabel />
    <ProgressBar shape="circle" value={50} color="color.blue.500" showLabel />
    <ProgressBar
      shape="circle"
      value={75}
      color="color.green.500"
      size={80}
      strokeWidth={8}
      showLabel
    />
    <ProgressBar
      shape="circle"
      value={100}
      color="color.red.500"
      size={120}
      strokeWidth={12}
      showLabel
    />
  </View>
);
