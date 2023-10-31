import React from 'react';
import { Switch } from 'src/components';
import { Text } from 'src/components';

export const ChildSwitch = () => (
  <Switch
    id="child"
    name="child"
    activeChild={
      <Text color="white" size="xs">
        On
      </Text>
    }
    inActiveChild={
      <Text color="white" size="xs">
        Off
      </Text>
    }
  />
);
