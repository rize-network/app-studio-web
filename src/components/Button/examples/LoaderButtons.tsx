import React from 'react';
import { Button } from '../Button';
import { Loader } from '../../Loader/Loader';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const LoaderButtons = () => (
  <Vertical gap={15}>
    <Button isLoader isFilled>
      {<Loader />}
    </Button>
    <Button isLoader isFilled>
      <Loader
        type="dotted"
        styles={{
          loader: { color: 'color.white' },
          text: {
            color: 'color.black',
          },
        }}
      >
        Loader
      </Loader>
    </Button>
    <Button isLoader isFilled>
      <Loader
        type="quarter"
        textPosition="right"
        styles={{
          loader: { color: 'color.black' },
          text: { color: 'color.black' },
        }}
      >
        Submitting
      </Loader>
    </Button>
  </Vertical>
);
