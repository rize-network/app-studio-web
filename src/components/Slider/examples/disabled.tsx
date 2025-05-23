import React from 'react';
import { Vertical } from 'app-studio';
import { Slider } from '../Slider';

export const DisabledDemo = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Slider
        label="Disabled Slider"
        value={30}
        isDisabled
        showValue
        helperText="This slider is disabled and cannot be interacted with"
      />
    </Vertical>
  );
};
