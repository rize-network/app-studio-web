import React from 'react';
import { MessageLayout, showMessage } from 'src/components/Message/Message';
import { Button } from 'src/components/Button/Button';

export function MessageExample() {
  return (
    <>
      <Button
        onClick={() =>
          showMessage(
            'success',
            'Changes saved',
            'Your local example is ready.',
            { isClosable: true }
          )
        }
      >
        Show message
      </Button>
      <MessageLayout />
    </>
  );
}
