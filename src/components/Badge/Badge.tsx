import React from 'react';
import { BadgeProps } from './Badge/Badge.props';
import BadgeView from './Badge/Badge.view';

export const Badge = ({
  content,
  shape,
  colorScheme,
  position,
  variant,
  size,
  styles,
}: BadgeProps) => (
  <BadgeView
    content={content}
    shape={shape}
    colorScheme={colorScheme}
    position={position}
    variant={variant}
    size={size}
    styles={styles}
  />
);
