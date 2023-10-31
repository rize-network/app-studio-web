import React from 'react';
import { Switch } from '../../..';
import { Text } from '../../..';

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
