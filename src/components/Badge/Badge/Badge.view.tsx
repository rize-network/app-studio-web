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
  getBadgeVariants,
} from './Badge.style';
import { Center, useTheme } from 'app-studio';
import { Text } from 'app-studio';
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
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const variantStyles = getBadgeVariants(currentThemeMode)[variant];
  // Combine styles for the badge
  const combinedStyles: Record<string, any> = {
    // Base styles
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color.black',

    // Apply shape, size, and variant styles
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...variantStyles,

    // Apply position styles if provided
    ...(position ? PositionStyles[position] : {}),

    // Apply custom container styles
    ...views?.container,
  };
  return (
    <Center role="badge" {...combinedStyles} {...props}>
      <Text
        role="badgeText"
        fontWeight="500" // Medium weight for better readability
        textAlign="center"
        {...views?.text}
        color={combinedStyles.color}
        bgColor={combinedStyles.backgroundColor}
      >
        {content || ''}
      </Text>
    </Center>
  );
};
export default BadgeView;
