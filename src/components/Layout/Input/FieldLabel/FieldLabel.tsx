import React from 'react';
import { Label } from '../../../Form/Label/Label';

import { LabelSizes } from '../../configs/Input.style';

import { LabelProps } from './FieldLabel/FieldLabel.props';

export const FieldLabel: React.FC<LabelProps> = ({
  children,
  size = 'md',
  error = false,
  color = 'theme.primary',
  views = { label: {} },
  helperText,
  ...props
}) => (
  <Label
    top={6}
    zIndex={1000}
    lineHeight={LabelSizes[size]}
    letterSpacing={0.25}
    whiteSpace="noWrap"
    position="absolute"
    color={error ? 'error' : color}
    fontSize={LabelSizes[size]}
    {...views['label']}
    {...props}
  >
    {children}
  </Label>
);
