import React from 'react';
import { HoverCard } from '../HoverCard';
import { Text, Vertical, View } from 'app-studio';
import { Button } from '../../Button/Button';

export const DefaultHoverCard = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <View>
        <Text marginBottom={10}>Default HoverCard</Text>
        <HoverCard>
          <HoverCard.Trigger>
            <Button>Hover Me</Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text>
              The React Framework – created and maintained by @vercel.
            </Text>
          </HoverCard.Content>
        </HoverCard>
      </View>

      <View>
        <Text marginBottom={10}>HoverCard with different positions</Text>
        <HoverCard>
          <HoverCard.Trigger>
            <Button>Hover for Top Position</Button>
          </HoverCard.Trigger>
          <HoverCard.Content side="top">
            <Text>This content appears above the trigger.</Text>
          </HoverCard.Content>
        </HoverCard>
      </View>

      <View>
        <Text marginBottom={10}>HoverCard with custom styling</Text>
        <HoverCard>
          <HoverCard.Trigger>
            <Button variant="outline">Custom Styled HoverCard</Button>
          </HoverCard.Trigger>
          <HoverCard.Content
            views={{
              container: {
                backgroundColor: 'color.blue',
                color: 'white',
                borderRadius: '8px',
                padding: '16px',
              },
            }}
          >
            <Text color="white">
              This HoverCard has custom styling with a primary background color.
            </Text>
          </HoverCard.Content>
        </HoverCard>
      </View>
    </Vertical>
  );
};
