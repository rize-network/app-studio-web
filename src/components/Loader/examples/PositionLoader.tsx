import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const PositionLoader = () => (
  <Vertical gap={15}>
    <Loader loaderColor="black" textColor="black">
      Submitting
    </Loader>
    <Loader
      loaderColor="theme.primary"
      textColor="theme.primary"
      textPosition="top"
    >
      Submitting
    </Loader>
    <Loader
      loaderColor="theme.primary"
      textColor="theme.primary"
      textPosition="bottom"
    >
      Submitting
    </Loader>
    <Loader
      loaderColor="theme.primary"
      textColor="theme.primary"
      textPosition="left"
    >
      Submitting
    </Loader>
  </Vertical>
);
