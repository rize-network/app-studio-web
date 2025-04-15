/**
 * Badge View Component
 *
 * Renders a badge with various styles and states according to the design guidelines.
 */

import React from 'react';
import { BadgeProps } from './Badge.props';
import {
  BadgeShapes,
  BadgeSizes,
  PositionStyles,
  BadgeVariants,
} from './Badge.style';
import { Center } from 'app-studio';
import { Text } from '../../Text/Text';
// No need to import ViewProps as it's not used directly
/**
 * Badge View Component
 */
const BadgeView: React.FC<BadgeProps> = ({
  content,
  position,
  shape = 'pillShaped',
  variant = 'filled',
  size = 'md',
  views,
}) => {
  // Combine styles for the badge
  const combinedStyles: Record<string, any> = {
    // Base styles
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgrounColor: 'color.black',

    // Apply shape, size, and variant styles
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...BadgeVariants[variant],

    // Apply position styles if provided
    ...(position ? PositionStyles[position] : {}),

    // Apply custom container styles
    ...views?.container,
  };
  return (
    <Center role="badge" {...combinedStyles}>
      <Text
        role="badgeText"
        fontWeight="500" // Medium weight for better readability
        textAlign="center"
        {...views?.text}
        color={combinedStyles.color}
      >
        {content || ''}
      </Text>
    </Center>
  );
};
export default BadgeView;
