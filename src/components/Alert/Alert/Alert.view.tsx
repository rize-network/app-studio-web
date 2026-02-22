/**
 * Alert View Component
 *
 * Renders an alert with various styles and states according to the design guidelines.
 */

import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { WarningIcon, InfoIcon, ErrorIcon, SuccessIcon } from '../../Icon/Icon';
import { AlertProps } from './Alert.props';
import { getThemes } from './Alert.style';

/**
 * Alert component that displays important messages to users
 */
export const AlertView = React.memo(
  ({
    icon,
    title = '',
    views,
    description = '',
    variant = 'default',
    themeMode: elementMode,
    children,
    ...props
  }: AlertProps) => {
    const { themeMode } = useTheme();
    const currentThemeMode = elementMode || themeMode;
    const themes = useMemo(
      () => getThemes(currentThemeMode),
      [currentThemeMode]
    );
    // Select the appropriate icon based on the variant
    const getIcon = () => {
      if (icon) return icon;

      // Use the theme color directly from themes
      const iconColor = views?.icon?.color ?? themes[variant].icon.color;

      const iconProps = {
        size: 20,
        color: iconColor,
      };

      switch (variant) {
        case 'info':
          return <InfoIcon {...iconProps} />;
        case 'success':
          return <SuccessIcon {...iconProps} />;
        case 'error':
          return <ErrorIcon {...iconProps} />;
        case 'warning':
        default:
          return <WarningIcon {...iconProps} />;
      }
    };

    return (
      <Horizontal
        // Layout properties
        gap={12} // 3 × 4px grid
        padding="16px" // 4 × 4px grid
        flexWrap="nowrap"
        alignItems="flex-start"
        // Visual properties
        borderRadius="8px" // Consistent with design system (rounded-md)
        borderWidth="1px"
        borderStyle="solid"
        borderColor={themes[variant].container.borderColor}
        backgroundColor={themes[variant].container.backgroundColor}
        boxShadow={themes[variant].container.boxShadow}
        // Animation
        transition="all 0.2s ease"
        // Apply custom container styles and any other props
        {...views?.container}
        {...props}
      >
        {/* Icon */}
        <View alignSelf="flex-start" marginTop="2px" {...views?.icon}>
          {getIcon()}
        </View>

        {/* Content */}
        <Vertical gap={8}>
          {' '}
          {/* 2 × 4px grid */}
          {/* Title */}
          <Text
            fontSize="16px"
            fontWeight="600" // Semi-bold
            lineHeight="24px"
            color={themes[variant].content.color}
            backgroundColor={themes[variant].container.backgroundColor}
            {...views?.title}
          >
            {title}
          </Text>
          {/* Description */}
          <Text
            fontSize="14px"
            fontWeight="400" // Regular
            lineHeight="20px"
            color={themes[variant].content.color}
            backgroundColor={themes[variant].container.backgroundColor}
            {...views?.description}
          >
            {description || children}
          </Text>
        </Vertical>
      </Horizontal>
    );
  }
);
