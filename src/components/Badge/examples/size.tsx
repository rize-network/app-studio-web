import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { Badge } from '../Badge';
import { Size } from '../Badge/Badge.type';
import { View } from 'src/components/Layout/View/View';
export const SizeDemo = () => (
  <Vertical gap={10}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
      <View position="relative" key={index}>
        <Badge content={size} size={size as Size} />
      </View>
    ))}
  </Vertical>
);
