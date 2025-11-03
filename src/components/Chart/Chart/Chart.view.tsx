import React, { useCallback } from 'react';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Horizontal } from 'app-studio';
import { Center } from 'app-studio';
import { Loader } from '../../Loader/Loader';
import { ChartProps } from './Chart.props';
import { useChartState } from './Chart.state';
import type { ChartTooltipContext } from './Chart.type';
import {
  ChartContainerStyles,
  ChartTitleStyles,
  ChartLegendStyles,
  LegendItemStyles,
  LegendColorStyles,
  LegendTextStyles,
  TooltipStyles,
  LoadingOverlayStyles,
  ErrorOverlayStyles,
  NoDataOverlayStyles,
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
  tooltipFormatter,
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

  const defaultTooltipFormatter = useCallback(
    (context: ChartTooltipContext) => {
      const { label, seriesName, value, percentage } = context;
      const title = seriesName ?? label;
      const subtitle = seriesName ? label : undefined;

      return (
        <View minWidth="160px">
          {title ? (
            <Text fontWeight="semibold" marginBottom={subtitle ? '4px' : '8px'}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text fontSize="12px" color="color.gray.500" marginBottom="8px">
              {subtitle}
            </Text>
          ) : null}
          <Horizontal alignItems="baseline" gap="8px">
            <Text fontWeight="bold" fontSize="18px">
              {value}
            </Text>
            {typeof percentage === 'number' && Number.isFinite(percentage) ? (
              <Text fontSize="12px" color="color.gray.500">
                {percentage.toFixed(1)}%
              </Text>
            ) : null}
          </Horizontal>
        </View>
      );
    },
    []
  );

  const getTooltipContent = useCallback(
    (context: ChartTooltipContext) => {
      const customContent = tooltipFormatter?.(context);

      if (customContent !== undefined && customContent !== null) {
        return customContent;
      }

      return defaultTooltipFormatter(context);
    },
    [defaultTooltipFormatter, tooltipFormatter]
  );

  // Render legend
  const renderLegend = () => {
    if (!showLegend || !chartData) return null;

    let items: any[] = [];

    if (type === 'pie' || type === 'donut') {
      // For pie/donut charts, use dataPoints
      if (Array.isArray(chartData)) {
        items = chartData as any[];
      }
    } else {
      // For other charts, use data.series
      if (chartData && (chartData as any).series) {
        items = (chartData as any).series;
      }
    }

    // If no items to display, don't render the legend
    if (!items || items.length === 0) return null;

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
            getTooltipContent={getTooltipContent}
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
            chartType={type}
            getTooltipContent={getTooltipContent}
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
            getTooltipContent={getTooltipContent}
          />
        );
      default:
        return null;
    }
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!showTooltips || !tooltip.visible) return null;

    // Calculate tooltip position with boundary checking
    const tooltipWidth = 220; // Approximate tooltip width to accommodate richer content
    const tooltipHeight = 80; // Approximate tooltip height for multi-line tooltips
    const offset = 10; // Offset from cursor

    let left = tooltip.x - tooltipWidth / 2;
    let top = tooltip.y - tooltipHeight - offset;

    // Check top boundary; if there's not enough space above, show below the cursor
    if (top < offset) {
      top = tooltip.y + offset;
    }

    // Ensure tooltip stays within the viewport horizontally
    if (left + tooltipWidth > window.innerWidth - offset) {
      left = window.innerWidth - tooltipWidth - offset;
    }

    if (left < offset) {
      left = offset;
    }

    // Ensure tooltip stays within the viewport vertically when shown below
    if (top + tooltipHeight > window.innerHeight - offset) {
      top = window.innerHeight - tooltipHeight - offset;
    }

    return (
      <View
        position="fixed"
        left={`${left}px`}
        top={`${top}px`}
        {...TooltipStyles}
        {...views?.tooltip}
      >
        {tooltip.content}
      </View>
    );
  };

  // Default loading indicator
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

  // Default error indicator
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

  // Default no data indicator
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

  // Determine effective aria-label
  const effectiveAriaLabel =
    ariaLabel ?? (typeof title === 'string' ? title : 'Chart');

  // Determine if we should show the chart content
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

      {/* Only show legend when chart content is visible */}
      {showChartContent && legendPosition === 'top' && renderLegend()}

      <View flex={1} width="100%" position="relative" {...views?.chart}>
        {showChartContent && renderChart()}

        {/* Render overlays */}
        {renderLoadingIndicator()}
        {renderErrorIndicator()}
        {renderNoDataIndicator()}
      </View>

      {/* Only show legend when chart content is visible */}
      {showChartContent && legendPosition === 'bottom' && renderLegend()}

      {renderTooltip()}
    </View>
  );
};
