import React from 'react';
import { View, Vertical, Horizontal, Text, Button } from 'app-studio';
import { EvaluationRun } from './AgentEval.props';
import { DefaultAgentEvalStyles } from './AgentEval.style';

export interface EvaluationListProps {
  evaluations: EvaluationRun[];
  selectedEvaluation?: EvaluationRun | null;
  onEvaluationSelect: (evaluationId: string) => void;
  onEvaluationStart: (evaluationId: string) => void;
  onEvaluationCancel: (evaluationId: string) => void;
  onEvaluationDelete: (evaluationId: string) => void;
  showProgressIndicators?: boolean;
  compactMode?: boolean;
  views?: {
    container?: any;
    evaluationItem?: any;
    activeEvaluationItem?: any;
  };
}

/**
 * EvaluationList Component
 *
 * Renders a list of evaluations with status, progress, and actions
 */
export const EvaluationList: React.FC<EvaluationListProps> = ({
  evaluations,
  selectedEvaluation,
  onEvaluationSelect,
  onEvaluationStart,
  onEvaluationCancel,
  onEvaluationDelete,
  showProgressIndicators = true,
  compactMode = false,
  views = {},
}) => {
  /**
   * Get status badge style
   */
  const getStatusStyle = (status: string) => {
    const baseStyle = DefaultAgentEvalStyles.statusBadge;

    switch (status) {
      case 'pending':
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusPending };
      case 'running':
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusRunning };
      case 'completed':
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusCompleted };
      case 'failed':
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusFailed };
      case 'cancelled':
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusCancelled };
      default:
        return { ...baseStyle, ...DefaultAgentEvalStyles.statusPending };
    }
  };

  /**
   * Format duration
   */
  const formatDuration = (duration?: number) => {
    if (!duration) return '';
    if (duration < 60000) return `${Math.round(duration / 1000)}s`;
    return `${Math.round(duration / 60000)}m`;
  };

  /**
   * Format timestamp
   */
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View {...DefaultAgentEvalStyles.evaluationList} {...views.container}>
      <Vertical gap={compactMode ? 8 : 12}>
        {evaluations.map((evaluation) => {
          const isSelected = selectedEvaluation?.id === evaluation.id;
          const containerStyle = isSelected
            ? {
                ...DefaultAgentEvalStyles.activeEvaluationItem,
                ...views.activeEvaluationItem,
              }
            : {
                ...DefaultAgentEvalStyles.evaluationItem,
                ...views.evaluationItem,
              };

          return (
            <View
              key={evaluation.id}
              {...containerStyle}
              onClick={() => onEvaluationSelect(evaluation.id)}
            >
              <Vertical gap={compactMode ? 8 : 12}>
                {/* Evaluation Header */}
                <Horizontal
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Vertical gap={4}>
                    <Text {...DefaultAgentEvalStyles.evaluationTitle}>
                      {evaluation.name}
                    </Text>
                    <Horizontal gap={12} alignItems="center">
                      <View {...getStatusStyle(evaluation.status)}>
                        <Text>{evaluation.status}</Text>
                      </View>
                      <Text {...DefaultAgentEvalStyles.evaluationMeta}>
                        {evaluation.testCases.length} test
                        {evaluation.testCases.length !== 1 ? 's' : ''}
                      </Text>
                      <Text {...DefaultAgentEvalStyles.evaluationMeta}>
                        {formatTimestamp(evaluation.startTime)}
                      </Text>
                      {evaluation.duration && (
                        <Text {...DefaultAgentEvalStyles.evaluationMeta}>
                          {formatDuration(evaluation.duration)}
                        </Text>
                      )}
                    </Horizontal>
                  </Vertical>
                </Horizontal>

                {/* Progress Bar */}
                {showProgressIndicators && evaluation.status === 'running' && (
                  <View>
                    <Horizontal
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom={4}
                    >
                      <Text fontSize="xs" color="color.gray.600">
                        Progress
                      </Text>
                      <Text fontSize="xs" color="color.gray.600">
                        {evaluation.progress}%
                      </Text>
                    </Horizontal>
                    <View {...DefaultAgentEvalStyles.progressBar}>
                      <View
                        {...DefaultAgentEvalStyles.progressFill}
                        style={{ width: `${evaluation.progress}%` }}
                      />
                    </View>
                  </View>
                )}

                {/* Summary (for completed evaluations) */}
                {evaluation.summary && !compactMode && (
                  <Horizontal gap={16} alignItems="center">
                    <Text fontSize="sm" color="color.green.700">
                      ✅ {evaluation.summary.passedTests} passed
                    </Text>
                    {evaluation.summary.failedTests > 0 && (
                      <Text fontSize="sm" color="color.red.700">
                        ❌ {evaluation.summary.failedTests} failed
                      </Text>
                    )}
                    <Text fontSize="sm" color="color.gray.600">
                      Avg Score: {evaluation.summary.averageScore.toFixed(1)}
                    </Text>
                    <Text fontSize="sm" color="color.gray.600">
                      Pass Rate:{' '}
                      {(evaluation.summary.passRate * 100).toFixed(1)}%
                    </Text>
                  </Horizontal>
                )}

                {/* Error Message */}
                {evaluation.error && (
                  <View
                    padding={8}
                    backgroundColor="color.red.50"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor="color.red.200"
                  >
                    <Text fontSize="sm" color="color.red.700">
                      Error: {evaluation.error}
                    </Text>
                  </View>
                )}

                {/* Actions */}
                <View {...DefaultAgentEvalStyles.evaluationActions}>
                  <Horizontal gap={8}>
                    {evaluation.status === 'pending' && (
                      <Button
                        {...DefaultAgentEvalStyles.actionButton}
                        {...DefaultAgentEvalStyles.startButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEvaluationStart(evaluation.id);
                        }}
                        size="sm"
                      >
                        ▶️ Start
                      </Button>
                    )}

                    {evaluation.status === 'running' && (
                      <Button
                        {...DefaultAgentEvalStyles.actionButton}
                        {...DefaultAgentEvalStyles.cancelButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEvaluationCancel(evaluation.id);
                        }}
                        size="sm"
                      >
                        ⏹️ Cancel
                      </Button>
                    )}

                    {(evaluation.status === 'completed' ||
                      evaluation.status === 'failed' ||
                      evaluation.status === 'cancelled') && (
                      <Button
                        {...DefaultAgentEvalStyles.actionButton}
                        {...DefaultAgentEvalStyles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEvaluationDelete(evaluation.id);
                        }}
                        size="sm"
                      >
                        🗑️ Delete
                      </Button>
                    )}
                  </Horizontal>
                </View>
              </Vertical>
            </View>
          );
        })}
      </Vertical>
    </View>
  );
};
