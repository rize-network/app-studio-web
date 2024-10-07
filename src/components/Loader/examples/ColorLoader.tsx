import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const StyleLoader = () => (
  <Horizontal gap={15} flexWrap="nowrap">
    <Loader loaderColor="black" textColor="black">
      Submitting
    </Loader>
    <Loader
      loaderColor="theme.primary"
      textColor="theme.primary"
      textPosition="left"
    >
      Submitting
    </Loader>
  </Horizontal>
);
