import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { showMessage } from '../Message/Message.store';

export const CloseButtonMessage = () => {
  return (
    <>
      <Horizontal gap={10}>
        <Button onClick={() => showMessage('sinfo', 'Info')} isAuto>
          With Close Button
        </Button>
      </Horizontal>
    </>
  );
};
