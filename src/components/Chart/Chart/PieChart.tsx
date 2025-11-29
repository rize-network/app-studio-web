import React, { useMemo, useRef, useEffect } from 'react';
import { useTheme, useElementPosition, View } from 'app-studio';
import { Text } from 'app-studio';
import { ChartDataPoint } from './Chart.type';
import { PieSliceStyles, DEFAULT_COLORS } from './Chart.style';

interface PieChartProps {
  dataPoints: ChartDataPoint[];
  width: number;
  height: number;
  animationProgress: number;
  isDonut?: boolean;
  onSliceClick?: (dataPoint: ChartDataPoint, index: number) => void;
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  hideTooltip: () => void;
  views?: any;
}

export const PieChart: React.FC<PieChartProps> = ({
  dataPoints,
  width,
  height,
  animationProgress,
  isDonut = false,
  onSliceClick,
  showTooltip,
  hideTooltip,
  views,
}) => {
  // Get theme color function
  const { getColor } = useTheme();

  // Use useElementPosition for intelligent tooltip positioning
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: true,
    trackOnScroll: true,
    trackOnResize: true,
  });

  // Create a separate ref for the SVG element
  const chartRef = useRef<SVGSVGElement>(null);

  // Sync the position ref with the chart ref for positioning calculations
  useEffect(() => {
    if (chartRef.current && positionRef) {
      (positionRef as any).current = chartRef.current;
    }
  }, [chartRef, positionRef]);
  // Calculate chart dimensions
  const size = Math.min(width, height);
  const radius = (size / 2) * 0.8;
  const centerX = width / 2;
  const centerY = height / 2;
  const donutRadius = isDonut ? radius * 0.6 : 0;

  // Calculate total value
  const total = useMemo(() => {
    return dataPoints.reduce((sum, point) => sum + point.value, 0);
  }, [dataPoints]);

  // Generate pie slices
  const slices = useMemo(() => {
    const result: any[] = [];
    let startAngle = -Math.PI / 2; // Start from top (12 o'clock position)

    for (let i = 0; i < dataPoints.length; i++) {
      const value = dataPoints[i].value;
      const percentage = value / total;
      const angle = percentage * 2 * Math.PI * animationProgress;
      const endAngle = startAngle + angle;

      // Calculate path
      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;
      const endX = centerX + Math.cos(endAngle) * radius;
      const endY = centerY + Math.sin(endAngle) * radius;

      // For donut chart
      const innerStartX = centerX + Math.cos(startAngle) * donutRadius;
      const innerStartY = centerY + Math.sin(startAngle) * donutRadius;
      const innerEndX = centerX + Math.cos(endAngle) * donutRadius;
      const innerEndY = centerY + Math.sin(endAngle) * donutRadius;

      // Create arc flag
      const largeArcFlag = angle > Math.PI ? 1 : 0;

      // Create path
      let path;

      if (isDonut) {
        // Donut slice path
        path = [
          `M ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L ${innerEndX} ${innerEndY}`,
          `A ${donutRadius} ${donutRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
          'Z',
        ].join(' ');
      } else {
        // Regular pie slice path
        path = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z',
        ].join(' ');
      }

      // Calculate label position
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;

      // Calculate percentage
      const percentageText = `${(percentage * 100).toFixed(1)}%`;

      // Get color from dataPoint, DEFAULT_COLORS, or generate a random one
      const colorValue =
        dataPoints[i].color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      // Resolve the color through the theme system
      const resolvedColor = getColor(colorValue);

      result.push({
        path,
        color: resolvedColor,
        label: dataPoints[i].label,
        value: dataPoints[i].value,
        percentage: percentageText,
        labelX,
        labelY,
        startAngle,
        endAngle,
        index: i,
      });

      startAngle = endAngle;
    }

    return result;
  }, [
    dataPoints,
    total,
    radius,
    centerX,
    centerY,
    donutRadius,
    animationProgress,
    isDonut,
  ]);

  return (
    <svg
      ref={chartRef}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      {/* Center circle for donut chart (rendered beneath slices so labels remain visible) */}
      {isDonut && (
        <circle
          cx={centerX}
          cy={centerY}
          r={donutRadius}
          fill="white"
          pointerEvents="none"
        />
      )}

      {/* Pie slices */}
      {slices.map((slice, index) => {
        const handleMouseEnter = (e: React.MouseEvent) => {
          const numericShare = total > 0 ? (slice.value / total) * 100 : 0;
          const remainingShare =
            total > 0 ? Math.max(0, 100 - numericShare) : null;
          const tooltipContent = (
            <View display="flex" flexDirection="column" minWidth="200px">
              <View
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontWeight="semibold">{slice.label}</Text>
                <View
                  width="12px"
                  height="12px"
                  borderRadius="2px"
                  backgroundColor={slice.color}
                />
              </View>
              <Text marginTop="4px" color="color.gray.500" fontSize="12px">
                Slice {slice.index + 1} of {dataPoints.length}
              </Text>
              <View marginTop="8px" display="flex" flexDirection="column">
                <View display="flex" justifyContent="space-between">
                  <Text color="color.gray.500">Value</Text>
                  <Text fontWeight="medium">
                    {slice.value.toLocaleString()}
                  </Text>
                </View>
                <View
                  marginTop="4px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text color="color.gray.500">Share</Text>
                  <Text fontWeight="medium">{slice.percentage}</Text>
                </View>
                <View
                  marginTop="4px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text color="color.gray.500">Total</Text>
                  <Text fontWeight="medium">{total.toLocaleString()}</Text>
                </View>
                {remainingShare !== null && (
                  <View
                    marginTop="4px"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text color="color.gray.500">Remaining</Text>
                    <Text fontWeight="medium">
                      {`${remainingShare.toFixed(1)}%`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );

          // Use intelligent positioning based on useElementPosition relation data
          let x = e.clientX;
          let y = e.clientY;

          if (relation && chartRef.current) {
            const chartRect = chartRef.current.getBoundingClientRect();
            const relativeX = e.clientX - chartRect.left;
            const relativeY = e.clientY - chartRect.top;

            // Adjust tooltip position based on available space
            if (relation.space.horizontal === 'left') {
              x = e.clientX - 100; // Offset tooltip to the left
            } else {
              x = e.clientX + 10; // Offset tooltip to the right
            }

            if (relation.space.vertical === 'top') {
              y = e.clientY - 30; // Offset tooltip above
            } else {
              y = e.clientY + 10; // Offset tooltip below
            }
          }

          showTooltip(x, y, tooltipContent);
        };

        const handleClick = () => {
          if (onSliceClick) {
            onSliceClick(dataPoints[slice.index], slice.index);
          }
        };

        return (
          <g key={`slice-${index}`}>
            <path
              d={slice.path}
              fill={slice.color}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={hideTooltip}
              onClick={handleClick}
              {...PieSliceStyles}
              {...views?.pie}
            />

            {/* Only show labels for slices that are big enough */}
            {slice.endAngle - slice.startAngle > 0.2 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontWeight="bold"
                pointerEvents="none"
                style={{
                  textShadow:
                    '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                }}
              >
                {slice.percentage}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
