import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toast } from '../Toast';

export const ToastDurations = () => {
  return (
    <Horizontal gap={10}>
      <Button
        onClick={() =>
          Toast.info('Short Duration', 'This toast will disappear in 2 seconds.', {
            duration: 2000,
          })
        }
      >
        2 Seconds
      </Button>
      
      <Button
        onClick={() =>
          Toast.info('Default Duration', 'This toast will disappear in 5 seconds.')
        }
      >
        5 Seconds (Default)
      </Button>
      
      <Button
        onClick={() =>
          Toast.info('Long Duration', 'This toast will disappear in 10 seconds.', {
            duration: 10000,
          })
        }
      >
        10 Seconds
      </Button>
    </Horizontal>
  );
};
