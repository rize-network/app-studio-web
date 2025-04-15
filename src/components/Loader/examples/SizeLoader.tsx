import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Vertical } from 'app-studio';

import { Size } from '../Loader/Loader.type';

export const SizeLoader = () => (
  <Vertical flexWrap="nowrap">
    {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map(
      (size) => (
        <Loader key={size} size={size as Size} />
      )
    )}
  </Vertical>
);
