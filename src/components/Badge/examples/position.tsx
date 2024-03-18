import React from 'react';
import { Badge } from '../Badge';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Position } from '../Badge/Badge.type';

export const PositionDemo = () => (
  <Horizontal gap={10}>
    {['top-right', 'top-left', 'bottom-right', 'bottom-left'].map(
      (position, index) => (
        <View
          key={index}
          position="relative"
          height="100px"
          width="200px"
          backgroundColor="#F2EFE5"
        >
          <Badge position={position as Position} content={position} />
        </View>
      )
    )}
  </Horizontal>
);
