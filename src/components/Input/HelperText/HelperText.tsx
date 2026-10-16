/**
 * HelperText Component
 *
 * Renders helper text for form fields with appropriate styling
 * according to the design guidelines.
 */

import React from 'react';
import { Text } from 'app-studio';

import { HelperTextProps } from './HelperText.props';

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  views = { helperText: {} },
  ...props
}) => (
  <Text
    fontSize="11px"
    fontWeight="400"
    letterSpacing="-0.01em"
    lineHeight="16px"
    marginVertical={0}
    marginHorizontal={0}
    color="color-gray-500"
    transition="color 0.2s ease, opacity 0.2s ease"
    {...(views['helperText'] as any)}
    {...props}
  >
    {children}
  </Text>
);
