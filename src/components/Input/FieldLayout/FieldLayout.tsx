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
    heigth="100%"
    border="none"
    position="relative"
    fontSize={Typography.fontSizes[size]}
    backgroundColor="transparent"
    color={isDisabled ? 'theme.text.disable' : 'theme.text.normal'}
    cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer'}
    {...views['text']}
    {...props}
  >
    {children}
  </Vertical>
);
