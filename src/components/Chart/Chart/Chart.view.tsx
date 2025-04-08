import React from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { ChartProps } from './Chart.props';
import { useChartState } from './Chart.state';
import {
  ChartContainerStyles,
  ChartTitleStyles,
  ChartLegendStyles,
  LegendItemStyles,
  LegendColorStyles,
  LegendTextStyles,
  TooltipStyles,
} from './Chart.style';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

export const ChartView: React.FC<ChartProps> = ({
  type,
  data,
  dataPoints,
  title,
  showLegend = true,
  legendPosition = 'bottom',
  showGrid = true,
  showTooltips = true,
  animated = true,
  animationDuration = 500,
  responsive = true,
  aspectRatio = 16 / 9,
  width: propWidth = 200,
  height: propHeight = 200,
  views,
  onDataPointClick,
  onSeriesClick,
  ...props
}) => {
  // Use chart state hook
  const {
    animationProgress,
    tooltip,
    containerRef,
    processedData,
    showTooltip: showTooltipState,
    hideTooltip: hideTooltipState,
    getChartDimensions,
  } = useChartState({
    data,
    dataPoints,
    animated,
    animationDuration,
    showTooltips,
  });

  // Get processed data
  const chartData = processedData();

  // Calculate dimensions
  const { width: containerWidth, height: containerHeight } =
    getChartDimensions();
  const width = propWidth || containerWidth;
  const height =
    propHeight || (responsive ? containerWidth / aspectRatio : containerHeight);

  // Render legend
  const renderLegend = () => {
    if (!showLegend) return null;

    let items = [];

    if (type === 'pie' || type === 'donut') {
      // For pie/donut charts, use dataPoints
      items = chartData as any[];
    } else {
      // For other charts, use data.series
      items = (chartData as any).series;
    }

    return (
      <Horizontal
        flexWrap="wrap"
        justifyContent="center"
        marginTop={legendPosition === 'bottom' ? '16px' : 0}
        marginBottom={legendPosition === 'top' ? '16px' : 0}
        {...ChartLegendStyles}
        {...views?.legend}
      >
        {items.map((item: any, index: number) => (
          <View
            key={`legend-${index}`}
            {...LegendItemStyles}
            {...views?.legendItem}
          >
            <View backgroundColor={item.color} {...LegendColorStyles} />
            <Text {...LegendTextStyles}>{item.name || item.label}</Text>
          </View>
        ))}
      </Horizontal>
    );
  };

  // Render chart based on type
  const renderChart = () => {
    if (!chartData) return null;

    switch (type) {
      case 'bar':
        return (
          <BarChart
            data={chartData as any}
            width={width as number}
            height={height as number}
            animationProgress={animationProgress}
            showGrid={showGrid}
            onBarClick={onSeriesClick}
            showTooltip={showTooltipState}
            hideTooltip={hideTooltipState}
            views={views}
          />
        );
      case 'line':
      case 'area':
        return (
          <LineChart
            data={chartData as any}
            width={width as number}
            height={height as number}
            animationProgress={animationProgress}
            showGrid={showGrid}
            onPointClick={onSeriesClick}
            showTooltip={showTooltipState}
            hideTooltip={hideTooltipState}
            views={views}
          />
        );
      case 'pie':
      case 'donut':
        return (
          <PieChart
            dataPoints={chartData as any}
            width={width as number}
            height={height as number}
            animationProgress={animationProgress}
            isDonut={type === 'donut'}
            onSliceClick={onDataPointClick}
            showTooltip={showTooltipState}
            hideTooltip={hideTooltipState}
            views={views}
          />
        );
      default:
        return null;
    }
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!showTooltips || !tooltip.visible) return null;

    return (
      <View
        position="fixed"
        left={`${tooltip.x}px`}
        top={`${tooltip.y - 40}px`}
        {...TooltipStyles}
        {...views?.tooltip}
      >
        {tooltip.content}
      </View>
    );
  };

  return (
    <View
      ref={containerRef}
      {...ChartContainerStyles}
      {...views?.container}
      {...props}
    >
      {title && <Text {...ChartTitleStyles}>{title}</Text>}

      {legendPosition === 'top' && renderLegend()}

      <View flex={1} width="100%" position="relative" {...views?.chart}>
        {renderChart()}
      </View>

      {legendPosition === 'bottom' && renderLegend()}

      {renderTooltip()}
    </View>
  );
};
