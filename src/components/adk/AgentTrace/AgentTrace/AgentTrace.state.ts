import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AgentTraceProps,
  TraceEvent,
  TraceSpan,
  TraceMetrics,
  TraceFilter,
  TraceExportOptions,
  VisualizationType,
} from './AgentTrace.props';

/**
 * Custom hook for managing AgentTrace state and operations
 */
export const useAgentTrace = (props: AgentTraceProps) => {
  const {
    sessionId,
    userId,
    appName,
    apiBaseUrl = '',
    maxEvents = 1000,
    refreshInterval = 5000,
    enableAutoRefresh = false,
    visualizationType = 'timeline',
    initialEvents = [],
    initialFilter = {},
    selectedEventId,
    onEventSelect,
    onSpanSelect,
    onFilterChange,
    onExport,
    onRefresh,
    onError,
  } = props;

  // Core state
  const [events, setEvents] = useState<TraceEvent[]>(initialEvents);
  const [spans, setSpans] = useState<TraceSpan[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TraceEvent | null>(null);
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | null>(null);
  const [metrics, setMetrics] = useState<TraceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TraceFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(
    initialFilter.searchQuery || ''
  );
  const [currentVisualization, setCurrentVisualization] =
    useState<VisualizationType>(visualizationType);

  // Refs
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  /**
   * Fetch trace events from API
   */
  const fetchTraceEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        sessionId,
        userId,
        appName,
        limit: maxEvents.toString(),
      });

      // Add filter parameters
      if (filter.eventTypes?.length) {
        params.append('eventTypes', filter.eventTypes.join(','));
      }
      if (filter.timeRange) {
        params.append('startTime', filter.timeRange.start.toISOString());
        params.append('endTime', filter.timeRange.end.toISOString());
      }
      if (filter.searchQuery) {
        params.append('search', filter.searchQuery);
      }

      const response = await fetch(`${apiBaseUrl}/trace/events?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch trace events: ${response.statusText}`);
      }

      const data: TraceEvent[] = await response.json();
      setEvents(data);

      // Calculate metrics
      const calculatedMetrics = calculateMetrics(data);
      setMetrics(calculatedMetrics);

      onRefresh?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    sessionId,
    userId,
    appName,
    apiBaseUrl,
    maxEvents,
    filter,
    onRefresh,
    onError,
  ]);

  /**
   * Fetch trace spans from API
   */
  const fetchTraceSpans = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/trace/spans?sessionId=${sessionId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch trace spans: ${response.statusText}`);
      }

      const data: TraceSpan[] = await response.json();
      setSpans(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
    }
  }, [sessionId, apiBaseUrl, onError]);

  /**
   * Calculate metrics from events
   */
  const calculateMetrics = useCallback((events: TraceEvent[]): TraceMetrics => {
    const totalEvents = events.length;
    const durations = events.filter((e) => e.duration).map((e) => e.duration!);
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const averageResponseTime =
      durations.length > 0 ? totalDuration / durations.length : 0;

    const errorCount = events.filter(
      (e) => e.metadata?.level === 'error'
    ).length;
    const successCount = totalEvents - errorCount;
    const functionCallCount = events.filter(
      (e) => e.type === 'function_call'
    ).length;
    const llmRequestCount = events.filter(
      (e) => e.type === 'llm_request'
    ).length;

    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate percentiles
    const sortedDurations = durations.sort((a, b) => a - b);
    const getPercentile = (p: number) => {
      const index = Math.ceil((p / 100) * sortedDurations.length) - 1;
      return sortedDurations[index] || 0;
    };

    return {
      totalEvents,
      totalDuration,
      averageResponseTime,
      errorCount,
      successCount,
      functionCallCount,
      llmRequestCount,
      eventsByType,
      performanceMetrics: {
        p50: getPercentile(50),
        p90: getPercentile(90),
        p95: getPercentile(95),
        p99: getPercentile(99),
      },
    };
  }, []);

  /**
   * Select an event
   */
  const selectEvent = useCallback(
    (eventId: string) => {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        onEventSelect?.(event);
      }
    },
    [events, onEventSelect]
  );

  /**
   * Select a span
   */
  const selectSpan = useCallback(
    (spanId: string) => {
      const span = spans.find((s) => s.id === spanId);
      if (span) {
        setSelectedSpan(span);
        onSpanSelect?.(span);
      }
    },
    [spans, onSpanSelect]
  );

  /**
   * Update filter
   */
  const updateFilter = useCallback(
    (newFilter: TraceFilter) => {
      setFilter(newFilter);
      onFilterChange?.(newFilter);
    },
    [onFilterChange]
  );

  /**
   * Export trace data
   */
  const exportTrace = useCallback(
    async (options: TraceExportOptions) => {
      try {
        let filteredEvents = events;

        // Apply export filters
        if (options.timeRange) {
          filteredEvents = filteredEvents.filter(
            (event) =>
              event.timestamp >= options.timeRange!.start.getTime() &&
              event.timestamp <= options.timeRange!.end.getTime()
          );
        }

        if (options.eventTypes?.length) {
          filteredEvents = filteredEvents.filter((event) =>
            options.eventTypes!.includes(event.type)
          );
        }

        let exportData: any;
        let filename: string;
        let mimeType: string;

        switch (options.format) {
          case 'json':
            exportData = {
              events: filteredEvents,
              ...(options.includeMetrics && { metrics }),
              ...(options.includeMetadata && {
                sessionId,
                userId,
                appName,
                exportedAt: new Date().toISOString(),
              }),
            };
            filename = `trace-${sessionId}-${
              new Date().toISOString().split('T')[0]
            }.json`;
            mimeType = 'application/json';
            break;

          case 'csv':
            const csvHeaders = [
              'id',
              'type',
              'timestamp',
              'duration',
              'level',
              'title',
            ];
            const csvRows = filteredEvents.map((event) => [
              event.id,
              event.type,
              new Date(event.timestamp).toISOString(),
              event.duration || '',
              event.metadata?.level || '',
              event.metadata?.title || '',
            ]);
            exportData = [csvHeaders, ...csvRows]
              .map((row) => row.join(','))
              .join('\n');
            filename = `trace-${sessionId}-${
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
          err instanceof Error ? err : new Error('Failed to export trace');
        setError(error.message);
        onError?.(error);
      }
    },
    [events, metrics, sessionId, userId, appName, onExport, onError]
  );

  /**
   * Filter and search events
   */
  const getFilteredEvents = useCallback(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.id.toLowerCase().includes(query) ||
          event.type.toLowerCase().includes(query) ||
          event.metadata?.title?.toLowerCase().includes(query) ||
          event.metadata?.description?.toLowerCase().includes(query) ||
          JSON.stringify(event.data).toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filter.eventTypes?.length) {
      filtered = filtered.filter((event) =>
        filter.eventTypes!.includes(event.type)
      );
    }

    // Apply level filter
    if (filter.level?.length) {
      filtered = filtered.filter(
        (event) =>
          event.metadata?.level && filter.level!.includes(event.metadata.level)
      );
    }

    // Apply time range filter
    if (filter.timeRange) {
      filtered = filtered.filter(
        (event) =>
          event.timestamp >= filter.timeRange!.start.getTime() &&
          event.timestamp <= filter.timeRange!.end.getTime()
      );
    }

    // Apply duration filter
    if (filter.minDuration !== undefined) {
      filtered = filtered.filter(
        (event) => (event.duration || 0) >= filter.minDuration!
      );
    }
    if (filter.maxDuration !== undefined) {
      filtered = filtered.filter(
        (event) => (event.duration || 0) <= filter.maxDuration!
      );
    }

    // Apply tags filter
    if (filter.tags?.length) {
      filtered = filtered.filter((event) =>
        event.metadata?.tags?.some((tag) => filter.tags!.includes(tag))
      );
    }

    return filtered;
  }, [events, searchQuery, filter]);

  /**
   * Set up real-time updates via WebSocket
   */
  const setupRealTimeUpdates = useCallback(() => {
    if (!props.enableRealTimeUpdates) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${apiBaseUrl.replace(
      /^https?:\/\//,
      ''
    )}/trace/ws?sessionId=${sessionId}`;

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        switch (update.type) {
          case 'event_added':
            setEvents((prev) => [...prev, update.data]);
            break;
          case 'event_updated':
            setEvents((prev) =>
              prev.map((e) => (e.id === update.data.id ? update.data : e))
            );
            break;
          case 'metrics_updated':
            setMetrics(update.data);
            break;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [props.enableRealTimeUpdates, apiBaseUrl, sessionId]);

  /**
   * Initialize trace data on mount
   */
  useEffect(() => {
    fetchTraceEvents();
    fetchTraceSpans();
    setupRealTimeUpdates();
  }, [fetchTraceEvents, fetchTraceSpans, setupRealTimeUpdates]);

  /**
   * Set up auto-refresh
   */
  useEffect(() => {
    if (enableAutoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        fetchTraceEvents();
        fetchTraceSpans();
      }, refreshInterval);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
    return undefined;
  }, [enableAutoRefresh, refreshInterval, fetchTraceEvents, fetchTraceSpans]);

  /**
   * Select initial event
   */
  useEffect(() => {
    if (selectedEventId && events.length > 0 && !selectedEvent) {
      selectEvent(selectedEventId);
    }
  }, [selectedEventId, events, selectedEvent, selectEvent]);

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
    events: getFilteredEvents(),
    spans,
    selectedEvent,
    selectedSpan,
    metrics,
    isLoading,
    error,
    filter,
    searchQuery,
    currentVisualization,

    // Actions
    fetchTraceEvents,
    fetchTraceSpans,
    selectEvent,
    selectSpan,
    updateFilter,
    exportTrace,
    setSearchQuery,
    setCurrentVisualization,
    setError,

    // Computed
    filteredEvents: getFilteredEvents(),
  };
};
