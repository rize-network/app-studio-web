import React from 'react';

import { Vertical } from '../../Vertical/examples';
import { HelperText } from '../HelperText/HelperText';

import { ContainerProps } from './FieldContainer/FieldContainer.props';

export const FieldContainer: React.FC<ContainerProps> = ({
  children,
  helperText,
  error = false,
  styles,
  ...props
}) => (
  <Vertical gap={5} position="relative" {...props}>
    {children}
    {helperText && (
      <HelperText error={error} {...styles}>
        {helperText}
      </HelperText>
    )}
  </Vertical>
);
