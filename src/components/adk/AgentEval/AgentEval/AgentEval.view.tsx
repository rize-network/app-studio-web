import React from 'react';
import { View, Vertical, Horizontal, Text, Button } from 'app-studio';
import { AgentEvalProps } from './AgentEval.props';
import { useAgentEval } from './AgentEval.state';
import { DefaultAgentEvalStyles } from './AgentEval.style';
import { EvaluationList } from './EvaluationList';
import { EvaluationCreator } from './EvaluationCreator';
import { EvaluationResults } from './EvaluationResults';
import { EvaluationMetrics } from './EvaluationMetrics';
import { Loader } from 'src/components/Loader/Loader';
import { TextField } from 'src/components/Form/Form';

export interface AgentEvalViewProps
  extends AgentEvalProps,
    ReturnType<typeof useAgentEval> {}

/**
 * AgentEval View Component
 *
 * Renders the complete evaluation interface with creation, monitoring, and results analysis
 */
const AgentEvalView: React.FC<AgentEvalViewProps> = ({
  // Props
  enableBatchEvaluation = true,
  enableMetricsComparison = true,
  enableResultExport = true,
  enableTemplates = true,
  showEvaluationHistory = true,
  showMetricsPanel = true,
  showTestCaseDetails = true,
  showProgressIndicators = true,
  compactMode = false,
  views,
  ariaLabel = 'Agent Evaluation Interface',
  ariaDescribedBy,

  // State from hook
  evaluations,
  selectedEvaluation,
  selectedResult,
  isLoading,
  isCreating,
  error,
  searchQuery,
  templates,
  runningEvaluationsCount,
  canStartNewEvaluation,
  fetchEvaluations,
  createEvaluation,
  startEvaluation,
  cancelEvaluation,
  deleteEvaluation,
  selectEvaluation,
  selectResult,
  exportEvaluations,
  setSearchQuery,
  setError,

  ...props
}) => {
  const [activeTab, setActiveTab] = React.useState('evaluations');
  /**
   * Handle evaluation creation
   */
  const handleCreateEvaluation = async (
    name: string,
    testCases: any[],
    metrics: any[]
  ) => {
    try {
      await createEvaluation(name, testCases, metrics);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  /**
   * Handle evaluation start
   */
  const handleStartEvaluation = (evaluationId: string) => {
    startEvaluation(evaluationId);
  };

  /**
   * Handle evaluation cancel
   */
  const handleCancelEvaluation = (evaluationId: string) => {
    if (window.confirm('Are you sure you want to cancel this evaluation?')) {
      cancelEvaluation(evaluationId);
    }
  };

  /**
   * Handle evaluation delete
   */
  const handleDeleteEvaluation = (evaluationId: string) => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      deleteEvaluation(evaluationId);
    }
  };

  /**
   * Handle export
   */
  const handleExport = (format: 'json' | 'csv' | 'pdf') => {
    exportEvaluations({
      format,
      includeTestCases: true,
      includeResults: true,
      includeMetrics: true,
      includeSummary: true,
    });
  };

  /**
   * Handle refresh
   */
  const handleRefresh = () => {
    fetchEvaluations();
  };

  return (
    <View
      {...DefaultAgentEvalStyles.container}
      {...views?.container}
      {...props}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      <View {...DefaultAgentEvalStyles.header} {...views?.header}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Vertical gap={4}>
            <Text fontSize="lg" fontWeight="600">
              Agent Evaluation
            </Text>
            <Text fontSize="sm" color="color.gray.600">
              {evaluations.length} evaluation
              {evaluations.length !== 1 ? 's' : ''} •{runningEvaluationsCount}{' '}
              running
            </Text>
          </Vertical>

          <Horizontal gap={8}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh evaluations"
            >
              {isLoading ? <Loader size="xs" /> : '🔄'}
            </Button>

            {enableResultExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('json')}
                disabled={evaluations.length === 0}
                aria-label="Export evaluations"
              >
                📤 Export
              </Button>
            )}
          </Horizontal>
        </Horizontal>
      </View>

      {/* Error Display */}
      {error && (
        <Text variant="error" onClick={() => setError(null)}>
          {error}
        </Text>
      )}

      {/* Search */}
      <View
        padding={16}
        borderBottom="1px solid"
        borderBottomColor="color.gray.200"
      >
        <TextField
          placeholder="Search evaluations..."
          value={searchQuery}
          onChange={setSearchQuery}
          views={{
            container: views?.searchInput,
          }}
        />
      </View>

      {/* Main Content */}
      <View flex={1} display="flex" flexDirection="column">
        {compactMode ? (
          // Compact mode - single view
          <EvaluationList
            evaluations={evaluations}
            selectedEvaluation={selectedEvaluation}
            onEvaluationSelect={selectEvaluation}
            onEvaluationStart={handleStartEvaluation}
            onEvaluationCancel={handleCancelEvaluation}
            onEvaluationDelete={handleDeleteEvaluation}
            showProgressIndicators={showProgressIndicators}
            compactMode={true}
            views={{
              container: views?.evaluationList,
              evaluationItem: views?.evaluationItem,
              activeEvaluationItem: views?.activeEvaluationItem,
            }}
          />
        ) : (
          // Full mode - tabbed interface
          <View flex={1} display="flex" flexDirection="column">
            {/* Tab Navigation */}
            <View
              display="flex"
              borderBottom="1px solid"
              borderBottomColor="color.gray.200"
              backgroundColor="color.gray.50"
            >
              <Button
                variant={activeTab === 'evaluations' ? 'filled' : 'ghost'}
                onClick={() => setActiveTab('evaluations')}
                borderRadius="0"
                borderBottom={
                  activeTab === 'evaluations' ? '2px solid' : 'none'
                }
                borderBottomColor="color.blue.500"
              >
                Evaluations
              </Button>
              <Button
                variant={activeTab === 'create' ? 'filled' : 'ghost'}
                onClick={() => setActiveTab('create')}
                borderRadius="0"
                borderBottom={activeTab === 'create' ? '2px solid' : 'none'}
                borderBottomColor="color.blue.500"
              >
                Create New
              </Button>
              {selectedEvaluation && (
                <Button
                  variant={activeTab === 'results' ? 'filled' : 'ghost'}
                  onClick={() => setActiveTab('results')}
                  borderRadius="0"
                  borderBottom={activeTab === 'results' ? '2px solid' : 'none'}
                  borderBottomColor="color.blue.500"
                >
                  Results
                </Button>
              )}
              {showMetricsPanel && (
                <Button
                  variant={activeTab === 'metrics' ? 'filled' : 'ghost'}
                  onClick={() => setActiveTab('metrics')}
                  borderRadius="0"
                  borderBottom={activeTab === 'metrics' ? '2px solid' : 'none'}
                  borderBottomColor="color.blue.500"
                >
                  Metrics
                </Button>
              )}
            </View>

            {/* Tab Content */}
            <View flex={1}>
              {activeTab === 'evaluations' && (
                <EvaluationList
                  evaluations={evaluations}
                  selectedEvaluation={selectedEvaluation}
                  onEvaluationSelect={selectEvaluation}
                  onEvaluationStart={handleStartEvaluation}
                  onEvaluationCancel={handleCancelEvaluation}
                  onEvaluationDelete={handleDeleteEvaluation}
                  showProgressIndicators={showProgressIndicators}
                  compactMode={false}
                  views={{
                    container: views?.evaluationList,
                    evaluationItem: views?.evaluationItem,
                    activeEvaluationItem: views?.activeEvaluationItem,
                  }}
                />
              )}

              {activeTab === 'create' && (
                <EvaluationCreator
                  templates={enableTemplates ? templates : []}
                  isCreating={isCreating}
                  canCreate={canStartNewEvaluation}
                  onCreateEvaluation={handleCreateEvaluation}
                  views={{
                    container: views?.createPanel,
                  }}
                />
              )}

              {activeTab === 'results' && selectedEvaluation && (
                <EvaluationResults
                  evaluation={selectedEvaluation}
                  selectedResult={selectedResult}
                  onResultSelect={selectResult}
                  showTestCaseDetails={showTestCaseDetails}
                  views={{
                    container: views?.resultsPanel,
                    testCaseList: views?.testCaseList,
                    testCaseItem: views?.testCaseItem,
                  }}
                />
              )}

              {activeTab === 'metrics' && showMetricsPanel && (
                <EvaluationMetrics
                  evaluations={evaluations}
                  enableComparison={enableMetricsComparison}
                  views={{
                    container: views?.metricsPanel,
                  }}
                />
              )}
            </View>
          </View>
        )}
      </View>

      {/* Loading State */}
      {isLoading && evaluations.length === 0 && (
        <View {...DefaultAgentEvalStyles.loadingState} {...views?.loadingState}>
          <Loader size="md" />
          <Text color="color.gray.600">Loading evaluations...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && evaluations.length === 0 && (
        <View {...DefaultAgentEvalStyles.emptyState} {...views?.emptyState}>
          <Text fontSize="lg" color="color.gray.500" textAlign="center">
            No evaluations found
          </Text>
          <Text fontSize="sm" color="color.gray.400" textAlign="center">
            Create your first evaluation to get started
          </Text>
          <Button
            variant="filled"
            onClick={() => {
              // Switch to create tab if in tabbed mode
              const createTab = document.querySelector(
                '[data-value="create"]'
              ) as HTMLElement;
              createTab?.click();
            }}
            marginTop={16}
          >
            Create Evaluation
          </Button>
        </View>
      )}
    </View>
  );
};

export default AgentEvalView;
