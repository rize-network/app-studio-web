import React from 'react';
import { Center } from 'app-studio';

import { FieldIconsProps } from './FieldIcons/FieldIcons.props';

export const FieldIcons: React.FC<FieldIconsProps> = ({
  children,
  ...props
}) => (
  <Center gap={10} right={10} zIndex={500} flexWrap="nowrap" {...props}>
    {children}
  </Center>
);
