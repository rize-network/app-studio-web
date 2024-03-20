import React from 'react';
import { Switch } from '../../../Form/Switch/Switch';

import { Text } from '../../../Text/Text';

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
