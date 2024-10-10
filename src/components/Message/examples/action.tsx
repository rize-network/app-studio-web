import React from 'react';
import { Button } from '../../Button/Button';
import { showMessage } from '../Message/Message.store';
export const ActionDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'success',
          'Scheduled: Catch up',
          'Friday, February 10, 2023 at 5:57 PM'
        )
      }
      isAuto
    >
      Add Calendar
    </Button>
  );
};
