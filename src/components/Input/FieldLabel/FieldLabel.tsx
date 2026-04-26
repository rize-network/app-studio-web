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
    position="static"
    fontSize={LabelSizes[size]}
    letterSpacing="-0.01em"
    whiteSpace="nowrap"
    fontWeight={500}
    color={error ? 'color-red-500' : 'color-gray-600'}
    transition="color 0.2s ease"
    {...views['label']}
    {...props}
  >
    {children}
  </Label>
);
