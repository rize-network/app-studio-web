import React, { useState } from 'react';
import { Switch } from '../../../Form/Switch/Switch';
import { Text } from '../../../Text/Text';
import { Vertical } from 'app-studio';

export const ChildSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <Vertical gap={16}>
      <Text>Switch with content: {isChecked ? 'ON' : 'OFF'}</Text>

      <Switch
        id="child"
        name="child"
        isChecked={isChecked}
        onChange={handleChange}
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

      <Switch
        id="child-md"
        name="child-md"
        size="md"
        isChecked={isChecked}
        onChange={handleChange}
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

      <Switch
        id="child-lg"
        name="child-lg"
        size="lg"
        isChecked={isChecked}
        onChange={handleChange}
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
    </Vertical>
  );
};
