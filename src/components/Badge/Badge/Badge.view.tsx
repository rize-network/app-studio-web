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
import { Text } from '../../Text/Text';
import contrast from 'contrast';
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
  bgColor,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode, getColor } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const variantStyles = getBadgeVariants(currentThemeMode)[variant];

  // Calculate text color based on bgColor if provided
  let textColor = variantStyles.color;
  let backgroundColor = variantStyles.backgroundColor || 'color.black';

  if (bgColor) {
    // Use bgColor as the background
    backgroundColor = bgColor;

    // Get the actual color value and determine if it's light or dark
    const actualBgColor = getColor(bgColor, { themeMode: currentThemeMode });
    const tone = contrast(actualBgColor);

    // Set appropriate text color based on background luminance
    textColor = tone === 'light' ? 'color.black' : 'color.white';
  }

  // Combine styles for the badge
  const combinedStyles: Record<string, any> = {
    // Base styles
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,

    // Apply shape, size, and variant styles
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...variantStyles,

    // Override color if bgColor is provided
    ...(bgColor ? { backgroundColor, color: textColor } : {}),

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
      >
        {content || ''}
      </Text>
    </Center>
  );
};
export default BadgeView;
