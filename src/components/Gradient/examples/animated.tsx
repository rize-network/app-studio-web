import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const AnimatedDemo = () => (
  <Vertical gap={16}>
    <Text fontWeight="500">Animated Gradients</Text>

    <Vertical gap={8}>
      <Text fontSize="14px">Animated Linear</Text>
      <Gradient
        type="linear"
        from="color.blue.500"
        to="color.purple.500"
        animate={true}
        animationDuration={5}
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontSize="14px">Animated Radial</Text>
      <Gradient
        type="radial"
        from="color.blue.500"
        to="color.purple.500"
        animate={true}
        animationDuration={5}
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontSize="14px">Animated Conic</Text>
      <Gradient
        type="conic"
        colors={[
          { color: 'color.red.500', position: '0deg' },
          { color: 'color.yellow.500', position: '90deg' },
          { color: 'color.green.500', position: '180deg' },
          { color: 'color.blue.500', position: '270deg' },
          { color: 'color.red.500', position: '360deg' },
        ]}
        animate={true}
        animationDuration={8}
        height="100px"
        width="100%"
      />
    </Vertical>
  </Vertical>
);
