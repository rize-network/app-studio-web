import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { EvaluationRun, EvaluationResult } from './AgentEval.props';
import { DefaultAgentEvalStyles } from './AgentEval.style';

export interface EvaluationResultsProps {
  evaluation: EvaluationRun;
  selectedResult?: EvaluationResult | null;
  onResultSelect: (result: EvaluationResult) => void;
  showTestCaseDetails?: boolean;
  views?: {
    container?: any;
    testCaseList?: any;
    testCaseItem?: any;
  };
}

/**
 * EvaluationResults Component
 *
 * Displays evaluation results with summary and detailed test case results
 */
export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
  selectedResult,
  onResultSelect,
  showTestCaseDetails = true,
  views = {},
}) => {
  /**
   * Get test case status style
   */
  const getTestCaseStatusStyle = (status: string) => {
    const baseStyle = DefaultAgentEvalStyles.testCaseStatus;

    switch (status) {
      case 'pass':
        return { ...baseStyle, ...DefaultAgentEvalStyles.testCasePass };
      case 'fail':
        return { ...baseStyle, ...DefaultAgentEvalStyles.testCaseFail };
      case 'error':
        return { ...baseStyle, ...DefaultAgentEvalStyles.testCaseError };
      case 'skip':
        return { ...baseStyle, ...DefaultAgentEvalStyles.testCaseSkip };
      default:
        return baseStyle;
    }
  };

  /**
   * Get status icon
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return '✅';
      case 'fail':
        return '❌';
      case 'error':
        return '⚠️';
      case 'skip':
        return '⏭️';
      default:
        return '❓';
    }
  };

  /**
   * Format duration
   */
  const formatDuration = (duration: number) => {
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  return (
    <View {...DefaultAgentEvalStyles.resultsPanel} {...views.container}>
      <Vertical gap={24}>
        {/* Summary */}
        {evaluation.summary && (
          <View {...DefaultAgentEvalStyles.resultsSummary}>
            <Text fontSize="lg" fontWeight="600" marginBottom={16}>
              Evaluation Summary
            </Text>

            <View {...DefaultAgentEvalStyles.summaryGrid}>
              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text {...DefaultAgentEvalStyles.summaryValue}>
                  {evaluation.summary.totalTests}
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>
                  Total Tests
                </Text>
              </View>

              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text
                  {...DefaultAgentEvalStyles.summaryValue}
                  color="color.green.600"
                >
                  {evaluation.summary.passedTests}
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>Passed</Text>
              </View>

              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text
                  {...DefaultAgentEvalStyles.summaryValue}
                  color="color.red.600"
                >
                  {evaluation.summary.failedTests}
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>Failed</Text>
              </View>

              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text {...DefaultAgentEvalStyles.summaryValue}>
                  {evaluation.summary.averageScore.toFixed(1)}
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>Avg Score</Text>
              </View>

              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text {...DefaultAgentEvalStyles.summaryValue}>
                  {(evaluation.summary.passRate * 100).toFixed(1)}%
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>Pass Rate</Text>
              </View>

              <View {...DefaultAgentEvalStyles.summaryCard}>
                <Text {...DefaultAgentEvalStyles.summaryValue}>
                  {formatDuration(evaluation.summary.totalDuration)}
                </Text>
                <Text {...DefaultAgentEvalStyles.summaryLabel}>Total Time</Text>
              </View>
            </View>
          </View>
        )}

        {/* Test Case Results */}
        <View>
          <Text fontSize="lg" fontWeight="600" marginBottom={16}>
            Test Case Results
          </Text>

          <View
            {...DefaultAgentEvalStyles.testCaseList}
            {...views.testCaseList}
          >
            <Vertical gap={8}>
              {evaluation.testCases.map((testCase) => {
                const result = evaluation.results?.find(
                  (r) => r.testCaseId === testCase.id
                );
                const isSelected = selectedResult?.testCaseId === testCase.id;

                return (
                  <View
                    key={testCase.id}
                    {...DefaultAgentEvalStyles.testCaseItem}
                    {...views.testCaseItem}
                    onClick={() => result && onResultSelect(result)}
                    style={{
                      borderColor: isSelected ? '#3b82f6' : undefined,
                      backgroundColor: isSelected ? '#eff6ff' : undefined,
                    }}
                  >
                    <Vertical gap={8}>
                      {/* Test Case Header */}
                      <Horizontal
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Horizontal gap={8} alignItems="center">
                          <Text fontSize="16px">
                            {result ? getStatusIcon(result.status) : '⏳'}
                          </Text>
                          <Text {...DefaultAgentEvalStyles.testCaseName}>
                            {testCase.name}
                          </Text>
                          {result && (
                            <Text {...getTestCaseStatusStyle(result.status)}>
                              {result.status}
                            </Text>
                          )}
                        </Horizontal>

                        <Horizontal gap={12} alignItems="center">
                          {result?.score !== undefined && (
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color="color.gray.700"
                            >
                              Score: {result.score.toFixed(2)}
                            </Text>
                          )}
                          {result?.duration && (
                            <Text fontSize="sm" color="color.gray.600">
                              {formatDuration(result.duration)}
                            </Text>
                          )}
                        </Horizontal>
                      </Horizontal>

                      {/* Test Case Description */}
                      {testCase.description && (
                        <Text fontSize="sm" color="color.gray.600">
                          {testCase.description}
                        </Text>
                      )}

                      {/* Tags */}
                      {testCase.tags && testCase.tags.length > 0 && (
                        <Horizontal gap={4} flexWrap="wrap">
                          {testCase.tags.map((tag, index) => (
                            <View
                              key={index}
                              padding="2px 6px"
                              backgroundColor="color.blue.100"
                              borderRadius="4px"
                              border="1px solid"
                              borderColor="color.blue.200"
                            >
                              <Text fontSize="10px" color="color.blue.800">
                                {tag}
                              </Text>
                            </View>
                          ))}
                        </Horizontal>
                      )}

                      {/* Error Message */}
                      {result?.error && (
                        <View
                          padding={8}
                          backgroundColor="color.red.50"
                          borderRadius="4px"
                          border="1px solid"
                          borderColor="color.red.200"
                        >
                          <Text fontSize="sm" color="color.red.700">
                            Error: {result.error}
                          </Text>
                        </View>
                      )}

                      {/* Detailed Results (when selected) */}
                      {isSelected && result && showTestCaseDetails && (
                        <View
                          padding={12}
                          backgroundColor="color.gray.50"
                          borderRadius="6px"
                          marginTop={8}
                        >
                          <Vertical gap={12}>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color="color.gray.700"
                            >
                              Test Case Details
                            </Text>

                            {/* Input */}
                            <View>
                              <Text
                                fontSize="xs"
                                fontWeight="600"
                                color="color.gray.700"
                                marginBottom={4}
                              >
                                Input
                              </Text>
                              <View
                                padding={8}
                                backgroundColor="color.white"
                                borderRadius="4px"
                                border="1px solid"
                                borderColor="color.gray.200"
                              >
                                <Text
                                  fontSize="xs"
                                  fontFamily="Monaco, Consolas, monospace"
                                >
                                  {JSON.stringify(testCase.input, null, 2)}
                                </Text>
                              </View>
                            </View>

                            {/* Expected Output */}
                            {testCase.expectedOutput && (
                              <View>
                                <Text
                                  fontSize="xs"
                                  fontWeight="600"
                                  color="color.gray.700"
                                  marginBottom={4}
                                >
                                  Expected Output
                                </Text>
                                <View
                                  padding={8}
                                  backgroundColor="color.white"
                                  borderRadius="4px"
                                  border="1px solid"
                                  borderColor="color.gray.200"
                                >
                                  <Text
                                    fontSize="xs"
                                    fontFamily="Monaco, Consolas, monospace"
                                  >
                                    {JSON.stringify(
                                      testCase.expectedOutput,
                                      null,
                                      2
                                    )}
                                  </Text>
                                </View>
                              </View>
                            )}

                            {/* Actual Output */}
                            {result.actualOutput && (
                              <View>
                                <Text
                                  fontSize="xs"
                                  fontWeight="600"
                                  color="color.gray.700"
                                  marginBottom={4}
                                >
                                  Actual Output
                                </Text>
                                <View
                                  padding={8}
                                  backgroundColor="color.white"
                                  borderRadius="4px"
                                  border="1px solid"
                                  borderColor="color.gray.200"
                                >
                                  <Text
                                    fontSize="xs"
                                    fontFamily="Monaco, Consolas, monospace"
                                  >
                                    {JSON.stringify(
                                      result.actualOutput,
                                      null,
                                      2
                                    )}
                                  </Text>
                                </View>
                              </View>
                            )}

                            {/* Metrics */}
                            {Object.keys(result.metrics).length > 0 && (
                              <View>
                                <Text
                                  fontSize="xs"
                                  fontWeight="600"
                                  color="color.gray.700"
                                  marginBottom={4}
                                >
                                  Metrics
                                </Text>
                                <Horizontal gap={8} flexWrap="wrap">
                                  {Object.entries(result.metrics).map(
                                    ([metric, value]) => (
                                      <View
                                        key={metric}
                                        padding="4px 8px"
                                        backgroundColor="color.blue.50"
                                        borderRadius="4px"
                                        border="1px solid"
                                        borderColor="color.blue.200"
                                      >
                                        <Text
                                          fontSize="xs"
                                          color="color.blue.800"
                                        >
                                          {metric}: {value.toFixed(3)}
                                        </Text>
                                      </View>
                                    )
                                  )}
                                </Horizontal>
                              </View>
                            )}
                          </Vertical>
                        </View>
                      )}
                    </Vertical>
                  </View>
                );
              })}
            </Vertical>
          </View>
        </View>
      </Vertical>
    </View>
  );
};
