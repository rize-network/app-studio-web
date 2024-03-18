import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { showMessage } from '../Message/Message.store';

export const CloseButtonMessage = () => {
  return (
    <>
      <Horizontal gap={10} position="relative">
        <Button
          onClick={() =>
            showMessage(
              'warning',
              'Scheduled: Catch up',
              'Friday, February 10, 2023 at 5:57 PM'
            )
          }
          isAuto
        >
          With Close Button
        </Button>
      </Horizontal>
    </>
  );
};
