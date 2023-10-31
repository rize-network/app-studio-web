import React from 'react';
import { Loading, Vertical } from 'src/components';

import { Size } from '../Loader/Loader.type';

export const SizeLoader = () => (
  <Vertical wrap="nowrap">
    {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((size) => (
      <Loading key={size} size={size as Size} />
    ))}
  </Vertical>
);
