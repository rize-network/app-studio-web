import React from 'react';
import { Button } from 'src/components';

export const DisabledButton = () => (
  <Button
    onPress={() => {
      alert('Disabled');
    }}
    isDisabled
  >
    Disabled
  </Button>
);
