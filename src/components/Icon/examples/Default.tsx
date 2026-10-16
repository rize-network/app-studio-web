import React from 'react';
import { Horizontal, Vertical, Text } from 'app-studio';
import { Icon } from '../Icon';

export const DefaultIcon = () => (
  <Horizontal gap={16} flexWrap="wrap" alignItems="center">
    <Icon name="home" widthHeight={28} color="theme-primary" />
    <Icon name="settings" widthHeight={28} color="color-gray-700" />
    <Icon name="heart" widthHeight={28} color="color-red-500" filled />
    <Icon name="star" widthHeight={28} color="color-amber-500" filled />
    <Icon name="bell" widthHeight={28} color="color-gray-700" />
    <Vertical alignItems="center" gap={4}>
      <Icon name="circle-help" widthHeight={28} color="color-blue-500" />
      <Text fontSize={10} color="color-gray-500">
        by name
      </Text>
    </Vertical>
  </Horizontal>
);
