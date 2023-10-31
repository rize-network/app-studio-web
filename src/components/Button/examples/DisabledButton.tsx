import React from 'react';
import { Button } from '../..';

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
