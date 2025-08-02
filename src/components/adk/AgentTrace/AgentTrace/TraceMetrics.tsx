import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { TraceMetrics as TraceMetricsType } from './AgentTrace.props';
import { DefaultAgentTraceStyles } from './AgentTrace.style';

export interface TraceMetricsProps {
  metrics: TraceMetricsType;
  showPerformanceMetrics?: boolean;
  compactMode?: boolean;
  views?: {
    container?: any;
  };
}

/**
 * TraceMetrics Component
 * 
 * Displays performance metrics and statistics for trace events
 */
export const TraceMetrics: React.FC<TraceMetricsProps> = ({
  metrics,
  showPerformanceMetrics = true,
  compactMode = false,
  views = {},
}) => {
  /**
   * Format duration
   */
  const formatDuration = (duration: number) => {
    if (duration < 1000) return `${duration.toFixed(1)}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  /**
   * Format percentage
   */
  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  /**
   * Get success rate color
   */
  const getSuccessRateColor = (successCount: number, totalCount: number) => {
    const rate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;
    if (rate >= 95) return 'color.green.600';
    if (rate >= 80) return 'color.yellow.600';
    return 'color.red.600';
  };

  return (
    <View {...DefaultAgentTraceStyles.metrics} {...views.container}>
      <Vertical gap={compactMode ? 12 : 16}>
        {/* Main Metrics */}
        <View {...DefaultAgentTraceStyles.metricsGrid}>
          {/* Total Events */}
          <View {...DefaultAgentTraceStyles.metricCard}>
            <Text {...DefaultAgentTraceStyles.metricValue}>
              {metrics.totalEvents.toLocaleString()}
            </Text>
            <Text {...DefaultAgentTraceStyles.metricLabel}>
              Total Events
            </Text>
          </View>

          {/* Success Rate */}
          <View {...DefaultAgentTraceStyles.metricCard}>
            <Text 
              {...DefaultAgentTraceStyles.metricValue}
              color={getSuccessRateColor(metrics.successCount, metrics.totalEvents)}
            >
              {formatPercentage(metrics.successCount, metrics.totalEvents)}
            </Text>
            <Text {...DefaultAgentTraceStyles.metricLabel}>
              Success Rate
            </Text>
          </View>

          {/* Average Response Time */}
          <View {...DefaultAgentTraceStyles.metricCard}>
            <Text {...DefaultAgentTraceStyles.metricValue}>
              {formatDuration(metrics.averageResponseTime)}
            </Text>
            <Text {...DefaultAgentTraceStyles.metricLabel}>
              Avg Response
            </Text>
          </View>

          {/* Total Duration */}
          <View {...DefaultAgentTraceStyles.metricCard}>
            <Text {...DefaultAgentTraceStyles.metricValue}>
              {formatDuration(metrics.totalDuration)}
            </Text>
            <Text {...DefaultAgentTraceStyles.metricLabel}>
              Total Duration
            </Text>
          </View>

          {/* Error Count */}
          {metrics.errorCount > 0 && (
            <View {...DefaultAgentTraceStyles.metricCard}>
              <Text 
                {...DefaultAgentTraceStyles.metricValue}
                color="color.red.600"
              >
                {metrics.errorCount}
              </Text>
              <Text {...DefaultAgentTraceStyles.metricLabel}>
                Errors
              </Text>
            </View>
          )}

          {/* Function Calls */}
          {metrics.functionCallCount > 0 && (
            <View {...DefaultAgentTraceStyles.metricCard}>
              <Text {...DefaultAgentTraceStyles.metricValue}>
                {metrics.functionCallCount}
              </Text>
              <Text {...DefaultAgentTraceStyles.metricLabel}>
                Function Calls
              </Text>
            </View>
          )}

          {/* LLM Requests */}
          {metrics.llmRequestCount > 0 && (
            <View {...DefaultAgentTraceStyles.metricCard}>
              <Text {...DefaultAgentTraceStyles.metricValue}>
                {metrics.llmRequestCount}
              </Text>
              <Text {...DefaultAgentTraceStyles.metricLabel}>
                LLM Requests
              </Text>
            </View>
          )}
        </View>

        {/* Performance Metrics */}
        {showPerformanceMetrics && !compactMode && (
          <View>
            <Text fontSize="sm" fontWeight="600" color="color.gray.700" marginBottom={12}>
              Response Time Percentiles
            </Text>
            <Horizontal gap={16}>
              <View {...DefaultAgentTraceStyles.metricCard} flex={1}>
                <Text {...DefaultAgentTraceStyles.metricValue} fontSize="16px">
                  {formatDuration(metrics.performanceMetrics.p50)}
                </Text>
                <Text {...DefaultAgentTraceStyles.metricLabel}>
                  P50
                </Text>
              </View>
              <View {...DefaultAgentTraceStyles.metricCard} flex={1}>
                <Text {...DefaultAgentTraceStyles.metricValue} fontSize="16px">
                  {formatDuration(metrics.performanceMetrics.p90)}
                </Text>
                <Text {...DefaultAgentTraceStyles.metricLabel}>
                  P90
                </Text>
              </View>
              <View {...DefaultAgentTraceStyles.metricCard} flex={1}>
                <Text {...DefaultAgentTraceStyles.metricValue} fontSize="16px">
                  {formatDuration(metrics.performanceMetrics.p95)}
                </Text>
                <Text {...DefaultAgentTraceStyles.metricLabel}>
                  P95
                </Text>
              </View>
              <View {...DefaultAgentTraceStyles.metricCard} flex={1}>
                <Text {...DefaultAgentTraceStyles.metricValue} fontSize="16px">
                  {formatDuration(metrics.performanceMetrics.p99)}
                </Text>
                <Text {...DefaultAgentTraceStyles.metricLabel}>
                  P99
                </Text>
              </View>
            </Horizontal>
          </View>
        )}

        {/* Event Type Breakdown */}
        {!compactMode && Object.keys(metrics.eventsByType).length > 0 && (
          <View>
            <Text fontSize="sm" fontWeight="600" color="color.gray.700" marginBottom={12}>
              Events by Type
            </Text>
            <Horizontal gap={8} flexWrap="wrap">
              {Object.entries(metrics.eventsByType).map(([type, count]) => (
                <View 
                  key={type}
                  padding="6px 12px"
                  backgroundColor="color.blue.50"
                  borderRadius="6px"
                  border="1px solid"
                  borderColor="color.blue.200"
                >
                  <Horizontal gap={8} alignItems="center">
                    <Text fontSize="sm" fontWeight="600" color="color.blue.800">
                      {type.replace('_', ' ')}
                    </Text>
                    <Text fontSize="sm" color="color.blue.600">
                      {count}
                    </Text>
                    <Text fontSize="xs" color="color.blue.500">
                      ({formatPercentage(count, metrics.totalEvents)})
                    </Text>
                  </Horizontal>
                </View>
              ))}
            </Horizontal>
          </View>
        )}
      </Vertical>
    </View>
  );
};
