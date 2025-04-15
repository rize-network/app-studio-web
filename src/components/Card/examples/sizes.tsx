import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Size } from '../Card/Card.type';

export const SizesDemo = () => {
  const sizes: Size[] = ['sm', 'md', 'lg'];

  return (
    <Vertical gap={20}>
      {sizes.map((size) => (
        <Card key={size} size={size} variant="outlined">
          <Text fontWeight="bold">{size.toUpperCase()} Size</Text>
          <Text color="color.gray.500">This card has {size} padding.</Text>
        </Card>
      ))}
    </Vertical>
  );
};
