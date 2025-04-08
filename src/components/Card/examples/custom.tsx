import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Button } from '../../Button/Button';

export const CustomDemo = () => {
  return (
    <Card
      views={{
        container: {
          backgroundColor: 'color.blue.50',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        header: {
          backgroundColor: 'color.blue.500',
          color: 'white',
          padding: '16px',
          borderBottomWidth: '0',
        },
        content: {
          padding: '24px',
        },
        footer: {
          padding: '16px',
          backgroundColor: 'color.gray.50',
          borderTopWidth: '0',
        },
      }}
    >
      <Card.Header>
        <Text fontWeight="bold" fontSize={18} color="white">
          Custom Styled Card
        </Text>
      </Card.Header>
      
      <Card.Content>
        <Text>
          This card has custom styling applied to all its parts.
          You can customize the container, header, content, and footer.
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
