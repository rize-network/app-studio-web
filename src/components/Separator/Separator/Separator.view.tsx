import React from 'react';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { SeparatorProps } from './Separator.props';
import {
  SeparatorOrientations,
  SeparatorVariants,
  SeparatorThicknesses,
} from './Separator.style';

export const SeparatorView: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'color.gray.200',
  spacing = '16px',
  label,
  decorative = false,
  views,
  ...props
}) => {
  const borderStyle = SeparatorVariants[variant];
  const borderWidth = SeparatorThicknesses[thickness];

  // Set appropriate ARIA attributes based on decorative prop
  const ariaProps = decorative
    ? { 'aria-hidden': 'true' }
    : { role: 'separator', 'aria-orientation': orientation };

  // If there's a label, render a horizontal separator with the label in the middle
  if (label && orientation === 'horizontal') {
    return (
      <Horizontal
        alignItems="center"
        justifyContent="center"
        width="100%"
        margin={spacing}
        {...ariaProps}
        {...props}
      >
        <View
          height="0px"
          flexGrow={1}
          borderTopWidth={borderWidth}
          borderTopStyle={borderStyle as any}
          borderTopColor={color}
          {...views?.container}
        />
        <Text
          paddingHorizontal="8px"
          color="color.gray.500"
          fontSize="14px"
          {...views?.label}
        >
          {label}
        </Text>
        <View
          height="0px"
          flexGrow={1}
          borderTopWidth={borderWidth}
          borderTopStyle={borderStyle as any}
          borderTopColor={color}
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
        borderTopColor={color}
        margin={spacing}
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
      borderLeftColor={color}
      margin={spacing}
      {...ariaProps}
      {...views?.container}
      {...props}
    />
  );
};
