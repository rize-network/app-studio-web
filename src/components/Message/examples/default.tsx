import React from 'react';
import { Button } from '../../Button/Button';
import { showMessage } from '../Message/Message.store';
// This is a functional component named 'DefaultDemo' that renders a Button component from the '../../Button/Button' path.
export const DefaultDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'success',
          'Scheduled: Catch up',
          'Friday, February 10, 2023 at 5:57 PM'
        )
      }
    >
      Show Toast
    </Button>
  );
};
