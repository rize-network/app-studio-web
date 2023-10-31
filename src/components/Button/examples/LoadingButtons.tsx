import React from 'react';
import { Button, Loading, Vertical } from '../..';

export const LoadingButtons = () => (
  <Vertical gap={15}>
    <Button isLoading isFilled>
      {<Loading />}
    </Button>
    <Button isLoading isFilled>
      <Loading
        type="dotted"
        styles={{
          loader: { color: 'color.white' },
          text: {
            color: 'color.black',
          },
        }}
      >
        Loading
      </Loading>
    </Button>
    <Button isLoading isFilled>
      <Loading
        type="quarter"
        textPosition="right"
        styles={{ loader: { color: 'color.black' }, text: { color: 'color.black' } }}
      >
        Submitting
      </Loading>
    </Button>
  </Vertical>
);
