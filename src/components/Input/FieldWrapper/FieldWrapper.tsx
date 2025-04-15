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
    // Layout properties
    width="100%"
    maxWidth="100%"
    position="relative"
    // Apply custom props
    {...props}
  >
    {children}
  </Vertical>
);
