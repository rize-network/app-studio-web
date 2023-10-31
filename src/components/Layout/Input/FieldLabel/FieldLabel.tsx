import React from 'react';
import { Label } from '../../../Form/Label/Label';

import { LabelSizes } from '../../configs/Input.style';

import { LabelProps } from './FieldLabel/FieldLabel.props';

export const FieldLabel: React.FC<LabelProps> = ({
  children,
  size = 'md',
  error = false,
  color = 'theme.primary',
  styles = { label: {} },
  ...props
}) => (
  <Label
    top={4}
    zIndex={1000}
    lineHeight={15}
    letterSpacing={0.25}
    whiteSpace="noWrap"
    position="absolute"
    color={error ? 'error' : color}
    fontSize={LabelSizes[size]}
    {...styles['label']}
    {...props}
  >
    {children}
  </Label>
);
