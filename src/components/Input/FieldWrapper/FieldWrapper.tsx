/**
 * FieldWrapper Component
 *
 * Renders a wrapper for form field content with appropriate styling
 * according to the design guidelines.
 */

import React from 'react';

import { Vertical } from 'app-studio';

import { WrapperFieldProps } from './FieldWrapper.props';

export const FieldWrapper: React.FC<WrapperFieldProps> = ({
  children,
  ...props
}) => (
  <Vertical
    display="flex"
    flexDirection="column"
    gap={4}
    flex={1}
    width="100%"
    maxWidth="100%"
    {...props}
  >
    {children}
  </Vertical>
);
