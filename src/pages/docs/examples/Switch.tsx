import React, { useState } from 'react';
import { Switch } from 'src/components/Form/Switch/Switch';
import { Text, Vertical } from 'app-studio';

export function SwitchExample() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Vertical gap={12}>
      <Switch
        label="Enable notifications"
        isChecked={enabled}
        onChange={setEnabled}
      />
      <Text role="status">Notifications {enabled ? 'on' : 'off'}.</Text>
    </Vertical>
  );
}
