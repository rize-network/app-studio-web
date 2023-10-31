import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { Speed } from '../Loader/Loader.type';

export const SpeedLoader = () => (
  <Horizontal justifyContent="space-evenly">
    {['slow', 'normal', 'fast'].map((speed) => (
      <Loader key={speed} speed={speed as Speed} />
    ))}
  </Horizontal>
);
