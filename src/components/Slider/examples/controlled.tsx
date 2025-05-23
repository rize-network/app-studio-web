import React, { useState } from 'react';
import { Slider } from '../Slider';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';

export const ControlledDemo = () => {
  const [volume, setVolume] = useState(75);

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text>Controlled Slider (Value: {volume})</Text>
      <Slider
        value={volume}
        onChange={setVolume}
        min={0}
        max={100}
        step={1}
        ariaLabel="Controlled volume"
        showTooltip
      />
      <Horizontal gap={10}>
        <Button onClick={() => setVolume(0)}>Mute</Button>
        <Button onClick={() => setVolume(50)}>50%</Button>
        <Button onClick={() => setVolume(100)}>Max</Button>
      </Horizontal>
    </Vertical>
  );
};
