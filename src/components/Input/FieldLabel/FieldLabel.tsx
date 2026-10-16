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
    // Full opacity always: dimming inherited ink to 0.72 at 11–12px lands
    // under the 4.5:1 contrast ratio and fails axe (serious) on every form
    // screen. De-emphasis, where a design wants it, belongs to a color token
    // that still clears the ratio — not to an opacity filter.
    color={error ? 'color-red-500' : 'inherit'}
    transition="color 0.2s ease"
    {...views['label']}
    {...props}
  >
    {children}
  </Label>
);
