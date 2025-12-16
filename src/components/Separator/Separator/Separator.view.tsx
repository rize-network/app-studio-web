/**
 * Separator View Component
 *
 * Renders a separator with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { View } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { useTheme } from 'app-studio';
import { SeparatorProps } from './Separator.props';
import {
  SeparatorVariants,
  SeparatorThicknesses,
  DefaultSeparatorStyles,
} from './Separator.style';

export const SeparatorView: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color,
  spacing = '0px',
  label,
  decorative = false,
  views,
  themeMode: elementMode,
  ...props
}) => {
  // Access theme if needed for future enhancements
  const { themeMode } = useTheme();
  // Use provided color or default from theme
  const separatorColor = color || 'color.gray.200';
  const borderStyle = SeparatorVariants[variant];
  const borderWidth = SeparatorThicknesses[thickness];

  // Set appropriate ARIA attributes based on decorative prop
  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'separator', 'aria-orientation': orientation };

  // If there's a label, render a horizontal separator with the label in the middle
  if (label && orientation === 'horizontal') {
    return (
      <Horizontal
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={spacing}
        {...ariaProps}
        {...props}
      >
        <View
          height="0px"
          flexGrow={1}
          borderTopWidth={borderWidth}
          borderTopStyle={borderStyle as any}
          borderTopColor={separatorColor}
          {...DefaultSeparatorStyles.container}
          {...views?.container}
        />
        <Text {...DefaultSeparatorStyles.label} {...views?.label}>
          {label}
        </Text>
        <View
          height="0px"
          flexGrow={1}
          borderTopWidth={borderWidth}
          borderTopStyle={borderStyle as any}
          borderTopColor={separatorColor}
          {...DefaultSeparatorStyles.container}
          {...views?.container}
        />
      </Horizontal>
    );
  }

  // For horizontal separator without label
  if (orientation === 'horizontal') {
    return (
      <View
        height="0px"
        width="100%"
        borderTopWidth={borderWidth}
        borderTopStyle={borderStyle as any}
        borderTopColor={separatorColor}
        padding={spacing}
        {...DefaultSeparatorStyles.container}
        {...ariaProps}
        {...views?.container}
        {...props}
      />
    );
  }

  // For vertical separator
  return (
    <View
      width="0px"
      height="100%"
      borderLeftWidth={borderWidth}
      borderLeftStyle={borderStyle as any}
      borderLeftColor={separatorColor}
      padding={spacing}
      {...DefaultSeparatorStyles.container}
      {...ariaProps}
      {...views?.container}
      {...props}
    />
  );
};
