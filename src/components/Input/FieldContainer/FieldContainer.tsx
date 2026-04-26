/**
 * FieldContainer Component
 *
 * Renders a container for a form field with helper text and error handling
 * according to the design guidelines.
 */

import React from 'react';

import { HelperText } from '../HelperText/HelperText';

import { ContainerProps } from './FieldContainer/FieldContainer.props';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const FieldContainer = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, helperText, error = false, views, ...props }, ref) => (
    <Vertical
      ref={ref}
      gap={4}
      position="relative"
      width="100%"
      marginVertical={0}
      {...props}
      {...views?.container}
    >
      {children}

      {!error && helperText && (
        <HelperText marginTop={0} {...views?.helperText}>
          {helperText}
        </HelperText>
      )}

      {error && (
        <Text
          fontSize="11px"
          lineHeight="16px"
          marginTop={0}
          marginHorizontal={0}
          fontWeight="500"
          color="color-red-500"
          transition="color 0.2s ease, opacity 0.2s ease"
          {...views?.error}
        >
          {error}
        </Text>
      )}
    </Vertical>
  )
);

FieldContainer.displayName = 'FieldContainer';
