import React from 'react';
import { Card } from '../Card';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Button } from '../../Button/Button';

export const StructuredDemo = () => {
  return (
    <Card>
      <Card.Header>
        <Text fontWeight="bold" fontSize={18}>
          Card Title
        </Text>
      </Card.Header>

      <Card.Content>
        <Text>
          This card uses the structured layout with separate header, content,
          and footer sections. The content area is where the main information
          goes.
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
