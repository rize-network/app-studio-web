import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';
import { Toast } from '../Toast';

export const ToastActions = () => {
  const handleUndo = () => {
    Toast.success('Action Undone', 'Your previous action has been undone.');
  };

  const handleRetry = () => {
    Toast.info('Retrying...', 'Attempting to process your request again.');
  };

  return (
    <Horizontal gap={10}>
      <Button
        onClick={() =>
          Toast.success(
            'Item Deleted',
            'The item has been successfully deleted.',
            {
              action: handleUndo,
              actionText: 'Undo',
            }
          )
        }
      >
        With Undo Action
      </Button>

      <Button
        onClick={() =>
          Toast.error(
            'Failed to Save',
            'There was an error saving your changes.',
            {
              action: handleRetry,
              actionText: 'Retry',
            }
          )
        }
      >
        With Retry Action
      </Button>
    </Horizontal>
  );
};
