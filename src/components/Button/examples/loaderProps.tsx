import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const LoaderButtons = () => (
  <Vertical gap={15}>
    <Button isLoading isFilled onClick={(e) => alert('ok')}>
      Submitting
    </Button>
    <Button isLoading isFilled>
      Submitting
    </Button>
    <Button isLoading loaderPosition="right" isFilled>
      Submitting
    </Button>
  </Vertical>
);
