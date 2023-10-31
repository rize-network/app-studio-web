import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Vertical } from '../../Layout/Vertical/Vertical';

import { Size } from '../Loader/Loader.type';

export const SizeLoader = () => (
  <Vertical wrap="nowrap">
    {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((size) => (
      <Loader key={size} size={size as Size} />
    ))}
  </Vertical>
);
