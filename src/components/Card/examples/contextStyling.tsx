import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ContextStylingDemo = () => {
  return (
    <Card
      views={{
        // These styles will be passed down to all child components via context
        container: {
          backgroundColor: 'color.blue.50',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        header: {
          backgroundColor: 'color.blue.100',
          padding: '16px',
          borderBottomColor: 'color.blue.200',
        },
        content: {
          padding: '24px',
        },
        footer: {
          backgroundColor: 'color.blue.100',
          padding: '16px',
          borderTopColor: 'color.blue.200',
        },
      }}
    >
      <Card.Header>
        <Text fontWeight="bold" fontSize={18}>
          Context-Based Styling
        </Text>
      </Card.Header>

      <Card.Content>
        <Text>
          This card demonstrates the improved context-based styling system. The
          styles defined in the Cards views prop are automatically passed down
          to the Header, Content, and Footer components.
        </Text>
      </Card.Content>

      <Card.Footer>
        <Horizontal justifyContent="flex-end" gap={10}>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </Horizontal>
      </Card.Footer>
    </Card>
  );
};
