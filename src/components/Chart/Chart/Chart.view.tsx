import React from 'react';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Center } from 'app-studio';
import { Loader } from '../../Loader/Loader';
import { ChartProps } from './Chart.props';
import { useChartState } from './Chart.state';
import {
  ChartContainerStyles,
  ChartTitleStyles,
  ChartLegendStyles,
  LegendItemStyles,
  LegendColorStyles,
  LegendTextStyles,
  LoadingOverlayStyles,
  ErrorOverlayStyles,
  NoDataOverlayStyles,
} from './Chart.style';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { ChartTooltip } from './ChartTooltip';
// Defines the main ChartView functional component, responsible for rendering different chart types, legends, and various status indicators based on its provided properties.
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
  isLoading = false,
  error,
  noData,
  loadingIndicator,
  errorIndicator,
  noDataIndicator,
  'aria-label': ariaLabel,
  themeMode: elementMode,
  ...props
}) => {
  // Destructures state variables and utility functions from the `useChartState` hook, managing animation progress, tooltip visibility, container references, and processed data for the chart.
  const {
    animationProgress,
    tooltip,
    containerRef,
    processedData,
    showTooltip: showTooltipState,
    hideTooltip: hideTooltipState,
    getChartDimensions,
    toggleSeries,
  } = useChartState({
    data,
    dataPoints,
    animated,
    animationDuration,
    showTooltips,
  });
  // Retrieves the processed and formatted chart data from the state hook, which is then used by the specific chart components for rendering.
  const chartData = processedData();
  // Destructures the dynamically calculated width and height of the chart's containing element.
  const { width: containerWidth, height: containerHeight } =
    getChartDimensions();
  // Determines the effective width of the chart, prioritizing the `propWidth` if provided, otherwise using the calculated `containerWidth`.
  const width = propWidth || containerWidth;
  // Calculates the effective height of the chart, considering `propHeight`, responsive behavior based on aspect ratio, or falling back to `containerHeight`.
  const height =
    propHeight || (responsive ? containerWidth / aspectRatio : containerHeight);
  // A utility function to render the chart legend, which displays color-coded labels for data series or points and supports interactive toggling of series visibility.
  const renderLegend = () => {
    if (!showLegend || !chartData) return null;
    let items: any[] = [];
    if (type === 'pie' || type === 'donut') {
      if (Array.isArray(chartData)) {
        items = chartData as any[];
      }
    } else {
      if (chartData && (chartData as any).series) {
        items = (chartData as any).series;
      }
    }
    if (!items || items.length === 0) return null;
    return (
      <Horizontal
        flexWrap="wrap"
        justifyContent="flex-start"
        marginTop={legendPosition === 'bottom' ? '16px' : 0}
        marginBottom={legendPosition === 'top' ? '16px' : 0}
        {...ChartLegendStyles}
        {...views?.legend}
      >
        {items.map((item: any, index: number) => {
          const isHidden = item.hidden;
          const label = item.name || item.label;
          return (
            <View
              key={`legend-${index}`}
              {...LegendItemStyles}
              onClick={() => toggleSeries(label)}
              opacity={isHidden ? 0.4 : 1}
              {...views?.legendItem}
            >
              <View
                backgroundColor={item.color}
                {...LegendColorStyles}
                opacity={isHidden ? 0.3 : 1}
              />
              <Text
                {...LegendTextStyles}
                textDecoration={isHidden ? 'line-through' : 'none'}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </Horizontal>
    );
  };
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
  const renderLoadingIndicator = () => {
    if (!isLoading) return null;
    return (
      <View {...LoadingOverlayStyles} {...views?.loadingOverlay}>
        {loadingIndicator || (
          <Center>
            <Loader size="lg" />
          </Center>
        )}
      </View>
    );
  };
  const renderErrorIndicator = () => {
    if (!error) return null;
    return (
      <View {...ErrorOverlayStyles} {...views?.errorOverlay}>
        {errorIndicator || (
          <Text fontWeight="medium">
            {typeof error === 'string' ? error : 'An error occurred'}
          </Text>
        )}
      </View>
    );
  };
  const renderNoDataIndicator = () => {
    if (!noData) return null;
    return (
      <View {...NoDataOverlayStyles} {...views?.noDataOverlay}>
        {noDataIndicator || (
          <Text>
            {typeof noData === 'string' ? noData : 'No data available'}
          </Text>
        )}
      </View>
    );
  };
  const effectiveAriaLabel =
    ariaLabel ?? (typeof title === 'string' ? title : 'Chart');
  const showChartContent = !error && !isLoading && !noData;
  return (
    <View
      ref={containerRef}
      role="region"
      aria-label={effectiveAriaLabel}
      aria-busy={isLoading}
      {...ChartContainerStyles}
      {...views?.container}
      {...props}
    >
      {title && <Text {...ChartTitleStyles}>{title}</Text>}
      {}
      {showChartContent && legendPosition === 'top' && renderLegend()}
      <View flex={1} width="100%" position="relative" {...views?.chart}>
        {showChartContent && renderChart()}
        {}
        {renderLoadingIndicator()}
        {renderErrorIndicator()}
        {renderNoDataIndicator()}
        <ChartTooltip
          visible={showTooltips && tooltip.visible}
          x={tooltip.x}
          y={tooltip.y}
          content={tooltip.content}
          maxDistance={100}
          views={views}
        />
      </View>
      {}
      {showChartContent && legendPosition === 'bottom' && renderLegend()}
    </View>
  );
};
