import React from 'react';
import { Horizontal, Loading } from 'src/components';

export const StyleLoader = () => (
  <Horizontal gap={15} wrap="nowrap">
    <Loading loaderColor="black" textColor="black">
      Submitting
    </Loading>
    <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="left">
      Submitting
    </Loading>
  </Horizontal>
);
