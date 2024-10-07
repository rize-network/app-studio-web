import React from 'react';
import { Center } from '../../../Layout/Center/Center';

import { FieldIconsProps } from './FieldIcons/FieldIcons.props';

export const FieldIcons: React.FC<FieldIconsProps> = ({
  children,
  ...props
}) => (
  <Center
    gap={10}
    right={16}
    zIndex={500}
    flexWrap="nowrap"
    position="absolute"
    {...props}
  >
    {children}
  </Center>
);
