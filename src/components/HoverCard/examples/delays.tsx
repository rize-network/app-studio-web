import React from 'react';
import { HoverCard } from '../HoverCard';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { Button } from '../../Button/Button';
import { Link } from '../../Link/Link';

export const DelaysHoverCard = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <View>
        <Text marginBottom={10}>HoverCard with Quick Open (100ms)</Text>
        <HoverCard openDelay={100} closeDelay={300}>
          <HoverCard.Trigger>
            <Button>Quick Open (100ms)</Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text>
              This card opens quickly (100ms) after hovering, but has a standard close delay (300ms).
            </Text>
          </HoverCard.Content>
        </HoverCard>
      </View>

      <View>
        <Text marginBottom={10}>HoverCard with Slow Close (1000ms)</Text>
        <HoverCard openDelay={200} closeDelay={1000}>
          <HoverCard.Trigger>
            <Button>Slow Close (1000ms)</Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text>
              This card has a standard open delay (200ms), but stays open longer (1000ms) after you move away.
            </Text>
          </HoverCard.Content>
        </HoverCard>
      </View>

      <View>
        <Text marginBottom={10}>HoverCard with Link Trigger</Text>
        <Horizontal alignItems="center" gap={5}>
          <Text>Visit</Text>
          <HoverCard>
            <HoverCard.Trigger asChild>
              <Link to="https://example.com">example.com</Link>
            </HoverCard.Trigger>
            <HoverCard.Content side="top">
              <Text>
                This card uses the asChild prop to apply hover behavior directly to the Link component.
              </Text>
            </HoverCard.Content>
          </HoverCard>
          <Text>for more information.</Text>
        </Horizontal>
      </View>
    </Vertical>
  );
};
