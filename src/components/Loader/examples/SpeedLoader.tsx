import React from 'react';
import { Horizontal, Loading } from '../..';

import { Speed } from '../Loader/Loader.type';

export const SpeedLoader = () => (
  <Horizontal justifyContent="space-evenly">
    {['slow', 'normal', 'fast'].map((speed) => (
      <Loading key={speed} speed={speed as Speed} />
    ))}
  </Horizontal>
);
