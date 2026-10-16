import React from 'react';
import { Vertical, Horizontal, Text } from 'app-studio';
import { Checkbox } from '../Checkbox/Checkbox';
import { Switch } from '../Switch/Switch';
import { Radio } from '../Radio/Radio';

export const FormToggles = () => {
  const [notify, setNotify] = React.useState(true);
  return (
    <Vertical gap={16} width="100%">
      <Checkbox label="I accept the terms" defaultIsSelected />
      <Horizontal alignItems="center" gap={10}>
        <Switch
          id="notify"
          name="notify"
          isChecked={notify}
          onChange={setNotify}
        />
        <Text color="color-gray-700">Email notifications</Text>
      </Horizontal>
      <Vertical gap={8}>
        <Radio label="Light" name="theme" value="light" defaultIsSelected />
        <Radio label="Dark" name="theme" value="dark" />
      </Vertical>
    </Vertical>
  );
};
