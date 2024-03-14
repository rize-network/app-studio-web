import React, { CSSProperties } from 'react';
import { BadgeProps } from './Badge.props';
import { BadgeShapes, BadgeSizes, PositionStyles } from './Badge.style';
import { Variant } from './Badge.type';

const BadgeView: React.FC<BadgeProps> = ({
  content,
  shape = 'rounded',
  colorScheme = 'red',
  position = 'top-right',
  variant = 'filled',
  size = 'md',
}) => {
  const BadgeVariants: Record<Variant, CSSProperties> = {
    filled: {
      backgroundColor: 'theme.secondary',
      color: 'color.white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colorScheme,
      color: colorScheme,
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      color: colorScheme,
      textDecoration: 'underline',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colorScheme,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
  };
  const combinedStyles: any = {
    position: 'absolute',
    borderRadius: BadgeShapes[shape],
    ...PositionStyles[position],
    ...BadgeSizes[size],
    ...BadgeVariants[variant],
  };

  return (
    <span className={`badge`} style={combinedStyles}>
      {content}
    </span>
  );
};

export default BadgeView;
