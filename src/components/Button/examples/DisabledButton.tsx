import React from 'react';
import { Button } from 'src/components';

export const DisabledButton = () => (
  <Button
    onClick={() => {
      alert('Disabled');
    }}
    isDisabled
  >
    Disabled
  </Button>
);
