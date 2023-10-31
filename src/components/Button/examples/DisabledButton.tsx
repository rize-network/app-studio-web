import React from 'react';
import { Button } from '../../Button/Button';

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
