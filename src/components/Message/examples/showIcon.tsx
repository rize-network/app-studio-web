import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const ShowIconDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'warning',
          'Scheduled: Catch up',
          'Friday, February 10, 2023 at 5:57 PM',
          {
            showIcon: true,
          }
        )
      }
    >
      Add Calendar
    </Button>
  );
};
