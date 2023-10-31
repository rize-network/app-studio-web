import React from 'react';

import { Vertical } from '../../Vertical/Vertical';

import { WrapperFieldProps } from './FieldWrapper.props';

export const FieldWrapper: React.FC<WrapperFieldProps> = ({ children, ...props }) => (
  <Vertical width="100%" {...props}>
    {children}
  </Vertical>
);
