import React from 'react';
import { Horizontal, Loading } from 'src/components';

import { LoaderType } from '../Loader/Loader.type';

export const TypeLoader = () => (
  <Horizontal justifyContent="space-evenly">
    {['default', 'quarter', 'dotted'].map((type) => (
      <Loading key={type} type={type as LoaderType} />
    ))}
  </Horizontal>
);
