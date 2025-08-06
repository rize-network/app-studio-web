import { ViewProps } from 'app-studio';

/**
 * Core ADK Evaluation Types
 */
export interface EvaluationMetric {
  id: string;
  name: string;
  description: string;
  type: 'accuracy' | 'latency' | 'cost' | 'quality' | 'safety' | 'custom';
  threshold?: number;
  weight?: number;
  config?: Record<string, any>;
}

export interface EvaluationTestCase {
  id: string;
  name: string;
  description?: string;
  input: any;
  expectedOutput?: any;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface EvaluationRun {
  id: string;
  name: string;
  appName: string;
  userId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number; // 0-100
  startTime: number;
  endTime?: number;
  duration?: number;
  testCases: EvaluationTestCase[];
  metrics: EvaluationMetric[];
  results?: EvaluationResult[];
  summary?: EvaluationSummary;
  config?: EvaluationConfig;
  error?: string;
}

export interface EvaluationResult {
  id: string;
  evaluationId: string;
  testCaseId: string;
  status: 'pass' | 'fail' | 'error' | 'skip';
  score?: number;
  actualOutput?: any;
  metrics: Record<string, number>;
  duration: number;
  error?: string;
  details?: Record<string, any>;
  timestamp: number;
}

export interface EvaluationSummary {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  errorTests: number;
  skippedTests: number;
  averageScore: number;
  totalDuration: number;
  metricsAverages: Record<string, number>;
  passRate: number;
}

export interface EvaluationConfig {
  maxConcurrency?: number;
  timeout?: number;
  retryCount?: number;
  stopOnFailure?: boolean;
  randomizeOrder?: boolean;
  enableDetailedLogging?: boolean;
}

/**
 * Component View Customization
 */
export interface AgentEvalViews {
  container?: ViewProps;
  header?: ViewProps;
  evaluationList?: ViewProps;
  evaluationItem?: ViewProps;
  activeEvaluationItem?: ViewProps;
  createPanel?: ViewProps;
  resultsPanel?: ViewProps;
  metricsPanel?: ViewProps;
  testCaseList?: ViewProps;
  testCaseItem?: ViewProps;
  progressBar?: ViewProps;
  statusIndicator?: ViewProps;
  actionButtons?: ViewProps;
  exportButton?: ViewProps;
  refreshButton?: ViewProps;
  searchInput?: ViewProps;
  emptyState?: ViewProps;
  loadingState?: ViewProps;
  errorState?: ViewProps;
}

/**
 * Event Handlers
 */
export interface AgentEvalEventHandlers {
  onEvaluationCreate?: (evaluation: EvaluationRun) => void;
  onEvaluationStart?: (evaluationId: string) => void;
  onEvaluationComplete?: (result: EvaluationRun) => void;
  onEvaluationCancel?: (evaluationId: string) => void;
  onEvaluationDelete?: (evaluationId: string) => void;
  onTestCaseSelect?: (testCase: EvaluationTestCase) => void;
  onResultSelect?: (result: EvaluationResult) => void;
  onExport?: (format: 'json' | 'csv' | 'pdf') => void;
  onError?: (error: Error) => void;
  onRefresh?: () => void;
}

/**
 * Evaluation Templates
 */
export interface EvaluationTemplate {
  id: string;
  name: string;
  description: string;
  testCases: EvaluationTestCase[];
  metrics: EvaluationMetric[];
  config: EvaluationConfig;
  tags?: string[];
}

/**
 * Comparison Options
 */
export interface EvaluationComparison {
  baselineId: string;
  comparisonIds: string[];
  metrics: string[];
  showDifferences?: boolean;
  showTrends?: boolean;
}

/**
 * Main AgentEval Props Interface
 */
export interface AgentEvalProps extends ViewProps, AgentEvalEventHandlers {
  // Required props
  appName: string;
  userId: string;

  // Optional configuration
  apiBaseUrl?: string;

  // Feature toggles
  enableBatchEvaluation?: boolean;
  enableMetricsComparison?: boolean;
  enableResultExport?: boolean;
  enableTemplates?: boolean;
  enableAutoRefresh?: boolean;

  // Limits and constraints
  maxConcurrentEvals?: number;
  maxTestCases?: number;
  refreshInterval?: number; // in milliseconds

  // UI customization
  showEvaluationHistory?: boolean;
  showMetricsPanel?: boolean;
  showTestCaseDetails?: boolean;
  showProgressIndicators?: boolean;
  compactMode?: boolean;

  // Styling
  views?: AgentEvalViews;

  // Initial state
  initialEvaluations?: EvaluationRun[];
  selectedEvaluationId?: string;
  availableTemplates?: EvaluationTemplate[];

  // Advanced features
  enableRealTimeUpdates?: boolean;
  enableResultCaching?: boolean;
  enableCustomMetrics?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Export Options
 */
export interface EvaluationExportOptions {
  format: 'json' | 'csv' | 'pdf';
  includeTestCases?: boolean;
  includeResults?: boolean;
  includeMetrics?: boolean;
  includeSummary?: boolean;
  evaluationIds?: string[];
}

/**
 * Real-time Update Types
 */
export interface EvaluationUpdate {
  type: 'progress' | 'result' | 'status' | 'complete' | 'error';
  evaluationId: string;
  data: any;
  timestamp: number;
}
