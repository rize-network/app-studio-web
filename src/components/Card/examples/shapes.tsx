import React from 'react';
import { Card } from '../Card';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Shape } from '../Card/Card.type';

export const ShapesDemo = () => {
  const shapes: Shape[] = ['square', 'rounded', 'pill'];

  return (
    <Vertical gap={20}>
      {shapes.map((shape) => (
        <Card key={shape} shape={shape} variant="outlined">
          <Text fontWeight="bold">{shape} Card</Text>
          <Text color="color-gray-500">
            This card has {shape === 'square' ? 'no' : shape} corners.
          </Text>
        </Card>
      ))}
    </Vertical>
  );
};
