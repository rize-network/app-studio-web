/**
 * FieldLabel Component
 *
 * Renders a label for a form field with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Label } from '../../Form/Label/Label';

import { LabelSizes } from '../Input.style';

import { LabelProps } from './FieldLabel/FieldLabel.props';

export const FieldLabel: React.FC<LabelProps> = ({
  children,
  size = 'md',
  error = false,
  color = 'theme-primary',
  views = { label: {} },
  helperText,
  ...props
}) => (
  <Label
    // Position properties
    top={0}
    zIndex={-10}
    position="absolute"
    // Typography properties
    fontSize={LabelSizes[size]}
    lineHeight={LabelSizes[size]}
    letterSpacing="-0.01em" // Slight negative tracking for modern look
    whiteSpace="nowrap"
    fontWeight={500} // Medium weight for better visibility
    // Color properties
    color={error ? 'color-red-500' : color}
    // Animation
    transition="color 200ms ease-out"
    // Apply custom styles
    {...views['label']}
    {...props}
  >
    {children}
  </Label>
);
