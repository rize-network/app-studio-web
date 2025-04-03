import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const StylesDemo = () => {
  return (
    <Button
      onClick={() =>
        showMessage(
          'success',
          'Scheduled: Catch up',
          'Friday, February 10, 2023 at 5:57 PM',
          {
            action: () => {},
            actionText: 'Try again',
            views: {
              container: {
                borderColor: 'black',
                backgroundColor: '#f0f0f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              },
              title: { color: 'black' },
              subtitle: { color: 'black' },
              actionText: { color: 'black', borderColor: 'black' },
            },
          }
        )
      }
    >
      Show Toast
    </Button>
  );
};
