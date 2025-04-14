/**
 * FieldContainer Component
 *
 * Renders a container for a form field with helper text and error handling
 * according to the design guidelines.
 */

import React from 'react';

import { HelperText } from '../HelperText/HelperText';

import { ContainerProps } from './FieldContainer/FieldContainer.props';
import { Text } from '../../../Text/Text';
import { Vertical } from '../../Vertical/Vertical';

export const FieldContainer: React.FC<ContainerProps> = ({
  children,
  helperText,
  error = false,
  views,
  ...props
}) => (
  <Vertical
    // Layout properties
    gap={8} // 2 × 4px grid
    position="relative"
    width="100%"
    // Apply custom props
    {...props}
  >
    {/* Field content */}
    {children}

    {/* Helper text (when no error) */}
    {!error && helperText && (
      <HelperText
        marginTop={4} // 1 × 4px grid
        {...views}
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
      >
        {error}
      </Text>
    )}
  </Vertical>
);
