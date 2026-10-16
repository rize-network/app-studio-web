import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';

export const MulticolorDemo = () => (
  <Vertical gap={16}>
    <Text fontWeight="500">Multi-color Gradients</Text>

    <Vertical gap={8}>
      <Text fontSize="14px">Linear 3-color</Text>
      <Gradient
        type="linear"
        colors={[
          { color: 'color-blue-500', position: '0%' },
          { color: 'color-purple-500', position: '50%' },
          { color: 'color-pink-500', position: '100%' },
        ]}
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontSize="14px">Rainbow</Text>
      <Gradient
        type="linear"
        colors={[
          { color: 'color-red-500', position: '0%' },
          { color: 'color-orange-500', position: '16.67%' },
          { color: 'color-yellow-500', position: '33.33%' },
          { color: 'color-green-500', position: '50%' },
          { color: 'color-blue-500', position: '66.67%' },
          { color: 'color-indigo-500', position: '83.33%' },
          { color: 'color-purple-500', position: '100%' },
        ]}
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontSize="14px">Radial multi-color</Text>
      <Gradient
        type="radial"
        colors={[
          { color: 'color-yellow-300', position: '0%' },
          { color: 'color-orange-500', position: '50%' },
          { color: 'color-red-600', position: '100%' },
        ]}
        height="100px"
        width="100%"
      />
    </Vertical>
  </Vertical>
);
