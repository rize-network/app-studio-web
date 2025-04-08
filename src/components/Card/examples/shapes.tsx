import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Shape } from '../Card/Card.type';

export const ShapesDemo = () => {
  const shapes: Shape[] = ['sharp', 'rounded', 'pillShaped'];
  
  return (
    <Vertical gap={20}>
      {shapes.map((shape) => (
        <Card key={shape} shape={shape} variant="outlined">
          <Text fontWeight="bold">{shape} Card</Text>
          <Text color="color.gray.500">
            This card has {shape === 'sharp' ? 'no' : shape} corners.
          </Text>
        </Card>
      ))}
    </Vertical>
  );
};
