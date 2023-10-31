import React from 'react';
import { Loading, Vertical } from '../..';

export const PositionLoader = () => (
  <Vertical gap={15}>
    <Loading loaderColor="black" textColor="black">
      Submitting
    </Loading>
    <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="top">
      Submitting
    </Loading>
    <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="bottom">
      Submitting
    </Loading>
    <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="left">
      Submitting
    </Loading>
  </Vertical>
);
