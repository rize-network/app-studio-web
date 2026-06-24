import React, { useCallback, useMemo } from 'react';
import { View, Vertical, Horizontal, Text, useTheme } from 'app-studio';
import { ChartDataPoint } from './Chart.type';
import { DEFAULT_COLORS } from './Chart.style';

let Svg: any = null;
let Path: any = null;
let Circle: any = null;
let SvgText: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg ?? RNSvg.default;
  Path = RNSvg.Path;
  Circle = RNSvg.Circle;
  SvgText = RNSvg.Text;
} catch {
  /* optional peer absent */
}

interface PieChartProps {
  dataPoints: ChartDataPoint[];
  width: number | string;
  height: number | string;
  animationProgress: number;
  isDonut?: boolean;
  onSliceClick?: (dataPoint: ChartDataPoint, index: number) => void;
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  hideTooltip: () => void;
  views?: any;
}

interface Slice {
  path: string;
  color: string;
  label: string;
  value: number;
  percentage: string;
  labelX: number;
  labelY: number;
  startAngle: number;
  endAngle: number;
  originalIndex: number;
}

const FULL_CIRCLE = Math.PI * 2;
const FULL_CIRCLE_EPSILON = 0.0001;
const FALLBACK_COLORS = [
  '#3b82f6',
  '#22c55e',
  '#a855f7',
  '#f97316',
  '#ef4444',
  '#14b8a6',
  '#ec4899',
  '#6366f1',
  '#eab308',
  '#06b6d4',
];

const getNumericSize = (value: number | string | undefined, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback;

const isColorToken = (value?: string) =>
  typeof value === 'string' &&
  (value.startsWith('color-') || value.startsWith('theme-'));

const isRawColor = (value?: string) =>
  typeof value === 'string' &&
  (/^(#|rgb\(|rgba\(|hsl\(|hsla\()/.test(value) ||
    ['black', 'transparent', 'white'].includes(value));

const resolveSvgColor = (
  value: string,
  fallback: string,
  getColor: (color: string) => string
) => {
  if (isRawColor(value)) return value;

  const resolved = getColor(value);
  return resolved && !isColorToken(resolved) ? resolved : fallback;
};

const createCirclePath = (centerX: number, centerY: number, radius: number) =>
  [
    `M ${centerX} ${centerY - radius}`,
    `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}`,
    `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`,
    'Z',
  ].join(' ');

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
  const { getColor } = useTheme();

  const chartWidth = getNumericSize(width, 200);
  const chartHeight = getNumericSize(height, 200);
  const size = Math.min(chartWidth, chartHeight);
  const radius = (size / 2) * 0.8;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;
  const donutRadius = isDonut ? radius * 0.6 : 0;

  const visibleDataPoints = useMemo(
    () =>
      dataPoints
        .map((point, index) => ({ point, originalIndex: index }))
        .filter(({ point }) => !(point as any).hidden),
    [dataPoints]
  );

  const total = useMemo(
    () => visibleDataPoints.reduce((sum, { point }) => sum + point.value, 0),
    [visibleDataPoints]
  );

  const resolveColor = useCallback(
    (color?: string, index = 0) => {
      const fallback = FALLBACK_COLORS[index % FALLBACK_COLORS.length];
      return resolveSvgColor(
        color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        fallback,
        getColor
      );
    },
    [getColor]
  );

  const slices = useMemo<Slice[]>(() => {
    if (total === 0) {
      return [
        {
          path: createCirclePath(centerX, centerY, radius),
          color: resolveSvgColor('color-gray-200', '#e4e4e7', getColor),
          label: 'Total',
          value: 0,
          percentage: '0.0%',
          labelX: centerX,
          labelY: centerY,
          startAngle: 0,
          endAngle: FULL_CIRCLE,
          originalIndex: -1,
        },
      ];
    }

    const result: Slice[] = [];
    let startAngle = -Math.PI / 2;

    visibleDataPoints.forEach(({ point, originalIndex }, visibleIndex) => {
      const percentage = point.value / total;
      const angle = percentage * 2 * Math.PI * animationProgress;
      const gapAngle = visibleDataPoints.length > 1 ? 0.02 : 0;
      const effectiveAngle = Math.max(0, angle - gapAngle);
      const currentEndAngle = startAngle + effectiveAngle;
      const isFullCircle = effectiveAngle >= FULL_CIRCLE - FULL_CIRCLE_EPSILON;
      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;
      const endX = centerX + Math.cos(currentEndAngle) * radius;
      const endY = centerY + Math.sin(currentEndAngle) * radius;
      const largeArcFlag = effectiveAngle > Math.PI ? 1 : 0;

      let path: string;
      if (isFullCircle) {
        path = createCirclePath(centerX, centerY, radius);
      } else if (isDonut) {
        const innerStartX = centerX + Math.cos(startAngle) * donutRadius;
        const innerStartY = centerY + Math.sin(startAngle) * donutRadius;
        const innerEndX = centerX + Math.cos(currentEndAngle) * donutRadius;
        const innerEndY = centerY + Math.sin(currentEndAngle) * donutRadius;
        path = [
          `M ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L ${innerEndX} ${innerEndY}`,
          `A ${donutRadius} ${donutRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
          'Z',
        ].join(' ');
      } else {
        path = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z',
        ].join(' ');
      }

      const labelAngle = startAngle + effectiveAngle / 2;
      const labelRadius = isDonut ? (radius + donutRadius) / 2 : radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;

      result.push({
        path,
        color: resolveColor(point.color, visibleIndex),
        label: point.label,
        value: point.value,
        percentage: `${(percentage * 100).toFixed(1)}%`,
        labelX,
        labelY,
        startAngle,
        endAngle: currentEndAngle,
        originalIndex,
      });

      startAngle = currentEndAngle;
    });

    return result;
  }, [
    visibleDataPoints,
    total,
    radius,
    centerX,
    centerY,
    donutRadius,
    animationProgress,
    isDonut,
    getColor,
    resolveColor,
  ]);

  const renderFallback = () => (
    <Vertical width="100%" gap={10} padding={8}>
      <Horizontal justifyContent="space-between" alignItems="center">
        <Text fontWeight="600" color="color-gray-500" fontSize={13}>
          {isDonut ? 'Total' : 'Distribution'}
        </Text>
        <Text fontWeight="800" color="color-gray-900" fontSize={16}>
          {total.toLocaleString()}
        </Text>
      </Horizontal>
      <Vertical gap={8}>
        {visibleDataPoints.map(({ point, originalIndex }, index) => {
          const percentage =
            total > 0 ? ((point.value / total) * 100).toFixed(1) : '0.0';
          const color = resolveColor(point.color, index);
          return (
            <Horizontal
              key={`slice-${originalIndex}`}
              alignItems="center"
              justifyContent="space-between"
              gap={8}
              onPress={
                onSliceClick
                  ? () => onSliceClick(dataPoints[originalIndex], originalIndex)
                  : undefined
              }
              {...views?.pie}
            >
              <Horizontal alignItems="center" gap={8} flex={1}>
                <View
                  width={12}
                  height={12}
                  borderRadius={3}
                  backgroundColor={color}
                />
                <Text fontSize={13} color="color-gray-700">
                  {point.label}
                </Text>
              </Horizontal>
              <Horizontal alignItems="center" gap={8}>
                <Text fontSize={13} fontWeight="500" color="color-gray-900">
                  {point.value.toLocaleString()}
                </Text>
                <Text fontSize={12} color="color-gray-500">
                  {percentage}%
                </Text>
              </Horizontal>
            </Horizontal>
          );
        })}
      </Vertical>
    </Vertical>
  );

  if (!Svg || !Path) {
    return renderFallback();
  }

  return (
    <View width="100%" alignItems="center" justifyContent="center">
      <Svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        {slices.map((slice, index) => {
          const isPlaceholder = slice.originalIndex === -1;
          const handlePress = () => {
            if (isPlaceholder) return;

            const tooltipContent = (
              <Vertical minWidth={160} gap={4}>
                <Text fontWeight="600">{slice.label}</Text>
                <Text color="color-gray-500" fontSize={12}>
                  {slice.value.toLocaleString()} ({slice.percentage})
                </Text>
              </Vertical>
            );

            showTooltip(slice.labelX, slice.labelY, tooltipContent);
            onSliceClick?.(
              dataPoints[slice.originalIndex],
              slice.originalIndex
            );
          };

          return (
            <React.Fragment key={`slice-${slice.originalIndex}-${index}`}>
              <Path
                d={slice.path}
                fill={slice.color}
                stroke={resolveSvgColor('color-white', '#ffffff', getColor)}
                strokeWidth={2}
                onPress={!isPlaceholder ? handlePress : undefined}
                onPressOut={!isPlaceholder ? hideTooltip : undefined}
                {...views?.pie}
              />
              {!isPlaceholder &&
                SvgText &&
                slice.endAngle - slice.startAngle > 0.25 && (
                  <SvgText
                    x={slice.labelX}
                    y={slice.labelY}
                    fill="#ffffff"
                    fontSize={11}
                    fontWeight="800"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth={2}
                  >
                    {slice.percentage}
                  </SvgText>
                )}
            </React.Fragment>
          );
        })}
        {isDonut && Circle && (
          <Circle
            cx={centerX}
            cy={centerY}
            r={donutRadius}
            fill={resolveSvgColor('color-white', '#ffffff', getColor)}
          />
        )}
        {isDonut && SvgText && (
          <>
            <SvgText
              x={centerX}
              y={centerY - 8}
              fill={resolveSvgColor('color-gray-500', '#71717a', getColor)}
              fontSize={14}
              fontWeight="500"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              Total
            </SvgText>
            <SvgText
              x={centerX}
              y={centerY + 12}
              fill={resolveSvgColor('color-gray-900', '#18181b', getColor)}
              fontSize={20}
              fontWeight="800"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {total.toLocaleString()}
            </SvgText>
          </>
        )}
      </Svg>
    </View>
  );
};
