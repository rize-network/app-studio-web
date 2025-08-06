import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const GridDemo = () => (
  <Vertical gap={16}>
    <Text fontSize={16} fontWeight="600">
      Grid Background Effect
    </Text>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Default Grid (30px cells, medium speed)
      </Text>
      <Background.Grid />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Large Grid (fast animation)
      </Text>
      <Background.Grid gridSize={50} animationSpeed="fast" />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Small Grid (slow animation)
      </Text>
      <Background.Grid gridSize={20} animationSpeed="slow" />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Custom Colors
      </Text>
      <Background.Grid
        gridSize={25}
        lineColor="rgba(255, 99, 132, 0.3)"
        pulseColor="rgba(255, 99, 132, 0.8)"
        animationSpeed="medium"
      />
    </Vertical>
  </Vertical>
);
