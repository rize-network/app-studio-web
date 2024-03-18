import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { showMessage } from '../Message/Message.store';
export const VariantMessage = () => {
  return (
    <>
      <Horizontal gap={10}>
        <Button
          onClick={() =>
            showMessage('success', 'Success', 'Display the success message')
          }
          isAuto
        >
          Sharp
        </Button>
        <Button
          onClick={() => showMessage('error', 'Error', 'Display Error message')}
          isAuto
        >
          Rounded
        </Button>
      </Horizontal>
    </>
  );
};
