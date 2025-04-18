import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Vertical } from 'app-studio';

import { Size } from '../Loader/Loader.type';

export const SizeLoader = () => (
  <Vertical flexWrap="nowrap">
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
      <Loader key={size} size={size as Size} />
    ))}
  </Vertical>
);
