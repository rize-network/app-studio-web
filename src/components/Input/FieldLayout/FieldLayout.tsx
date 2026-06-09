import React from 'react';
import { Typography } from 'app-studio';

import { Vertical } from 'app-studio';

import { FieldProps } from './FieldLayout/FieldLayout.props';

export const FieldLayout: React.FC<FieldProps> = ({
  children,
  size = 'md',
  isDisabled = false,
  isReadOnly = false,
  views = { text: {} },
  ...props
}) => (
  <Vertical
    gap={2}
    margin={0}
    padding={0}
    width="100%"
    height="100%"
    border="none"
    position="relative"
    fontSize={Typography.fontSizes[size]}
    color={isDisabled ? 'color-black-disable' : 'color-black-normal'}
    cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer'}
    style={{ backgroundColor: 'transparent' }}
    {...views['text']}
    {...props}
  >
    {children}
  </Vertical>
);
