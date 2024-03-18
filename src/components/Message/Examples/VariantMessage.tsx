import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { showMessage } from '../Message/Message.store';
export const VariantMessage = () => {
  return (
    <>
      <Horizontal gap={10}>
        <Button onClick={() => showMessage('success', 'Success')} isAuto>
          Sharp
        </Button>
        <Button onClick={() => showMessage('error', 'Error')} isAuto>
          Rounded
        </Button>
      </Horizontal>
    </>
  );
};
