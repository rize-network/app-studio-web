import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';

export const DirectionsDemo = () => (
  <Vertical gap={16}>
    <Text fontWeight="500">Linear Gradient Directions</Text>
    <Horizontal gap={16} flexWrap="wrap">
      {[
        'to-right',
        'to-left',
        'to-bottom',
        'to-top',
        'to-top-right',
        'to-top-left',
        'to-bottom-right',
        'to-bottom-left',
        '45deg',
      ].map((direction) => (
        <Vertical key={direction} gap={8} width="150px">
          <Text fontSize="14px">{direction}</Text>
          <Gradient
            type="linear"
            direction={direction}
            from="color.blue.500"
            to="color.purple.500"
            height="100px"
            width="100%"
          />
        </Vertical>
      ))}
    </Horizontal>
  </Vertical>
);
