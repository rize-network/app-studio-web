import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const VariantsDemo = () => {
  return (
    <Vertical gap={20}>
      <Card variant="default">
        <Text>Default Card</Text>
        <Text color="color.gray.500">
          This is a card with the default variant.
        </Text>
      </Card>
      
      <Card variant="outlined">
        <Text>Outlined Card</Text>
        <Text color="color.gray.500">
          This card has a border around it.
        </Text>
      </Card>
      
      <Card variant="elevated">
        <Text>Elevated Card</Text>
        <Text color="color.gray.500">
          This card has a shadow to give it an elevated appearance.
        </Text>
      </Card>
    </Vertical>
  );
};
