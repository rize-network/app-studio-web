import React from 'react';
import {
  DefaultHoverCard,
  DelaysHoverCard,
} from 'src/components/HoverCard/examples';
import { Vertical, Text } from 'src/components';

const HoverCardPage = () => {
  return (
    <Vertical gap={40}>
      <Text size="xl" weight="bold">
        Basic HoverCard Examples
      </Text>
      <DefaultHoverCard />

      <Text size="xl" weight="bold" marginTop={20}>
        HoverCard with Delay Options
      </Text>
      <DelaysHoverCard />
    </Vertical>
  );
};

export default HoverCardPage;
