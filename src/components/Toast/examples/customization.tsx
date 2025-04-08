import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toast } from '../Toast';

export const CustomizedToast = () => {
  return (
    <Horizontal gap={10}>
      <Button
        onClick={() =>
          Toast.info('Custom Styled Toast', 'This toast has custom styling.', {
            views: {
              container: {
                backgroundColor: 'color.purple.50',
                borderColor: 'color.purple.300',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              title: {
                color: 'color.purple.700',
                fontSize: '18px',
              },
              description: {
                color: 'color.purple.600',
              },
            },
            showIcon: false,
          })
        }
      >
        Custom Styled Toast
      </Button>
      
      <Button
        onClick={() =>
          Toast.success('No Close Button', 'This toast does not have a close button.', {
            isClosable: false,
          })
        }
      >
        No Close Button
      </Button>
      
      <Button
        onClick={() =>
          Toast.warning('No Icon', 'This toast does not display an icon.', {
            showIcon: false,
          })
        }
      >
        No Icon
      </Button>
    </Horizontal>
  );
};
