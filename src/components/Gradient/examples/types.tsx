import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';

export const TypesDemo = () => (
  <Vertical gap={16}>
    <Vertical gap={8}>
      <Text fontWeight="500">Linear Gradient</Text>
      <Gradient
        type="linear"
        from="color-blue-500"
        to="color-purple-500"
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontWeight="500">Radial Gradient</Text>
      <Gradient
        type="radial"
        from="color-blue-500"
        to="color-purple-500"
        height="100px"
        width="100%"
      />
    </Vertical>

    <Vertical gap={8}>
      <Text fontWeight="500">Conic Gradient</Text>
      <Gradient
        type="conic"
        colors={[
          { color: 'color-red-500', position: '0deg' },
          { color: 'color-yellow-500', position: '90deg' },
          { color: 'color-green-500', position: '180deg' },
          { color: 'color-blue-500', position: '270deg' },
          { color: 'color-red-500', position: '360deg' },
        ]}
        height="100px"
        width="100%"
      />
    </Vertical>
  </Vertical>
);
