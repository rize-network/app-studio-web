import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';
import { Toast } from '../Toast';

export const ToastVariants = () => {
  return (
    <Horizontal gap={10}>
      <Button
        onClick={() =>
          Toast.info('Information', 'This is an informational message.')
        }
      >
        Info
      </Button>

      <Button
        onClick={() =>
          Toast.success('Success', 'Your action was completed successfully.')
        }
      >
        Success
      </Button>

      <Button
        onClick={() =>
          Toast.warning('Warning', 'Please be careful with this action.')
        }
      >
        Warning
      </Button>

      <Button
        onClick={() =>
          Toast.error(
            'Error',
            'An error occurred while processing your request.'
          )
        }
      >
        Error
      </Button>
    </Horizontal>
  );
};
