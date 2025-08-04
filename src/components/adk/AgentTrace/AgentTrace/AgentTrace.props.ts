import { ViewProps } from 'app-studio';

/**
 * Core ADK Trace Types
 */
export interface TraceEvent {
  id: string;
  sessionId: string;
  type:
    | 'llm_request'
    | 'llm_response'
    | 'function_call'
    | 'function_response'
    | 'user_input'
    | 'agent_output'
    | 'error'
    | 'system';
  timestamp: number;
  duration?: number;
  data: any;
  metadata?: {
    title?: string;
    description?: string;
    level?: 'info' | 'warning' | 'error' | 'debug';
    tags?: string[];
  };
  parentId?: string;
  children?: TraceEvent[];
  attributes?: Record<string, any>;
}

export interface TraceSpan {
  id: string;
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  status: 'running' | 'completed' | 'error' | 'cancelled';
  events: TraceEvent[];
  attributes: Record<string, any>;
  parentId?: string;
  children?: TraceSpan[];
}

export interface TraceMetrics {
  totalEvents: number;
  totalDuration: number;
  averageResponseTime: number;
  errorCount: number;
  successCount: number;
  functionCallCount: number;
  llmRequestCount: number;
  eventsByType: Record<string, number>;
  performanceMetrics: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
}

export interface TraceFilter {
  eventTypes?: string[];
  timeRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
  level?: ('info' | 'warning' | 'error' | 'debug')[];
  tags?: string[];
  minDuration?: number;
  maxDuration?: number;
}

/**
 * Component View Customization
 */
export interface AgentTraceViews {
  // Main container areas
  container?: ViewProps;
  header?: ViewProps;
  toolbar?: ViewProps;
  timeline?: ViewProps;
  eventList?: ViewProps;
  detailsPanel?: ViewProps;
  metricsPanel?: ViewProps;
  filtersPanel?: ViewProps;

  // Event components
  eventItem?: ViewProps;
  selectedEventItem?: ViewProps;
  eventHeader?: ViewProps;
  eventContent?: ViewProps;
  eventMetadata?: ViewProps;
  eventTimestamp?: ViewProps;
  eventDuration?: ViewProps;
  eventType?: ViewProps;
  eventLevel?: ViewProps;
  eventTags?: ViewProps;

  // Timeline components
  timelineContainer?: ViewProps;
  timelineAxis?: ViewProps;
  timelineEvent?: ViewProps;
  timelineSpan?: ViewProps;
  timelineMarker?: ViewProps;

  // Metrics components
  metricsCard?: ViewProps;
  performanceChart?: ViewProps;
  errorRateChart?: ViewProps;
  latencyChart?: ViewProps;
  throughputChart?: ViewProps;

  // Visualization components
  visualization?: ViewProps;
  flowDiagram?: ViewProps;
  dependencyGraph?: ViewProps;
  heatmap?: ViewProps;

  // Filter components
  searchInput?: ViewProps;
  typeFilter?: ViewProps;
  levelFilter?: ViewProps;
  timeRangeFilter?: ViewProps;
  tagFilter?: ViewProps;
  durationFilter?: ViewProps;

  // Action buttons
  exportButton?: ViewProps;
  refreshButton?: ViewProps;
  clearButton?: ViewProps;
  expandAllButton?: ViewProps;
  collapseAllButton?: ViewProps;

  // State displays
  emptyState?: ViewProps;
  loadingState?: ViewProps;
  errorState?: ViewProps;
}

/**
 * Event Handlers
 */
export interface AgentTraceEventHandlers {
  onEventSelect?: (event: TraceEvent) => void;
  onSpanSelect?: (span: TraceSpan) => void;
  onFilterChange?: (filter: TraceFilter) => void;
  onExport?: (format: 'json' | 'csv' | 'svg') => void;
  onRefresh?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Visualization Options
 */
export type VisualizationType =
  | 'timeline'
  | 'tree'
  | 'graph'
  | 'table'
  | 'flamegraph';

export interface VisualizationConfig {
  type: VisualizationType;
  showDuration?: boolean;
  showMetadata?: boolean;
  groupBy?: 'type' | 'level' | 'parent' | 'none';
  sortBy?: 'timestamp' | 'duration' | 'type' | 'name';
  sortDirection?: 'asc' | 'desc';
  maxDepth?: number;
  collapsible?: boolean;
}

/**
 * Main AgentTrace Props Interface
 */
export interface AgentTraceProps extends ViewProps, AgentTraceEventHandlers {
  // Required props
  sessionId: string;
  userId: string;
  appName: string;

  // Optional configuration
  apiBaseUrl?: string;

  // Feature toggles
  showTimeline?: boolean;
  showMetrics?: boolean;
  showVisualization?: boolean;
  enableFiltering?: boolean;
  enableExport?: boolean;
  enableSearch?: boolean;
  enableAutoRefresh?: boolean;

  // Visualization options
  visualizationType?: VisualizationType;
  visualizationConfig?: VisualizationConfig;

  // Limits and constraints
  maxEvents?: number;
  refreshInterval?: number; // in milliseconds

  // UI customization
  showEventDetails?: boolean;
  showPerformanceMetrics?: boolean;
  compactMode?: boolean;

  // Styling and customization
  views?: AgentTraceViews;
  containerProps?: ViewProps;

  // Initial state
  initialEvents?: TraceEvent[];
  initialFilter?: TraceFilter;
  selectedEventId?: string;

  // Advanced features
  enableRealTimeUpdates?: boolean;
  enableEventGrouping?: boolean;
  enableSpanVisualization?: boolean;

  // Theme and appearance
  colorScheme?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gray';
  layout?: 'timeline' | 'tree' | 'table' | 'graph';
  showMinimap?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Export Formats
 */
export interface TraceExportOptions {
  format: 'json' | 'csv' | 'svg' | 'png';
  includeMetadata?: boolean;
  includeMetrics?: boolean;
  timeRange?: {
    start: Date;
    end: Date;
  };
  eventTypes?: string[];
}

/**
 * Real-time Update Types
 */
export interface TraceUpdate {
  type: 'event_added' | 'event_updated' | 'span_completed' | 'metrics_updated';
  data: TraceEvent | TraceSpan | TraceMetrics;
  timestamp: number;
}
