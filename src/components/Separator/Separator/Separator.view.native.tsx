import React from 'react';
import { View, Horizontal, Text } from 'app-studio';
import { SeparatorProps } from './Separator.props';
import {
  SeparatorThicknesses,
  DefaultSeparatorStyles,
} from './Separator.style';

const parseThickness = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 1;
  }
  return 1;
};

export const SeparatorView: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color,
  spacing,
  label,
  decorative = false,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const separatorColor = color || 'color-gray-200';
  const borderWidth = parseThickness(SeparatorThicknesses[thickness]);

  if (label && orientation === 'horizontal') {
    return (
      <Horizontal
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={spacing as any}
        {...props}
      >
        <View
          height={0}
          flexGrow={1}
          borderTopWidth={borderWidth}
          borderTopColor={separatorColor}
          {...DefaultSeparatorStyles.container}
          {...views?.container}
        />
        <Text {...DefaultSeparatorStyles.label} {...views?.label}>
          {label}
        </Text>
        <View
          height={0}
          flexGrow={1}
          borderTopWidth={borderWidth}
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
        height={0}
        width="100%"
        borderTopWidth={borderWidth}
        borderTopColor={separatorColor}
        padding={spacing as any}
        {...DefaultSeparatorStyles.container}
        {...views?.container}
        {...props}
      />
    );
  }
  return (
    <View
      width={0}
      height="100%"
      borderLeftWidth={borderWidth}
      borderLeftColor={separatorColor}
      padding={spacing as any}
      {...DefaultSeparatorStyles.container}
      {...views?.container}
      {...props}
    />
  );
};
