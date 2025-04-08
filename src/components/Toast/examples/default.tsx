import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toast } from '../Toast';

export const DefaultToast = () => {
  return (
    <Horizontal gap={10}>
      <Button
        onClick={() =>
          Toast.success('Success', 'Your action was completed successfully.')
        }
      >
        Show Success Toast
      </Button>
    </Horizontal>
  );
};
