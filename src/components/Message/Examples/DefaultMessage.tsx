import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const DefaultMessage = () => {
  return (
    <>
      <Button onClick={() => showMessage('success', 'Test')} isAuto>
        Blur Overlay
      </Button>
    </>
  );
};
