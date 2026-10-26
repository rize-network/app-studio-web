import React from 'react';
import { Toast } from 'src/components/Toast/Toast';
import { Button } from 'src/components/Button/Button';
import { Horizontal } from 'app-studio';

export function ToastExample() {
  return (
    <>
      <Horizontal gap={12} flexWrap="wrap">
        <Button
          onClick={() =>
            Toast.success('Project saved', 'Your changes are ready.')
          }
        >
          Show success
        </Button>
        <Button
          variant="outline"
          onClick={() => Toast.error('Try again', 'This is an example error.')}
        >
          Show error
        </Button>
        <Button variant="ghost" onClick={() => Toast.removeAll()}>
          Dismiss all
        </Button>
      </Horizontal>
      <Toast.Container />
    </>
  );
}
