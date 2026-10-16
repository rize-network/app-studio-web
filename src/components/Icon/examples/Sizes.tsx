import React from 'react';
import { Horizontal } from 'app-studio';
import { StarIcon } from '../Icon';

export const IconSizes = () => (
  <Horizontal gap={12} alignItems="center">
    <StarIcon widthHeight={16} color="color-amber-500" filled />
    <StarIcon widthHeight={24} color="color-amber-500" filled />
    <StarIcon widthHeight={32} color="color-amber-500" filled />
    <StarIcon widthHeight={48} color="color-amber-500" filled />
  </Horizontal>
);
