/**
 * HelperText Component
 *
 * Renders helper text for form fields with appropriate styling
 * according to the design guidelines.
 */

import React from 'react';
import { Text } from '../../Text/Text';

import { HelperTextProps } from './HelperText.props';

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  views = { helperText: {} },
  ...props
}) => (
  <Text
    // Typography properties
    size="xs" // 12px
    fontWeight="400" // Regular weight
    letterSpacing="-0.01em" // Slight negative tracking for modern look
    lineHeight="16px" // 4 × 4px grid
    // Layout properties
    marginVertical={0}
    marginHorizontal={0}
    // Color properties
    color="color.gray.500" // Muted color for helper text
    // Animation
    transition="all 0.2s ease"
    // Apply custom styles
    {...(views['helperText'] as any)}
    {...props}
  >
    {children}
  </Text>
);
