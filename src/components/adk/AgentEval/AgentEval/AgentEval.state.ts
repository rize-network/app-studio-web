import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AgentEvalProps,
  EvaluationRun,
  EvaluationResult,
  EvaluationTestCase,
  EvaluationMetric,
  EvaluationTemplate,
  EvaluationExportOptions,
} from './AgentEval.props';

/**
 * Custom hook for managing AgentEval state and operations
 */
export const useAgentEval = (props: AgentEvalProps) => {
  const {
    appName,
    userId,
    apiBaseUrl = '',
    maxConcurrentEvals = 3,
    maxTestCases = 100,
    refreshInterval = 10000,
    enableAutoRefresh = false,
    initialEvaluations = [],
    selectedEvaluationId,
    availableTemplates = [],
    onEvaluationCreate,
    onEvaluationStart,
    onEvaluationComplete,
    onEvaluationCancel,
    onEvaluationDelete,
    onTestCaseSelect,
    onResultSelect,
    onExport,
    onError,
    onRefresh,
  } = props;

  // Core state
  const [evaluations, setEvaluations] =
    useState<EvaluationRun[]>(initialEvaluations);
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<EvaluationRun | null>(null);
  const [selectedResult, setSelectedResult] = useState<EvaluationResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] =
    useState<EvaluationTemplate[]>(availableTemplates);

  // Refs
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  /**
   * Fetch evaluations from API
   */
  const fetchEvaluations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${apiBaseUrl}/evaluations?appName=${appName}&userId=${userId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch evaluations: ${response.statusText}`);
      }

      const data: EvaluationRun[] = await response.json();
      setEvaluations(data);
      onRefresh?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, appName, userId, onRefresh, onError]);

  /**
   * Create a new evaluation
   */
  const createEvaluation = useCallback(
    async (
      name: string,
      testCases: EvaluationTestCase[],
      metrics: EvaluationMetric[],
      config?: any
    ) => {
      try {
        setIsCreating(true);
        setError(null);

        const evaluation: Partial<EvaluationRun> = {
          name,
          appName,
          userId,
          status: 'pending',
          progress: 0,
          startTime: Date.now(),
          testCases,
          metrics,
          config,
        };

        const response = await fetch(`${apiBaseUrl}/evaluations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(evaluation),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to create evaluation: ${response.statusText}`
          );
        }

        const newEvaluation: EvaluationRun = await response.json();
        setEvaluations((prev) => [newEvaluation, ...prev]);
        setSelectedEvaluation(newEvaluation);
        onEvaluationCreate?.(newEvaluation);

        return newEvaluation;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
        throw error;
      } finally {
        setIsCreating(false);
      }
    },
    [apiBaseUrl, appName, userId, onEvaluationCreate, onError]
  );

  /**
   * Start an evaluation
   */
  const startEvaluation = useCallback(
    async (evaluationId: string) => {
      try {
        setError(null);

        const response = await fetch(
          `${apiBaseUrl}/evaluations/${evaluationId}/start`,
          {
            method: 'POST',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to start evaluation: ${response.statusText}`);
        }

        // Update evaluation status
        setEvaluations((prev) =>
          prev.map((evaluation) =>
            evaluation.id === evaluationId
              ? { ...evaluation, status: 'running', progress: 0 }
              : evaluation
          )
        );

        onEvaluationStart?.(evaluationId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      }
    },
    [apiBaseUrl, onEvaluationStart, onError]
  );

  /**
   * Cancel an evaluation
   */
  const cancelEvaluation = useCallback(
    async (evaluationId: string) => {
      try {
        setError(null);

        const response = await fetch(
          `${apiBaseUrl}/evaluations/${evaluationId}/cancel`,
          {
            method: 'POST',
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to cancel evaluation: ${response.statusText}`
          );
        }

        // Update evaluation status
        setEvaluations((prev) =>
          prev.map((evaluation) =>
            evaluation.id === evaluationId
              ? { ...evaluation, status: 'cancelled' }
              : evaluation
          )
        );

        onEvaluationCancel?.(evaluationId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      }
    },
    [apiBaseUrl, onEvaluationCancel, onError]
  );

  /**
   * Delete an evaluation
   */
  const deleteEvaluation = useCallback(
    async (evaluationId: string) => {
      try {
        setError(null);

        const response = await fetch(
          `${apiBaseUrl}/evaluations/${evaluationId}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete evaluation: ${response.statusText}`
          );
        }

        setEvaluations((prev) =>
          prev.filter((evaluation) => evaluation.id !== evaluationId)
        );

        if (selectedEvaluation?.id === evaluationId) {
          setSelectedEvaluation(null);
        }

        onEvaluationDelete?.(evaluationId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      }
    },
    [apiBaseUrl, selectedEvaluation, onEvaluationDelete, onError]
  );

  /**
   * Select an evaluation
   */
  const selectEvaluation = useCallback(
    (evaluationId: string) => {
      const evaluation = evaluations.find((e) => e.id === evaluationId);
      if (evaluation) {
        setSelectedEvaluation(evaluation);
      }
    },
    [evaluations]
  );

  /**
   * Select a result
   */
  const selectResult = useCallback(
    (result: EvaluationResult) => {
      setSelectedResult(result);
      onResultSelect?.(result);
    },
    [onResultSelect]
  );

  /**
   * Export evaluation data
   */
  const exportEvaluations = useCallback(
    async (options: EvaluationExportOptions) => {
      try {
        const evaluationsToExport = options.evaluationIds
          ? evaluations.filter((e) => options.evaluationIds!.includes(e.id))
          : evaluations;

        let exportData: any;
        let filename: string;
        let mimeType: string;

        switch (options.format) {
          case 'json':
            exportData = {
              evaluations: evaluationsToExport,
              ...(options.includeMetrics && {
                metrics: evaluationsToExport.flatMap((e) => e.metrics),
              }),
              exportedAt: new Date().toISOString(),
              exportedBy: userId,
            };
            filename = `evaluations-${
              new Date().toISOString().split('T')[0]
            }.json`;
            mimeType = 'application/json';
            break;

          case 'csv':
            const csvHeaders = [
              'id',
              'name',
              'status',
              'progress',
              'passRate',
              'averageScore',
              'duration',
            ];
            const csvRows = evaluationsToExport.map((evaluation) => [
              evaluation.id,
              evaluation.name,
              evaluation.status,
              evaluation.progress,
              evaluation.summary?.passRate || 0,
              evaluation.summary?.averageScore || 0,
              evaluation.duration || 0,
            ]);
            exportData = [csvHeaders, ...csvRows]
              .map((row) => row.join(','))
              .join('\n');
            filename = `evaluations-${
              new Date().toISOString().split('T')[0]
            }.csv`;
            mimeType = 'text/csv';
            break;

          default:
            throw new Error(`Export format ${options.format} not supported`);
        }

        // Create and download file
        const blob = new Blob(
          [
            typeof exportData === 'string'
              ? exportData
              : JSON.stringify(exportData, null, 2),
          ],
          {
            type: mimeType,
          }
        );
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        onExport?.(options.format);
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('Failed to export evaluations');
        setError(error.message);
        onError?.(error);
      }
    },
    [evaluations, userId, onExport, onError]
  );

  /**
   * Filter evaluations based on search query
   */
  const getFilteredEvaluations = useCallback(() => {
    if (!searchQuery) return evaluations;

    const query = searchQuery.toLowerCase();
    return evaluations.filter(
      (evaluation) =>
        evaluation.name.toLowerCase().includes(query) ||
        evaluation.id.toLowerCase().includes(query) ||
        evaluation.status.toLowerCase().includes(query)
    );
  }, [evaluations, searchQuery]);

  /**
   * Get running evaluations count
   */
  const getRunningEvaluationsCount = useCallback(() => {
    return evaluations.filter((e) => e.status === 'running').length;
  }, [evaluations]);

  /**
   * Set up real-time updates via WebSocket
   */
  const setupRealTimeUpdates = useCallback(() => {
    if (!props.enableRealTimeUpdates) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${apiBaseUrl.replace(
      /^https?:\/\//,
      ''
    )}/evaluations/ws?userId=${userId}`;

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        switch (update.type) {
          case 'progress':
            setEvaluations((prev) =>
              prev.map((e) =>
                e.id === update.evaluationId
                  ? { ...e, progress: update.data.progress }
                  : e
              )
            );
            break;
          case 'result':
            setEvaluations((prev) =>
              prev.map((e) =>
                e.id === update.evaluationId
                  ? {
                      ...e,
                      results: [...(e.results || []), update.data],
                    }
                  : e
              )
            );
            break;
          case 'complete':
            setEvaluations((prev) =>
              prev.map((e) =>
                e.id === update.evaluationId
                  ? {
                      ...e,
                      status: 'completed',
                      endTime: update.timestamp,
                      duration: update.timestamp - e.startTime,
                      summary: update.data.summary,
                    }
                  : e
              )
            );
            onEvaluationComplete?.(update.data);
            break;
          case 'error':
            setEvaluations((prev) =>
              prev.map((e) =>
                e.id === update.evaluationId
                  ? { ...e, status: 'failed', error: update.data.error }
                  : e
              )
            );
            break;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [props.enableRealTimeUpdates, apiBaseUrl, userId, onEvaluationComplete]);

  /**
   * Initialize evaluations on mount
   */
  useEffect(() => {
    fetchEvaluations();
    setupRealTimeUpdates();
  }, [fetchEvaluations, setupRealTimeUpdates]);

  /**
   * Set up auto-refresh
   */
  useEffect(() => {
    if (enableAutoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(
        fetchEvaluations,
        refreshInterval
      );

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }

    return () => {
      // Cleanup function for when auto-refresh is disabled
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [enableAutoRefresh, refreshInterval, fetchEvaluations]);

  /**
   * Select initial evaluation
   */
  useEffect(() => {
    if (selectedEvaluationId && evaluations.length > 0 && !selectedEvaluation) {
      selectEvaluation(selectedEvaluationId);
    }
  }, [selectedEvaluationId, evaluations, selectedEvaluation, selectEvaluation]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    // State
    evaluations: getFilteredEvaluations(),
    selectedEvaluation,
    selectedResult,
    isLoading,
    isCreating,
    error,
    searchQuery,
    templates,

    // Actions
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

    // Computed
    runningEvaluationsCount: getRunningEvaluationsCount(),
    canStartNewEvaluation: getRunningEvaluationsCount() < maxConcurrentEvals,
  };
};
