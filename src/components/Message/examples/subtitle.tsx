import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const SubtitleDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'error',
          'Error Message',
          'An error occurred while processing your request.'
        )
      }
    >
      Show Toast
    </Button>
  );
};
