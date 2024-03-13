import React from 'react';
import { Button } from '../Button';

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
