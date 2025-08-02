import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { EvaluationRun } from './AgentEval.props';
import { DefaultAgentEvalStyles } from './AgentEval.style';

export interface EvaluationMetricsProps {
  evaluations: EvaluationRun[];
  enableComparison?: boolean;
  views?: {
    container?: any;
  };
}

/**
 * EvaluationMetrics Component
 *
 * Displays aggregated metrics and comparisons across evaluations
 */
export const EvaluationMetrics: React.FC<EvaluationMetricsProps> = ({
  evaluations,
  enableComparison = true,
  views = {},
}) => {
  /**
   * Calculate overall metrics
   */
  const calculateOverallMetrics = () => {
    const completedEvaluations = evaluations.filter(
      (e) => e.status === 'completed' && e.summary
    );

    if (completedEvaluations.length === 0) {
      return null;
    }

    const totalTests = completedEvaluations.reduce(
      (sum, e) => sum + (e.summary?.totalTests || 0),
      0
    );
    const totalPassed = completedEvaluations.reduce(
      (sum, e) => sum + (e.summary?.passedTests || 0),
      0
    );
    const totalFailed = completedEvaluations.reduce(
      (sum, e) => sum + (e.summary?.failedTests || 0),
      0
    );
    const avgScore =
      completedEvaluations.reduce(
        (sum, e) => sum + (e.summary?.averageScore || 0),
        0
      ) / completedEvaluations.length;
    const avgPassRate =
      completedEvaluations.reduce(
        (sum, e) => sum + (e.summary?.passRate || 0),
        0
      ) / completedEvaluations.length;
    const totalDuration = completedEvaluations.reduce(
      (sum, e) => sum + (e.summary?.totalDuration || 0),
      0
    );

    return {
      totalEvaluations: completedEvaluations.length,
      totalTests,
      totalPassed,
      totalFailed,
      avgScore,
      avgPassRate,
      totalDuration,
    };
  };

  /**
   * Get recent evaluations for trend analysis
   */
  const getRecentEvaluations = (count = 5) => {
    return evaluations
      .filter((e) => e.status === 'completed' && e.summary)
      .sort((a, b) => b.startTime - a.startTime)
      .slice(0, count);
  };

  /**
   * Format duration
   */
  const formatDuration = (duration: number) => {
    if (duration < 60000) return `${Math.round(duration / 1000)}s`;
    if (duration < 3600000) return `${Math.round(duration / 60000)}m`;
    return `${Math.round(duration / 3600000)}h`;
  };

  const overallMetrics = calculateOverallMetrics();
  const recentEvaluations = getRecentEvaluations();

  return (
    <View {...DefaultAgentEvalStyles.metricsPanel} {...views.container}>
      <Vertical gap={32}>
        {/* Overall Metrics */}
        {overallMetrics && (
          <View>
            <Text fontSize="lg" fontWeight="600" marginBottom={16}>
              Overall Performance
            </Text>

            <View {...DefaultAgentEvalStyles.metricsGrid}>
              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>
                  Total Evaluations
                </Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {overallMetrics.totalEvaluations}
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>Total Tests</Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {overallMetrics.totalTests}
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>
                  Average Score
                </Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {overallMetrics.avgScore.toFixed(1)}
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>Pass Rate</Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {(overallMetrics.avgPassRate * 100).toFixed(1)}%
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>
                  Success Rate
                </Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {(
                    (overallMetrics.totalPassed / overallMetrics.totalTests) *
                    100
                  ).toFixed(1)}
                  %
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.metricCard}>
                <Text {...DefaultAgentEvalStyles.metricTitle}>Total Time</Text>
                <Text {...DefaultAgentEvalStyles.metricValue}>
                  {formatDuration(overallMetrics.totalDuration)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Recent Evaluations Trend */}
        {recentEvaluations.length > 0 && (
          <View>
            <Text fontSize="lg" fontWeight="600" marginBottom={16}>
              Recent Performance Trend
            </Text>

            <View
              padding={16}
              backgroundColor="color.gray.50"
              borderRadius="8px"
              border="1px solid"
              borderColor="color.gray.200"
            >
              <Vertical gap={12}>
                {recentEvaluations.map((evaluation, index) => (
                  <Horizontal
                    key={evaluation.id}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Vertical gap={2}>
                      <Text fontSize="sm" fontWeight="600">
                        {evaluation.name}
                      </Text>
                      <Text fontSize="xs" color="color.gray.600">
                        {new Date(evaluation.startTime).toLocaleDateString()}
                      </Text>
                    </Vertical>

                    <Horizontal gap={16} alignItems="center">
                      <Text fontSize="sm" color="color.green.700">
                        {evaluation.summary?.passedTests || 0} passed
                      </Text>
                      <Text fontSize="sm" color="color.red.700">
                        {evaluation.summary?.failedTests || 0} failed
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        {evaluation.summary?.averageScore.toFixed(1) || 0} avg
                      </Text>
                      <Text fontSize="sm" color="color.gray.600">
                        {((evaluation.summary?.passRate || 0) * 100).toFixed(1)}
                        %
                      </Text>
                    </Horizontal>
                  </Horizontal>
                ))}
              </Vertical>
            </View>
          </View>
        )}

        {/* Evaluation Status Distribution */}
        <View>
          <Text fontSize="lg" fontWeight="600" marginBottom={16}>
            Evaluation Status
          </Text>

          <View {...DefaultAgentEvalStyles.metricsGrid}>
            {['completed', 'running', 'failed', 'cancelled', 'pending'].map(
              (status) => {
                const count = evaluations.filter(
                  (e) => e.status === status
                ).length;
                const percentage =
                  evaluations.length > 0
                    ? (count / evaluations.length) * 100
                    : 0;

                return (
                  <View key={status} {...DefaultAgentEvalStyles.metricCard}>
                    <Text
                      {...DefaultAgentEvalStyles.metricTitle}
                      textTransform="capitalize"
                    >
                      {status}
                    </Text>
                    <Text {...DefaultAgentEvalStyles.metricValue}>{count}</Text>
                    <Text fontSize="xs" color="color.gray.600">
                      {percentage.toFixed(1)}%
                    </Text>
                  </View>
                );
              }
            )}
          </View>
        </View>

        {/* Performance Insights */}
        {overallMetrics && (
          <View>
            <Text fontSize="lg" fontWeight="600" marginBottom={16}>
              Performance Insights
            </Text>

            <View
              padding={16}
              backgroundColor="color.blue.50"
              borderRadius="8px"
              border="1px solid"
              borderColor="color.blue.200"
            >
              <Vertical gap={8}>
                <Text fontSize="sm" fontWeight="600" color="color.blue.800">
                  📊 Key Insights
                </Text>

                {overallMetrics.avgPassRate > 0.9 && (
                  <Text fontSize="sm" color="color.green.700">
                    ✅ Excellent performance with{' '}
                    {(overallMetrics.avgPassRate * 100).toFixed(1)}% average
                    pass rate
                  </Text>
                )}

                {overallMetrics.avgPassRate < 0.7 && (
                  <Text fontSize="sm" color="color.red.700">
                    ⚠️ Consider reviewing test cases or agent configuration
                    (pass rate: {(overallMetrics.avgPassRate * 100).toFixed(1)}
                    %)
                  </Text>
                )}

                {overallMetrics.totalEvaluations >= 10 && (
                  <Text fontSize="sm" color="color.blue.700">
                    📈 Good evaluation coverage with{' '}
                    {overallMetrics.totalEvaluations} completed evaluations
                  </Text>
                )}

                {overallMetrics.totalEvaluations < 5 && (
                  <Text fontSize="sm" color="color.yellow.700">
                    💡 Consider running more evaluations for better performance
                    insights
                  </Text>
                )}
              </Vertical>
            </View>
          </View>
        )}

        {/* Empty State */}
        {!overallMetrics && (
          <View textAlign="center" padding={32}>
            <Text fontSize="lg" color="color.gray.500">
              No completed evaluations yet
            </Text>
            <Text fontSize="sm" color="color.gray.400" marginTop={8}>
              Run some evaluations to see performance metrics
            </Text>
          </View>
        )}
      </Vertical>
    </View>
  );
};
