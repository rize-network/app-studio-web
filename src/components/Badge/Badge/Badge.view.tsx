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
import { Center, useTheme, View } from 'app-studio';
import { Text } from 'app-studio';
import { getThemes } from '../../StatusIndicator/StatusIndicator/StatusIndicator.style';

// No need to import ViewProps as it's not used directly
/**
 * Badge View Component
 */
const BadgeView: React.FC<BadgeProps> = ({
  content,
  children,
  icon,
  pastil,
  position,
  shape = 'pill',
  variant = 'filled',
  size = 'md',
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const variantStyles = getBadgeVariants(currentThemeMode)[variant];
  const statusThemes = getThemes(currentThemeMode);

  // Combine styles for the badge
  const combinedStyles: Record<string, any> = {
    // Base styles
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',

    // Apply shape, size, and variant styles
    borderRadius: BadgeShapes[shape],
    ...BadgeSizes[size],
    ...variantStyles,

    // Apply position styles if provided
    ...(position ? PositionStyles[position] : {}),

    // Apply custom container styles
    ...views?.container,
  };

  // Determine pastil color
  let pastilColor = 'currentColor';
  if (typeof pastil === 'string') {
    if (pastil in statusThemes) {
        pastilColor = (statusThemes as any)[pastil].indicator.backgroundColor;
    } else {
        pastilColor = pastil;
    }
  } else if (pastil === true) {
     // Default pastil color if simply true
     pastilColor = 'color-green-500'; // Example default or inherit
     if (variant === 'filled') pastilColor = 'color-white';
  }

  return (
    <Center role="badge" {...combinedStyles} {...props}>
      {icon && (
        <View role="badge-icon" {...views?.icon}>
          {icon}
        </View>
      )}
      
      {pastil && (
        <View
          role="badge-pastil"
          width="6px"
          height="6px"
          borderRadius="50%"
          backgroundColor={pastilColor}
          {...views?.pastil}
        />
      )}

      {(content || children) && (
        <Text
          role="badgeText"
          fontWeight="500" // Medium weight for better readability
          textAlign="center"
          {...views?.text}
          color={combinedStyles.color}
        >
          {children || content}
        </Text>
      )}
    </Center>
  );
};
export default BadgeView;
