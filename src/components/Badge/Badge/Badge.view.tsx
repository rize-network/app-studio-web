import React, { CSSProperties } from 'react';
import { BadgeProps } from './Badge.props';
import { BadgeShapes, BadgeSizes, PositionStyles } from './Badge.style';
import { Variant } from './Badge.type';
import { Text, Center } from 'src/components';

const BadgeView: React.FC<BadgeProps> = ({
  content,
  position,
  shape = 'pillShaped',
  colorScheme = 'theme.primary',
  variant = 'filled',
  size = 'md',
  styles,
}) => {
  const BadgeVariants: Record<Variant, CSSProperties> = {
    filled: {
      backgroundColor: colorScheme,
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

  const combinedStyles: Record<string, any> = {
    width: 'fit-content',
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...BadgeVariants[variant],
    ...(position ? PositionStyles[position] : {}),
    ...styles?.container,
  };

  return (
    <Center role="badge" {...combinedStyles}>
      <Text role="badgeText" size={size} {...styles?.text}>
        {content}
      </Text>
    </Center>
  );
};

export default BadgeView;
