import React from 'react';
import { Button } from '../Button';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const LoaderButtons = () => (
  <Vertical gap={15}>
    <Button isLoading isFilled>
      Submitting
    </Button>
    <Button
      isLoading
      loaderProps={{
        type: 'dotted',
        styles: {
          loader: { color: 'color.white' },
          text: {
            color: 'color.black',
          },
        },
      }}
      isFilled
    >
      Submitting
    </Button>
    <Button
      isLoading
      loaderPosition="right"
      loaderProps={{
        type: 'quarter',
        styles: {
          loader: { color: 'color.black' },
          text: { color: 'color.black' },
        },
      }}
      isFilled
    >
      Submitting
    </Button>
  </Vertical>
);
