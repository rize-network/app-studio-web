import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const TimeoutDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'info',
          'Info Message',
          'Here is some important information.',
          {
            timeout: 1000,
          }
        )
      }
    >
      Add Calendar
    </Button>
  );
};
