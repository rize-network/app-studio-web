import React from 'react';
import { Center } from '../../..';

import { FieldIconsProps } from './FieldIcons/FieldIcons.props';

export const FieldIcons: React.FC<FieldIconsProps> = ({ children, ...props }) => (
  <Center
    gap={10}
    top="50%"
    right={16}
    zIndex={500}
    wrap="nowrap"
    position="absolute"
    transform="translateY(-50%)"
    {...props}
  >
    {children}
  </Center>
);
