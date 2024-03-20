import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';

export const TitleDemo = () => {
  return (
    <Button
      onClick={() => showMessage('info', 'Here is some important information.')}
    >
      Show Toast
    </Button>
  );
};
