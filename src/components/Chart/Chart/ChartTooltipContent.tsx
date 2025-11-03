import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';

interface ChartTooltipContentProps {
  /**
   * Optional series name for multi-series charts.
   */
  seriesName?: string;
  /**
   * Optional label associated with the hovered datum (e.g. x-axis label).
   */
  label?: string;
  /**
   * Value to display.
   */
  value: number | string;
  /**
   * Optional color badge to mirror the series color.
   */
  color?: string;
  /**
   * Optional percentage value (0-1) for pie/donut charts.
   */
  percentage?: number;
  /**
   * Additional custom content to render underneath the primary information.
   */
  children?: React.ReactNode;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  seriesName,
  label,
  value,
  color,
  percentage,
  children,
}) => {
  const formattedValue =
    typeof value === 'number'
      ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : value;

  return (
    <View display="flex" flexDirection="column" gap="6px">
      {(seriesName || color) && (
        <View display="flex" alignItems="center" gap="8px">
          {color && (
            <View
              width="10px"
              height="10px"
              borderRadius="9999px"
              backgroundColor={color}
              flexShrink={0}
            />
          )}
          {seriesName && (
            <Text fontWeight="semibold" fontSize="14px">
              {seriesName}
            </Text>
          )}
        </View>
      )}

      {label && (
        <Text fontSize="12px" color="color.gray.600">
          {label}
        </Text>
      )}

      <Text fontWeight="bold" fontSize="16px">
        {formattedValue}
      </Text>

      {typeof percentage === 'number' && (
        <Text fontSize="12px" color="color.gray.600">
          {(percentage * 100).toFixed(1)}%
        </Text>
      )}

      {children}
    </View>
  );
};
