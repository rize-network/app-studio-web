import React from 'react';
import { Separator } from '../Separator';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Card } from '../../Card/Card';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const SeparatorInCard = () => {
  return (
    <Card variant="outlined" shape="rounded" isFullWidth>
      <Card.Header>
        <Text fontWeight="bold" size="lg">Card Title</Text>
      </Card.Header>
      <Card.Content>
        <Vertical gap={16}>
          <Text>
            This is the first section of content in the card. The separator below
            helps to organize the content into distinct sections.
          </Text>
          <Separator spacing="8px" />
          <Text>
            This is the second section of content. Notice how the separator creates
            a clear visual distinction between content areas within the card.
          </Text>
          <Separator label="ADDITIONAL INFORMATION" spacing="8px" />
          <Text>
            This is the third section with additional information. The labeled
            separator provides context for this section.
          </Text>
        </Vertical>
      </Card.Content>
      <Card.Footer>
        <Text size="sm" color="color.gray.500">Card Footer</Text>
      </Card.Footer>
    </Card>
  );
};
