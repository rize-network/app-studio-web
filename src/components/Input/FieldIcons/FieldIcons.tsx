import React from 'react';
import { Horizontal } from 'app-studio';

import { FieldIconsProps } from './FieldIcons/FieldIcons.props';

export const FieldIcons: React.FC<FieldIconsProps> = ({
  children,
  ...props
}) => (
  <Horizontal
    gap={10}
    right={10}
    zIndex={500}
    flexWrap="nowrap"
    alignItems="center"
    justifyContent="flex-end"
    {...props}
  >
    {children}
  </Horizontal>
);
