import React from 'react';
import { Card } from '../Card';
import { Text } from '../../Text/Text';
import { Horizontal, Vertical } from 'app-studio';
import { Button } from '../../Button/Button';

export const DarkModeExample = () => {
  return (
    <Vertical gap={20}>
      <Text fontSize={20} fontWeight="bold">
        Light Mode Cards
      </Text>
      <Horizontal gap={20} alignItems="flex-start">
        <Card variant="default" themeMode="light">
          <Card.Header>
            <Text fontWeight="bold">Default Card (Light)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses light mode styling.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="outlined" themeMode="light">
          <Card.Header>
            <Text fontWeight="bold">Outlined Card (Light)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses light mode styling with an outline.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="elevated" themeMode="light">
          <Card.Header>
            <Text fontWeight="bold">Elevated Card (Light)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses light mode styling with elevation.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>
      </Horizontal>

      <Text fontSize={20} fontWeight="bold" marginTop={40}>
        Dark Mode Cards
      </Text>
      <Horizontal gap={20} alignItems="flex-start">
        <Card variant="default" themeMode="dark">
          <Card.Header>
            <Text fontWeight="bold">Default Card (Dark)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses dark mode styling.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="outlined" themeMode="dark">
          <Card.Header>
            <Text fontWeight="bold">Outlined Card (Dark)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses dark mode styling with an outline.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="elevated" themeMode="dark">
          <Card.Header>
            <Text fontWeight="bold">Elevated Card (Dark)</Text>
          </Card.Header>
          <Card.Content>
            <Text>This card uses dark mode styling with elevation.</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>
      </Horizontal>
    </Vertical>
  );
};
