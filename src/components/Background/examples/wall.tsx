import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const WallDemo = () => (
  <Vertical gap={16}>
    <Text fontSize={16} fontWeight="600">
      Wall Background Effect
    </Text>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Default Wall (15x10 grid)
      </Text>
      <Background.Wall />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Custom Wall (8x6 grid, larger squares)
      </Text>
      <Background.Wall rows={8} cols={6} squareSize={50} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Small Wall (12x8 grid, smaller squares)
      </Text>
      <Background.Wall rows={12} cols={8} squareSize={25} />
    </Vertical>
  </Vertical>
);
