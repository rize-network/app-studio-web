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
      // Layout properties
      gap={8} // 2 × 4px grid
      position="relative"
      width="100%"
      // Apply custom props
      {...props}
      {...views?.container}
    >
      {/* Field content */}
      {children}

      {/* Helper text (when no error) */}
      {!error && helperText && (
        <HelperText
          marginTop={4} // 1 × 4px grid
          {...views?.helperText}
        >
          {helperText}
        </HelperText>
      )}

      {/* Error message */}
      {error && (
        <Text
          size="xs"
          marginTop={4} // 1 × 4px grid
          marginHorizontal={0}
          fontWeight="500" // Medium weight for better readability
          color="color.red.500"
          transition="all 0.2s ease"
          {...views?.error}
        >
          {error}
        </Text>
      )}
    </Vertical>
  )
);

FieldContainer.displayName = 'FieldContainer';
