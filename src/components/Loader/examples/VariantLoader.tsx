import React from 'react';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { LoaderType } from '../Loader/Loader.type';

export const TypeLoader = () => (
  <Horizontal justifyContent="space-evenly">
    {['default', 'quarter', 'dotted'].map((type) => (
      <Loader key={type} type={type as LoaderType} />
    ))}
  </Horizontal>
);
