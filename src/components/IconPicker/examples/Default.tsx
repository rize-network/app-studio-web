import React from 'react';
import { Vertical } from 'app-studio';
import { IconPicker } from '../IconPicker';

export const DefaultIconPicker = () => {
  const [icon, setIcon] = React.useState<any>('star');
  return (
    <Vertical gap={10} width="100%">
      <IconPicker
        label="Pick an icon"
        value={icon}
        onChange={(name) => setIcon(name)}
        helperText="Tap to open the icon grid"
      />
    </Vertical>
  );
};
