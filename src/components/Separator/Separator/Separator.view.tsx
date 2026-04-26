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
// Defines the `SeparatorView` functional component, responsible for rendering a visual separator with various styles and orientations.
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
  // Retrieves the current theme mode from the application's theme context.
  const { themeMode } = useTheme();
  // Determines the color of the separator, defaulting to 'color-gray-200' if no specific color is provided via props.
  const separatorColor = color || 'color-gray-200';
  // Selects the appropriate border style (e.g., solid, dashed) for the separator based on the `variant` prop.
  const borderStyle = SeparatorVariants[variant];
  // Sets the thickness of the separator line based on the `thickness` prop.
  const borderWidth = SeparatorThicknesses[thickness];
  // Prepares ARIA accessibility attributes: if `decorative` is true, the separator is hidden from accessibility trees; otherwise, it's assigned a 'separator' role and `aria-orientation`.
  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'separator', 'aria-orientation': orientation };
  // Conditional rendering block for a horizontal separator that includes a text label.
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
