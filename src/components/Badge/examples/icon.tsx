import React from 'react';
import { Badge } from '../Badge';
import { View, Horizontal } from 'app-studio';
import { CloseIcon } from 'src/components/Icon/Icon';

const Icon = () => (
  <View
    width="12px"
    height="12px"
    backgroundColor="currentColor"
    borderRadius="50%"
  />
);

export const IconDemo = () => (
  <Horizontal gap={10}>
    <Badge icon={<CloseIcon />} content="With Icon" />
  </Horizontal>
);
